const boardEl = document.getElementById("board");
const updatedEl = document.getElementById("updated");
const clockEl = document.getElementById("clock");
const lineFilterEl = document.getElementById("line-filter");
const refreshBtn = document.getElementById("refresh-btn");

const ODPT_TRAIN_ENDPOINT = "https://api.odpt.org/api/v4/odpt:Train";
const REFRESH_INTERVAL_MS = 60 * 1000; // 60秒ごとに自動更新

// --- 時計 ---
function tickClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("ja-JP", { hour12: false });
}
setInterval(tickClock, 1000);
tickClock();

// --- 路線セレクトの中身を config.js から作る ---
function populateLineFilter() {
  LINES.forEach((line) => {
    const opt = document.createElement("option");
    opt.value = line.id;
    opt.textContent = line.name;
    lineFilterEl.appendChild(opt);
  });
}

// --- ODPTから1路線ぶんの列車データを取得 ---
async function fetchTrainsForLine(line) {
  const url = `${ODPT_TRAIN_ENDPOINT}?odpt:railway=${encodeURIComponent(line.railway)}&acl:consumerKey=${ODPT_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${line.name} の取得に失敗 (status: ${res.status})`);
  }
  const data = await res.json();
  return data.map((train) => ({
    line,
    destination: extractDestination(train),
    delaySeconds: train["odpt:delay"] || 0,
    updatedAt: train["dc:date"]
  }));
}

// ODPTのレスポンスは行き先が配列やIDだけのことがあるので簡易的に整形
function extractDestination(train) {
  const dest = train["odpt:destinationStation"];
  if (!dest) return "行き先不明";
  const raw = Array.isArray(dest) ? dest[0] : dest;
  // "odpt.Station:JR-East.Yamanote.Shinjuku" -> "Shinjuku"
  return raw.split(".").pop();
}

// --- 一覧を描画 ---
function renderRows(entries) {
  if (entries.length === 0) {
    boardEl.innerHTML = `<p class="board__empty">表示できるデータがありません。APIキーや路線設定を確認してください。</p>`;
    return;
  }

  boardEl.innerHTML = "";
  entries.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.setProperty("--line-color", entry.line.color);

    const delayMin = Math.round(entry.delaySeconds / 60);
    const isDelayed = delayMin > 0;

    card.innerHTML = `
      <span class="card__line">${entry.line.name}</span>
      <span class="card__dest">${entry.destination} 方面</span>
      <div class="card__bottom">
        <span class="card__time">${formatTime(entry.updatedAt)}</span>
        <span class="card__status ${isDelayed ? "card__status--delay" : "card__status--ontime"}">
          ${isDelayed ? `${delayMin}分遅れ` : "定刻"}
        </span>
      </div>
    `;
    boardEl.appendChild(card);
  });
}

function formatTime(isoString) {
  if (!isoString) return "--:--";
  const d = new Date(isoString);
  return d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

// --- 全路線 (またはフィルタされた路線) を取得して描画 ---
async function loadBoard() {
  const selected = lineFilterEl.value;
  const targetLines = selected === "all" ? LINES : LINES.filter((l) => l.id === selected);

  boardEl.innerHTML = `<p class="board__empty">読み込み中…</p>`;

  try {
    const results = await Promise.all(targetLines.map(fetchTrainsForLine));
    const merged = results.flat();
    renderRows(merged);
    updatedEl.textContent = `最終更新 ${new Date().toLocaleTimeString("ja-JP", { hour12: false })}`;
  } catch (err) {
    boardEl.innerHTML = `<p class="board__empty">エラー: ${err.message}</p>`;
    console.error(err);
  }
}

populateLineFilter();
lineFilterEl.addEventListener("change", loadBoard);
refreshBtn.addEventListener("click", loadBoard);

if (ODPT_API_KEY && ODPT_API_KEY !== "YOUR_API_KEY_HERE") {
  loadBoard();
  setInterval(loadBoard, REFRESH_INTERVAL_MS);
} else {
  boardEl.innerHTML = `<p class="board__empty">config.js に ODPT の APIキーを設定すると、ここに運行状況が表示されます。</p>`;
}

// ここに ODPT開発者サイトで発行されたAPIキーを入れる
// https://developer-dc.odpt.org/ で登録すると取得できます
const ODPT_API_KEY = "YOUR_API_KEY_HERE";

// 表示したい路線をここに追加していく。
// railway の値は ODPT の路線ID。だいたい "odpt.Railway:事業者.路線名" の形式。
// 増やすときはこの配列にオブジェクトを追加するだけでOK。
const LINES = [
  {
    id: "yamanote",
    name: "JR山手線",
    railway: "odpt.Railway:JR-East.Yamanote",
    color: "#9acd32"
  },
  {
    id: "chuo",
    name: "JR中央線快速",
    railway: "odpt.Railway:JR-East.ChuoRapid",
    color: "#f15a22"
  },
  {
    id: "keihintohoku",
    name: "JR京浜東北線",
    railway: "odpt.Railway:JR-East.KeihinTohokuNegishi",
    color: "#00b2e5"
  },
  {
    id: "tokaido",
    name: "JR東海道線",
    railway: "odpt.Railway:JR-East.Tokaido",
    color: "#f68b1e"
  },

  // --- 東京メトロ 全9路線 ---
  {
    id: "ginza",
    name: "東京メトロ銀座線",
    railway: "odpt.Railway:TokyoMetro.Ginza",
    color: "#ff9500"
  },
  {
    id: "marunouchi",
    name: "東京メトロ丸ノ内線",
    railway: "odpt.Railway:TokyoMetro.Marunouchi",
    color: "#f62e36"
  },
  {
    id: "hibiya",
    name: "東京メトロ日比谷線",
    railway: "odpt.Railway:TokyoMetro.Hibiya",
    color: "#b5b5ac"
  },
  {
    id: "tozai",
    name: "東京メトロ東西線",
    railway: "odpt.Railway:TokyoMetro.Tozai",
    color: "#009bbb"
  },
  {
    id: "chiyoda",
    name: "東京メトロ千代田線",
    railway: "odpt.Railway:TokyoMetro.Chiyoda",
    color: "#00bb85"
  },
  {
    id: "yurakucho",
    name: "東京メトロ有楽町線",
    railway: "odpt.Railway:TokyoMetro.Yurakucho",
    color: "#c1a470"
  },
  {
    id: "hanzomon",
    name: "東京メトロ半蔵門線",
    railway: "odpt.Railway:TokyoMetro.Hanzomon",
    color: "#8f76d6"
  },
  {
    id: "namboku",
    name: "東京メトロ南北線",
    railway: "odpt.Railway:TokyoMetro.Namboku",
    color: "#00ac9b"
  },
  {
    id: "fukutoshin",
    name: "東京メトロ副都心線",
    railway: "odpt.Railway:TokyoMetro.Fukutoshin",
    color: "#9c5e31"
  },

  // --- 都営地下鉄 ---
  {
    id: "asakusa",
    name: "都営浅草線",
    railway: "odpt.Railway:Toei.Asakusa",
    color: "#ee82a9"
  },
  {
    id: "mita",
    name: "都営三田線",
    railway: "odpt.Railway:Toei.Mita",
    color: "#0079c2"
  },
  {
    id: "shinjuku",
    name: "都営新宿線",
    railway: "odpt.Railway:Toei.Shinjuku",
    color: "#6cbb5a"
  },
  {
    id: "oedo",
    name: "都営大江戸線",
    railway: "odpt.Railway:Toei.Oedo",
    color: "#b6007a"
  }
];

// 注: railway のID表記はODPTのカタログサイトで変更されることがあるので、
// うまく取得できない路線があったら developer-dc.odpt.org のAPI仕様で
// 正式なIDを確認してみてください。

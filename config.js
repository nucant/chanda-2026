// Paste your Apps Script web-app URL here (ends with /exec).
// If left empty, only the admin profile is asked for it (and it is remembered on that device).
window.CHANDA_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbwsLtxL1HaHbnDEuLbE9keB3VQH3fRxxCxOLQB6lDJKeVMDgJ3wy9hTxemnxl81DPfrtg/exec",
  YEAR: 2026,
  TITLE: "Madarat Uttarpara",
  TITLE_BN: "দুর্গোৎসব কমিটি · Chanda 2026",
  ORG_EN: "Madarat Uttarpara Durgotsav Committee",
  ORG_BN: "মাদারাট উত্তরপাড়া দুর্গোৎসব কমিটি",
  COLLECTORS: ["BABAI", "BUBAI", "SUVO", "PAPUN", "SOURAV", "BAPON", "TUBAI", "RAJU"],
  SHEET_URL: "https://docs.google.com/spreadsheets/d/12RNmDQBZHLUf4Pa7nZobkVCmtPfMU7TgvJ3vyurqVZo/edit?gid=0#gid=0",

  // Durga Puja 2026 (India time). The countdown runs to the day marked main: true (Shashti).
  PUJA: [
    { en: "Mahalaya", bn: "মহালয়া", date: "2026-10-10" },
    { en: "Shashti", bn: "ষষ্ঠী", date: "2026-10-16", main: true },
    { en: "Saptami", bn: "সপ্তমী", date: "2026-10-17", end: "2026-10-18" },
    { en: "Ashtami", bn: "অষ্টমী", date: "2026-10-19" },
    { en: "Nabami", bn: "নবমী", date: "2026-10-20" },
    { en: "Bijaya Dashami", bn: "বিজয়া দশমী", date: "2026-10-21" }
  ]
};

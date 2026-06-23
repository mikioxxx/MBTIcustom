const AXES = [
  { key: "action", label: "行動力", en: "ACTION" },
  { key: "social", label: "社交性", en: "SOCIAL" },
  { key: "logic", label: "論理性", en: "LOGIC" },
  { key: "sensitivity", label: "感受性", en: "SENSITIVITY" },
  { key: "stability", label: "安定志向", en: "STABILITY" },
  { key: "originality", label: "独創性", en: "ORIGINALITY" },
  { key: "planning", label: "計画性", en: "PLANNING" },
  { key: "assertive", label: "自己主張", en: "ASSERTIVE" }
];

const DIVINATION_IMAGES = {
  numerology: "pic/numerology.png",
  western: "pic/western-astrology.png",
  "four-pillars": "pic/four-pillars.png",
  "nine-star": "pic/nine-star.png",
  mansion: "pic/mansion.png",
  zodiac: "pic/zodiac.png"
};

const QUESTIONS = [
  {
    topic: "FREE DAY / 突然の休日", text: "予定が急になくなり、丸一日自由になった。どう過ごす？",
    choices: [
      { text: "気になっていた場所へ、そのまま出かける", effects: { action: 10, originality: 4, planning: -6, stability: -5 } },
      { text: "友人を誘って、面白そうな予定を作る", effects: { social: 10, action: 5, sensitivity: 2, planning: -2 } },
      { text: "やりたかったことを整理して、ひとつ進める", effects: { planning: 8, logic: 5, originality: 5, stability: 3 } },
      { text: "家で休み、その日の気分に任せる", effects: { stability: 8, sensitivity: 6, social: -4, action: -4 } }
    ]
  },
  {
    topic: "CONFLICT / 意見の衝突", text: "チームで意見が真っ二つに割れた。あなたはどう動く？",
    choices: [
      { text: "自分の案が最善だと思う理由を、はっきり伝える", effects: { assertive: 10, logic: 7, action: 4, sensitivity: -3 } },
      { text: "双方の本音を聞き、納得できる着地点を探す", effects: { social: 7, sensitivity: 9, stability: 4, assertive: -2 } },
      { text: "情報を整理し、条件ごとの利点と欠点を示す", effects: { logic: 10, planning: 7, sensitivity: -2, action: -2 } },
      { text: "しばらく様子を見て、必要なときだけ発言する", effects: { stability: 5, sensitivity: 4, assertive: -7, social: -3 } }
    ]
  },
  {
    topic: "CHANCE / 新しい誘い", text: "魅力的だが、成功する保証のない話が舞い込んだ。",
    choices: [
      { text: "面白そうなら即決。細かいことは後で考える", effects: { action: 12, originality: 6, stability: -8, planning: -6 } },
      { text: "経験者に相談し、人との縁も含めて判断する", effects: { social: 7, sensitivity: 5, planning: 4, assertive: -2 } },
      { text: "条件と失敗時の損失を調べてから決める", effects: { logic: 10, planning: 9, stability: 5, action: -3 } },
      { text: "今の生活を崩すほどなら、今回は見送る", effects: { stability: 11, planning: 3, action: -8, originality: -3 } }
    ]
  },
  {
    topic: "TROUBLE / 旅先のトラブル", text: "旅行先で予定していた交通手段が突然止まった。",
    choices: [
      { text: "別ルートを即座に探し、とにかく動き始める", effects: { action: 10, logic: 5, assertive: 4, stability: -3 } },
      { text: "周囲の人に聞き、現地ならではの案を集める", effects: { social: 9, originality: 5, sensitivity: 3, planning: -2 } },
      { text: "情報を比較し、全体の予定を組み直す", effects: { planning: 10, logic: 9, stability: 3, action: -2 } },
      { text: "予定変更も旅の一部として、近くでゆっくりする", effects: { sensitivity: 7, stability: 7, originality: 4, assertive: -3 } }
    ]
  },
  {
    topic: "GIFT / 贈りもの", text: "大切な人への誕生日プレゼントを選ぶなら？",
    choices: [
      { text: "相手が欲しいと言っていた実用品を選ぶ", effects: { sensitivity: 6, logic: 6, stability: 6, originality: -2 } },
      { text: "一緒に楽しめる体験やイベントを贈る", effects: { social: 8, action: 6, originality: 5, stability: -2 } },
      { text: "意外性のある、誰とも被らないものを探す", effects: { originality: 11, sensitivity: 4, planning: 3, stability: -4 } },
      { text: "本人に直接聞いて、確実に喜ぶものにする", effects: { assertive: 5, logic: 7, stability: 7, originality: -4 } }
    ]
  },
  {
    topic: "DEADLINE / 締切前", text: "重要な締切まで、あと一週間。進捗はまだ半分。",
    choices: [
      { text: "今日から予定を切り直し、毎日少しずつ終わらせる", effects: { planning: 12, stability: 6, logic: 5, originality: -2 } },
      { text: "一気に集中できる日を作り、短期決戦に持ち込む", effects: { action: 9, assertive: 4, planning: -4, stability: -3 } },
      { text: "周囲に協力を頼み、役割を分けて進める", effects: { social: 9, assertive: 5, planning: 5, sensitivity: 2 } },
      { text: "完成度を守るため、やること自体を絞り込む", effects: { logic: 9, stability: 5, originality: 3, sensitivity: -2 } }
    ]
  },
  {
    topic: "PARTY / 知らない集まり", text: "知り合いが一人しかいない集まりに参加した。",
    choices: [
      { text: "近くの人へ自分から話しかけ、輪を広げる", effects: { social: 12, action: 7, assertive: 5, sensitivity: -2 } },
      { text: "知り合いのそばで、自然に紹介されるのを待つ", effects: { social: 3, stability: 7, sensitivity: 5, assertive: -4 } },
      { text: "興味深い人を観察し、話題が見つかったら話す", effects: { sensitivity: 7, logic: 5, originality: 4, action: -2 } },
      { text: "無理に馴染まず、自分のペースでその場を味わう", effects: { originality: 6, stability: 5, social: -7, assertive: 2 } }
    ]
  },
  {
    topic: "CRITICISM / 厳しい指摘", text: "自信のあった成果物に、厳しいダメ出しを受けた。",
    choices: [
      { text: "まず反論し、自分の意図をきちんと説明する", effects: { assertive: 11, action: 5, logic: 3, sensitivity: -5 } },
      { text: "傷つくが、相手がなぜそう感じたかを考える", effects: { sensitivity: 11, social: 4, originality: 2, assertive: -4 } },
      { text: "使える指摘だけ抽出し、すぐ改善案へ落とす", effects: { logic: 10, planning: 7, action: 6, sensitivity: -3 } },
      { text: "いったん距離を置き、落ち着いてから見直す", effects: { stability: 8, sensitivity: 6, action: -5, assertive: -3 } }
    ]
  },
  {
    topic: "SHOPPING / 大きな買い物", text: "ずっと欲しかった高価なものを、ついに買えそう。",
    choices: [
      { text: "欲しい気持ちが固いなら、その場で決める", effects: { action: 9, assertive: 6, sensitivity: 3, planning: -5 } },
      { text: "口コミや価格を比較し、最も合理的な店を選ぶ", effects: { logic: 11, planning: 10, stability: 5, originality: -3 } },
      { text: "詳しい友人に相談し、背中を押してもらう", effects: { social: 7, sensitivity: 5, assertive: -3, logic: 2 } },
      { text: "もう少し貯めて、余裕を持って買えるまで待つ", effects: { stability: 11, planning: 7, action: -6, sensitivity: -2 } }
    ]
  },
  {
    topic: "PROJECT / 新企画", text: "グループで新しい企画をゼロから考えることになった。",
    choices: [
      { text: "最初に大胆なアイデアを出し、議論を動かす", effects: { originality: 11, assertive: 8, action: 7, stability: -4 } },
      { text: "全員が話せる空気を作り、意見をつなげる", effects: { social: 10, sensitivity: 8, assertive: -2, logic: 2 } },
      { text: "目的と制約を整理し、実現可能な案を組み立てる", effects: { logic: 10, planning: 10, stability: 5, originality: -2 } },
      { text: "出てきた案を見ながら、足りない視点を補う", effects: { sensitivity: 6, originality: 6, logic: 5, action: -3 } }
    ]
  },
  {
    topic: "FRIEND / 深夜の相談", text: "友人から深夜に『今すぐ話を聞いて』と連絡が来た。",
    choices: [
      { text: "すぐ電話し、相手が落ち着くまで付き合う", effects: { sensitivity: 12, social: 8, action: 5, stability: -3 } },
      { text: "何が起きたか整理し、具体的な解決策を考える", effects: { logic: 9, planning: 6, sensitivity: 3, social: 2 } },
      { text: "今夜できる範囲を伝え、翌日に改めて時間を取る", effects: { assertive: 7, stability: 9, planning: 5, sensitivity: -2 } },
      { text: "気分転換になるよう、少し笑える話へ連れ出す", effects: { originality: 7, social: 8, action: 5, logic: -3 } }
    ]
  },
  {
    topic: "TURNING POINT / 人生の転機", text: "今の環境を離れれば、大きく成長できそうだと感じた。",
    choices: [
      { text: "直感を信じて、新しい環境へ飛び込む", effects: { action: 12, originality: 8, assertive: 6, stability: -9 } },
      { text: "大切な人たちと話し、関係を守れる道を探す", effects: { social: 8, sensitivity: 9, stability: 5, assertive: -2 } },
      { text: "数年後まで見通し、移る条件と時期を決める", effects: { planning: 11, logic: 10, stability: 5, action: -2 } },
      { text: "今の場所で変えられることを、まず試してみる", effects: { stability: 8, originality: 5, action: 4, planning: 4 } }
    ]
  }
];

const ZODIAC = [
  ["山羊座", 120, { action: 42, social: 40, logic: 76, sensitivity: 42, stability: 84, originality: 36, planning: 90, assertive: 62 }],
  ["水瓶座", 219, { action: 58, social: 56, logic: 68, sensitivity: 46, stability: 34, originality: 94, planning: 48, assertive: 66 }],
  ["魚座", 321, { action: 42, social: 52, logic: 32, sensitivity: 94, stability: 44, originality: 76, planning: 36, assertive: 30 }],
  ["牡羊座", 420, { action: 94, social: 68, logic: 52, sensitivity: 42, stability: 28, originality: 62, planning: 34, assertive: 92 }],
  ["牡牛座", 521, { action: 38, social: 48, logic: 58, sensitivity: 68, stability: 96, originality: 42, planning: 72, assertive: 58 }],
  ["双子座", 622, { action: 78, social: 90, logic: 74, sensitivity: 46, stability: 28, originality: 78, planning: 38, assertive: 64 }],
  ["蟹座", 723, { action: 44, social: 54, logic: 38, sensitivity: 92, stability: 78, originality: 48, planning: 64, assertive: 36 }],
  ["獅子座", 823, { action: 86, social: 84, logic: 50, sensitivity: 58, stability: 54, originality: 72, planning: 54, assertive: 94 }],
  ["乙女座", 923, { action: 48, social: 40, logic: 92, sensitivity: 56, stability: 78, originality: 46, planning: 94, assertive: 44 }],
  ["天秤座", 1024, { action: 58, social: 88, logic: 64, sensitivity: 66, stability: 58, originality: 62, planning: 54, assertive: 38 }],
  ["蠍座", 1123, { action: 62, social: 38, logic: 62, sensitivity: 88, stability: 72, originality: 70, planning: 76, assertive: 82 }],
  ["射手座", 1222, { action: 92, social: 76, logic: 58, sensitivity: 48, stability: 24, originality: 84, planning: 30, assertive: 78 }]
];

const NUMEROLOGY = {
  1: ["開拓者", { action: 92, social: 58, logic: 62, sensitivity: 36, stability: 42, originality: 76, planning: 54, assertive: 94 }],
  2: ["調停者", { action: 34, social: 72, logic: 44, sensitivity: 90, stability: 70, originality: 48, planning: 62, assertive: 24 }],
  3: ["表現者", { action: 78, social: 92, logic: 40, sensitivity: 64, stability: 30, originality: 94, planning: 32, assertive: 70 }],
  4: ["建設者", { action: 52, social: 36, logic: 84, sensitivity: 40, stability: 96, originality: 28, planning: 94, assertive: 56 }],
  5: ["冒険者", { action: 96, social: 82, logic: 52, sensitivity: 48, stability: 18, originality: 82, planning: 26, assertive: 76 }],
  6: ["守護者", { action: 48, social: 74, logic: 48, sensitivity: 86, stability: 84, originality: 44, planning: 72, assertive: 46 }],
  7: ["探究者", { action: 34, social: 26, logic: 94, sensitivity: 66, stability: 62, originality: 82, planning: 76, assertive: 40 }],
  8: ["達成者", { action: 86, social: 58, logic: 82, sensitivity: 28, stability: 72, originality: 56, planning: 88, assertive: 94 }],
  9: ["理想家", { action: 58, social: 72, logic: 46, sensitivity: 92, stability: 48, originality: 78, planning: 46, assertive: 50 }],
  11: ["直感の伝達者", { action: 58, social: 70, logic: 40, sensitivity: 98, stability: 34, originality: 96, planning: 42, assertive: 56 }],
  22: ["大いなる建設者", { action: 82, social: 62, logic: 88, sensitivity: 56, stability: 84, originality: 70, planning: 96, assertive: 86 }],
  33: ["無条件の奉仕者", { action: 52, social: 86, logic: 38, sensitivity: 98, stability: 66, originality: 68, planning: 58, assertive: 34 }]
};

const STEMS = [
  ["甲", "木の陽", { action: 78, social: 58, logic: 54, sensitivity: 48, stability: 62, originality: 64, planning: 68, assertive: 82 }],
  ["乙", "木の陰", { action: 52, social: 66, logic: 48, sensitivity: 78, stability: 64, originality: 72, planning: 66, assertive: 38 }],
  ["丙", "火の陽", { action: 94, social: 88, logic: 42, sensitivity: 54, stability: 28, originality: 72, planning: 36, assertive: 88 }],
  ["丁", "火の陰", { action: 64, social: 62, logic: 46, sensitivity: 88, stability: 48, originality: 82, planning: 52, assertive: 52 }],
  ["戊", "土の陽", { action: 62, social: 54, logic: 64, sensitivity: 42, stability: 94, originality: 34, planning: 78, assertive: 72 }],
  ["己", "土の陰", { action: 48, social: 66, logic: 58, sensitivity: 70, stability: 88, originality: 40, planning: 82, assertive: 42 }],
  ["庚", "金の陽", { action: 88, social: 44, logic: 86, sensitivity: 32, stability: 68, originality: 52, planning: 74, assertive: 94 }],
  ["辛", "金の陰", { action: 52, social: 48, logic: 82, sensitivity: 72, stability: 68, originality: 70, planning: 86, assertive: 62 }],
  ["壬", "水の陽", { action: 74, social: 76, logic: 68, sensitivity: 62, stability: 34, originality: 84, planning: 44, assertive: 66 }],
  ["癸", "水の陰", { action: 38, social: 46, logic: 70, sensitivity: 94, stability: 56, originality: 78, planning: 64, assertive: 34 }]
];

const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ANIMALS = ["鼠", "牛", "虎", "兎", "龍", "蛇", "馬", "羊", "猿", "鶏", "犬", "猪"];
const ANIMAL_PROFILES = [
  [72, 72, 84, 54, 56, 76, 68, 62], [48, 36, 68, 48, 96, 34, 88, 64],
  [94, 64, 48, 44, 34, 72, 42, 94], [42, 72, 46, 88, 72, 64, 58, 32],
  [88, 78, 64, 42, 52, 82, 62, 92], [58, 44, 90, 64, 66, 78, 88, 74],
  [96, 84, 44, 48, 24, 72, 30, 84], [38, 68, 42, 94, 74, 78, 58, 28],
  [82, 88, 78, 42, 32, 96, 42, 68], [64, 58, 72, 48, 70, 68, 74, 88],
  [58, 76, 58, 80, 86, 42, 70, 66], [56, 82, 48, 78, 68, 64, 44, 48]
];

const NINE_STARS = [
  ["一白水星", "静かな水", [42, 52, 72, 88, 58, 78, 62, 34]],
  ["二黒土星", "育てる大地", [38, 64, 54, 82, 94, 36, 82, 30]],
  ["三碧木星", "芽吹く雷", [94, 82, 52, 48, 30, 76, 34, 86]],
  ["四緑木星", "行き渡る風", [62, 94, 58, 72, 54, 70, 64, 42]],
  ["五黄土星", "中心の大地", [82, 58, 68, 46, 78, 54, 72, 98]],
  ["六白金星", "天の鋼", [76, 46, 92, 32, 78, 58, 94, 88]],
  ["七赤金星", "実りの沢", [72, 96, 56, 66, 48, 74, 42, 64]],
  ["八白土星", "動かぬ山", [48, 34, 76, 54, 98, 44, 86, 72]],
  ["九紫火星", "照らす火", [86, 76, 64, 84, 32, 94, 48, 78]]
];

const MANSIONS = ["昴", "畢", "觜", "参", "井", "鬼", "柳", "星", "張", "翼", "軫", "角", "亢", "氐", "房", "心", "尾", "箕", "斗", "女", "虚", "危", "室", "壁", "奎", "婁", "胃"];
const MANSION_TITLES = ["孤高の美学", "静かな継続", "鋭い観察", "大胆な突破", "知恵の泉", "無垢な直感", "深い情念", "堂々たる主役", "華やかな表現", "理想への飛翔", "柔軟な交渉", "先駆けの角", "慎重な守り", "芯ある反骨", "愛情の磁場", "秘めた集中", "燃える執念", "自由な旅", "公平な采配", "細やかな感性", "空想の余白", "危うい魅力", "大きな器", "内なる防壁", "品格の光", "つながる縁", "現実への執着"];

const state = { birthDate: null, contenders: [], answers: [], questionIndex: 0 };

const els = Object.fromEntries([
  "introView", "contendersView", "quizView", "resultView", "birthForm", "birthYear", "birthMonth", "birthDay", "formError",
  "birthDateLabel", "contenderGrid", "startQuizButton", "quitQuizButton", "questionCounter", "progressFill",
  "questionAxis", "questionNumber", "questionText", "answerGrid", "previousButton", "winnerMark", "winnerImage", "winnerName",
  "winnerScore", "winnerReason", "winnerReading", "rankingList", "profileBars", "retryButton"
].map((id) => [id, document.getElementById(id)]));

els.birthForm.addEventListener("submit", handleBirthSubmit);
els.birthYear.addEventListener("change", updateDayOptions);
els.birthMonth.addEventListener("change", updateDayOptions);
els.startQuizButton.addEventListener("click", startQuiz);
els.quitQuizButton.addEventListener("click", () => showView("contenders"));
els.previousButton.addEventListener("click", previousQuestion);
els.retryButton.addEventListener("click", resetApp);

setupBirthPicker();

function setupBirthPicker() {
  const currentYear = new Date().getFullYear();
  els.birthYear.insertAdjacentHTML("beforeend", Array.from({ length: currentYear - 1899 }, (_, index) => {
    const year = currentYear - index;
    return `<option value="${year}">${year}</option>`;
  }).join(""));
  els.birthMonth.insertAdjacentHTML("beforeend", Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return `<option value="${month}">${month}</option>`;
  }).join(""));
  updateDayOptions();
}

function updateDayOptions() {
  const selectedDay = Number(els.birthDay.value);
  const year = Number(els.birthYear.value) || 2000;
  const month = Number(els.birthMonth.value) || 1;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  els.birthDay.innerHTML = '<option value="">日</option>' + Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return `<option value="${day}">${day}</option>`;
  }).join("");
  if (selectedDay && selectedDay <= daysInMonth) els.birthDay.value = String(selectedDay);
}

function handleBirthSubmit(event) {
  event.preventDefault();
  els.formError.textContent = "";
  if (!els.birthYear.value || !els.birthMonth.value || !els.birthDay.value) {
    els.formError.textContent = "生年月日を入力してください。";
    return;
  }
  const year = Number(els.birthYear.value);
  const month = Number(els.birthMonth.value);
  const day = Number(els.birthDay.value);
  const date = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day || date.getTime() > todayUtc) {
    els.formError.textContent = "正しい生年月日を入力してください。";
    return;
  }
  state.birthDate = date;
  state.contenders = calculateContenders(date);
  renderContenders();
  showView("contenders");
}

function calculateContenders(date) {
  return [getNumerology(date), getWesternAstrology(date), getFourPillars(date), getNineStar(date), getMansion(date), getChineseZodiac(date)];
}

function getNumerology(date) {
  const raw = `${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}`.split("").reduce((sum, n) => sum + Number(n), 0);
  const number = reduceNumber(raw, true);
  const [title, profile] = NUMEROLOGY[number] || NUMEROLOGY[reduceNumber(number)];
  return {
    id: "numerology", name: "数秘術", mark: String(number), type: `ライフパス ${number}｜${title}`,
    reason: `生年月日の数字を合計すると${raw}、還元数が「${number}」になるので――`,
    reading: readingFromProfile(profile), profile
  };
}

function getWesternAstrology(date) {
  const md = (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
  const boundaries = [120, 219, 321, 420, 521, 622, 723, 823, 923, 1024, 1123, 1222];
  let zodiacIndex = 0;
  for (let index = 0; index < boundaries.length - 1; index += 1) {
    if (md >= boundaries[index] && md < boundaries[index + 1]) zodiacIndex = index + 1;
  }
  const selected = ZODIAC[zodiacIndex];
  const [name, , profile] = selected;
  return {
    id: "western", name: "西洋占星術", mark: "☉", type: `太陽星座｜${name}`,
    reason: `太陽が「${name}」の領域を通る誕生日なので――`,
    reading: readingFromProfile(profile), profile
  };
}

function getFourPillars(date) {
  const anchor = Date.UTC(2000, 0, 7);
  const days = Math.floor((date.getTime() - anchor) / 86400000);
  const cycle = mod(days, 60);
  const stem = STEMS[cycle % 10];
  const branch = BRANCHES[cycle % 12];
  const profile = blendProfiles(stem[2], arrayToProfile(ANIMAL_PROFILES[cycle % 12]), 0.72);
  return {
    id: "four-pillars", name: "四柱推命", mark: stem[0], type: `日柱｜${stem[0]}${branch}（${stem[1]}）`,
    reason: `生まれ日の中心を表す日干が「${stem[0]}」、日支が「${branch}」になるので――`,
    reading: readingFromProfile(profile), profile
  };
}

function getNineStar(date) {
  const adjustedYear = date.getUTCMonth() === 0 || (date.getUTCMonth() === 1 && date.getUTCDate() < 4)
    ? date.getUTCFullYear() - 1 : date.getUTCFullYear();
  const digit = reduceNumber(String(adjustedYear).split("").reduce((sum, n) => sum + Number(n), 0));
  const starNumber = mod(11 - digit - 1, 9) + 1;
  const [name, symbol, values] = NINE_STARS[starNumber - 1];
  const profile = arrayToProfile(values);
  return {
    id: "nine-star", name: "九星気学", mark: String(starNumber), type: `本命星｜${name}`,
    reason: `立春を年の境として見ると、本命星が「${name}」、象意が「${symbol}」になるので――`,
    reading: readingFromProfile(profile), profile
  };
}

function getMansion(date) {
  const anchor = Date.UTC(2000, 0, 7);
  const index = mod(Math.floor((date.getTime() - anchor) / 86400000) + 9, 27);
  const values = AXES.map((_, i) => 30 + mod(index * 17 + i * 23 + (i % 2) * 11, 67));
  const profile = arrayToProfile(values);
  return {
    id: "mansion", name: "宿曜占星術", mark: MANSIONS[index], type: `${MANSIONS[index]}宿｜${MANSION_TITLES[index]}`,
    reason: `生まれ日の月の宿が、二十七宿の「${MANSIONS[index]}宿」に当たるので――`,
    reading: readingFromProfile(profile), profile
  };
}

function getChineseZodiac(date) {
  const year = date.getUTCFullYear();
  const stemIndex = mod(year - 4, 10);
  const animalIndex = mod(year - 4, 12);
  const stem = STEMS[stemIndex];
  const profile = blendProfiles(stem[2], arrayToProfile(ANIMAL_PROFILES[animalIndex]), 0.45);
  return {
    id: "zodiac", name: "干支占い", mark: BRANCHES[animalIndex], type: `${stem[0]}${BRANCHES[animalIndex]}｜${ANIMALS[animalIndex]}年`,
    reason: `生まれ年の干支が「${stem[0]}${BRANCHES[animalIndex]}」、${stem[1]}と${ANIMALS[animalIndex]}の気質を持つので――`,
    reading: readingFromProfile(profile), profile
  };
}

function renderContenders() {
  const date = state.birthDate;
  els.birthDateLabel.textContent = `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, "0")}.${String(date.getUTCDate()).padStart(2, "0")}`;
  els.contenderGrid.innerHTML = state.contenders.map((item, index) => `
    <article class="contender-card" data-mark="${item.mark}">
      <figure class="contender-image"><img src="${DIVINATION_IMAGES[item.id]}" alt="${item.name}のキャラクター" loading="lazy" /></figure>
      <span class="contender-index">CONTENDER ${String(index + 1).padStart(2, "0")}</span>
      <h3 class="contender-name">${item.name}</h3>
      <div class="contender-type">${item.type}</div>
      <p class="contender-reason">${item.reason}</p>
      <p class="contender-reading">${item.reading}</p>
    </article>
  `).join("");
}

function startQuiz() {
  state.answers = Array(QUESTIONS.length).fill(null);
  state.questionIndex = 0;
  renderQuestion();
  showView("quiz");
}

function renderQuestion() {
  const index = state.questionIndex;
  const question = QUESTIONS[index];
  els.questionCounter.textContent = `ROUND ${String(index + 1).padStart(2, "0")} / ${QUESTIONS.length}`;
  els.progressFill.style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;
  els.questionAxis.textContent = question.topic;
  els.questionNumber.textContent = String(index + 1).padStart(2, "0");
  els.questionText.textContent = question.text;
  els.previousButton.style.visibility = index === 0 ? "hidden" : "visible";
  els.answerGrid.innerHTML = question.choices.map((choice, answerIndex) => `
    <button class="answer-button ${state.answers[index] === answerIndex ? "is-selected" : ""}" type="button" data-value="${answerIndex}">
      <strong>${String.fromCharCode(65 + answerIndex)}</strong><span>${choice.text}</span>
    </button>
  `).join("");
  els.answerGrid.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => answerQuestion(Number(button.dataset.value))));
}

function answerQuestion(value) {
  state.answers[state.questionIndex] = value;
  els.answerGrid.querySelectorAll("button").forEach((button) => button.classList.toggle("is-selected", Number(button.dataset.value) === value));
  window.setTimeout(() => {
    if (state.questionIndex === QUESTIONS.length - 1) showResults();
    else {
      state.questionIndex += 1;
      renderQuestion();
    }
  }, 150);
}

function previousQuestion() {
  if (state.questionIndex === 0) return;
  state.questionIndex -= 1;
  renderQuestion();
}

function showResults() {
  const userProfile = calculateUserProfile();
  const measured = state.contenders.map((item) => ({ ...item, distance: profileDistance(item.profile, userProfile) }));
  const bestDistance = Math.min(...measured.map((item) => item.distance));
  const results = measured
    .map((item) => ({ ...item, score: similarity(item.distance, bestDistance) }))
    .sort((a, b) => b.score - a.score);
  const winner = results[0];
  els.winnerMark.textContent = winner.mark;
  els.winnerImage.src = DIVINATION_IMAGES[winner.id];
  els.winnerImage.alt = `${winner.name}のキャラクター`;
  els.winnerName.textContent = winner.name;
  els.winnerScore.textContent = winner.score;
  els.winnerReason.textContent = winner.reason;
  els.winnerReading.textContent = `あなたの回答と最も重なったのは「${winner.type}」の読み。${winner.reading}`;
  els.rankingList.innerHTML = results.map((item, index) => `
    <div class="ranking-row">
      <span class="rank-number">${String(index + 1).padStart(2, "0")}</span>
      <div class="rank-name"><img src="${DIVINATION_IMAGES[item.id]}" alt="" loading="lazy" /><div><strong>${item.name}</strong><span>${item.type}</span></div></div>
      <div class="rank-bar"><span style="width:${item.score}%"></span></div>
      <b class="rank-score">${item.score}%</b>
      <div class="rank-detail">
        <div class="rank-radar-wrap">
          <canvas class="rank-radar" data-radar-index="${index}" width="280" height="280" aria-label="${item.name}と本人回答の特性比較"></canvas>
        </div>
        <div class="rank-copy">
          <p class="rank-reason">${item.reason}</p>
          <p class="rank-reading">${item.reading}</p>
        </div>
      </div>
    </div>
  `).join("");
  renderComparisonRadars(results, userProfile);
  els.profileBars.innerHTML = AXES.map((axis) => `
    <div class="profile-row">
      <label>${axis.label}</label>
      <div class="profile-track"><span style="width:${userProfile[axis.key]}%"></span></div>
      <b>${userProfile[axis.key]}</b>
    </div>
  `).join("");
  showView("result");
}

function calculateUserProfile() {
  return Object.fromEntries(AXES.map((axis) => {
    let centeredTotal = 0;
    let varianceTotal = 0;

    QUESTIONS.forEach((question, index) => {
      const effects = question.choices.map((choice) => choice.effects[axis.key] || 0);
      const mean = effects.reduce((sum, value) => sum + value, 0) / effects.length;
      const selectedEffect = effects[state.answers[index]] ?? mean;
      centeredTotal += selectedEffect - mean;
      varianceTotal += effects.reduce((sum, value) => sum + (value - mean) ** 2, 0) / effects.length;
    });

    const standardized = varianceTotal > 0 ? centeredTotal / Math.sqrt(varianceTotal) : 0;
    const score = 50 + standardized * 16;
    return [axis.key, Math.round(Math.max(5, Math.min(95, score)))];
  }));
}

function profileDistance(profile, userProfile) {
  const meanSquaredDifference = AXES.reduce((sum, axis) => {
    const difference = profile[axis.key] - userProfile[axis.key];
    return sum + difference ** 2;
  }, 0) / AXES.length;
  return Math.sqrt(meanSquaredDifference);
}

function similarity(distance, bestDistance) {
  const baseScore = 100 - distance * 1.65;
  const separationPenalty = Math.max(0, distance - bestDistance) * 1.25;
  return Math.max(5, Math.min(96, Math.round(baseScore - separationPenalty)));
}

function renderComparisonRadars(results, userProfile) {
  document.querySelectorAll("[data-radar-index]").forEach((canvas) => {
    const result = results[Number(canvas.dataset.radarIndex)];
    drawComparisonRadar(canvas, result.profile, userProfile);
  });
}

function drawComparisonRadar(canvas, fortuneProfile, userProfile) {
  const ctx = canvas.getContext("2d");
  const center = canvas.width / 2;
  const radius = 76;
  const startAngle = -Math.PI / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineJoin = "round";

  for (let level = 1; level <= 4; level += 1) {
    drawRadarShape(ctx, AXES.map(() => level * 25), center, radius, startAngle, "rgba(238,232,218,.14)", "transparent", 1);
  }

  AXES.forEach((axis, index) => {
    const angle = startAngle + (Math.PI * 2 * index) / AXES.length;
    const edgeX = center + Math.cos(angle) * radius;
    const edgeY = center + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(edgeX, edgeY);
    ctx.strokeStyle = "rgba(238,232,218,.12)";
    ctx.stroke();

    const labelRadius = radius + 20;
    const labelX = center + Math.cos(angle) * labelRadius;
    const labelY = center + Math.sin(angle) * labelRadius;
    ctx.fillStyle = "#b9b0ca";
    ctx.font = '700 11px "Noto Sans JP", sans-serif';
    ctx.textAlign = Math.cos(angle) > 0.25 ? "left" : Math.cos(angle) < -0.25 ? "right" : "center";
    ctx.textBaseline = Math.sin(angle) > 0.25 ? "top" : Math.sin(angle) < -0.25 ? "bottom" : "middle";
    ctx.fillText(axis.label, labelX, labelY);
  });

  drawRadarShape(ctx, AXES.map((axis) => fortuneProfile[axis.key]), center, radius, startAngle, "#d8b66a", "rgba(216,182,106,.22)", 2.5);
  drawRadarShape(ctx, AXES.map((axis) => userProfile[axis.key]), center, radius, startAngle, "#c8a7ff", "rgba(200,167,255,.16)", 2.5);
}

function drawRadarShape(ctx, values, center, radius, startAngle, stroke, fill, lineWidth) {
  ctx.beginPath();
  values.forEach((value, index) => {
    const angle = startAngle + (Math.PI * 2 * index) / values.length;
    const distance = radius * (value / 100);
    const x = center + Math.cos(angle) * distance;
    const y = center + Math.sin(angle) * distance;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function readingFromProfile(profile) {
  const ordered = [...AXES].sort((a, b) => profile[b.key] - profile[a.key]);
  const strongest = ordered[0];
  const second = ordered[1];
  const weakest = ordered.at(-1);
  return `${strongest.label}と${second.label}が強く、${weakest.label}には縛られにくい人物と読みます。`;
}

function reduceNumber(number, keepMaster = false) {
  let value = Number(number);
  while (value > 9 && !(keepMaster && [11, 22, 33].includes(value))) {
    value = String(value).split("").reduce((sum, n) => sum + Number(n), 0);
  }
  return value;
}

function arrayToProfile(values) {
  return Object.fromEntries(AXES.map((axis, index) => [axis.key, values[index]]));
}

function blendProfiles(a, b, weightA = 0.5) {
  return Object.fromEntries(AXES.map((axis) => [axis.key, Math.round(a[axis.key] * weightA + b[axis.key] * (1 - weightA))]));
}

function mod(number, divisor) { return ((number % divisor) + divisor) % divisor; }

function showView(name) {
  const views = { intro: els.introView, contenders: els.contendersView, quiz: els.quizView, result: els.resultView };
  Object.entries(views).forEach(([key, element]) => element.classList.toggle("is-hidden", key !== name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetApp() {
  state.birthDate = null;
  state.contenders = [];
  state.answers = [];
  els.birthForm.reset();
  updateDayOptions();
  els.formError.textContent = "";
  showView("intro");
}

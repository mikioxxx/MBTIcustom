const LOVE_TYPES = [
  ["FCPE", "FCPE"],
  ["FCPO", "FCPO"],
  ["FCRE", "FCRE"],
  ["FCRO", "FCRO"],
  ["FAPE", "FAPE"],
  ["FAPO", "FAPO"],
  ["FARE", "FARE"],
  ["FARO", "FARO"],
  ["LCPE", "LCPE"],
  ["LCPO", "LCPO"],
  ["LCRE", "LCRE"],
  ["LCRO", "LCRO"],
  ["LAPE", "LAPE"],
  ["LAPO", "LAPO"],
  ["LARE", "LARE"],
  ["LARO", "LARO"]
];

const AXES = [
  ["dateActive", "体験デート"],
  ["dateRelax", "落ち着きデート"],
  ["contactFrequency", "連絡頻度"],
  ["contactDepth", "連絡の濃さ"],
  ["affectionOpen", "愛情表現"],
  ["jealousyTolerance", "嫉妬許容"],
  ["listenerDistance", "恋愛距離感"],
  ["supportResponse", "好意反応"]
];

const QUESTIONS = [
  {
    text: "理想のデート場所に近いものは？",
    options: [
      ["遊園地・イベント・ライブなど、一緒に盛り上がれる場所", { dateActive: 2, affectionOpen: 1 }],
      ["カフェ・レストランなど、話しやすい場所", { dateRelax: 1, contactDepth: 1 }],
      ["家・ホテルステイ・静かな場所でゆっくり", { dateRelax: 2, contactDepth: 1 }],
      ["相手が考えてくれた場所なら合わせたい", { jealousyTolerance: 1, listenerDistance: 1 }]
    ]
  },
  {
    text: "デート中に一番うれしいことは？",
    options: [
      ["予定をしっかり組んでリードしてくれる", { dateActive: 1, supportResponse: 1 }],
      ["たくさん話を聞いてくれる", { contactDepth: 2 }],
      ["自然体で落ち着いて過ごせる", { dateRelax: 2 }],
      ["好き・かわいいなどを言葉で伝えてくれる", { affectionOpen: 2 }]
    ]
  },
  {
    text: "連絡頻度の理想は？",
    options: [
      ["毎日たくさんやり取りしたい", { contactFrequency: 2, affectionOpen: 1 }],
      ["毎日少しは連絡がほしい", { contactFrequency: 1 }],
      ["用事があるとき中心でいい", { contactFrequency: -1, dateRelax: 1 }],
      ["返信ペースはかなり自由でいい", { contactFrequency: -2, jealousyTolerance: -1 }]
    ]
  },
  {
    text: "返信が遅い相手をどう感じやすい？",
    options: [
      ["少し不安になるので一言ほしい", { contactFrequency: 2, jealousyTolerance: 1 }],
      ["理由がわかれば気にならない", { contactDepth: 1 }],
      ["忙しいなら仕方ないと思う", { jealousyTolerance: -1 }],
      ["自分も遅いので全然気にしない", { contactFrequency: -2, dateRelax: 1 }]
    ]
  },
  {
    text: "連絡内容で重視するものは？",
    options: [
      ["日常の細かい共有", { contactFrequency: 1, contactDepth: 1 }],
      ["気持ちや本音の共有", { contactDepth: 2, affectionOpen: 1 }],
      ["予定や必要なことの確認", { contactDepth: -1 }],
      ["短くてもテンポよく続くこと", { contactFrequency: 1, supportResponse: 1 }]
    ]
  },
  {
    text: "愛情表現はどれが近い？",
    options: [
      ["言葉でも行動でもかなりわかりやすく出したい", { affectionOpen: 2, contactFrequency: 1 }],
      ["好きな人にはちゃんと伝える", { affectionOpen: 1 }],
      ["言葉より行動で伝わればいい", { affectionOpen: -1, contactDepth: 1 }],
      ["重すぎる表現は少し苦手", { affectionOpen: -2, jealousyTolerance: -1 }]
    ]
  },
  {
    text: "嫉妬や独占欲について近いものは？",
    options: [
      ["好きなら少し嫉妬されるとうれしい", { jealousyTolerance: 2, affectionOpen: 1 }],
      ["軽い嫉妬ならかわいいと思う", { jealousyTolerance: 1 }],
      ["信頼して自由にしてほしい", { jealousyTolerance: -1, listenerDistance: -1 }],
      ["束縛っぽい空気はかなり苦手", { jealousyTolerance: -2, listenerDistance: -2 }]
    ]
  },
  {
    text: "相手にされてうれしい応援は？",
    options: [
      ["言葉でたくさん褒めてくれる", { affectionOpen: 1, supportResponse: 1 }],
      ["忙しくても会いに来てくれる", { contactFrequency: 1, supportResponse: 2 }],
      ["静かに長く支えてくれる", { dateRelax: 1, supportResponse: 1 }],
      ["外でも周りに紹介してくれる", { dateActive: 1, supportResponse: 2 }]
    ]
  },
  {
    text: "好きな人との理想の距離感は？",
    options: [
      ["付き合う前から友達みたいに近く話したい", { listenerDistance: 2, contactFrequency: 1 }],
      ["少しずつ距離を縮めたい", { listenerDistance: 1, contactDepth: 1 }],
      ["近すぎず、お互いの時間も大事にしたい", { listenerDistance: -1, dateRelax: 1 }],
      ["最初から踏み込まれすぎるのは苦手", { listenerDistance: -2, jealousyTolerance: -1 }]
    ]
  },
  {
    text: "好きな人からの誘われ方でうれしいのは？",
    options: [
      ["楽しそうな場所に勢いよく誘ってくれる", { dateActive: 2, supportResponse: 1 }],
      ["行きたい場所を聞いて一緒に決めてくれる", { contactDepth: 1, dateRelax: 1 }],
      ["無理のない日程でゆっくり誘ってくれる", { dateRelax: 2 }],
      ["強引すぎず、断りやすい空気を作ってくれる", { jealousyTolerance: -1, listenerDistance: -1 }]
    ]
  },
  {
    text: "相手からの好意はどんな形が伝わりやすい？",
    options: [
      ["ストレートに好きと言ってくれる", { affectionOpen: 2, supportResponse: 1 }],
      ["会う時間や連絡をちゃんと作ってくれる", { contactFrequency: 1, supportResponse: 2 }],
      ["小さな気遣いを積み重ねてくれる", { dateRelax: 1, contactDepth: 1 }],
      ["派手さより、約束や態度で示してくれる", { supportResponse: -1, contactDepth: 1 }]
    ]
  },
  {
    text: "恋愛で安心しやすい相手は？",
    options: [
      ["連絡や愛情表現がわかりやすい人", { contactFrequency: 1, affectionOpen: 2 }],
      ["話し合いができて本音を聞いてくれる人", { contactDepth: 2 }],
      ["落ち着いていてペースを乱さない人", { dateRelax: 2, jealousyTolerance: -1 }],
      ["自由を尊重して詮索しすぎない人", { jealousyTolerance: -2, listenerDistance: -1 }]
    ]
  },
  {
    text: "付き合ったらどんな時間を増やしたい？",
    options: [
      ["外に出て新しい体験を一緒にしたい", { dateActive: 2 }],
      ["夜の電話や長めの会話を増やしたい", { contactFrequency: 1, contactDepth: 2 }],
      ["何もしないで一緒にいる時間を増やしたい", { dateRelax: 2 }],
      ["それぞれの予定も大事にしながら会いたい", { listenerDistance: -1, jealousyTolerance: -1 }]
    ]
  },
  {
    text: "恋愛で苦手になりやすい相手は？",
    options: [
      ["連絡が少なすぎる人", { contactFrequency: 2 }],
      ["気持ちを言葉にしない人", { affectionOpen: 2 }],
      ["予定を詰め込みすぎる人", { dateRelax: 2, dateActive: -1 }],
      ["束縛や詮索が強い人", { jealousyTolerance: -2, listenerDistance: -1 }]
    ]
  },
  {
    text: "理想の関係の進み方は？",
    options: [
      ["勢いと直感で一気に仲良くなりたい", { dateActive: 2, listenerDistance: 1 }],
      ["連絡を重ねて少しずつ深めたい", { contactFrequency: 1, contactDepth: 2 }],
      ["会ったときの空気感で自然に決めたい", { dateRelax: 1 }],
      ["お互いの生活を尊重しながら進みたい", { jealousyTolerance: -1, listenerDistance: -1 }]
    ]
  },
  {
    text: "相性診断で、特に合っていてほしいところは？",
    options: [
      ["連絡のテンポや会話の続き方", { contactFrequency: 1, contactDepth: 1 }],
      ["好きの伝え方や熱量", { affectionOpen: 1, supportResponse: 2 }],
      ["デートや一緒に過ごす時間の好み", { dateActive: 1, dateRelax: 1 }],
      ["距離感や自由の尊重", { jealousyTolerance: -1, listenerDistance: -1 }]
    ]
  }
];

const els = {
  form: document.querySelector("#profileForm"),
  creatorName: document.querySelector("#creatorName"),
  loveType: document.querySelector("#loveType"),
  questions: document.querySelector("#questions"),
  resetButton: document.querySelector("#resetButton"),
  resultPanel: document.querySelector("#resultPanel"),
  resultImage: document.querySelector("#resultImage"),
  resultText: document.querySelector("#resultText"),
  downloadButton: document.querySelector("#downloadButton"),
  copyTextButton: document.querySelector("#copyTextButton")
};

let currentResult = null;

init();

function init() {
  renderLoveTypes();
  renderQuestions();
  els.form.addEventListener("submit", handleSubmit);
  els.resetButton.addEventListener("click", resetForm);
  els.downloadButton.addEventListener("click", downloadImage);
  els.copyTextButton.addEventListener("click", copyResultText);
}

function renderLoveTypes() {
  LOVE_TYPES.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.loveType.append(option);
  });
}

function renderQuestions() {
  els.questions.innerHTML = QUESTIONS.map((question, questionIndex) => {
    const options = question.options.map(([label], optionIndex) => {
      const id = `q${questionIndex}-${optionIndex}`;
      return `
        <label class="option" for="${id}">
          <input id="${id}" type="radio" name="q${questionIndex}" value="${optionIndex}" required />
          <span>${label}</span>
        </label>
      `;
    }).join("");

    return `
      <article class="question-card">
        <p class="question-title">${questionIndex + 1}. ${question.text}</p>
        <div class="option-list">${options}</div>
      </article>
    `;
  }).join("");
}

function handleSubmit(event) {
  event.preventDefault();
  const answers = QUESTIONS.map((_, index) => {
    const selected = els.form.querySelector(`input[name="q${index}"]:checked`);
    return Number(selected.value);
  });

  currentResult = buildResult({
    name: els.creatorName.value.trim(),
    loveType: els.loveType.value,
    answers
  });

  const text = createResultText(currentResult);
  els.resultText.value = text;
  els.resultImage.src = createResultImage(currentResult, text);
  els.resultPanel.classList.remove("is-hidden");
  els.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
  els.form.reset();
  els.resultPanel.classList.add("is-hidden");
  currentResult = null;
}

function buildResult({ name, loveType, answers }) {
  const scores = Object.fromEntries(AXES.map(([key]) => [key, 50]));
  applyLoveTypeBase(scores, loveType);

  answers.forEach((answerIndex, questionIndex) => {
    const weights = QUESTIONS[questionIndex].options[answerIndex][1];
    Object.entries(weights).forEach(([key, value]) => {
      scores[key] += value * 7;
    });
  });

  Object.keys(scores).forEach((key) => {
    scores[key] = clamp(Math.round(scores[key]), 0, 100);
  });

  const profileName = getProfileName(scores);
  const profileSummary = getProfileSummary(profileName);
  const code = createSubmitCode(loveType, scores);

  return {
    name,
    loveType,
    scores,
    profileName,
    profileSummary,
    code,
    date: getTodayString()
  };
}

function applyLoveTypeBase(scores, loveType) {
  const [first, second, third, fourth] = loveType.split("");

  if (first === "F") {
    scores.affectionOpen += 5;
    scores.contactFrequency += 3;
  } else {
    scores.dateRelax += 4;
    scores.jealousyTolerance -= 2;
  }

  if (second === "C") {
    scores.contactDepth += 4;
    scores.dateRelax += 2;
  } else {
    scores.dateActive += 4;
    scores.listenerDistance += 2;
  }

  if (third === "P") {
    scores.listenerDistance += 3;
    scores.affectionOpen += 2;
  } else {
    scores.contactFrequency += 3;
    scores.jealousyTolerance += 2;
  }

  if (fourth === "E") {
    scores.supportResponse += 4;
    scores.dateActive += 2;
  } else {
    scores.dateRelax += 3;
    scores.contactDepth += 2;
  }
}

function getProfileName(scores) {
  if (scores.listenerDistance >= 72 && scores.supportResponse >= 72) {
    return "距離近め好意反応型";
  }
  if (scores.contactFrequency >= 72 && scores.contactDepth >= 70) {
    return "連絡密度高め対話型";
  }
  if (scores.dateRelax >= 72 && scores.listenerDistance <= 58) {
    return "落ち着き重視マイペース型";
  }
  if (scores.dateActive >= 72 && scores.affectionOpen >= 68) {
    return "体験共有わかりやすい愛情型";
  }
  if (scores.jealousyTolerance <= 40) {
    return "境界線しっかり安心型";
  }
  if (scores.affectionOpen >= 74) {
    return "愛情表現ストレート型";
  }
  return "バランス調整型";
}

function getProfileSummary(profileName) {
  const summaries = {
    距離近め好意反応型: [
      "好きな人とは早めに距離が縮まると気持ちが上がりやすいタイプ。",
      "連絡や言葉の反応がわかりやすい相手ほど相性を感じやすい。"
    ],
    連絡密度高め対話型: [
      "会えない時間も、連絡や会話で関係を育てたいタイプ。",
      "短いやり取りより、本音や日常を共有できる相手と合いやすい。"
    ],
    落ち着き重視マイペース型: [
      "刺激より安心感を大事にし、自然体でいられる関係を好むタイプ。",
      "急に距離を詰める相手より、ペースを尊重してくれる相手と合いやすい。"
    ],
    体験共有わかりやすい愛情型: [
      "一緒に出かけたり体験を共有することで気持ちが高まりやすいタイプ。",
      "好意を言葉や行動でまっすぐ出してくれる相手と相性が出やすい。"
    ],
    境界線しっかり安心型: [
      "好きでも自由やプライベートの線引きを大切にしたいタイプ。",
      "嫉妬や詮索が強い相手より、信頼して見守れる相手と合いやすい。"
    ],
    愛情表現ストレート型: [
      "好きな気持ちをわかりやすく伝えたり受け取ったりしたいタイプ。",
      "曖昧な駆け引きより、素直な言葉と態度がある相手と合いやすい。"
    ],
    バランス調整型: [
      "連絡、距離感、デートの好みを相手に合わせて調整しやすいタイプ。",
      "極端な熱量より、話し合いながら心地よい形を作れる相手と合いやすい。"
    ]
  };
  return summaries[profileName] || summaries.バランス調整型;
}

function createSubmitCode(loveType, scores) {
  const parts = [
    loveType,
    `A${scores.dateActive}`,
    `R${scores.dateRelax}`,
    `F${scores.contactFrequency}`,
    `D${scores.contactDepth}`,
    `E${scores.affectionOpen}`,
    `J${scores.jealousyTolerance}`,
    `L${scores.listenerDistance}`,
    `S${scores.supportResponse}`
  ];
  return parts.join("-");
}

function createResultText(result) {
  const scoreLines = AXES.map(([key, label]) => `${label}: ${result.scores[key]}`).join("\n");
  return [
    "女性ライバー相性診断用データ",
    "",
    `ライバー名: ${result.name}`,
    `ラブタイプ: ${result.loveType}`,
    `診断タイプ: ${result.profileName}`,
    "",
    "簡単な診断結果:",
    ...result.profileSummary,
    "",
    scoreLines,
    "",
    "提出コード:",
    result.code,
    "",
    `回答日: ${result.date}`
  ].join("\n");
}

function createResultImage(result) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 4;
  ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);

  let y = 112;
  drawText(ctx, "女性ライバー相性診断用データ", 72, y, 44, "700");
  y += 70;
  drawText(ctx, `回答日: ${result.date}`, 72, y, 28, "500", "#555555");
  y += 76;

  drawKeyValue(ctx, "ライバー名", result.name, y);
  y += 60;
  drawKeyValue(ctx, "ラブタイプ", result.loveType, y);
  y += 60;
  drawKeyValue(ctx, "診断タイプ", result.profileName, y);
  y += 70;

  drawText(ctx, "簡単な診断結果", 72, y, 32, "700");
  y += 46;
  result.profileSummary.forEach((line) => {
    y = drawWrappedText(ctx, line, 72, y, 936, 28, 40, "500", "#111111");
    y += 8;
  });
  y += 28;

  drawText(ctx, "スコア", 72, y, 34, "700");
  y += 42;

  AXES.forEach(([key, label]) => {
    drawScoreRow(ctx, label, result.scores[key], y);
    y += 56;
  });

  y += 32;
  drawText(ctx, "提出コード", 72, y, 34, "700");
  y += 58;
  drawWrappedCode(ctx, result.code, 72, y, 928, 38);

  y = 1312;
  ctx.strokeStyle = "#d6d6d6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(72, y - 38);
  ctx.lineTo(1008, y - 38);
  ctx.stroke();
  drawText(ctx, "この画像を保存してDMで送ってください", 72, y, 32, "700");
  drawText(ctx, "コードと数値が読めれば提出できます", 72, y + 46, 28, "500", "#555555");

  return canvas.toDataURL("image/png");
}

function drawKeyValue(ctx, key, value, y) {
  drawText(ctx, `${key}:`, 72, y, 30, "700", "#555555");
  drawText(ctx, value, 292, y, 34, "700");
}

function drawScoreRow(ctx, label, score, y) {
  drawText(ctx, label, 72, y, 30, "700");
  drawText(ctx, String(score), 354, y, 32, "700");
  ctx.fillStyle = "#eeeeee";
  ctx.fillRect(430, y - 26, 500, 26);
  ctx.fillStyle = "#111111";
  ctx.fillRect(430, y - 26, Math.round(500 * score / 100), 26);
}

function drawWrappedCode(ctx, code, x, y, maxWidth, fontSize) {
  ctx.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Consolas, monospace`;
  ctx.fillStyle = "#111111";
  const chunks = code.split("-");
  let line = "";
  let lineY = y;

  chunks.forEach((chunk, index) => {
    const next = line ? `${line}-${chunk}` : chunk;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, lineY);
      line = chunk;
      lineY += 52;
    } else {
      line = next;
    }

    if (index === chunks.length - 1 && line) {
      ctx.fillText(line, x, lineY);
    }
  });
}

function drawWrappedText(ctx, text, x, y, maxWidth, fontSize, lineHeight, weight = "500", color = "#111111") {
  ctx.font = `${weight} ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.fillStyle = color;
  let line = "";
  let lineY = y;

  Array.from(text).forEach((char, index, chars) => {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, lineY);
      line = char;
      lineY += lineHeight;
    } else {
      line = next;
    }

    if (index === chars.length - 1 && line) {
      ctx.fillText(line, x, lineY);
    }
  });

  return lineY + lineHeight;
}

function drawText(ctx, text, x, y, size, weight = "500", color = "#111111") {
  ctx.font = `${weight} ${size}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function downloadImage() {
  if (!currentResult) return;
  const link = document.createElement("a");
  link.href = els.resultImage.src;
  link.download = `female-liver-profile-${currentResult.name || "result"}.png`;
  link.click();
}

async function copyResultText() {
  if (!currentResult) return;
  await navigator.clipboard.writeText(els.resultText.value);
  els.copyTextButton.textContent = "コピーしました";
  window.setTimeout(() => {
    els.copyTextButton.textContent = "内容をコピー";
  }, 1400);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getTodayString() {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(new Date()).replaceAll("/", "-");
}

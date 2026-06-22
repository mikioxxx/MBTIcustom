const DATA_FILES = {
  config: "data/app-config.json",
  mbti: "data/mbti-compatibility.json",
  love: "data/love-type-compatibility.json",
  roles: "data/title-profiles.json",
  ranks: "data/rank-labels.json",
  copy: "data/copy-templates.json"
};

const state = {
  data: null,
  selectedMbti: "",
  selectedLove: "",
  answers: [],
  currentQuestion: 0,
  result: null
};

const els = {
  introView: document.querySelector("#introView"),
  quizView: document.querySelector("#quizView"),
  resultView: document.querySelector("#resultView"),
  mbtiOptions: document.querySelector("#mbtiOptions"),
  loveOptions: document.querySelector("#loveOptions"),
  startQuestionCount: document.querySelector("#startQuestionCount"),
  startButton: document.querySelector("#startButton"),
  questionCounter: document.querySelector("#questionCounter"),
  progressFill: document.querySelector("#progressFill"),
  questionText: document.querySelector("#questionText"),
  leftLabel: document.querySelector("#leftLabel"),
  rightLabel: document.querySelector("#rightLabel"),
  answerRow: document.querySelector("#answerRow"),
  backButton: document.querySelector("#backButton"),
  skipButton: document.querySelector("#skipButton"),
  resultTitle: document.querySelector("#resultTitle"),
  resultSubtitle: document.querySelector("#resultSubtitle"),
  scoreRing: document.querySelector("#scoreRing"),
  scoreValue: document.querySelector("#scoreValue"),
  rankLabel: document.querySelector("#rankLabel"),
  badgeRow: document.querySelector("#badgeRow"),
  radarCanvas: document.querySelector("#radarCanvas"),
  roleName: document.querySelector("#roleName"),
  mainDescription: document.querySelector("#mainDescription"),
  commentList: document.querySelector("#commentList"),
  resultCardImage: document.querySelector("#resultCardImage"),
  roleImage: document.querySelector("#roleImage"),
  shareButton: document.querySelector("#shareButton"),
  copyButton: document.querySelector("#copyButton"),
  restartButton: document.querySelector("#restartButton")
};

init();

async function init() {
  state.data = await loadAppData();
  els.startQuestionCount.textContent = `診断は${state.data.config.questions.length}問`;
  renderTypePicker();
  bindEvents();
}

async function loadAppData() {
  const entries = await Promise.all(
    Object.entries(DATA_FILES).map(async ([key, path]) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`${path} を読み込めませんでした`);
      }
      return [key, await response.json()];
    })
  );
  return Object.fromEntries(entries);
}

function bindEvents() {
  els.startButton.addEventListener("click", startQuiz);
  els.backButton.addEventListener("click", () => {
    if (state.currentQuestion > 0) {
      state.currentQuestion -= 1;
      renderQuestion();
    }
  });
  els.skipButton.addEventListener("click", goNext);
  els.restartButton.addEventListener("click", restart);
  els.copyButton.addEventListener("click", copyResultText);
  els.shareButton.addEventListener("click", shareResult);
}

function renderTypePicker() {
  const { config } = state.data;
  els.mbtiOptions.innerHTML = "";
  els.loveOptions.innerHTML = "";

  config.mbtiTypes.forEach((type) => {
    const button = createOptionButton(type.code, type.name, "mbti");
    els.mbtiOptions.append(button);
  });

  config.loveTypes.forEach((type) => {
    const button = createOptionButton(type.code, type.name, "love");
    els.loveOptions.append(button);
  });
}

function createOptionButton(code, name, group) {
  const button = document.createElement("button");
  button.className = "option-button";
  button.type = "button";
  button.dataset.code = code;
  button.dataset.group = group;
  button.setAttribute("aria-label", `${name} ${code}`);
  const imagePath = group === "mbti" ? `assets/mbti/${code}.png` : `assets/lovetype/${code}.png`;
  button.innerHTML = `
    <img class="option-image" src="${imagePath}" alt="${name} ${code}" loading="lazy" />
  `;
  button.addEventListener("click", () => {
    if (group === "mbti") {
      state.selectedMbti = state.selectedMbti === code ? "" : code;
    } else {
      state.selectedLove = state.selectedLove === code ? "" : code;
    }
    updateOptionSelection(group);
  });
  return button;
}

function updateOptionSelection(group) {
  const selected = group === "mbti" ? state.selectedMbti : state.selectedLove;
  document.querySelectorAll(`[data-group="${group}"]`).forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.code === selected);
  });
}

function startQuiz() {
  state.answers = Array(state.data.config.questions.length).fill(null);
  state.currentQuestion = 0;
  showView("quiz");
  renderQuestion();
}

function renderQuestion() {
  const { questions } = state.data.config;
  const question = questions[state.currentQuestion];
  const answered = state.answers[state.currentQuestion];
  const progress = (state.currentQuestion / questions.length) * 100;

  els.questionCounter.textContent = `${state.currentQuestion + 1} / ${questions.length}`;
  els.progressFill.style.width = `${progress}%`;
  els.questionText.textContent = question.text;
  els.leftLabel.textContent = question.left;
  els.rightLabel.textContent = question.right;
  els.answerRow.innerHTML = "";

  [1, 2, 3, 4, 5].forEach((value) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = value;
    button.classList.toggle("is-selected", answered === value);
    button.addEventListener("click", () => {
      state.answers[state.currentQuestion] = value;
      button.classList.add("is-selected");
      if (window.matchMedia("(max-width: 760px)").matches) {
        setTimeout(goNext, 160);
      } else {
        renderQuestion();
      }
    });
    els.answerRow.append(button);
  });

  els.backButton.disabled = state.currentQuestion === 0;
}

function goNext() {
  if (state.currentQuestion < state.data.config.questions.length - 1) {
    state.currentQuestion += 1;
    renderQuestion();
    return;
  }

  state.result = calculateResult();
  renderResult();
}

function calculateResult() {
  const { config, mbti, love, roles, ranks, copy } = state.data;
  const attributes = Object.fromEntries(config.attributes.map((attr) => [attr.key, 50]));
  const mbtiProfile = mbti[state.selectedMbti];
  const loveProfile = love[state.selectedLove];

  if (mbtiProfile) {
    mergeVector(attributes, mbtiProfile.vector, 0.34);
  }
  if (loveProfile) {
    mergeVector(attributes, loveProfile.vector, 0.34);
  }

  config.questions.forEach((question, index) => {
    const answer = state.answers[index] ?? 3;
    const normalized = answer - 3;
    Object.entries(question.weights).forEach(([key, weight]) => {
      attributes[key] += normalized * weight;
    });
  });

  Object.keys(attributes).forEach((key) => {
    attributes[key] = clamp(Math.round(attributes[key]), 8, 96);
  });

  const answerScore = average(Object.values(attributes));
  const mbtiScore = mbtiProfile?.baseScore ?? 72;
  const loveScore = loveProfile?.baseScore ?? 72;
  const completenessBoost = [state.selectedMbti, state.selectedLove].filter(Boolean).length * 1.5;
  const score = clamp(
    Math.round(mbtiScore * 0.4 + loveScore * 0.4 + answerScore * 0.2 + completenessBoost),
    24,
    99
  );

  const sortedAttributes = Object.entries(attributes).sort((a, b) => b[1] - a[1]);
  const primary = sortedAttributes[0][0];
  const secondary = sortedAttributes[1][0];
  const role = chooseRole(roles.roles, {
    primary,
    secondary,
    sortedAttributes,
    score,
    mbtiCode: state.selectedMbti,
    loveCode: state.selectedLove
  }) ?? roles.fallback;
  const rank = ranks.ranks.find((item) => score >= item.min);
  const primaryLabel = config.attributes.find((attr) => attr.key === primary).label;
  const secondaryLabel = config.attributes.find((attr) => attr.key === secondary).label;
  const shareText = copy.shareText
    .replace("{roleName}", role.name)
    .replace("{score}", score)
    .replace("{rankLabel}", rank.label);

  return {
    score,
    rank,
    role,
    attributes,
    primary,
    secondary,
    primaryLabel,
    secondaryLabel,
    mbtiProfile,
    loveProfile,
    mbtiCode: state.selectedMbti,
    loveCode: state.selectedLove,
    comments: buildComments({ mbtiProfile, loveProfile, primary, rank }),
    shareText
  };
}

function mergeVector(target, vector, strength) {
  Object.entries(vector).forEach(([key, value]) => {
    target[key] += (value - 50) * strength;
  });
}

function chooseRole(roles, { primary, secondary, sortedAttributes, score, mbtiCode, loveCode }) {
  const seed = `${mbtiCode}:${loveCode}:${primary}:${secondary}:${score}`;
  const alternatePrimary = sortedAttributes[stableIndex(seed, Math.min(3, sortedAttributes.length))]?.[0] ?? primary;
  const primaryPool = score % 2 === 0 ? alternatePrimary : primary;
  const exact = roles.filter((role) => role.primary === primaryPool && role.secondary.includes(secondary));
  if (exact.length > 0) {
    return exact[stableIndex(seed, exact.length)];
  }
  const primaryMatches = roles.filter((role) => role.primary === primaryPool);
  if (primaryMatches.length > 0) {
    return primaryMatches[stableIndex(seed, primaryMatches.length)];
  }
  return null;
}

function stableIndex(seed, length) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return hash % length;
}

function buildComments({ mbtiProfile, loveProfile, primary, rank }) {
  const { copy } = state.data;
  return [
    mbtiProfile?.comment ?? copy.unknownMbti,
    loveProfile?.comment ?? copy.unknownLoveType,
    copy.attributeComments[primary],
    rank.comment
  ];
}

async function renderResult() {
  const result = state.result;
  showView("result");
  els.progressFill.style.width = "100%";
  els.resultTitle.textContent = `${result.score}% ${result.role.name}`;
  els.resultSubtitle.textContent = result.role.tagline;
  els.scoreValue.textContent = `${result.score}%`;
  els.rankLabel.textContent = result.rank.label;
  els.scoreRing.style.background = `
    radial-gradient(circle, rgba(7, 16, 12, 0.94) 0 56%, transparent 57%),
    conic-gradient(var(--gold-bright) ${result.score * 3.6}deg, rgba(244, 247, 232, 0.08) 0deg)
  `;
  els.badgeRow.innerHTML = "";
  [
    result.rank.label,
    `主属性: ${result.primaryLabel}`,
    `副属性: ${result.secondaryLabel}`,
    result.mbtiCode ? `MBTI: ${result.mbtiCode}` : "MBTI未選択",
    result.loveCode ? `Love: ${result.loveCode}` : "Love未選択"
  ].forEach((text) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = text;
    els.badgeRow.append(badge);
  });
  els.roleName.textContent = result.role.name;
  els.roleImage.src = result.role.image;
  els.roleImage.alt = `${result.role.name}の診断結果画像`;
  els.mainDescription.textContent = result.role.description;
  els.commentList.innerHTML = "";
  result.comments.forEach((comment) => {
    const item = document.createElement("p");
    item.className = "comment-item";
    item.textContent = comment;
    els.commentList.append(item);
  });
  drawRadar(result.attributes, els.radarCanvas);
  els.resultCardImage.removeAttribute("src");
  els.resultCardImage.src = await createResultCard(result);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function drawRadar(scores, canvas) {
  const { config } = state.data;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const center = width / 2;
  const radius = 106;
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(center, height / 2);

  for (let ring = 1; ring <= 4; ring += 1) {
    drawPolygon(ctx, config.attributes.length, (radius / 4) * ring, "rgba(183, 240, 74, 0.16)");
  }

  config.attributes.forEach((attr, index) => {
    const angle = getRadarAngle(index, config.attributes.length);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    ctx.strokeStyle = "rgba(183, 240, 74, 0.16)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = "#f4f7e8";
    ctx.font = "700 13px 'Noto Sans JP', sans-serif";
    ctx.textAlign = x < -20 ? "right" : x > 20 ? "left" : "center";
    ctx.textBaseline = y < -20 ? "bottom" : y > 20 ? "top" : "middle";
    ctx.fillText(attr.label, Math.cos(angle) * (radius + 24), Math.sin(angle) * (radius + 24));
  });

  ctx.beginPath();
  config.attributes.forEach((attr, index) => {
    const angle = getRadarAngle(index, config.attributes.length);
    const valueRadius = (scores[attr.key] / 100) * radius;
    const x = Math.cos(angle) * valueRadius;
    const y = Math.sin(angle) * valueRadius;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(101, 214, 176, 0.3)";
  ctx.strokeStyle = "#d7f76a";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawPolygon(ctx, sides, radius, strokeStyle) {
  ctx.beginPath();
  for (let index = 0; index < sides; index += 1) {
    const angle = getRadarAngle(index, sides);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}

function getRadarAngle(index, total) {
  return -Math.PI / 2 + (Math.PI * 2 * index) / total;
}

async function createResultCard(result) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  const [profileImage, roleImage] = await Promise.all([
    loadCanvasImage("assets/pic/hayakawa-profile.png"),
    loadCanvasImage(result.role.image)
  ]);
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#06100b");
  gradient.addColorStop(0.52, "#102018");
  gradient.addColorStop(1, "#11120c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCardOrnament(ctx);
  drawCircularImage(ctx, profileImage, 826, 170, 148);
  drawRoundedImage(ctx, roleImage, 560, 742, 470, 470, 36);

  ctx.fillStyle = "#d7f76a";
  ctx.font = "800 34px 'Noto Sans JP', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("早川相性ランキング診断", 540, 112);

  ctx.fillStyle = "#f4f7e8";
  drawFittedCanvasLine(ctx, `${result.score}%`, 540, 255, 260, 124, 96, "900");

  ctx.fillStyle = "#d7f76a";
  drawFittedCanvasLine(ctx, result.role.name, 540, 388, 900, 76, 48, "900");

  ctx.fillStyle = "#aab79d";
  drawFittedCanvasBlock(ctx, result.role.tagline, 540, 462, 760, 88, 31, 1.5, "700", "center");

  drawResultCardBadges(ctx, result);

  ctx.fillStyle = "#eef7df";
  drawFittedCanvasBlock(ctx, result.role.description, 92, 646, 440, 300, 38, 1.52, "500", "left");

  drawMiniRadar(ctx, result.attributes, 280, 1090, 112);

  ctx.fillStyle = "#f2c85b";
  ctx.font = "800 28px 'Noto Sans JP', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${result.rank.label} / ${result.primaryLabel} × ${result.secondaryLabel}`, 540, 1300);

  ctx.fillStyle = "#87937d";
  ctx.font = "500 24px 'Noto Sans JP', sans-serif";
  ctx.fillText(state.data.config.publicSiteUrl, 540, 1360);

  return canvas.toDataURL("image/png");
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCircularImage(ctx, image, centerX, centerY, size) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(image, centerX - size / 2, centerY - size / 2, size, size);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(centerX, centerY, size / 2 + 6, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(215, 247, 106, 0.74)";
  ctx.lineWidth = 6;
  ctx.stroke();
}

function drawRoundedImage(ctx, image, x, y, width, height, radius) {
  ctx.save();
  roundRect(ctx, x, y, width, height, radius);
  ctx.clip();
  drawCoverImage(ctx, image, x, y, width, height);
  ctx.restore();
  roundRect(ctx, x, y, width, height, radius);
  ctx.strokeStyle = "rgba(215, 247, 106, 0.55)";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawCardOrnament(ctx) {
  ctx.save();
  ctx.translate(540, 760);
  for (let index = 0; index < 3; index += 1) {
    ctx.beginPath();
    ctx.arc(0, 0, 390 - index * 58, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(183, 240, 74, ${0.18 - index * 0.04})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  for (let index = 0; index < 12; index += 1) {
    const angle = (Math.PI * 2 * index) / 12;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 290, Math.sin(angle) * 290);
    ctx.lineTo(Math.cos(angle) * 430, Math.sin(angle) * 430);
    ctx.strokeStyle = "rgba(101, 214, 176, 0.13)";
    ctx.stroke();
  }
  ctx.restore();
}

function drawResultCardBadges(ctx, result) {
  const badges = [result.rank.label, result.primaryLabel, result.secondaryLabel];
  const widths = badges.map((text) => Math.max(150, text.length * 32 + 44));
  const total = widths.reduce((sum, width) => sum + width, 0) + 22 * (badges.length - 1);
  let x = 540 - total / 2;
  badges.forEach((text, index) => {
    const width = widths[index];
    roundRect(ctx, x, 560, width, 58, 29);
    ctx.fillStyle = "rgba(183, 240, 74, 0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(215, 247, 106, 0.5)";
    ctx.stroke();
    ctx.fillStyle = "#f4f7e8";
    ctx.font = "800 24px 'Noto Sans JP', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + width / 2, 589);
    x += width + 22;
  });
}

function drawMiniRadar(ctx, scores, centerX, centerY, radius) {
  const attrs = state.data.config.attributes;
  ctx.save();
  ctx.translate(centerX, centerY);
  for (let ring = 1; ring <= 4; ring += 1) {
    drawPolygon(ctx, attrs.length, (radius / 4) * ring, "rgba(183, 240, 74, 0.25)");
  }
  ctx.beginPath();
  attrs.forEach((attr, index) => {
    const angle = getRadarAngle(index, attrs.length);
    const pointRadius = (scores[attr.key] / 100) * radius;
    const x = Math.cos(angle) * pointRadius;
    const y = Math.sin(angle) * pointRadius;
    index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(101, 214, 176, 0.34)";
  ctx.strokeStyle = "#d7f76a";
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.stroke();
  attrs.forEach((attr, index) => {
    const angle = getRadarAngle(index, attrs.length);
    ctx.fillStyle = "#f4f7e8";
    ctx.font = "700 19px 'Noto Sans JP', sans-serif";
    ctx.textAlign = Math.cos(angle) < -0.2 ? "right" : Math.cos(angle) > 0.2 ? "left" : "center";
    ctx.textBaseline = Math.sin(angle) < -0.2 ? "bottom" : Math.sin(angle) > 0.2 ? "top" : "middle";
    ctx.fillText(attr.label, Math.cos(angle) * (radius + 26), Math.sin(angle) * (radius + 26));
  });
  ctx.restore();
}

function drawFittedCanvasLine(ctx, text, x, y, maxWidth, startSize, minSize, weight) {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px 'Noto Sans JP', sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawFittedCanvasBlock(ctx, text, x, y, maxWidth, maxHeight, startSize, lineHeight, weight, align) {
  let size = startSize;
  let lines = [];
  while (size >= 22) {
    ctx.font = `${weight} ${size}px 'Noto Sans JP', sans-serif`;
    lines = wrapCanvasText(ctx, text, maxWidth);
    if (lines.length * size * lineHeight <= maxHeight) break;
    size -= 2;
  }
  ctx.font = `${weight} ${size}px 'Noto Sans JP', sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  lines.forEach((line, index) => {
    const drawX = align === "center" ? x : x;
    ctx.fillText(line, drawX, y + index * size * lineHeight);
  });
}

function wrapCanvasText(ctx, text, maxWidth) {
  const tokens = text.match(/[A-Za-z0-9]+|[^\sA-Za-z0-9]/g) ?? [];
  const lines = [];
  let line = "";
  tokens.forEach((token) => {
    const test = line + token;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = token;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

async function copyResultText() {
  if (!state.result) return;
  await writeClipboard(`${state.result.shareText}\n${state.data.config.publicSiteUrl}`);
  els.copyButton.textContent = "コピーしました";
  setTimeout(() => {
    els.copyButton.textContent = "結果文をコピー";
  }, 1400);
}

async function shareResult() {
  if (!state.result) return;
  const text = `${state.result.shareText}\n${state.data.config.publicSiteUrl}`;
  const blob = await (await fetch(els.resultCardImage.src)).blob();
  const file = new File([blob], "hayakawa-compatibility.png", { type: "image/png" });

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ text, files: [file] });
      return;
    }
    if (navigator.share) {
      await navigator.share({ text, url: state.data.config.publicSiteUrl });
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
  }
  await writeClipboard(text);
  els.shareButton.textContent = "結果文をコピーしました";
  setTimeout(() => {
    els.shareButton.textContent = "結果を共有";
  }, 1500);
}

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function restart() {
  state.answers = [];
  state.result = null;
  showView("intro");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showView(view) {
  els.introView.classList.toggle("is-hidden", view !== "intro");
  els.quizView.classList.toggle("is-hidden", view !== "quiz");
  els.resultView.classList.toggle("is-hidden", view !== "result");
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

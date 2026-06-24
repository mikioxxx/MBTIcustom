const els = {
  birthForm: document.querySelector("#birthForm"),
  birthDate: document.querySelector("#birthDate"),
  calendarTitle: document.querySelector("#calendarTitle"),
  calendarGrid: document.querySelector("#calendarGrid"),
  calendarDetail: document.querySelector("#calendarDetail"),
  prevMonth: document.querySelector("#prevMonth"),
  nextMonth: document.querySelector("#nextMonth"),
  todayContent: document.querySelector("#todayContent"),
  personalPanel: document.querySelector("#personalPanel"),
  personalContent: document.querySelector("#personalContent"),
  resonanceHeading: document.querySelector("#resonanceHeading"),
  resonancePanel: document.querySelector("#resonancePanel"),
  resonanceContent: document.querySelector("#resonanceContent")
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const calendarState = {
  year: null,
  month: null,
  selected: null
};
const personalState = {
  reading: null
};

const FACTOR_READINGS = {
  2: {
    label: "双因子",
    theme: "関係と調整",
    normal: "人と人、表と裏、選択肢と選択肢を結び直す力が強い。",
    reverse: "関係に巻き込まれやすく、他者の都合が時のノイズとして混ざりやすい。"
  },
  3: {
    label: "言因子",
    theme: "言葉と表現",
    normal: "考えを言葉にし、場に意味を与える力が強い。",
    reverse: "言葉が時代と少しズレる。伝わる前に、まず自分の中で反響しやすい。"
  },
  5: {
    label: "変因子",
    theme: "変化と移動",
    normal: "場所、気分、予定を動かしながら流れを変える力がある。",
    reverse: "変化の先が未来ではなく、なぜか過去や既視感へ寄りやすい。"
  }
};

const DAY_ORACLES = {
  prime: {
    key: "prime",
    label: "素数日",
    title: "独歩日",
    summary: "人に合わせるより、自分の判断で進む日。ひとり作業や決断に向く。無理に場に合わせなくてよい。",
    good: ["単独作業", "初投稿", "決断", "余白を作る"],
    bad: ["無理な同調", "根回しのしすぎ"],
    line: "今日はひとりで進めることに強さが出る。"
  },
  abundant: {
    key: "abundant",
    label: "繁日",
    title: "多縁日",
    summary: "連絡や予定が増えやすい日。人とのやり取り、紹介、共同作業に向く。抱え込みすぎには注意。",
    good: ["連絡整理", "予定調整", "紹介", "共同作業"],
    bad: ["抱え込み", "未返信の放置"],
    line: "増えるものは吉、増えすぎるものは早めに束ねる。"
  },
  twoStrong: {
    key: "two",
    label: "双日",
    title: "対話日",
    summary: "相談や確認で流れが整う日。ひとりで決めるより、誰かと話すと答えが見つかりやすい。",
    good: ["相談", "和解", "ペア作業", "確認"],
    bad: ["独断", "曖昧な約束"],
    line: "返事をする、確認する、それだけで運が通る。"
  },
  threeStrong: {
    key: "three",
    label: "言日",
    title: "言霊日",
    summary: "言葉にしたことが残りやすい日。投稿、告知、メモ、命名に向く。余計な一言には注意。",
    good: ["投稿", "告知", "メモ", "命名"],
    bad: ["言いっぱなし", "余計な一言"],
    line: "言葉にした瞬間、今日の意味が固定される。"
  },
  fiveStrong: {
    key: "five",
    label: "変日",
    title: "変化日",
    summary: "いつもの流れを少し変える日。移動、買い替え、習慣の切り替えに向く。全部を一気に変えなくてよい。",
    good: ["移動", "買い替え", "模様替え", "習慣変更"],
    bad: ["惰性の継続", "急な全変更"],
    line: "全部変えるより、ひとつ変える方が暦に合う。"
  },
  strange: {
    key: "strange",
    label: "異日",
    title: "異兆日",
    summary: "いつもと違う兆しに気づきやすい日。初めての場所、調査、保留に向く。すぐ決めつけない方がよい。",
    good: ["調査", "観察", "初見の場所", "保留"],
    bad: ["早合点", "雑な分類"],
    line: "読めないものを、無理に読める形へ潰さない。"
  },
  plain: {
    key: "plain",
    label: "平因日",
    title: "整因日",
    summary: "派手な動きより、片づけ・準備・見直しに向く日。後回しにしていたことを整えると、次の流れが入りやすくなる。",
    good: ["整頓", "復習", "ルーティン", "下準備"],
    bad: ["派手な賭け", "焦った方向転換"],
    line: "平らな日は弱い日ではなく、積み上げが残る日。"
  }
};

const RESONANCE_ORACLES = {
  関係共鳴: {
    title: "縁線共鳴",
    summary: "選んだ日の暦とあなたの数に双因子が通っている。人との往復、確認、調整によって運が開きやすい。",
    good: ["返信", "相談", "共同作業"],
    bad: ["独断", "放置"]
  },
  発信共鳴: {
    title: "言線共鳴",
    summary: "選んだ日の暦とあなたの数に言因子が通っている。言葉にしたことが残りやすく、発信や記録に向く。",
    good: ["投稿", "メモ", "説明"],
    bad: ["曖昧な発言", "言い過ぎ"]
  },
  変化共鳴: {
    title: "転線共鳴",
    summary: "選んだ日の暦とあなたの数に変因子が通っている。場所、道具、予定を少し動かすことで流れが変わる。",
    good: ["移動", "切り替え", "買い替え"],
    bad: ["惰性", "急な全変更"]
  },
  異物共鳴: {
    title: "異線共鳴",
    summary: "選んだ日の暦とあなたの数に大きな異物因子が混ざる。説明しきれない偶然を、すぐに片付けない方がよい。",
    good: ["観察", "調査", "保留"],
    bad: ["早合点", "雑な決めつけ"]
  },
  微弱共鳴: {
    title: "孤線共鳴",
    summary: "選んだ日の暦とあなたの数の重なりは薄い。外の流れに乗るより、自分のリズムを守る方が整いやすい。",
    good: ["単独作業", "休息", "整理"],
    bad: ["無理な同調", "予定の詰め込み"]
  }
};

init();

function init() {
  const today = getJstDateParts();
  els.birthDate.value = `${today.year - 20}-${pad(today.month)}-${pad(today.day)}`;
  calendarState.year = today.year;
  calendarState.month = today.month;
  calendarState.selected = formatDate(today);
  renderToday();
  renderCalendar();
  els.prevMonth.addEventListener("click", () => shiftCalendarMonth(-1));
  els.nextMonth.addEventListener("click", () => shiftCalendarMonth(1));
  els.calendarGrid.addEventListener("click", handleCalendarClick);
  els.birthForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPersonal();
  });
}

function renderToday() {
  const today = getJstDateParts();
  const days = getUnixDays(today.year, today.month, today.day);
  const reading = buildNumberReading(days);
  const omens = getCalendarOmens(reading);
  const primary = getPrimaryOmen(omens, reading);
  els.todayContent.innerHTML = `
    <div class="number-stack">
      <span>今日の暦名</span>
      <strong>${primary.title}</strong>
    </div>
    <div class="number-stack compact-stack">
      <span>${formatDate(today)} のUNIX日数</span>
      <strong>${formatNumber(days)}</strong>
    </div>
    ${renderFactorLine(reading)}
    <div class="tag-row"><span>${primary.label}</span></div>
    ${renderDailyFortune([primary], reading, "日付鑑定")}
  `;
}

function renderCalendar() {
  const { year, month } = calendarState;
  const todayKey = formatDate(getJstDateParts());
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const cells = [
    ...WEEKDAYS.map((day) => `<div class="weekday">${day}</div>`),
    ...Array.from({ length: firstWeekday }, () => `<div class="calendar-empty" aria-hidden="true"></div>`)
  ];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${year}-${pad(month)}-${pad(day)}`;
    const labelReading = buildNumberReading(getUnixDays(year, month, day));
    const primary = getPrimaryOmen(getCalendarOmens(labelReading), labelReading);
    const stateClass = [
      `omen-${primary.key}`,
      dateKey === todayKey ? "is-today" : "",
      dateKey === calendarState.selected ? "is-selected" : ""
    ].filter(Boolean).join(" ");
    cells.push(`
      <button class="calendar-day ${stateClass}" type="button" data-date="${dateKey}" data-year="${year}" data-month="${month}" data-day="${day}">
        <span class="day-number">${day}</span>
        <span class="day-label">${primary.title}</span>
      </button>
    `);
  }

  els.calendarTitle.textContent = `${year}.${pad(month)}`;
  els.calendarGrid.innerHTML = cells.join("");
  const [selectedYear, selectedMonth, selectedDay] = calendarState.selected.split("-").map(Number);
  renderCalendarDetail(selectedYear, selectedMonth, selectedDay);
}

function shiftCalendarMonth(delta) {
  const next = new Date(Date.UTC(calendarState.year, calendarState.month - 1 + delta, 1));
  calendarState.year = next.getUTCFullYear();
  calendarState.month = next.getUTCMonth() + 1;
  calendarState.selected = `${calendarState.year}-${pad(calendarState.month)}-01`;
  renderCalendar();
}

function handleCalendarClick(event) {
  const button = event.target.closest(".calendar-day");
  if (!button) return;
  calendarState.selected = button.dataset.date;
  renderCalendar();
  renderSelectedResonance();
}

function renderCalendarDetail(year, month, day) {
  const days = getUnixDays(year, month, day);
  const reading = buildNumberReading(days);
  const omens = getCalendarOmens(reading);
  const primary = getPrimaryOmen(omens, reading);
  els.calendarDetail.innerHTML = `
    <div class="calendar-detail">
      <div class="number-stack">
        <span>${year}-${pad(month)}-${pad(day)} の暦名</span>
        <strong>${primary.title}</strong>
      </div>
      <div class="number-stack compact-stack">
        <span>暦名の根</span>
        <strong>UNIX日数 ${formatNumber(days)}</strong>
      </div>
      ${renderFactorLine(reading)}
      <div class="tag-row"><span>${primary.label}</span></div>
      ${renderDailyFortune([primary], reading, "日付鑑定")}
    </div>
  `;
}

function renderPersonal() {
  const [year, month, day] = els.birthDate.value.split("-").map(Number);
  const days = getUnixDays(year, month, day);
  const reading = buildNumberReading(days);
  const type = getCoreType(reading);
  personalState.reading = reading;

  els.personalPanel.classList.remove("is-hidden");
  els.resonancePanel.classList.remove("is-hidden");

  els.personalContent.innerHTML = `
    <div class="number-stack">
      <span>${formatBirthLabel(year, month, day)}</span>
      <strong>${formatNumber(days)}</strong>
    </div>
    ${reading.isPreEpoch ? renderPreEpochNotice(reading) : ""}
    ${renderFactorLine(reading)}
    <div class="metric-grid">
      <div><span>約縁数</span><strong>${formatNumber(reading.divisorCount)}</strong></div>
      <div><span>最大素因数</span><strong>${formatNumber(reading.largestPrime)}</strong></div>
      <div><span>暦因子型</span><strong>${type.label}</strong></div>
    </div>
    ${renderPrimeBirthdayOracle(reading)}
    ${renderPersonalOracle(reading, type)}
  `;

  renderSelectedResonance();
  els.personalPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSelectedResonance() {
  if (!personalState.reading) return;
  const [year, month, day] = calendarState.selected.split("-").map(Number);
  const targetDays = getUnixDays(year, month, day);
  const targetReading = buildNumberReading(targetDays);
  const resonance = buildResonance(personalState.reading, targetReading);
  els.resonanceHeading.textContent = `${year}-${pad(month)}-${pad(day)} との共鳴`;
  els.resonancePanel.classList.remove("is-hidden");
  els.resonanceContent.innerHTML = `
    <div class="number-stack">
      <span>選んだ日</span>
      <strong>${year}-${pad(month)}-${pad(day)}</strong>
    </div>
    <div class="number-stack">
      <span>最大公約数</span>
      <strong>${formatNumber(resonance.gcd)}</strong>
    </div>
    ${renderFactorLine(resonance)}
    <div class="tag-row"><span>${resonance.primaryTag}</span></div>
    ${renderResonanceOracle(resonance)}
  `;
}

function buildNumberReading(raw) {
  const abs = Math.abs(raw);
  const factors = factorize(abs);
  const factorMap = new Map(factors.map((factor) => [factor.prime, factor.exponent]));
  return {
    raw,
    abs,
    isPreEpoch: raw < 0,
    factors,
    factorMap,
    divisorCount: getDivisorCount(factors),
    largestPrime: factors.at(-1)?.prime ?? abs
  };
}

function getCoreType(reading) {
  const exp2 = reading.factorMap.get(2) ?? 0;
  const exp3 = reading.factorMap.get(3) ?? 0;
  const exp5 = reading.factorMap.get(5) ?? 0;
  const candidates = [
    { prime: 2, score: exp2 * 1.15 },
    { prime: 3, score: exp3 * 1.25 },
    { prime: 5, score: exp5 * 1.4 }
  ].sort((a, b) => b.score - a.score);
  const top = candidates[0];
  if (top.score > 0) {
    const base = FACTOR_READINGS[top.prime];
    return {
      prime: top.prime,
      label: base.label,
      theme: base.theme,
      message: reading.isPreEpoch ? `${base.theme}が逆位で現れる。${base.reverse}` : `${base.theme}が主因子として現れる。${base.normal}`
    };
  }
  return {
    prime: null,
    label: "異因子",
    theme: "未知性と未分類",
    message: reading.isPreEpoch
      ? "小さな素数に従わない前史のノイズが強い。既存の分類より、時代の外側から来た違和感が本質になる。"
      : "小さな素数に縛られない未知性が強い。まだ名前のない直感や異物性が、その人の骨格にある。"
  };
}

function getDayOmens(reading) {
  const omens = [];
  if (reading.factors.length === 1 && reading.factors[0].exponent === 1) omens.push(DAY_ORACLES.prime);
  if (reading.divisorCount >= 64) omens.push(DAY_ORACLES.abundant);
  if ((reading.factorMap.get(2) ?? 0) >= 4) omens.push(DAY_ORACLES.twoStrong);
  if ((reading.factorMap.get(3) ?? 0) >= 2) omens.push(DAY_ORACLES.threeStrong);
  if ((reading.factorMap.get(5) ?? 0) >= 1) omens.push(DAY_ORACLES.fiveStrong);
  if (reading.largestPrime >= 997) omens.push(DAY_ORACLES.strange);
  if (!omens.length) omens.push(DAY_ORACLES.plain);
  return omens;
}

function getCalendarOmens(reading) {
  const omens = [];
  if (reading.factors.length === 1 && reading.factors[0].exponent === 1) omens.push(DAY_ORACLES.prime);
  if (reading.divisorCount >= 16) omens.push(DAY_ORACLES.abundant);
  if ((reading.factorMap.get(2) ?? 0) >= 3) omens.push(DAY_ORACLES.twoStrong);
  if ((reading.factorMap.get(3) ?? 0) >= 2) omens.push(DAY_ORACLES.threeStrong);
  if ((reading.factorMap.get(5) ?? 0) >= 1) omens.push(DAY_ORACLES.fiveStrong);
  if (reading.largestPrime >= 997) omens.push(DAY_ORACLES.strange);
  if (!omens.length) omens.push(DAY_ORACLES.plain);
  return omens;
}

function getPrimaryOmen(omens, reading) {
  if (!omens.length) return DAY_ORACLES.plain;
  if (omens.length === 1) return omens[0];
  const factorScore = reading.factors.reduce((total, factor) => total + factor.prime * factor.exponent, 0);
  const index = Math.abs(factorScore + reading.largestPrime + reading.divisorCount) % omens.length;
  return omens[index];
}

function renderDailyFortune(omens, reading, heading = "本日の暦注") {
  const names = omens.map((omen) => omen.title).join("・");
  const summaries = omens.map((omen) => omen.summary).join("");
  const good = getUniqueItems(omens.flatMap((omen) => omen.good)).slice(0, 5);
  const bad = getUniqueItems(omens.flatMap((omen) => omen.bad)).slice(0, 4);
  const line = omens[0].line;
  return `
    <div class="daily-oracle">
      <div class="oracle-head">
        <span>${heading}</span>
        <strong>${names}</strong>
      </div>
      <p>${summaries}</p>
      <div class="fortune-grid">
        <div>
          <span>吉</span>
          <strong>${good.join(" / ")}</strong>
        </div>
        <div>
          <span>凶</span>
          <strong>${bad.join(" / ")}</strong>
        </div>
      </div>
      <p class="oracle-note">最大素因数 ${formatNumber(reading.largestPrime)}、約縁数 ${formatNumber(reading.divisorCount)}。${line}</p>
    </div>
  `;
}

function getUniqueItems(items) {
  return [...new Set(items)];
}

function renderPrimeBirthdayOracle(reading) {
  if (!isPrimeReading(reading)) return "";
  const today = getJstDateParts();
  const matchingDays = getUpcomingMultipleDays(reading.abs, today, 1);
  const list = matchingDays.length
    ? matchingDays.map((item) => `<li><span>${item.date}</span><strong>${item.title}</strong></li>`).join("")
    : `<li><span>未検出</span><strong>該当日なし</strong></li>`;
  return `
    <div class="daily-oracle rare-oracle">
      <div class="oracle-head">
        <span>素数日生まれ</span>
        <strong>共鳴しにくい独歩型</strong>
      </div>
      <p>
        あなたのUNIX日数 ${formatNumber(reading.abs)} は素数である。多くの日とは公約数を持ちにくいため、
        選んだ日との共鳴値が小さく出やすい。これは運が弱いというより、暦に混ざりにくく、自分の歩幅が残りやすい性質として読む。
      </p>
      <div class="multiple-days">
        <span>次に訪れる倍数日</span>
        <ul>${list}</ul>
      </div>
      <p class="oracle-note">
        倍数日は少ないが、その日はあなたの素数が暦に直接触れる日である。遠い日付として現れるほど、普段は無理に合わせず独歩日として進む方がよい。
      </p>
    </div>
  `;
}

function isPrimeReading(reading) {
  return reading.abs > 1 && reading.factors.length === 1 && reading.factors[0].exponent === 1;
}

function getUpcomingMultipleDays(prime, fromDate, count) {
  const start = Math.abs(getUnixDays(fromDate.year, fromDate.month, fromDate.day));
  const first = Math.ceil(start / prime) * prime;
  const matches = [];
  for (let index = 0; index < count; index += 1) {
    const unixDays = first + prime * index;
    const date = getDateFromUnixDays(unixDays);
    const reading = buildNumberReading(unixDays);
    const primary = getPrimaryOmen(getCalendarOmens(reading), reading);
    matches.push({
      date: `${date.year}-${pad(date.month)}-${pad(date.day)}`,
      title: primary.title
    });
  }
  return matches;
}

function renderPersonalOracle(reading, type) {
  const density = getDensityOracle(reading);
  const primeOracle = getLargestPrimeOracle(reading);
  const epochText = reading.isPreEpoch
    ? "負のUNIX日数を絶対値で読むため、性質はまっすぐ現れず、どこか逆位や既視感を帯びる。"
    : "エポック後の正のUNIX日数として、性質は現在へ向かう順方向の因子として現れる。";
  return `
    <div class="daily-oracle reading-oracle">
      <div class="oracle-head">
        <span>鑑定結果</span>
        <strong>${type.label}・${density.title}</strong>
      </div>
      <p>暦因子は${type.theme}。${type.message}${epochText}</p>
      <div class="reading-list">
        <div>
          <span>本質</span>
          <p>${type.theme}が日付単位の大枠として出る。誕生日から読む鑑定では、この因子が外から見える振る舞いと日々の傾向を決める。</p>
        </div>
        <div>
          <span>運の密度</span>
          <p>${density.summary}</p>
        </div>
        <div>
          <span>異物性</span>
          <p>${primeOracle}</p>
        </div>
      </div>
      <p class="oracle-note">${density.action}</p>
    </div>
  `;
}

function getDensityOracle(reading) {
  if (reading.divisorCount >= 256) {
    return {
      title: "大繁型",
      summary: "約縁数が非常に多く、人、予定、役割、偶然が集まりやすい。多くのものを受け取れる反面、境界が曖昧になりやすい。",
      action: "増えた話を全部拾うより、残す縁と流す縁を分けるとよい。"
    };
  }
  if (reading.divisorCount >= 64) {
    return {
      title: "繁縁型",
      summary: "約縁数が多く、複数の方向へ展開する力がある。調整役、仲介役、場を回す役に向く。",
      action: "連絡、予定、持ち物を整理すると、運の通り道が太くなる。"
    };
  }
  if (reading.divisorCount >= 16) {
    return {
      title: "均衡型",
      summary: "因子の分岐がほどよく、広げる力と絞る力のバランスがある。状況を見て立ち位置を変えられる。",
      action: "迷ったら大きな変更より、ひとつだけ条件を変えて試すとよい。"
    };
  }
  return {
      title: "孤因型",
      summary: "約縁数が少なく、混ざりにくい芯がある。周囲に合わせるより、少数の確かな判断で進む方が強い。",
    action: "説明しすぎず、必要な相手にだけ意図を伝えるとよい。"
  };
}

function getLargestPrimeOracle(reading) {
  if (reading.largestPrime <= 5) return "骨格は人に読める小さな素数でできている。扱いやすさと反復性が強い。";
  if (reading.largestPrime < 100) return `最大素因数 ${reading.largestPrime} は、まだ言葉にできる範囲の異物性である。癖はあるが説明はできる。`;
  if (reading.largestPrime < 10000) return `最大素因数 ${formatNumber(reading.largestPrime)} は、日常の分類から少し外れた神託である。人に説明する前に、自分の中で確かめる必要がある。`;
  return `最大素因数 ${formatNumber(reading.largestPrime)} は巨大である。これは人に読めない神託に近く、あなたの中の未言語領域として残る。`;
}

function buildResonance(personal, today) {
  const value = gcd(personal.abs, today.abs);
  const reading = buildNumberReading(value);
  const tags = [];
  if (reading.factorMap.has(2)) tags.push("関係共鳴");
  if (reading.factorMap.has(3)) tags.push("発信共鳴");
  if (reading.factorMap.has(5)) tags.push("変化共鳴");
  if (reading.largestPrime >= 97) tags.push("異物共鳴");
  if (!tags.length) tags.push("微弱共鳴");
  const primaryTag = getPrimaryResonanceTag(tags, reading);
  const message = value <= 1
    ? "選んだ日との共通因子はほぼない。混ざらない日なので、自分の直感を単独で進める方がよい。"
    : `あなたのUNIX日数と選んだ日のUNIX日数は ${formatNumber(value)} で割り切れる。共通因子が大きいほど、その日の暦注はあなたの本質因子に触れやすい。`;
  return { ...reading, gcd: value, tags, primaryTag, message };
}

function renderResonanceOracle(resonance) {
  const omens = [RESONANCE_ORACLES[resonance.primaryTag]].filter(Boolean);
  const title = omens.map((omen) => omen.title).join("・");
  const summary = omens.map((omen) => omen.summary).join("");
  const good = getUniqueItems(omens.flatMap((omen) => omen.good)).slice(0, 5);
  const bad = getUniqueItems(omens.flatMap((omen) => omen.bad)).slice(0, 4);
  return `
    <div class="daily-oracle reading-oracle">
      <div class="oracle-head">
        <span>選んだ日との共鳴診断</span>
        <strong>${title}</strong>
      </div>
      <p>${resonance.message}${summary}</p>
      <div class="fortune-grid">
        <div>
          <span>通りやすい行動</span>
          <strong>${good.join(" / ")}</strong>
        </div>
        <div>
          <span>避けたい動き</span>
          <strong>${bad.join(" / ")}</strong>
        </div>
      </div>
      <p class="oracle-note">共鳴値 ${formatNumber(resonance.gcd)}。日単位の共鳴が大きいほど、その日の暦注はあなた個人の因子に近いところで鳴る。</p>
    </div>
  `;
}

function getPrimaryResonanceTag(tags, reading) {
  if (tags.length <= 1) return tags[0];
  if (reading.largestPrime >= 97 && tags.includes("異物共鳴")) return "異物共鳴";
  const order = ["発信共鳴", "変化共鳴", "関係共鳴", "微弱共鳴"];
  return order.find((tag) => tags.includes(tag)) ?? tags[0];
}

function renderPreEpochNotice(reading) {
  return `
    <div class="pre-epoch">
      <strong>プレ・エポック民</strong>
      <p>
        あなたのUNIX日数は負数である。本来は存在しないはずだが、鑑定には絶対値 ${formatNumber(reading.abs)} を用いる。
        これは大桁尽で巻き戻った単長世界の記憶として読む。
      </p>
    </div>
  `;
}

function renderFactorLine(reading) {
  return `
    <div class="factor-line" aria-label="素因数分解">
      ${reading.factors.map((factor) => `<span>${factor.prime}${factor.exponent > 1 ? `<sup>${factor.exponent}</sup>` : ""}</span>`).join("<b>×</b>") || "<span>1</span>"}
    </div>
  `;
}

function factorize(value) {
  if (value <= 1) return [{ prime: value, exponent: 1 }];
  const factors = [];
  let n = value;
  let exponent = 0;
  while (n % 2 === 0) {
    exponent += 1;
    n /= 2;
  }
  if (exponent) factors.push({ prime: 2, exponent });
  for (let prime = 3; prime * prime <= n; prime += 2) {
    exponent = 0;
    while (n % prime === 0) {
      exponent += 1;
      n /= prime;
    }
    if (exponent) factors.push({ prime, exponent });
  }
  if (n > 1) factors.push({ prime: n, exponent: 1 });
  return factors;
}

function getDivisorCount(factors) {
  return factors.reduce((total, factor) => total * (factor.exponent + 1), 1);
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

function getUnixDays(year, month, day) {
  const epoch = Date.UTC(1970, 0, 1);
  const target = Date.UTC(year, month - 1, day);
  return Math.floor((target - epoch) / 86400000);
}

function getDateFromUnixDays(days) {
  const date = new Date(Date.UTC(1970, 0, 1) + days * 86400000);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate()
  };
}

function getJstDateParts(date = new Date()) {
  const shifted = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate()
  };
}

function formatDate({ year, month, day }) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function formatBirthLabel(year, month, day) {
  return `${year}-${pad(month)}-${pad(day)} のUNIX日数`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

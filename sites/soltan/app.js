const LOVE_TYPES = [
  ["LAPE","キャプテンライオン"],["LAPO","パーフェクトカメレオン"],
  ["LARE","カリスマバランサー"],["LARO","憧れの先輩"],
  ["LCPE","ツンデレヤンキー"],["LCPO","主役体質"],
  ["LCRE","隠れベイビー"],["LCRO","ボス猫"],
  ["FAPE","最後の恋人"],["FAPO","デビル天使"],
  ["FARE","敏腕マネージャー"],["FARO","不思議生命体"],
  ["FCPE","忠犬ハチ公"],["FCPO","恋愛モンスター"],
  ["FCRE","ちゃっかりうさぎ"],["FCRO","ロマンスマジシャン"]
];

const AXES = [
  ["dateActive","アクティブ度"],["dateRelax","まったり度"],
  ["contactFrequency","連絡テンポ"],["contactDepth","会話の深さ"],
  ["affectionOpen","愛情表現"],["jealousyTolerance","嫉妬への共感"],
  ["listenerDistance","距離の近さ"],["supportResponse","応援スタイル"]
];

const LIVER_PROFILE = {
  name: "オヌルドソルタン",
  nickname: "ソルタン",
  englishName: "seoltang",
  loveType: "FARE",
  scores: {
    dateActive: 77,
    dateRelax: 50,
    contactFrequency: 91,
    contactDepth: 85,
    affectionOpen: 100,
    jealousyTolerance: 66,
    listenerDistance: 59,
    supportResponse: 100
  }
};

const TITLE_ROLES = [
  {
    id: "adventure_partner",
    name: "ソルタンの冒険相棒",
    image: "新しいフォルダー/冒険相棒.png",
    primary: "dateActive",
    secondary: ["affectionOpen", "supportResponse"],
    tagline: "一緒に動くほど距離が縮まる体験共有枠",
    description: "楽しい予定や新しい体験をきっかけに、ソルタンとの空気が明るくなりやすいタイプです。"
  },
  {
    id: "soft_room",
    name: "ソルタンの休憩所",
    image: "新しいフォルダー/休憩所.png",
    primary: "dateRelax",
    secondary: ["listenerDistance", "jealousyTolerance"],
    tagline: "落ち着いた時間で安心感を作るまったり枠",
    description: "急がず、自然体でいられる時間を大切にできるので、ソルタンにとって気を抜きやすい存在です。"
  },
  {
    id: "message_line",
    name: "ソルタンの連絡係",
    image: "新しいフォルダー/連絡係.png",
    primary: "contactFrequency",
    secondary: ["contactDepth", "affectionOpen"],
    tagline: "こまめなやり取りで関係を温める連絡枠",
    description: "会えない時間も連絡で温度を保てるタイプです。日常の共有が、ソルタンとの距離をじわっと近づけます。"
  },
  {
    id: "honest_note",
    name: "ソルタンの本音ノート",
    image: "新しいフォルダー/本音ノート.png",
    primary: "contactDepth",
    secondary: ["contactFrequency", "dateRelax"],
    tagline: "軽い会話の奥にある本音まで受け取る対話枠",
    description: "ただ盛り上がるだけでなく、気持ちや考えを丁寧に聞けるタイプです。深い会話で相性が伸びます。"
  },
  {
    id: "straight_sweet",
    name: "ソルタンの甘やかし係",
    image: "新しいフォルダー/甘やかし係.png",
    primary: "affectionOpen",
    secondary: ["supportResponse", "listenerDistance"],
    tagline: "好きやかわいいをまっすぐ届ける愛情表現枠",
    description: "好意をわかりやすく出せるので、ソルタンが自信を持ちやすい相手です。素直な反応が強みになります。"
  },
  {
    id: "safe_zone",
    name: "ソルタンの安心圏",
    image: "新しいフォルダー/安心圏.png",
    primary: "jealousyTolerance",
    secondary: ["dateRelax", "contactDepth"],
    tagline: "信頼とほどよい距離で居心地を守る安心枠",
    description: "嫉妬や不安を重くしすぎず、信頼で関係を支えられるタイプです。安定した相性を作れます。"
  },
  {
    id: "close_seat",
    name: "ソルタンの近距離席",
    image: "新しいフォルダー/近距離席.png",
    primary: "listenerDistance",
    secondary: ["affectionOpen", "contactFrequency"],
    tagline: "近いテンポで仲良くなれる距離感ぴったり枠",
    description: "距離の縮め方が近く、話しかけやすさや親しみやすさが出やすいタイプです。自然に近くにいられます。"
  },
  {
    id: "cheer_lead",
    name: "ソルタンの応援団長",
    image: "新しいフォルダー/応援団長.png",
    primary: "supportResponse",
    secondary: ["dateActive", "affectionOpen"],
    tagline: "言葉と行動で気持ちを届ける応援枠",
    description: "好きな気持ちを反応や行動で伝えられるタイプです。ソルタンの前向きさを引き出しやすい相性です。"
  },
  {
    id: "warm_bridge",
    name: "ソルタンの架け橋",
    image: "新しいフォルダー/架け橋.png",
    primary: "contactDepth",
    secondary: ["supportResponse", "jealousyTolerance"],
    tagline: "会話と信頼でふたりの温度を整える調整枠",
    description: "気持ちを聞きながら、必要な時にはちゃんと支えられるタイプです。違いがあっても関係を整えられます。"
  },
  {
    id: "spark_date",
    name: "ソルタンのときめき係",
    image: "新しいフォルダー/ときめき係.png",
    primary: "dateActive",
    secondary: ["contactFrequency", "listenerDistance"],
    tagline: "誘い方とテンポで恋の勢いを作るときめき枠",
    description: "動き出すきっかけを作るのがうまいタイプです。楽しい予定や会話のテンポで印象を残せます。"
  }
];

const QUESTIONS = [
  { axis:"dateActive", text:"休日に一緒に過ごすなら、どちらが理想？", left:"家やカフェでゆっくり", right:"イベントや遠出を楽しむ" },
  { axis:"dateRelax", text:"予定のない時間をふたりで過ごすのは？", left:"何かしていたい", right:"何もしなくても心地いい" },
  { axis:"contactFrequency", text:"好きな人との連絡頻度はどのくらいが理想？", left:"用事があるとき中心", right:"毎日こまめに話したい" },
  { axis:"contactDepth", text:"相手との会話で大切にしたいのは？", left:"軽く楽しいテンポ", right:"本音までじっくり話す" },
  { axis:"affectionOpen", text:"「好き」という気持ちはどう伝えたい？", left:"態度でさりげなく", right:"言葉でまっすぐ" },
  { axis:"jealousyTolerance", text:"好きな人から少し嫉妬されたら？", left:"自由を信じてほしい", right:"愛情を感じてうれしい" },
  { axis:"listenerDistance", text:"仲良くなるときの心地よいペースは？", left:"時間をかけて少しずつ", right:"早めに距離を縮めたい" },
  { axis:"supportResponse", text:"好きな人を応援するとき、あなたに近いのは？", left:"静かに長く見守る", right:"言葉と行動で伝える" }
];

const state = { selectedLove:null, current:0, answers:Array(QUESTIONS.length).fill(null), result:null };
const els = Object.fromEntries(["introView","quizView","resultView","loveOptions","roleList","liverLoveType","startButton","quitButton","questionCounter","progressFill","questionText","leftLabel","rightLabel","answerRow","backButton","skipButton","resultCatch","scoreRing","scoreValue","rankLabel","selectedType","roleImage","roleName","roleTagline","resultLead","insightList","radarCanvas","resultCardImage","downloadButton","copyButton","restartButton"].map(id=>[id,document.getElementById(id)]));

init();

function init(){
  renderLiverProfile();
  renderLoveTypes();
  renderRoleList();
  els.startButton.addEventListener("click",startQuiz);
  els.quitButton.addEventListener("click",()=>showView("intro"));
  els.backButton.addEventListener("click",goBack);
  els.skipButton.addEventListener("click",()=>chooseAnswer(null));
  els.restartButton.addEventListener("click",restart);
  els.copyButton.addEventListener("click",copyResult);
  els.downloadButton.addEventListener("click",downloadResultCard);
}

function renderLiverProfile(){
  const type=LOVE_TYPES.find(([code])=>code===LIVER_PROFILE.loveType);
  els.liverLoveType.textContent=type?`${type[0]}｜${type[1]}`:LIVER_PROFILE.loveType;
}

function renderLoveTypes(){
  els.loveOptions.innerHTML="";
  LOVE_TYPES.forEach(([code,name])=>{
    const button=document.createElement("button");
    button.className="love-option";
    button.type="button";
    button.setAttribute("aria-label",`${code} ${name}`);
    button.innerHTML=`<img src="../hayakawa/assets/lovetype/${code}.png" alt="${name}" /><span class="love-code">${code}</span>`;
    button.addEventListener("click",()=>{
      state.selectedLove=state.selectedLove===code?null:code;
      document.querySelectorAll(".love-option").forEach(item=>item.classList.remove("is-selected"));
      if(state.selectedLove) button.classList.add("is-selected");
    });
    els.loveOptions.append(button);
  });
}

function startQuiz(){ state.current=0; state.answers=Array(QUESTIONS.length).fill(null); showView("quiz"); renderQuestion(); }
function renderQuestion(){
  const q=QUESTIONS[state.current];
  els.questionCounter.textContent=`${String(state.current+1).padStart(2,"0")} / ${String(QUESTIONS.length).padStart(2,"0")}`;
  els.progressFill.style.width=`${(state.current/QUESTIONS.length)*100}%`;
  els.questionText.textContent=q.text; els.leftLabel.textContent=q.left; els.rightLabel.textContent=q.right;
  els.answerRow.innerHTML="";
  [0,25,50,75,100].forEach((value,index)=>{
    const button=document.createElement("button");
    button.className="answer-button"+(state.answers[state.current]===value?" is-selected":"");
    button.type="button"; button.textContent=index+1; button.setAttribute("aria-label",`${index+1}段階目`);
    button.addEventListener("click",()=>chooseAnswer(value)); els.answerRow.append(button);
  });
  els.backButton.disabled=state.current===0;
  els.skipButton.textContent=state.current===QUESTIONS.length-1?"結果を見る":"スキップ";
}

function chooseAnswer(value){
  state.answers[state.current]=value;
  if(state.current<QUESTIONS.length-1){ state.current++; renderQuestion(); }
  else { state.result=calculateResult(); renderResult(); }
}
function goBack(){ if(state.current>0){state.current--;renderQuestion();} }

function calculateResult(){
  const user={};
  QUESTIONS.forEach((q,i)=>{ user[q.axis]=state.answers[i]??50; });
  const axisResults=AXES.map(([key,label])=>{ const closeness=Math.max(0,100-Math.abs(user[key]-LIVER_PROFILE.scores[key])); return {key,label,user:user[key],liver:LIVER_PROFILE.scores[key],closeness}; });
  const answered=state.answers.filter(v=>v!==null).length;
  const questionScore=axisResults.reduce((sum,a)=>sum+a.closeness,0)/axisResults.length;
  const loveScore=state.selectedLove?getLoveCompatibility(state.selectedLove,LIVER_PROFILE.loveType):72;
  const raw=questionScore*.78+loveScore*.22;
  const completenessPenalty=(QUESTIONS.length-answered)*1.25;
  const score=Math.round(Math.max(48,Math.min(98,raw-completenessPenalty)));
  const sorted=[...axisResults].sort((a,b)=>b.closeness-a.closeness);
  const role=chooseTitleRole({ score, best: sorted[0], second: sorted[1], selectedLove: state.selectedLove });
  return {score,axisResults,best:sorted[0],second:sorted[1],care:sorted.at(-1),role};
}

function renderRoleList(){
  els.roleList.innerHTML="";
  TITLE_ROLES.forEach((role)=>{
    const card=document.createElement("article");
    card.className="role-list-card";
    card.innerHTML=`
      <img src="${role.image}" alt="${role.name}のイラスト" loading="lazy" />
      <div>
        <span>${getAxisLabel(role.primary)}タイプ</span>
        <strong>${role.name}</strong>
        <p>${role.tagline}</p>
      </div>
    `;
    els.roleList.append(card);
  });
}

function getAxisLabel(key){
  return AXES.find(([axisKey])=>axisKey===key)?.[1] ?? key;
}

function getLoveCompatibility(a,b){
  if(a===b) return 96;
  const weights=[16,9,7,5]; let score=62;
  [...a].forEach((char,i)=>{ if(char===b[i]) score+=weights[i]; });
  return Math.min(94,score);
}

function getRank(score){
  if(score>=90)return ["運命級シンクロ","言葉にしなくても呼吸が合う、特別な相性です。"];
  if(score>=80)return ["かなり相性よし","自然体のまま、お互いの魅力を引き出せる関係です。"];
  if(score>=70)return ["じわじわ好相性","知るほどに心地よさが増していく組み合わせです。"];
  if(score>=60)return ["違いがスパイス","違いを面白がることで、新しい景色が見える相性です。"];
  return ["育てる相性","急がず歩幅を合わせれば、ふたりらしい関係を作れます。"];
}

function chooseTitleRole({ score, best, second, selectedLove }){
  const seed=`${selectedLove || "none"}:${best.key}:${second.key}:${score}`;
  const exact=TITLE_ROLES.filter((role)=>role.primary===best.key && role.secondary.includes(second.key));
  if(exact.length) return exact[stableIndex(seed,exact.length)];
  const primaryMatches=TITLE_ROLES.filter((role)=>role.primary===best.key);
  if(primaryMatches.length) return primaryMatches[stableIndex(seed,primaryMatches.length)];
  return TITLE_ROLES[stableIndex(seed,TITLE_ROLES.length)];
}

function stableIndex(seed,length){
  let hash=0;
  for(let i=0;i<seed.length;i+=1){ hash=(hash*31+seed.charCodeAt(i))>>>0; }
  return hash%length;
}

async function renderResult(){
  showView("result"); const r=state.result; const [rank,lead]=getRank(r.score);
  els.resultCatch.textContent=`ふたりの相性は、${rank}。`;
  els.scoreValue.textContent=r.score; els.rankLabel.textContent=rank;
  els.scoreRing.style.background=`conic-gradient(var(--pink) ${r.score*3.6}deg,#eadfe2 0deg)`;
  const type=LOVE_TYPES.find(([code])=>code===state.selectedLove);
  els.selectedType.textContent=type?`${type[0]}｜${type[1]}`:"ラブタイプ未選択";
  els.roleImage.src=r.role.image;
  els.roleImage.alt=`${r.role.name}のイラスト`;
  els.roleName.textContent=r.role.name;
  els.roleTagline.textContent=r.role.tagline;
  els.resultLead.textContent=lead;
  els.insightList.innerHTML=`
    <div class="insight"><strong>称号コメント</strong><p>${r.role.description}</p></div>
    <div class="insight"><strong>いちばん響き合うところ</strong><p>「${r.best.label}」の感覚がとても近いふたり。無理に合わせなくても自然なテンポが生まれそう。</p></div>
    <div class="insight"><strong>もうひとつの強み</strong><p>「${r.second.label}」も好相性。ここをきっかけにすると、もっと仲を深めやすいでしょう。</p></div>
    <div class="insight"><strong>心地よくいるためのヒント</strong><p>「${r.care.label}」は少し違いが出やすいポイント。決めつけず、相手のペースを聞くのが近道です。</p></div>`;
  drawRadarChart(r.axisResults);
  await document.fonts?.ready;
  els.resultCardImage.src=await createResultCard(r,rank,type);
}

function drawRadarChart(axisResults){
  const canvas=els.radarCanvas;
  const cssSize=Math.min(560,canvas.parentElement.clientWidth);
  const ratio=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.round(cssSize*ratio); canvas.height=Math.round(cssSize*ratio);
  canvas.style.width=`${cssSize}px`; canvas.style.height=`${cssSize}px`;
  const ctx=canvas.getContext("2d"); ctx.scale(ratio,ratio);
  const size=cssSize, center=size/2, radius=size*.25, count=axisResults.length;
  const point=(index,value,extra=0)=>{
    const angle=-Math.PI/2+(Math.PI*2*index/count);
    const distance=radius*(value/100)+extra;
    return [center+Math.cos(angle)*distance,center+Math.sin(angle)*distance];
  };

  ctx.clearRect(0,0,size,size);
  for(let level=1;level<=5;level++){
    ctx.beginPath();
    axisResults.forEach((_,i)=>{ const [x,y]=point(i,level*20); i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
    ctx.closePath(); ctx.strokeStyle=level===5?"rgba(84,49,70,.24)":"rgba(84,49,70,.11)"; ctx.lineWidth=1; ctx.stroke();
  }
  axisResults.forEach((_,i)=>{
    const [x,y]=point(i,100); ctx.beginPath(); ctx.moveTo(center,center); ctx.lineTo(x,y); ctx.strokeStyle="rgba(84,49,70,.11)"; ctx.stroke();
  });

  drawRadarSeries(ctx,axisResults.map(a=>a.liver),"#5b7fd8","rgba(91,127,216,.16)",point);
  drawRadarSeries(ctx,axisResults.map(a=>a.user),"#ec5d83","rgba(236,93,131,.18)",point);

  ctx.fillStyle="#5d4c57"; ctx.font=`700 ${Math.max(10,size*.024)}px "Noto Sans JP",sans-serif`; ctx.textBaseline="middle";
  axisResults.forEach((axis,i)=>{
    const [x,y]=point(i,100,size*.08); const cosine=Math.cos(-Math.PI/2+(Math.PI*2*i/count));
    ctx.textAlign=Math.abs(cosine)<.2?"center":cosine>0?"left":"right";
    ctx.fillText(axis.label,x,y);
  });
}

function drawRadarSeries(ctx,values,stroke,fill,point){
  ctx.beginPath();
  values.forEach((value,i)=>{ const [x,y]=point(i,value); i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
  ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=stroke; ctx.lineWidth=3; ctx.stroke();
  values.forEach((value,i)=>{ const [x,y]=point(i,value); ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill(); ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.stroke(); });
}

async function createResultCard(result,rank,type){
  const canvas=document.createElement("canvas"); canvas.width=1080; canvas.height=1920;
  const ctx=canvas.getContext("2d");
  const roleImage=await loadCanvasImage(result.role.image);
  const gradient=ctx.createLinearGradient(0,0,1080,1920); gradient.addColorStop(0,"#fff4ec"); gradient.addColorStop(.55,"#fffafb"); gradient.addColorStop(1,"#f8e7f0");
  ctx.fillStyle=gradient; ctx.fillRect(0,0,1080,1920);
  ctx.strokeStyle="rgba(200,61,104,.18)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(45,100,210,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(1040,1780,300,0,Math.PI*2); ctx.stroke();
  ctx.textAlign="center"; ctx.textBaseline="alphabetic";
  roundRect(ctx,60,70,960,1780,38,"rgba(255,255,255,.92)","rgba(84,49,70,.12)");
  roundRect(ctx,120,125,840,126,28,"rgba(255,255,255,.72)","rgba(200,61,104,.18)");
  ctx.textAlign="center";
  ctx.textBaseline="alphabetic";
  ctx.fillStyle="#291e28";
  ctx.font='400 86px "DM Serif Display",serif';
  ctx.fillText(String(result.score),250,218);
  const badgeScoreWidth=ctx.measureText(String(result.score)).width;
  ctx.fillStyle="#c83d68";
  ctx.font='900 24px "Noto Sans JP",sans-serif';
  ctx.fillText("%",250+badgeScoreWidth/2+22,198);
  ctx.font='900 30px "Noto Sans JP",sans-serif';
  ctx.fillText(rank,610,181);
  ctx.fillStyle="#75666f";
  ctx.font='700 21px "Noto Sans JP",sans-serif';
  ctx.fillText(type?`${type[0]}｜${type[1]}`:"ラブタイプ未選択",610,223);
  drawContainedImage(ctx,roleImage,120,285,840,840,34);
  ctx.fillStyle="#c83d68";
  ctx.font='900 24px "Noto Sans JP",sans-serif';
  ctx.fillText("あなたの称号",540,1192);
  ctx.fillStyle="#291e28";
  ctx.font='900 43px "Noto Sans JP",sans-serif';
  ctx.fillText(result.role.name,540,1247);
  roundRect(ctx,120,1298,840,480,28,"rgba(255,255,255,.78)","rgba(84,49,70,.12)");
  ctx.fillStyle="#c83d68";
  ctx.font='900 24px "Noto Sans JP",sans-serif';
  ctx.fillText("CHEMISTRY BALANCE",540,1348);
  drawCardRadar(ctx,result.axisResults,540,1558,148);
  ctx.textAlign="left"; ctx.textBaseline="middle";
  ctx.fillStyle="#ec5d83"; ctx.fillRect(316,1728,58,6);
  ctx.fillStyle="#5b7fd8"; ctx.fillRect(562,1728,58,6);
  ctx.fillStyle="#75666f"; ctx.font='700 21px "Noto Sans JP",sans-serif';
  ctx.fillText("あなた",392,1731);
  ctx.fillText(LIVER_PROFILE.nickname,636,1731);
  return canvas.toDataURL("image/png");
}

function loadCanvasImage(src){
  return new Promise((resolve,reject)=>{
    const image=new Image();
    image.onload=()=>resolve(image);
    image.onerror=reject;
    image.src=encodeURI(src);
  });
}

function drawRoundedImage(ctx,image,x,y,width,height,radius){
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x,y,width,height,radius);
  ctx.clip();
  const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);
  const drawWidth=image.naturalWidth*scale;
  const drawHeight=image.naturalHeight*scale;
  ctx.drawImage(image,x+(width-drawWidth)/2,y+(height-drawHeight)/2,drawWidth,drawHeight);
  ctx.restore();
}

function drawContainedImage(ctx,image,x,y,width,height,radius){
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x,y,width,height,radius);
  ctx.clip();
  ctx.fillStyle="#fff";
  ctx.fillRect(x,y,width,height);
  const scale=Math.min(width/image.naturalWidth,height/image.naturalHeight);
  const drawWidth=image.naturalWidth*scale;
  const drawHeight=image.naturalHeight*scale;
  ctx.drawImage(image,x+(width-drawWidth)/2,y+(height-drawHeight)/2,drawWidth,drawHeight);
  ctx.restore();
  ctx.strokeStyle="rgba(84,49,70,.12)";
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.roundRect(x,y,width,height,radius);
  ctx.stroke();
}

function drawRadarInset(ctx,axes,x,y,width,height){
  roundRect(ctx,x,y,width,height,24,"rgba(255,255,255,.88)","rgba(84,49,70,.12)");
  ctx.save();
  ctx.textAlign="center";
  ctx.textBaseline="alphabetic";
  ctx.fillStyle="#c83d68";
  ctx.font='900 15px "Noto Sans JP",sans-serif';
  ctx.fillText("BALANCE",x+width/2,y+31);
  drawCardRadar(ctx,axes,x+width/2,y+139,64);
  ctx.fillStyle="#ec5d83";
  ctx.fillRect(x+50,y+242,34,5);
  ctx.fillStyle="#5b7fd8";
  ctx.fillRect(x+145,y+242,34,5);
  ctx.fillStyle="#75666f";
  ctx.font='700 14px "Noto Sans JP",sans-serif';
  ctx.textAlign="left";
  ctx.textBaseline="middle";
  ctx.fillText("あなた",x+92,y+244);
  ctx.fillText(LIVER_PROFILE.nickname,x+187,y+244);
  ctx.restore();
}

function drawCardRadar(ctx,axes,cx,cy,radius){
  const count=axes.length; const p=(i,value,extra=0)=>{ const angle=-Math.PI/2+Math.PI*2*i/count; const d=radius*value/100+extra; return [cx+Math.cos(angle)*d,cy+Math.sin(angle)*d]; };
  for(let level=1;level<=5;level++){ ctx.beginPath(); axes.forEach((_,i)=>{const [x,y]=p(i,level*20);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.strokeStyle="rgba(84,49,70,.14)";ctx.lineWidth=2;ctx.stroke(); }
  axes.forEach((_,i)=>{const [x,y]=p(i,100);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.strokeStyle="rgba(84,49,70,.1)";ctx.stroke();});
  drawRadarSeries(ctx,axes.map(a=>a.liver),"#5b7fd8","rgba(91,127,216,.14)",p);
  drawRadarSeries(ctx,axes.map(a=>a.user),"#ec5d83","rgba(236,93,131,.16)",p);
  ctx.fillStyle="#5d4c57";ctx.font='700 13px "Noto Sans JP",sans-serif';ctx.textBaseline="middle";
  axes.forEach((axis,i)=>{const [x,y]=p(i,100,30);const cosine=Math.cos(-Math.PI/2+Math.PI*2*i/count);ctx.textAlign=Math.abs(cosine)<.2?"center":cosine>0?"left":"right";ctx.fillText(axis.label,x,y);});
  ctx.textAlign="center";
  ctx.textBaseline="alphabetic";
}

function roundRect(ctx,x,y,width,height,radius,fill,stroke){
  ctx.beginPath();ctx.roundRect(x,y,width,height,radius);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.stroke();
}

function downloadResultCard(){
  if(!els.resultCardImage.src)return;
  const link=document.createElement("a");link.href=els.resultCardImage.src;link.download=`${LIVER_PROFILE.englishName}-compatibility-result.png`;link.click();
}

async function copyResult(){
  const [rank]=getRank(state.result.score); const type=LOVE_TYPES.find(([code])=>code===state.selectedLove);
  const text=`${LIVER_PROFILE.nickname}との相性は${state.result.score}%「${rank}」\n称号: ${state.result.role.name}\nいちばん響き合うのは${state.result.best.label}！\n${type?`ラブタイプ: ${type[0]} ${type[1]}`:"ラブタイプ未選択"}`;
  try{ await navigator.clipboard.writeText(text); els.copyButton.textContent="コピーしました！"; setTimeout(()=>els.copyButton.textContent="結果をコピー",1800); }
  catch{ window.prompt("結果をコピーしてください",text); }
}

function restart(){ state.result=null; showView("intro"); window.scrollTo({top:0,behavior:"smooth"}); }
function showView(view){
  els.introView.classList.toggle("is-hidden",view!=="intro");
  els.quizView.classList.toggle("is-hidden",view!=="quiz");
  els.resultView.classList.toggle("is-hidden",view!=="result");
  window.scrollTo({top:0,behavior:"smooth"});
}

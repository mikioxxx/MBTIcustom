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

// female-liver-profile で取得した8軸の値に差し替える仮データ。
const LIVER_PROFILE = {
  name: "SOLTAN",
  loveType: "LAPO",
  scores: { dateActive:78,dateRelax:64,contactFrequency:70,contactDepth:82,affectionOpen:76,jealousyTolerance:52,listenerDistance:60,supportResponse:86 }
};

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
const els = Object.fromEntries(["introView","quizView","resultView","loveOptions","startButton","quitButton","questionCounter","progressFill","questionText","leftLabel","rightLabel","answerRow","backButton","skipButton","resultCatch","scoreRing","scoreValue","rankLabel","selectedType","resultLead","insightList","radarCanvas","resultCardImage","downloadButton","copyButton","restartButton"].map(id=>[id,document.getElementById(id)]));

init();

function init(){
  renderLoveTypes();
  els.startButton.addEventListener("click",startQuiz);
  els.quitButton.addEventListener("click",()=>showView("intro"));
  els.backButton.addEventListener("click",goBack);
  els.skipButton.addEventListener("click",()=>chooseAnswer(null));
  els.restartButton.addEventListener("click",restart);
  els.copyButton.addEventListener("click",copyResult);
  els.downloadButton.addEventListener("click",downloadResultCard);
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
  return {score,axisResults,best:sorted[0],second:sorted[1],care:sorted.at(-1)};
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

async function renderResult(){
  showView("result"); const r=state.result; const [rank,lead]=getRank(r.score);
  els.resultCatch.textContent=`ふたりの相性は、${rank}。`;
  els.scoreValue.textContent=r.score; els.rankLabel.textContent=rank;
  els.scoreRing.style.background=`conic-gradient(var(--pink) ${r.score*3.6}deg,#eadfe2 0deg)`;
  const type=LOVE_TYPES.find(([code])=>code===state.selectedLove);
  els.selectedType.textContent=type?`${type[0]}｜${type[1]}`:"ラブタイプ未選択";
  els.resultLead.textContent=lead;
  els.insightList.innerHTML=`
    <div class="insight"><strong>いちばん響き合うところ</strong><p>「${r.best.label}」の感覚がとても近いふたり。無理に合わせなくても自然なテンポが生まれそう。</p></div>
    <div class="insight"><strong>もうひとつの強み</strong><p>「${r.second.label}」も好相性。ここをきっかけにすると、もっと仲を深めやすいでしょう。</p></div>
    <div class="insight"><strong>心地よくいるためのヒント</strong><p>「${r.care.label}」は少し違いが出やすいポイント。決めつけず、相手のペースを聞くのが近道です。</p></div>`;
  drawRadarChart(r.axisResults);
  await document.fonts?.ready;
  els.resultCardImage.src=createResultCard(r,rank,type);
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

function createResultCard(result,rank,type){
  const canvas=document.createElement("canvas"); canvas.width=1080; canvas.height=1350;
  const ctx=canvas.getContext("2d");
  const gradient=ctx.createLinearGradient(0,0,1080,1350); gradient.addColorStop(0,"#fff4ec"); gradient.addColorStop(.55,"#fffafb"); gradient.addColorStop(1,"#f8e7f0");
  ctx.fillStyle=gradient; ctx.fillRect(0,0,1080,1350);
  ctx.strokeStyle="rgba(200,61,104,.18)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(80,230,230,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(1040,1180,280,0,Math.PI*2); ctx.stroke();
  ctx.textAlign="center"; ctx.fillStyle="#c83d68"; ctx.font='900 24px "Noto Sans JP",sans-serif'; ctx.fillText("LOVE TYPE × CHEMISTRY",540,92);
  ctx.fillStyle="#291e28"; ctx.font='400 64px "DM Serif Display","Noto Sans JP",serif'; ctx.fillText("SOLTANとの相性診断",540,175);
  roundRect(ctx,70,225,940,1035,38,"rgba(255,255,255,.84)","rgba(84,49,70,.12)");
  ctx.fillStyle="#291e28"; ctx.font='400 190px "DM Serif Display",serif'; ctx.fillText(String(result.score),540,450);
  const scoreWidth=ctx.measureText(String(result.score)).width; ctx.fillStyle="#c83d68"; ctx.font='900 40px "Noto Sans JP",sans-serif'; ctx.fillText("%",540+scoreWidth/2+36,430);
  ctx.font='900 38px "Noto Sans JP",sans-serif'; ctx.fillText(rank,540,525);
  ctx.fillStyle="#75666f"; ctx.font='700 25px "Noto Sans JP",sans-serif'; ctx.fillText(type?`${type[0]}｜${type[1]}`:"ラブタイプ未選択",540,574);
  drawCardRadar(ctx,result.axisResults,540,825,235);
  ctx.fillStyle="#ec5d83"; ctx.fillRect(338,1099,58,6); ctx.fillStyle="#5b7fd8"; ctx.fillRect(568,1099,58,6);
  ctx.fillStyle="#75666f"; ctx.font='700 21px "Noto Sans JP",sans-serif'; ctx.fillText("あなた",425,1104); ctx.fillText("ライバー",655,1104);
  ctx.fillStyle="#291e28"; ctx.font='900 27px "Noto Sans JP",sans-serif'; ctx.fillText(`いちばん響き合うのは「${result.best.label}」`,540,1185);
  ctx.fillStyle="#9a7d89"; ctx.font='500 18px "Noto Sans JP",sans-serif'; ctx.fillText("※ライバー側は仮プロフィールで算出",540,1310);
  return canvas.toDataURL("image/png");
}

function drawCardRadar(ctx,axes,cx,cy,radius){
  const count=axes.length; const p=(i,value,extra=0)=>{ const angle=-Math.PI/2+Math.PI*2*i/count; const d=radius*value/100+extra; return [cx+Math.cos(angle)*d,cy+Math.sin(angle)*d]; };
  for(let level=1;level<=5;level++){ ctx.beginPath(); axes.forEach((_,i)=>{const [x,y]=p(i,level*20);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.strokeStyle="rgba(84,49,70,.14)";ctx.lineWidth=2;ctx.stroke(); }
  axes.forEach((_,i)=>{const [x,y]=p(i,100);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.strokeStyle="rgba(84,49,70,.1)";ctx.stroke();});
  drawRadarSeries(ctx,axes.map(a=>a.liver),"#5b7fd8","rgba(91,127,216,.14)",p);
  drawRadarSeries(ctx,axes.map(a=>a.user),"#ec5d83","rgba(236,93,131,.16)",p);
  ctx.fillStyle="#5d4c57";ctx.font='700 18px "Noto Sans JP",sans-serif';ctx.textBaseline="middle";
  axes.forEach((axis,i)=>{const [x,y]=p(i,100,54);const cosine=Math.cos(-Math.PI/2+Math.PI*2*i/count);ctx.textAlign=Math.abs(cosine)<.2?"center":cosine>0?"left":"right";ctx.fillText(axis.label,x,y);});
}

function roundRect(ctx,x,y,width,height,radius,fill,stroke){
  ctx.beginPath();ctx.roundRect(x,y,width,height,radius);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.stroke();
}

function downloadResultCard(){
  if(!els.resultCardImage.src)return;
  const link=document.createElement("a");link.href=els.resultCardImage.src;link.download="soltan-compatibility-result.png";link.click();
}

async function copyResult(){
  const [rank]=getRank(state.result.score); const type=LOVE_TYPES.find(([code])=>code===state.selectedLove);
  const text=`SOLTANとの相性は${state.result.score}%「${rank}」\nいちばん響き合うのは${state.result.best.label}！\n${type?`ラブタイプ: ${type[0]} ${type[1]}`:"ラブタイプ未選択"}`;
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

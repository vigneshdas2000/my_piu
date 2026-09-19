// ---------- Petals ----------
(function(){
  const field = document.getElementById('petalField');
  const glyphs = ['♡','❀','✦','💗','💕','💖','🩷'];
  const count = window.innerWidth < 600 ? 20 : 34;
  for(let i=0;i<count;i++){
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = glyphs[i % glyphs.length];
    p.style.left = Math.random()*100 + 'vw';
    p.style.fontSize = (0.7 + Math.random()*1.1) + 'rem';
    p.style.setProperty('--drift', (Math.random()*80-40) + 'px');
    p.style.animationDuration = (9 + Math.random()*11) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    field.appendChild(p);
  }
})();

// ---------- Sealed envelope ----------
const env = document.getElementById('envelope');
const flap = document.getElementById('flap');
const sealedMsg = document.getElementById('sealedMsg');
const envHint = document.getElementById('envHint');
let opened = false;
env.addEventListener('click', ()=>{
  opened = !opened;
  flap.style.transform = opened ? 'rotateX(180deg)' : 'rotateX(0deg)';
  sealedMsg.classList.toggle('open', opened);
  envHint.textContent = opened ? 'tap to seal it again' : 'tap the envelope';
});

// ---------- Bengali quotes ----------
const bnQuotes = [
  {
    bn: "তোমার উপর অধিকার শুধু আমার, আমিই আদর করবো, আমিই রাগাবো, আমিই ভালোবাসবো, আমিই আগলে রাখবো...",
    gloss: "The right to you belongs only to me — I'm the one who'll pamper you, tease you, love you, and keep you safe."
  },
  {
    bn: "জীবনে কিছু পাই বা না পাই। মনের মতো একটা প্রিয় মানুষ তো পেয়েছি..!"
  }
];

const bnList = document.getElementById('bnQuotes');
bnQuotes.forEach(q=>{
  const el = document.createElement('div');
  el.className = 'bn-quote';
  el.innerHTML = `<div class="bn">${q.bn}</div>`;
  bnList.appendChild(el);
});

// ---------- Scroll reveal ----------
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el=> el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(el=> io.observe(el));
})();

// ---------- Do you love me? ----------
const askSteps = [
  {
    q: "Do you love me?",
    opts: ["Yes", "Yes, obviously", "Of course — yes", "Always, yes"]
  },
  {
    q: "ARE YOU SURE?",
    opts: ["Yes, 100% sure", "Absolutely sure", "Sure sure", "Never been more sure"]
  },
  {
    q: "How much do you love me?",
    opts: ["ONEKKK", "KHUBBBB", "MARATTOKKKK", "PROCHONDOOO"]
  }
];

let ai = 0;
const askCard = document.getElementById('askCard');

function renderAsk(){
  if(ai >= askSteps.length){ renderAskFinal(); return; }
  const step = askSteps[ai];
  const dots = askSteps.map((_,i)=>`<span class="${i<ai?'done':''}"></span>`).join('');
  askCard.innerHTML = `
    <div class="ask-progress">${dots}</div>
    <div class="ask-q">${step.q}</div>
    <div class="ask-opts">
      ${step.opts.map((o,i)=>`<button class="ask-opt" data-i="${i}">${o}</button>`).join('')}
    </div>
  `;
  askCard.querySelectorAll('.ask-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{ ai++; renderAsk(); }, { once:true });
  });
}

function renderAskFinal(){
  askCard.innerHTML = `
    <div class="ask-final">Ghulluri I Love You Onekkk, Khubbb, Marattokkk, Prochondooo, mone theke 😘🥰</div>
  `;
}
renderAsk();

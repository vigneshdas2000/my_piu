// ---------- Petals ----------
(function(){
  const field = document.getElementById('petalField');
  const glyphs = ['♡','❀','✦'];
  const count = window.innerWidth < 600 ? 10 : 18;
  for(let i=0;i<count;i++){
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = glyphs[i % glyphs.length];
    p.style.left = Math.random()*100 + 'vw';
    p.style.fontSize = (0.7 + Math.random()*0.9) + 'rem';
    p.style.setProperty('--drift', (Math.random()*80-40) + 'px');
    p.style.animationDuration = (10 + Math.random()*10) + 's';
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
  }
];

const bnList = document.getElementById('bnQuotes');
bnQuotes.forEach(q=>{
  const el = document.createElement('div');
  el.className = 'bn-quote';
  el.innerHTML = `<div class="bn">${q.bn}</div>`;
  bnList.appendChild(el);
});

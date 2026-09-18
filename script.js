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

// ---------- Love letters ----------
const letters = [
  {
    title: "for a Tuesday, no reason at all",
    body: "I don't need an occasion to say this — I just like you. Today, specifically, at whatever time you're reading this. That's really the whole message.",
    sign: "— V"
  },
  {
    title: "for when you're being a ghulluri about something small",
    body: "You get so worked up over the tiniest things and somehow I find every second of it adorable. Stay dramatic, kuttuli. I wouldn't trade the ranty voice notes for anything calmer.",
    sign: "— V"
  },
  {
    title: "for the ordinary days",
    body: "It's not the big things I think about most. It's the ordinary run of days with you in them — the kind that don't make a story, just make a life. I want a long, boring, wonderful stretch of those with you.",
    sign: "— V"
  },
  {
    title: "for when you doubt yourself",
    body: "Whatever you're second-guessing right now — stop. You are, without competition, the most impressive and most soft-hearted person I know at the same time. Kuchu puchu, I mean that completely.",
    sign: "— V"
  },
  {
    title: "for no one else to read",
    body: "This one's just for you, ghulluri. Whatever room you're in, whatever mood you're in — you're still the person I'd choose to text first. Today, and probably every day after this one too.",
    sign: "— V"
  }
];

const list = document.getElementById('lettersList');
letters.forEach((l, i)=>{
  const el = document.createElement('div');
  el.className = 'letter';
  el.innerHTML = `
    <div class="letter-head"><span>${l.title}</span><span class="mark">❦</span></div>
    <div class="letter-body"><p>${l.body}</p><span class="sign">${l.sign}</span></div>
  `;
  el.addEventListener('click', ()=> el.classList.toggle('open'));
  list.appendChild(el);
});

// ---------- Quiz ----------
const quiz = [
  {
    q: "What does Vignesh actually call Piu, most days?",
    opts: ["Ghulluri","Kuchu Puchu","Kuttuli","Honestly, all three depending on his mood"],
    replies: [
      "Correct — and lucky guess if you didn't already know.",
      "Also correct. He rotates them like a playlist.",
      "Correct again — this one comes out when you're extra soft.",
      "The real answer. All of them, on any given day."
    ]
  },
  {
    q: "Best way to fix a bad day, hypothetically speaking?",
    opts: ["A long call about nothing","Being told you're right, even if you're not","Just being left alone with snacks","A ridiculous meme sent with zero context"],
    replies: [
      "A solid, tested method.",
      "Diplomatically the safest answer.",
      "Respected. Sometimes silence is the love language.",
      "Chaotic but effective."
    ]
  },
  {
    q: "If today had a theme song, what mood would it be?",
    opts: ["Soft and a little sappy","Loud and dramatic, obviously","Calm, steady, nothing to prove","Whatever's stuck in your head right now"],
    replies: [
      "That tracks with the vibe of this whole page.",
      "Ghulluri energy, confirmed.",
      "Quietly the most romantic answer, actually.",
      "Fair enough — no judgment here."
    ]
  },
  {
    q: "How is this whole thing making you feel right now, kuttuli?",
    opts: ["A little embarrassed, in a good way","Smiling and not admitting it","Already planning what to say back","All of the above, obviously"],
    replies: [
      "Mission accomplished.",
      "Noted, even if you won't say it out loud.",
      "He's ready whenever you are.",
      "Honest answer. Also the best one."
    ]
  }
];

let qi = 0;
const card = document.getElementById('quizCard');

function renderQuiz(){
  if(qi >= quiz.length){ renderFinal(); return; }
  const step = quiz[qi];
  const dots = quiz.map((_,i)=>`<span class="${i<qi?'done':''}"></span>`).join('');
  card.innerHTML = `
    <div class="quiz-progress">${dots}</div>
    <div class="quiz-q">${step.q}</div>
    <div class="quiz-opts">
      ${step.opts.map((o,i)=>`<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}
    </div>
    <div class="quiz-reply" id="quizReply"></div>
  `;
  card.querySelectorAll('.quiz-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const i = +btn.dataset.i;
      document.getElementById('quizReply').textContent = step.replies[i];
      card.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
      let next = card.querySelector('.quiz-next');
      if(!next){
        next = document.createElement('button');
        next.className = 'quiz-next';
        next.textContent = (qi === quiz.length-1) ? 'see how it ends →' : 'next →';
        next.addEventListener('click', ()=>{ qi++; renderQuiz(); });
        card.appendChild(next);
      }
    }, { once:true });
  });
}

function renderFinal(){
  card.innerHTML = `
    <div class="quiz-final">
      <div class="score">100%</div>
      <p>however you answered, that's the score — because this was never really a test. It was just an excuse to make you smile for two minutes. Consider it done, ghulluri.</p>
      <button class="quiz-restart" id="restartQuiz">play it again</button>
    </div>
  `;
  document.getElementById('restartQuiz').addEventListener('click', ()=>{ qi=0; renderQuiz(); });
}
renderQuiz();

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

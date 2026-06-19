/* =====================================================================
   APP — logique complète
   ===================================================================== */
"use strict";

/* ---------- helpers ---------- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
function h(tag, attrs={}, html){ const e=document.createElement(tag); for(const k in attrs){ if(k==='class') e.className=attrs[k]; else if(k==='html') e.innerHTML=attrs[k]; else e.setAttribute(k,attrs[k]); } if(html!=null) e.innerHTML=html; return e; }
function renderMath(el){ if(window.renderMathInElement) renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false},{left:"\\(",right:"\\)",display:false},{left:"\\[",right:"\\]",display:true}],throwOnError:false,output:"html"}); }
async function sha256(str){ const buf=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(PASSWORD_SALT+str)); return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join(''); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function hashStr(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))|0; } return (h>>>0).toString(36); }

/* ---------- favoris ---------- */
// id stable par template (basé sur le code de gen, indépendant de l'ordre)
try{ if(typeof TEMPLATES!=='undefined'){ TEMPLATES.forEach(t=>{ if(!t.id) t.id='tpl-'+hashStr((t.gen||function(){}).toString()); }); } }catch(e){}
let FAVORITES=new Set();

/* ---------- couche données : Firebase si configuré, sinon localStorage ---------- */
const USE_FB = !!(typeof FIREBASE_CONFIG!=='undefined' && FIREBASE_CONFIG.apiKey);
let fdb=null;
if (USE_FB && window.firebase){ try{ firebase.initializeApp(FIREBASE_CONFIG); fdb=firebase.firestore(); }catch(e){ console.warn('Firebase init échoué, repli local',e);} }
const ONLINE = !!fdb;
function nowStamp(){ return ONLINE ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(); }

const LS_DB='mp2i_db';
function localLoad(){ try{ return JSON.parse(localStorage.getItem(LS_DB))||{users:{}}; }catch{ return {users:{}}; } }
function localSave(d){ localStorage.setItem(LS_DB, JSON.stringify(d)); }

const DB = {
  async listUsers(){
    if(ONLINE){ const s=await fdb.collection('users').get(); return s.docs.map(d=>({name:d.id,...d.data()})); }
    const d=localLoad(); return Object.entries(d.users).map(([name,u])=>({name,...u}));
  },
  async getUser(name){
    if(ONLINE){ const doc=await fdb.collection('users').doc(name).get(); return doc.exists?{name:doc.id,...doc.data()}:null; }
    const d=localLoad(); return d.users[name]?{name,...d.users[name]}:null;
  },
  async setUser(name,obj){
    if(ONLINE){ await fdb.collection('users').doc(name).set(obj,{merge:true}); return; }
    const d=localLoad(); d.users[name]={...(d.users[name]||{}),...obj}; localSave(d);
  }
};

function blankUser(name){
  return { passwordHash:null, mustChangePassword:true, isAdmin:(name===ADMIN_NAME),
           totalPoints:0, bestStreak:0, currentStreak:0, attempts:0, correct:0, chapters:{} };
}
async function seedIfNeeded(){
  const users=await DB.listUsers();
  if(users.length>0) return;
  for(const name of STUDENTS){ const u=blankUser(name); u.passwordHash=DEFAULT_PASSWORD_HASH; u.lastWrite=nowStamp(); await DB.setUser(name,u); }
}

/* ---------- session ---------- */
const LS_SESS='mp2i_session';
function getSession(){ try{ return JSON.parse(localStorage.getItem(LS_SESS)); }catch{ return null; } }
function setSession(s){ localStorage.setItem(LS_SESS, JSON.stringify(s)); }
function clearSession(){ localStorage.removeItem(LS_SESS); }
let CU=null; // compte connecté (record complet) ; null si invité

/* ---------- thème ---------- */
const LS_THEME='mp2i_theme';
function applyTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem(LS_THEME, t); }
applyTheme(localStorage.getItem(LS_THEME) || 'violet');

/* =====================================================================
   ÉCRAN DE CONNEXION
   ===================================================================== */
function buildLogin(){
  const root=$('#login');
  root.innerHTML='';
  root.append(
    h('div',{class:'eyebrow'},'<span class="dot"></span> MP2I · TERMINAL DE MATHS'),
    h('h1',{class:'title'},'Connexion<span class="cur">_</span>')
  );
  const card=h('div',{class:'login-card'});
  const tabs=h('div',{class:'login-tabs'});
  const tEleve=h('button',{'aria-selected':'true'},'Élève');
  const tInvite=h('button',{'aria-selected':'false'},'Invité');
  tabs.append(tEleve,tInvite);
  const body=h('div');
  card.append(tabs,body);
  root.append(card);
  root.append(h('p',{class:'footnote'}, ONLINE ? '// classement partagé actif (Firebase)' : '// mode local — branche Firebase pour le classement partagé'));

  function eleveForm(){
    body.innerHTML='';
    const sel=h('select',{id:'lg-name'});
    sel.append(h('option',{value:''},'— choisis ton nom —'));
    STUDENTS.forEach(n=> sel.append(h('option',{value:n}, n + (n===ADMIN_NAME?' (admin)':''))));
    const pw=h('input',{id:'lg-pw',type:'password',placeholder:'Mot de passe',autocomplete:'current-password'});
    const err=h('div',{class:'error'});
    const btn=h('button',{class:'btn btn-primary'},'Se connecter');
    btn.style.marginTop='16px'; btn.style.width='100%';
    btn.onclick=()=>loginStudent(sel.value, pw.value, err);
    pw.onkeydown=e=>{ if(e.key==='Enter') btn.click(); };
    body.append(h('label',{class:'field'},'Élève'),sel,h('label',{class:'field'},'Mot de passe'),pw,btn,err);
    body.append(h('p',{class:'note'},'Mot de passe oublié ? Demande à l\'admin de le réinitialiser.'));
  }
  function inviteForm(){
    body.innerHTML='';
    const gq=GUEST_QUESTIONS[Math.floor(Math.random()*GUEST_QUESTIONS.length)];
    const ans=h('input',{id:'lg-gate',type:'text',placeholder:'Ta réponse',autocomplete:'off'});
    const err=h('div',{class:'error'});
    const btn=h('button',{class:'btn btn-primary'},'Entrer en invité');
    btn.style.marginTop='16px'; btn.style.width='100%';
    btn.onclick=async()=>{
      const hash=await sha256((ans.value||'').trim().toLowerCase());
      if(hash===gq.a){
        setSession({name:'Invité', isGuest:true, isAdmin:false}); enterApp();
      } else { err.textContent='Mauvaise réponse. Réservé aux MP2I.'; }
    };
    ans.onkeydown=e=>{ if(e.key==='Enter') btn.click(); };
    body.append(h('p',{class:'note'},'Pour vérifier que tu es bien en MP2I :'),
                h('label',{class:'field'}, gq.q), ans, btn, err);
    body.append(h('p',{class:'note'},'Le mode invité donne accès au cours, aux exos et au classement, mais <b>ne marque aucun point</b>.'));
  }
  tEleve.onclick=()=>{ tEleve.setAttribute('aria-selected','true'); tInvite.setAttribute('aria-selected','false'); eleveForm(); };
  tInvite.onclick=()=>{ tInvite.setAttribute('aria-selected','true'); tEleve.setAttribute('aria-selected','false'); inviteForm(); };
  eleveForm();
}
async function loginStudent(name, pw, errEl){
  errEl.textContent='';
  if(!name){ errEl.textContent='Choisis ton nom.'; return; }
  const u=await DB.getUser(name);
  if(!u){ errEl.textContent='Compte introuvable.'; return; }
  const hash=await sha256(pw||'');
  if(hash!==u.passwordHash){ errEl.textContent='Mot de passe incorrect.'; return; }
  CU=u;
  setSession({name, isGuest:false, isAdmin:!!u.isAdmin});
  enterApp(u.mustChangePassword);
}

/* =====================================================================
   APPLICATION
   ===================================================================== */
const TABS=[
  {id:'cours',    label:'Cours'},
  {id:'quiz',     label:'Quiz'},
  {id:'retro',    label:'Rétrospective'},
  {id:'classement',label:'Classement'},
  {id:'param',    label:'Paramètres'}
];
async function enterApp(forcePw=false){
  $('#login').classList.add('hidden');
  $('#app').classList.remove('hidden');
  const sess=getSession();
  // recharge CU si élève
  if(sess && !sess.isGuest){
    CU=await DB.getUser(sess.name);
    // migration : comptes créés avant les règles plafonnées (pas de lastWrite)
    if(ONLINE && CU && CU.lastWrite===undefined){
      try{ await DB.setUser(CU.name,{lastWrite:nowStamp()}); CU.lastWrite=Date.now(); }catch(e){}
    }
  }
  buildTopbar(sess);
  buildTabs(sess);
  loadFavorites();
  showTab('cours');
  if(forcePw){ showTab('param'); $('#pw-hint') && ($('#pw-hint').textContent='⚠️ Change ton mot de passe provisoire.'); }
}
function isGuest(){ const s=getSession(); return !!(s&&s.isGuest); }
function isAdmin(){ const s=getSession(); return !!(s&&s.isAdmin); }

function buildTopbar(sess){
  const tb=$('#topbar'); tb.innerHTML='';
  const who=h('div',{class:'whoami'});
  if(sess.isGuest){ who.innerHTML='Connecté en <b>Invité</b> <span class="badge-guest">sans points</span>'; }
  else { who.innerHTML='Connecté : <b>'+sess.name+'</b>' + (sess.isAdmin?'<span class="badge-admin">ADMIN</span>':''); }
  const out=h('button',{class:'btn btn-ghost'},'Déconnexion');
  out.onclick=()=>{ clearSession(); CU=null; stopTimer(); $('#app').classList.add('hidden'); $('#login').classList.remove('hidden'); buildLogin(); };
  tb.append(who,out);
}
function buildTabs(sess){
  const bar=$('#tabs'); bar.innerHTML='';
  const list=TABS.slice();
  if(sess.isAdmin) list.push({id:'admin',label:'Admin'});
  list.forEach((t,i)=>{
    const b=h('button',{class:'tab','data-tab':t.id,'aria-selected':String(i===0)}, t.label);
    b.onclick=()=>showTab(t.id);
    bar.append(b);
  });
}
function showTab(id){
  // Quitter une question en cours dans un mode comptabilisé (Classé / Application) = comme "Passer"
  const onQuiz = $('#tab-quiz') && $('#tab-quiz').classList.contains('active');
  if(onQuiz && id!=='quiz' && counting(quiz.mode) && quiz.current && !quiz.answered){
    stopTimer();
    registerResult(false, 0);          // série perdue, tentative comptée, 0 point
    quiz.answered=true; quiz.current=null;
  }
  $$('#tabs .tab').forEach(b=>b.setAttribute('aria-selected', String(b.dataset.tab===id)));
  $$('.panel').forEach(p=>p.classList.toggle('active', p.id==='tab-'+id));
  if(id==='cours') renderCours();
  if(id==='quiz') renderQuizHome();
  if(id==='retro') renderRetro();
  if(id==='classement') renderLeaderboard();
  if(id==='param') renderParam();
  if(id==='admin') renderAdmin();
}

/* =====================================================================
   COURS
   ===================================================================== */
let coursGroupBy='chapitre';
function moduleSections(mod){ return mod.sections.map(s=>'<h3>'+s.title+'</h3>'+s.html).join(''); }
function findModule(matiere,chap,week){
  return COURSE_MODULES.find(m=> (matiere==null||m.matiere===matiere) && (chap==null||m.chap===chap) && (week==null||m.week===week));
}
function renderCours(){
  const root=$('#tab-cours'); root.innerHTML='';
  const toggle=h('div',{class:'toggle-row'});
  const c1=h('button',{class:'chip','aria-pressed':String(coursGroupBy==='chapitre')},'Par chapitre');
  const c2=h('button',{class:'chip','aria-pressed':String(coursGroupBy==='semaine')},'Par semaine');
  c1.onclick=()=>{ coursGroupBy='chapitre'; renderCours(); };
  c2.onclick=()=>{ coursGroupBy='semaine'; renderCours(); };
  toggle.append(c1,c2);
  const grid=h('div',{class:'course-grid'});
  const nav=h('div',{class:'nav-list'});
  const content=h('div',{id:'cours-content'});
  grid.append(nav,content);
  root.append(toggle,grid);

  function showModule(mod, weekLabel){
    content.innerHTML='';
    content.append(h('h2',{class:'sec'}, weekLabel ? weekLabel : (mod.matiere+' '+mod.chap+' — '+mod.chapTitle)));
    content.append(h('div',{html:moduleSections(mod)}));
    renderMath(content);
  }
  function emptyMsg(label){ content.innerHTML=''; content.append(h('div',{class:'locked-note'},'Contenu de « '+label+' » à venir.<br>On le remplit progressivement.')); }

  if(coursGroupBy==='chapitre'){
    ['Analyse','Algèbre'].forEach(mat=>{
      nav.append(h('div',{class:'nav-group'}, mat));
      CURRICULUM[mat].forEach(ch=>{
        const mod=findModule(mat, ch.num, null);
        const a=h('a',{class: mod?'':'empty'}, mat[0]+ch.num+' · '+ch.title);
        a.onclick=()=>{ $$('.nav-list a').forEach(x=>x.classList.remove('active')); a.classList.add('active'); mod?showModule(mod):emptyMsg(mat+' '+ch.num); };
        nav.append(a);
      });
    });
  } else {
    nav.append(h('div',{class:'nav-group'},'Semaines'));
    WEEKS.forEach(w=>{
      const mods=COURSE_MODULES.filter(m=>m.week===w);
      const a=h('a',{class: mods.length?'':'empty'}, 'Semaine '+String(w).padStart(2,'0'));
      a.onclick=()=>{
        $$('.nav-list a').forEach(x=>x.classList.remove('active')); a.classList.add('active');
        if(!mods.length){ emptyMsg('Semaine '+w); return; }
        content.innerHTML=''; content.append(h('h2',{class:'sec'},'Semaine '+String(w).padStart(2,'0')));
        mods.forEach(mod=>{ content.append(h('h3',{}, '— '+mod.matiere+' '+mod.chap+' : '+mod.chapTitle)); content.append(h('div',{html:moduleSections(mod)})); });
        renderMath(content);
      };
      nav.append(a);
    });
  }
  // ouvre le premier module dispo
  const first=$('.nav-list a:not(.empty)'); if(first) first.click();
}

/* =====================================================================
   QUIZ
   ===================================================================== */
let quiz={mode:null, pool:[], current:null, answered:false, timer:null, timeLeft:0, sessScore:0, sessTotal:0};
const RANKED_SECONDS=300;
function counting(mode){ return mode==='classe'||mode==='application'; }
function poolFor(mode){
  if(mode==='application') return (typeof TEMPLATES!=='undefined' && TEMPLATES.length) ? TEMPLATES.slice() : QUESTIONS.filter(q=>q.mode==='application');
  if(mode==='favoris') return favPool();
  return QUESTIONS.slice();
}

/* ---------- favoris : stockage + helpers ---------- */
function loadFavorites(){
  try{
    if(isGuest()) FAVORITES=new Set(JSON.parse(localStorage.getItem('mp2i_fav_guest')||'[]'));
    else if(CU) FAVORITES=new Set(CU.favorites||[]);
    else FAVORITES=new Set();
  }catch(e){ FAVORITES=new Set(); }
}
function saveFavorites(){
  const arr=[...FAVORITES];
  if(isGuest()){ try{ localStorage.setItem('mp2i_fav_guest', JSON.stringify(arr)); }catch(e){} return; }
  if(CU){ CU.favorites=arr; try{ DB.setUser(CU.name,{favorites:arr}); }catch(e){} }
}
function favKeyOf(q){ return q.gen ? ('T|'+q.id) : ('Q|'+q.chap+'|'+q.t); }
function favPool(){
  const out=[];
  for(const q of QUESTIONS){ if(FAVORITES.has('Q|'+q.chap+'|'+q.t)) out.push(q); }
  if(typeof TEMPLATES!=='undefined') for(const t of TEMPLATES){ if(FAVORITES.has('T|'+t.id)) out.push(t); }
  return out;
}
function currentFavKey(){ return quiz.current ? favKeyOf(quiz.current) : null; }
function updateFavBtn(){ const b=$('#fav-btn'); if(!b) return; const k=currentFavKey(); b.classList.toggle('on', !!k && FAVORITES.has(k)); }
function toggleFav(){ const k=currentFavKey(); if(!k) return; if(FAVORITES.has(k)) FAVORITES.delete(k); else FAVORITES.add(k); saveFavorites(); updateFavBtn(); }
function showEmptyFav(){ const card=$('#qcard'); if(card) card.innerHTML='<p class="note">Aucune question en favori pour l\'instant. Pendant une question (Libre, Classé ou Application), clique sur l\'étoile ★ en haut à droite pour l\'ajouter ici.</p>'; }

function renderQuizHome(){
  const root=$('#tab-quiz'); root.innerHTML='';
  const intro=h('div');
  intro.append(h('div',{class:'mode-row'}));
  const row=$('.mode-row',intro);
  const modes=[
    {id:'libre', label:'Libre', desc:'Entraînement, sans chrono ni points'},
    {id:'classe',label:'Classé ⏱', desc:'Chrono 5 min · points à la vitesse · compte au classement'},
    {id:'application',label:'Application ✍', desc:'Valeurs réelles, à poser sur feuille · compte au classement'},
    {id:'favoris',label:'Favoris ★', desc:'Revoir uniquement tes questions favorites'}
  ];
  modes.forEach(m=>{
    const b=h('button',{class:'btn '+(quiz.mode===m.id?'btn-primary':'btn-ghost')}, m.label);
    b.onclick=()=>{ startQuiz(m.id); };
    row.append(b);
  });
  intro.append(h('p',{class:'note'}, isGuest()?'Mode invité : tu peux jouer mais aucun point n\'est enregistré.':'Choisis un mode pour commencer.'));
  root.append(intro);
  const sb=h('div',{class:'scorebar',id:'quiz-scorebar'}); root.append(sb);
  const card=h('div',{class:'qcard',id:'qcard'}); root.append(card);
  card.innerHTML='<p class="note">Sélectionne un mode ci-dessus pour lancer une question.</p>';
  updateQuizScorebar();
}
function updateQuizScorebar(){
  const sb=$('#quiz-scorebar'); if(!sb) return;
  const rate=quiz.sessTotal?Math.round(100*quiz.sessScore/quiz.sessTotal):'—';
  const streak = (CU && !isGuest()) ? (CU.currentStreak||0) : 0;
  sb.innerHTML=
    statBox('Session', quiz.sessScore+' / '+quiz.sessTotal,'good')+
    statBox('Série', streak,'gold')+
    statBox('Réussite', rate==='—'?'—':rate+'%','cyan')+
    (CU&&!isGuest()?statBox('Points totaux', CU.totalPoints||0,''):'');
}
function statBox(lab,val,cls){ return '<div class="stat"><div class="lab">'+lab+'</div><div class="val '+cls+'">'+val+'</div></div>'; }

function startQuiz(mode){
  quiz.mode=mode; quiz.pool=poolFor(mode); quiz.sessScore=0; quiz.sessTotal=0; quiz.sinceApp=3;
  renderQuizHome(); // refresh boutons
  if(mode==='favoris' && quiz.pool.length===0){ showEmptyFav(); return; }
  nextQuestion();
}
// En mode Classé : au plus 1 question d'application sur 4 (au moins 3 QCM entre deux), tirage aléatoire.
function pickQuestion(){
  if(quiz.mode==='favoris'){ const p=favPool(); return p[Math.floor(Math.random()*p.length)]; }
  if(quiz.mode==='classe'){
    const apps=quiz.pool.filter(q=>q.mode==='application');
    const qcms=quiz.pool.filter(q=>q.mode==='qcm');
    let useApp = (quiz.sinceApp>=3 && apps.length && qcms.length) ? (Math.random()<0.5) : false;
    if(!qcms.length) useApp = apps.length>0;
    const arr = useApp ? apps : qcms;
    quiz.sinceApp = useApp ? 0 : (quiz.sinceApp+1);
    return arr[Math.floor(Math.random()*arr.length)];
  }
  return quiz.pool[Math.floor(Math.random()*quiz.pool.length)];
}
function stopTimer(){ if(quiz.timer){ clearInterval(quiz.timer); quiz.timer=null; } }
function nextQuestion(){
  stopTimer(); quiz.answered=false;
  if(quiz.mode==='favoris' && favPool().length===0){ showEmptyFav(); return; }
  quiz.current=pickQuestion();
  quiz.resolved = quiz.current.gen ? Object.assign({chap:quiz.current.chap, mode:quiz.current.mode}, quiz.current.gen()) : quiz.current;
  const q=quiz.resolved, keys=['A','B','C','D'], order=shuffle([0,1,2,3]);
  const card=$('#qcard');
  const isApp=q.mode==='application';
  let timerHtml = counting(quiz.mode) ? '<span class="timer" id="qtimer">05:00</span>' : '<span>'+(quiz.mode==='libre'?'sans chrono':(quiz.mode==='favoris'?'favoris':''))+'</span>';
  const star='<button class="fav-btn" id="fav-btn" title="Favori (★)" aria-label="Favori"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg></button>';
  let opts='';
  order.forEach((oi,pos)=>{ opts+='<button class="opt" data-orig="'+oi+'"><span class="key">'+keys[pos]+'</span><span>'+q.o[oi]+'</span></button>'; });
  card.innerHTML=
    '<div class="qmeta"><span class="badge'+(isApp?' app':'')+'">'+q.chap+(isApp?' · application':'')+'</span><span class="qmeta-right">'+star+timerHtml+'</span></div>'+
    (isApp?'<div class="paper-note">✍ Pose le calcul sur feuille avant de répondre.</div>':'')+
    '<div class="qtext">'+q.t+'</div><div class="opts">'+opts+'</div>'+
    '<div class="explain" id="explain"><span class="verdict"></span><span id="exp-txt"></span></div>'+
    '<div class="actions"><button class="btn btn-ghost" id="skip">Passer</button><button class="btn btn-primary" id="next" style="display:none">Suivante →</button></div>';
  $$('#qcard .opt').forEach(b=> b.onclick=()=>answer(b));
  $('#skip').onclick=()=>{ if(counting(quiz.mode)&&!quiz.answered){ registerResult(false,0); } nextQuestion(); };
  $('#next').onclick=nextQuestion;
  const fb=$('#fav-btn'); if(fb){ fb.onclick=toggleFav; updateFavBtn(); }
  renderMath(card);
  if(counting(quiz.mode)){ quiz.timeLeft=RANKED_SECONDS; tick(); quiz.timer=setInterval(tick,1000); }
}
function tick(){
  const t=$('#qtimer'); if(!t) { stopTimer(); return; }
  const m=Math.floor(quiz.timeLeft/60), s=quiz.timeLeft%60;
  t.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  t.classList.toggle('low', quiz.timeLeft<=30);
  if(quiz.timeLeft<=0){ stopTimer(); timeout(); return; }
  quiz.timeLeft--;
}
function timeout(){
  if(quiz.answered) return; quiz.answered=true;
  revealCorrect(null);
  if(counting(quiz.mode)) registerResult(false,0);
  showExplain(false, '⏱ Temps écoulé', quiz.resolved.e, 0);
}
function answer(btn){
  if(quiz.answered) return; quiz.answered=true; stopTimer();
  const chosen=+btn.dataset.orig, correct=quiz.resolved.c, ok=chosen===correct;
  revealCorrect(chosen);
  let pts=0;
  if(counting(quiz.mode)){ if(ok){ pts=Math.round(60+140*(quiz.timeLeft/RANKED_SECONDS)); } registerResult(ok,pts); }
  else { quiz.sessTotal++; if(ok) quiz.sessScore++; }
  showExplain(ok, ok?('✓ Correct'+(pts?(' · +'+pts+' pts'):'')):'✗ Faux', quiz.resolved.e, pts);
}
function revealCorrect(chosen){
  $$('#qcard .opt').forEach(b=>{ b.disabled=true; const oi=+b.dataset.orig;
    if(oi===quiz.resolved.c) b.classList.add('correct');
    if(chosen!=null && oi===chosen && chosen!==quiz.resolved.c) b.classList.add('wrong'); });
}
function showExplain(ok, verdict, txt, pts){
  const ex=$('#explain'); ex.className='explain show '+(ok?'ok':'no');
  ex.querySelector('.verdict').textContent=verdict;
  $('#exp-txt').innerHTML=txt; renderMath(ex);
  $('#skip').style.display='none'; $('#next').style.display='inline-block';
  updateQuizScorebar();
}
function snapshotCU(){
  return {attempts:CU.attempts, correct:CU.correct, totalPoints:CU.totalPoints,
          currentStreak:CU.currentStreak, bestStreak:CU.bestStreak, chapters:CU.chapters, lastWrite:nowStamp()};
}
// File d'attente : on tente d'écrire le snapshot courant ; si la règle refuse
// (pas assez de temps écoulé pour le nombre de réponses), on réessaie plus tard.
// Rien n'est perdu : l'UI est déjà à jour, le serveur rattrape dès qu'il peut.
let flushTimer=null, flushing=false, flushPending=false;
function scheduleFlush(){ flushPending=true; if(flushTimer||flushing) return; flushTimer=setTimeout(doFlush,0); }
async function doFlush(){
  flushTimer=null;
  if(flushing || !CU || isGuest()) return;
  flushing=true; flushPending=false;
  try{
    await DB.setUser(CU.name, snapshotCU());
  }catch(e){
    flushPending=true; flushing=false;          // refusé -> on retente
    flushTimer=setTimeout(doFlush, 1200);
    return;
  }
  flushing=false;
  if(flushPending) flushTimer=setTimeout(doFlush, 1200);  // réponses arrivées entre-temps
}

async function registerResult(ok, pts){
  quiz.sessTotal++; if(ok) quiz.sessScore++;
  if(isGuest() || !CU){ updateQuizScorebar(); return; }
  CU.attempts=(CU.attempts||0)+1;
  if(ok){ CU.correct=(CU.correct||0)+1; CU.totalPoints=(CU.totalPoints||0)+pts; CU.currentStreak=(CU.currentStreak||0)+1; CU.bestStreak=Math.max(CU.bestStreak||0, CU.currentStreak); }
  else { CU.currentStreak=0; }
  const ch=quiz.resolved.chap; CU.chapters=CU.chapters||{};
  const c=CU.chapters[ch]||{points:0,attempts:0,correct:0};
  c.attempts++; if(ok){ c.correct++; c.points+=pts; }
  CU.chapters[ch]=c;
  updateQuizScorebar();                      // UI instantanée
  if(ONLINE){ scheduleFlush(); }             // serveur en arrière-plan, avec réessai
  else { try{ await DB.setUser(CU.name, snapshotCU()); }catch(e){} }  // mode local : direct
}

/* =====================================================================
   RÉTROSPECTIVE
   ===================================================================== */
function renderRetro(){
  const root=$('#tab-retro'); root.innerHTML='';
  if(isGuest()||!CU){ root.append(h('div',{class:'locked-note'},'La rétrospective n\'est dispo que pour les comptes élèves. Connecte-toi pour suivre ta progression.')); return; }
  const rate=CU.attempts?Math.round(100*CU.correct/CU.attempts):0;
  const grid=h('div',{class:'retro-grid'});
  grid.innerHTML=
    statBox('Points totaux', CU.totalPoints||0,'good')+
    statBox('Meilleure série', CU.bestStreak||0,'gold')+
    statBox('Réussite globale', rate+'%','cyan')+
    statBox('Questions faites', CU.attempts||0,'');
  root.append(h('h2',{class:'sec'},'Ta progression'),grid);
  const chs=Object.entries(CU.chapters||{}).filter(([k,v])=>v.attempts>0);
  if(!chs.length){ root.append(h('p',{class:'note'},'Joue quelques questions en mode Classé ou Application pour voir tes stats par chapitre.')); return; }
  root.append(h('h3',{},'Réussite par chapitre'));
  chs.sort((a,b)=>a[0].localeCompare(b[0])).forEach(([k,v])=>{
    const pct=Math.round(100*v.correct/v.attempts);
    const row=h('div',{class:'bar-row'});
    row.innerHTML='<span class="name">'+k+'</span><div class="bar-track"><div class="bar-fill" style="width:'+pct+'%"></div></div><span class="pct">'+pct+'%</span>';
    root.append(row);
  });
  root.append(h('h3',{},'Points par chapitre'));
  const maxP=Math.max(1,...chs.map(([k,v])=>v.points||0));
  chs.forEach(([k,v])=>{
    const w=Math.round(100*(v.points||0)/maxP);
    const row=h('div',{class:'bar-row'});
    row.innerHTML='<span class="name">'+k+'</span><div class="bar-track"><div class="bar-fill" style="width:'+w+'%"></div></div><span class="pct">'+(v.points||0)+'</span>';
    root.append(row);
  });
}

/* =====================================================================
   CLASSEMENT
   ===================================================================== */
let lbCrit='points', lbChap=null;
async function renderLeaderboard(){
  const root=$('#tab-classement'); root.innerHTML='';
  const ctrl=h('div',{class:'lb-controls'});
  const sel=h('select',{}); sel.style.maxWidth='220px';
  [['points','Points totaux'],['streak','Meilleure série'],['reussite','% de réussite'],['chapitre','Par chapitre']].forEach(([v,l])=>{
    const o=h('option',{value:v},l); if(v===lbCrit) o.selected=true; sel.append(o);
  });
  sel.onchange=()=>{ lbCrit=sel.value; renderLeaderboard(); };
  ctrl.append(sel);
  if(lbCrit==='chapitre'){
    const cs=h('select',{}); cs.style.maxWidth='260px';
    const allChaps=[...new Set(QUESTIONS.map(q=>q.chap))];
    if(!lbChap) lbChap=allChaps[0];
    allChaps.forEach(c=>{ const o=h('option',{value:c},c); if(c===lbChap)o.selected=true; cs.append(o); });
    cs.onchange=()=>{ lbChap=cs.value; renderLeaderboard(); };
    ctrl.append(cs);
  }
  root.append(h('h2',{class:'sec'},'Classement'),ctrl);

  let users=await DB.listUsers();
  const metric=(u)=>{
    if(lbCrit==='points') return u.totalPoints||0;
    if(lbCrit==='streak') return u.bestStreak||0;
    if(lbCrit==='reussite') return u.attempts?(u.correct/u.attempts):-1;
    if(lbCrit==='chapitre'){ const c=(u.chapters||{})[lbChap]; return c?c.points:0; }
    return 0;
  };
  const fmt=(u)=>{
    if(lbCrit==='reussite'){ return u.attempts?Math.round(100*u.correct/u.attempts)+'%':'—'; }
    return metric(u);
  };
  users=users.filter(u=>!(lbCrit==='reussite'&&!u.attempts) || lbCrit!=='reussite' ? true : false);
  users.sort((a,b)=>metric(b)-metric(a));

  const sess=getSession();
  // ligne « toi »
  if(sess && !sess.isGuest){
    const rank=users.findIndex(u=>u.name===sess.name)+1;
    const me=users.find(u=>u.name===sess.name);
    const yr=h('div',{class:'you-row'});
    yr.innerHTML='<span class="lbl">Toi · '+sess.name+' — '+fmt(me||{})+'</span><span class="rank">#'+(rank||'—')+'</span>';
    root.append(yr);
  } else {
    root.append(h('p',{class:'note'},'Mode invité : non classé.'));
  }

  const top=users.slice(0,10);
  const table=h('table',{class:'lb-table'});
  table.innerHTML='<tr><th>#</th><th>Élève</th><th style="text-align:right">'+sel.options[sel.selectedIndex].text+'</th></tr>';
  top.forEach((u,i)=>{
    const tr=h('tr', sess&&u.name===sess.name?{class:'me'}:{});
    tr.innerHTML='<td class="lb-rank r'+(i+1)+'">'+(i+1)+'</td><td>'+u.name+(u.isAdmin?' <span class="badge-admin">A</span>':'')+'</td><td class="lb-val">'+fmt(u)+'</td>';
    table.append(tr);
  });
  root.append(table);
}

/* =====================================================================
   PARAMÈTRES
   ===================================================================== */
function renderParam(){
  const root=$('#tab-param'); root.innerHTML='';
  root.append(h('h2',{class:'sec'},'Paramètres'));
  // thème
  const tc=h('div',{class:'set-card'});
  tc.append(h('h3',{},'Thème'));
  const tg=h('div',{class:'theme-grid'});
  const cur=document.documentElement.getAttribute('data-theme');
  [['violet','Violet'],['minuit','Minuit'],['matrix','Matrix'],['sakura','Sakura']].forEach(([v,l])=>{
    const s=h('button',{class:'theme-swatch','aria-pressed':String(v===cur)}, l);
    s.onclick=()=>{ applyTheme(v); renderParam(); };
    tg.append(s);
  });
  tc.append(tg); root.append(tc);
  // mot de passe
  if(!isGuest() && CU){
    const pc=h('div',{class:'set-card'});
    pc.append(h('h3',{},'Mot de passe'), h('div',{id:'pw-hint',class:'note'},''));
    const old=h('input',{type:'password',placeholder:'Mot de passe actuel'});
    const n1=h('input',{type:'password',placeholder:'Nouveau mot de passe'});
    const n2=h('input',{type:'password',placeholder:'Confirme le nouveau'});
    const msg=h('div',{class:'error'});
    const btn=h('button',{class:'btn btn-primary'},'Changer'); btn.style.marginTop='12px';
    btn.onclick=async()=>{
      msg.className='error'; msg.textContent='';
      if(await sha256(old.value||'')!==CU.passwordHash){ msg.textContent='Mot de passe actuel incorrect.'; return; }
      if((n1.value||'').length<3){ msg.textContent='Nouveau mot de passe trop court.'; return; }
      if(n1.value!==n2.value){ msg.textContent='Les deux ne correspondent pas.'; return; }
      const hash=await sha256(n1.value);
      CU.passwordHash=hash; CU.mustChangePassword=false;
      await DB.setUser(CU.name,{passwordHash:hash,mustChangePassword:false,lastWrite:nowStamp()});
      msg.className='ok-msg'; msg.textContent='Mot de passe mis à jour ✓';
      old.value=n1.value=n2.value='';
    };
    pc.append(h('label',{class:'field'},'Actuel'),old,h('label',{class:'field'},'Nouveau'),n1,h('label',{class:'field'},'Confirmation'),n2,btn,msg);
    root.append(pc);
  }
}

/* =====================================================================
   ADMIN (Roman uniquement)
   ===================================================================== */
function renderAdmin(){
  const root=$('#tab-admin'); root.innerHTML='';
  if(!isAdmin()){ root.append(h('div',{class:'locked-note'},'Accès réservé.')); return; }
  root.append(h('h2',{class:'sec'},'Panneau admin'));

  // reset global des scores
  const c1=h('div',{class:'adm-card'});
  c1.append(h('h3',{},'Réinitialiser tous les scores'));
  c1.append(h('p',{class:'note'},'Remet à zéro points, séries et stats de tous les comptes. Irréversible.'));
  const b1=h('button',{class:'btn btn-danger'},'Tout réinitialiser');
  const m1=h('div',{class:'ok-msg'});
  b1.onclick=async()=>{
    if(!confirm('Réinitialiser TOUS les scores ?')) return;
    b1.disabled=true; const users=await DB.listUsers();
    for(const u of users){ await DB.setUser(u.name,{totalPoints:0,bestStreak:0,currentStreak:0,attempts:0,correct:0,chapters:{},lastWrite:nowStamp()}); }
    if(CU){ Object.assign(CU,{totalPoints:0,bestStreak:0,currentStreak:0,attempts:0,correct:0,chapters:{}}); }
    b1.disabled=false; m1.textContent='Scores réinitialisés ✓';
  };
  c1.append(b1,m1); root.append(c1);

  // reset des scores d'UNE personne
  const cP=h('div',{class:'adm-card'});
  cP.append(h('h3',{},'Réinitialiser les scores d\'un élève'));
  const selP=h('select',{}); STUDENTS.forEach(n=>selP.append(h('option',{value:n},n)));
  const mP=h('div',{class:'ok-msg'});
  const bP=h('button',{class:'btn btn-danger'},'Réinitialiser ses scores'); bP.style.marginTop='10px';
  bP.onclick=async()=>{
    if(!confirm('Réinitialiser les scores de '+selP.value+' ?')) return;
    await DB.setUser(selP.value,{totalPoints:0,bestStreak:0,currentStreak:0,attempts:0,correct:0,chapters:{},lastWrite:nowStamp()});
    if(CU&&CU.name===selP.value){ Object.assign(CU,{totalPoints:0,bestStreak:0,currentStreak:0,attempts:0,correct:0,chapters:{}}); }
    mP.textContent='Scores de '+selP.value+' remis à zéro ✓';
  };
  cP.append(h('label',{class:'field'},'Élève'),selP,bP,mP); root.append(cP);

  // reset mot de passe individuel
  const c2=h('div',{class:'adm-card'});
  c2.append(h('h3',{},'Réinitialiser un mot de passe'));
  const sel=h('select',{}); STUDENTS.forEach(n=>sel.append(h('option',{value:n},n)));
  const pwInput=h('input',{type:'text',placeholder:'Laisse vide = mot de passe par défaut'});
  const m2=h('div',{class:'ok-msg'});
  const b2=h('button',{class:'btn btn-primary'},'Réinitialiser'); b2.style.marginTop='10px';
  b2.onclick=async()=>{
    const pw=(pwInput.value||'').trim();
    const hash = pw ? await sha256(pw) : DEFAULT_PASSWORD_HASH;
    await DB.setUser(sel.value,{passwordHash:hash,mustChangePassword:true,lastWrite:nowStamp()});
    if(CU&&CU.name===sel.value){ CU.passwordHash=hash; CU.mustChangePassword=true; }
    m2.textContent = pw ? ('Mot de passe de '+sel.value+' → « '+pw+' » ✓')
                        : ('Mot de passe de '+sel.value+' remis au défaut ✓');
    pwInput.value='';
  };
  c2.append(h('div',{class:'row2'},''),h('label',{class:'field'},'Élève'),sel,h('label',{class:'field'},'Nouveau mot de passe'),pwInput,b2,m2);
  root.append(c2);

  // (ré)initialiser les comptes manquants
  const c3=h('div',{class:'adm-card'});
  c3.append(h('h3',{},'Comptes'));
  c3.append(h('p',{class:'note'},'Crée les comptes manquants (mot de passe par défaut) sans toucher aux existants.'));
  const b3=h('button',{class:'btn btn-ghost'},'Créer les comptes manquants');
  const m3=h('div',{class:'ok-msg'});
  b3.onclick=async()=>{
    const existing=new Set((await DB.listUsers()).map(u=>u.name));
    let n=0;
    for(const name of STUDENTS){ if(!existing.has(name)){ const u=blankUser(name); u.passwordHash=DEFAULT_PASSWORD_HASH; u.lastWrite=nowStamp(); await DB.setUser(name,u); n++; } }
    m3.textContent=n+' compte(s) créé(s) ✓';
  };
  c3.append(b3,m3); root.append(c3);
}

/* =====================================================================
   RACCOURCI CLAVIER — Espace : Passer (si pas répondu) / Suivante (si répondu)
   ===================================================================== */
function bindQuizKeys(){
  document.addEventListener('keydown', (e)=>{
    if(e.code!=='Space' && e.key!==' ') return;
    const ae=document.activeElement;
    // ne pas gêner la saisie dans un champ
    if(ae && (ae.tagName==='INPUT'||ae.tagName==='TEXTAREA'||ae.tagName==='SELECT')) return;
    // laisser la sélection d'une option au clavier (Espace sur un bouton-réponse focalisé)
    if(ae && ae.classList && ae.classList.contains('opt')) return;
    // seulement quand l'onglet Quiz est actif et qu'une question est affichée
    const panel=document.getElementById('tab-quiz');
    if(!panel || !panel.classList.contains('active')) return;
    if(!document.getElementById('qcard')) return;
    const nextBtn=document.getElementById('next'), skipBtn=document.getElementById('skip');
    if(!nextBtn && !skipBtn) return;
    e.preventDefault();
    if(quiz.answered){ if(nextBtn && nextBtn.style.display!=='none') nextBtn.click(); }
    else { if(skipBtn && skipBtn.style.display!=='none') skipBtn.click(); }
  });
}

/* =====================================================================
   INIT
   ===================================================================== */
window.addEventListener('DOMContentLoaded', async ()=>{
  bindQuizKeys();
  try{ await seedIfNeeded(); }catch(e){ console.warn('seed',e); }
  const sess=getSession();
  if(sess){ if(sess.isGuest){ enterApp(); } else { const u=await DB.getUser(sess.name); if(u){ CU=u; enterApp(); } else { clearSession(); buildLogin(); } } }
  else { buildLogin(); }
});

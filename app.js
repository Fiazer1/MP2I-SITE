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
let retroCompare='';

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
           totalPoints:0, lifetimePoints:0, currency:0, weekStamp:'',
           bestStreak:0, currentStreak:0, attempts:0, correct:0, chapters:{} };
}
// Identifiant de semaine ISO, ex. "2026-W35" (semaine commençant le lundi)
function isoWeekId(d){
  const t=new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day=t.getUTCDay()||7; t.setUTCDate(t.getUTCDate()+4-day);
  const y0=new Date(Date.UTC(t.getUTCFullYear(),0,1));
  const w=Math.ceil((((t-y0)/86400000)+1)/7);
  return t.getUTCFullYear()+'-W'+String(w).padStart(2,'0');
}
const CURRENCY_NAME='$MPI';   // MPI-dollars
// Conversion hebdomadaire : les points de la semaine deviennent de la monnaie, puis repartent à 0.
// Rejouer la conversion ne rapporte rien (les points valent alors 0) — vérifié aussi par les règles.
async function maybeWeeklyConversion(){
  if(!CU || isGuest()) return 0;
  const now=isoWeekId(new Date());
  const prev=CU.weekStamp||'';
  // Premier passage : on pose seulement le repère, sans rien convertir.
  if(!prev){ CU.weekStamp=now; try{ await DB.setUser(CU.name,{weekStamp:now}); }catch(e){} return 0; }
  // Repère invalide (ancien format) : on le remet d'aplomb sans convertir.
  if(!/^\d{4}-W\d{2}$/.test(prev)){ CU.weekStamp=now; try{ await DB.setUser(CU.name,{weekStamp:now}); }catch(e){} return 0; }
  // Même semaine ISO -> rien. La bascule n'a lieu qu'au passage au lundi suivant.
  if(prev===now) return 0;
  const gained=CU.totalPoints||0;
  CU.currency=(CU.currency||0)+gained;
  CU.totalPoints=0; CU.weekStamp=now;
  // On n'écrit QUE ces trois champs : séries, tentatives, all-time, chapitres intacts.
  try{ await DB.setUser(CU.name,{currency:CU.currency, totalPoints:0, weekStamp:now}); }catch(e){}
  return gained;
}
async function seedIfNeeded(){
  // Ne crée QUE les comptes réellement absents. Ne réécrit jamais un compte
  // existant (sinon un incident réseau remettrait tous les scores à zéro).
  const users=await DB.listUsers();
  const existing=new Set(users.map(u=>u.name));
  if(existing.size>0 && existing.size>=STUDENTS.length) return;
  for(const name of STUDENTS){
    if(existing.has(name)) continue;
    const u=blankUser(name); u.passwordHash=DEFAULT_PASSWORD_HASH; u.lastWrite=nowStamp();
    await DB.setUser(name,u);
  }
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
  {id:'boutique', label:'Boutique'},
  {id:'inventaire',label:'Inventaire'},
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
  if(CU && !isGuest()){
    maybeWeeklyConversion().then(g=>{
      buildTopbar(getSession());
      if(g>0) alert('Nouvelle semaine ! Tes '+g+' points ont été convertis en '+g+' '+CURRENCY_NAME+'.');
    });
  }
  if(forcePw){ showTab('param'); $('#pw-hint') && ($('#pw-hint').textContent='⚠️ Change ton mot de passe provisoire.'); }
}
function isGuest(){ const s=getSession(); return !!(s&&s.isGuest); }
function isAdmin(){ const s=getSession(); return !!(s&&s.isAdmin); }

function buildTopbar(sess){
  const tb=$('#topbar'); tb.innerHTML='';
  const who=h('div',{class:'whoami'});
  if(sess.isGuest){ who.innerHTML='Connecté en <b>Invité</b> <span class="badge-guest">sans points</span>'; }
  else { who.innerHTML='Connecté : <b>'+sess.name+'</b>' + (sess.isAdmin?'<span class="badge-admin">ADMIN</span>':'')
          + (CU?' <span class="wallet">'+(CU.currency||0)+' '+CURRENCY_NAME+'</span>':''); }
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
  if(id==='boutique') renderShop();
  if(id==='inventaire') renderInventory();
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
  // Mobile : la liste des chapitres devient un panneau coulissant (drawer)
  const drawerBtn=h('button',{class:'drawer-btn'},'☰ <span id="drawer-label">Choisir un chapitre</span>');
  const backdrop=h('div',{class:'drawer-backdrop'});
  const openDrawer=()=>{ nav.classList.add('open'); backdrop.classList.add('show'); document.body.classList.add('no-scroll'); };
  const closeDrawer=()=>{ nav.classList.remove('open'); backdrop.classList.remove('show'); document.body.classList.remove('no-scroll'); };
  drawerBtn.onclick=openDrawer; backdrop.onclick=closeDrawer;
  const toggle=h('div',{class:'toggle-row'});
  const c1=h('button',{class:'chip','aria-pressed':String(coursGroupBy==='chapitre')},'Par chapitre');
  const c2=h('button',{class:'chip','aria-pressed':String(coursGroupBy==='semaine')},'Par semaine');
  c1.onclick=()=>{ coursGroupBy='chapitre'; renderCours(); };
  c2.onclick=()=>{ coursGroupBy='semaine'; renderCours(); };
  toggle.append(c1,c2);
  const grid=h('div',{class:'course-grid'});
  const nav=h('div',{class:'nav-list'});
  const closeBtn=h('button',{class:'drawer-close'},'✕');
  closeBtn.onclick=()=>closeDrawer();
  nav.append(closeBtn);
  const content=h('div',{id:'cours-content'});
  grid.append(nav,content);
  root.append(drawerBtn,toggle,backdrop,grid);

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
        a.onclick=()=>{ $$('.nav-list a').forEach(x=>x.classList.remove('active')); a.classList.add('active');
          mod?showModule(mod):emptyMsg(mat+' '+ch.num);
          const lb=$('#drawer-label'); if(lb) lb.textContent=mat[0]+ch.num+' · '+ch.title;
          closeDrawer(); };
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
        const lb=$('#drawer-label'); if(lb) lb.textContent='Semaine '+String(w).padStart(2,'0');
        closeDrawer();
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
  if(mode==='favoris') return favPoolActive();
  if(mode==='libre') return QUESTIONS.filter(q=>passFilter(q));
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
function showEmptyMsg(t){ const card=$('#qcard'); if(card) card.innerHTML='<p class="note">'+t+'</p>'; }
function showEmptyFav(){
  const txt = favPool().length===0
    ? 'Aucune question en favori pour l\'instant. Pendant une question (Libre, Classé ou Application), clique sur l\'étoile ★ en haut à droite pour l\'ajouter ici.'
    : 'Aucun favori dans les filtres sélectionnés. Élargis (ex. « Tout ») ci-dessus.';
  showEmptyMsg(txt);
}

function availableChaps(){
  const s=new Set();
  for(const q of QUESTIONS) s.add(q.chap);
  if(typeof TEMPLATES!=='undefined') for(const t of TEMPLATES) s.add(t.chap);
  return [...s].sort();
}
function availableWeeks(){
  const s=new Set();
  for(const q of QUESTIONS) if(q.week!=null) s.add(q.week);
  if(typeof TEMPLATES!=='undefined') for(const t of TEMPLATES) if(t.week!=null) s.add(t.week);
  return [...s].sort((a,b)=>a-b);
}
// Deux filtres indépendants, combinés en ET. Valeurs stockées en chaînes.
const FILTERS = {
  chap:{ all:true, set:new Set(), open:false, label:'Chapitres', list:availableChaps, fmt:v=>v },
  week:{ all:true, set:new Set(), open:false, label:'Semaines', list:availableWeeks, fmt:v=>'S'+String(v).padStart(2,'0') }
};
function matchOne(f,v){ return f.all || f.set.has(String(v)); }
function passFilter(q){ return matchOne(FILTERS.chap, q.chap) && matchOne(FILTERS.week, q.week); }
function favPoolActive(){ return favPool().filter(q=>passFilter(q)); }
function filterSummary(key){
  const f=FILTERS[key], a=[...f.set];
  if(f.all || a.length===0) return 'Tout';
  const labels=a.map(v=>f.fmt(v));
  return labels.length<=2 ? labels.join(', ') : (labels.length+(key==='week'?' semaines':' chapitres'));
}
function refreshFilterChips(key){
  const f=FILTERS[key];
  const all=$('#flt-all-'+key); if(all) all.setAttribute('aria-pressed', String(f.all));
  $$('.flt-chip-'+key).forEach(c=>{ const v=c.dataset.val; c.setAttribute('aria-pressed', String(!f.all && f.set.has(v))); });
  const sum=$('#flt-summary-'+key); if(sum) sum.textContent=filterSummary(key);
  const lab=$('#flt-btn-label'); if(lab) lab.textContent='Filtres : '+filterSummary('chap')+' · '+filterSummary('week');
}
function renderFilterBox(key, root){
  const f=FILTERS[key], items=f.list();
  if(items.length===0) return;
  const box=h('div',{class:'filter-box'+(f.open?' open':'')});
  const head=h('div',{class:'filter-head'});
  head.innerHTML='<span>'+f.label+' <span style="opacity:.65">(Libre &amp; Favoris)</span> : <b id="flt-summary-'+key+'">'+filterSummary(key)+'</b></span><span class="caret">▸</span>';
  head.onclick=()=>{ f.open=!f.open; box.classList.toggle('open', f.open); };
  const body=h('div',{class:'filter-body'});
  const allChip=h('button',{class:'chip',id:'flt-all-'+key,'aria-pressed':String(f.all)},'Tout');
  allChip.onclick=()=>{ f.all=true; f.set.clear(); refreshFilterChips(key); };
  body.append(allChip);
  items.forEach(v=>{
    const val=String(v), on=!f.all && f.set.has(val);
    const c=h('button',{class:'chip flt-chip-'+key,'data-val':val,'aria-pressed':String(on)}, f.fmt(v));
    c.onclick=()=>{
      if(f.all){ f.all=false; f.set=new Set([val]); }
      else { f.set.has(val)?f.set.delete(val):f.set.add(val); if(f.set.size===0) f.all=true; }
      refreshFilterChips(key);
    };
    body.append(c);
  });
  box.append(head, body);
  root.append(box);
}
function renderQuizHome(){
  const root=$('#tab-quiz'); root.innerHTML='';
  const intro=h('div');
  intro.append(h('div',{class:'mode-row'}));
  const row=$('.mode-row',intro);
  let modes=[
    {id:'libre', label:'Libre', desc:'Entraînement, sans chrono ni points'},
    {id:'classe',label:'Classé ⏱', desc:'Chrono 5 min · points à la vitesse · compte au classement'},
    {id:'application',label:'Application ✍', desc:'Valeurs réelles, à poser sur feuille · compte au classement'},
    {id:'favoris',label:'Favoris ★', desc:'Revoir uniquement tes questions favorites'}
  ];
  if(isGuest()) modes=modes.filter(m=>m.id!=='favoris');   // pas de favoris en invité
  modes.forEach(m=>{
    const b=h('button',{class:'btn '+(quiz.mode===m.id?'btn-primary':'btn-ghost')}, m.label);
    b.onclick=()=>{ startQuiz(m.id); };
    row.append(b);
  });
  intro.append(h('p',{class:'note'}, isGuest()?'Mode invité : tu peux jouer mais aucun point n\'est enregistré.':'Choisis un mode pour commencer.'));
  root.append(intro);

  // Filtres (Libre & Favoris uniquement).
  // Desktop : deux boîtes repliables. Mobile : un panneau qui glisse depuis la droite.
  const showFilter = (quiz.mode==null || quiz.mode==='libre' || quiz.mode==='favoris');
  if(showFilter){
    const fbtn=h('button',{class:'drawer-btn',id:'flt-open'},'⚙ <span id="flt-btn-label">Filtres : '+filterSummary('chap')+' · '+filterSummary('week')+'</span>');
    const fback=h('div',{class:'drawer-backdrop',id:'flt-back'});
    const wrap=h('div',{class:'filters-wrap',id:'filters-wrap'});
    const fclose=h('button',{class:'drawer-close'},'✕');
    const closeF=()=>{ wrap.classList.remove('open'); fback.classList.remove('show'); document.body.classList.remove('no-scroll'); };
    fbtn.onclick=()=>{ wrap.classList.add('open'); fback.classList.add('show'); document.body.classList.add('no-scroll'); };
    fclose.onclick=closeF; fback.onclick=closeF;
    wrap.append(fclose);
    renderFilterBox('chap', wrap);
    renderFilterBox('week', wrap);
    const apply=h('button',{class:'btn btn-primary',id:'flt-apply'},'Voir les questions');
    apply.onclick=()=>{ closeF(); if(quiz.mode){ startQuiz(quiz.mode); } };
    wrap.append(apply);
    root.append(fbtn,fback,wrap);
  }

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
    (CU&&!isGuest()?statBox('Points (semaine)', CU.totalPoints||0,''):'');
}
function statBox(lab,val,cls){ return '<div class="stat"><div class="lab">'+lab+'</div><div class="val '+cls+'">'+val+'</div></div>'; }

function startQuiz(mode){
  quiz.mode=mode; quiz.pool=poolFor(mode); quiz.sessScore=0; quiz.sessTotal=0; quiz.sinceApp=3;
  renderQuizHome(); // refresh boutons
  if(quiz.pool.length===0){ if(mode==='favoris') showEmptyFav(); else showEmptyMsg('Aucune question pour les filtres sélectionnés.'); return; }
  nextQuestion();
}
// En mode Classé : au plus 1 question d'application sur 4 (au moins 3 QCM entre deux), tirage aléatoire.
function pickQuestion(){
  if(quiz.mode==='favoris'){ const p=favPoolActive(); return p[Math.floor(Math.random()*p.length)]; }
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
  if(quiz.mode==='favoris' && favPoolActive().length===0){ showEmptyFav(); return; }
  quiz.current=pickQuestion();
  quiz.resolved = quiz.current.gen ? Object.assign({chap:quiz.current.chap, mode:quiz.current.mode}, quiz.current.gen()) : quiz.current;
  const q=quiz.resolved, keys=['A','B','C','D'], order=shuffle([0,1,2,3]);
  const card=$('#qcard');
  const isApp=q.mode==='application';
  let timerHtml = counting(quiz.mode) ? '<span class="timer" id="qtimer">05:00</span>' : '<span>'+(quiz.mode==='libre'?'sans chrono':(quiz.mode==='favoris'?'favoris':''))+'</span>';
  const star = isGuest() ? '' : '<button class="fav-btn" id="fav-btn" title="Favori (★)" aria-label="Favori"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg></button>';
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
  return {attempts:CU.attempts, correct:CU.correct, totalPoints:CU.totalPoints, lifetimePoints:CU.lifetimePoints||0,
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
  if(ok){ CU.correct=(CU.correct||0)+1; CU.totalPoints=(CU.totalPoints||0)+pts; CU.lifetimePoints=(CU.lifetimePoints||0)+pts; CU.currentStreak=(CU.currentStreak||0)+1; CU.bestStreak=Math.max(CU.bestStreak||0, CU.currentStreak); }
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
function profileCardHtml(u){
  const bd=u.equippedBadge?itemById(u.equippedBadge):null;
  const bn=u.equippedBanner?itemById(u.equippedBanner):null;
  const badge=bd?' <span class="shop-badge sm" style="border-color:'+(RARITY[bd.rarity]||{}).color+';color:'+(RARITY[bd.rarity]||{}).color+'">'+bd.name+'</span>':'';
  const rate=u.attempts?Math.round(100*u.correct/u.attempts):0;
  return '<div class="profile-card" style="background:'+(bn?bannerCss(bn):'var(--surface)')+'">'
       + '<div class="profile-head">'+avatarHtml(u,56)
       + '<div><div class="profile-name">'+u.name+(u.isAdmin?' <span class="badge-admin">A</span>':'')+badge+'</div>'
       + '<div class="profile-sub">'+(u.lifetimePoints||0)+' pts all-time · '+rate+'% de réussite</div></div></div></div>';
}
// Métriques comparables
const RETRO_METRICS=[
  {key:'week',   label:'Points (semaine)', get:u=>u.totalPoints||0},
  {key:'life',   label:'Points (all-time)',get:u=>u.lifetimePoints||0},
  {key:'assidu', label:'Assiduité (questions)', get:u=>u.attempts||0},
  {key:'correct',label:'Bonnes réponses', get:u=>u.correct||0},
  {key:'rate',   label:'Réussite (%)',    get:u=>u.attempts?Math.round(100*u.correct/u.attempts):0},
  {key:'streak', label:'Meilleure série', get:u=>u.bestStreak||0},
  {key:'money',  label:CURRENCY_NAME,     get:u=>u.currency||0}
];
function compareChart(a,b){
  // barres groupées : chaque métrique normalisée par le max des deux
  const rows=RETRO_METRICS.map(m=>{
    const va=m.get(a), vb=b?m.get(b):0, mx=Math.max(va,vb,1);
    const wa=Math.round(100*va/mx), wb=Math.round(100*vb/mx);
    return '<div class="cmp-row"><div class="cmp-lab">'+m.label+'</div>'
      +'<div class="cmp-bars">'
      +'<div class="cmp-line"><div class="cmp-fill a" style="width:'+wa+'%"></div><span class="cmp-val">'+va+'</span></div>'
      +(b?'<div class="cmp-line"><div class="cmp-fill b" style="width:'+wb+'%"></div><span class="cmp-val">'+vb+'</span></div>':'')
      +'</div></div>';
  }).join('');
  return '<div class="cmp-chart">'+rows+'</div>';
}
async function renderRetro(){
  const root=$('#tab-retro'); root.innerHTML='';
  if(isGuest()||!CU){ root.append(h('div',{class:'locked-note'},'La rétrospective n\'est dispo que pour les comptes élèves. Connecte-toi pour suivre ta progression.')); return; }
  root.append(h('h2',{class:'sec'},'Rétrospective'));

  // --- sélecteur de comparaison ---
  const bar=h('div',{class:'lb-controls'});
  bar.append(h('span',{class:'note',style:'margin:0'},'Se comparer à :'));
  const sel=h('select',{}); sel.style.maxWidth='220px';
  sel.append(h('option',{value:''},'— personne —'));
  STUDENTS.filter(n=>n!==CU.name).forEach(n=> sel.append(h('option',{value:n},n)));
  if(retroCompare) sel.value=retroCompare;
  sel.onchange=()=>{ retroCompare=sel.value; renderRetro(); };
  bar.append(sel);
  root.append(bar);

  let other=null;
  if(retroCompare){ try{ other=await DB.getUser(retroCompare); }catch(e){} }

  // --- cartes profil ---
  const cards=h('div',{class:'profile-grid'});
  cards.innerHTML=profileCardHtml(CU)+(other?profileCardHtml(other):'');
  root.append(cards);

  // --- graphe comparatif ---
  const box=h('div',{class:'card'});
  box.innerHTML='<h3 style="margin-top:0">Comparaison</h3>'
    +'<div class="cmp-legend"><span><i class="dot a"></i>'+CU.name+'</span>'+(other?'<span><i class="dot b"></i>'+other.name+'</span>':'')+'</div>'
    +compareChart(CU, other);
  root.append(box);

  // --- stats perso par chapitre ---
  const chs=Object.entries(CU.chapters||{}).filter(([k,v])=>v.attempts>0);
  if(chs.length){
    root.append(h('h3',{},'Ta réussite par chapitre'));
    chs.sort((a,b)=>a[0].localeCompare(b[0])).forEach(([k,v])=>{
      const pct=Math.round(100*v.correct/v.attempts);
      const o=other&&other.chapters&&other.chapters[k];
      const opct=o&&o.attempts?Math.round(100*o.correct/o.attempts):null;
      const row=h('div',{class:'bar-row'});
      row.innerHTML='<span class="name">'+k+'</span><div class="bar-track"><div class="bar-fill" style="width:'+pct+'%"></div></div><span class="pct">'+pct+'%'
        +(opct!=null?' <span style="color:var(--muted)">vs '+opct+'%</span>':'')+'</span>';
      root.append(row);
    });
  } else {
    root.append(h('p',{class:'note'},'Joue quelques questions en mode Classé ou Application pour voir tes stats par chapitre.'));
  }
}

/* =====================================================================
   CLASSEMENT
   ===================================================================== */
let lbCrit='points', lbChap=null;
async function renderLeaderboard(){
  const root=$('#tab-classement'); root.innerHTML='';
  const ctrl=h('div',{class:'lb-controls'});
  const sel=h('select',{}); sel.style.maxWidth='220px';
  [['points','Points (semaine)'],['lifetime','Points (all-time)'],['streak','Meilleure série'],['reussite','% de réussite'],['chapitre','Par chapitre']].forEach(([v,l])=>{
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
    if(lbCrit==='lifetime') return u.lifetimePoints||0;
    if(lbCrit==='streak') return u.bestStreak||0;
    if(lbCrit==='reussite') return u.attempts?(u.correct/u.attempts):-1;
    if(lbCrit==='chapitre'){ const c=(u.chapters||{})[lbChap]; return c?c.points:0; }
    return 0;
  };
  const fmt=(u)=>{
    if(lbCrit==='reussite'){ return u.attempts?Math.round(100*u.correct/u.attempts)+'%':'—'; }
    return metric(u);
  };
  const qualifies=(u)=> lbCrit==='reussite' ? (u.attempts>0) : (metric(u)>0);
  users=users.filter(qualifies);
  users.sort((a,b)=>metric(b)-metric(a));

  const sess=getSession();
  // ligne « toi »
  if(sess && !sess.isGuest){
    const idx=users.findIndex(u=>u.name===sess.name);
    const me=idx>=0?users[idx]:null;
    const yr=h('div',{class:'you-row'});
    if(me) yr.innerHTML='<span class="lbl">Toi · '+sess.name+' — '+fmt(me)+'</span><span class="rank">#'+(idx+1)+'</span>';
    else   yr.innerHTML='<span class="lbl">Toi · '+sess.name+' — pas encore classé</span><span class="rank">—</span>';
    root.append(yr);
  } else {
    root.append(h('p',{class:'note'},'Mode invité : non classé.'));
  }

  if(users.length===0){
    root.append(h('p',{class:'note'},'Personne n\'a encore marqué de points pour ce critère.'));
    return;
  }
  const top=users.slice(0,10);
  const table=h('table',{class:'lb-table'});
  table.innerHTML='<tr><th>#</th><th>Élève</th><th style="text-align:right">'+sel.options[sel.selectedIndex].text+'</th></tr>';
  top.forEach((u,i)=>{
    const tr=h('tr', sess&&u.name===sess.name?{class:'me'}:{});
    const bItem = u.equippedBadge ? itemById(u.equippedBadge) : null;
    const nItem = u.equippedBanner ? itemById(u.equippedBanner) : null;
    const badgeHtml = bItem ? ' <span class="shop-badge sm" style="border-color:'+(RARITY[bItem.rarity]||{}).color+';color:'+(RARITY[bItem.rarity]||{}).color+'">'+bItem.name+'</span>' : '';
    if(nItem){ tr.classList.add('has-banner'); tr.style.background=bannerCss(nItem); }
    const nameCell = '<td>'+avatarHtml(u,22)+u.name+(u.isAdmin?' <span class="badge-admin">A</span>':'')+badgeHtml+'</td>';
    tr.innerHTML='<td class="lb-rank r'+(i+1)+'">'+(i+1)+'</td>'+nameCell+'<td class="lb-val">'+fmt(u)+'</td>';
    table.append(tr);
  });
  root.append(table);
}

/* =====================================================================
   BOUTIQUE
   ===================================================================== */
function itemById(id){ return SHOP_ITEMS.find(i=>i.id===id); }
function ownsItem(id){ return !!(CU && (CU.inventory||[]).includes(id)); }
function priceOf(it){ return it.price!=null ? it.price : (RARITY[it.rarity]||{}).price || 0; }
function itemChipHtml(it){
  if(it.type==='badge') return '<span class="shop-badge" style="border-color:'+(RARITY[it.rarity]||{}).color+';color:'+(RARITY[it.rarity]||{}).color+'">'+it.name+'</span>';
  return '<span class="shop-banner" style="background:'+bannerCss(it)+'"></span>';
}
async function buyItem(it){
  if(!CU || isGuest()) return;
  const p=priceOf(it);
  if(ownsItem(it.id)) return;
  if((CU.currency||0) < p){ alert('Pas assez de '+CURRENCY_NAME+' : il te manque '+(p-(CU.currency||0))+'.'); return; }
  if(!confirm('Acheter « '+it.name+' » pour '+p+' '+CURRENCY_NAME+' ?')) return;
  CU.currency=(CU.currency||0)-p;
  CU.inventory=[...(CU.inventory||[]), it.id];
  try{ await DB.setUser(CU.name,{currency:CU.currency, inventory:CU.inventory}); }catch(e){ console.warn(e); }
  buildTopbar(getSession()); renderShop();
}
async function equipItem(it){
  if(!CU || isGuest() || !ownsItem(it.id)) return;
  const key = it.type==='badge' ? 'equippedBadge' : 'equippedBanner';
  CU[key] = (CU[key]===it.id) ? '' : it.id;   // reclic = déséquiper
  try{ await DB.setUser(CU.name,{[key]:CU[key]}); }catch(e){ console.warn(e); }
  renderShop();
}
function renderShop(){
  const root=$('#tab-boutique'); root.innerHTML='';
  root.append(h('h2',{class:'sec'},'Boutique'));
  if(isGuest() || !CU){
    root.append(h('div',{class:'locked-note'},'La boutique est réservée aux comptes élèves.'));
    return;
  }
  root.append(h('p',{class:'note'},'Solde : <b>'+(CU.currency||0)+' '+CURRENCY_NAME+'</b> — tes points de la semaine deviennent des '+CURRENCY_NAME+' chaque lundi.'));

  const wk=isoWeekId(new Date());
  const {perm, rotating}=shopForWeek(wk, 4);

  const section=(title, items, note)=>{
    root.append(h('h3',{}, title));
    if(note) root.append(h('p',{class:'note'}, note));
    const grid=h('div',{class:'shop-grid'});
    items.forEach(it=>{
      const p=priceOf(it), owned=ownsItem(it.id);
      const eqKey = it.type==='badge' ? 'equippedBadge' : 'equippedBanner';
      const equipped = CU[eqKey]===it.id;
      const card=h('div',{class:'shop-card'+(equipped?' equipped':'')});
      card.innerHTML=
        '<div class="shop-preview">'+itemChipHtml(it)+'</div>'+
        '<div class="shop-name">'+it.name+'</div>'+
        '<div class="shop-rarity" style="color:'+(RARITY[it.rarity]||{}).color+'">'+(RARITY[it.rarity]||{}).label+'</div>'+
        '<div class="shop-desc">'+(it.desc||'')+'</div>';
      const btn=h('button',{class:'btn '+(owned?(equipped?'btn-ghost':'btn-primary'):'btn-primary')},
                  owned ? (equipped?'Retirer':'Équiper') : (p+' '+CURRENCY_NAME));
      if(!owned && (CU.currency||0)<p) btn.classList.add('btn-ghost');
      btn.onclick=()=> owned ? equipItem(it) : buyItem(it);
      card.append(btn);
      grid.append(card);
    });
    root.append(grid);
  };

  section('Cette semaine ('+wk+')', rotating, 'Rotation hebdomadaire — ces articles changent chaque lundi.');
  section('Toujours disponibles', perm);
}
/* ---------- avatar (photo de profil par URL) ---------- */
function safeAvatarUrl(u){
  const s=(u&&u.avatar)||'';
  return /^https:\/\/\S+$/i.test(s) ? s : '';
}
function avatarHtml(u, size){
  size=size||22;
  const url=safeAvatarUrl(u);
  const initial=(u&&u.name?u.name.trim()[0]:'?').toUpperCase();
  if(url) return '<img class="avatar" style="width:'+size+'px;height:'+size+'px" src="'+url.replace(/"/g,'&quot;')+'" alt="" onerror="this.style.display=\'none\'">';
  return '<span class="avatar avatar-ph" style="width:'+size+'px;height:'+size+'px;font-size:'+Math.round(size*0.45)+'px">'+initial+'</span>';
}

/* =====================================================================
   INVENTAIRE
   ===================================================================== */
function renderInventory(){
  const root=$('#tab-inventaire'); root.innerHTML='';
  root.append(h('h2',{class:'sec'},'Inventaire'));
  if(isGuest() || !CU){ root.append(h('div',{class:'locked-note'},'L\'inventaire est réservé aux comptes élèves.')); return; }
  const owned=(CU.inventory||[]).map(itemById).filter(Boolean);
  const tot=SHOP_ITEMS.length;
  root.append(h('p',{class:'note'},'Tu possèdes <b>'+owned.length+'</b> article(s) sur '+tot+'. Solde : <b>'+(CU.currency||0)+' '+CURRENCY_NAME+'</b>'));
  if(owned.length===0){ root.append(h('div',{class:'locked-note'},'Ton inventaire est vide. Va faire un tour à la Boutique !')); return; }

  // aperçu du rendu actuel
  const bn=CU.equippedBanner?itemById(CU.equippedBanner):null;
  const bd=CU.equippedBadge?itemById(CU.equippedBadge):null;
  const prev=h('div',{class:'profile-card'});
  prev.style.background=bn?bannerCss(bn):'var(--surface)';
  prev.innerHTML='<div class="profile-head">'+avatarHtml(CU,52)+'<div><div class="profile-name">'+CU.name+
    (bd?' <span class="shop-badge sm" style="border-color:'+(RARITY[bd.rarity]||{}).color+';color:'+(RARITY[bd.rarity]||{}).color+'">'+bd.name+'</span>':'')+
    '</div><div class="profile-sub">Aperçu de ton profil</div></div></div>';
  root.append(prev);

  const section=(title,type)=>{
    const items=owned.filter(i=>i.type===type);
    root.append(h('h3',{},title+' ('+items.length+')'));
    if(!items.length){ root.append(h('p',{class:'note'},'Aucun pour l\'instant.')); return; }
    const grid=h('div',{class:'shop-grid'});
    items.forEach(it=>{
      const eqKey=it.type==='badge'?'equippedBadge':'equippedBanner';
      const equipped=CU[eqKey]===it.id;
      const card=h('div',{class:'shop-card'+(equipped?' equipped':'')});
      card.innerHTML='<div class="shop-preview">'+itemChipHtml(it)+'</div>'+
        '<div class="shop-name">'+it.name+'</div>'+
        '<div class="shop-rarity" style="color:'+(RARITY[it.rarity]||{}).color+'">'+(RARITY[it.rarity]||{}).label+'</div>';
      const btn=h('button',{class:'btn '+(equipped?'btn-ghost':'btn-primary')}, equipped?'Retirer':'Équiper');
      btn.onclick=async()=>{ await equipItem(it); renderInventory(); };
      card.append(btn); grid.append(card);
    });
    root.append(grid);
  };
  section('Badges','badge');
  section('Bannières','banner');
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
  // photo de profil (URL)
  if(!isGuest() && CU){
    const ac=h('div',{class:'set-card'});
    ac.append(h('h3',{},'Photo de profil'));
    ac.append(h('p',{class:'note'},'Colle un lien direct vers une image (https://…). Elle n\'est pas hébergée par le site.'));
    const prev=h('div',{style:'margin:8px 0'}); prev.innerHTML=avatarHtml(CU,64);
    const inp=h('input',{type:'url',placeholder:'https://exemple.com/mon-image.png'});
    inp.value=(CU.avatar||'');
    const msg=h('div',{class:'error'});
    const row=h('div',{class:'row2'});
    const save=h('button',{class:'btn btn-primary'},'Enregistrer');
    const clr=h('button',{class:'btn btn-ghost'},'Retirer');
    save.onclick=async()=>{
      const v=(inp.value||'').trim();
      msg.className='error';
      if(v && !/^https:\/\/\S+$/i.test(v)){ msg.textContent='Le lien doit commencer par https://'; return; }
      CU.avatar=v;
      try{ await DB.setUser(CU.name,{avatar:v}); }catch(e){}
      msg.className='ok-msg'; msg.textContent='Photo mise à jour ✓';
      prev.innerHTML=avatarHtml(CU,64);
    };
    clr.onclick=async()=>{ inp.value=''; CU.avatar=''; try{ await DB.setUser(CU.name,{avatar:''}); }catch(e){} prev.innerHTML=avatarHtml(CU,64); msg.className='ok-msg'; msg.textContent='Photo retirée ✓'; };
    row.append(save,clr);
    ac.append(prev,inp,row,msg);
    root.append(ac);
  }

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

  // conversion forcée points -> $MPI
  const cC=h('div',{class:'adm-card'});
  cC.append(h('h3',{},'Convertir les points en '+CURRENCY_NAME));
  cC.append(h('p',{class:'note'},'Transforme les points de la semaine en '+CURRENCY_NAME+' (1 pour 1) et remet les points à zéro. Utile pour forcer la clôture d\'une semaine sans attendre le lundi.'));
  const selC=h('select',{});
  selC.append(h('option',{value:'__all__'},'— Tout le monde —'));
  STUDENTS.forEach(n=>selC.append(h('option',{value:n},n)));
  const mC=h('div',{class:'ok-msg'});
  const bC=h('button',{class:'btn btn-primary'},'Convertir'); bC.style.marginTop='10px';
  // Un stamp différent de la semaine courante est requis par les règles Firestore
  async function convertOne(u){
    const gained=u.totalPoints||0;
    if(gained<=0) return 0;
    // On garde un repère de semaine PROPRE : la conversion reste strictement hebdo ensuite.
    await DB.setUser(u.name,{ currency:(u.currency||0)+gained, totalPoints:0, weekStamp:isoWeekId(new Date()) });
    if(CU && CU.name===u.name){ CU.currency=(CU.currency||0)+gained; CU.totalPoints=0; CU.weekStamp=isoWeekId(new Date()); }
    return gained;
  }
  bC.onclick=async()=>{
    const who=selC.value;
    const label = who==='__all__' ? 'TOUS les comptes' : who;
    if(!confirm('Convertir les points en '+CURRENCY_NAME+' pour '+label+' ?')) return;
    bC.disabled=true; mC.textContent='Conversion en cours…';
    try{
      let total=0, n=0;
      if(who==='__all__'){
        for(const u of await DB.listUsers()){ const g=await convertOne(u); if(g>0){ total+=g; n++; } }
        mC.textContent=n+' compte(s) converti(s), '+total+' '+CURRENCY_NAME+' distribués ✓';
      } else {
        const u=await DB.getUser(who);
        if(!u){ mC.textContent='Compte introuvable.'; }
        else { const g=await convertOne(u); mC.textContent = g>0 ? (who+' : +'+g+' '+CURRENCY_NAME+' ✓') : (who+' n\'avait aucun point à convertir.'); }
      }
      buildTopbar(getSession());
    }catch(e){ mC.textContent='Erreur pendant la conversion.'; console.warn(e); }
    bC.disabled=false;
  };
  cC.append(h('label',{class:'field'},'Cible'),selC,bC,mC); root.append(cC);

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

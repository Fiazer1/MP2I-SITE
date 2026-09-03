/* =====================================================================
   DONNÉES — élèves, curriculum, cours, questions
   ===================================================================== */

/* --- Élèves (depuis Noms.txt) --- */
const STUDENTS = [
  "Ilias","Zineb","Lucas","Antonin","Cali","BOI. Enzo","Augustin",
  "Yassine","Roman","Charles","Amaury","Hugo","Juan","Théa","Jules","Robin",
  "Louis","Nathan","Félix","Maxence","Alrick","Noémi","Asma","Rémi",
  "Jean","Gael","Ayo","Elouan","BAT. Enzo","BEN. Adam","Ahmed","Alexis","Gabriel"
];

/* --- Curriculum : chapitres (d'après les PDF) + semaines --- */
const CURRICULUM = {
  "Algèbre": [
    {num:"1",  title:"Logique et ensembles"},
    {num:"2",  title:"Applications"},
    {num:"3",  title:"Complexes"},
    {num:"4",  title:"Complexes 2"},
    {num:"5",  title:"Relations binaires"},
    {num:"6",  title:"Calculs algébriques"},
    {num:"7A", title:"Loi de composition interne"},
    {num:"7B", title:"Groupe"},
    {num:"7C", title:"Anneau, corps"},
    {num:"8",  title:"Arithmétique"},
    {num:"9",  title:"Polynômes"},
    {num:"10", title:"Arithmétique dans K[X]"},
    {num:"11", title:"Fractions rationnelles"},
    {num:"12A",title:"Espace vectoriel"},
    {num:"12B",title:"Espace vectoriel (suite)"},
    {num:"13", title:"Espace vectoriel de dimension finie"},
    {num:"14", title:"Forme linéaire"},
    {num:"15", title:"Matrices"},
    {num:"16", title:"Matrices 2"},
    {num:"17", title:"Systèmes linéaires"}
  ],
  "Analyse": [
    {num:"1A", title:"Nombres réels"},
    {num:"1B", title:"Trigonométrie"},
    {num:"2",  title:"Fonctions numériques"},
    {num:"3",  title:"Dérivation"},
    {num:"4A", title:"Logarithmes"},
    {num:"4B", title:"Exponentielles"},
    {num:"4C", title:"Puissances"},
    {num:"4D", title:"Exercices"},
    {num:"5",  title:"Fonctions circulaires et réciproques"},
    {num:"6",  title:"Fonctions hyperboliques"},
    {num:"7",  title:"Fonctions à valeurs complexes"},
    {num:"8",  title:"Primitives"},
    {num:"9",  title:"Équations différentielles 1"},
    {num:"10", title:"Équations différentielles 2"},
    {num:"11", title:"Nombres réels 2"},
    {num:"12", title:"Suites"},
    {num:"13", title:"Suites récurrentes"},
    {num:"14", title:"Limites, continuité"},
    {num:"15", title:"Fonctions continues (propriétés globales)"},
    {num:"16A",title:"Dérivabilité"},
    {num:"16B",title:"Convexité"},
    {num:"17", title:"Développements limités"},
    {num:"18", title:"Relations de comparaison"},
    {num:"19", title:"Intégrale d'une fonction continue par morceaux"}
  ]
};

const WEEKS = Array.from({length:30}, (_,i)=>i+1); // 1..30

/* --- Modules de cours ---
   Chaque module est rattaché à (matière, chapitre, semaine).
   Vue "par chapitre" : groupé par matière/chapitre.
   Vue "par semaine"  : groupé par semaine. Même contenu, tri différent. --- */

/* --- Conteneurs remplis par les fichiers data/wXX.js (un par semaine) --- */
const COURSE_MODULES = [];
const QUESTIONS = [];
const TEMPLATES = [];

/* --- Helpers partagés pour les questions à valeurs aléatoires --- */
function rint(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function num(v){ return '$'+v+'$'; }
function pad4(correct, distractors){
  const vals=[correct];
  for(const d of distractors){ if(!vals.includes(d)) vals.push(d); if(vals.length===4) break; }
  let k=1; while(vals.length<4){ const c=correct+k; if(!vals.includes(c)) vals.push(c); k++; }
  return { o: vals.map(num), c:0 };
}


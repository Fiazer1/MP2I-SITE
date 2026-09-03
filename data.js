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
const COURSE_MODULES = [
 {
  matiere:"Analyse", chap:"19", chapTitle:"Intégrale d'une fonction continue par morceaux", week:30,
  sections:[
   {title:"Rappels de construction", html:`
    <h3>0. Rappels</h3>
    <p><b>En escalier :</b> constante sur chaque $]x_i;x_{i+1}[$, $\\int_a^b f=\\sum c_i(x_{i+1}-x_i)$ (indépendant de la subdivision).</p>
    <p><b>Continue par morceaux (cpm) :</b> continue sur chaque $]x_i;x_{i+1}[$ avec limites <b>finies</b> aux bornes.</p>
    <div class="card"><b>Structure :</b> $\\forall f\\in\\mathcal C_m,\\ \\exists g$ continue, $\\exists e$ escalier, $f=g+e$.<br>
    <b>Approximation :</b> $\\forall\\varepsilon>0,\\ \\exists\\varphi,\\psi$ escalier, $\\varphi\\le f\\le\\psi$ et $\\psi-\\varphi\\le\\varepsilon$.</div>
    <p><b>Définition :</b> $\\int_a^b f:=\\sup_{g\\le f}\\int g=\\inf_{h\\ge f}\\int h$.</p>
    <div class="formula">$\\displaystyle S_n=\\frac{b-a}{n}\\sum_{i=0}^{n-1} f\\!\\left(a+i\\tfrac{b-a}{n}\\right)\\xrightarrow[n\\to\\infty]{}\\int_a^b f$</div>
    <p class="warn">⚠️ Réflexe : $\\displaystyle\\frac1n\\sum_{k=0}^{n-1}f\\!\\left(\\tfrac kn\\right)\\to\\int_0^1 f$.</p>`},
   {title:"Propriétés de l'intégrale", html:`
    <h3>IV. Propriétés</h3>
    <div class="formula">$\\displaystyle\\int_a^b f=\\int_a^c f+\\int_c^b f,\\qquad \\int_b^a f=-\\int_a^b f$ (Chasles)</div>
    <p>Linéarité : $f\\mapsto\\int_a^b f$ est une <b>forme linéaire</b>. Ordre : $f\\le g\\Rightarrow\\int f\\le\\int g$, et $\\left|\\int_a^b f\\right|\\le\\int_a^b|f|$.</p>
    <div class="demo"><span class="tag">🎯 Question de cours</span>
    <b>$f$ continue $\\ge0$ : $\\int_a^b f=0\\iff f=0$.</b> Preuve par contraposée : si $f(x_0)>0$, $f\\ge\\tfrac{f(x_0)}2$ sur un segment de longueur $>0$, donc $\\int_a^b f>0$.</div>
    <div class="formula">$\\displaystyle\\left|\\int_a^b fg\\right|\\le\\sqrt{\\int_a^b f^2}\\,\\sqrt{\\int_a^b g^2}$ (Cauchy-Schwarz)</div>
    <div class="demo"><span class="tag">🎯 Démo Schwarz</span>
    $P(\\lambda)=\\int(f+\\lambda g)^2\\ge0\\ \\forall\\lambda$ : trinôme positif $\\Rightarrow$ discriminant $\\le0$, d'où $(\\int fg)^2\\le\\int f^2\\int g^2$.</div>
    <p>Valeur moyenne : $\\mu=\\dfrac1{b-a}\\int_a^b f\\in[m;M]$. Majoration : $\\left|\\int f\\right|\\le\\|f\\|_\\infty(b-a)$.</p>
    <div class="demo"><span class="tag">🎯 Formule de la moyenne</span>
    Si $f$ <i>continue</i> : $\\exists c,\\ \\int_a^b f=f(c)(b-a)$ (bornes atteintes + TVI).</div>`},
   {title:"Primitives & intégrales", html:`
    <h3>V. Primitives</h3>
    <div class="card"><b>Théorème fondamental :</b> $f$ continue, $F(x)=\\int_{x_0}^x f$ est $\\mathcal C^1$ et $F'=f$.</div>
    <div class="demo"><span class="tag">🎯 Démo $F'=f$</span>
    $\\frac{F(x+h)-F(x)}h-f(x)=\\frac1h\\int_x^{x+h}(f(t)-f(x))dt$, majoré par $\\varepsilon$ via la continuité de $f$ en $x$.</div>
    <p>Composée : $G(x)=\\int_{x_0}^{u(x)}f\\Rightarrow G'=(f\\circ u)u'$. Toute fonction <b>continue</b> admet des primitives.</p>
    <div class="formula">$\\displaystyle\\int_a^b f=F(b)-F(a)\\quad(F'=f)$</div>`},
   {title:"Intégrale complexe", html:`
    <h3>VI. Fonction complexe</h3>
    <p>$f$ cpm $\\iff \\mathrm{Re}(f),\\mathrm{Im}(f)$ cpm. $\\int_a^b f=\\int u+i\\int v$.</p>
    <ul class="tight"><li>$\\overline{\\int f}=\\int\\bar f$, forme linéaire, Chasles, $\\left|\\int f\\right|\\le\\int|f|$.</li></ul>
    <p class="warn">⚠️ La croissance / l'ordre disparaît : $\\mathbb C$ n'est pas ordonné.</p>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"15", chapTitle:"Matrices", week:30,
  sections:[
   {title:"Changements de base", html:`
    <h3>Changements de base</h3>
    <p>Vecteur : $X=P\\,X'$, $P=P_{\\beta,\\beta'}$ ; colonne $j$ = coords de $e'_j$ dans $\\beta$. $\\ P_{\\beta,\\beta'}=(P_{\\beta',\\beta})^{-1}$.</p>
    <div class="formula">App. linéaire : $M=Q\\,M'\\,P^{-1}$ — Endomorphisme : $M'=P^{-1}MP$</div>
    <div class="card"><b>Équivalentes :</b> $A=Q^{-1}BP$. <b>Semblables :</b> $A=P^{-1}BP\\Rightarrow\\mathrm{tr}(A)=\\mathrm{tr}(B)$.</div>`},
   {title:"Rang d'une matrice", html:`
    <h3>IV. Rang</h3>
    <ul class="tight">
     <li>$\\mathrm{rg}(M)\\le\\min(n,p)$ ; $M$ de rang $r\\sim J_r$.</li>
     <li>$M\\sim M'\\iff\\mathrm{rg}(M)=\\mathrm{rg}(M')$.</li>
     <li>$\\mathrm{rg}(M)=\\mathrm{rg}(\\,{}^tM)$ ; $M\\in GL_n\\iff\\mathrm{rg}(M)=n$.</li>
    </ul>
    <div class="demo"><span class="tag">🎯 Démo transposée</span>
    $M=Q^{-1}J_rP\\Rightarrow{}^tM={}^tP\\,{}^tJ_r\\,{}^tQ^{-1}$, or $\\,{}^tJ_r=J_r$ et les transposées sont inversibles : $\\,{}^tM\\sim J_r$, même rang.</div>
    <p>Opérations <b>colonnes</b> = $\\times$ à droite ; <b>lignes</b> = $\\times$ à gauche. Pivot de Gauss → rang = nb de pivots.</p>
    <p>Produit : $A\\in GL_n\\Rightarrow\\mathrm{rg}(AB)=\\mathrm{rg}(B)$ ; en général $\\mathrm{rg}(AB)\\le\\min(\\mathrm{rg}A,\\mathrm{rg}B)$.</p>
    <div class="demo"><span class="tag">🎯 Conséquence</span> $AB=I_n\\Rightarrow A\\in GL_n$ et $A^{-1}=B$.</div>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"16", chapTitle:"Équations et systèmes linéaires", week:30,
  sections:[
   {title:"Équations & systèmes", html:`
    <h3>Ch.16 — Systèmes</h3>
    <p>$(E):f(\\vec x)=\\vec b\\iff MX=B$. Homogène $MX=0\\iff X\\in\\ker f$.</p>
    <div class="demo"><span class="tag">🎯 Structure</span>
    Si $\\vec b\\in\\mathrm{Im}f$ et $\\vec x_p$ solution : $S_{(E)}=\\vec x_p+\\ker f$ (sous-espace affine). Générale = particulière + homogène.</div>
    <table>
     <tr><th>Cas</th><th>$f$</th><th>Solutions</th></tr>
     <tr><td>$r=n=p$</td><td>bijective (Cramer)</td><td>unique</td></tr>
     <tr><td>$r=n&lt;p$</td><td>surjective</td><td>s.e.a. dim $p-n$</td></tr>
     <tr><td>$r=p&lt;n$</td><td>injective</td><td>$\\varnothing$ ou singleton</td></tr>
     <tr><td>$r&lt;p,r&lt;n$</td><td>ni inj. ni surj.</td><td>$\\varnothing$ ou s.e.a. dim $p-r$</td></tr>
    </table>`}
  ]
 }
];

/* --- Banque de questions ---
   chap : rattachement (pour stats par chapitre)
   mode : "qcm" (cours/réflexe) ou "application" (calcul sur feuille, valeurs réelles)
   c    : index de la bonne réponse --- */
const QUESTIONS = [
 // ---------- ANALYSE 19 — QCM ----------
 {chap:"Analyse 19",mode:"qcm",t:"Relation de Chasles : $\\int_a^b f=$ ?",o:["$\\int_a^c f+\\int_c^b f$","$\\int_a^c f-\\int_c^b f$","$\\int_c^a f+\\int_b^c f$","$\\tfrac12(\\int_a^c f+\\int_c^b f)$"],c:0,e:"On découpe le segment : $\\int_a^b=\\int_a^c+\\int_c^b$."},
 {chap:"Analyse 19",mode:"qcm",t:"Que vaut $\\int_b^a f$ par convention ?",o:["$0$","$\\int_a^b f$","$-\\int_a^b f$","$|\\int_a^b f|$"],c:2,e:"Inverser les bornes change le signe."},
 {chap:"Analyse 19",mode:"qcm",t:"$f$ continue et positive, $\\int_a^b f=0$. Alors :",o:["$f$ constante","$f=0$","$f\\le0$","rien à conclure"],c:1,e:"Continuité + positivité + intégrale nulle $\\Rightarrow f\\equiv0$."},
 {chap:"Analyse 19",mode:"qcm",t:"Inégalité de Cauchy-Schwarz :",o:["$|\\int fg|\\le\\int f^2\\int g^2$","$|\\int fg|\\le\\sqrt{\\int f^2}\\sqrt{\\int g^2}$","$\\int fg\\le\\int f\\int g$","$|\\int fg|\\ge\\sqrt{\\int f^2\\int g^2}$"],c:1,e:"Attention aux racines : $|\\int fg|\\le\\sqrt{\\int f^2}\\sqrt{\\int g^2}$."},
 {chap:"Analyse 19",mode:"qcm",t:"Comment démontre-t-on Cauchy-Schwarz ?",o:["Récurrence","Signe de $\\lambda\\mapsto\\int(f+\\lambda g)^2$ + discriminant","Par l'absurde + TVI","Intégration par parties"],c:1,e:"Trinôme positif $\\Rightarrow$ discriminant $\\le0$."},
 {chap:"Analyse 19",mode:"qcm",t:"Valeur moyenne de $f$ sur $[a;b]$ :",o:["$\\frac1{b-a}\\int_a^b f$","$\\int_a^b f$","$\\frac{f(a)+f(b)}2$","$(b-a)\\int_a^b f$"],c:0,e:"$\\mu=\\frac1{b-a}\\int_a^b f\\in[m;M]$."},
 {chap:"Analyse 19",mode:"qcm",t:"La formule de la moyenne ($\\exists c$) exige $f$ :",o:["en escalier","cpm","continue","positive"],c:2,e:"Continuité nécessaire pour le TVI."},
 {chap:"Analyse 19",mode:"qcm",t:"$f$ continue, $F(x)=\\int_{x_0}^x f$. Alors :",o:["$F$ continue non dérivable","$F$ est $\\mathcal C^1$ et $F'=f$","$F'=f'$","$F$ en escalier"],c:1,e:"Théorème fondamental."},
 {chap:"Analyse 19",mode:"qcm",t:"Dérivée de $G(x)=\\int_{x_0}^{u(x)}f$ ($u\\in\\mathcal C^1$) :",o:["$f(u(x))$","$f'(u(x))u'(x)$","$(f\\circ u)\\cdot u'$","$f\\circ u$"],c:2,e:"Composition : $G'=(f\\circ u)u'$."},
 {chap:"Analyse 19",mode:"qcm",t:"Majoration de $|\\int_a^b f|$ ($a\\le b$) :",o:["$\\le\\|f\\|_\\infty(b-a)$","$\\le\\|f\\|_\\infty$","$\\le(b-a)$","$\\ge\\int_a^b|f|$"],c:0,e:"$|\\int f|\\le\\int|f|\\le\\|f\\|_\\infty(b-a)$."},
 {chap:"Analyse 19",mode:"qcm",t:"Pour $f:[a;b]\\to\\mathbb C$, $\\int_a^b f=$ ?",o:["$\\int\\mathrm{Re}f+\\int\\mathrm{Im}f$","$\\int\\mathrm{Re}f+i\\int\\mathrm{Im}f$","$|\\int f|$","$\\int\\bar f$"],c:1,e:"Séparation réelle/imaginaire avec $i$."},
 {chap:"Analyse 19",mode:"qcm",t:"En intégrale complexe, quelle propriété disparaît ?",o:["linéarité","Chasles","croissance / ordre","$|\\int f|\\le\\int|f|$"],c:2,e:"$\\mathbb C$ n'est pas ordonné."},
 {chap:"Analyse 19",mode:"qcm",t:"$\\frac{b-a}n\\sum_{i=0}^{n-1}f(a+i\\frac{b-a}n)\\to$ ?",o:["$f(b)-f(a)$","$\\int_a^b f$","$\\mu$","$0$"],c:1,e:"Somme de Riemann."},
 {chap:"Analyse 19",mode:"qcm",t:"$\\frac1n\\sum_{k=0}^{n-1}f(\\frac kn)\\to$ ?",o:["$\\int_0^1 f$","$\\int_0^n f$","$f(1)$","$\\frac{f(0)+f(1)}2$"],c:0,e:"Riemann sur $[0;1]$, pas $1/n$."},
 {chap:"Analyse 19",mode:"qcm",t:"Théorème fondamental : $\\int_a^b f=$ (avec $F'=f$)",o:["$F(a)-F(b)$","$F(b)-F(a)$","$f(b)-f(a)$","$F'(b)-F'(a)$"],c:1,e:"$[F]_a^b=F(b)-F(a)$."},
 {chap:"Analyse 19",mode:"qcm",t:"Quelles fonctions admettent toujours des primitives sur un intervalle ?",o:["bornées","continues","cpm","monotones"],c:1,e:"Continuité $\\Rightarrow$ primitives."},
 // ---------- ANALYSE 19 — APPLICATION ----------
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^2 3x^2\\,dx$.",o:["$8$","$6$","$12$","$4$"],c:0,e:"$[x^3]_0^2=8$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^1 (2x+1)\\,dx$.",o:["$2$","$1$","$3$","$\\tfrac32$"],c:0,e:"$[x^2+x]_0^1=2$."},
 {chap:"Analyse 19",mode:"application",t:"Valeur moyenne de $f(x)=x$ sur $[0;4]$ ?",o:["$2$","$4$","$8$","$1$"],c:0,e:"$\\frac14\\int_0^4 x=\\frac14\\cdot8=2$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_1^e \\frac1x\\,dx$.",o:["$1$","$e$","$e-1$","$0$"],c:0,e:"$[\\ln x]_1^e=1$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^\\pi \\sin x\\,dx$.",o:["$2$","$0$","$1$","$\\pi$"],c:0,e:"$[-\\cos x]_0^\\pi=2$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^1 x^2\\,dx$.",o:["$\\tfrac13$","$\\tfrac12$","$1$","$\\tfrac23$"],c:0,e:"$[\\frac{x^3}3]_0^1=\\frac13$."},
 // ---------- ALGÈBRE 15 — QCM ----------
 {chap:"Algèbre 15",mode:"qcm",t:"Pour $M\\in\\mathcal M_{n,p}(K)$, toujours :",o:["$\\mathrm{rg}(M)=n$","$\\mathrm{rg}(M)\\le\\min(n,p)$","$\\mathrm{rg}(M)=p$","$\\mathrm{rg}(M)\\ge\\max(n,p)$"],c:1,e:"Borné par le plus petit."},
 {chap:"Algèbre 15",mode:"qcm",t:"$M,M'$ équivalentes ssi :",o:["$M=M'$","$\\mathrm{tr}(M)=\\mathrm{tr}(M')$","$\\mathrm{rg}(M)=\\mathrm{rg}(M')$","semblables"],c:2,e:"Même rang (toutes $\\sim J_r$)."},
 {chap:"Algèbre 15",mode:"qcm",t:"$\\mathrm{rg}(\\,{}^tM)=$ ?",o:["$\\mathrm{rg}(M)$","$n-\\mathrm{rg}(M)$","$p$","$\\mathrm{tr}(M)$"],c:0,e:"Rang lignes = rang colonnes."},
 {chap:"Algèbre 15",mode:"qcm",t:"Idée de preuve de $\\mathrm{rg}(M)=\\mathrm{rg}(\\,{}^tM)$ :",o:["$M\\sim J_r$, on transpose, $\\,{}^tJ_r=J_r$","récurrence","déterminant","pivot seul"],c:0,e:"$M=Q^{-1}J_rP\\Rightarrow{}^tM\\sim J_r$."},
 {chap:"Algèbre 15",mode:"qcm",t:"Opération sur les <b>colonnes</b> = multiplier :",o:["à gauche par inversible","à droite par inversible","par un scalaire","par la transposée"],c:1,e:"Colonnes ↔ à droite ; lignes ↔ à gauche."},
 {chap:"Algèbre 15",mode:"qcm",t:"Si $A\\in GL_n$, $\\mathrm{rg}(AB)=$ ?",o:["$n$","$\\mathrm{rg}(B)$","$\\mathrm{rg}(A)$","$\\min$"],c:1,e:"Multiplier par inversible conserve le rang."},
 {chap:"Algèbre 15",mode:"qcm",t:"Cas général : $\\mathrm{rg}(AB)$",o:["$=\\mathrm{rg}A+\\mathrm{rg}B$","$\\ge\\max$","$\\le\\min(\\mathrm{rg}A,\\mathrm{rg}B)$","$=\\mathrm{rg}A\\cdot\\mathrm{rg}B$"],c:2,e:"$\\mathrm{Im}(AB)\\subset\\mathrm{Im}(A)$ + transposée."},
 {chap:"Algèbre 15",mode:"qcm",t:"$A,B\\in\\mathcal M_n$, $AB=I_n$ :",o:["semblables","$A\\in GL_n$, $A^{-1}=B$","$\\mathrm{tr}A=n$","il faut aussi $BA=I_n$"],c:1,e:"En dim finie carrée, $AB=I_n$ suffit."},
 {chap:"Algèbre 15",mode:"qcm",t:"Matrices semblables : $A=$ ?",o:["$Q^{-1}BP$","$P^{-1}BP$","$\\,{}^tB$","$PBQ$"],c:1,e:"$A=P^{-1}BP$."},
 {chap:"Algèbre 15",mode:"qcm",t:"Invariant de similitude :",o:["rang seul","trace","1ère colonne","dim de départ"],c:1,e:"$A\\sim B\\Rightarrow\\mathrm{tr}A=\\mathrm{tr}B$."},
 {chap:"Algèbre 15",mode:"qcm",t:"Endomorphisme, changement de base :",o:["$M'=P^{-1}MP$","$M'=PMP^{-1}$","$M'=QMP^{-1}$","$M'=\\,{}^tM$"],c:0,e:"Même base départ/arrivée."},
 {chap:"Algèbre 15",mode:"qcm",t:"$P_{\\beta,\\beta'}=$ ?",o:["$P_{\\beta',\\beta}$","$(P_{\\beta',\\beta})^{-1}$","$\\,{}^tP_{\\beta',\\beta}$","$I_n$"],c:1,e:"Matrices de passage inverses l'une de l'autre."},
 {chap:"Algèbre 15",mode:"qcm",t:"$M\\in\\mathcal M_n(K)$ inversible ssi :",o:["$\\mathrm{tr}M\\ne0$","$\\mathrm{rg}(M)=n$","$M=\\,{}^tM$","$\\mathrm{rg}(M)&lt;n$"],c:1,e:"Rang plein."},
 // ---------- ALGÈBRE 15 — APPLICATION ----------
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ ?",o:["$1$","$2$","$0$","$3$"],c:0,e:"Lignes proportionnelles : rang 1."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&0&0\\\\0&1&0\\\\0&0&0\\end{pmatrix}$ ?",o:["$2$","$3$","$1$","$0$"],c:0,e:"Deux pivots non nuls."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ ?",o:["$2$","$1$","$0$","indéfini"],c:0,e:"Triangulaire à diagonale non nulle : rang 2."},
 // ---------- ALGÈBRE 16 — QCM ----------
 {chap:"Algèbre 16",mode:"qcm",t:"$\\vec b\\in\\mathrm{Im}f$, $\\vec x_p$ solution. Ensemble des solutions :",o:["$\\ker f$","$\\{\\vec x_p\\}$","$\\vec x_p+\\ker f$","$\\mathrm{Im}f$"],c:2,e:"Sous-espace affine : particulière + homogène."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système de Cramer ($r=n=p$) :",o:["aucune solution","une seule","une infinité","dépend de $\\vec b$"],c:1,e:"$f$ bijective : solution unique."},
 {chap:"Algèbre 16",mode:"qcm",t:"Si $r=n&lt;p$ :",o:["vide","singleton","s.e.a. dim $p-n$","tout l'espace"],c:2,e:"$f$ surjective, $\\dim=p-n$."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système homogène $MX=0$ équivaut à :",o:["$X\\in\\mathrm{Im}f$","$X\\in\\ker f$","$X=0$","$\\det M=0$"],c:1,e:"Solutions = noyau."},
 // ---------- ALGÈBRE 16 — APPLICATION ----------
 {chap:"Algèbre 16",mode:"application",t:"Solution de $\\begin{cases}x+y=2\\\\x-y=0\\end{cases}$ ?",o:["$(1,1)$","$(2,0)$","$(0,2)$","$(1,-1)$"],c:0,e:"$x=y=1$."},
 {chap:"Algèbre 16",mode:"application",t:"Solution de $\\begin{cases}2x=4\\\\x+y=3\\end{cases}$ ?",o:["$(2,1)$","$(1,2)$","$(2,3)$","$(4,-1)$"],c:0,e:"$x=2$ puis $y=1$."}
];

/* --- Questions à VALEURS ALÉATOIRES (mode application) ---
   Chaque template génère un énoncé différent à chaque tirage : impossible de
   répondre par cœur, il faut vraiment calculer. gen() renvoie {t,o,c,e}
   (bonne réponse en position 0 ; l'affichage est mélangé par l'app). --- */
function rint(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function num(v){ return '$'+v+'$'; }
function pad4(correct, distractors){
  const vals=[correct];
  for(const d of distractors){ if(!vals.includes(d)) vals.push(d); if(vals.length===4) break; }
  let k=1; while(vals.length<4){ const c=correct+k; if(!vals.includes(c)) vals.push(c); k++; }
  return { o: vals.map(num), c:0 };
}

const TEMPLATES = [
  { chap:"Analyse 19", mode:"application", gen(){
      const b=[2,4][rint(0,1)], a=rint(1,5), r=a*b*b/2;
      const {o,c}=pad4(r,[a*b*b, a*b, r+a]);
      return { t:"Calcule $\\displaystyle\\int_0^"+b+" "+a+"x\\,dx$.", o, c,
               e:"$\\left["+a+"\\tfrac{x^2}{2}\\right]_0^"+b+"="+r+"$." }; } },

  { chap:"Analyse 19", mode:"application", gen(){
      const a=3*rint(1,3), b=rint(1,4), r=a*b*b*b/3;
      const {o,c}=pad4(r,[a*b*b*b, a*b*b, r+b]);
      return { t:"Calcule $\\displaystyle\\int_0^"+b+" "+a+"x^2\\,dx$.", o, c,
               e:"$\\left["+a+"\\tfrac{x^3}{3}\\right]_0^"+b+"="+r+"$." }; } },

  { chap:"Analyse 19", mode:"application", gen(){
      const a=rint(1,5), b=rint(1,6), r=a*b;
      const {o,c}=pad4(r,[a+b, r+a, b]);
      return { t:"Calcule $\\displaystyle\\int_0^"+b+" "+a+"\\,dx$.", o, c,
               e:"$["+a+"x]_0^"+b+"="+r+"$." }; } },

  { chap:"Analyse 19", mode:"application", gen(){
      const b=[2,4][rint(0,1)], a=rint(1,5), r=a*b/2;
      const {o,c}=pad4(r,[a*b, r+a, a]);
      return { t:"Valeur moyenne de $f(x)="+a+"x$ sur $[0;"+b+"]$ ?", o, c,
               e:"$\\frac1{"+b+"}\\int_0^"+b+" "+a+"x\\,dx=\\frac1{"+b+"}\\cdot"+(a*b*b/2)+"="+r+"$." }; } },

  { chap:"Algèbre 15", mode:"application", gen(){
      const a=rint(1,3), b=rint(1,3), k=rint(2,3);
      return { t:"Rang de $\\begin{pmatrix}"+a+"&"+b+"\\\\"+(k*a)+"&"+(k*b)+"\\end{pmatrix}$ ?",
               o:["$1$","$2$","$0$","indéfini"], c:0,
               e:"$L_2="+k+"L_1$ : lignes proportionnelles, donc rang $1$." }; } },

  { chap:"Algèbre 16", mode:"application", gen(){
      const s=2*rint(2,4), d=2*rint(1, (s/2)-1), x=(s+d)/2, y=(s-d)/2;
      return { t:"Résous $\\begin{cases}x+y="+s+"\\\\x-y="+d+"\\end{cases}$",
               o:["$("+x+",\\,"+y+")$","$("+y+",\\,"+x+")$","$("+s+",\\,"+d+")$","$("+x+",\\,"+(-y)+")$"], c:0,
               e:"$x=\\frac{"+s+"+"+d+"}{2}="+x+",\\quad y=\\frac{"+s+"-"+d+"}{2}="+y+"$." }; } }
];

/* =====================================================================
   AJOUT S30 — banque étoffée (révision khôlle)
   Strictement : Analyse 19 (Intégrale), Algèbre 15 (Matrices), Algèbre 16 (Systèmes)
   ===================================================================== */
QUESTIONS.push(
 // ---------- ANALYSE 19 — QCM ----------
 {chap:"Analyse 19",mode:"qcm",t:"Une fonction en escalier sur $[a;b]$ est :",o:["jamais cpm","toujours continue par morceaux","cpm seulement si continue","non bornée"],c:1,e:"Une fonction en escalier est un cas particulier de fonction cpm."},
 {chap:"Analyse 19",mode:"qcm",t:"Une fonction continue par morceaux sur $[a;b]$ est :",o:["non bornée","bornée","forcément continue","forcément positive"],c:1,e:"Limites finies + nombre fini de morceaux $\\Rightarrow$ bornée."},
 {chap:"Analyse 19",mode:"qcm",t:"L'intégrale d'une fonction en escalier dépend-elle de la subdivision adaptée ?",o:["oui","non","seulement si $a&lt;b$","seulement si $f\\ge0$"],c:1,e:"Elle est indépendante de la subdivision adaptée choisie."},
 {chap:"Analyse 19",mode:"qcm",t:"$\\int_a^b(\\lambda f+\\mu g)=$ ?",o:["$\\lambda\\int f+\\mu\\int g$","$\\lambda\\mu\\int f\\int g$","$\\int f+\\int g$","$\\lambda\\int f\\cdot\\mu\\int g$"],c:0,e:"Linéarité de l'intégrale."},
 {chap:"Analyse 19",mode:"qcm",t:"Si $f\\le g$ sur $[a;b]$ ($a\\le b$), alors :",o:["$\\int f\\ge\\int g$","$\\int f\\le\\int g$","$\\int f=\\int g$","aucun lien"],c:1,e:"Croissance (positivité) de l'intégrale."},
 {chap:"Analyse 19",mode:"qcm",t:"$f$ <b>cpm</b> et $\\ge0$ avec $\\int_a^b f=0$. Alors :",o:["$f=0$ partout","$f$ peut être $\\ne0$ en un nombre fini de points","$f&lt;0$","impossible"],c:1,e:"Sans continuité, $f$ peut être non nulle en des points isolés."},
 {chap:"Analyse 19",mode:"qcm",t:"$\\left|\\int_a^b f\\right|$ ($a\\le b$) est majoré par :",o:["$\\int_a^b|f|$","$|f(b)|$","$\\int_a^b f$","$0$"],c:0,e:"Inégalité triangulaire intégrale."},
 {chap:"Analyse 19",mode:"qcm",t:"La valeur moyenne $\\mu$ de $f$ sur $[a;b]$ vérifie :",o:["$\\mu\\ge M$","$m\\le\\mu\\le M$","$\\mu=0$","$\\mu\\le m$"],c:1,e:"$\\mu$ est comprise entre le min $m$ et le max $M$."},
 {chap:"Analyse 19",mode:"qcm",t:"$\\frac{b-a}n\\sum_{k=1}^{n}f\\!\\left(a+k\\frac{b-a}n\\right)\\to$ ?",o:["$f(b)$","$\\int_a^b f$","$\\mu$","$0$"],c:1,e:"Somme de Riemann (points à droite)."},
 {chap:"Analyse 19",mode:"qcm",t:"Deux primitives d'une même fonction continue diffèrent :",o:["d'une fonction affine","d'une constante","d'un facteur","de rien"],c:1,e:"$F_1-F_2$ a une dérivée nulle sur un intervalle."},
 {chap:"Analyse 19",mode:"qcm",t:"$f$ de classe $\\mathcal C^1$ : $\\int_a^b f'(t)\\,dt=$ ?",o:["$f(b)-f(a)$","$f'(b)-f'(a)$","$f(a)-f(b)$","$0$"],c:0,e:"Théorème fondamental appliqué à $f'$."},
 {chap:"Analyse 19",mode:"qcm",t:"Pour $f$ à valeurs complexes : $\\overline{\\int_a^b f}=$ ?",o:["$\\int_a^b \\bar f$","$\\left|\\int f\\right|$","$-\\int f$","$\\int\\mathrm{Re}f$"],c:0,e:"La conjugaison passe sous l'intégrale."},
 {chap:"Analyse 19",mode:"qcm",t:"Une fonction cpm sur $[a;b]$ a un nombre de discontinuités :",o:["infini","fini","nul","non dénombrable"],c:1,e:"Par définition : nombre fini de morceaux."},
 {chap:"Analyse 19",mode:"qcm",t:"$\\int_a^a f=$ ?",o:["$f(a)$","$0$","$1$","indéfini"],c:1,e:"Bornes égales : intégrale nulle."},
 {chap:"Analyse 19",mode:"qcm",t:"L'application $f\\mapsto\\int_a^b f$ sur $\\mathcal C([a;b])$ est :",o:["bilinéaire","une forme linéaire","quadratique","non linéaire"],c:1,e:"Linéaire et à valeurs scalaires : forme linéaire."},
 {chap:"Analyse 19",mode:"qcm",t:"Formule de la moyenne ($f$ continue) : $\\exists c$ tel que $\\int_a^b f=f(c)(b-a)$ avec $c\\in$",o:["$\\{a,b\\}$","$[a;b]$","$\\mathbb R$","$\\varnothing$"],c:1,e:"$c$ existe dans $[a;b]$ par le TVI."},

 // ---------- ANALYSE 19 — APPLICATION ----------
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^3 x\\,dx$.",o:["$\\tfrac92$","$3$","$9$","$6$"],c:0,e:"$[\\tfrac{x^2}2]_0^3=\\tfrac92$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^2 (x^2+1)\\,dx$.",o:["$\\tfrac{14}3$","$\\tfrac83$","$\\tfrac{10}3$","$4$"],c:0,e:"$[\\tfrac{x^3}3+x]_0^2=\\tfrac83+2=\\tfrac{14}3$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_1^2 \\frac1{x^2}\\,dx$.",o:["$\\tfrac12$","$1$","$-\\tfrac12$","$\\tfrac32$"],c:0,e:"$[-\\tfrac1x]_1^2=-\\tfrac12+1=\\tfrac12$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^{\\pi/2} \\cos x\\,dx$.",o:["$1$","$0$","$\\tfrac\\pi2$","$2$"],c:0,e:"$[\\sin x]_0^{\\pi/2}=1$."},
 {chap:"Analyse 19",mode:"application",t:"Valeur moyenne de $f(x)=x^2$ sur $[0;3]$ ?",o:["$3$","$9$","$6$","$1$"],c:0,e:"$\\tfrac13\\int_0^3 x^2=\\tfrac13\\cdot9=3$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_{-1}^1 x^3\\,dx$.",o:["$0$","$\\tfrac12$","$2$","$1$"],c:0,e:"Fonction impaire sur intervalle symétrique : $0$."},
 {chap:"Analyse 19",mode:"application",t:"Calcule $\\displaystyle\\int_0^1 e^x\\,dx$.",o:["$e-1$","$e$","$1$","$e+1$"],c:0,e:"$[e^x]_0^1=e-1$."},

 // ---------- ALGÈBRE 15 — QCM ----------
 {chap:"Algèbre 15",mode:"qcm",t:"Les colonnes de $P_{\\beta,\\beta'}$ sont :",o:["les coords des vecteurs de $\\beta'$ dans $\\beta$","les coords de $\\beta$ dans $\\beta'$","les valeurs propres","nulles"],c:0,e:"Colonne $j$ = coordonnées de $e'_j$ dans l'ancienne base."},
 {chap:"Algèbre 15",mode:"qcm",t:"Changement de base pour un vecteur : $X=$ ?",o:["$P X'$","$P^{-1}X'$","$\\,{}^tP X'$","$X'$"],c:0,e:"$X$ (anciennes coords) $=P X'$ (nouvelles)."},
 {chap:"Algèbre 15",mode:"qcm",t:"Application linéaire, nouvelles bases : $M'=$ ?",o:["$Q^{-1}MP$","$P^{-1}MP$","$QMP$","$\\,{}^tM$"],c:0,e:"$M'=Q^{-1}MP$ (bases différentes au départ/arrivée)."},
 {chap:"Algèbre 15",mode:"qcm",t:"Deux matrices semblables sont :",o:["jamais équivalentes","toujours équivalentes","de rangs différents","de traces différentes"],c:1,e:"Semblables $\\Rightarrow$ équivalentes (réciproque fausse)."},
 {chap:"Algèbre 15",mode:"qcm",t:"$\\mathrm{rg}(M)$ est égal à :",o:["$\\dim\\ker f$","$\\dim\\mathrm{Im}f$","$\\mathrm{tr}(M)$","$n$"],c:1,e:"Rang = dimension de l'image (espace des colonnes)."},
 {chap:"Algèbre 15",mode:"qcm",t:"$M\\sim J_r$ où $r=$ ?",o:["$\\mathrm{tr}(M)$","$\\mathrm{rg}(M)$","$n$","$\\det M$"],c:1,e:"Toute matrice de rang $r$ est équivalente à $J_r$."},
 {chap:"Algèbre 15",mode:"qcm",t:"Une opération sur les <b>lignes</b> = multiplier :",o:["à droite par inversible","à gauche par inversible","par un scalaire","par $\\,{}^tM$"],c:1,e:"Lignes $\\leftrightarrow$ multiplication à gauche."},
 {chap:"Algèbre 15",mode:"qcm",t:"Si $A\\in GL_n$, alors $\\mathrm{rg}(BA)=$ ?",o:["$n$","$\\mathrm{rg}(B)$","$\\mathrm{rg}(A)$","$0$"],c:1,e:"Multiplier par une inversible conserve le rang."},
 {chap:"Algèbre 15",mode:"qcm",t:"$\\mathrm{tr}(AB)=$ ?",o:["$\\mathrm{tr}(A)\\mathrm{tr}(B)$","$\\mathrm{tr}(BA)$","$0$","$\\mathrm{tr}(A)+\\mathrm{tr}(B)$"],c:1,e:"Propriété fondamentale : $\\mathrm{tr}(AB)=\\mathrm{tr}(BA)$."},
 {chap:"Algèbre 15",mode:"qcm",t:"$\\mathrm{tr}(P^{-1}MP)=$ ?",o:["$\\mathrm{tr}(M)$","$\\mathrm{tr}(P)$","$0$","$\\det M$"],c:0,e:"La trace est un invariant de similitude."},
 {chap:"Algèbre 15",mode:"qcm",t:"Le rang d'une matrice échelonnée est :",o:["le nombre de colonnes","le nombre de lignes (pivots) non nulles","la trace","$n$"],c:1,e:"Rang = nombre de pivots."},
 {chap:"Algèbre 15",mode:"qcm",t:"Le seul invariant complet de l'<b>équivalence</b> est :",o:["la trace","le rang","le déterminant","la première colonne"],c:1,e:"$M\\sim M'\\iff\\mathrm{rg}=\\mathrm{rg}'$."},

 // ---------- ALGÈBRE 15 — APPLICATION ----------
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}2&4\\\\1&2\\end{pmatrix}$ ?",o:["$1$","$2$","$0$","$3$"],c:0,e:"$L_1=2L_2$ : rang $1$."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&2&3\\\\0&1&4\\\\0&0&5\\end{pmatrix}$ ?",o:["$3$","$2$","$1$","$0$"],c:0,e:"Triangulaire, diagonale non nulle : rang $3$."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ ?",o:["$2$","$1$","$0$","$3$"],c:0,e:"$\\det=4-6=-2\\ne0$ : rang $2$."},
 {chap:"Algèbre 15",mode:"application",t:"Trace de $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ ?",o:["$5$","$4$","$10$","$-2$"],c:0,e:"$\\mathrm{tr}=1+4=5$."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$ ?",o:["$0$","$1$","$2$","indéfini"],c:0,e:"Matrice nulle : rang $0$."},

 // ---------- ALGÈBRE 16 — QCM ----------
 {chap:"Algèbre 16",mode:"qcm",t:"$MX=B$ admet une solution si et seulement si :",o:["$B\\in\\ker f$","$B\\in\\mathrm{Im}f$","$\\det M\\ne0$","$B=0$"],c:1,e:"Compatible $\\iff B$ est dans l'image."},
 {chap:"Algèbre 16",mode:"qcm",t:"Un système homogène $MX=0$ admet :",o:["jamais de solution","toujours la solution nulle","toujours une infinité","une seule non nulle"],c:1,e:"$X=0$ est toujours solution."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système homogène à $n$ inconnues, rang $r$ : dimension des solutions =",o:["$r$","$n-r$","$n$","$0$"],c:1,e:"Théorème du rang : $\\dim\\ker f=n-r$."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système carré $MX=B$ avec $M$ inversible : solution =",o:["$M^{-1}B$","$MB$","$\\,{}^tM B$","aucune"],c:0,e:"Unique : $X=M^{-1}B$."},
 {chap:"Algèbre 16",mode:"qcm",t:"L'ensemble des solutions de $MX=B$ (non vide) est :",o:["$\\ker f$","un sous-espace affine de direction $\\ker f$","$\\mathrm{Im}f$","un singleton toujours"],c:1,e:"$x_p+\\ker f$."},
 {chap:"Algèbre 16",mode:"qcm",t:"Sur $\\mathbb R$, un système linéaire a :",o:["$0$, $1$ ou $2$ solutions","$0$, $1$ ou une infinité","toujours $1$","toujours une infinité"],c:1,e:"Jamais exactement deux solutions."},
 {chap:"Algèbre 16",mode:"qcm",t:"Le rang d'un système linéaire est :",o:["le nombre d'équations","le rang de la matrice $M$","le nombre d'inconnues","la trace"],c:1,e:"C'est $\\mathrm{rg}(M)$."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système surjectif ($r=n$) : pour tout $B$ il y a :",o:["aucune solution","au moins une solution","exactement une","une infinité toujours"],c:1,e:"Surjectif : tout $B$ est atteint."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système injectif ($r=p$) : la solution, si elle existe, est :",o:["multiple","unique","nulle","quelconque"],c:1,e:"Injectif : au plus une solution."},
 {chap:"Algèbre 16",mode:"qcm",t:"Si le système homogène associé a une solution non nulle, $MX=B$ a :",o:["toujours $1$ solution","$0$ ou une infinité","toujours $0$","exactement $2$"],c:1,e:"Le noyau non trivial $\\Rightarrow$ pas d'unicité."},

 // ---------- ALGÈBRE 16 — APPLICATION ----------
 {chap:"Algèbre 16",mode:"application",t:"Le système $\\begin{cases}x+y=3\\\\2x+2y=6\\end{cases}$ a :",o:["une infinité de solutions","une seule","aucune","exactement deux"],c:0,e:"Équations proportionnelles : droite de solutions."},
 {chap:"Algèbre 16",mode:"application",t:"Le système $\\begin{cases}x+y=1\\\\x+y=2\\end{cases}$ a :",o:["aucune solution","une seule","une infinité","deux"],c:0,e:"Contradiction : incompatible."},
 {chap:"Algèbre 16",mode:"application",t:"Solution de $\\begin{cases}2x+y=5\\\\x-y=1\\end{cases}$ ?",o:["$(2,1)$","$(1,2)$","$(3,-1)$","$(2,2)$"],c:0,e:"Somme : $3x=6\\Rightarrow x=2,\\ y=1$."},
 {chap:"Algèbre 16",mode:"application",t:"Dimension de l'espace des solutions de $x+y+z=0$ ?",o:["$2$","$1$","$3$","$0$"],c:0,e:"$3$ inconnues, rang $1$ : $\\dim=3-1=2$."}
);

TEMPLATES.push(
  { chap:"Analyse 19", mode:"application", gen(){
      const b=[3,5][rint(0,1)], a=rint(1,5), r=a*(b*b-1)/2;
      const {o,c}=pad4(r,[a*(b*b-1), a*b, r+a]);
      return { t:"Calcule $\\displaystyle\\int_1^"+b+" "+a+"x\\,dx$.", o, c,
               e:"$\\left["+a+"\\tfrac{x^2}{2}\\right]_1^"+b+"="+a+"\\cdot\\tfrac{"+(b*b)+"-1}{2}="+r+"$." }; } },

  { chap:"Analyse 19", mode:"application", gen(){
      const b=[2,4][rint(0,1)], a=rint(1,4), cc=rint(1,4), r=a*b*b/2 + cc*b;
      const {o,c}=pad4(r,[a*b*b+cc*b, a*b*b/2, r+cc]);
      return { t:"Calcule $\\displaystyle\\int_0^"+b+" ("+a+"x+"+cc+")\\,dx$.", o, c,
               e:"$\\left["+a+"\\tfrac{x^2}{2}+"+cc+"x\\right]_0^"+b+"="+(a*b*b/2)+"+"+(cc*b)+"="+r+"$." }; } },

  { chap:"Algèbre 15", mode:"application", gen(){
      let a,b,cc,d,rank;
      if(rint(0,1)===0){ a=rint(1,3); b=rint(1,3); const k=rint(2,3); cc=k*a; d=k*b; rank=1; }
      else { do{ a=rint(1,3); b=rint(0,3); cc=rint(0,3); d=rint(1,3); }while(a*d-b*cc===0); rank=2; }
      return { t:"Rang de $\\begin{pmatrix}"+a+"&"+b+"\\\\"+cc+"&"+d+"\\end{pmatrix}$ ?",
               o:["$1$","$2$","$0$","indéfini"], c: rank===1?0:1,
               e: rank===1 ? "Lignes proportionnelles : rang $1$."
                           : "$\\det="+a+"\\cdot"+d+"-"+b+"\\cdot"+cc+"="+(a*d-b*cc)+"\\ne0$ : rang $2$." }; } }
);

/* =====================================================================
   TAG SEMAINE — tout le contenu actuel relève de la khôlle S30.
   Pour une AUTRE semaine, ajoute « week: <n> » directement sur l'item
   concerné (question, template, ou section de cours) — le défaut ci-dessous
   ne s'applique qu'aux items non tagués.
   ===================================================================== */
QUESTIONS.forEach(q=>{ if(q.week==null) q.week=30; });
TEMPLATES.forEach(t=>{ if(t.week==null) t.week=30; });

/* =====================================================================
   BOUTIQUE — badges & bannières
   ---------------------------------------------------------------------
   type   : "badge" (pastille à côté du nom) ou "banner" (fond de ta ligne)
   rarity : commun | rare | epique | legendaire  (couleur + prix indicatif)
   perm   : true  -> toujours en boutique
            false -> en rotation, une partie seulement chaque semaine
   Pour ajouter un article : copie une ligne et change id/nom/prix.
   ===================================================================== */
const RARITY = {
  commun:     { label:'Commun',      price:1000,    color:'#9aa6c4' },
  rare:       { label:'Rare',        price:10000,   color:'#4fd6e8' },
  epique:     { label:'Épique',      price:50000,   color:'#b06bff' },
  legendaire: { label:'Légendaire',  price:100000,  color:'#ffcf6b' },
  mythique:   { label:'Mythique',    price:500000,  color:'#ff5c7a' },
  secret:     { label:'Secret',      price:1000000, color:'#7CFFB2' }
};

/* Motif répété (tapisserie) : un glyphe semé sur un fond.
   fill = couleur du glyphe (indispensable : sans elle le texte serait noir). */
function tile(glyph, bg, fill, size, opacity){
  size = size || 46; opacity = (opacity==null?0.5:opacity); fill = fill || '#ffffff';
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='"+size+"' height='"+size+"'>"
            + "<g fill='"+fill+"' fill-opacity='"+opacity+"' font-family='Georgia,serif'>"
            + "<text x='"+(size*0.10)+"' y='"+(size*0.42)+"' font-size='"+(size*0.40)+"'>"+glyph+"</text>"
            + "<text x='"+(size*0.58)+"' y='"+(size*0.92)+"' font-size='"+(size*0.40)+"'>"+glyph+"</text>"
            + "</g></svg>";
  // Guillemets SIMPLES dans url(...) : la valeur est réinjectée dans des attributs
  // style="..." — des guillemets doubles casseraient le HTML. Les apostrophes du SVG
  // sont donc encodées (%27).
  const data = encodeURIComponent(svg).replace(/'/g, "%27");
  return "url('data:image/svg+xml;utf8," + data + "') repeat, " + bg;
}

const SHOP_ITEMS = [
  // ---------- BADGES ----------
  {id:'b_canard',   type:'badge', name:'🦆 Canard',        rarity:'commun',     perm:true,  desc:"L'emblème de la MP2I."},
  {id:'b_integral', type:'badge', name:'∫ Intégral',       rarity:'commun',     perm:true,  desc:'Pour ceux qui ont tout le cours.'},
  {id:'b_pivot',    type:'badge', name:'Pivot',            rarity:'commun',     perm:true,  desc:'Gauss serait fier.'},
  {id:'b_kholleur', type:'badge', name:'Khôlleur',         rarity:'rare',       perm:true,  desc:'Survivant du tableau.'},
  {id:'b_sigma',    type:'badge', name:'Σ Sommateur',      rarity:'rare',       perm:true,  desc:'Riemann approuve.'},
  {id:'b_matrix',   type:'badge', name:'Matriciel',        rarity:'epique',     perm:true,  desc:'Rang plein, toujours.'},
  {id:'b_qed',      type:'badge', name:'∎ QED',            rarity:'legendaire', perm:true,  desc:'La démo est finie.'},
  {id:'b_lemme',    type:'badge', name:'Lemme vivant',     rarity:'rare',       perm:false, desc:'Toujours utile, jamais cité.'},
  {id:'b_epsilon',  type:'badge', name:'ε > 0',            rarity:'rare',       perm:false, desc:"Aussi petit qu'on veut."},
  {id:'b_cauchy',   type:'badge', name:'Cauchy',           rarity:'epique',     perm:false, desc:'Convergent, forcément.'},
  {id:'b_nuit',     type:'badge', name:'Nocturne',         rarity:'commun',     perm:false, desc:'Révise après minuit.'},
  {id:'b_vvk',      type:'badge', name:'Disciple de VVK',  rarity:'legendaire', perm:false, desc:'Très rare. Très mérité.'},
  {id:'b_bijection',type:'badge', name:'Bijection',        rarity:'mythique',   perm:false, desc:'Ni plus, ni moins.'},
  {id:'b_zeta',     type:'badge', name:'ζ(2)=π²/6',        rarity:'mythique',   perm:false, desc:'Bâle, 1734.'},
  {id:'b_axiome',   type:'badge', name:'Axiome',           rarity:'secret',     perm:false, desc:'Ne se démontre pas. (déblocage spécial)'},

  // ---------- BANNIÈRES (fond complet de ta ligne / de ton profil) ----------
  // tapisserie : 'tile:GLYPHE|COULEUR_DU_GLYPHE|FOND'
  {id:'n_violet', type:'banner', name:'Violet console', rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#3a2363,#5c2450)', desc:'Le thème maison.'},
  {id:'n_ocean',  type:'banner', name:'Océan',          rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#0d4a67,#0f6b7d)', desc:'Calme et clair.'},
  {id:'n_ardoise',type:'banner', name:'Ardoise',        rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#222a3b,#39435a)', desc:'Sobre et propre.'},
  {id:'n_brique', type:'banner', name:'Brique',         rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#5c2320,#7d3a2e)', desc:'Chaleureux.'},
  {id:'n_matrix', type:'banner', name:'Matrice verte',  rarity:'rare',    perm:true,
   css:'tile:01|#7CFFB2|linear-gradient(90deg,#05200f,#0b3a1c)', desc:'Suis le lapin blanc.'},
  {id:'n_sunset', type:'banner', name:'Coucher',        rarity:'rare',    perm:true,
   css:'linear-gradient(90deg,#8a3413,#c0446a)', desc:'Fin de DS.'},
  {id:'n_grid',   type:'banner', name:'Quadrillage',    rarity:'rare',    perm:true,
   css:'tile:+|#8fb3ff|linear-gradient(90deg,#141d33,#1e2b4d)', desc:'Papier millimétré.'},
  {id:'n_maths',  type:'banner', name:'Tapisserie ∫',   rarity:'epique',  perm:true,
   css:'tile:∫|#e0c9ff|linear-gradient(90deg,#241a44,#3b2a63)', desc:'Des intégrales partout.'},
  {id:'n_sigma',  type:'banner', name:'Tapisserie Σ',   rarity:'epique',  perm:true,
   css:'tile:Σ|#9ff0ff|linear-gradient(90deg,#0d2b3a,#154257)', desc:'Sommes de Riemann.'},
  {id:'n_gold',   type:'banner', name:'Or massif',      rarity:'legendaire', perm:true,
   css:'linear-gradient(90deg,#5c3a08,#c79229,#5c3a08)', desc:'Le luxe.'},
  {id:'n_duck',   type:'banner', name:'Canards',        rarity:'legendaire', perm:true,
   css:'tile:🦆|#ffffff|#0a0a0a', desc:'Une tapisserie de canards sur noir profond.'},
  // --- rotation ---
  {id:'n_sakura', type:'banner', name:'Sakura',         rarity:'rare',    perm:false,
   css:'tile:🌸|#ffffff|linear-gradient(90deg,#5c1a38,#8a2a4d)', desc:'Printemps.'},
  {id:'n_nuit',   type:'banner', name:'Nuit étoilée',   rarity:'epique',  perm:false,
   css:'tile:✦|#ffe9a8|linear-gradient(90deg,#0b1440,#251a5e)', desc:'Silence et concentration.'},
  {id:'n_neon',   type:'banner', name:'Néon',           rarity:'epique',  perm:false,
   css:'linear-gradient(90deg,#4a1f66,#116273)', desc:'Cyber.'},
  {id:'n_epsilon',type:'banner', name:'Tapisserie ε',   rarity:'epique',  perm:false,
   css:"tile:ε|#a8ffd8|linear-gradient(90deg,#0f2b22,#18453a)", desc:"Aussi petit qu'on veut."},
  {id:'n_pi',     type:'banner', name:'Tapisserie π',   rarity:'mythique', perm:false,
   css:'tile:π|#c8ffd0|linear-gradient(90deg,#13291b,#1f4a2c)', desc:'Irrationnel et transcendant.'},
  {id:'n_zeta',   type:'banner', name:'Tapisserie ζ',   rarity:'mythique', perm:false,
   css:'tile:ζ|#ffc9e6|linear-gradient(90deg,#3a1030,#5e1a4a)', desc:'Bâle, 1734.'},
  // --- SECRET : jamais en boutique, déblocage par quête / statistique ---
  {id:'n_duckgold',type:'banner',name:'Canard doré',    rarity:'secret',  perm:false,
   css:'tile:🦆|#ffffff|linear-gradient(90deg,#3a2402,#8a6510,#3a2402)', desc:'Le Graal. Coin-coin. (déblocage spécial)'},
  {id:'n_qed',    type:'banner', name:'∎ Manuscrit',    rarity:'secret',  perm:false,
   css:'tile:∎|#1a1208|linear-gradient(90deg,#d9c9a3,#efe3c8)', desc:'Parchemin de démonstration. (déblocage spécial)'}
];

// Résout la valeur CSS d'une bannière ("tile:EMOJI|fond" ou une valeur CSS directe)
function bannerCss(item){
  if(!item || !item.css) return 'transparent';
  if(item.css.indexOf('tile:')===0){
    const p=item.css.slice(5).split('|');      // glyphe | couleur | fond
    return tile(p[0], p[2], p[1]);
  }
  return item.css;
}

// Sélection déterministe des articles en rotation pour une semaine donnée.
// Même semaine = même boutique pour tout le monde ; change automatiquement chaque semaine.
function shopForWeek(weekId, nbRotating){
  nbRotating = nbRotating || 4;
  // Règles de disponibilité : "secret" ne s'achète jamais (déblocage par quête/stat),
  // "mythique" n'apparaît qu'en rotation, jamais dans la boutique permanente.
  const buyable = SHOP_ITEMS.filter(i=>i.rarity!=='secret');
  const perm = buyable.filter(i=>i.perm && i.rarity!=='mythique');
  const rot  = buyable.filter(i=>!i.perm);
  let seed=0; for(let i=0;i<weekId.length;i++) seed=(seed*31+weekId.charCodeAt(i))|0;
  seed=Math.abs(seed);
  const pool=rot.slice(), picked=[];
  for(let k=0;k<Math.min(nbRotating,pool.length);k++){
    seed=(seed*1103515245+12345)&0x7fffffff;
    picked.push(pool.splice(seed%pool.length,1)[0]);
  }
  return { perm, rotating:picked };
}


/* =====================================================================
   SEMAINE 1 — Analyse 1A (R), Analyse 1B (Trigonométrie),
                Algèbre 1 (Logique, ensembles), Algèbre 2 (Applications)
   D'après le cours de VVK (Lycée Thuillier).
   ===================================================================== */
COURSE_MODULES.push(
 {
  matiere:"Analyse", chap:"1A", chapTitle:"Nombres réels (1ère partie)", week:1,
  sections:[
   {title:"I. Structure de R", html:`
    <h3>1) Relation d'ordre</h3>
    <p>$\\le$ est <b>réflexive</b> ($\\forall x,\\ x\\le x$), <b>antisymétrique</b> ($x\\le y$ et $y\\le x\\Rightarrow x=y$), <b>transitive</b>. C'est donc une <b>relation d'ordre</b>, et elle est <b>totale</b> : $\\forall x,y\\in\\mathbb R,\\ x\\le y$ ou $y\\le x$.</p>
    <div class="card"><b>Compatibilités :</b> $a\\le b$ et $c\\le d\\Rightarrow a+c\\le b+d$. Sur $\\mathbb R_+$ : $a\\le b$ et $c\\le d\\Rightarrow ac\\le bd$.<br>
    <span class="warn">⚠️ Faux sur $\\mathbb R$ : si $c\\le 0$, $a\\le b\\Rightarrow ac\\ge bc$ (l'inégalité change de sens).</span></div>
    <h3>2) Majorants, minorants</h3>
    <p>$M$ majore $A$ ssi $\\forall a\\in A,\\ a\\le M$. $m$ minore $A$ ssi $\\forall a\\in A,\\ m\\le a$.</p>
    <h3>3) Plus grand, plus petit élément</h3>
    <div class="card">$M=\\max(A)$ ssi <b>$M\\in A$</b> et $\\forall a\\in A,\\ a\\le M$.<br>
    Le max, s'il existe, est <b>unique</b> : c'est à la fois un <b>élément</b> de $A$ et un <b>majorant</b> de $A$.</div>
    <p class="warn">⚠️ $A=[0;1[$ est majorée (par 1) mais n'a <b>pas</b> de plus grand élément : être majorée n'implique pas avoir un max.</p>`},
   {title:"Valeur absolue", html:`
    <h3>4) Valeur absolue</h3>
    <div class="formula">$|x|=\\max(x,-x)$</div>
    <ul class="tight">
     <li>$|x|\\ge0$ ; $|x|=|-x|$ ; $|x|=0\\iff x=0$</li>
     <li>$|xy|=|x||y|$</li>
     <li>$|x+y|\\le|x|+|y|$ &nbsp;<b>(inégalité triangulaire)</b></li>
     <li>$\\big||x|-|y|\\big|\\le|x-y|$ &nbsp;(seconde inégalité triangulaire)</li>
    </ul>
    <div class="formula">$\\max(x,y)=\\dfrac{x+y+|x-y|}{2}\\qquad \\min(x,y)=\\dfrac{x+y-|x-y|}{2}$</div>
    <p>Les propriétés « $|x|=0\\iff x=0$ », « $|xy|=|x||y|$ » et l'inégalité triangulaire caractérisent une <b>norme</b> sur $\\mathbb R$.</p>`},
   {title:"Partie entière", html:`
    <h3>5) Partie entière</h3>
    <div class="demo"><span class="tag">🎯 Propriété d'Archimède</span>
    $\\forall x\\in\\mathbb R,\\ x\\gt0\\Rightarrow\\exists n\\in\\mathbb N^*,\\ n\\gt x$.</div>
    <div class="card"><b>Proposition :</b> $\\forall x\\in\\mathbb R,\\ \\exists!\\,n\\in\\mathbb Z,\\ n\\le x\\lt n+1$. On pose $n=E(x)=\\lfloor x\\rfloor$.</div>
    <div class="formula">$E(x)=\\max\\{n\\in\\mathbb Z\\ /\\ n\\le x\\}\\qquad E(x)\\le x\\lt E(x)+1$</div>
    <p>$E$ est <b>croissante</b> sur $\\mathbb R$ et vérifie $E(x+n)=E(x)+n$ pour $n\\in\\mathbb Z$.</p>
    <p class="warn">⚠️ En général $E(x+y)\\ne E(x)+E(y)$ : la translation par un <b>entier</b> seulement passe.</p>`},
   {title:"II. Parties bornées, intervalles", html:`
    <h3>1) Segment</h3>
    <p>$[x;y]=\\{t\\in\\mathbb R/ x\\le t\\le y\\}$ si $x\\le y$ ; $[x;x]=\\{x\\}$ ; et $[x;y]=[y;x]$ si $x\\ge y$.</p>
    <h3>2) Partie bornée</h3>
    <p>$A$ est <b>bornée</b> ssi $A$ est majorée <b>et</b> minorée, ce qui équivaut à $A\\subset[m;M]$.</p>
    <div class="card"><b>Proposition 1 :</b> $A\\ne\\varnothing$ est bornée ssi $\\{|x-y|\\ /\\ (x,y)\\in A^2\\}$ est majorée.<br>
    <b>Proposition 2 :</b> toute <b>intersection</b> de parties bornées est bornée ; toute réunion <b>finie</b> de parties bornées est bornée.</div>
    <p class="warn">⚠️ « Réunion <b>finie</b> » : une réunion infinie de bornées peut ne pas l'être (ex. $\\bigcup_n[0;n]=\\mathbb R_+$).</p>
    <h3>3) Intervalle</h3>
    <div class="demo"><span class="tag">🎯 Définition à connaître</span>
    $I$ est un <b>intervalle</b> ssi $\\forall(x,y)\\in I^2,\\ [x;y]\\subset I$ (partie convexe de $\\mathbb R$).</div>
    <p>Types : $\\varnothing$, $\\mathbb R$, singletons, $[a;b]$, $]a;b]$, $[a;b[$, $]a;b[$, $]a;+\\infty[$, $[a;+\\infty[$, $]-\\infty;a[$, $]-\\infty;a]$.</p>
    <p><b>Proposition :</b> l'intersection de deux intervalles est un intervalle. <span class="warn">⚠️ Pas la réunion : $[0;1]\\cup[2;3]$ n'en est pas un.</span></p>`}
  ]
 },
 {
  matiere:"Analyse", chap:"1B", chapTitle:"Trigonométrie", week:1,
  sections:[
   {title:"I. Cercle trigonométrique", html:`
    <p>Cercle $\\mathcal C$ de centre $O$ et de rayon 1 : $x^2+y^2=1$. Tout point $M(x,y)$ de $\\mathcal C$ s'écrit $x=\\cos a$, $y=\\sin a$.</p>
    <div class="formula">$\\begin{cases}\\cos a=\\cos b\\\\ \\sin a=\\sin b\\end{cases}\\iff \\exists k\\in\\mathbb Z,\\ a=b+2k\\pi\\quad(a\\equiv b\\ [2\\pi])$</div>
    <h3>Formules de symétrie</h3>
    <table>
     <tr><th></th><th>$\\cos$</th><th>$\\sin$</th></tr>
     <tr><td>$-x$</td><td>$\\cos x$</td><td>$-\\sin x$</td></tr>
     <tr><td>$\\pi+x$</td><td>$-\\cos x$</td><td>$-\\sin x$</td></tr>
     <tr><td>$\\pi-x$</td><td>$-\\cos x$</td><td>$\\sin x$</td></tr>
     <tr><td>$\\frac\\pi2-x$</td><td>$\\sin x$</td><td>$\\cos x$</td></tr>
     <tr><td>$\\frac\\pi2+x$</td><td>$-\\sin x$</td><td>$\\cos x$</td></tr>
    </table>
    <h3>Angles usuels</h3>
    <table>
     <tr><th>$x$</th><th>$0$</th><th>$\\frac\\pi6$</th><th>$\\frac\\pi4$</th><th>$\\frac\\pi3$</th><th>$\\frac\\pi2$</th><th>$\\pi$</th></tr>
     <tr><td>$\\cos x$</td><td>$1$</td><td>$\\frac{\\sqrt3}2$</td><td>$\\frac{\\sqrt2}2$</td><td>$\\frac12$</td><td>$0$</td><td>$-1$</td></tr>
     <tr><td>$\\sin x$</td><td>$0$</td><td>$\\frac12$</td><td>$\\frac{\\sqrt2}2$</td><td>$\\frac{\\sqrt3}2$</td><td>$1$</td><td>$0$</td></tr>
     <tr><td>$\\tan x$</td><td>$0$</td><td>$\\frac{\\sqrt3}3$</td><td>$1$</td><td>$\\sqrt3$</td><td>—</td><td>$0$</td></tr>
    </table>`},
   {title:"II. Formules de trigonométrie", html:`
    <h3>1) Addition</h3>
    <div class="formula">$\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b\\qquad \\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b$</div>
    <div class="formula">$\\cos(a-b)=\\cos a\\cos b+\\sin a\\sin b\\qquad \\sin(a-b)=\\sin a\\cos b-\\cos a\\sin b$</div>
    <p class="warn">⚠️ Le signe s'<b>inverse</b> pour le cosinus (moins pour $a+b$), pas pour le sinus.</p>
    <h3>2) Duplication</h3>
    <div class="formula">$\\cos(2a)=\\cos^2a-\\sin^2a=2\\cos^2a-1=1-2\\sin^2a\\qquad \\sin(2a)=2\\sin a\\cos a$</div>
    <h3>3) Produit en somme</h3>
    <div class="formula">$\\cos a\\cos b=\\tfrac12[\\cos(a+b)+\\cos(a-b)]\\qquad \\sin a\\sin b=\\tfrac12[\\cos(a-b)-\\cos(a+b)]$</div>
    <div class="formula">$\\sin a\\cos b=\\tfrac12[\\sin(a+b)+\\sin(a-b)]$</div>
    <p>En particulier (linéarisation) : $\\cos^2a=\\tfrac12[1+\\cos(2a)]$ et $\\sin^2a=\\tfrac12[1-\\cos(2a)]$.</p>
    <h3>4) Somme en produit</h3>
    <div class="formula">$\\cos p+\\cos q=2\\cos\\frac{p+q}2\\cos\\frac{p-q}2\\qquad \\cos p-\\cos q=-2\\sin\\frac{p+q}2\\sin\\frac{p-q}2$</div>
    <div class="formula">$\\sin p+\\sin q=2\\sin\\frac{p+q}2\\cos\\frac{p-q}2\\qquad \\sin p-\\sin q=2\\sin\\frac{p-q}2\\cos\\frac{p+q}2$</div>`},
   {title:"III. Fonctions circulaires", html:`
    <div class="demo"><span class="tag">🎯 Inégalités à connaître</span>
    Pour $x\\in[0;\\frac\\pi2]$ : $0\\le\\sin x\\le x$ et $0\\le 1-\\cos x\\le\\dfrac{x^2}2$.<br>
    Sur $\\mathbb R$ : $0\\le|\\sin x|\\le|x|$.</div>
    <div class="formula">$\\lim_{x\\to0}\\dfrac{\\sin x}{x}=1\\qquad \\lim_{x\\to0}\\dfrac{1-\\cos x}{x^2}=\\dfrac12$</div>
    <p>$\\cos$ et $\\sin$ sont $2\\pi$-périodiques ; $\\cos$ est <b>paire</b>, $\\sin$ est <b>impaire</b>.</p>
    <p>$\\sin'=\\cos$ et $\\cos'=-\\sin$. $\\sin$ est strictement croissante sur $[-\\frac\\pi2;\\frac\\pi2]$, $\\cos$ strictement décroissante sur $[0;\\pi]$.</p>
    <h3>4) Fonction tangente</h3>
    <div class="formula">$\\tan x=\\dfrac{\\sin x}{\\cos x},\\qquad D_{\\tan}=\\mathbb R\\setminus\\left\\{\\tfrac\\pi2+k\\pi,\\ k\\in\\mathbb Z\\right\\}$</div>
    <p>$\\tan$ est <b>$\\pi$-périodique</b> (attention : pas $2\\pi$) et <b>impaire</b>. $\\tan(\\pi-x)=-\\tan x$ et $\\tan(\\frac\\pi2-x)=\\frac1{\\tan x}$.</p>
    <div class="formula">$\\tan'(x)=\\dfrac1{\\cos^2x}=1+\\tan^2x$</div>
    <p>Strictement croissante sur $]-\\frac\\pi2;\\frac\\pi2[$, avec $\\lim_{x\\to\\frac\\pi2^-}\\tan x=+\\infty$ et $\\lim_{x\\to-\\frac\\pi2^+}\\tan x=-\\infty$.</p>
    <div class="formula">$\\tan(a+b)=\\dfrac{\\tan a+\\tan b}{1-\\tan a\\tan b}\\qquad \\tan(2a)=\\dfrac{2\\tan a}{1-\\tan^2a}$</div>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"1", chapTitle:"Logique, ensembles", week:1,
  sections:[
   {title:"I. Éléments de logique", html:`
    <h3>Connecteurs</h3>
    <p>Négation $\\neg P$, conjonction $P\\wedge Q$, disjonction $P\\vee Q$, implication $P\\Rightarrow Q$, équivalence $P\\iff Q$.</p>
    <div class="card"><b>Lois de De Morgan :</b> $\\neg(P\\wedge Q)=\\neg P\\vee\\neg Q$ et $\\neg(P\\vee Q)=\\neg P\\wedge\\neg Q$.</div>
    <div class="formula">$(P\\Rightarrow Q)\\iff(\\neg Q\\Rightarrow\\neg P)$ &nbsp;(contraposée)&nbsp;&nbsp; $\\neg(P\\Rightarrow Q)= P\\wedge\\neg Q$</div>
    <p class="warn">⚠️ Ne pas confondre <b>contraposée</b> (équivalente) et <b>réciproque</b> $Q\\Rightarrow P$ (pas équivalente).</p>
    <h3>Modes de raisonnement</h3>
    <ul class="tight">
     <li>direct, par <b>contraposée</b>, par l'<b>absurde</b>, par <b>disjonction de cas</b>, par <b>analyse-synthèse</b>, contre-exemple</li>
    </ul>
    <h3>Récurrence</h3>
    <div class="demo"><span class="tag">🎯 Les trois formes</span>
    <b>Simple :</b> $P(n_0)$ et $P(n)\\Rightarrow P(n+1)$.<br>
    <b>Double :</b> $P(n_0),P(n_0+1)$ et $[P(n)\\wedge P(n+1)]\\Rightarrow P(n+2)$.<br>
    <b>Forte :</b> $P(n_0)$ et $[\\forall k\\le n,\\ P(k)]\\Rightarrow P(n+1)$.</div>`},
   {title:"II. Ensembles", html:`
    <h3>Quantificateurs</h3>
    <div class="formula">$\\neg(\\forall x,\\ P(x))=\\exists x,\\ \\neg P(x)\\qquad \\neg(\\exists x,\\ P(x))=\\forall x,\\ \\neg P(x)$</div>
    <p class="warn">⚠️ L'ordre des quantificateurs compte : $\\forall x\\exists y$ et $\\exists y\\forall x$ n'ont pas le même sens.</p>
    <h3>Inclusion, opérations</h3>
    <p>$A\\subset B$ ssi $\\forall x,\\ x\\in A\\Rightarrow x\\in B$. Pour montrer $A=B$ : double inclusion.</p>
    <ul class="tight">
     <li>$A\\cap B$, $A\\cup B$, $A\\setminus B=\\{x\\in A/ x\\notin B\\}$, complémentaire $\\overline A=E\\setminus A$</li>
     <li><b>Différence symétrique :</b> $A\\Delta B=(A\\setminus B)\\cup(B\\setminus A)=(A\\cup B)\\setminus(A\\cap B)$</li>
    </ul>
    <div class="card"><b>De Morgan (ensembles) :</b> $\\overline{A\\cup B}=\\overline A\\cap\\overline B$ et $\\overline{A\\cap B}=\\overline A\\cup\\overline B$.<br>
    <b>Distributivité :</b> $A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C)$ et $A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)$.</div>
    <h3>Fonction caractéristique</h3>
    <div class="formula">$\\mathbb 1_A(x)=\\begin{cases}1&\\text{si }x\\in A\\\\ 0&\\text{sinon}\\end{cases}$</div>
    <div class="demo"><span class="tag">🎯 Formules clés</span>
    $\\mathbb 1_{A\\cap B}=\\mathbb 1_A\\mathbb 1_B$ ; &nbsp; $\\mathbb 1_{\\overline A}=1-\\mathbb 1_A$ ; &nbsp;
    $\\mathbb 1_{A\\cup B}=\\mathbb 1_A+\\mathbb 1_B-\\mathbb 1_A\\mathbb 1_B$.<br>
    Très pratique : $A=B\\iff\\mathbb 1_A=\\mathbb 1_B$, ce qui transforme une égalité d'ensembles en calcul.</div>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"2", chapTitle:"Applications", week:1,
  sections:[
   {title:"I. Définitions", html:`
    <p><b>Produit cartésien :</b> $E\\times F=\\{(x,y)/x\\in E,\\ y\\in F\\}$.</p>
    <p>Une <b>relation</b> entre $E$ et $F$ est définie par un graphe $\\Gamma\\subset E\\times F$ : $x\\mathcal R y\\iff(x,y)\\in\\Gamma$.</p>
    <div class="card"><b>Application :</b> relation telle que tout élément de $E$ soit en relation avec <b>un et un seul</b> élément de $F$ :
    $\\forall x\\in E,\\ \\exists!\\,y\\in F,\\ y=f(x)$. On note $\\mathcal F(E,F)$ ou $F^E$.</div>`},
   {title:"II. Injectivité, surjectivité, bijectivité", html:`
    <div class="card"><b>Injective</b> : tout élément de $F$ a <b>au plus un</b> antécédent.
    <div class="formula">$\\forall x,x'\\in E,\\ f(x)=f(x')\\Rightarrow x=x'$</div>
    Négation : $\\exists x\\ne x'$ avec $f(x)=f(x')$.</div>
    <div class="card"><b>Surjective</b> : tout élément de $F$ a <b>au moins un</b> antécédent.
    <div class="formula">$\\forall y\\in F,\\ \\exists x\\in E,\\ f(x)=y$</div>
    Négation : $\\exists y\\in F,\\ \\forall x\\in E,\\ f(x)\\ne y$.</div>
    <div class="card"><b>Bijective</b> : tout élément de $F$ a <b>exactement un</b> antécédent, i.e. injective <b>et</b> surjective :
    $\\forall y\\in F,\\ \\exists!\\,x\\in E,\\ f(x)=y$. Alors $f^{-1}(y)=x\\iff f(x)=y$.</div>
    <h3>Composition</h3>
    <p>$(g\\circ f)(x)=g(f(x))$, associative : $h\\circ(g\\circ f)=(h\\circ g)\\circ f$.</p>
    <div class="demo"><span class="tag">🎯 Propriétés (a) à (e)</span>
    (a) $f,g$ injectives $\\Rightarrow g\\circ f$ injective.<br>
    (b) $f,g$ surjectives $\\Rightarrow g\\circ f$ surjective.<br>
    (c) $f,g$ bijectives $\\Rightarrow g\\circ f$ bijective et $(g\\circ f)^{-1}=f^{-1}\\circ g^{-1}$ <span class="warn">(ordre inversé !)</span><br>
    (d) $g\\circ f$ injective $\\Rightarrow$ <b>$f$</b> injective (celle de <b>droite</b>).<br>
    (e) $g\\circ f$ surjective $\\Rightarrow$ <b>$g$</b> surjective (celle de <b>gauche</b>).</div>
    <h3>6) Théorème de caractérisation</h3>
    <div class="demo"><span class="tag">🎯 Question de cours</span>
    $f$ est bijective <b>ssi</b> il existe $g:F\\to E$ telle que $g\\circ f=\\mathrm{id}_E$ et $f\\circ g=\\mathrm{id}_F$.
    On a alors nécessairement $g=f^{-1}$.<br>
    <span class="warn">⚠️ Il faut les <b>deux</b> égalités : $g\\circ f=\\mathrm{id}_E$ seule ne donne que l'injectivité de $f$.</span></div>`}
  ]
 }
);

/* --- QUESTIONS SEMAINE 1 --- */
QUESTIONS.push(
 // ---------- ANALYSE 1A ----------
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"La relation $\\le$ sur $\\mathbb R$ est une relation d'ordre :",o:["partiel","total","d'équivalence","stricte"],c:1,e:"$\\forall x,y,\\ x\\le y$ ou $y\\le x$ : l'ordre est total."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"Si $a\\le b$ et $c\\le 0$, alors :",o:["$ac\\le bc$","$ac\\ge bc$","$ac=bc$","on ne peut rien dire"],c:1,e:"Multiplier par un négatif inverse l'inégalité."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$M=\\max(A)$ exige en plus d'être un majorant :",o:["$M\\gt0$","$M\\in A$","$A$ bornée","$A$ finie"],c:1,e:"Le plus grand élément appartient à $A$ ; c'est ce qui le distingue d'un simple majorant."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$A=[0;1[$ possède-t-elle un plus grand élément ?",o:["oui, $1$","oui, $0$","non","oui, $0{,}999$"],c:2,e:"$1\\notin A$ : $A$ est majorée mais n'a pas de max."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"Le plus grand élément d'une partie, s'il existe, est :",o:["multiple","unique","toujours nul","un minorant"],c:1,e:"Unicité par antisymétrie de $\\le$."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$|x|$ se définit comme :",o:["$\\max(x,-x)$","$\\min(x,-x)$","$x^2$","$\\sqrt x$"],c:0,e:"$|x|=\\max(x,-x)$."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"Inégalité triangulaire :",o:["$|x+y|\\ge|x|+|y|$","$|x+y|\\le|x|+|y|$","$|x+y|=|x|+|y|$","$|xy|\\le|x|+|y|$"],c:1,e:"$|x+y|\\le|x|+|y|$, avec égalité ssi $x$ et $y$ sont de même signe."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"Seconde inégalité triangulaire :",o:["$\\big||x|-|y|\\big|\\le|x-y|$","$|x-y|\\le|x|-|y|$","$\\big||x|-|y|\\big|\\ge|x+y|$","$|x|-|y|=|x-y|$"],c:0,e:"$\\big||x|-|y|\\big|\\le|x-y|$."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$\\max(x,y)$ vaut :",o:["$\\frac{x+y+|x-y|}2$","$\\frac{x+y-|x-y|}2$","$\\frac{|x+y|}2$","$\\frac{x+y}2$"],c:0,e:"Avec $+|x-y|$ pour le max, $-|x-y|$ pour le min."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"Propriété d'Archimède :",o:["$\\forall x\\gt0,\\exists n\\in\\mathbb N^*,\\ n\\gt x$","$\\forall n,\\ n\\le x$","$\\mathbb R$ est borné","$E(x)=x$"],c:0,e:"$\\mathbb N$ n'est pas majoré dans $\\mathbb R$."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$E(x)$ est l'unique entier $n$ tel que :",o:["$n\\lt x\\le n+1$","$n\\le x\\lt n+1$","$n\\le x\\le n+1$","$n=x$"],c:1,e:"Encadrement à gauche large, à droite strict."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"Pour $n\\in\\mathbb Z$, $E(x+n)=$ ?",o:["$E(x)$","$E(x)+n$","$nE(x)$","$E(x)+E(n)$"],c:1,e:"La translation par un entier sort de la partie entière."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$I$ est un intervalle ssi :",o:["$I$ est borné","$\\forall(x,y)\\in I^2,\\ [x;y]\\subset I$","$I$ est fermé","$I\\ne\\varnothing$"],c:1,e:"Caractérisation par convexité."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"L'intersection de deux intervalles est :",o:["toujours un intervalle","jamais un intervalle","un intervalle ssi ils se coupent","non défini"],c:0,e:"C'est un intervalle (éventuellement vide)."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$[0;1]\\cup[2;3]$ est-il un intervalle ?",o:["oui","non","seulement si borné","oui car réunion"],c:1,e:"$[1;2]\\not\\subset$ l'ensemble : la réunion d'intervalles n'en est pas toujours un."},
 {chap:"Analyse 1A",week:1,mode:"qcm",t:"$A\\ne\\varnothing$ est bornée ssi $\\{|x-y|,(x,y)\\in A^2\\}$ est :",o:["minorée","majorée","vide","non bornée"],c:1,e:"Caractérisation par le diamètre."},
 {chap:"Analyse 1A",week:1,mode:"application",t:"Que vaut $E(-2{,}3)$ ?",o:["$-3$","$-2$","$2$","$3$"],c:0,e:"$-3\\le-2{,}3\\lt-2$ donc $E(-2{,}3)=-3$ (pas $-2$)."},
 {chap:"Analyse 1A",week:1,mode:"application",t:"Résous $|x-3|\\le2$.",o:["$[1;5]$","$[-5;-1]$","$[3;5]$","$[-2;2]$"],c:0,e:"$-2\\le x-3\\le2$ donc $x\\in[1;5]$."},
 {chap:"Analyse 1A",week:1,mode:"application",t:"$\\max(4,7)$ par la formule $\\frac{x+y+|x-y|}2$ :",o:["$7$","$4$","$5{,}5$","$11$"],c:0,e:"$\\frac{11+3}2=7$."},
 // ---------- ANALYSE 1B ----------
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\cos(a+b)=$ ?",o:["$\\cos a\\cos b+\\sin a\\sin b$","$\\cos a\\cos b-\\sin a\\sin b$","$\\sin a\\cos b+\\cos a\\sin b$","$\\cos a+\\cos b$"],c:1,e:"Signe $-$ pour $\\cos(a+b)$."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\sin(a-b)=$ ?",o:["$\\sin a\\cos b-\\cos a\\sin b$","$\\sin a\\cos b+\\cos a\\sin b$","$\\cos a\\cos b-\\sin a\\sin b$","$\\sin a-\\sin b$"],c:0,e:"Pour le sinus, le signe suit celui de l'angle."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\cos(2a)$ ne vaut PAS :",o:["$\\cos^2a-\\sin^2a$","$2\\cos^2a-1$","$1-2\\sin^2a$","$2\\cos a$"],c:3,e:"Les trois premières sont les formes usuelles de duplication."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\sin(2a)=$ ?",o:["$2\\sin a$","$2\\sin a\\cos a$","$\\sin^2a$","$1-2\\cos^2a$"],c:1,e:"$\\sin(2a)=2\\sin a\\cos a$."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"Linéarisation : $\\cos^2a=$ ?",o:["$\\frac12[1+\\cos(2a)]$","$\\frac12[1-\\cos(2a)]$","$1-\\sin(2a)$","$\\cos(2a)$"],c:0,e:"$+$ pour $\\cos^2$, $-$ pour $\\sin^2$."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\cos p-\\cos q=$ ?",o:["$2\\cos\\frac{p+q}2\\cos\\frac{p-q}2$","$-2\\sin\\frac{p+q}2\\sin\\frac{p-q}2$","$2\\sin\\frac{p+q}2\\cos\\frac{p-q}2$","$\\cos(p-q)$"],c:1,e:"Attention au signe $-$ devant le produit de sinus."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"La fonction tangente est périodique de période :",o:["$2\\pi$","$\\pi$","$\\frac\\pi2$","$4\\pi$"],c:1,e:"$\\tan(x+\\pi)=\\tan x$ : période $\\pi$, pas $2\\pi$."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\tan'(x)=$ ?",o:["$1+\\tan^2x$","$-\\frac1{\\cos^2x}$","$\\cos^2x$","$\\frac1{\\sin^2x}$"],c:0,e:"$\\tan'=\\frac1{\\cos^2}=1+\\tan^2$."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"Domaine de définition de $\\tan$ :",o:["$\\mathbb R$","$\\mathbb R\\setminus\\{k\\pi\\}$","$\\mathbb R\\setminus\\{\\frac\\pi2+k\\pi\\}$","$[-\\frac\\pi2;\\frac\\pi2]$"],c:2,e:"On exclut les zéros du cosinus."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\lim_{x\\to0}\\frac{\\sin x}{x}=$ ?",o:["$0$","$1$","$+\\infty$","$\\frac12$"],c:1,e:"Limite fondamentale (dérivée de $\\sin$ en 0)."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=$ ?",o:["$1$","$\\frac12$","$0$","$2$"],c:1,e:"$1-\\cos x\\sim\\frac{x^2}2$."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"Pour $x\\in[0;\\frac\\pi2]$, on a l'encadrement :",o:["$0\\le 1-\\cos x\\le\\frac{x^2}2$","$1-\\cos x\\ge x$","$\\sin x\\ge x$","$\\cos x\\le 0$"],c:0,e:"Inégalité géométrique du cours."},
 {chap:"Analyse 1B",week:1,mode:"qcm",t:"$\\cos(\\frac\\pi2-x)=$ ?",o:["$\\sin x$","$-\\sin x$","$\\cos x$","$-\\cos x$"],c:0,e:"Symétrie complémentaire."},
 {chap:"Analyse 1B",week:1,mode:"application",t:"Valeur de $\\cos\\frac\\pi3$ ?",o:["$\\frac12$","$\\frac{\\sqrt3}2$","$\\frac{\\sqrt2}2$","$1$"],c:0,e:"$\\cos\\frac\\pi3=\\frac12$ et $\\sin\\frac\\pi3=\\frac{\\sqrt3}2$."},
 {chap:"Analyse 1B",week:1,mode:"application",t:"Valeur de $\\tan\\frac\\pi4$ ?",o:["$1$","$\\sqrt3$","$\\frac{\\sqrt3}3$","$0$"],c:0,e:"$\\frac{\\sin}{\\cos}=1$ en $\\frac\\pi4$."},
 {chap:"Analyse 1B",week:1,mode:"application",t:"$\\sin\\frac\\pi6$ vaut :",o:["$\\frac12$","$\\frac{\\sqrt3}2$","$\\frac{\\sqrt2}2$","$0$"],c:0,e:"$\\sin\\frac\\pi6=\\frac12$."},
 // ---------- ALGÈBRE 1 ----------
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"La contraposée de $P\\Rightarrow Q$ est :",o:["$Q\\Rightarrow P$","$\\neg Q\\Rightarrow\\neg P$","$\\neg P\\Rightarrow\\neg Q$","$P\\wedge\\neg Q$"],c:1,e:"Elle est logiquement équivalente à l'implication."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\neg(P\\Rightarrow Q)$ équivaut à :",o:["$\\neg P\\vee Q$","$P\\wedge\\neg Q$","$\\neg P\\wedge Q$","$Q\\Rightarrow P$"],c:1,e:"Nier une implication : l'hypothèse vraie, la conclusion fausse."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\neg(P\\wedge Q)=$ ?",o:["$\\neg P\\wedge\\neg Q$","$\\neg P\\vee\\neg Q$","$P\\vee Q$","$\\neg P\\Rightarrow Q$"],c:1,e:"Loi de De Morgan."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\neg(\\forall x,\\ P(x))=$ ?",o:["$\\forall x,\\neg P(x)$","$\\exists x,\\neg P(x)$","$\\neg\\exists x,P(x)$","$\\forall x,P(x)$"],c:1,e:"La négation échange $\\forall$ et $\\exists$."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"Dans une récurrence <b>forte</b>, l'hypothèse est :",o:["$P(n)$ seul","$P(n)$ et $P(n+1)$","$P(k)$ pour tout $k\\le n$","$P(n_0)$ seul"],c:2,e:"On suppose la propriété vraie jusqu'au rang $n$."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"Pour montrer $A=B$, on procède le plus souvent par :",o:["récurrence","double inclusion","l'absurde","contraposée"],c:1,e:"$A\\subset B$ et $B\\subset A$."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\overline{A\\cup B}=$ ?",o:["$\\overline A\\cup\\overline B$","$\\overline A\\cap\\overline B$","$A\\cap B$","$\\overline{A}\\setminus B$"],c:1,e:"De Morgan ensembliste."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"La différence symétrique $A\\Delta B$ vaut :",o:["$(A\\cup B)\\setminus(A\\cap B)$","$A\\cap B$","$A\\cup B$","$\\overline{A\\cap B}$"],c:0,e:"Les éléments dans exactement un des deux."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\mathbb 1_{A\\cap B}=$ ?",o:["$\\mathbb 1_A+\\mathbb 1_B$","$\\mathbb 1_A\\mathbb 1_B$","$\\mathbb 1_A-\\mathbb 1_B$","$1-\\mathbb 1_A$"],c:1,e:"Le produit des fonctions caractéristiques."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\mathbb 1_{A\\cup B}=$ ?",o:["$\\mathbb 1_A+\\mathbb 1_B$","$\\mathbb 1_A+\\mathbb 1_B-\\mathbb 1_A\\mathbb 1_B$","$\\mathbb 1_A\\mathbb 1_B$","$1-\\mathbb 1_A\\mathbb 1_B$"],c:1,e:"Inclusion-exclusion : on retire l'intersection comptée deux fois."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$\\mathbb 1_{\\overline A}=$ ?",o:["$-\\mathbb 1_A$","$1-\\mathbb 1_A$","$\\mathbb 1_A$","$0$"],c:1,e:"Complémentaire."},
 {chap:"Algèbre 1",week:1,mode:"qcm",t:"$A\\cap(B\\cup C)=$ ?",o:["$(A\\cap B)\\cup(A\\cap C)$","$(A\\cup B)\\cap C$","$A\\cup(B\\cap C)$","$A\\cap B\\cap C$"],c:0,e:"Distributivité."},
 // ---------- ALGÈBRE 2 ----------
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"$f$ est injective ssi tout élément de $F$ a :",o:["au moins un antécédent","au plus un antécédent","exactement un antécédent","aucun antécédent"],c:1,e:"« Au plus un » = injectivité."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"$f$ est surjective ssi :",o:["$\\forall y\\in F,\\exists x\\in E,\\ f(x)=y$","$\\forall x,x',\\ f(x)=f(x')\\Rightarrow x=x'$","$\\exists y,\\forall x,\\ f(x)\\ne y$","$f$ est croissante"],c:0,e:"Tout élément de l'arrivée est atteint."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"Traduction usuelle de l'injectivité :",o:["$f(x)=f(x')\\Rightarrow x=x'$","$x=x'\\Rightarrow f(x)=f(x')$","$\\exists! x$","$f$ bijective"],c:0,e:"L'autre sens est vrai pour toute application."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"Si $f$ et $g$ sont bijectives, $(g\\circ f)^{-1}=$ ?",o:["$f^{-1}\\circ g^{-1}$","$g^{-1}\\circ f^{-1}$","$(f\\circ g)^{-1}$","$g\\circ f$"],c:0,e:"L'ordre s'inverse."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"Si $g\\circ f$ est injective, alors :",o:["$g$ est injective","$f$ est injective","les deux","aucune"],c:1,e:"Seule celle de droite ($f$) l'est nécessairement."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"Si $g\\circ f$ est surjective, alors :",o:["$f$ est surjective","$g$ est surjective","les deux","aucune"],c:1,e:"Seule celle de gauche ($g$) l'est nécessairement."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"$f$ bijective ssi il existe $g$ avec :",o:["$g\\circ f=\\mathrm{id}_E$ seulement","$f\\circ g=\\mathrm{id}_F$ seulement","$g\\circ f=\\mathrm{id}_E$ ET $f\\circ g=\\mathrm{id}_F$","$g=f$"],c:2,e:"Les deux égalités sont nécessaires ; alors $g=f^{-1}$."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"La composition des applications est :",o:["commutative","associative","ni l'un ni l'autre","toujours bijective"],c:1,e:"$h\\circ(g\\circ f)=(h\\circ g)\\circ f$, mais $f\\circ g\\ne g\\circ f$ en général."},
 {chap:"Algèbre 2",week:1,mode:"qcm",t:"Le produit cartésien $E\\times F$ est l'ensemble :",o:["des $(x,y)$ avec $x\\in E,y\\in F$","des $x\\in E\\cup F$","des applications de $E$ vers $F$","des parties de $E$"],c:0,e:"Ensemble des couples."},
 {chap:"Algèbre 2",week:1,mode:"application",t:"$f:\\mathbb R\\to\\mathbb R,\\ x\\mapsto x^2$ est :",o:["injective non surjective","surjective non injective","bijective","ni injective ni surjective"],c:3,e:"$f(-1)=f(1)$ (non injective) et $-1$ n'a pas d'antécédent (non surjective)."},
 {chap:"Algèbre 2",week:1,mode:"application",t:"$f:\\mathbb R\\to\\mathbb R,\\ x\\mapsto 2x+1$ est :",o:["bijective","injective non surjective","surjective non injective","ni l'un ni l'autre"],c:0,e:"Affine de pente non nulle : bijective, de réciproque $y\\mapsto\\frac{y-1}2$."},
 {chap:"Algèbre 2",week:1,mode:"application",t:"$f:\\mathbb R\\to\\mathbb R_+,\\ x\\mapsto x^2$ est :",o:["bijective","surjective non injective","injective non surjective","ni l'un ni l'autre"],c:1,e:"Tout réel positif est atteint, mais $f(-1)=f(1)$."}
);

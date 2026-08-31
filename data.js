/* =====================================================================
   DONNÉES — élèves, curriculum, cours, questions
   ===================================================================== */

/* --- Élèves (depuis Noms.txt) --- */
const STUDENTS = [
  "Ilias","Zineb","Lucas","ABL. Adam","Antonin","Cali","BOI. Enzo","Augustin",
  "Yassine","Roman","Charles","Amaury","Hugo","Juan","Théa","Jules","Robin",
  "Louis","Nathan","Félix","Maxence","Alrick","Noémi","Enes","Asma","Rémi",
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

/* Motif répété (tapisserie) : un emoji semé sur un fond sombre.
   Renvoie une valeur CSS `background` complète. */
function tile(emoji, bg, size, opacity){
  size = size || 44; opacity = (opacity==null?0.28:opacity);
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='"+size+"' height='"+size+"'>"
            + "<text x='"+(size*0.28)+"' y='"+(size*0.42)+"' font-size='"+(size*0.38)+"' opacity='"+opacity+"'>"+emoji+"</text>"
            + "<text x='"+(size*0.72)+"' y='"+(size*0.88)+"' font-size='"+(size*0.38)+"' opacity='"+opacity+"'>"+emoji+"</text>"
            + "</svg>";
  return "url(\"data:image/svg+xml;utf8," + encodeURIComponent(svg) + "\") repeat, " + bg;
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
  {id:'b_bijection',type:'badge', name:'Bijection',        rarity:'mythique',   perm:true,  desc:'Ni plus, ni moins.'},
  {id:'b_axiome',   type:'badge', name:'Axiome',           rarity:'secret',     perm:true,  desc:'Ne se démontre pas.'},
  {id:'b_lemme',    type:'badge', name:'Lemme vivant',     rarity:'rare',       perm:false, desc:'Toujours utile, jamais cité.'},
  {id:'b_epsilon',  type:'badge', name:'ε > 0',            rarity:'rare',       perm:false, desc:"Aussi petit qu'on veut."},
  {id:'b_cauchy',   type:'badge', name:'Cauchy',           rarity:'epique',     perm:false, desc:'Convergent, forcément.'},
  {id:'b_vvk',      type:'badge', name:'Disciple de VVK',  rarity:'legendaire', perm:false, desc:'Très rare. Très mérité.'},
  {id:'b_nuit',     type:'badge', name:'Nocturne',         rarity:'commun',     perm:false, desc:'Révise après minuit.'},
  {id:'b_zeta',     type:'badge', name:'ζ(2)=π²/6',        rarity:'mythique',   perm:false, desc:'Bâle, 1734.'},

  // ---------- BANNIÈRES (fond complet de ta ligne / de ton profil) ----------
  {id:'n_violet', type:'banner', name:'Violet console', rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#2a1a4a,#4a1f3d)', desc:'Le thème maison.'},
  {id:'n_ocean',  type:'banner', name:'Océan',          rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#0b3a52,#0e5566)', desc:'Calme et clair.'},
  {id:'n_ardoise',type:'banner', name:'Ardoise',        rarity:'commun',  perm:true,
   css:'linear-gradient(90deg,#1b2130,#2a3244)', desc:'Sobre et propre.'},
  {id:'n_matrix', type:'banner', name:'Matrice verte',  rarity:'rare',    perm:true,
   css:"tile:0️⃣1️⃣|linear-gradient(90deg,#04170c,#0a2c16)", desc:'Suis le lapin blanc.'},
  {id:'n_sunset', type:'banner', name:'Coucher',        rarity:'rare',    perm:true,
   css:'linear-gradient(90deg,#7a2d12,#a83a5c)', desc:'Fin de DS.'},
  {id:'n_maths',  type:'banner', name:'Tapisserie ∫',   rarity:'epique',  perm:true,
   css:'tile:∫|linear-gradient(90deg,#141024,#241a3d)', desc:'Des intégrales partout.'},
  {id:'n_gold',   type:'banner', name:'Or massif',      rarity:'legendaire', perm:true,
   css:'linear-gradient(90deg,#4a2f06,#8a6516,#4a2f06)', desc:'Le luxe.'},
  {id:'n_duck',   type:'banner', name:'Canards',        rarity:'legendaire', perm:true,
   css:'tile:🦆|#0a0a0a', desc:'Une tapisserie de canards. Noir profond.'},
  {id:'n_sakura', type:'banner', name:'Sakura',         rarity:'rare',    perm:false,
   css:'tile:🌸|linear-gradient(90deg,#3d1024,#5c1a33)', desc:'Printemps.'},
  {id:'n_nuit',   type:'banner', name:'Nuit profonde',  rarity:'epique',  perm:false,
   css:'tile:✦|linear-gradient(90deg,#0b1233,#241a4d)', desc:'Silence et concentration.'},
  {id:'n_neon',   type:'banner', name:'Néon',           rarity:'epique',  perm:false,
   css:'linear-gradient(90deg,#3d1a54,#0e4a5c)', desc:'Cyber.'},
  {id:'n_pi',     type:'banner', name:'Tapisserie π',   rarity:'mythique', perm:false,
   css:'tile:π|linear-gradient(90deg,#101c14,#16321f)', desc:'Irrationnel et transcendant.'},
  {id:'n_duckgold',type:'banner',name:'Canard doré',    rarity:'secret',  perm:false,
   css:'tile:🦆|linear-gradient(90deg,#2a1a02,#6b4a08,#2a1a02)', desc:'Le Graal. Coin-coin.'}
];

// Résout la valeur CSS d'une bannière ("tile:EMOJI|fond" ou une valeur CSS directe)
function bannerCss(item){
  if(!item || !item.css) return 'transparent';
  if(item.css.indexOf('tile:')===0){
    const rest=item.css.slice(5), i=rest.indexOf('|');
    return tile(rest.slice(0,i), rest.slice(i+1));
  }
  return item.css;
}

// Sélection déterministe des articles en rotation pour une semaine donnée.
// Même semaine = même boutique pour tout le monde ; change automatiquement chaque semaine.
function shopForWeek(weekId, nbRotating){
  nbRotating = nbRotating || 4;
  const perm = SHOP_ITEMS.filter(i=>i.perm);
  const rot  = SHOP_ITEMS.filter(i=>!i.perm);
  let seed=0; for(let i=0;i<weekId.length;i++) seed=(seed*31+weekId.charCodeAt(i))|0;
  seed=Math.abs(seed);
  const pool=rot.slice(), picked=[];
  for(let k=0;k<Math.min(nbRotating,pool.length);k++){
    seed=(seed*1103515245+12345)&0x7fffffff;
    picked.push(pool.splice(seed%pool.length,1)[0]);
  }
  return { perm, rotating:picked };
}

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
     <tr><td>$r=n<p$</td><td>surjective</td><td>s.e.a. dim $p-n$</td></tr>
     <tr><td>$r=p<n$</td><td>injective</td><td>$\\varnothing$ ou singleton</td></tr>
     <tr><td>$r<p,r<n$</td><td>ni inj. ni surj.</td><td>$\\varnothing$ ou s.e.a. dim $p-r$</td></tr>
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
 {chap:"Algèbre 15",mode:"qcm",t:"$M\\in\\mathcal M_n(K)$ inversible ssi :",o:["$\\mathrm{tr}M\\ne0$","$\\mathrm{rg}(M)=n$","$M=\\,{}^tM$","$\\mathrm{rg}(M)<n$"],c:1,e:"Rang plein."},
 // ---------- ALGÈBRE 15 — APPLICATION ----------
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ ?",o:["$1$","$2$","$0$","$3$"],c:0,e:"Lignes proportionnelles : rang 1."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&0&0\\\\0&1&0\\\\0&0&0\\end{pmatrix}$ ?",o:["$2$","$3$","$1$","$0$"],c:0,e:"Deux pivots non nuls."},
 {chap:"Algèbre 15",mode:"application",t:"Rang de $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ ?",o:["$2$","$1$","$0$","indéfini"],c:0,e:"Triangulaire à diagonale non nulle : rang 2."},
 // ---------- ALGÈBRE 16 — QCM ----------
 {chap:"Algèbre 16",mode:"qcm",t:"$\\vec b\\in\\mathrm{Im}f$, $\\vec x_p$ solution. Ensemble des solutions :",o:["$\\ker f$","$\\{\\vec x_p\\}$","$\\vec x_p+\\ker f$","$\\mathrm{Im}f$"],c:2,e:"Sous-espace affine : particulière + homogène."},
 {chap:"Algèbre 16",mode:"qcm",t:"Système de Cramer ($r=n=p$) :",o:["aucune solution","une seule","une infinité","dépend de $\\vec b$"],c:1,e:"$f$ bijective : solution unique."},
 {chap:"Algèbre 16",mode:"qcm",t:"Si $r=n<p$ :",o:["vide","singleton","s.e.a. dim $p-n$","tout l'espace"],c:2,e:"$f$ surjective, $\\dim=p-n$."},
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

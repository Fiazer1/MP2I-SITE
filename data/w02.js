/* =====================================================================
   SEMAINE 2 — Analyse 2 (Fonctions numériques), Algèbre 2 (compléments :
   caractérisation, images directe/réciproque), Algèbre 3 (Complexes, 1ère partie)
   D'après le cours de VVK (Lycée Thuillier).
   ===================================================================== */
COURSE_MODULES.push(
 {
  matiere:"Analyse", chap:"2", chapTitle:"Fonctions numériques d'une variable réelle", week:2,
  sections:[
   {title:"I. Domaine, graphe, transformations", html:`
    <p>Le <b>domaine de définition</b> $E$ est l'ensemble des $x$ tels que $f(x)$ existe. Le <b>graphe</b> est $\\mathcal C(f)=\\{(x,f(x))\\ /\\ x\\in E\\}$.</p>
    <h3>Transformations du graphe</h3>
    <table>
     <tr><th>Fonction</th><th>Effet sur le graphe de $f$</th></tr>
     <tr><td>$f(x)+a$</td><td>translation <b>verticale</b> de $a$</td></tr>
     <tr><td>$f(x+a)$</td><td>translation <b>horizontale</b> de $-a$ <span class="warn">(sens inverse !)</span></td></tr>
     <tr><td>$f(a-x)$</td><td>symétrie par rapport à la droite $x=\\frac a2$</td></tr>
     <tr><td>$f(ax)$</td><td>compression horizontale de facteur $\\frac1a$</td></tr>
     <tr><td>$af(x)$</td><td>dilatation verticale de facteur $a$</td></tr>
    </table>`},
   {title:"II. Fonction périodique", html:`
    <div class="card"><b>Définition :</b> $T\\in\\mathbb R^{+*}$, $f$ est $T$-périodique ssi $\\forall x\\in E,\\ f(x+T)=f(x)$.<br>
    <b>Condition nécessaire :</b> $E$ doit être invariant par translation de $T$.</div>
    <p>Si $T$ est une période, alors $nT$ aussi pour tout $n\\in\\mathbb N^*$. Si l'ensemble des périodes $\\gt0$ admet un plus petit élément $T_0$, c'est la <b>période minimale</b>.</p>
    <div class="demo"><span class="tag">🎯 Contre-exemple à connaître</span>
    $f=\\mathbb 1_{\\mathbb Q}$ (vaut 1 sur $\\mathbb Q$, 0 ailleurs) : tout rationnel $\\gt0$ est une période, donc <b>il n'y a pas de période minimale</b>.</div>
    <p><b>Proposition :</b> si $f,g$ sont $T$-périodiques et $\\alpha$ constante, alors $f+g$, $fg$ et $\\alpha f$ sont $T$-périodiques.</p>`},
   {title:"III. Parité", html:`
    <p><b>Paire :</b> $\\forall x\\in E,\\ f(-x)=f(x)$ — graphe symétrique par rapport à $(Oy)$.<br>
    <b>Impaire :</b> $\\forall x\\in E,\\ f(-x)=-f(x)$ — graphe symétrique par rapport à l'origine.<br>
    <b>Condition nécessaire :</b> $E$ symétrique par rapport à 0.</p>
    <div class="card"><b>Opérations :</b> paire + paire = paire, impaire + impaire = impaire.<br>
    <span class="warn">⚠️ Produit : impaire × impaire = <b>paire</b> (et paire × impaire = impaire).</span></div>
    <div class="demo"><span class="tag">🎯 Théorème de décomposition</span>
    Toute fonction se décompose de <b>manière unique</b> en somme d'une paire et d'une impaire :
    <div class="formula">$f_p(x)=\\dfrac{f(x)+f(-x)}2\\qquad f_i(x)=\\dfrac{f(x)-f(-x)}2$</div>
    (Analyse-synthèse : on suppose $f=f_p+f_i$, on évalue en $-x$, on additionne et soustrait.)</div>`},
   {title:"IV-V. Ordre, fonctions bornées", html:`
    <p>$f\\le g$ ssi $\\forall x\\in E,\\ f(x)\\le g(x)$. C'est une relation d'ordre <b>partiel</b> sur $\\mathcal F(E,\\mathbb R)$ dès que $E$ a au moins 2 éléments.</p>
    <div class="formula">$\\max(f,g)=\\dfrac{f+g+|f-g|}2\\qquad \\min(f,g)=\\dfrac{f+g-|f-g|}2$</div>
    <ul class="tight">
     <li><b>majorée</b> : $\\exists M,\\forall x,\\ f(x)\\le M$</li>
     <li><b>minorée</b> : $\\exists m,\\forall x,\\ m\\le f(x)$</li>
     <li><b>bornée</b> : majorée et minorée</li>
    </ul>
    <div class="demo"><span class="tag">🎯 Caractérisation</span> $f$ est bornée <b>ssi</b> $|f|$ est majorée.</div>
    <p>Si $f,g$ bornées et $\\alpha$ constante : $f+g$, $fg$, $\\alpha f$ sont bornées.</p>`},
   {title:"VI. Monotonie", html:`
    <div class="formula">$f$ croissante $\\iff \\forall x\\ne x',\\ \\dfrac{f(x)-f(x')}{x-x'}\\ge0$</div>
    <p>Décroissante : le taux est $\\le0$. Constante : taux nul, i.e. croissante <b>et</b> décroissante.</p>
    <h3>Opérations (à connaître)</h3>
    <ul class="tight">
     <li>croissante + croissante = croissante ; $\\lambda f$ garde le sens si $\\lambda\\gt0$, l'inverse si $\\lambda\\lt0$</li>
     <li>produit : <b>seulement</b> si signes constants (croissantes et positives $\\Rightarrow$ produit croissant)</li>
     <li>$1/f$ : si $f$ croissante de signe constant, $1/f$ est <b>décroissante</b></li>
    </ul>
    <div class="demo"><span class="tag">🎯 Composition</span>
    même sens $\\Rightarrow$ $g\\circ f$ <b>croissante</b> (y compris décroissante ∘ décroissante) ; sens contraires $\\Rightarrow$ décroissante.<br>
    Si $f$ est une bijection croissante, $f^{-1}$ est croissante.</div>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"2", chapTitle:"Applications (compléments)", week:2,
  sections:[
   {title:"III. Image directe, image réciproque", html:`
    <div class="card"><b>Image directe</b> de $A\\subset E$ : $f(A)=\\{f(x)\\ /\\ x\\in A\\}\\subset F$.<br>
    <b>Image réciproque</b> de $B\\subset F$ : $f^{-1}(B)=\\{x\\in E\\ /\\ f(x)\\in B\\}\\subset E$.</div>
    <p class="warn">⚠️ La notation $f^{-1}(B)$ n'exige <b>pas</b> que $f$ soit bijective : c'est un ensemble, pas l'application réciproque.</p>
    <h3>Propriétés</h3>
    <ul class="tight">
     <li>$f^{-1}$ se comporte bien : $f^{-1}(B\\cap B')=f^{-1}(B)\\cap f^{-1}(B')$ et $f^{-1}(B\\cup B')=f^{-1}(B)\\cup f^{-1}(B')$</li>
     <li>$f(A\\cup A')=f(A)\\cup f(A')$</li>
     <li><b>mais</b> seulement $f(A\\cap A')\\subset f(A)\\cap f(A')$ <span class="warn">(égalité si $f$ injective)</span></li>
     <li>$A\\subset f^{-1}(f(A))$ (égalité si $f$ injective) et $f(f^{-1}(B))\\subset B$ (égalité si $f$ surjective)</li>
    </ul>
    <p>$f$ surjective $\\iff f(E)=F$.</p>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"3", chapTitle:"Nombres complexes (1ère partie)", week:2,
  sections:[
   {title:"I. Corps des complexes", html:`
    <p><b>Motivation :</b> construire un ensemble contenant $\\mathbb R$, muni des mêmes opérations, dans lequel $x^2+1=0$ a des racines — et plus généralement toute équation algébrique de degré $n$ a $n$ racines.</p>
    <div class="card">$\\mathbb C=\\{a+ib\\ /\\ (a,b)\\in\\mathbb R^2\\}$ avec $i^2=-1$.<br>
    <b>Identification :</b> $a+ib=a'+ib'\\iff(a=a'$ et $b=b')$.</div>
    <p>$a=\\mathrm{Re}(z)$ (partie réelle), $b=\\mathrm{Im}(z)$ (partie imaginaire). <span class="warn">⚠️ $\\mathrm{Im}(z)$ est un <b>réel</b>, pas $ib$.</span></p>
    <p>Bijection entre $\\mathbb C$ et le plan $\\mathbb R^2$ : $z=a+ib\\leftrightarrow M(a,b)$ (affixe).</p>
    <p>$z$ est <b>réel</b> ssi $\\mathrm{Im}(z)=0$ ; <b>imaginaire pur</b> ssi $\\mathrm{Re}(z)=0$.</p>`},
   {title:"Structure algébrique", html:`
    <div class="formula">$(a+ib)+(a'+ib')=(a+a')+i(b+b')$</div>
    <div class="formula">$(a+ib)(a'+ib')=(aa'-bb')+i(ab'+a'b)$</div>
    <div class="demo"><span class="tag">🎯 Structure</span>
    $(\\mathbb C,+,\\times)$ est un <b>corps commutatif</b>, et $(\\mathbb C^*,\\times)$ est un <b>groupe commutatif</b>.</div>
    <p>Inverse d'un complexe non nul :</p>
    <div class="formula">$\\dfrac1{a+ib}=\\dfrac{a-ib}{a^2+b^2}$</div>
    <p class="warn">⚠️ $\\mathbb C$ n'est <b>pas ordonné</b> : écrire $z\\le z'$ pour des complexes n'a aucun sens.</p>`}
  ]
 }
);

/* --- QUESTIONS SEMAINE 2 --- */
QUESTIONS.push(
 // ---------- ANALYSE 2 ----------
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Le graphe de $x\\mapsto f(x+a)$ s'obtient par :",o:["translation verticale de $a$","translation horizontale de $-a$","translation horizontale de $+a$","symétrie axiale"],c:1,e:"Ajouter $a$ à la variable décale le graphe dans le sens inverse."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"$f$ est $T$-périodique ssi :",o:["$f(x+T)=f(x)$","$f(Tx)=f(x)$","$f(x)+T=f(x)$","$f(-x)=f(x)$"],c:0,e:"Définition de la périodicité."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Si $T$ est une période de $f$, alors :",o:["$T/2$ aussi","$nT$ aussi pour $n\\in\\mathbb N^*$","$-T$ est la seule autre","aucune autre"],c:1,e:"Les multiples entiers positifs sont encore des périodes."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"La fonction indicatrice de $\\mathbb Q$ illustre :",o:["une fonction sans période","une fonction périodique sans période minimale","une fonction impaire","une fonction bornée non périodique"],c:1,e:"Tout rationnel positif est période : pas de plus petite."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Le produit de deux fonctions impaires est :",o:["impaire","paire","ni l'un ni l'autre","nulle"],c:1,e:"$(-1)\\times(-1)=+1$ : le produit est pair."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Le produit d'une paire et d'une impaire est :",o:["paire","impaire","nulle","bornée"],c:1,e:"Impaire."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Dans la décomposition $f=f_p+f_i$, $f_p(x)=$ ?",o:["$\\frac{f(x)-f(-x)}2$","$\\frac{f(x)+f(-x)}2$","$\\frac{f(x)}2$","$f(-x)$"],c:1,e:"Avec un $+$ pour la partie paire."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Cette décomposition paire/impaire est :",o:["non unique","unique","possible seulement si $f$ est continue","impossible en général"],c:1,e:"Existence et unicité (analyse-synthèse)."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Pour qu'une fonction soit paire, son domaine doit être :",o:["borné","symétrique par rapport à 0","un intervalle","invariant par translation"],c:1,e:"Sinon $f(-x)$ n'a pas de sens."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"$f$ est bornée ssi :",o:["$f$ est majorée","$|f|$ est majorée","$f$ est monotone","$f$ est périodique"],c:1,e:"Caractérisation par la valeur absolue."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"La relation $\\le$ sur $\\mathcal F(E,\\mathbb R)$ est un ordre :",o:["total","partiel (si $E$ a $\\ge2$ éléments)","strict","d'équivalence"],c:1,e:"Deux fonctions peuvent se croiser : ordre partiel."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Si $f$ est croissante et $\\lambda\\lt0$, alors $\\lambda f$ est :",o:["croissante","décroissante","constante","non monotone"],c:1,e:"Multiplier par un négatif inverse le sens."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"$f$ et $g$ toutes deux décroissantes : $g\\circ f$ est :",o:["décroissante","croissante","constante","non monotone"],c:1,e:"Deux inversions se compensent."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Si $f$ est croissante et strictement positive, $1/f$ est :",o:["croissante","décroissante","bornée","impaire"],c:1,e:"L'inverse renverse la monotonie (à signe constant)."},
 {chap:"Analyse 2",week:2,mode:"qcm",t:"Si $f$ est une bijection croissante, $f^{-1}$ est :",o:["croissante","décroissante","non monotone","constante"],c:0,e:"La réciproque conserve le sens de variation."},
 {chap:"Analyse 2",week:2,mode:"application",t:"$f(x)=x^3$ sur $\\mathbb R$ est :",o:["paire","impaire","ni l'une ni l'autre","périodique"],c:1,e:"$(-x)^3=-x^3$."},
 {chap:"Analyse 2",week:2,mode:"application",t:"$f(x)=x^2+\\cos x$ est :",o:["paire","impaire","ni l'une ni l'autre","périodique"],c:0,e:"Somme de deux fonctions paires."},
 {chap:"Analyse 2",week:2,mode:"application",t:"Partie impaire de $f(x)=e^x$ ?",o:["$\\cosh x$","$\\sinh x$","$e^{-x}$","$0$"],c:1,e:"$\\frac{e^x-e^{-x}}2=\\sinh x$."},
 // ---------- ALGÈBRE 2 (compléments) ----------
 {chap:"Algèbre 2",week:2,mode:"qcm",t:"$f^{-1}(B)$ désigne :",o:["l'image de $B$ par la réciproque","$\\{x\\in E\\ /\\ f(x)\\in B\\}$","$\\{f(x)\\ /\\ x\\in B\\}$","le noyau"],c:1,e:"Image réciproque : ne nécessite pas la bijectivité."},
 {chap:"Algèbre 2",week:2,mode:"qcm",t:"En général, $f(A\\cap A')$ et $f(A)\\cap f(A')$ :",o:["sont égaux","vérifient $\\subset$ seulement","sont disjoints","sont vides"],c:1,e:"$f(A\\cap A')\\subset f(A)\\cap f(A')$, avec égalité si $f$ injective."},
 {chap:"Algèbre 2",week:2,mode:"qcm",t:"$f^{-1}(B\\cap B')=$ ?",o:["$f^{-1}(B)\\cap f^{-1}(B')$","$f^{-1}(B)\\cup f^{-1}(B')$","$\\varnothing$","seulement une inclusion"],c:0,e:"L'image réciproque commute avec toutes les opérations ensemblistes."},
 {chap:"Algèbre 2",week:2,mode:"qcm",t:"$A$ et $f^{-1}(f(A))$ vérifient :",o:["$A=f^{-1}(f(A))$ toujours","$A\\subset f^{-1}(f(A))$","$f^{-1}(f(A))\\subset A$","aucun lien"],c:1,e:"Égalité si $f$ est injective."},
 {chap:"Algèbre 2",week:2,mode:"qcm",t:"$f$ est surjective ssi :",o:["$f(E)=F$","$f(E)\\subset F$","$f^{-1}(F)=E$","$E=F$"],c:0,e:"L'image est l'ensemble d'arrivée tout entier."},
 // ---------- ALGÈBRE 3 ----------
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"$(\\mathbb C,+,\\times)$ est :",o:["un groupe seulement","un anneau non commutatif","un corps commutatif","un espace vectoriel seulement"],c:2,e:"Corps commutatif ; $(\\mathbb C^*,\\times)$ est un groupe commutatif."},
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"Pour $z=a+ib$, $\\mathrm{Im}(z)$ vaut :",o:["$ib$","$b$","$|b|$","$a$"],c:1,e:"La partie imaginaire est le réel $b$, sans le $i$."},
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"$a+ib=a'+ib'$ (réels) équivaut à :",o:["$a=a'$ seulement","$a=a'$ et $b=b'$","$a+b=a'+b'$","$ab=a'b'$"],c:1,e:"Identification des parties réelle et imaginaire."},
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"$(a+ib)(a'+ib')=$ ?",o:["$(aa'+bb')+i(ab'+a'b)$","$(aa'-bb')+i(ab'+a'b)$","$aa'+i bb'$","$(aa'-bb')+i(ab'-a'b)$"],c:1,e:"Développer avec $i^2=-1$."},
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"$\\frac1{a+ib}=$ ?",o:["$\\frac{a+ib}{a^2+b^2}$","$\\frac{a-ib}{a^2+b^2}$","$\\frac{a-ib}{a^2-b^2}$","$\\frac1a+\\frac1{ib}$"],c:1,e:"On multiplie par le conjugué."},
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"Sur $\\mathbb C$, la relation $\\le$ :",o:["est un ordre total","est un ordre partiel","n'existe pas (corps non ordonné)","équivaut au module"],c:2,e:"$\\mathbb C$ n'est pas un corps ordonné."},
 {chap:"Algèbre 3",week:2,mode:"qcm",t:"$z$ est imaginaire pur ssi :",o:["$\\mathrm{Re}(z)=0$","$\\mathrm{Im}(z)=0$","$z=0$","$|z|=1$"],c:0,e:"Partie réelle nulle."},
 {chap:"Algèbre 3",week:2,mode:"application",t:"Calcule $(2+i)(1-3i)$.",o:["$5-5i$","$2-3i$","$-1+7i$","$5+5i$"],c:0,e:"$2-6i+i-3i^2=2-5i+3=5-5i$."},
 {chap:"Algèbre 3",week:2,mode:"application",t:"Que vaut $i^{2026}$ ?",o:["$1$","$-1$","$i$","$-i$"],c:1,e:"$2026=4\\times506+2$ donc $i^{2026}=i^2=-1$."},
 {chap:"Algèbre 3",week:2,mode:"application",t:"Forme algébrique de $\\frac1{1+i}$ ?",o:["$\\frac{1-i}2$","$\\frac{1+i}2$","$1-i$","$\\frac{1-i}{\\sqrt2}$"],c:0,e:"$\\frac{1-i}{(1+i)(1-i)}=\\frac{1-i}2$."},
 {chap:"Algèbre 3",week:2,mode:"application",t:"Partie réelle de $(1+i)^2$ ?",o:["$0$","$2$","$1$","$-2$"],c:0,e:"$(1+i)^2=2i$ : partie réelle nulle."}
);

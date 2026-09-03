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

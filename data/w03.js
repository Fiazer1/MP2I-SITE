/* =====================================================================
   SEMAINE 3 — Analyse 3 (Dérivation), Algèbre 3 (Complexes, 2e partie :
   conjugué, module, cercle unité, argument)
   D'après le cours de VVK (Lycée Thuillier).
   ===================================================================== */
COURSE_MODULES.push(
 {
  matiere:"Analyse", chap:"3", chapTitle:"Dérivation", week:3,
  sections:[
   {title:"I. Fonction dérivable", html:`
    <div class="card"><b>Définition :</b> $f$ est dérivable en $x_0$ ssi
    $\\displaystyle\\lim_{x\\to x_0}\\frac{f(x)-f(x_0)}{x-x_0}$ existe et est <b>finie</b>. Cette limite est $f'(x_0)$.<br>
    Autre écriture : $\\displaystyle\\lim_{h\\to0}\\frac{f(x_0+h)-f(x_0)}h$.</div>
    <div class="demo"><span class="tag">🎯 Proposition (sens unique)</span>
    Si $f$ est dérivable en $x_0$, alors $f$ est <b>continue</b> en $x_0$.<br>
    <span class="warn">⚠️ La réciproque est fausse : $x\\mapsto|x|$ est continue en 0 mais pas dérivable.</span></div>
    <p><b>Interprétation géométrique :</b> $f'(x_0)$ est le coefficient directeur de la tangente en $x_0$, d'équation
    $y=f'(x_0)(x-x_0)+f(x_0)$.</p>`},
   {title:"Propriétés algébriques", html:`
    <p>Si $f$ et $g$ sont dérivables en $x_0$ et $\\lambda\\in\\mathbb R$ :</p>
    <div class="formula">$(f+g)'(x_0)=f'(x_0)+g'(x_0)\\qquad (\\lambda f)'(x_0)=\\lambda f'(x_0)$</div>
    <div class="formula">$(fg)'(x_0)=f'(x_0)g(x_0)+f(x_0)g'(x_0)$</div>
    <div class="formula">$\\left(\\dfrac1f\\right)'(x_0)=-\\dfrac{f'(x_0)}{f^2(x_0)}\\qquad
    \\left(\\dfrac fg\\right)'(x_0)=\\dfrac{f'(x_0)g(x_0)-f(x_0)g'(x_0)}{g^2(x_0)}$</div>
    <p class="warn">⚠️ Pour $\\frac1f$ et $\\frac fg$ : il faut la non-annulation du dénominateur sur l'intervalle.</p>`},
   {title:"Composition", html:`
    <div class="demo"><span class="tag">🎯 Dérivée d'une composée</span>
    Si $f$ est dérivable en $x_0$ et $g$ dérivable en $y_0=f(x_0)$, alors $g\\circ f$ est dérivable en $x_0$ et
    <div class="formula">$(g\\circ f)'(x_0)=g'\\big(f(x_0)\\big)\\cdot f'(x_0)$</div></div>
    <p><b>Conséquences usuelles :</b></p>
    <ul class="tight">
     <li>$(f^n)'=n f^{n-1}f'$ pour $n\\in\\mathbb N$</li>
     <li>$(\\ln f)'=\\dfrac{f'}f$ si $f\\gt0$</li>
     <li>$(e^f)'=f'e^f$ ; $(\\sqrt f)'=\\dfrac{f'}{2\\sqrt f}$ si $f\\gt0$</li>
    </ul>
    <h3>Fonction dérivée, dérivées successives</h3>
    <p>$f'$ est la fonction qui à $x$ associe $f'(x)$. On note $f''$, $f^{(n)}$ les dérivées successives ;
    $f$ est de classe $\\mathcal C^n$ si $f^{(n)}$ existe et est continue.</p>`}
  ]
 },
 {
  matiere:"Algèbre", chap:"3", chapTitle:"Nombres complexes (2e partie)", week:3,
  sections:[
   {title:"II. Conjugué, module", html:`
    <h3>1) Conjugué</h3>
    <div class="formula">$\\overline{a+ib}=a-ib$</div>
    <ul class="tight">
     <li>$\\overline{z+z'}=\\bar z+\\bar z'$ ; $\\overline{zz'}=\\bar z\\,\\bar z'$ ; $\\overline{\\bar z}=z$</li>
     <li>$z+\\bar z=2\\mathrm{Re}(z)$ ; $z-\\bar z=2i\\,\\mathrm{Im}(z)$</li>
     <li>$z\\in\\mathbb R\\iff z=\\bar z$ ; &nbsp; $z$ imaginaire pur $\\iff z=-\\bar z$</li>
    </ul>
    <h3>2) Module</h3>
    <div class="formula">$|z|=\\sqrt{a^2+b^2}\\qquad z\\bar z=|z|^2$</div>
    <ul class="tight">
     <li>$|zz'|=|z||z'|$ ; $\\left|\\frac z{z'}\\right|=\\frac{|z|}{|z'|}$ ; $|\\bar z|=|z|$</li>
     <li>$|z+z'|\\le|z|+|z'|$ <b>(inégalité triangulaire)</b>, avec égalité ssi $z$ et $z'$ sont « positivement colinéaires »</li>
     <li>$\\big||z|-|z'|\\big|\\le|z-z'|$</li>
    </ul>
    <p class="warn">⚠️ $|z|^2=z\\bar z$ et <b>non</b> $z^2$ (qui n'est pas réel en général).</p>
    <h3>3) Cercle unité</h3>
    <div class="card">$\\mathbb U=\\{z\\in\\mathbb C\\ /\\ |z|=1\\}$. $(\\mathbb U,\\times)$ est un <b>groupe commutatif</b>.<br>
    Si $|z|=1$ alors $z^{-1}=\\bar z$.</div>
    <div class="demo"><span class="tag">🎯 Astuce</span>
    Pour tout $z\\in\\mathbb C^*$, $\\dfrac{\\bar z}{z}\\in\\mathbb U$, et $z^{-1}=\\dfrac{\\bar z}{|z|^2}$.</div>`},
   {title:"III. Argument, forme trigonométrique", html:`
    <p>Pour $z$ de module 1 : $z=e^{i\\theta}=\\cos\\theta+i\\sin\\theta$.</p>
    <div class="formula">$e^{i\\theta}e^{i\\theta'}=e^{i(\\theta+\\theta')}\\qquad \\dfrac1{e^{i\\theta}}=e^{-i\\theta}=\\overline{e^{i\\theta}}$</div>
    <div class="card"><b>Forme trigonométrique :</b> si $z\\in\\mathbb C^*$ et $\\arg(z)\\equiv\\theta\\ [2\\pi]$ :
    <div class="formula">$z=|z|(\\cos\\theta+i\\sin\\theta)=|z|e^{i\\theta}$</div></div>
    <ul class="tight">
     <li>$\\arg(zz')\\equiv\\arg z+\\arg z'\\ [2\\pi]$</li>
     <li>$\\arg\\left(\\frac z{z'}\\right)\\equiv\\arg z-\\arg z'\\ [2\\pi]$ ; $\\arg(\\bar z)\\equiv-\\arg z$</li>
     <li>$\\arg(z^n)\\equiv n\\arg z\\ [2\\pi]$</li>
    </ul>
    <p class="warn">⚠️ L'argument n'est défini que pour $z\\ne0$, et seulement <b>modulo $2\\pi$</b>.</p>
    <div class="demo"><span class="tag">🎯 Formule de Moivre</span>
    $\\big(\\cos\\theta+i\\sin\\theta\\big)^n=\\cos(n\\theta)+i\\sin(n\\theta)$, i.e. $(e^{i\\theta})^n=e^{in\\theta}$.</div>
    <div class="demo"><span class="tag">🎯 Formules d'Euler</span>
    <div class="formula">$\\cos\\theta=\\dfrac{e^{i\\theta}+e^{-i\\theta}}2\\qquad \\sin\\theta=\\dfrac{e^{i\\theta}-e^{-i\\theta}}{2i}$</div>
    Servent à <b>linéariser</b> $\\cos^n$, $\\sin^n$.</div>`}
  ]
 }
);

/* --- QUESTIONS SEMAINE 3 --- */
QUESTIONS.push(
 // ---------- ANALYSE 3 ----------
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$f$ dérivable en $x_0$ signifie que la limite du taux d'accroissement :",o:["existe","existe et est finie","vaut 0","est infinie"],c:1,e:"Une limite infinie donne une tangente verticale, pas la dérivabilité."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"Si $f$ est dérivable en $x_0$, alors :",o:["$f$ est continue en $x_0$","$f$ est croissante","$f'$ est continue","$f$ est bornée"],c:0,e:"Dérivabilité $\\Rightarrow$ continuité (l'inverse est faux)."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$x\\mapsto|x|$ en $0$ est :",o:["dérivable","continue non dérivable","ni continue ni dérivable","de classe $\\mathcal C^1$"],c:1,e:"Taux d'accroissement $\\to+1$ à droite, $-1$ à gauche."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"Équation de la tangente en $x_0$ :",o:["$y=f'(x_0)x+f(x_0)$","$y=f'(x_0)(x-x_0)+f(x_0)$","$y=f(x_0)(x-x_0)$","$y=f'(x_0)$"],c:1,e:"Attention au $(x-x_0)$."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$(fg)'=$ ?",o:["$f'g'$","$f'g+fg'$","$f'g-fg'$","$(fg)'=f'g$"],c:1,e:"Règle du produit."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$\\left(\\frac fg\\right)'=$ ?",o:["$\\frac{f'g+fg'}{g^2}$","$\\frac{f'g-fg'}{g^2}$","$\\frac{f'}{g'}$","$\\frac{f'g-fg'}{g}$"],c:1,e:"Numérateur avec un $-$, dénominateur au carré."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$\\left(\\frac1f\\right)'=$ ?",o:["$\\frac1{f'}$","$-\\frac{f'}{f^2}$","$\\frac{f'}{f^2}$","$-\\frac1{f^2}$"],c:1,e:"Signe moins et carré au dénominateur."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$(g\\circ f)'(x_0)=$ ?",o:["$g'(x_0)f'(x_0)$","$g'(f(x_0))\\cdot f'(x_0)$","$g'(f'(x_0))$","$f'(g(x_0))g'(x_0)$"],c:1,e:"On dérive l'extérieure évaluée en $f(x_0)$, fois la dérivée intérieure."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$(f^n)'=$ ?",o:["$nf^{n-1}$","$nf^{n-1}f'$","$f^{n-1}f'$","$n(f')^{n-1}$"],c:1,e:"Ne pas oublier le facteur $f'$."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$(\\ln f)'=$ (avec $f\\gt0$)",o:["$\\frac1f$","$\\frac{f'}f$","$f'\\ln f$","$\\frac{f}{f'}$"],c:1,e:"Dérivée logarithmique."},
 {chap:"Analyse 3",week:3,mode:"qcm",t:"$(e^f)'=$ ?",o:["$e^f$","$f'e^f$","$e^{f'}$","$fe^{f-1}$"],c:1,e:"Composition avec l'exponentielle."},
 {chap:"Analyse 3",week:3,mode:"application",t:"Dérivée de $f(x)=x^2\\sin x$ ?",o:["$2x\\cos x$","$2x\\sin x+x^2\\cos x$","$2x\\sin x-x^2\\cos x$","$x^2\\cos x$"],c:1,e:"Règle du produit."},
 {chap:"Analyse 3",week:3,mode:"application",t:"Dérivée de $f(x)=\\ln(x^2+1)$ ?",o:["$\\frac{2x}{x^2+1}$","$\\frac1{x^2+1}$","$\\frac{2x}{(x^2+1)^2}$","$2x\\ln(x^2+1)$"],c:0,e:"$\\frac{u'}u$ avec $u=x^2+1$."},
 {chap:"Analyse 3",week:3,mode:"application",t:"Dérivée de $f(x)=e^{3x}$ ?",o:["$e^{3x}$","$3e^{3x}$","$3xe^{3x}$","$e^{3}$"],c:1,e:"$u'e^u$ avec $u=3x$."},
 {chap:"Analyse 3",week:3,mode:"application",t:"Dérivée de $f(x)=\\frac{1}{x^2}$ (sur $\\mathbb R^*$) ?",o:["$-\\frac2{x^3}$","$\\frac2{x^3}$","$-\\frac1{2x}$","$-\\frac1{x^3}$"],c:0,e:"$f=x^{-2}$ donc $f'=-2x^{-3}$."},
 // ---------- ALGÈBRE 3 (2e partie) ----------
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$z\\bar z=$ ?",o:["$z^2$","$|z|^2$","$|z|$","$\\mathrm{Re}(z)^2$"],c:1,e:"Le produit d'un complexe par son conjugué vaut le module au carré."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$z+\\bar z=$ ?",o:["$2\\mathrm{Re}(z)$","$2i\\,\\mathrm{Im}(z)$","$2|z|$","$0$"],c:0,e:"Et $z-\\bar z=2i\\,\\mathrm{Im}(z)$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$z$ est réel ssi :",o:["$z=\\bar z$","$z=-\\bar z$","$|z|=1$","$\\mathrm{Re}(z)=0$"],c:0,e:"Et imaginaire pur ssi $z=-\\bar z$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$\\overline{zz'}=$ ?",o:["$\\bar z z'$","$\\bar z\\,\\bar z'$","$\\overline{z}+\\overline{z'}$","$|zz'|$"],c:1,e:"La conjugaison est un morphisme."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$|zz'|=$ ?",o:["$|z|+|z'|$","$|z||z'|$","$|z+z'|$","$|z|^2$"],c:1,e:"Le module est multiplicatif."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"Inégalité triangulaire dans $\\mathbb C$ :",o:["$|z+z'|\\ge|z|+|z'|$","$|z+z'|\\le|z|+|z'|$","$|zz'|\\le|z|+|z'|$","$|z+z'|=|z|+|z'|$"],c:1,e:"Comme dans $\\mathbb R$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"Si $|z|=1$, alors $z^{-1}=$ ?",o:["$\\bar z$","$-z$","$z$","$\\frac1{\\bar z}$"],c:0,e:"Car $z\\bar z=|z|^2=1$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$(\\mathbb U,\\times)$ est :",o:["un corps","un groupe commutatif","un anneau","un espace vectoriel"],c:1,e:"Le cercle unité est un groupe multiplicatif commutatif."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"Pour $z\\in\\mathbb C^*$, $z^{-1}=$ ?",o:["$\\frac{\\bar z}{|z|^2}$","$\\frac{\\bar z}{|z|}$","$\\frac{z}{|z|^2}$","$\\bar z$"],c:0,e:"On multiplie haut et bas par $\\bar z$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$e^{i\\theta}e^{i\\theta'}=$ ?",o:["$e^{i\\theta\\theta'}$","$e^{i(\\theta+\\theta')}$","$e^{i\\theta}+e^{i\\theta'}$","$2e^{i\\theta}$"],c:1,e:"Les arguments s'ajoutent."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"Formule de Moivre :",o:["$(e^{i\\theta})^n=e^{in\\theta}$","$(e^{i\\theta})^n=ne^{i\\theta}$","$e^{in\\theta}=n\\cos\\theta$","$(\\cos\\theta)^n=\\cos(n\\theta)$"],c:0,e:"$(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"Formule d'Euler pour $\\sin\\theta$ :",o:["$\\frac{e^{i\\theta}+e^{-i\\theta}}2$","$\\frac{e^{i\\theta}-e^{-i\\theta}}{2i}$","$\\frac{e^{i\\theta}-e^{-i\\theta}}2$","$\\frac{e^{i\\theta}+e^{-i\\theta}}{2i}$"],c:1,e:"Attention au $2i$ au dénominateur pour le sinus."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"$\\arg(zz')\\equiv$ ?",o:["$\\arg z\\cdot\\arg z'$","$\\arg z+\\arg z'\\ [2\\pi]$","$\\arg z-\\arg z'$","$0$"],c:1,e:"Les arguments s'ajoutent modulo $2\\pi$."},
 {chap:"Algèbre 3",week:3,mode:"qcm",t:"L'argument est défini :",o:["pour tout $z$","pour $z\\ne0$, modulo $2\\pi$","modulo $\\pi$","de façon unique"],c:1,e:"Pas d'argument pour 0, et défini modulo $2\\pi$."},
 {chap:"Algèbre 3",week:3,mode:"application",t:"Module de $z=3+4i$ ?",o:["$5$","$7$","$25$","$\\sqrt7$"],c:0,e:"$\\sqrt{9+16}=5$."},
 {chap:"Algèbre 3",week:3,mode:"application",t:"Forme exponentielle de $z=1+i$ ?",o:["$\\sqrt2\\,e^{i\\pi/4}$","$2e^{i\\pi/4}$","$\\sqrt2\\,e^{i\\pi/3}$","$e^{i\\pi/4}$"],c:0,e:"$|z|=\\sqrt2$ et $\\arg z=\\frac\\pi4$."},
 {chap:"Algèbre 3",week:3,mode:"application",t:"Conjugué de $z=2-5i$ ?",o:["$2+5i$","$-2+5i$","$-2-5i$","$5-2i$"],c:0,e:"On change le signe de la partie imaginaire."},
 {chap:"Algèbre 3",week:3,mode:"application",t:"Que vaut $(1+i)^4$ ?",o:["$-4$","$4$","$4i$","$-4i$"],c:0,e:"$(1+i)^2=2i$ puis $(2i)^2=-4$."}
);

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

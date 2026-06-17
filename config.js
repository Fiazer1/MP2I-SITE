/* =====================================================================
   CONFIG — à personnaliser
   ---------------------------------------------------------------------
   1) Tant que FIREBASE_CONFIG.apiKey est vide, l'app tourne en MODE LOCAL
      (données dans le navigateur, classement NON partagé).
   2) Config Firebase collée -> classement PARTAGÉ actif.
   ===================================================================== */

// Valeurs récupérées dans la console Firebase (le reste — import, initializeApp,
// getAnalytics — est géré par l'app, ne le remets pas ici).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDNBL8owkAb436EUd5BgxnLFlaugBCUjAA",
  authDomain: "revisemp2i.firebaseapp.com",
  projectId: "revisemp2i",
  storageBucket: "revisemp2i.firebasestorage.app",
  messagingSenderId: "751830031507",
  appId: "1:751830031507:web:27736c09982bd9c0078166",
  measurementId: "G-FXFSC232NK"
};

// Qui a accès au panneau Admin (doit correspondre exactement à un nom de la liste)
const ADMIN_NAME = "Roman";

// Mot de passe provisoire attribué à la création / au reset d'un compte
const DEFAULT_PASSWORD = "mp2i";

// Sel ajouté avant hachage des mots de passe (change-le si tu veux)
const PASSWORD_SALT = "mp2i-canard-2026";

// Questions filtre pour le mode invité (réponses insensibles à la casse)
const GUEST_QUESTIONS = [
  { q: "Quel est le diminutif du prof de maths ?", a: "vvk" },
  { q: "Quel est l'animal emblème de notre MP2I ?", a: "canard" }
];

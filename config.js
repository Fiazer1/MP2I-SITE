/* =====================================================================
   CONFIG — à personnaliser
   ---------------------------------------------------------------------
   Les secrets (mot de passe par défaut, réponses du mode invité) sont
   stockés sous forme d'EMPREINTE SHA-256, pas en clair. Pour en changer,
   demande-moi de recalculer les empreintes (il faut le sel ci-dessous).
   ===================================================================== */

// Valeurs Firebase (publiques par nature ; la sécurité vient des règles Firestore)
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

// Sel utilisé pour toutes les empreintes (ne pas changer sans tout recalculer)
const PASSWORD_SALT = "mp2i-canard-2026";

// Empreinte du mot de passe provisoire par défaut (le texte clair n'apparaît pas).
// Valeur en clair connue de l'admin uniquement.
const DEFAULT_PASSWORD_HASH = "ec632a90c8b14e34fe3d8d13cee201028bf5fafaa7d0c2aa522e3c23e94aea39";

// Mode invité : la QUESTION reste lisible, mais la RÉPONSE est stockée en empreinte.
const GUEST_QUESTIONS = [
  { q: "Quel est le diminutif du prof de maths ?", a: "d6c89f5c29b4973cd4c0a29faaab6b98aa359d8a94bc8dee225c5fcea1b02e35" },
  { q: "Quel est l'animal emblème de notre MP2I ?", a: "e22aad10feac6f7e8f8cff51ef684bcfb5c449ae7a3483ae42786e18922c8bc8" }
];

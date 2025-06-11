// Script pour tester la connexion à Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuration Firebase - Utiliser dotenv pour les variables d'environnement
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction pour tester la lecture
async function testRead() {
  try {
    console.log("Test de lecture Firestore...");
    const querySnapshot = await getDocs(collection(db, 'products'));
    console.log(`Lecture réussie! ${querySnapshot.size} produits trouvés.`);
    querySnapshot.forEach((doc) => {
      console.log(`ID: ${doc.id} => Nom: ${doc.data().name}`);
    });
    return true;
  } catch (error) {
    console.error("Erreur lors de la lecture:", error);
    return false;
  }
}

// Fonction pour tester l'écriture
async function testWrite() {
  try {
    console.log("Test d'écriture Firestore...");
    const testProduct = {
      name: "Produit test",
      category: "Test",
      price: 0,
      description: "Produit de test pour vérifier les permissions d'écriture",
      created_at: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'products'), testProduct);
    console.log(`Écriture réussie! Document créé avec ID: ${docRef.id}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'écriture:", error);
    return false;
  }
}

// Fonction principale
async function runTests() {
  console.log("Démarrage des tests Firebase...");
  
  try {
    // Test de lecture
    const readSuccess = await testRead();
    console.log("Résultat du test de lecture:", readSuccess ? "✅ Succès" : "❌ Échec");
    
    // Test d'écriture
    const writeSuccess = await testWrite();
    console.log("Résultat du test d'écriture:", writeSuccess ? "✅ Succès" : "❌ Échec");
    
    console.log("Tests terminés!");
  } catch (error) {
    console.error("Erreur lors des tests:", error);
  }
}

// Exécuter les tests
runTests().catch(console.error);

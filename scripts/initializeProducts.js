// Script pour initialiser les produits dans Firebase
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Configuration Firebase avec compte de service
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serviceAccount = JSON.parse(readFileSync('c:\\Users\\rayan\\Documents\\asdupropre\\scripts\\asdupropre-firebase-adminsdk-fbsvc-37bb7bd55a.json'));

// Initialiser Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://asdupropre-e9d0d.firebaseio.com'
});

// Obtenir une référence à Firestore
const db = getFirestore();

// Fonction pour vérifier la connexion à Firebase
async function testConnection() {
  try {
    console.log("Test de connexion à Firebase...");
    const productsRef = db.collection('products');
    const snapshot = await productsRef.limit(1).get();
    console.log("Connexion à Firestore établie avec succès!");
    return true;
  } catch (error) {
    console.error("Erreur de connexion à Firebase:", error);
    return false;
  }
}

// Fonction pour ajouter un produit
async function addProduct(product) {
  try {
    const productsRef = db.collection('products');
    const newProduct = {
      ...product,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };
    
    const docRef = await productsRef.add(newProduct);
    console.log(`Produit ajouté avec ID: ${docRef.id}`);
    return docRef;
  } catch (error) {
    console.error(`Erreur lors de l'ajout du produit ${product.name}:`, error);
    throw error;
  }
}

// Fonction pour ajouter les gels douches
async function addGelsDouches() {
  console.log("Ajout des gels douches...");
  
  const gelsDouches = [
    { name: "Bois d'argent", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Bois d'argent", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Bois+d'argent", stock: 50 },
    { name: "Sauvage", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Sauvage", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Sauvage", stock: 50 },
    { name: "Boss Bottle", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Boss Bottle", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Boss+Bottle", stock: 50 },
    { name: "La nuit de l'homme", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé La nuit de l'homme", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+La+nuit+de+l'homme", stock: 50 },
    { name: "Black Opium", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Black Opium", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Black+Opium", stock: 50 },
    { name: "Diesel", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Diesel", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Diesel", stock: 50 },
    { name: "Vanille patchouli", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Vanille patchouli", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Vanille+patchouli", stock: 50 },
    { name: "Angel", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Angel", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Angel", stock: 50 },
    { name: "La vie est belle", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé La vie est belle", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+La+vie+est+belle", stock: 50 },
    { name: "La petite robe noire", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé La petite robe noire", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+La+petite+robe+noire", stock: 50 },
    { name: "Le male", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Le male", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Le+male", stock: 50 },
    { name: "Lolita", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Lolita", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Lolita", stock: 50 },
    { name: "Invictus", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Invictus", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Invictus", stock: 50 },
    { name: "Alien", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Alien", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Alien", stock: 50 },
    { name: "Argant", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Argant", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Argant", stock: 50 },
    { name: "Fahrenheit", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Fahrenheit", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Fahrenheit", stock: 50 },
    { name: "Hypnotic Poison", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Hypnotic Poison", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Hypnotic+Poison", stock: 50 },
    { name: "Monoï", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Monoï", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Monoï", stock: 50 },
    { name: "One million", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé One million", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+One+million", stock: 50 },
    { name: "Interdit", category: "Gel douche luxe", price: 4, description: "Gel douche parfumé Interdit", image: "https://via.placeholder.com/300x300.png?text=Gel+Douche+Interdit", stock: 50 },
  ];
  
  for (const product of gelsDouches) {
    await addProduct(product);
  }
  
  console.log("Gels douches ajoutés avec succès.");
}

// Fonction pour ajouter les masques capillaires
async function addMasquesCapillaires() {
  console.log("Ajout des masques capillaires...");
  
  const masquesCapillaires = [
    { name: "Kératine et Huile de Coco", category: "Masque capillaire", price: 12, description: "Masque capillaire 1kg à la kératine et huile de coco", image: "https://via.placeholder.com/300x300.png?text=Masque+Keratine+Coco", stock: 30 },
    { name: "Kératine beurre de karité", category: "Masque capillaire", price: 10, description: "Masque capillaire 1kg à la kératine et beurre de karité", image: "https://via.placeholder.com/300x300.png?text=Masque+Keratine+Karite", stock: 30 },
    { name: "Botox", category: "Masque capillaire", price: 16, description: "Masque capillaire 1kg au botox", image: "https://via.placeholder.com/300x300.png?text=Masque+Botox", stock: 30 },
    { name: "Kératine et Argan", category: "Masque capillaire", price: 10, description: "Masque capillaire 1kg à la kératine et huile d'argan", image: "https://via.placeholder.com/300x300.png?text=Masque+Keratine+Argan", stock: 30 },
    { name: "Botox protéine de soie", category: "Masque capillaire", price: 10, description: "Masque capillaire 1kg au botox et protéines de soie", image: "https://via.placeholder.com/300x300.png?text=Masque+Botox+Soie", stock: 30 },
  ];
  
  for (const product of masquesCapillaires) {
    await addProduct(product);
  }
  
  console.log("Masques capillaires ajoutés avec succès.");
}

// Fonction pour ajouter les sprays ménagers
async function addSpraysMenagers() {
  console.log("Ajout des sprays ménagers...");
  
  const spraysMenagers = [
    { name: "Multi-usage senteur H. boss", category: "Spray ménager", price: 7, description: "Spray ménager multi-usage 1L parfum H. boss", image: "https://via.placeholder.com/300x300.png?text=Spray+Multi+Usage", stock: 40 },
    { name: "Détachant textile tous types", category: "Spray ménager", price: 7, description: "Spray détachant pour tous types de textiles 1L", image: "https://via.placeholder.com/300x300.png?text=Spray+Detachant", stock: 40 },
    { name: "Dégraissant ultra concentré", category: "Spray ménager", price: 7, description: "Spray dégraissant ultra concentré 1L", image: "https://via.placeholder.com/300x300.png?text=Spray+Degraissant", stock: 40 },
    { name: "Désinfectant Alimentaire Bacteriol", category: "Spray ménager", price: 7, description: "Spray désinfectant alimentaire 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Desinfectant", stock: 40 },
    { name: "Anti calcaire concentré", category: "Spray ménager", price: 7, description: "Spray anti-calcaire concentré 1L", image: "https://via.placeholder.com/300x300.png?text=Spray+Anti+Calcaire", stock: 40 },
    { name: "Vitre anti-buée concentré", category: "Spray ménager", price: 7, description: "Spray pour vitres anti-buée 1L", image: "https://via.placeholder.com/300x300.png?text=Spray+Vitre", stock: 40 },
    { name: "Spray sanitaire", category: "Spray ménager", price: 7, description: "Spray nettoyant sanitaire 1L", image: "https://via.placeholder.com/300x300.png?text=Spray+Sanitaire", stock: 40 },
    { name: "Gel WC 3en1", category: "Spray ménager", price: 6.5, description: "Gel nettoyant WC 3en1", image: "https://via.placeholder.com/300x300.png?text=Gel+WC", stock: 40 },
    { name: "Dégraissant 5L ultra concentré", category: "Spray ménager", price: 20, description: "Bidon de dégraissant ultra concentré 5L", image: "https://via.placeholder.com/300x300.png?text=Degraissant+5L", stock: 25 },
  ];
  
  for (const product of spraysMenagers) {
    await addProduct(product);
  }
  
  console.log("Sprays ménagers ajoutés avec succès.");
}

// Fonction pour ajouter les sprays d'ambiance
async function addSpraysAmbiance() {
  console.log("Ajout des sprays d'ambiance...");
  
  const spraysAmbiance200ml = [
    { name: "Dash envolée d'air (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Dash envolée d'air 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Dash+200ml", stock: 35 },
    { name: "Bois d'argent (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Bois d'argent 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Bois+Argent+200ml", stock: 35 },
    { name: "Sauvage (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Sauvage 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Sauvage+200ml", stock: 35 },
    { name: "Monoï (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Monoï 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Monoi+200ml", stock: 35 },
    { name: "Amor Amor (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Amor Amor 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Amor+200ml", stock: 35 },
    { name: "La vie est belle (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum La vie est belle 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Vie+Belle+200ml", stock: 35 },
    { name: "La petite robe noire (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum La petite robe noire 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Robe+Noire+200ml", stock: 35 },
    { name: "Black opium (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Black opium 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Black+Opium+200ml", stock: 35 },
    { name: "Lolita (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Lolita 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Lolita+200ml", stock: 35 },
    { name: "La nuit de l'homme (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum La nuit de l'homme 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Nuit+Homme+200ml", stock: 35 },
    { name: "Lenor souffle précieux (200ml)", category: "Spray ambiance", price: 6, description: "Spray d'ambiance parfum Lenor souffle précieux 200ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Lenor+200ml", stock: 35 },
  ];
  
  const spraysAmbiance750ml = [
    { name: "Phantom (750ml)", category: "Spray ambiance", price: 17, description: "Spray d'ambiance parfum Phantom 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Phantom+750ml", stock: 25 },
    { name: "Fahrenheit (750ml)", category: "Spray ambiance", price: 17, description: "Spray d'ambiance parfum Fahrenheit 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Fahrenheit+750ml", stock: 25 },
    { name: "Invictus (750ml)", category: "Spray ambiance", price: 17, description: "Spray d'ambiance parfum Invictus 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Invictus+750ml", stock: 25 },
    { name: "Bubble gum (750ml)", category: "Spray ambiance", price: 17, description: "Spray d'ambiance parfum Bubble gum 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Bubble+Gum+750ml", stock: 25 },
    { name: "Hypnotic Poison (750ml)", category: "Spray ambiance", price: 17, description: "Spray d'ambiance parfum Hypnotic Poison 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Hypnotic+750ml", stock: 25 },
    { name: "Lenor bouquet mystère (750ml)", category: "Spray ambiance", price: 17, description: "Spray d'ambiance parfum Lenor bouquet mystère 750ml", image: "https://via.placeholder.com/300x300.png?text=Spray+Lenor+Bouquet+750ml", stock: 25 },
  ];
  
  // Ajouter les sprays 200ml
  for (const product of spraysAmbiance200ml) {
    await addProduct(product);
  }
  
  // Ajouter les sprays 750ml
  for (const product of spraysAmbiance750ml) {
    await addProduct(product);
  }
  
  console.log("Sprays d'ambiance ajoutés avec succès.");
}

// Fonction pour ajouter les autres produits
async function addAutresProduits() {
  console.log("Ajout des autres produits...");
  
  const autresProduits = [
    { name: "Papier toilette (24 rouleaux)", category: "Hygiène", price: 6.5, description: "Papier toilette triple épaisseur, lot de 24 rouleaux", image: "https://via.placeholder.com/300x300.png?text=Papier+Toilette", stock: 30 },
    { name: "Papier essuie tout (3 bobines)", category: "Hygiène", price: 3.5, description: "Papier essuie tout 3 plis, lot de 3 bobines", image: "https://via.placeholder.com/300x300.png?text=Essuie+Tout", stock: 40 },
    { name: "Liquide vaisselle concentré 5L", category: "Vaisselle", price: 11, description: "Liquide vaisselle concentré format 5 litres", image: "https://via.placeholder.com/300x300.png?text=Liquide+Vaisselle+5L", stock: 25 },
    { name: "Liquide vaisselle concentré 1L", category: "Vaisselle", price: 2.5, description: "Liquide vaisselle concentré format 1 litre", image: "https://via.placeholder.com/300x300.png?text=Liquide+Vaisselle+1L", stock: 40 },
    { name: "Pastilles lave-vaisselle tout-en-un (104 pastilles)", category: "Vaisselle", price: 11, description: "Pastilles lave-vaisselle tout-en-un avec sel intégré, lot de 104 pastilles", image: "https://via.placeholder.com/300x300.png?text=Pastilles+Lave+Vaisselle", stock: 30 },
    { name: "Lot de 6 éponges pro", category: "Entretien", price: 3, description: "Lot de 6 éponges professionnelles", image: "https://via.placeholder.com/300x300.png?text=Eponges+Pro", stock: 50 },
  ];
  
  for (const product of autresProduits) {
    await addProduct(product);
  }
  
  console.log("Autres produits ajoutés avec succès.");
}

// Fonction pour ajouter les lessives
async function addLessives() {
  console.log("Ajout des lessives...");
  
  const lessives = [
    { name: "Ariel original", category: "Lessive", price: 10, description: "Lessive liquide Ariel original, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Ariel", stock: 30 },
    { name: "Skip ultimate", category: "Lessive", price: 10, description: "Lessive liquide Skip ultimate, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Skip", stock: 30 },
    { name: "Lenox souffle précieux", category: "Lessive", price: 10, description: "Lessive liquide Lenox souffle précieux, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Lenox", stock: 30 },
    { name: "Alien mugler", category: "Lessive", price: 10, description: "Lessive liquide parfum Alien mugler, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Alien", stock: 30 },
    { name: "La petite robe noire guerlain", category: "Lessive", price: 10, description: "Lessive liquide parfum La petite robe noire guerlain, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Robe+Noire", stock: 30 },
    { name: "Dash 2en1 envolée d'air", category: "Lessive", price: 10, description: "Lessive liquide Dash 2en1 envolée d'air, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Dash+Air", stock: 30 },
    { name: "Dash 2en1 fleur de lotus", category: "Lessive", price: 10, description: "Lessive liquide Dash 2en1 fleur de lotus, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Dash+Lotus", stock: 30 },
    { name: "Dash 2en1 coup de foudre", category: "Lessive", price: 10, description: "Lessive liquide Dash 2en1 coup de foudre, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Dash+Foudre", stock: 30 },
    { name: "Le chat savon de Marseille", category: "Lessive", price: 10, description: "Lessive liquide Le chat savon de Marseille, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Chat", stock: 30 },
    { name: "Soupline grand air", category: "Lessive", price: 10, description: "Lessive liquide Soupline grand air, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Soupline", stock: 30 },
    { name: "Super croix bora bora", category: "Lessive", price: 10, description: "Lessive liquide Super croix bora bora, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Lessive+Super+Croix", stock: 30 },
  ];
  
  for (const product of lessives) {
    await addProduct(product);
  }
  
  console.log("Lessives ajoutées avec succès.");
}

// Fonction pour ajouter les adoucissants
async function addAdoucissants() {
  console.log("Ajout des adoucissants...");
  
  const adoucissants = [
    { name: "Lenor bouquets mystère", category: "Adoucissant", price: 10, description: "Adoucissant Lenor bouquets mystère, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Lenor+Bouquets", stock: 30 },
    { name: "Lenor envolée d'air", category: "Adoucissant", price: 10, description: "Adoucissant Lenor envolée d'air, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Lenor+Air", stock: 30 },
    { name: "Skip ultimate", category: "Adoucissant", price: 10, description: "Adoucissant Skip ultimate, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Skip", stock: 30 },
    { name: "Lenor kiss", category: "Adoucissant", price: 10, description: "Adoucissant Lenor kiss, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Lenor+Kiss", stock: 30 },
    { name: "Soupline coco fleurs blanches", category: "Adoucissant", price: 10, description: "Adoucissant Soupline coco fleurs blanches, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Soupline+Coco", stock: 30 },
    { name: "Ariel original", category: "Adoucissant", price: 10, description: "Adoucissant Ariel original, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Ariel", stock: 30 },
    { name: "Lenor souffle précieux", category: "Adoucissant", price: 10, description: "Adoucissant Lenor souffle précieux, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Lenor+Souffle", stock: 30 },
    { name: "Dash 2en1 fleur de lotus", category: "Adoucissant", price: 10, description: "Adoucissant Dash 2en1 fleur de lotus, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Dash+Lotus", stock: 30 },
    { name: "Soupline grand air", category: "Adoucissant", price: 10, description: "Adoucissant Soupline grand air, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Soupline+Air", stock: 30 },
    { name: "Savon de Marseille", category: "Adoucissant", price: 10, description: "Adoucissant parfum Savon de Marseille, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Adoucissant+Savon+Marseille", stock: 30 },
  ];
  
  for (const product of adoucissants) {
    await addProduct(product);
  }
  
  console.log("Adoucissants ajoutés avec succès.");
}

// Fonction pour ajouter les nettoyants sols
async function addNettoyantsSols() {
  console.log("Ajout des nettoyants sols...");
  
  const nettoyantsSols10 = [
    { name: "Bubble Gum", category: "Nettoyant sol", price: 10, description: "Nettoyant sol parfum Bubble Gum, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Bubble+Gum", stock: 30 },
    { name: "Malabar", category: "Nettoyant sol", price: 10, description: "Nettoyant sol parfum Malabar, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Malabar", stock: 30 },
    { name: "Savon de Marseille", category: "Nettoyant sol", price: 10, description: "Nettoyant sol parfum Savon de Marseille, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Savon+Marseille", stock: 30 },
    { name: "Soupline", category: "Nettoyant sol", price: 10, description: "Nettoyant sol parfum Soupline, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Soupline", stock: 30 },
    { name: "Monoï", category: "Nettoyant sol", price: 10, description: "Nettoyant sol parfum Monoï, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Monoi", stock: 30 },
  ];
  
  const nettoyantsSols12 = [
    { name: "Bois d'argent", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Bois d'argent, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Bois+Argent", stock: 30 },
    { name: "JPG Le Mâle", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum JPG Le Mâle, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Le+Male", stock: 30 },
    { name: "Ariel original", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Ariel original, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Ariel", stock: 30 },
    { name: "Black Opium", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Black Opium, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Black+Opium", stock: 30 },
    { name: "Dash coup de foudre", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Dash coup de foudre, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Dash+Foudre", stock: 30 },
    { name: "Dash envolée d'air", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Dash envolée d'air, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Dash+Air", stock: 30 },
    { name: "Lolita Lempicka", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Lolita Lempicka, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Lolita", stock: 30 },
    { name: "La vie est belle", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum La vie est belle, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Vie+Belle", stock: 30 },
    { name: "Interdit", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Interdit, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Interdit", stock: 30 },
    { name: "Alien", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Alien, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Alien", stock: 30 },
    { name: "Diesel only the brave", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Diesel only the brave, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Diesel", stock: 30 },
    { name: "Sauvage", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Sauvage, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Sauvage", stock: 30 },
    { name: "Hypnotique Poison", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Hypnotique Poison, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Hypnotique", stock: 30 },
    { name: "One million", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum One million, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+One+Million", stock: 30 },
    { name: "Dior J'adore", category: "Nettoyant sol", price: 12, description: "Nettoyant sol parfum Dior J'adore, bidon 5L", image: "https://via.placeholder.com/300x300.png?text=Nettoyant+Jadore", stock: 30 },
  ];
  
  // Ajouter les nettoyants sols à 10€
  for (const product of nettoyantsSols10) {
    await addProduct(product);
  }
  
  // Ajouter les nettoyants sols à 12€
  for (const product of nettoyantsSols12) {
    await addProduct(product);
  }
  
  console.log("Nettoyants sols ajoutés avec succès.");
}

// Fonction principale pour ajouter tous les produits
async function initializeProducts() {
  try {
    console.log("Début de l'initialisation des produits...");
    
    // Vérifier la connexion à Firebase avant de continuer
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error("Impossible de se connecter à Firebase. Vérifiez votre configuration et vos règles de sécurité.");
      return;
    }
    
    // Ajouter les produits par catégorie
    await addGelsDouches();
    await addMasquesCapillaires();
    await addSpraysMenagers();
    await addSpraysAmbiance();
    await addAutresProduits();
    await addLessives();
    await addAdoucissants();
    await addNettoyantsSols();
    
    console.log("Initialisation des produits terminée avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'initialisation des produits:", error);
  }
}

// Exécuter la fonction d'initialisation
initializeProducts();

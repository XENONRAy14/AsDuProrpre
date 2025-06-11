# MarseilleMart - Site E-commerce

Site e-commerce moderne avec livraison à Marseille et alentours, paiement à la livraison.

## 🚀 Fonctionnalités

- **Catalogue produits** avec recherche et filtres par catégorie
- **Système de panier** avec gestion des quantités
- **Commandes** avec formulaire de livraison complet
- **Tableau de bord admin** pour gérer les commandes
- **Suppression automatique** des commandes après 48h
- **Design responsive** et moderne
- **Paiement à la livraison** uniquement

## 🛠️ Technologies utilisées

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build**: Vite

## 📦 Installation

1. Cloner le projet
2. Installer les dépendances:
   ```bash
   npm install
   ```

3. Configurer Supabase:
   - Créer un projet sur [Supabase](https://supabase.com)
   - Copier `.env.example` vers `.env`
   - Remplir les variables d'environnement Supabase

4. Exécuter les migrations de base de données:
   - Copier le contenu de `supabase/migrations/create_ecommerce_schema.sql`
   - L'exécuter dans l'éditeur SQL de Supabase

5. Déployer la fonction Edge (optionnel):
   - La fonction `cleanup-old-orders` peut être déployée pour automatiser la suppression des commandes anciennes

6. Lancer le serveur de développement:
   ```bash
   npm run dev
   ```

## 🗃️ Structure de la base de données

### Tables principales:

- **products**: Catalogue des produits
- **orders**: Commandes clients
- **order_items**: Articles de chaque commande

### Sécurité:
- Row Level Security (RLS) activé
- Accès public en lecture pour les produits
- Création libre de commandes
- Gestion admin des commandes

## 👨‍💼 Administration

Accès admin via `/admin` avec mot de passe configurable.

Fonctionnalités admin:
- Visualisation de toutes les commandes
- Filtrage par statut
- Mise à jour des statuts
- Suppression des commandes
- Vue détaillée des articles commandés

## 🔄 Nettoyage automatique

La fonction Edge `cleanup-old-orders` supprime automatiquement les commandes de plus de 48h.

Elle peut être appelée:
- Manuellement via HTTP
- Automatiquement via un cron job externe
- Programmée avec les déclencheurs Supabase

## 🚀 Déploiement

Le projet peut être déployé sur:
- **Vercel** (recommandé pour React)
- **Netlify**
- **Supabase Hosting**

Variables d'environnement nécessaires:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD`

## 💡 Fonctionnalités à venir

- Notifications push pour les nouvelles commandes
- Système de stock en temps réel
- Historique des commandes clients
- Statistiques de ventes
- Intégration SMS pour les notifications

## 📱 Responsive Design

Le site est entièrement responsive avec:
- Design mobile-first
- Breakpoints Tailwind CSS
- Navigation adaptative
- Formulaires optimisés mobile

## 🔒 Sécurité

- Validation côté client et serveur
- Protection RLS Supabase
- Sanitisation des données
- Authentification admin sécurisée
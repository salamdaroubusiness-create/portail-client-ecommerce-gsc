# Portail client E-commerce GSC

Portail privé pour les clients accompagnés par GSC Business Center.

## Stack
- React + Vite
- Supabase Auth + PostgreSQL + Row Level Security (RLS)
- Recharts pour les visualisations

## Installation locale
1. Installer Node.js LTS.
2. Copier `.env.example` vers `.env.local`.
3. Renseigner `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
4. Exécuter `npm install`.
5. Exécuter `npm run dev`.

## Déploiement GitHub Pages
Le projet utilise le chemin `/portail-client-ecommerce-gsc/` dans `vite.config.js`.
Après `npm run build`, le contenu de `dist/` peut être publié via GitHub Actions.

## Sécurité impérative
- Ne jamais placer la clé `service_role` dans une variable `VITE_*`, le navigateur ou GitHub.
- La clé publique `anon`/publishable est prévue pour le navigateur, uniquement avec RLS correctement activé.
- Les calculs sensibles doivent être effectués côté serveur (Edge Functions ou backend privé), pas dans le navigateur.
- Chaque table métier doit avoir des politiques RLS qui limitent les lignes au client connecté.
- La visibilité d'un module dans l'interface n'est pas une mesure de sécurité.

## Schéma Supabase attendu
Le projet GSC existant contient notamment :
`profiles`, `clients`, `business_objectives`, `suppliers`, `products`,
`purchase_orders`, `purchase_order_items`, `campaign_kpis`, `kpi_benchmarks`.

Les colonnes exactes doivent être vérifiées dans Supabase avant de brancher les formulaires d'écriture. Le code de départ ne suppose pas que toutes les colonnes métier sont identiques à celles du classeur.

## Publication GitHub
Un workflow GitHub Actions est fourni dans `.github/workflows/deploy.yml`.
Dans le dépôt, activer Settings → Pages → Build and deployment → Source: GitHub Actions.

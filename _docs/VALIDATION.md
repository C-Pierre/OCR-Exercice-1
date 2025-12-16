# VALIDATION.md - Projet 2 - Exercice 1 - Critères de validation ✅

## Fonctionnement

| Critère | Élève | Formateur |
|---------|-------|-----------|
| `ng serve` OK sans erreur | ✅ | ❌ |
| `/` affiche un graphe fonctionnel des pays et totaux | ✅ | ❌ |
| Clic pays → `/country/:id` | ✅ | ❌ |
| `/country/:id` affiche KPI + évolution | ✅ | ❌ |
| Gestion d’ID invalide → message d’erreur / redirect | ✅ | ❌ |
| Responsive testé (desktop / tablette / mobile) | ✅ | ❌ |
| `DataService` centralise toutes les données (zéro tableau en dur dans les composants) | ✅ | ❌ |
| Types TS définis (interfaces) | ✅ | ❌ |
| `README.md` documente installation / structure / décisions | ✅ | ❌ |
| `ARCHITECTURE.md` présent et compréhensible | ✅ | ❌ |


## UI & composants attendus

| Critère | Élève | Formateur |
|---------|-------|-----------|
| HeaderComponent réutilisable : même structure sur page d’accueil et page détail | ✅ | ❌ |
| HeaderComponent affiche titre + indicateurs (libellé + valeur) | ✅ | ❌ |
| DashboardPage utilise HeaderComponent + affiche KPIs (nombre de pays, nombre de JOs) | ✅ | ❌ |
| DashboardPage : pie chart représentant les pays | ✅ | ❌ |
| CountryDetailPage utilise HeaderComponent + affiche KPIs (participations, athlètes, total) | ✅ | ❌ |
| CountryDetailPage : graphique ligne/aire par année | ✅ | ❌ |

## Règles d’affichage

| Critère | Élève | Formateur |
|---------|-------|-----------|
| Totals = gold + silver + bronze | ✅ | ❌ |
| Tri libre (alphabétique ou par total) cohérent Dashboard ↔ Détail | ✅ | ❌ |
| Cliquer un élément du graphe Dashboard → /country/:id | ✅ | ❌ |
| Bouton « Retour » sur la page détail (routerLink="/") | ✅ | ❌ |

## États, accessibilité & responsive

| Critère | Élève | Formateur |
|---------|-------|-----------|
| Loading : squelettes simples ou spinner | ✅ | ❌ |
| Empty : message « Aucune donnée » | ✅ | ❌ |
| Error : message clair + bouton retour | ✅ | ❌ |
| Responsive Desktop ≥ 1200px : 12 colonnes, contenus côte à côte | ✅ | ❌ |
| Responsive Tablette 768–1199px : 8 colonnes, graphe pleine largeur | ✅ | ❌ |
| Responsive Mobile ≤ 767px : 4 colonnes, pile verticale | ✅ | ❌ |
| A11y : contrastes AA | ✅ | ❌ |
| A11y : focus visibles | ✅ | ❌ |
| A11y : aria-label sur boutons/icônes | ✅ | ❌ |
| A11y : descriptions textuelles pour les graphes | ✅ | ❌ |

## Contraintes non fonctionnelles

| Critère | Élève | Formateur |
|---------|-------|-----------|
| Style cohérent et sobre (CSS/SCSS starter ou Angular styles par défaut) | ✅ | ❌ |
| Code : pas de `any`, factorisation des constantes, fichiers < 300 lignes idéalement | ✅ | ❌ |
| Git : commits atomiques et messages clairs (feat, fix, refactor, docs) | ❌ | ❌ |

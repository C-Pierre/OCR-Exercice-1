# README.md - Projet 2 - Exercice 1

## Réalisation
- Du 16/12/2025 au 20/12/2025

## Installation
- Lancer la commande `npm install && ng serve`

## Structure
- Le détail de la structure de l'application est disponible dans `_docs/ARCHITECTURE.md`.

## Décisions

### Données
- Toute la logique sur le traitement des données est dans le `services/data.service.ts`.

### Graphiques
- En fonction des données fournises aux graphiques, les graphiques adaptent le contenu.
- Sur la page d'acceuil il est possbile de trier le grpahique par type de médailles.
- Sur la page d'un pays il est possible de masquer / afficher les différents éléments présents dans le graphique.

### Loader
- Un loader générique pour toute l'application a était mit en place dans `components/loader/`.

### CSS
- L'essentiel du CSS est dans le fichier `src/styles.scss`
- Le `header.component.html` a également était stylisé via le fichier `header.component.scss`
- Le `loader.component.html` a également était stylisé via le fichier `loader.component.scss`

## Gestion des erreurs
- Si le pays n'existe pas ou que le nom n'est pas trouvé, l'utilisateur est re-dirigé vers la page `/not-found` depuis `/country/{:id}`, un bouton retour permet alors de revenir à la page d'acceuil.

## Accessibilité
- Les éléments d'accebilités ont étés mis en place notamment sur les boutons, titres, images et éléments des graphiques.
- Les couleurs et éléments de fonts ont étés adaptés en conséquent.
- Il est possible de revenir à la page d'acceuil via le H1 de la page, notamment au clavier, partour sur l'application.

## Critères de validation
- Un fichier est à dispostion dans `_docs/VALIDATION.md`.
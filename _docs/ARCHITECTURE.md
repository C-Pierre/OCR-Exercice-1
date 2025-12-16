# ARCHITECTURE.md - Projet 2 - Exercice 1

## Arborescence
- _docs/
    - REAMDE.md
    - ARCHITECTURE.md
    - VALIDATION.md
- src/
    - app/
        - components/
            - header/
            - loader/
        - core/
            - enums/
                - === les enums pour le type de médaille
            - models/
                - === les différentes interfaces
            - services/
                === les serivces pour récupérer les données et préparer les graphiques
        - pages/
            - country/
            - home/
            - not-found/
        - app-routing.module.ts
            - === le fichier responsable du routing
        - app.module.ts
            - === le fichier responsable de la décaration des modules pour qu'ils soient accessibles dans l'application
    - assets/
        - images/
        - mock/
            - olympic.json
                - === le jeu de données
    - environments/
    - index.html
        - === la structure de base identique pour toutes les pages HTML de l'application
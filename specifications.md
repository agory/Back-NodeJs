#Manga-Drein

##Contexte
Imaginez que vous parcourez les bibliothèques de la Fnac, 
à la recherche d'un manga que vous recherchez frénétiquement.

Vous avez votre smartphone en main et vous lancez l'application 
Manga-Drein.

Vous approchez fébrilement votre smartphone du manga afin de scanner le code
barre.
 
Toutes les informations du manga s'affichent alors dans l'application.
Et si vous cliquez sur le gros bouton, vous pouvez télécharger
les scans du manga.
 
Vous répétez cette opération pour chaque manga de votre choix et 
vous rentrez chez vous afin de lire vos trouvailles 
tranquillement dans votre lit.
 
L’idée principale de l’application est de pouvoir, à travers 
une interface ergonomique et simple, connaître les principales
informations d'un manga via son code-barre.
 
Les informations des manga proviennent de l'API des livres de
Google qui recense les manga vendus dans le monde.
  
## Cas d'utilisation
Lors de la première utilisation, l’utilisateur devra se créer un
compte. Ce compte peut être uniquement lié à l’application ou 
bien il peut s’agir d’une authentification OAuth 2.0

Un utilisateur scanne les codes-barres des mangas qu’il veut lire

Pour chaque manga scanné, un résumé s’affiche et résume les 
informations du manga

L'utilisateur peut accéder à son historique de recherche

L'historique est rattaché au compte utilisateur

L'utilisateur peut télécharger et lire les scans du manga

## Cahier des charges
### Objectifs
- Application mobile Android native ou hybride (Ionic, React Native)
- Utilisation de la caméra pour scanner des codes-barres (API Google)
- Compte utilisateur
  - Compte propre à l’application et/ou
  - Compte issu d’une authentification OAuth 2.0 (Microsoft, 
  Google, Facebook, Twitter)
- Historisation en ligne des dernières recherches

### Bonus
- Peut lire les scans en ligne (Nouvelle API - comme amazon preview)
- Peut fonctionner en local (consultation de manga déjà vus 
hors connexion) base de données SQLite avec Room par exemple
- Logo et nom pour l'application réfléchis et stylés
- Application multilingue (français/anglais/espagnol)
- Toute autre killer feature
  
## Solution technique
### Gestion de projet
- Gestion de suivi du projet Trello (gratuit)
- Gestion de versions Git avec GitHub

### Back
- NodeJS (Express) - Rapide, efficace très bonne comptabilité
avec le JSON (API Google) grâce à JavaScript, il convient
parfaitement au projet

### Front
- Ionic - Solution hybride qui fonctionne sur tous les mobiles
ou sur le web. Basé sur du JavaScript (Angular) qui permet 
d'avoir une continuité avec le JavaScript de NodeJS

### API Google books
Informations et accès à l'API Google Books
https://developers.google.com/books/

Exemple d'appel (One Piece T1) https://www.googleapis.com/books/v1/volumes?q=978-2-7234-8852-5

Utilisable jusqu'à 100k/jour ; ce qui est suffisant pour un projet étudiant

##Liens utiles
- notre git : https://github.com/Polytech-Codev/
- notre Trello : https://trello.com/b/79Ll2Puh/manga-drein
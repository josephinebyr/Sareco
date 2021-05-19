# Sareco
Ce projet avait pour but de créer un outil cartographique et interactif de visualisation de données des équipements en voiture des ménages en France.

Il consiste en l’élaborationd’un site WEB qui sera utilisé en interne dans l’entreprise SARECO. Il y sera possible de visualiser différents indicateurs avec une carte interactive s’affichant lorsque l’on clique sur un indicateur, et les graphiques associés à l’indicateur lorsque l’on clique sur une ville située sur la carte.
Pour installer le site WEB, il faut le logiciel PostgreSQL et pgAdmin, le logiciel MAMP ou un logiciel similaire (XAMPP, LAMP) qui sont des logiciels permettant l’utilisation d’un service web local, et un langage de programmation tel que Python.

Ce guide permet de décrire les principales fonctionnalités du site.

## Utilisation du site

Le site Sarecoscope se présente comme suit :
<img width="360" alt="image" src="https://user-images.githubusercontent.com/64350173/118865403-2e5e0c80-b8e1-11eb-93e7-dbca1390def5.png">
Figure 1 - Aperçu du site

Nous avons le titre du site en haut à gauche avec le logo de Sareco en haut à droite de la page.
Le côté gauche du site est spécifique aux choix des paramètres et des indicateurs.
Le centre du site correspond à l’affichage de la carte (affichage de la carte vierge et affichage de(s) carte(s) reliée(s) aux indicateurs). L‘affichage du/des tableau(x) de l’indicateur « Distribution du nombre de voitures à disposition des ménages » est en dessous de la carte.
Le côté droit de la carte est spécifique à la recherche d’une commune grâce à la barre de recherche, à l’affichage des graphiques et à la sauvegarde de ceux-ci au format .png et .xlsx.

### Zoom sur la partie gauche du site
Avant d’afficher un indicateur, il faut préciser l'échelle (commune ou IRIS) l’année d’étude.
<img src="https://user-images.githubusercontent.com/64350173/118864865-ae37a700-b8e0-11eb-8cc4-e741f65c1059.png" width="400">
Figure 2 - Panneau de choix des paramètres

Puis le choix des indicateurs est détaillé ci-dessous :

<img src="https://user-images.githubusercontent.com/64350173/118865067-e0e19f80-b8e0-11eb-934d-b69ae89311a4.png" width="400">
Figure 3 - Panneau de choix des indicateurs

Le tableau décrivant la distribution du nombre de voitures à disposition des ménages s’affiche comme ci-dessous :
<img width="360" alt="image" src="https://user-images.githubusercontent.com/64350173/118865420-3453ed80-b8e1-11eb-9135-682bf02d2aa8.png">
Figure 4 - Affichage du tableau de distribution du nombre de voitures à disposition des ménages

### Zoom sur le reste du site :

La carte dispose de deux fonds cartographiques (un simple et un détaillé) et d’un fond avec des orthophotographies. Pour choisir un fond, cliquer sur l’icône en haut à droite de la carte. Lorsque vous naviguez sur la carte, la commune sur laquelle se trouve la souris se démarque des autres avec un contour noir plein. 
<img src="https://user-images.githubusercontent.com/64350173/118865295-138b9800-b8e1-11eb-8fc0-9166e83cd13a.png" width="400">
Figure 5 - Mise en évidence de la commune au passage de la souris, description des commandes liées à la carte

Lorsque vous avez choisi un indicateur comme expliqué précédemment, vous pouvez cliquer sur une commune de France, cela fera apparaître automatiquement un graphique sur le côté droit du site.
Pour trouver une commune plus facilement, vous pouvez la chercher grâce à la barre de recherche à droite de la carte et en appuyant sur rechercher. La carte s’actualisera en zoomant sur cette commune.

### Sauvegarde des données :
Vous pouvez télécharger la vue de la carte en cliquant sur le bouton situé en dessous de la carte ou en cliquant sur l’icône de téléchargement à gauche de la carte.
Vous pouvez sauvegarder les graphiques en format .png ou .xlsx en cliquant sur les boutons prévus à cet effet (cf. schéma ci-dessous).
<img width="482" alt="image" src="https://user-images.githubusercontent.com/64350173/118865509-4c2b7180-b8e1-11eb-9327-d67c74706288.png">
Figure 6 - Détail du panneau de droite

Une vidéo vous est fournie en supplément de ce guide, pour comprendre plus facilement le fonctionnement de votre site.

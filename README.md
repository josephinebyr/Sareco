# Sareco
Ce projet avait pour but de créer un outil cartographique et interactif de visualisation de données des équipements en voiture des ménages en France.

Il consiste en l’élaborationd’un site WEB qui sera utilisé en interne dans l’entreprise SARECO. Il y sera possible de visualiser différents indicateurs avec une carte interactive s’affichant lorsque l’on clique sur un indicateur, et les graphiques associés à l’indicateur lorsque l’on clique sur une ville située sur la carte.
Pour installer le site WEB, il faut le logiciel PostgreSQL et pgAdmin, le logiciel MAMP ou un logiciel similaire (XAMPP, LAMP) qui sont des logiciels permettant l’utilisation d’un service web local, et un langage de programmation tel que Python.

L’installation du site se déroule comme suit :

## Installation de MAMP

Pour installer MAMP, allez sur le site : Téléchargements - MAMP & MAMP PRO. 
Il faut télécharger le logiciel pour son type d’environnement d’ordinateur. 
Suivez les instructions de l’installeur. Pour plus de renseignements sur l’installation de MAMP, rendez-vous sur le site suivant :

https://documentation.mamp.info/en/MAMP-Windows/ pour Windows

https://documentation.mamp.info/en/MAMP-Mac/ pour macOS.


Ouvrez MAMP et reliezle serveur à notre dossier Sarecoscope qui contient les codes informatiques (.html, .css, .js, .php).
Pour cela, il faut aller dans l’onglet MAMP ->Préférences -> WebServer -> Select-> Sarecoscope

<img src="https://user-images.githubusercontent.com/83586437/117989676-d3567380-b33c-11eb-846a-5d984776a6bd.png" width="400">


Une fois le dossier sélectionné, on valide. Démarrez la connexion en cliquant sur Start. Vérifiez qu'Apache et MySQLserver sont bien cochés en vert.

## Installation de PostgreSQL

Pour télécharger PostgreSQL, il faut aller sur le site PostgreSQL: Downloads et télécharger la versioncorrespondant à son type d’environnement (Windows, macOS, Linux...). 
Suivez les étapes de l’installeur pour terminer l’installation.
pgAdmin est une interface permettant de manipuler les bases de données PostgreSQL.

Vous pouvez la télécharger sur : https://www.pgadmin.org/download/.

Pour consulter la documentation officielle : https://www.pgadmin.org/docs/pgadmin4/latest/index.html

[WINDOWS] Pour ouvrir pgAdmin, il faut aller dans les PROGRAMMES ->PostgreSQL ->13 -> pgAdmin 4 -> bin et ouvrir pgAdmin 4.
<img src="https://user-images.githubusercontent.com/83586437/117990197-35af7400-b33d-11eb-9c5e-82b32a257078.png" width="400">


[macOS] Déplacez le raccourci pgAdmin dans le dossier Applications, puis cliquez dessus pour ouvrir l’application.


PgAdmin s’ouvre dans une page web, entrez le mot de passe par défaut : postgres.

<img src="https://user-images.githubusercontent.com/83586437/117990265-4b249e00-b33d-11eb-8cf4-29401a8072f1.png" width="400">

Il faut ensuite ouvrir l’onglet serveur et insérer le mot de passe : postgres.

<img src="https://user-images.githubusercontent.com/83586437/117990328-5b3c7d80-b33d-11eb-9ae3-1ecc887341e3.png" width="400">


## Chargement de la base de données sur PostgreSQL

Il faut ensuite remplir la base de données : 
La base de données est dans le fichier export.sql. Pour l’importer dans pgAdmin :

1.	Créez une nouvelle base de données (clic droit sur ‘Databases’ à gauche > Create > Database...).

<img src="https://user-images.githubusercontent.com/83586437/117991299-35fc3f00-b33e-11eb-82f6-604ca577faa1.png" width="400">

2.	Donnez-lui un nom : attention, il faut impérativement la nommer PRINC18

<img src="https://user-images.githubusercontent.com/83586437/117990481-7e672d00-b33d-11eb-8663-c8663dfb1b69.png" width="400">

3.	Cliquez sur Save en bas à droite, la nouvelle base de données apparaît dans le menu déroulant à gauche.
4.	Pour la connecter au fichier export.sql et donc l’importer dans pgAdmin, effectuez un clic droit sur la base de données PRINC18 >Restore... 

<img src= "https://user-images.githubusercontent.com/83586437/117991429-54fad100-b33e-11eb-8738-8d5087077e25.png" width="400">

5.	Dans l’onglet Général, remplissez le champ Filename avec la direction vers votre fichier PRINC18.sql (il vous est fourni dans le dossierSarecoscope/bdd/) pour charger le fichier depuis votre disque local.
6.	Si le fichier n’apparait pas, changez le type de fichier en bas à droite en sql.

<img src= "https://user-images.githubusercontent.com/83586437/117991711-9a1f0300-b33e-11eb-9af1-297177f470f6.png" width="200">

Donnez-lui un nom : attention, il faut impérativement la nommer PRINC18 

<img src= "https://user-images.githubusercontent.com/83586437/117991932-c9ce0b00-b33e-11eb-93ef-ea1b74c16f1d.png" width="400">

Vous devriez voir une barre de progression en bas à droite, une fois le chargement effectué, vous devriez voir les tables de données apparaitre dans PRINC18 >Schemas >Tables. Il y en a 38.

<img src= "https://user-images.githubusercontent.com/83586437/117991991-da7e8100-b33e-11eb-80e9-799e5c85901e.png" width="400">

Réitérez les étapes pour importer le fichier PRINC8.sql dans la base de données.

## Lancement du site internet depuis un navigateur

Dans un navigateur internet (Chrome par exemple), entrez dans la barre de recherche située tout en haut :
Localhost(ou localhost:8888 si c’est un mac).
Le site doit alors se lancer !









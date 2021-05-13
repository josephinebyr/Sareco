<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


// Informations concernant la base de données
  $dbconn = pg_connect("host=localhost port=5432 dbname=PRINC8 user=postgres password=postgres")
  or die('Connexion impossible : ' . pg_last_error());


?>

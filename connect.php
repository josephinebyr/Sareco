<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


// Informations concernant la base de données


  $dbconn = pg_connect("host=localhost port=5432 dbname=PRINC18 user=postgres password=postgres")
  or die('Connexion impossible : ' . pg_last_error());

/*  $query = "SELECT * FROM btx_td_princ18_2006_arm";

  $result=pg_query($dbconn , $query);
  $r=[];
  while ($row = pg_fetch_row($result)) {
    $r[]= $row;
  }
  echo json_encode($r); */

?>

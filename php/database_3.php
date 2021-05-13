<?php
include('connect_PRINC18.php');

$echelle = $_POST["echelle"];

$libgeo_com = $_POST["libgeo_com"];

if($echelle == "Communes"){

if(isset($_POST["requete"])){

$requeteTM = "SELECT * FROM EVOL_TXM_PRINC18 WHERE libgeo LIKE $libgeo_com";


$result=pg_query($dbconn , $requeteTM);
$tableauTM=array();
while ($ligne = pg_fetch_row($result)) {
  $tableauTM[]= $ligne;
}

echo json_encode($tableauTM,JSON_NUMERIC_CHECK);

}

} else {

}
?>

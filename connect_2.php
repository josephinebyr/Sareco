<?php 

    /*try {
        $conn=pg_connect("host=localhost port=5432 dname=sarecoscope user=postgres password=postgres");
    
    } Catch (Exception $e) {
        echo $e->getMessage();
    }
    //return $conn;
    if (!$conn) {
        echo ("Database Connection Error");
        return $conn;
    } else {
        echo ("ok");
    };*/

    /*function exception_error_handler($errno, $errstr, $errfile, $errline ) {
        throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
    }
    set_error_handler("exception_error_handler");*/
    
    /*try {
        $conn=@pg_connect("host=localhost port=5432 dbname=sarecoscope user=postgres password=postgres");
    } Catch (Exception $e) {
        Echo $e->getMessage();
    }*/

    /*$query = 'SELECT * FROM authors';
    $result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());
    
    if ($result = pg_query($link, $requete)) {
    //3-récupérer une liste d'objet contenant la valeur
          //on recup chaque ligne du résultat sous forme de tableau associatif
        while ($array = mysqli_fetch_assoc($result)) {
            //$liste_objet_debut= $objet; //fait pour return 1 seul objet
            $liste_objet[] = $array;
        } 
    }
    echo json_encode($liste_objet, JSON_NUMERIC_CHECK);*/
    
?>
<?php
    // Connexion, sélection de la base de données
    $dbconn = pg_connect("host=localhost dbname=sarecoscope user=postgres password=postgres")
        or die('Connexion impossible : ' . pg_last_error());

    // Exécution de la requête SQL
    $query = 'SELECT taux_motorisation, insee_com FROM indicateurs_iris';
    $result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());

    // Affichage des résultats en HTML
    //echo "<table>\n";
    while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
        //echo "\t<tr>\n";
        foreach ($line as $col_value) {
            //echo "\t\t<td>$col_value</td>\n";
        }
        //echo "\t</tr>\n";
        $liste_objet[] = $line;
    }
    //echo "</table>\n";
    echo json_encode($liste_objet, JSON_NUMERIC_CHECK);

    /*$data = array();

    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }*/

    // Libère le résultat
    pg_free_result($result);

    // Ferme la connexion
    pg_close($dbconn);
?>


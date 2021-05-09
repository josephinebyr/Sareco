<?php
include('connect.php');
$annee="btx_td_princ18_2006_arm";


$commune='13201 OR codgeo = 13202';

if(isset($_POST["A1"])){

$requeteA1 = "SELECT CS1_81_TYPLR1_VOIT0 + CS1_82_TYPLR1_VOIT0 + CS1_83_TYPLR1_VOIT0 + CS1_84_TYPLR1_VOIT0 + CS1_85_TYPLR1_VOIT0 + CS1_86_TYPLR1_VOIT0 +
 CS1_87_TYPLR1_VOIT0 + CS1_88_TYPLR1_VOIT0 + CS1_81_TYPLR2_VOIT0 + CS1_82_TYPLR2_VOIT0 + CS1_83_TYPLR2_VOIT0 + CS1_84_TYPLR2_VOIT0 + CS1_85_TYPLR2_VOIT0 + CS1_86_TYPLR2_VOIT0 +
 CS1_87_TYPLR2_VOIT0 + CS1_88_TYPLR2_VOIT0 + CS1_81_TYPLR3_VOIT0 + CS1_82_TYPLR3_VOIT0 + CS1_83_TYPLR3_VOIT0 + CS1_84_TYPLR3_VOIT0 + CS1_85_TYPLR3_VOIT0 + CS1_86_TYPLR3_VOIT0 +
 CS1_87_TYPLR3_VOIT0 + CS1_88_TYPLR3_VOIT0 AS A1, codgeo FROM $annee WHERE codgeo= $commune;";


$result=pg_query($dbconn , $requeteA1);
$r=[];
while ($row = pg_fetch_row($result)) {
  $r[]= $row;
}
echo json_encode($r);
}

if(isset($_POST["A2"])){

$requeteA1 = "SELECT CS1_81_TYPLR1_VOIT1 + CS1_82_TYPLR1_VOIT1 + CS1_83_TYPLR1_VOIT1 + CS1_84_TYPLR1_VOIT1 + CS1_85_TYPLR1_VOIT1 + CS1_86_TYPLR1_VOIT1 +
 CS1_87_TYPLR1_VOIT1 + CS1_88_TYPLR1_VOIT1 + CS1_81_TYPLR2_VOIT1 + CS1_82_TYPLR2_VOIT1 + CS1_83_TYPLR2_VOIT1 + CS1_84_TYPLR2_VOIT1 + CS1_85_TYPLR2_VOIT1 + CS1_86_TYPLR2_VOIT1 +
 CS1_87_TYPLR2_VOIT1 + CS1_88_TYPLR2_VOIT1 + CS1_81_TYPLR3_VOIT1 + CS1_82_TYPLR3_VOIT1 + CS1_83_TYPLR3_VOIT1 + CS1_84_TYPLR3_VOIT1 + CS1_85_TYPLR3_VOIT1 + CS1_86_TYPLR3_VOIT1 +
 CS1_87_TYPLR3_VOIT1 + CS1_88_TYPLR3_VOIT1 AS A2, codgeo FROM $annee WHERE codgeo= $commune;";


$result=pg_query($dbconn , $requeteA2);
$r=[];
while ($row = pg_fetch_row($result)) {
  $r[]= $row;
}
echo json_encode($r);
}

if(isset($_POST["A3"])){

$requeteA1 = "SELECT CS1_81_TYPLR1_VOIT2 + CS1_82_TYPLR1_VOIT2 + CS1_83_TYPLR1_VOIT2 + CS1_84_TYPLR1_VOIT2 + CS1_85_TYPLR1_VOIT2 + CS1_86_TYPLR1_VOIT2 +
 CS1_87_TYPLR1_VOIT2 + CS1_88_TYPLR1_VOIT2 + CS1_81_TYPLR2_VOIT2 + CS1_82_TYPLR2_VOIT2 + CS1_83_TYPLR2_VOIT2 + CS1_84_TYPLR2_VOIT2 + CS1_85_TYPLR2_VOIT2 + CS1_86_TYPLR2_VOIT2 +
 CS1_87_TYPLR2_VOIT2 + CS1_88_TYPLR2_VOIT2 + CS1_81_TYPLR3_VOIT2 + CS1_82_TYPLR3_VOIT2 + CS1_83_TYPLR3_VOIT2 + CS1_84_TYPLR3_VOIT2 + CS1_85_TYPLR3_VOIT2 + CS1_86_TYPLR3_VOIT2 +
 CS1_87_TYPLR3_VOIT2 + CS1_88_TYPLR3_VOIT2 AS A3, codgeo FROM $annee WHERE codgeo= $commune;";


$result=pg_query($dbconn , $requeteA3);
$r=[];
while ($row = pg_fetch_row($result)) {
  $r[]= $row;
}
echo json_encode($r);
}

if(isset($_POST["A4"])){

$requeteA1 = "SELECT CS1_81_TYPLR1_VOIT3 + CS1_82_TYPLR1_VOIT3 + CS1_83_TYPLR1_VOIT3 + CS1_84_TYPLR1_VOIT3 + CS1_85_TYPLR1_VOIT3 + CS1_86_TYPLR1_VOIT3 +
 CS1_87_TYPLR1_VOIT3 + CS1_88_TYPLR1_VOIT3 + CS1_81_TYPLR2_VOIT3 + CS1_82_TYPLR2_VOIT3 + CS1_83_TYPLR2_VOIT3 + CS1_84_TYPLR2_VOIT3 + CS1_85_TYPLR2_VOIT3 + CS1_86_TYPLR2_VOIT3 +
 CS1_87_TYPLR2_VOIT3 + CS1_88_TYPLR2_VOIT3 + CS1_81_TYPLR3_VOIT3 + CS1_82_TYPLR3_VOIT3 + CS1_83_TYPLR3_VOIT3 + CS1_84_TYPLR3_VOIT3 + CS1_85_TYPLR3_VOIT3 + CS1_86_TYPLR3_VOIT3 +
 CS1_87_TYPLR3_VOIT3 + CS1_88_TYPLR3_VOIT3 AS A4, codgeo FROM $annee WHERE codgeo= $commune;";


$result=pg_query($dbconn , $requeteA4);
$r=[];
while ($row = pg_fetch_row($result)) {
  $r[]= $row;
}
echo json_encode($r);
}

if(isset($_POST["A5_2007"])){
$requeteA5= "SELECT CS1_81_TYPLR1_VOIT0+ CS1_81_TYPLR1_VOIT1+ CS1_81_TYPLR1_VOIT2+CS1_81_TYPLR1_VOIT3+ CS1_82_TYPLR1_VOIT0+ CS1_82_TYPLR1_VOIT1+ CS1_82_TYPLR1_VOIT2+ CS1_82_TYPLR1_VOIT3+
CS1_83_TYPLR1_VOIT0+ CS1_83_TYPLR1_VOIT1+ CS1_83_TYPLR1_VOIT2+ CS1_83_TYPLR1_VOIT3+ CS1_84_TYPLR1_VOIT0+ CS1_84_TYPLR1_VOIT1+ CS1_84_TYPLR1_VOIT2+ CS1_84_TYPLR1_VOIT3+ CS1_85_TYPLR1_VOIT0+ CS1_85_TYPLR1_VOIT1+
CS1_85_TYPLR1_VOIT2+ CS1_85_TYPLR1_VOIT3+ CS1_86_TYPLR1_VOIT0+ CS1_86_TYPLR1_VOIT1+ CS1_86_TYPLR1_VOIT2+ CS1_86_TYPLR1_VOIT3+ CS1_87_TYPLR1_VOIT0+CS1_87_TYPLR1_VOIT1+ CS1_87_TYPLR1_VOIT2+ CS1_87_TYPLR1_VOIT3+ CS1_88_TYPLR1_VOIT0+
CS1_88_TYPLR1_VOIT1+ CS1_88_TYPLR1_VOIT2+ CS1_88_TYPLR1_VOIT3+ CS1_81_TYPLR2_VOIT0+ CS1_81_TYPLR2_VOIT1+ CS1_81_TYPLR2_VOIT2+ CS1_81_TYPLR2_VOIT3+ CS1_82_TYPLR2_VOIT0+ CS1_82_TYPLR2_VOIT1+ CS1_82_TYPLR2_VOIT2+ CS1_82_TYPLR2_VOIT3+
CS1_83_TYPLR2_VOIT0+CS1_83_TYPLR2_VOIT1+ CS1_83_TYPLR2_VOIT2+ CS1_83_TYPLR2_VOIT3+ CS1_84_TYPLR2_VOIT0+ CS1_84_TYPLR2_VOIT1+ CS1_84_TYPLR2_VOIT2+ CS1_84_TYPLR2_VOIT3+ CS1_85_TYPLR2_VOIT0+ CS1_85_TYPLR2_VOIT1+ CS1_85_TYPLR2_VOIT2+ CS1_85_TYPLR2_VOIT3+
CS1_86_TYPLR2_VOIT0+ CS1_86_TYPLR2_VOIT1+ CS1_86_TYPLR2_VOIT2+ CS1_86_TYPLR2_VOIT3+ CS1_87_TYPLR2_VOIT0+ CS1_87_TYPLR2_VOIT1+ CS1_87_TYPLR2_VOIT2+ CS1_87_TYPLR2_VOIT3+ CS1_88_TYPLR2_VOIT0+ CS1_88_TYPLR2_VOIT1+ CS1_88_TYPLR2_VOIT2+ CS1_88_TYPLR2_VOIT3+
CS1_81_TYPLR3_VOIT0+ CS1_81_TYPLR3_VOIT1+ CS1_81_TYPLR3_VOIT2+ CS1_81_TYPLR3_VOIT3+ CS1_82_TYPLR3_VOIT0+ CS1_82_TYPLR3_VOIT1+ CS1_82_TYPLR3_VOIT2+ CS1_82_TYPLR3_VOIT3+ CS1_83_TYPLR3_VOIT0+ CS1_83_TYPLR3_VOIT1+ CS1_83_TYPLR3_VOIT2+ CS1_83_TYPLR3_VOIT3+
CS1_84_TYPLR3_VOIT0+ CS1_84_TYPLR3_VOIT1+ CS1_84_TYPLR3_VOIT2+ CS1_84_TYPLR3_VOIT3+ CS1_85_TYPLR3_VOIT0+ CS1_85_TYPLR3_VOIT1+ CS1_85_TYPLR3_VOIT2+ CS1_85_TYPLR3_VOIT3+
CS1_86_TYPLR3_VOIT0+ CS1_86_TYPLR3_VOIT1+ CS1_86_TYPLR3_VOIT2+CS1_86_TYPLR3_VOIT3+ CS1_87_TYPLR3_VOIT0+ CS1_87_TYPLR3_VOIT1+ CS1_87_TYPLR3_VOIT2+ CS1_87_TYPLR3_VOIT3+ CS1_88_TYPLR3_VOIT0+ CS1_88_TYPLR3_VOIT1+ CS1_88_TYPLR3_VOIT2+ CS1_88_TYPLR3_VOIT3
AS A5_2007 FROM btx_td_princ18_2007 ";

$result=pg_query($dbconn , $requeteA5);
$r=[];
while ($row = pg_fetch_row($result)) {
  $r[]= $row;
}
echo json_encode($r);
}

if(isset($_POST["A6"])){
$requeteA6= "SELECT CS1_81_TYPLR1_VOIT0+CS1_82_TYPLR1_VOIT0+CS1_83_TYPLR1_VOIT0+CS1_85_TYPLR1_VOIT0+CS1_86_TYPLR1_VOIT0+CS1_87_TYPLR1_VOIT0+CS1_88_TYPLR1_VOIT0  AS A6_2007 FROM btx_td_princ18_2007";

$result=pg_query($dbconn , $requeteA6);
$r=[];
while ($row = pg_fetch_row($result)) {
  $r[]= $row;
}
echo json_encode($r);
}

if(isset($_POST["A7_2007"])){
        $requeteA7_2007= "SELECT
        CS1_81_TYPLR1_VOIT1+CS1_82_TYPLR1_VOIT1+CS1_83_TYPLR1_VOIT1+CS1_85_TYPLR1_VOIT1
        +CS1_86_TYPLR1_VOIT1+CS1_87_TYPLR1_VOIT1+CS1_88_TYPLR1_VOIT1  AS A7_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA7_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA7_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA7_2007);}



    if(isset($_POST["A8_2007"])){
        $requeteA8_2007= "SELECT
        CS1_81_TYPLR1_VOIT2+CS1_82_TYPLR1_VOIT2+CS1_83_TYPLR1_VOIT2+CS1_85_TYPLR1_VOIT2
        +CS1_86_TYPLR1_VOIT2 +CS1_87_TYPLR1_VOIT2+CS1_88_TYPLR1_VOIT2  AS A8_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA8_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA8_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA8_2007);
            }

    if(isset($_POST["A9_2007"])){
        $requeteA9_2007="SELECT
        CS1_81_TYPLR1_VOIT3+CS1_82_TYPLR1_VOIT3+CS1_83_TYPLR1_VOIT3+CS1_85_TYPLR1_VOIT3
        +CS1_86_TYPLR1_VOIT3+CS1_87_TYPLR1_VOIT3+CS1_88_TYPLR1_VOIT3  AS A9_2007 FROM btx_td_princ18_2007 ";
        if ($result =pg_query($link,$requeteA9_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA9_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA9_2007);
                }


    if(isset($_POST["A10_2007"])){
        $requeteA10_2007= "SELECT CS1_81_TYPLR1_VOIT0+CS1_82_TYPLR1_VOIT0+CS1_83_TYPLR1_VOIT0+CS1_85_TYPLR1_VOIT0
        +CS1_86_TYPLR1_VOIT0+CS1_87_TYPLR1_VOIT0+CS1_88_TYPLR1_VOIT0+
        CS1_81_TYPLR1_VOIT1+CS1_82_TYPLR1_VOIT1+CS1_83_TYPLR1_VOIT1+CS1_85_TYPLR1_VOIT1
        +CS1_86_TYPLR1_VOIT1+CS1_87_TYPLR1_VOIT1+CS1_88_TYPLR1_VOIT1+
        CS1_81_TYPLR1_VOIT2+CS1_82_TYPLR1_VOIT2+CS1_83_TYPLR1_VOIT2+CS1_85_TYPLR1_VOIT2
        +CS1_86_TYPLR1_VOIT2+CS1_87_TYPLR1_VOIT2+CS1_88_TYPLR1_VOIT2+
        CS1_81_TYPLR1_VOIT3+CS1_82_TYPLR1_VOIT3+CS1_83_TYPLR1_VOIT3+CS1_85_TYPLR1_VOIT3
        +CS1_86_TYPLR1_VOIT3+CS1_87_TYPLR1_VOIT3+CS1_88_TYPLR1_VOIT3  AS A10_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA10_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA10_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA10_2007);
            }

    if(isset($_POST["A11_2007"])){
        $requeteA11_2007= "SELECT
        CS1_81_TYPLR2_VOIT0+CS1_82_TYPLR2_VOIT0+CS1_83_TYPLR2_VOIT0+CS1_85_TYPLR2_VOIT0
        +CS1_86_TYPLR2_VOIT0+CS1_87_TYPLR2_VOIT0+CS1_88_TYPLR2_VOIT0  AS A11_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA11_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA11_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA11_2007);
            }


    if(isset($_POST["A12_2007"])){
        $requeteA12_2007= "SELECT
        CS1_81_TYPLR2_VOIT1+CS1_82_TYPLR2_VOIT1+CS1_83_TYPLR2_VOIT1+CS1_85_TYPLR2_VOIT1
        +CS1_86_TYPLR2_VOIT1+CS1_87_TYPLR2_VOIT1+CS1_88_TYPLR2_VOIT1  AS A12_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA12_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA12_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA12_2007);
            }


    if(isset($_POST["A13_2007"])){
        $requeteA13_2007="SELECT
        CS1_81_TYPLR2_VOIT2+CS1_82_TYPLR2_VOIT2+CS1_83_TYPLR2_VOIT2+CS1_85_TYPLR2_VOIT2
        +CS1_86_TYPLR2_VOIT2+CS1_87_TYPLR2_VOIT2+CS1_88_TYPLR2_VOIT2  AS A13_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA13_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA13_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA13_2007);}

    if(isset($_POST["A14_2007"])){
        $requeteA14_2007= "SELECT
        CS1_81_TYPLR2_VOIT3+CS1_82_TYPLR2_VOIT3+CS1_83_TYPLR2_VOIT3+CS1_85_TYPLR2_VOIT3
        +CS1_86_TYPLR2_VOIT3+CS1_87_TYPLR2_VOIT3+CS1_88_TYPLR2_VOIT3  AS A14_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA14_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA14_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA14_2007);
                }



    if(isset($_POST["A15_2007"])){
        $requeteA15_2007= "SELECT CS1_81_TYPLR2_VOIT0+CS1_82_TYPLR2_VOIT0+CS1_83_TYPLR2_VOIT0+CS1_85_TYPLR2_VOIT0
        +CS1_86_TYPLR2_VOIT0+CS1_87_TYPLR2_VOIT0+CS1_88_TYPLR2_VOIT0+
        CS1_81_TYPLR2_VOIT1+CS1_82_TYPLR2_VOIT1+CS1_83_TYPLR2_VOIT1+CS1_85_TYPLR2_VOIT1
        +CS1_86_TYPLR2_VOIT1+CS1_87_TYPLR2_VOIT1+CS1_88_TYPLR2_VOIT1+
        CS1_81_TYPLR2_VOIT2+CS1_82_TYPLR2_VOIT2+CS1_83_TYPLR2_VOIT2+CS1_85_TYPLR2_VOIT2
        +CS1_86_TYPLR2_VOIT2+CS1_87_TYPLR2_VOIT2+CS1_88_TYPLR2_VOIT2+
        CS1_81_TYPLR2_VOIT3+CS1_82_TYPLR2_VOIT3+CS1_83_TYPLR2_VOIT3+CS1_85_TYPLR2_VOIT3
        +CS1_86_TYPLR2_VOIT3+CS1_87_TYPLR2_VOIT3+CS1_88_TYPLR2_VOIT3  AS A15_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA15_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA15_2007[] = $ligne;
                }
                }
            echo json_encode($tableauA15_2007);
            }

    if(isset($_POST["A16_2007"])){
        $requeteA16_2007= "SELECT
        CS1_81_TYPLR3_VOIT0+CS1_82_TYPLR3_VOIT0+CS1_83_TYPLR3_VOIT0+CS1_85_TYPLR3_VOIT0
        +CS1_86_TYPLR3_VOIT0+CS1_87_TYPLR3_VOIT0+CS1_88_TYPLR3_VOIT0 AS A16_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA16_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA16_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA16_2007);
                }

    if(isset($_POST["A17_2007"])){
        $requeteA17_2007= "SELECT
        CS1_81_TYPLR3_VOIT1+CS1_82_TYPLR3_VOIT1+CS1_83_TYPLR3_VOIT1+CS1_85_TYPLR3_VOIT1
        +CS1_86_TYPLR3_VOIT1+CS1_87_TYPLR3_VOIT1+CS1_88_TYPLR3_VOIT1  AS A17_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA17_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA17_2007[] = $ligne;
                }
                }
                echo json_encode($tableauA17_2007);
                        }

    if(isset($_POST["A18_2007"])){
        $requeteA18_2007="SELECT
        CS1_81_TYPLR3_VOIT2+CS1_82_TYPLR3_VOIT2+CS1_83_TYPLR3_VOIT2+CS1_85_TYPLR3_VOIT2
        +CS1_86_TYPLR3_VOIT2+CS1_87_TYPLR3_VOIT2+CS1_88_TYPLR3_VOIT2  AS A18_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA18_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA18_2007[] = $ligne;
                }
                }
            echo json_encode($tableauA18_2007);
            }


    if(isset($_POST["A19_2007"])){
        $requeteA19_2007="SELECT
        CS1_81_TYPLR3_VOIT3+CS1_82_TYPLR3_VOIT3+CS1_83_TYPLR3_VOIT3+CS1_85_TYPLR3_VOIT3
        +CS1_86_TYPLR3_VOIT3+CS1_87_TYPLR3_VOIT3+CS1_88_TYPLR3_VOIT3  AS A19_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA19_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA19_2007[] = $ligne;
                }
                }
            echo json_encode($tableauA19_2007);
                        }


    if(isset($_POST["A20_2007"])){
        $requeteA20_2007="SELECT
                CS1_81_TYPLR3_VOIT0+CS1_82_TYPLR3_VOIT0+CS1_83_TYPLR3_VOIT0+CS1_85_TYPLR3_VOIT0
                +CS1_86_TYPLR3_VOIT0+CS1_87_TYPLR3_VOIT0+CS1_88_TYPLR3_VOIT0+
                CS1_81_TYPLR3_VOIT1+CS1_82_TYPLR3_VOIT1+CS1_83_TYPLR3_VOIT1+CS1_85_TYPLR3_VOIT1
                +CS1_86_TYPLR3_VOIT1+CS1_87_TYPLR3_VOIT1+CS1_88_TYPLR3_VOIT1+
                CS1_81_TYPLR3_VOIT2+CS1_82_TYPLR3_VOIT2+CS1_83_TYPLR3_VOIT2+CS1_85_TYPLR3_VOIT2
                +CS1_86_TYPLR3_VOIT2+CS1_87_TYPLR3_VOIT2+CS1_88_TYPLR3_VOIT2+
                CS1_81_TYPLR3_VOIT3+CS1_82_TYPLR3_VOIT3+CS1_83_TYPLR3_VOIT3+CS1_85_TYPLR3_VOIT3
                +CS1_86_TYPLR3_VOIT3+CS1_87_TYPLR3_VOIT3+CS1_88_TYPLR3_VOIT3  AS A20_2007 FROM btx_td_princ18_2007";
        if ($result =pg_query($link,$requeteA20_2007)){
            while ($ligne = pg_fetch_assoc($result)) {
                $tableauA20_2007[] = $ligne;
                }
                }
                 echo json_encode($tableauA20_2007);
                 }
?>

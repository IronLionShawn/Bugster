<?php
include "config.php";
$listName=urlencode($_GET["listName"]);
$query="INSERT INTO `bugster`.`lists` (`ID`, `Name`) VALUES (NULL, '$listName');";
mysql_query($query);
?>
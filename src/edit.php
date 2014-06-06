<?php
include "config.php";
$id=$_GET["id"];
$text=urlencode($_GET["text"]);
$query="UPDATE  `bugster`.`bug` SET  `text` =  '$text' WHERE  `bug`.`ID` =$id;";
mysql_query($query);
?>
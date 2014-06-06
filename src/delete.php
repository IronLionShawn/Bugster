<?php
include "config.php";
$id=$_GET["id"];
$sql="DELETE FROM `bugster`.`bug` WHERE `bug`.`ID` = $id";
mysql_query($sql);
?>
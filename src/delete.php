<?php
include "config.php";
$id=$_GET["id"];
$sql="DELETE FROM `bug` WHERE `bug`.`ID` = $id";
mysql_query($sql);
?>
<?php
include "config.php";
$id=$_GET["id"];
$sql="UPDATE  `bugster`.`bug` SET  `status` =  '1', postedBy='".$_GET["solver"]."' WHERE `bug`.`ID` =$id;";
mysql_query($sql);
?>
<?php
ob_start();
include "config.php";
$listID=$_GET["id"];
$query="SELECT * FROM bug WHERE List='$listID'";
$result=mysql_query($query);
while($row=mysql_fetch_array($result))
{
	echo $row["ID"]."<|>".urldecode($row["text"])."<|>".urldecode($row["postedBy"])."<|>".$row["status"]."<|>".$row["importance"]."<|>".$row["data"]."<||>";
}
setcookie("list", $listID);
?>
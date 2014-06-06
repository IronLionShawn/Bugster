<?php
	include "config.php";
	$name=urlencode($_GET["author"]);
	$desc=urlencode($_GET["desc"]);
	$list=urlencode($_GET["list"]);
	
	if($_GET["imp"] == "important"){
		$importance = 1;
	}else{
		$importance = 0;
	}
	$date = date("d")."-".date("m")."-".date("Y");
	$sql="INSERT INTO `bugster`.`bug` (`ID`, `text`, `postedBy`, `status`, `List`,`importance`,`data`) VALUES (NULL, '$desc', '$name', '0', '$list', '$importance', '$date');";
	mysql_query($sql);
?>
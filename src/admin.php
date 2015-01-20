<?php
include "config.php";
if(isset($_GET["del"]))
{
	$id=$_GET["del"];
	$listName=$_GET["name"];
	$query="INSERT INTO `old_lists` (`ID`, `Name`) VALUES ('$id', '$listName');";
	mysql_query($query) or die(mysql_error());
	$query="DELETE FROM `lists` WHERE `lists`.`ID` = ".$_GET["del"];
	mysql_query($query);
}
if(isset($_GET["restore"]))
{
	$id=$_GET["restore"];
	$listName=$_GET["name"];
	$query="INSERT INTO `lists` (`ID`, `Name`) VALUES ('$id', '$listName');";
	mysql_query($query) or die(mysql_error());
	$query="DELETE FROM `old_lists` WHERE `old_lists`.`ID` = ".$_GET["restore"];
	mysql_query($query);
}
?>
<html>
	<head>
		<title>Bugster - List Admin</title>
		<link href="css.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="logo"></div>
		<div style="clear:both">
			<center>
				<h2>Existing lists:</h2><br>
				<table cellspacing="0" cellpadding="5" border="0" name="finished" id="finished" width="50%">
					<tbody>
					<tr>
						<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:left; width:5%">ID</td>
						<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:left; width:20%">Name</td>
						<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:left; width:5%">Delete</td>
					</tr>				
				<?php
					$query="SELECT * FROM lists";
					$result=mysql_query($query);
					while($row=mysql_fetch_array($result))
					{
						$id=$row["ID"];
						$name=urldecode($row["Name"]);
						$delLink="admin.php?del=$id&name=".$row["Name"];
						echo "<tr style='background-color: rgb(255, 255, 255);'><td style='border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(82, 149, 72);'>$id</td><td style='border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(82, 149, 72);'>$name</td><td style='border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(82, 149, 72);'><a href='$delLink'><img src='delete.png' class='check'></a></td></tr>";
						
					}
				?>
				</tbody>
				
				</table>
				<h2>Deleted Lists:</h2><br>
				<table cellspacing="0" cellpadding="5" border="0" name="finished" id="finished" width="50%">
					<tbody>
					<tr>
						<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:left; width:5%">ID</td>
						<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:left; width:20%">Name</td>
						<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:left; width:5%">Restore</td>
					</tr>				
				<?php
					$query="SELECT * FROM old_lists";
					$result=mysql_query($query);
					while($row=mysql_fetch_array($result))
					{
						$id=$row["ID"];
						$name=urldecode($row["Name"]);
						$delLink="admin.php?restore=$id&name=".$row["Name"];
						echo "<tr style='background-color: rgb(255, 255, 255);'><td style='border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(82, 149, 72);'>$id</td><td style='border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(82, 149, 72);'>$name</td><td style='border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(82, 149, 72);'><a href='$delLink'><img src='citit.png' class='check'></a></td></tr>";
						
					}
				?>
				</tbody>
				</table>
			</center>
		</div>
	</body>
</html>
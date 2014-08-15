<html>
	<head>
		<title>Bugster Setup Script</title>
		<link href="../css.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="logo"></div>
		<div style="clear:both">
			<?php
			$proc=0;
			if(isset($_POST["submited"]))
			{
				if($_POST["dbName"]=="" || $_POST["dbUser"]=="" || $_POST["dbHost"]=="")
				{
					echo "Database Name, Database User and Database Host are mandatory!";
				}
				else
				{
					$proc=1;
				}
			}
			if($proc==1)
			{
				$db=$_POST["dbName"];
				$user=$_POST["dbUser"];
				$password=$_POST["dbPassword"];
				$host=$_POST["dbHost"];
				$dbh=mysql_connect ($host, $user, $password) or die ('I cannot connect to the database because: ' . mysql_error());
				mysql_select_db($db); 
				$sql="CREATE TABLE IF NOT EXISTS `bug` (`ID` int(11) NOT NULL AUTO_INCREMENT,`text` text NOT NULL,  `postedBy` varchar(64) NOT NULL,  `status` smallint(6) NOT NULL,  `List` int(11) NOT NULL,  `importance` int(11) DEFAULT '0',  `data` varchar(255) DEFAULT NULL,  PRIMARY KEY (`ID`),  KEY `List` (`List`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
				mysql_query($sql);
				$sql="CREATE TABLE IF NOT EXISTS `lists` (  `ID` int(11) NOT NULL AUTO_INCREMENT,  `Name` varchar(255) NOT NULL,  PRIMARY KEY (`ID`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
				mysql_query($sql);
				$sql="CREATE TABLE IF NOT EXISTS `old_lists` (  `ID` int(11) NOT NULL AUTO_INCREMENT,  `Name` varchar(255) NOT NULL,  PRIMARY KEY (`ID`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
				mysql_query($sql);
				echo "Created tables.<br>";
				$configString="<?php
				".'$dbh'."=mysql_connect ('$host', '$user', '$password') or die ('I cannot connect to the database because: ' . mysql_error());
				mysql_select_db ('$db'); 
				?>";
				$result=file_put_contents("config.php",$configString);
				if($result===FALSE)
				{
					echo "Please make sure that PHP can write to the setup folder!";
				}
				else
				{
					echo "Created config.php file in setup folder, please move it to the main buster folder.";
				}
			}
			else
			{
			?>
			<form method="POST" action="index.php">
				<input name="dbHost" type="text" placeholder="Database Host" value="localhost"><br>
				<input name="dbName" type="text" placeholder="Database Name"><br>
				<input name="dbUser" type="text" placeholder="Database User"><br>
				<input name="dbPassword" type="password" placeholder="Database Password"><br>
				<input type="hidden" name="submited" value="1">
				<input type="submit" value="Setup Bugster">
			</form>
			<?php
			}
			?>
		</div>
	</body>
</html>
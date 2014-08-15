<?php
$debug=false;
if(file_exists("setup") && !$debug)
{
	die("Remove setup folder before you start using bugster.");
}
session_start();
$_SESSION["lastTimeStamp"] = 0;
$_SESSION["lastTimeDone"] = 0;
include "config.php";
?>
<html>
<head>
<title>Bugster</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="css.css" rel="stylesheet" type="text/css">
<script src="http://code.jquery.com/jquery-latest.js"></script>
	

<script type="text/javascript" src="jquery.titlealert.js"></script>
<script type="text/javascript" src="bugsterMain.js"></script>
</head>
	<body>

	<form name="addForm" id="addForm">
    	<div class="logo" >
			<div>v0.2.2</div>
            <input type="button" onClick="saveName();" value="save" class="button" style="margin-top:70px; float:right">	
            <input type="text" name="nume" id="nume" value="" style="margin-top:70px; width:100px; float:right" placeholder="Bug found by">
		</div>
		
		<div style="float:left; margin: 10px; width: calc(50% - 170px); overflow:hidden">
        	<textarea  rows=5 name="msg" id="msg" placeholder="Bugs description" class="textfield"></textarea>
             <div style="float:left; margin:5px -22px"><input type="checkbox" value="important" id="imp" name="imp" title="Important?"></div>
             <input type="button" onClick="addMsg();" value="Add" style=" height:100px; line-height: 90px; padding:0px 20px; text-align:center" class="button">
        </div>
	
		<div style="float:left; margin:30px 10px; width: calc(50% - 190px); overflow:hidden">
			<input type="text" id="src" name="src" placeholder="Search..."  onKeyUp="searchTable();" style="width:100%"><br>
			<input type="text" id="newListText" placeholder="Add list"  style=" width: calc(100% - 110px);">
			<input type="button" class="button" onClick="addList();" value="Add list" style="float:right">
			<div><a href="admin.php">List admin</a></div>
        </div>
	</form>
	
    

     
    <table width='100%' cellpadding="0" cellspacing="0" style=" z-index:2; position:relative">
    	<tr>
		<?php
			$query="SELECT * FROM lists";
			$result=mysql_query($query);
			if(mysql_num_rows($result)==0)
			{
				$sql="INSERT INTO `bugster`.`lists` (`ID`, `Name`) VALUES (NULL, 'Default List');";
				mysql_query($sql);
				$result=mysql_query($query);
			}
			$firstList=-1;
			$lists=array();
			$i=0;
			while($row=mysql_fetch_array($result))
			{
				if($firstList==-1)
				{
					$firstList=$row["ID"];
					
				}
				
				echo '<td><div id="listID_'.$row["ID"].'" class="tab" onClick="showList('.$row["ID"].')">'.urldecode($row["Name"]).'</div></td>';
				$lists[$i]=$row["ID"];
			}
			
			if(empty($_COOKIE["list"]))
			{
				$list=$firstList;
			}
			else
			{
				if(array_search($_COOKIE["list"], $lists)==FALSE)
				{
					$list=$firstList;
				}
				else
				{
					$list=$_COOKIE["list"];
				}
			}
			echo "<script>showList($list);</script>"
		?>


    <table width="100%" style="padding:10px; background: #FFFFFF; border-top: 1px solid #B1B1B1; margin-top:-1px; z-index:1; position:relative">
			<tr valign=top>
				<!-- UNFINISHED TODOS-->
				<td width="50%">
						<div class="notDone"> Need to do </div>
					<table cellspacing=0 cellpadding=5 name="unfinished" id="unfinished" width="100%">
						<tr>
							<td style="background-color:#ffd9d9; padding:5px; border-right: 1px solid #FFA8A8; text-align:center; width:10%">Posted By</td>
							<td style="background-color:#ffd9d9; padding:5px; border-right: 1px solid #FFA8A8; text-align:center; width:50%">Message</td>
							<td style="background-color:#ffd9d9; padding:5px; border-right: 1px solid #FFA8A8; text-align:center; width:10%">Date</td>
                            <td style="background-color:#ffd9d9; padding:5px; text-align:center; width:5%">Edit</td>
                            <td style="background-color:#ffd9d9; padding:5px; text-align:center; width:5%">Done</td>
						</tr>
					</table>
				</td>
				<!-- UNFINISHED TODOS END-->
				
				<!-- FINISHED TODOS-->
				<td width="50%">
                	<div class="done">Done</div>
					<table cellspacing=0 cellpadding=5 border=0 name="finished" id="finished" width="100%" >
						<tr>
							<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:center; width:10%">Fixed by</td>
							<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:center; width:50%">Message</td>
							<td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:center; width:10%">Data</td>
                            <td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:center; width:5%">Edit</td>
                            <td style="background-color:#ddffd8; padding:5px; border-right: 1px solid #BAFFB0; text-align:center; width:5%">Delete</td>
						</tr>
					</table>
				</td>
				<!-- FINISHED TODOS END-->
			</tr>
		</table>
	</body>
</html>

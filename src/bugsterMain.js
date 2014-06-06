var currentBugs;
var list;
var currentInterval;


function showList(listID)
{
	$(".tab").each(function(index, element) {
        $(this).removeClass('tab_selected');
    });
	$('#listID_'+listID).addClass("tab_selected");
	
	
	try
	{
		clearInterval(currentInterval);
		currentInterval=-1;
	}
	catch(err){}
	var unSolved = document.getElementById("unfinished");
	var solved = document.getElementById("finished");
	var row=null;
	if(currentBugs!=null)
	{
		if(currentBugs.length>0)
		{
			for(var i=0; i<currentBugs.length; i++)
			{
				var bug=currentBugs[i].split("<|>");
				row=null;
				row=document.getElementById("unSolvedRow"+bug[0]);
				if(row!=null)
				{
					unSolved.deleteRow(row.rowIndex);
				}
				else
				{
					row=document.getElementById("solvedRow"+bug[0]);
					if(row!=null)
					{
						solved.deleteRow(row.rowIndex);
					}
				}
			}
		}
	}
	if(readCookie("nameSaver") != null)
		document.getElementById("nume").value = readCookie("nameSaver");
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		fullListParse(xmlhttp);
	}
	xmlhttp.open("GET","getList.php?id="+listID+"&r="+Math.random(),true);
	xmlhttp.send();
	list=listID;
}

function fullListParse(xmlhttp)
{
	if(xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		var unSolved = document.getElementById("unfinished");
		var solved = document.getElementById("finished");
		var tbl;
		var bugList=xmlhttp.responseText.split("<||>");
		for(var i=0; i<bugList.length-1; i++)
		{
			var bug=bugList[i].split("<|>");
			if(bug[3]=="0")
			{
				tbl=unSolved;
			}
			else
			{
				tbl=solved;
			}
			var row = tbl.insertRow(-1);
			row.onmouseover = function(e){ highlight(e) };
			if(bug[3]=="0")
			{
				row.id="unSolvedRow"+bug[0];
				
			}
			else
			{
				row.id="solvedRow"+bug[0];
			}
			var cellLeft = row.insertCell(0);
			var cellRight = row.insertCell(1);
			var cellDate = row.insertCell(2);
			var cellEdit = row.insertCell(3);
			var tick = row.insertCell(4);
			cellLeft.innerHTML = bug[2];
			cellRight.innerHTML = bug[1];
			cellDate.innerHTML = bug[5];
			
			cellEdit.innerHTML = "<img src='edit.png' class='check' onClick='editPost("+bug[0]+");'>";
			if(bug[3]=="0")
			{			
				tick.innerHTML = "<img src='citit.png' class='check' onClick='fix("+bug[0]+");'>";
			}
			else
			{		
				tick.innerHTML = "<img src='delete.png' class='check' onClick='deleteBug("+bug[0]+");'>";
			}			
			cellLeft.style.borderBottom = "1px dashed #529548";
			cellEdit.style.borderBottom = "1px dashed #529548";
			cellRight.style.borderBottom = "1px dashed #529548";
			cellDate.style.borderBottom = "1px dashed #529548";
			tick.style.borderBottom = "1px dashed #529548";
			tick.style.textAlign = "center";
			cellDate.style.textAlign = "center";
			cellEdit.style.textAlign = "center";
			if(bug[4] == "1"){
				row.style.backgroundColor = "#FF9900";
			}
		}
		currentBugs=bugList;
		currentInterval=setInterval(sync,5000);
	}
}

function highlight(e)
{
	var row = getParent(e.target);
	if(row.style.backgroundColor == "rgb(255, 153, 0)"){
		row.onmouseout = dehighlightImportant;
	}else{
		row.onmouseout = dehighlight;
	}
	row.style.backgroundColor = "#FFCC66";
	
}

function getParent(node)
{
	while(node.nodeName != "TR"){
		node = node.parentNode;
	}	
	return node;
}

function dehighlight(e)
{
	var row = getParent(e.target);
	row.style.backgroundColor = "#FFFFFF";
}

function dehighlightImportant(e)
{
	var row = getParent(e.target);
	row.style.backgroundColor = "#FF9900";
}

function changeParse(xmlhttp)
{
	if(xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		var unSolved = document.getElementById("unfinished");
		var solved = document.getElementById("finished");
		var tbl;
		var bugList=xmlhttp.responseText.split("<||>");
		for(var i=0; i<bugList.length-1; i++)
		{
			var bug=bugList[i].split("<|>");
			var needToAdd=false;
			if(bug[3]==0 && document.getElementById("solvedRow"+bug[0])!=null)
			{
				row=document.getElementById("solvedRow"+bug[0]);
				solved.deleteRow(row.rowIndex);
				needToAdd=true;
			}
			if(bug[3]==1 && document.getElementById("unSolvedRow"+bug[0])!=null)
			{
				row=document.getElementById("unSolvedRow"+bug[0]);
				unSolved.deleteRow(row.rowIndex);
				needToAdd=true;
			}			
			if(document.getElementById("unSolvedRow"+bug[0])==null && document.getElementById("solvedRow"+bug[0])==null)
			{
				needToAdd=true;
			}
			if(!needToAdd)
			{
				if(bug[3]==0)
				{
					row=document.getElementById("unSolvedRow"+bug[0]);
				}
				else
				{
					row=document.getElementById("solvedRow"+bug[0]);
				}
				var cellRight=row.cells[1];
				if(cellRight.innerHTML!=bug[1])
				{
					if(bug[3]=="0")
					{
						tbl=unSolved;
					}
					else
					{
						tbl=solved;
					}
					cellRight.innerHTML=bug[1];
				}				
			}
			if(needToAdd)
			{
				if(bug[3]=="0")
				{
					tbl=unSolved;
				}
				else
				{
					tbl=solved;
				}
				var row = tbl.insertRow(-1);
				if(bug[3]=="0")
				{
					row.id="unSolvedRow"+bug[0];
				}
				else
				{
					row.id="solvedRow"+bug[0];
				}
				var cellLeft = row.insertCell(0);
				var cellRight = row.insertCell(1);
				var cellDate = row.insertCell(2);
				var cellEdit = row.insertCell(3);
				var tick = row.insertCell(4);
				cellLeft.innerHTML = bug[2];
				cellRight.innerHTML = bug[1];
				cellDate.innerHTML = bug[5];
				cellEdit.innerHTML = "<img src='edit.png' class='check' onClick='editPost("+bug[0]+");'>";
				if(bug[3]=="0")
				{			
					tick.innerHTML = "<img src='citit.png' class='check' onClick='fix("+bug[0]+");'>";
				}
				else
				{		
					tick.innerHTML = "<img src='delete.png' class='check' onClick='deleteBug("+bug[0]+");'>";
				}			
				cellLeft.style.borderBottom = "1px dashed #529548";
				cellEdit.style.borderBottom = "1px dashed #529548";
				cellRight.style.borderBottom = "1px dashed #529548";
				cellDate.style.borderBottom = "1px dashed #529548";
				tick.style.borderBottom = "1px dashed #529548";
				tick.style.textAlign = "center";
				cellDate.style.textAlign = "center";
				cellEdit.style.textAlign = "center";
				if(bug[4] == "1"){
					row.style.backgroundColor = "#FF9900";
				}
			}
		}
		
		for(var i=0; i<currentBugs.length; i++)
		{
			var bug=currentBugs[i].split("<|>");
			if(indexOfBug(bugList, bug[0])==-1)
			{
				try
				{
					row=document.getElementById("unSolvedRow"+bug[0]);
					unSolved.deleteRow(row.rowIndex);
					console.log("removing "+"unSolvedRow"+bug[0]);
				}
				catch(err){}
				try
				{
					row=document.getElementById("solvedRow"+bug[0]);
					solved.deleteRow(row.rowIndex);
					console.log("removing "+"solvedRow"+bug[0]);
				}
				catch(err){}
			}
		}
		currentBugs=bugList;
		if(currentInterval==-1)
		{
			currentInterval=setInterval(sync,5000);
		}
	}
}

function indexOfBug(array, bugID)
{
	for(var i=0; i<array.length; i++)
	{
		var bug=array[i].split("<|>");
		if(bug[0]==bugID)
		{
			return i;
		}
	}
	return -1;
}

function sync()
{
	//console.log("Syncing....");
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		changeParse(xmlhttp);
	}
	xmlhttp.open("GET","getList.php?&id="+list+"&r="+Math.random(),true);
	xmlhttp.send();
}

function addMsg()
{
	nume=document.getElementById("nume").value;
	msg=document.getElementById("msg").value;
	var imp=document.getElementById("imp").checked;
	document.getElementById("msg").value="";
	document.getElementById("imp").checked="";
	clearInterval(currentInterval);
	currentInterval=-1;
	var ceva = "important";
	console.log("IMP:"+imp);
	if(imp.toString() != "true"){
		ceva = "";
	}
	console.log("IMP:"+ceva);
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		sync();
	}
	xmlhttp.open("GET","add.php?&author="+nume+"&desc="+msg+"&list="+list+"&imp="+ceva+"&r="+Math.random(),true);

	xmlhttp.send();	
}

function fix(bugID)
{
	clearInterval(currentInterval);
	currentInterval=-1;
	nume=document.getElementById("nume").value;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		sync();
	}
	xmlhttp.open("GET","fix.php?&id="+bugID+"&solver="+nume+"&r="+Math.random(),true);
	xmlhttp.send();	
}

function deleteBug(bugID)
{
	clearInterval(currentInterval);
	currentInterval=-1;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		sync();
	}
	xmlhttp.open("GET","delete.php?&id="+bugID+"&r="+Math.random(),true);
	xmlhttp.send();
}

function createCookie(name,value,days) 
{
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else 
		var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) 
{
	createCookie(name,"",-1);
}
	
function saveName()
{
	if(document.getElementById("nume").value != "")
	{
		createCookie("nameSaver",document.getElementById("nume").value, 600);
	}
}

function editPost(bugID)
{
	console.log('trace');
	if(document.getElementById("editing"+bugID)!=null)
		return;
	if(document.getElementById("isEditing")!=null)
		return;
	clearInterval(currentInterval);
	currentInterval=-1;
	var row = document.getElementById("unSolvedRow"+bugID);
	if(row==null)
	{
		row = document.getElementById("solvedRow"+bugID);
	}
	var cell = row.cells[1];
	cell.innerHTML = "<div style='float:left' id='isEditing'><textarea cols=40 rows=5 name='editing"+bugID+"' id='editing"+bugID+"'>"+cell.innerHTML+"</textarea></div><div style='float:left'><input style='height:87px; padding-left:30px; padding-right:30px;' type=button value='Save' onClick='savePost("+bugID+");'></div>";
}

function savePost(bugID)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		sync();
	}
	var editText=document.getElementById("editing"+bugID).value;
	xmlhttp.open("GET","edit.php?&id="+bugID+"&text="+editText+"&r="+Math.random(),true);
	xmlhttp.send();
}

function searchTable()
{
	var tab = document.getElementById("unfinished");
	var searched = document.getElementById("src").value;
	if(searched != "")
	{
		for(var i=1; i<tab.rows.length;i++)
		{
			var comp = tab.rows[i].cells[1].innerText;
			comp = comp.toLowerCase();
			searched = searched.toLowerCase();
			if(comp.indexOf(searched) == -1){
				$("#"+tab.rows[i].id).hide();
			}else{
				$("#"+tab.rows[i].id).show();
			}
		}
	}else{
		for(var i=1; i<tab.rows.length;i++){
			$("#"+tab.rows[i].id).show();
		}
	}
}

function addList()
{
	console.log("Added new list");
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange= function()
	{
		setTimeout("location.reload(true);",500);
	}
	var listName=document.getElementById("newListText").value;
	xmlhttp.open("GET","addList.php?&listName="+listName+"&r="+Math.random(),true);
	xmlhttp.send();
}

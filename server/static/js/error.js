function goBack()
{
	document.getElementById('background').style.backgroundColor="#000";
	document.getElementById('back').innerHTML = "<img src='../static/img/404.gif' style='width:280px;'>";
	document.getElementById('back').innerHTML += "<h1 id='counter' class='label label-default'>5...</h1>";
	countdown(3);	
}

function countdown(num)
{
	if(num === -1)
	{
		window.location="http://people.ischool.berkeley.edu/~ramit/server/home";
	}
	else
	{
		document.getElementById('counter').innerHTML=num--;
		setTimeout(function(){countdown(num);},1000);	
	}
}

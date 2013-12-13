$(document).ready(function()
	{
		$("#textTop").keyup(function()
		{
			var input1 =  $("#textTop").val();
			console.log(input1.length);
			$("#memeTop span").text(input1.toUpperCase());



			console.log("Main div: "+$('#memeTop').height());
			console.log("inside span: "+$('#memeTop span').height());

		    if( $('#textTop').val() == '' || $('#textTop').val().length <66 ) 
		    {
		    	$('#memeTop span').css('font-size','40px' );
		    }
		    else
		    {
		    	$('#memeTop span').css('font-size','30px');
		    }
		});

		$("#textBottom").keyup(function()
		{
			var input2 =  $("#textBottom").val();
			console.log(input2.length);
			$("#memeBottom span").text(input2.toUpperCase());

		    if( $('#textBottom').val() == '' || $('#textBottom').val().length <60 ) 
		    {
		    	$('#memeBottom span').css('font-size','40px');
		    }
		    else
		    {
		    	$('#memeBottom span').css('font-size','30px');
		    }

		});

		$(".thumbnails").click(function(event)
		{
			var img = $(this);

			img = img[0].src.split("memeBackgrounds/")[1];
			$("#result").css("background-image","url(../static/img/memeBackgrounds/"+img+")");
			$("#result").css("background-size","cover");
			//$("#memeBack").attr('src','../static/img/memeBackgrounds/'+img);
			
			console.log(img);
		});

		$("#savingMeme").click(function()
		{
			var bottom = $("#textBottom").val();
			var top = $("#textTop").val();
			var img = $("#result").css("background-image");

			console.log(img);
			console.log(top);
			console.log(bottom);

			// var html = '<!DOCTYPE html><head><title>MIMS GENERATOR - powered by Lui.gi</title><style> #result { background-image: '+img+'; width:600px; margin 0 auto;
			// 		text-align: center;
			// 		height:500px;
			// 		border-radius: 2px;
			// 	}

			// 	#memeTop, #memeBottom
			// 	{
			// 		height: 80px;
			// 		margin:5px;
			// 		position: relative;
			// 		font-family: Impact, Charcoal, sans-serif;
			// 		z-index: 10;
			// 	}

			// 	.memeText
			// 	{
			// 		font-size: 40px;
			// 		text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
			// 		color: white;
			// 		line-height: 40px;
			// 	}

			// 	#memeTop
			// 	{ top:10px; } #memeBottom { top:320px; }</style></head><body><div id="result"><div id="memeTop"><span class="memeText" >'+top+'</span></div><div id="memeBottom"><span class="memeText">'+bottom+'</span></div></div></body></html>'
		});

	}
	
)
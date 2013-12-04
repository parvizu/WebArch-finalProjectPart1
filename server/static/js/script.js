
//Toggle radio buttons
$("#shortToggle2").click(function() {
  $("#shorty").show();
  $("#shortUrl").prop("disabled",false);
  $("#shortUrl").attr("required","");
});
$("#shortToggle1").click(function() {
  $("#shorty").hide();
  $("#shortUrl").prop("disabled",true);
  $("#shortUrl").removeAttr("required");
});


$(document).ready(function(){
	//validation method using jquery validation framework
	$("form").validate({
		
		 	rules: {
		        shortUrl: {
		            textonly: true,
		            required: true
		        }},
			errorElement: 'span',
			errorPlacement: function(error, element) {
				 element.parent().next().append(error);; // default function
		        },
		    highlight: function(element) {
		         $(element).parent().next().addClass("errors");
		        },
		    unhighlight: function(element) {
		         $(element).parent().next().removeClass("errors");
		    	},
		  submitHandler: function(form) {
		    submitForm();
		  }
		});
	//adding textOnly rule to the validator
	$.validator.addMethod(
			"textonly", 
			function(value, element)
			{
			    valid = false;
			    check = /^[a-zA-Z]+$/.test(value);
			    if(check==true)
			        valid = true;
			    return this.optional(element) || valid;
			}, 
			$.format("Please enter only letters!")
			);

	function submitForm(){
		var urls=$("form").serialize();
		$.ajax({
			type:"POST",
			url:"shorts",
			data:urls,
			success:function(data){
				console.log(data);
				var type=data.split("-")[1];
				if(type=="new")
					$("#returningShortURL").html("<p class='lead'>The generated shortened URL is: <a href='http://people.ischool.berkeley.edu/~ramit/server/short/"+data.split("-")[0]+"' target='_blank'>" + data.split("-")[0] + "</a></p>");
				else if(type=="stored")
					$("#returningShortURL").html("<p class='lead'>Congratulations your URL has been stored: <a href='http://people.ischool.berkeley.edu/~ramit/server/short/"+data.split("-")[0]+"' target='_blank'>" + data.split("-")[0] + "</a></p>");
				else
					$("#returningShortURL").html("<p class='lead'>This URL was already shortened to: <a href='http://people.ischool.berkeley.edu/~ramit/server/short/"+data.split("-")[0]+"' target='_blank'>" + data.split("-")[0] + "</a></p>");
			},
			error:function(data){
				console.log(data);
			}
		});
	}
});

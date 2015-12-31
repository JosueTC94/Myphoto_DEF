$(document).ready(function()
{    
//Inicio de sesión
    var parametros_login;
    var usu;
    var pass;
    $("#login").click(function(event)
    {
	$("#mensaje_respuesta").show();
        event.preventDefault();
        //alert("click en login");
        usu=$("#user").val();
        //alert(usu);
        pass=$("#pass").val();
        //alert(pass);
        if(usu == "")
	{
		if(pass == "")
		{
			$("#mensaje_respuesta").html("<h4> Introduzca usuario y password</h4>");
		}
		else
		{
			$("#mensaje_respuesta").html("<h4> Introduzca usuario </h4>");
		}
	}
	else
	{
		if(pass == "")
		{
			$("#mensaje_respuesta").html("<h4> Introduzca password </h4>");
		}
		else
		{
        		parametros_login = "usuario="+usu+"&password="+pass;

        		$.ajax({
            		data: parametros_login,
            		type: "POST",
            		url: "../php/login.php"
        		})
        		.done(function(data,textStatus,jqXHR)
        		{
            //alert("Entre en el done");
            //alert("Data->"+data.numero_filas);
            //alert("Id_usuario->"+data.ID_usuario);
            //alert("Usu->"+data.usu);
            //alert("pass->"+data.pass);
            		$("#mensaje_respuesta").html("<h4>"+data.respuesta+"</h4>");
            		setTimeout(function(){location.href="../index1.php";},500);
            //Actualizo la variable sesion

        		})
        		.fail(function(jqXHR,textStatus,errorThrown)
        		{
           		alert("Entre en el fail");
        		if (jqXHR.status === 0) {
              		alert('Not connected.\nPlease verify your network connection.');
        		}else if (jqXHR.status == 404) {
              		alert('The requested page not found. [404]');
        		}else if (jqXHR.status == 500) {
              		alert('Internal Server Error [500].');
        		}else if (jqXHR === 'parsererror') {
              		alert('Requested JSON parse failed.');
        		}else if (jqXHR === 'timeout') {
              		alert('Time out error.');
        		}else if (jqXHR === 'abort') {
              		alert('Ajax request aborted.');
        		}else{
              		alert('Uncaught Error.\n' + jqXHR.responseText);
        		}
        		});
		}
	}
});

$("#form_registro").click(function()
{
//	event.preventDefault();
	$("#form_inicio").fadeIn("slow");
	$("#form_registro").css("display","none");
        $("#inicio_sesion").css("display","none");
        $("#formulario_registro").fadeIn("slow");
});
$("#form_inicio").click(function()
{
//      event.preventDefault();
        $("#form_registro").fadeIn("slow");
        $("#form_inicio").css("display","none");
        $("#formulario_registro").css("display","none");
        $("#inicio_sesion").show("slow");
});

    $("#registro").click(function(event)
    {
       event.preventDefault();
       if($("#usuario_registro").val() == "" || $("#password_registro").val() == "" || $("#email_registro").val() == "")
       {
		$("#mensaje_respuesta_registro").html("<h4 style=color:red;>Introduzca como mínimo los campos en rojo</h4>");
       		$("#usuario_registro").css("border-color","red");
		$("#password_registro").css("border-color","red");
		$("#confirmar_password_registro").css("border-color","red");
		$("#email_registro").css("border-color","red");
	} 
	else
	{
	//Compruebo que los password son iguales
	if($("#password_registro").val() == $("#confirmar_password_registro").val())
	{
       var parametros_registro = "user="+$("#usuario_registro").val()+"&apellidos_registro="+$("#apellidos_registro").val()+"&nombre_registro="+$("#nombre_registro").val()+"&pass="+$("#password_registro").val()+"&email_registro="+$("#email_registro").val()+"&detalles="+$("#descripcion").val();    
       //alert(parametros_registro);
       //alert("Ha seleccionado registrarse");
       $.ajax({
           data: parametros_registro,
           type: "POST",
           url: "../php/registro.php"
       })
       .done(function(data,textStatus,jqXHR)
       {
	/*	alert("Id_usuario->"+data.id_usuario);
		var id_user = data.id_usuario;
	        var inputFileImage = document.getElementById("archivoImage");
        	var file = inputFileImage.files[0];
        	var data = new FormData();
        	data.append('archivo',file);
        	var url = "./subir_fotouser.php";
        	$.ajax(
           	{
                	url:url,
                	type:"POST",
                	contentType: false,
                	data: data,
                	processData: false,
                	cache: false
            	})
            	.done(function(data,textStatus,jqXHR)
            	{
			alert("entre en el done foto user");
		})
		.fail(function(jqXHR,textStatus,errorThrown)
		{
			alert("entre en el fail foto user");
		});
	*/
		$("#mensaje_respuesta_registro").fadeIn();
         	$("#mensaje_respuesta_registro").html("<h4>"+data.success+"</h4>");
		setTimeout(function()
		{
			location.href="index.php";
      		},1000);
	})	
       .fail(function(jqXHR,textStatus,errorThrown)
       {
           alert("Fail");
       });
	}else{
		$("#mensaje_respuesta_registro").html("<h4 style=color:red> Las contraseñas introducidas no son iguales</h4>");
                $("#password_registro").css("border-color","red");
                $("#confirmar_password_registro").css("border-color","red");
		setTimeOut(function(){location.href="password_registro";},750);
	     }//Fin del segundo else
	}//Fin del primer else
    });

    
       $("#user").focusin(function(){
          $(".inputUserIcon").css("color", "#e74c3c");
        }).focusout(function(){
          $(".inputUserIcon").css("color", "white");
        });
        
        $("#pass").focusin(function(){
          $(".inputPassIcon").css("color", "#e74c3c");
        }).focusout(function(){
          $(".inputPassIcon").css("color", "white");
        });
    
});//Fin del código

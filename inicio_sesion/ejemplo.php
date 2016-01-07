<?php

session_start();
$_SESSION['usuario'] = "Josue";

?>
<!DOCTYPE html>
<html>
<head>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
$(document).ready(function()
{
$("#login").click(function()
{
alert("entre");
location.href="prueba.php";

});

});
</script>
<!--script type="text/javascript">
$(document).ready(function()
{

alert("Entre");
$("#login").click(function()
{
			var parametros_login = "usuario=JosueTC94&password=x";

                        $.ajax({
                        //data: parametros_login,
                        //type: "POST",
                        url: "prueba.php"
                        })
                        .done(function(data,textStatus,jqXHR)
                        {
            //alert("Entre en el done");
            //alert("Data->"+data.numero_filas);
            //alert("Id_usuario->"+data.ID_usuario);
            //alert("Usu->"+data.usu);
            //alert("pass->"+data.pass);
                        alert(data.probando);
                        //$("#mensaje_respuesta").html("<h4>"+data.respuesta+"</h4>");
                        //setTimeout(function(){location.href="../inicio_filtro.php";},500);
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
});
});
</script-->

</head>
<body>
<input id="login" type="button" value="click"></input>
</body>
</html>

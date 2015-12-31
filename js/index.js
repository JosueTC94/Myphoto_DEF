$(document).ready(function()
{
var latitud;
var longitud;
var myCenter;
var output;
var id_imagen = 69;



$.ajax({
url: "php/descarga_inicial.php"
})
.done(function(data,textStatus,jqXHR)
{
//alert("nciwocen"+data.numero_loc);
$("#numero_cliente").html(data.numero_cliente);
$("#numero_fotos").html(data.numero_fotos);
$("#numero_loc").html(data.numero_loc);
//Descarga inicial de fotografias	
output = "<div id="+"works>";
$.each(data.imagenes,function(key,value)
{
	output += "<figure class="+"effect-oscar  wowload fadeInUp"+"><img height=450px width=102% src="+value.direccion_imagen+" alt=No puede encontrarse la imagen/><figcaption><h2 id="+"etiqueta"+">"+value.categoria+"</h2><p>"+value.titulo_imagen+"<br><a  href="+value.direccion_imagen+" title="+value.titulo_imagen+" data-gallery>Ver</a><a id="+value.id_imagen+" href=#about>Info foto</a></p></figcaption></figure>";
})

output += "</div>";
$("#imagenes").html(output);
setTimeout(function(){
$("#imagenes").fadeIn();
$("#works").attr("class","clearfix grid");
$("#comunidad_myphoto").show();
$("#contact").show();
$("#footer").show();
},800);

setTimeout(function()
{
$("#flecha_control").fadeIn("slow");
},2000);

//Perfil
$("#user_perfil").val(data.user_perfil);
$("#nombre_perfil").val(data.nombre_perfil);
$("#apellidos_perfil").val(data.apellidos_perfil);
$("#email_perfil").val(data.email_perfil);
$("#password_perfil").val(data.password_perfil);
$("#descripcion_perfil").val(data.descripcion_perfil);

//Subir_imagen
$("#author").val(data.user_perfil);

for(i=data.id_minimo;i<=data.id_maximo;i++)
{
        $("#"+i).click(function()
        {
                //alert("he pulsado el "+i);
                //alert("Caracteristicas de la imagen:"+this.id);
		var id_imagen = this.id;
		$("#about").fadeIn();
	//Mapa
	//	crear_mapa(latitud,longitud);
        $.ajax({
		data: "id_imagen="+id_imagen,
		type: "POST",
		url: "php/descarga_imagenes.php"
	})
	.done(function(data,textStatus,jqXHR){
		
		$("#titulo_imagen").html(data.titulo_imagen);
		$("#autor_imagen").html(data.autor_imagen);
		$("#latitud_imagen").html(data.latitud_imagen);
		$("#longitud_imagen").html(data.longitud_imagen);
		$("#descripcion_imagen").html(data.descripcion_imagen);
		$("#lugar_imagen").html(data.lugar_imagen);
		$("#tipo_imagen").html(data.tipo_imagen);
		$("#nombre_imagen").html(data.nombre_archivo);
		$("#tam_imagen").html(data.tam_imagen);
		$("#fecha_imagen").html(data.fecha_imagen);
		$("#dispositivo_imagen").html(data.dispositivo_imagen);
		

                latitud = data.latitud_imagen;
                longitud = data.longitud_imagen;
                myCenter=new google.maps.LatLng(latitud,longitud);

                google.maps.event.addDomListener(window, 'load', initialize());

	})
	.fail(function(jqXHR,textStatus,errorThrown)
	{
		alert("no entre");

	});
	});
}

})
.fail(function(jqXHR,textStatus,errorThrown)
{
alert("fail");
});

$("#salir").click(function()
{
	$.ajax({
	   url: "php/logout.php"
	})
	.done(function(data,textStatus,jqXHR)
	{
	    //alert("Salir");
            setTimeout(function(){location.href="inicio_sesion/index.php";},500);
	})
	.fail(function(jqXHR,textStatus,errorThrown)
	{
	
	});
});



$("#archivoImage").change(function()
{
        var inputFileImage = document.getElementById("archivoImage");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append('archivo',file);
	
	$("#imagen_a_subir").html("<img src="+file+" width=100% height=150px></img>");
});

$(":radio").click(function()
{
	$(this).css("border-color","red");
});
$("#subir_imagen").click(function(event)
{
	event.preventDefault();
	//alert($(":checked").val());
	var titulo_imagen = $("#titulo_imagen").val();
	var autor_imagen = $("#autor_imagen").val();
	var detalles_imagen = $("#detalles_imagen").val();	
	var imagen_subir;
	var palabra_clave = $(":checked").val();
        if(palabra_clave == null)
	{
		alert("palabra_clave");
		var palabra_clave = $("#otra_categoria").val();
	}
        var inputFileImage = document.getElementById("archivoImage");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append('archivo',file);
        var url = "php/subir_imagen.php";
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
                alert("Entre en el done");
                //alert("Data-success:"+data.conexion);
                //alert("Data-archivo:"+data.nombre_archivo);
               // alert("Tipo-archivo"+data.tipo_archivo);
               //    alert("Tmp-archivo:"+data.tmp_archivo);
                //alert("Archivador:"+data.archivador);
                //alert("Data-success:"+data.success);
                //alert("Error:"+data.error);
               // alert("Id_imagen:"+data.id_imagen);
                id_imagen = data.id_imagen;
		//alert("mov->"+data.mov);
		//alert("Latitud->"+data.latitud);
                //alert("V_imagen->"+data.v_imagen);
		//Actualizamos los campos autor,titulo y detalles de la imagen introducida
		
		var titulo_imagen = $("#title").val();
		var autor_imagen = $("#author").val();
		var detalles_imagen = $("#description").val();
		var parametros_imagen_subida = "id_imagen="+id_imagen+"&titulo_imagen="+titulo_imagen+"&autor_imagen="+autor_imagen+"&detalles_imagen="+detalles_imagen+"&palabra_clave="+palabra_clave;	
		alert(parametros_imagen_subida);
        	$.ajax({
                	data: parametros_imagen_subida,
                	type: "POST",
                	url: "php/subir_imagen1.php"
        	})
        	.done(function(data,textStatus,jqXHR)
        	{
                	alert("Data->"+data.success);
                	$("#mensaje_respuesta_subida").html(data.respuesta);
		})
        	.fail(function(jqXHR,textStatus,errorThrown)
        	{
                	alert("Fail cnweio");
        	        $("#mensaje_respuesta_subida").html(data.respuesta);
	        });

	    })
            .fail(function(jqXHR,textStatus,errorThrown)
            {
               alert("Entre en el fail");
            });	
       
});

$("#actualizar_perfil").click(function()
{
       var parametros_perfil = "user="+$("#usuario_perfil").val()+"&apellidos_registro="+$("#apellidos_perfil").val()+"&nombre_perfil="+$("#nombre_perfil").val()+"&password_perfil="+$("#password_perfil").val()+"&email_perfil="+$("#email_perfil").val()+"&detalles_perfil="+$("#descripcion_perfil").val();
       alert(parametros_perfil);
       $.ajax({
           data: parametros_perfil,
           type: "POST",
           url: "php/actualizar_perfil.php"
       })
       .done(function(data,textStatus,jqXHR)
       {
		$("#mensaje_actualizar_perfil").html("<h4>"+data.success+"</h4>");
       })
       .fail(function(jqXHR,textStatus,errorThrown)
	{
		alert("No funciona ni pa atras");
	});
});

function initialize()
{
//alert("entre");
var mapProp = {
  center:myCenter,
  zoom:17,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker=new google.maps.Marker({
  position:myCenter,
  });

marker.setMap(map);
}


//Control de la aparición de los elementos
$("#perfil").click(function(e)
{
	e.preventDefault();
	$("#editlog").fadeIn();
        location.href = "#editlog";
});


});

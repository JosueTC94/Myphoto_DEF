$(document).ready(function()
{
var latitud;
var longitud;
var myCenter;
var output;
var id_imagen = 69;
var usuario_sesion;
var filtro_categoria;

$("#home_").click(function()
{
$("#seccion_filtro").css("display","none");
location.href="inicio_filtro.php";
});

$("#acerca").click(function()
{
location.href="#comunidad_myphoto";
});

$("#filtrar").click(function()
{
	$("#seccion_filtro").toggle("slow");
	$("#seccion_filtro").attr("class","active");
});

$("#boton_filtro").click(function(event)
{
event.preventDefault();

mostrar_imagenes($("#filtro_buscar").val(),null);
$("#seccion_filtro").fadeOut();
});

$("#mis_fotos").click(function()
{
//	alert("mis fotos");
//	alert(usuario_sesion);
	mostrar_imagenes(usuario_sesion,null);
});

$("#paisajes").click(function()
{
//alert("Paisajes");
filtro_categoria = "paisajes";
mostrar_imagenes(null,	filtro_categoria);
});
$("#amigos").click(function()
{
//alert("amigos");
filtro_categoria = "amigos";
mostrar_imagenes(null,  filtro_categoria);
});
$("#musica").click(function()
{
//alert("musica");
filtro_categoria = "musica";
mostrar_imagenes(null,  filtro_categoria);
});
$("#familia").click(function()
{
//alert("familia");
filtro_categoria = "familia";
mostrar_imagenes(null,  filtro_categoria);
});
$("#viajes").click(function()
{
//alert("viajes");
filtro_categoria = "viajes";
mostrar_imagenes(null,  filtro_categoria);
});
$("#encuentros").click(function()
{
//alert("encuentros");
filtro_categoria = "encuentros";
mostrar_imagenes(null,  filtro_categoria);
});
$("#otras_categorias").click(function()
{
//alert("Otras categorias");
//filtro_categoria = "paisajes";
mostrar_imagenes(null,  null);
});

$.ajax({
url:"php/descarga_inicial.php"
})
.done(function(data,textStatus,errorThrown)
{
//alert("Numero de categorias disponibles->"+data.num_categorias);
 
$("#numero_cliente").html(data.numero_cliente);
$("#numero_fotos").html(data.numero_fotos);
$("#numero_loc").html(data.numero_loc);
usuario_sesion = data.usuario_actual;
//Perfil
$("#user_perfil").val(data.user_perfil);
$("#nombre_perfil").val(data.nombre_perfil);
$("#apellidos_perfil").val(data.apellidos_perfil);
$("#email_perfil").val(data.email_perfil);
$("#password_perfil").val(data.password_perfil);
$("#descripcion_perfil").val(data.descripcion_perfil);

//Subir_imagen
$("#author").val(data.user_perfil);

//Mostramos las categorias disponibles
})
.fail(function(jqXHR,textStatus,errorThrown)
{
alert("PETADA PROFUNDA");
});

//--------------------------------------Muestra de imagenes inicial-----------------------------------------------------------------
//En lugar de cargar todas las imagenes del servidor podríamos volcar directamente las categorías disponibles
//mostrar_imagenes();
/*$("#imagenes").fadeIn();
setTimeout(function(){
        //$("#comunidad_myphoto").fadeIn();
        $("#contact").fadeIn();
        $("#footer").fadeIn();
},800);
*/
setTimeout(function()
{
$("#flecha_control").fadeIn("slow");
},1200);


/*
$.ajax({
url: "php/descarga_inicial.php"
})
.done(function(data,textStatus,jqXHR)
{
alert("Imagenes->"+data.num_imagenes);
$("#numero_cliente").html(data.numero_cliente);
$("#numero_fotos").html(data.numero_fotos);
$("#numero_loc").html(data.numero_loc);
//Descarga inicial de fotografias	
if(data.num_imagenes != 0)
{
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
	$("#comunidad_myphoto").fadeIn();
	//$("#contact").show();
	//$("#footer").show();
	},800);
}
else
{
	$("#mensaje_aviso").fadeIn();
	$("#mensaje_aviso").html("<h4 style="+"text-align:center;margin-top:150px;"+">No se encuentran imagenes en el servidor</h4>");
}

setTimeout(function(){
	//$("#comunidad_myphoto").fadeIn();
	$("#contact").fadeIn();
	$("#footer").fadeIn();
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
*/
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
$("#subir_imagen").click(function()
{
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
                alert("Entre en el done"+data.id_imagen);
                id_imagen = data.id_imagen;
		
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
                	//alert("Data->"+data.success);
                	$("#mensaje_respuesta_subida").html(data.respuesta);
		})
        	.fail(function(jqXHR,textStatus,errorThrown)
        	{
                   alert("Entre en el fail . . . . . . . . .");
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

function mostrar_imagenes(filtro_usuario,filtro_categoria)
{
//alert("Entr en funcion");
var id_minimo;
var id_maximo;
var datos;
var url_;
if(filtro_usuario != null)
{
	datos = "buscando="+filtro_usuario;
	url_ = "php/filtro.php";
}else
{
	if(filtro_categoria != null)
	{
		datos = "buscando="+filtro_categoria;
		url_ = "php/filtro_categoria.php";
	}
	else
	{
		datos = "";
		url_ = "php/descarga_inicial.php";
	}
}

$.ajax({
data: datos,
type: "POST",
url: url_
})
.done(function(data,textStatus,jqXHR)
{
//alert("Done");
//alert("Resultados->"+data.resultados);
//alert("Numero de resultados->"+data.num_imagenes);
id_minimo = data.id_minimo;
id_maximo = data.id_maximo;
//alert("Id_minimo->"+id_minimo);
//alert("Id_maximo->"+id_maximo);
$("#mensaje_aviso").html("<h3 style="+"margin-top:150px;>"+data.resultados+"</h3>");
$("#imagenes").fadeOut();
setTimeout(
function()
{
//$("#works").html(" ");
$("#imagenes").html(" ");
if(data.resultados != 0)
{
        var salida = "<div id="+"works"+">";
        //output = "<div id="+"works>";
        $.each(data.imagenes,function(key,value)
        {
  //              alert("Entro");
                salida += "<figure class="+"effect-oscar  wowload fadeInUp"+"><img height=450px width=102% src="+value.direccion_imagen+" alt=No puede encontrarse la imagen/><figcaption><h2 id="+"etiqueta"+">"+value.categoria+"</h2><p>"+value.titulo_imagen+"<br><a  href="+value.direccion_imagen+" title="+value.titulo_imagen+" data-gallery>Ver</a><a id="+value.id_imagen+" href=#about>Info foto</a></p></figcaption></figure>";
        })
        salida += "</div>";
  //      alert(salida); 
//        $("#works").html(salida);
        $("#imagenes").html(salida);
        $("#imagenes").fadeIn();
        $("#works").attr("class", "clearfix grid");
}
else
{
	$("#mensaje_aviso").fadeIn();
	$("#mensaje_aviso").html("<h4 style=text-align:center;margin-top:150px;>No se han encontrado imagenes</h4>");
}
for(i=id_minimo;i<=id_maximo;i++)
{
        $("#"+i).click(function()
        {
//                alert("he pulsado el "+i);
                //alert("Caracteristicas de la imagen:"+this.id);
                var id_imagen = this.id;
                $("#about").fadeIn();
        //Mapa
        //      crear_mapa(latitud,longitud);
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

		//Perfil
		$("#user_perfil").val(data.user_perfil);
		$("#nombre_perfil").val(data.nombre_perfil);
		$("#apellidos_perfil").val(data.apellidos_perfil);
		$("#email_perfil").val(data.email_perfil);
		$("#password_perfil").val(data.password_perfil);
		$("#descripcion_perfil").val(data.descripcion_perfil);

		//Subir_imagen
		$("#author").val(data.user_perfil);

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
},300);
})
.fail(function(jqXHR,textStatus,errorThrown)
{
   alert("no entre");
});

//}//FIN DEL IF

}//Fin función 
//Control de la aparición de los elementos
$("#perfil").click(function(e)
{
	e.preventDefault();
	$("#editlog").fadeIn();
        location.href = "#editlog";
});


});

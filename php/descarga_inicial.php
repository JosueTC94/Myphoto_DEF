 <?php
 
  require('conexion.php');
     
     session_start();
     $jsondata = array();
     

     $jsondata['usuario_actual'] = $_SESSION['user']; 
     $sql = "SELECT COUNT(user) as users from TIO_usuarios";
 
     $result = $conn->query($sql);
     $num_rows = $result->num_rows;
     $row = $result->fetch_assoc();

     if($result->num_rows > 0)
     {
          $jsondata['numero_cliente'] = $row['users']." usuarios";
     }
     else
     {
          $jsondata['numero_cliente'] = 0;
     }

     $sql2 = "SELECT COUNT(distinct id_imagen) as photos from TIO_IMAGENES";

     $result2 = $conn->query($sql2);
     $num_rows2 = $result2->num_rows;
     $row2 = $result2->fetch_assoc();

     if($result2->num_rows > 0)
     {
             $jsondata['numero_fotos'] = $row2['photos']." imágenes";
     }
     else
     {
             $jsondata['numero_fotos'] = 0;
     }

     $sql3 = "select count(id_imagen) as cuenta from TIO_IMAGENES where (latitud_imagen <> 0) AND (longitud_imagen <> 0)";

     $result3 = $conn->query($sql3);
     $num_rows3 = $result3->num_rows;
     $row3 = $result3->fetch_assoc();

     if($result3->num_rows > 0)
     {
             $jsondata['numero_loc'] = $row3['cuenta']." localizaciones";
     }
     else
     {
             $jsondata['numero_loc'] = 0;
     }

     $user = $_SESSION['user'];
     $sql4 = "select * from TIO_usuarios where user = '$user'";

     $result4 = $conn->query($sql4);
     $num_rows4 = $result4->num_rows;
     $row4 = $result4->fetch_assoc();

     if($result4->num_rows > 0)
     {
             $jsondata['user_perfil'] = $row4['user'];
             $jsondata['nombre_perfil'] = $row4['nombre_usuario'];
             $jsondata['apellidos_perfil'] = $row4['apellidos_usuario'];
             $jsondata['email_perfil'] = $row4['correo_usuario'];
             $jsondata['descripcion_perfil'] = $row4['detalles'];
             $jsondata['password_perfil'] = $row4['password_usuario'];
     }
     else
     {
             $jsondata['numero_loc'] = 0;
     }

     $sql6 = "SELECT MIN(id_imagen) as id_minimo from TIO_IMAGENES";

     $result6 = $conn->query($sql6);
     $num_rows6 = $result6->num_rows;
     $row6 = $result6->fetch_assoc();

     if($result6->num_rows > 0)
     {
             $jsondata['id_minimo'] = $row6['id_minimo'];
     }
     else
     {
             $jsondata['id_minimo'] = -1;
     }
     $sql7 = "SELECT MAX(id_imagen) as id_maximo from TIO_IMAGENES";

     $result7 = $conn->query($sql7);
     $num_rows7 = $result7->num_rows;
     $row7 = $result7->fetch_assoc();

     if($result7->num_rows > 0)
     {
             $jsondata['id_maximo'] = $row7['id_maximo'];
     }
     else
     {
             $jsondata['id_maximo'] = -1;
     }

     $sql5 = "SELECT * FROM TIO_IMAGENES";
     $result5 = $conn->query($sql5);
     $rowcount5 = $result5->num_rows;
     if($result5->num_rows > 0)
     {
             //$row = $result->fetch_assoc();
	     $jsondata['num_imagenes'] = $result5->num_rows;
	     $jsondata['imagenes'] = array();
	     while($row5 = $result5->fetch_array())
	     {	     
		$jsondata['imagenes'][] = $row5;   
	     }
     }
     else
     {
             $jsondata['num_imagenes'] = 0;
     }

     $sql10= "SELECT DISTINCT categoria FROM TIO_IMAGENES";
     $result10 = $conn->query($sql10);
     $rowcount10 = $result10->num_rows;
     if($result10->num_rows > 0)
     {
             //$row = $result->fetch_assoc();
             $jsondata['num_categorias'] = $rowcount10;
             $jsondata['categoria'] = array();
             while($row10 = $result10->fetch_array())
             {
                $jsondata['categoria'][] = $row10;
             }
     }
     else
     {
             $jsondata['num_categorias'] = 0;
     }
  	 
    $jsondata['error'] = error_get_last();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata, JSON_FORCE_OBJECT);
?>

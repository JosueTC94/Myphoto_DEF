<?php

require('conexion.php');

$jsondata = array();

        $categoria = $_POST['buscando'];

    $sql = "SELECT * from TIO_IMAGENES WHERE categoria like '$categoria'";

        $result = $conn->query($sql);
        $num_rows = $result->num_rows;
       // $row = $result->fetch_assoc();

        if($result->num_rows > 0)
        {
             //$row = $result->fetch_assoc();
             $jsondata['imagenes'] = array();
             while($row = $result->fetch_array())
             {
                $jsondata['imagenes'][] = $row;
             }
        }
        else
        {
	     $jsondata['mensaje_respuesta'] = "No se han encontrado imagenes";
             $jsondata['resultados'] = 0;
        }


     $sql6 = "SELECT MIN(id_imagen) as id_minimo from TIO_IMAGENES WHERE usuario like '$filtro'";

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
     $sql7 = "SELECT MAX(id_imagen) as id_maximo from TIO_IMAGENES WHERE usuario like '$filtro'";

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

$jsondata['error'] = error_get_last();
header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata, JSON_FORCE_OBJECT);

?>

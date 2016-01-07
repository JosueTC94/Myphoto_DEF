<?php

require('conexion.php');

$jsondata = array();

    $filtro = $_POST['buscando'];
   
    //$filtro = 'Cuevita';
    
    $sql = "SELECT id_imagen,titulo_imagen,descripcion_imagen from TIO_IMAGENES";

        $result = $conn->query($sql);
        $num_rows = $result->num_rows;

        if($result->num_rows > 0)
        {
		$jsondata['resultados'] = array();
		$count = 0;
        	while($row = $result->fetch_array())
		{
			$string = $row['titulo_imagen'];
			$string1 = $row['descripcion_imagen'];
			$token = strtok($string," ");
			$token1 = strtok($string1, " ");
			while($token !== false and $token1 !== false)
			{
				if(strcmp($token, $filtro) != 0 and strcmp($token1,$filtro) != 0)
				{	
					$token = strtok(" ");
					$token1 = strtok(" ");
				}
				else
				{
					$jsondata['resultados']['id_imagen'][] = $row['id_imagen'];
					$count += 1;
					break;
				}
			}
		}   
        }
        else
        {
                $jsondata['resultados'] = 0;
        }
	
	$jsondata['cuenta'] = "\nSe han encontrado ".$count. " referencias";

$jsondata['error'] = error_get_last();
header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata, JSON_FORCE_OBJECT);

?>

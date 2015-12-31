<?php
require('conexion.php');

    $jsondata['conexion'] = "Conexion exitosa";
    $jsondata['nombre_archivo'] =  $_FILES["archivo"]["name"];
    $jsondata['tipo_archivo'] = $_FILES["archivo"]["type"];
    $jsondata['tamano_archivo'] = $_FILES["archivo"]["size"];
    $jsondata['tmp_archivo'] = $_FILES["archivo"]["tmp_name"];
    $jsondata['archivador'] = $upload_folder . $nombre_archivo;
    
    $target_path = "../images/";
    $target_path = $target_path . basename( $_FILES['archivo']['name']); if(move_uploaded_file($_FILES['archivo']['tmp_name'], $target_path)) { $jsondata['success'] = "El archivo ". basename( $_FILES['archivo']['name']). " ha sido subido";
    } else{
      $jsondata['error'] =  error_get_last();
      //echo "Ha ocurrido un error, trate de nuevo!";
   }


    $archivador = "./images/".$jsondata['nombre_archivo'];
    //$v_imagen = $target_path.$_FILES['archivo']['name'];
    $v_imagen = "../images/".$jsondata['nombre_archivo'];
    $jsondata['v_imagen'] = $v_imagen;
    // Generar thumbnail.
    $v_ancho_imagen = 1234;
    $v_alto_imagen = 800;
    $v_tipo_imagen = 'jpg';
    $v_thumbnail = exif_thumbnail($v_imagen, $v_ancho_imagen, $v_alto_imagen, $v_tipo_imagen);

    $v_exif = exif_read_data($v_imagen);
    $v_longitud = getGps($v_exif["GPSLongitude"], $v_exif['GPSLongitudeRef']);
    $v_latitud = getGps($v_exif["GPSLatitude"], $v_exif['GPSLatitudeRef']);
    $v_tamanio = $v_exif["FileSize"];
    $v_dispositivo = $v_exif["Make"];
    $v_datetime = $v_exif["DateTime"];
    $v_tipoimagen = $v_exif["MimeType"];
    $v_nombrearchivo =$v_exif["FileName"];
    $v_flash = $v_exif["Flash"];    

    $jsondata['latitud'] = "La latitud de la imagen es: " . $v_latitud;
    $jsondata['longitud'] = "La longitud de la imagen es: " . $v_longitud;
    $jsondata['tam_imagen'] = $v_exif["FileSize"]; 
    
    $query = "INSERT INTO TIO_IMAGENES(direccion_imagen,latitud_imagen,longitud_imagen,tam_imagen,dispositivo_imagen,fecha_imagen,tipo_imagen,nombre_archivo,flash) VALUES('$archivador',$v_latitud,$v_longitud,$v_tamanio,'$v_dispositivo','$v_datetime','$v_tipoimagen','$v_nombrearchivo','$v_flash')";

    if ($conn->query($query) === TRUE) {
           $jsondata['success'] = "El archivo se ha subido correctamente al servidor";
    } else {
        $jsondata['success'] = "Error al subir archivo: " . $conn->error;   
    }

            function getGps($exifCoord, $hemi){
                $degrees = count($exifCoord) > 0 ? gps2Num($exifCoord[0]) : 0;
                $minutes = count($exifCoord) > 1 ? gps2Num($exifCoord[1]) : 0;
                $seconds = count($exifCoord) > 2 ? gps2Num($exifCoord[2]) : 0;

                $flip = ($hemi == 'W' or $hemi == 'S') ? -1 : 1;
                return $flip * ($degrees + $minutes / 60 + $seconds / 3600);
            }

            function gps2Num($coordPart) {
                $parts = explode('/', $coordPart);
                if(count($parts) <= 0){
                    return 0;
                }
                if (count($parts) == 1){
                    return $parts[0];
                }
                return floatval($parts[0]) / floatval($parts[1]);
            }

    
    //NO RULA CON IMÁGENES PNG
    /*if(!move_uploaded_file($tmp_archivo,$archivador))
    {
        $jsondata['success'] = "No se ha producido la subida al servidor con normalidad";
    }else{
        $jsondata['success'] = "El archivo ".$nombre_archivo." se ha subido al servidor";
    }*/
    
    //$query1 = "SELECT id_imagen FROM TIO_IMAGENES WHERE id_imagen >= ALL(SELECT id_imagen from TIO_IMAGENES)";
    $query1 = "SELECT id_imagen FROM TIO_IMAGENES WHERE direccion_imagen = '$archivador' AND latitud_imagen = $v_latitud AND longitud_imagen = $v_longitud AND tam_imagen = $v_tamanio AND dispositivo_imagen = '$v_dispositivo' AND fecha_imagen = '$v_datetime' AND tipo_imagen = '$v_tipoimagen' AND nombre_archivo = '$_nombrearchivo'");

    $result = $conn->query($query1);
    
    if ($result->num_rows > 0) {
    // output data of each row
        $row = $result->fetch_assoc();
        $jsondata['id_imagen'] = $row['id_imagen'];
    } else {
        $jsondata['id_imagen'] = "0 results";
    }
    
    $jsondata['error'] = error_get_last();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata, JSON_FORCE_OBJECT);
?>

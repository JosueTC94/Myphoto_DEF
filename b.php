<?php
session_start();
if(isset($_POST['user'])==false)
{
	header("location: inicio_sesion/index.php");
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Pagina 2</title>
</head>
<body>
<?php
if(isset($_POST['user'])){
$_SESSION['user'] = $_POST['user'];
echo "Bienvenido! Has iniciado sesion: ".$_POST['user'];
}else{
if(isset($_SESSION['user'])){
echo "Has iniciado Sesion: ".$_SESSION['user'];
}else{
echo "Acceso Restringido quietorrrr";
}
}
?>
<br /><a href="inicio_sesion/index.php">Ir a pagina 1</a>
</body>
</html>

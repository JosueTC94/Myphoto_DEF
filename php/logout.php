<?php

session_start();
session_unset();
session_destroy();
header("Location: /alu4588/TIO_PLANTILLA/inicio_sesion/index.php");
?>

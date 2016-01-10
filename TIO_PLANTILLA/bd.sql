-- MySQL dump 10.13  Distrib 5.5.37, for Linux (i686)
--
-- Host: localhost    Database: alu4588
-- ------------------------------------------------------
-- Server version	5.5.37-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TIO_IMAGENES`
--

DROP TABLE IF EXISTS `TIO_IMAGENES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TIO_IMAGENES` (
  `id_imagen` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `titulo_imagen` varchar(300) NOT NULL,
  `autor_imagen` varchar(300) NOT NULL,
  `latitud_imagen` float NOT NULL,
  `longitud_imagen` float NOT NULL,
  `direccion_imagen` varchar(300) NOT NULL,
  `descripcion_imagen` varchar(300) DEFAULT NULL,
  `tipo_imagen` varchar(150) NOT NULL,
  `nombre_archivo` varchar(250) NOT NULL,
  `tam_imagen` float NOT NULL,
  `fecha_imagen` datetime NOT NULL,
  `dispositivo_imagen` varchar(250) NOT NULL,
  `flash` tinyint(1) NOT NULL,
  `categoria` varchar(150) DEFAULT NULL,
  `usuario` varchar(150) NOT NULL,
  PRIMARY KEY (`id_imagen`)
);
CREATE TABLE `TIO_usuarios` (
  `ID_usuario` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(300) NOT NULL,
  `apellidos_usuario` varchar(300) NOT NULL,
  `correo_usuario` varchar(300) NOT NULL,
  `password_usuario` varchar(300) DEFAULT NULL,
  `detalles` varchar(450) NOT NULL,
  `nombre_archivo` varchar(250) NOT NULL,
  `user` varchar(150) NOT NULL,
  UNIQUE (`user`),
  PRIMARY KEY (`ID_usuario`)
)

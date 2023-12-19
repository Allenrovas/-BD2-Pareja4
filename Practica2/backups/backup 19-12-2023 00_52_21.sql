-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bd2_practica2
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `idHabitacion` int NOT NULL AUTO_INCREMENT,
  `habitacion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idHabitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_actividad`
--

DROP TABLE IF EXISTS `log_actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_actividad` (
  `id_log_actividad` int NOT NULL AUTO_INCREMENT,
  `timestampx` varchar(100) DEFAULT NULL,
  `actividad` varchar(500) DEFAULT NULL,
  `idHabitacion` int DEFAULT NULL,
  `idPaciente` int DEFAULT NULL,
  PRIMARY KEY (`id_log_actividad`),
  KEY `idHabitacion` (`idHabitacion`),
  KEY `idPaciente` (`idPaciente`),
  CONSTRAINT `log_actividad_ibfk_1` FOREIGN KEY (`idHabitacion`) REFERENCES `habitacion` (`idHabitacion`),
  CONSTRAINT `log_actividad_ibfk_2` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`idPaciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_actividad`
--

LOCK TABLES `log_actividad` WRITE;
/*!40000 ALTER TABLE `log_actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_habitacion`
--

DROP TABLE IF EXISTS `log_habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_habitacion` (
  `timestampx` varchar(100) NOT NULL,
  `statusx` varchar(45) NOT NULL,
  `idHabitacion` int NOT NULL,
  PRIMARY KEY (`timestampx`,`idHabitacion`),
  KEY `idHabitacion` (`idHabitacion`),
  CONSTRAINT `log_habitacion_ibfk_1` FOREIGN KEY (`idHabitacion`) REFERENCES `habitacion` (`idHabitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_habitacion`
--

LOCK TABLES `log_habitacion` WRITE;
/*!40000 ALTER TABLE `log_habitacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_operaciones_bd`
--

DROP TABLE IF EXISTS `log_operaciones_bd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_operaciones_bd` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) DEFAULT NULL,
  `accion` varchar(255) DEFAULT NULL,
  `fecha_hora` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_log`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_operaciones_bd`
--

LOCK TABLES `log_operaciones_bd` WRITE;
/*!40000 ALTER TABLE `log_operaciones_bd` DISABLE KEYS */;
INSERT INTO `log_operaciones_bd` VALUES (1,'admin','El usuario administrador \'admin\' no existe','2023-12-19 04:24:58'),(2,'root','Inserto un nuevo registro en la tabla usuarios','2023-12-19 04:26:05'),(3,'admin','Inició una conexión a la base de datos','2023-12-19 04:26:59'),(4,'admin','Inserto un nuevo registro en la tabla usuarios','2023-12-19 04:26:59'),(5,'admin','Registró al usuario daniel con el rol Doctor','2023-12-19 04:26:59'),(6,'admin','Cerró la conexión a la base de datos','2023-12-19 04:26:59'),(7,'admin','El usuario \'daniel\' que intentó registrar ya existe','2023-12-19 04:43:17'),(8,'admin','Intentó registrar un usuario, credenciales de administrador incorrectas','2023-12-19 04:43:39'),(9,'adminn','El usuario administrador \'adminn\' no existe','2023-12-19 04:44:02'),(10,'admin','Inició una conexión a la base de datos','2023-12-19 04:44:55'),(11,'admin','Inserto un nuevo registro en la tabla usuarios','2023-12-19 04:44:55'),(12,'admin','Registró al usuario asd con el rol Asistente','2023-12-19 04:44:55'),(13,'admin','Cerró la conexión a la base de datos','2023-12-19 04:44:55'),(14,'admin','Inició una conexión a la base de datos','2023-12-19 05:09:49'),(15,'admin','Inició una conexión a la base de datos','2023-12-19 05:11:11'),(16,'admin','Inició una conexión a la base de datos','2023-12-19 05:11:52'),(17,'admin','Inició una conexión a la base de datos','2023-12-19 05:14:34'),(18,'admin','Inició una conexión a la base de datos','2023-12-19 05:16:05'),(19,'daniel','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:34:07'),(20,'daniel','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:34:16'),(21,'admin','Inició una conexión a la base de datos','2023-12-19 05:34:28'),(22,'admin','Cerró la conexión a la base de datos','2023-12-19 05:34:32'),(23,'admin','Inició una conexión a la base de datos','2023-12-19 05:35:50'),(24,'admin','Inserto un nuevo registro en la tabla usuarios','2023-12-19 05:35:50'),(25,'admin','Registró al usuario daniel con el rol Asistente','2023-12-19 05:35:50'),(26,'admin','Cerró la conexión a la base de datos','2023-12-19 05:35:50'),(27,'daniel','Inició una conexión a la base de datos','2023-12-19 05:35:56'),(28,'daniel','Inició una conexión a la base de datos','2023-12-19 05:40:59'),(29,'daniel','Intentó realizar un respaldo, no tiene los permisos correspondiente a su rol','2023-12-19 05:41:03'),(30,'daniel','Inició una conexión a la base de datos','2023-12-19 05:42:08'),(31,'daniel','Intentó realizar un respaldo, no tiene los permisos correspondiente a su rol','2023-12-19 05:42:10'),(32,'asdd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:46:51'),(33,'asd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:47:09'),(34,'asd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:47:23'),(35,'daniel','Inició una conexión a la base de datos','2023-12-19 05:47:29'),(36,'daniel','Cerró la conexión a la base de datos','2023-12-19 05:47:32'),(37,'asd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:48:08'),(38,'asd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:49:11'),(39,'asd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:50:33'),(40,'asd','Intentó iniciar sesión con credenciales de incorrectas','2023-12-19 05:51:20'),(41,'asd','Intentó iniciar sesión con un usuario que no existe','2023-12-19 05:51:56'),(42,'admin','Inició una conexión a la base de datos','2023-12-19 06:19:09'),(43,'admin','Intentó realizar un respaldo, ocurrio un error en la creacion','2023-12-19 06:19:15'),(44,'admin','Inició una conexión a la base de datos','2023-12-19 06:19:59'),(45,'admin','Intentó realizar un respaldo, ocurrio un error en la creacion','2023-12-19 06:20:05'),(46,'admin','Inició una conexión a la base de datos','2023-12-19 06:24:10'),(47,'admin','Inició una conexión a la base de datos','2023-12-19 06:25:07'),(48,'admin','Inició una conexión a la base de datos','2023-12-19 06:29:26'),(49,'admin','Inició una conexión a la base de datos','2023-12-19 06:31:16'),(50,'admin','Inició una conexión a la base de datos','2023-12-19 06:33:35'),(51,'admin','Inició una conexión a la base de datos','2023-12-19 06:34:00'),(52,'admin','Inició una conexión a la base de datos','2023-12-19 06:36:40'),(53,'admin','Inició una conexión a la base de datos','2023-12-19 06:37:41'),(54,'admin','Intentó realizar un respaldo, ocurrio un error en la creacion','2023-12-19 06:37:45'),(55,'admin','Inició una conexión a la base de datos','2023-12-19 06:42:47'),(56,'admin','Intentó realizar un respaldo, ocurrio un error en la creacion','2023-12-19 06:42:49'),(57,'admin','Inició una conexión a la base de datos','2023-12-19 06:43:31'),(58,'admin','Intentó realizar un respaldo, no confirmó la acción','2023-12-19 06:43:35'),(59,'admin','Intentó realizar un respaldo, ocurrio un error en la creacion','2023-12-19 06:43:52'),(60,'admin','Inició una conexión a la base de datos','2023-12-19 06:45:22'),(61,'admin','Intentó realizar un respaldo, ocurrio un error en la creacion','2023-12-19 06:45:24'),(62,'admin','Inició una conexión a la base de datos','2023-12-19 06:46:27'),(63,'admin','Realizó un respaldo completo con exito','2023-12-19 06:46:32'),(64,'admin','Inició una conexión a la base de datos','2023-12-19 06:50:42'),(65,'admin','Realizó un respaldo completo con exito','2023-12-19 06:50:45'),(66,'admin','Inició una conexión a la base de datos','2023-12-19 06:52:16');
/*!40000 ALTER TABLE `log_operaciones_bd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `idPaciente` int NOT NULL AUTO_INCREMENT,
  `edad` int DEFAULT NULL,
  `genero` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idPaciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','','Administrador'),(2,'daniel','$2b$04$BNiW2r2bofECNzp4HFCtfej5JlqXrqD.Afrc/oVa4hP/ZdykAaLcS','Doctor'),(3,'asd','$2b$04$hFNPmnXRB/m2cbuGfjMEAOa/Cu0E5WDouySTKUSY5sVWZCME.hHWa','Asistente'),(4,'daniel','$2b$04$oeSVgza2W0WFGwuc9YCgT.LbP/.OFKDasnjDk7DoB5/n/o4cVtoQC','Asistente');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-19  0:52:21

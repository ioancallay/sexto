/*
 Navicat Premium Data Transfer
 
 Source Server         : APP_WEB
 Source Server Type    : MySQL
 Source Server Version : 80039
 Source Host           : www.ioasystem.com:3306
 Source Schema         : ioasyste_sexto
 
 Target Server Type    : MySQL
 Target Server Version : 80039
 File Encoding         : 65001
 
 Date: 31/08/2024 10:04:45
 */
CREATE SCHEMA IF NOT EXISTS `Sexto` DEFAULT CHARACTER SET utf8;

USE `Sexto`;

 SET
  NAMES utf8mb4;

 SET
  FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Clientes
-- ----------------------------
DROP TABLE IF EXISTS `Clientes`;

CREATE TABLE `Clientes` (
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `Nombres` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Direccion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Telefono` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Cedula` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Correo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idClientes`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Detalle_Factura
-- ----------------------------
DROP TABLE IF EXISTS `Detalle_Factura`;

CREATE TABLE `Detalle_Factura` (
  `idDetalle_Factura` int NOT NULL AUTO_INCREMENT,
  `Cantidad` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Factura_idFactura` int NOT NULL,
  `Kardex_idKardex` int NOT NULL,
  `Precio_Unitario` decimal(10, 0) NOT NULL,
  `Sub_Total_item` decimal(10, 0) NOT NULL,
  PRIMARY KEY (`idDetalle_Factura`) USING BTREE,
  INDEX `fk_Detalle_Factura_Factura1_idx`(`Factura_idFactura`) USING BTREE,
  INDEX `fk_Detalle_Factura_Kardex1_idx`(`Kardex_idKardex`) USING BTREE,
  CONSTRAINT `fk_Detalle_Factura_Factura1` FOREIGN KEY (`Factura_idFactura`) REFERENCES `Factura` (`idFactura`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Detalle_Factura_Kardex1` FOREIGN KEY (`Kardex_idKardex`) REFERENCES `Kardex` (`idKardex`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Factura
-- ----------------------------
DROP TABLE IF EXISTS `Factura`;

CREATE TABLE `Factura` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `Fecha` datetime NOT NULL,
  `Sub_total` decimal(10, 0) NOT NULL,
  `Sub_total_iva` decimal(10, 0) NOT NULL,
  `Valor_IVA` decimal(10, 0) NOT NULL,
  `Clientes_idClientes` int NOT NULL,
  PRIMARY KEY (`idFactura`) USING BTREE,
  INDEX `fk_Factura_Clientes1_idx`(`Clientes_idClientes`) USING BTREE,
  CONSTRAINT `fk_Factura_Clientes1` FOREIGN KEY (`Clientes_idClientes`) REFERENCES `Clientes` (`idClientes`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for IVA
-- ----------------------------
DROP TABLE IF EXISTS `IVA`;

CREATE TABLE `IVA` (
  `idIVA` int NOT NULL AUTO_INCREMENT,
  `Detalle` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '8%\n12%\n15%',
  `Estado` int NOT NULL COMMENT '1 = activo\n0 = inactivo',
  `Valor` int NULL DEFAULT NULL COMMENT 'Campo para almacenar el valor en entero para realizar calculos',
  PRIMARY KEY (`idIVA`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Kardex
-- ----------------------------
DROP TABLE IF EXISTS `Kardex`;

CREATE TABLE `Kardex` (
  `idKardex` int NOT NULL AUTO_INCREMENT,
  `Estado` int NOT NULL COMMENT 'Campo para almacenar el estado del kardex\n1 = activo\n0 = inactivo',
  `Fecha_Transaccion` datetime NOT NULL,
  `Cantidad` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Valor_Compra` decimal(10, 0) NOT NULL,
  `Valor_Venta` decimal(10, 0) NOT NULL,
  `Unidad_Medida_idUnidad_Medida` int NOT NULL,
  `Unidad_Medida_idUnidad_Medida1` int NOT NULL,
  `Unidad_Medida_idUnidad_Medida2` int NOT NULL,
  `Valor_Ganacia` decimal(10, 0) NULL DEFAULT NULL,
  `IVA` int NOT NULL,
  `IVA_idIVA` int NOT NULL,
  `Proveedores_idProveedores` int NOT NULL,
  `Productos_idProductos` int NOT NULL,
  `Tipo_Transaccion` int NOT NULL COMMENT '1= entrada Ej: Compra\n0 = salida  Ej: Venta',
  PRIMARY KEY (`idKardex`) USING BTREE,
  INDEX `fk_Kardex_Unidad_Medida_idx`(`Unidad_Medida_idUnidad_Medida`) USING BTREE,
  INDEX `fk_Kardex_Unidad_Medida1_idx`(`Unidad_Medida_idUnidad_Medida1`) USING BTREE,
  INDEX `fk_Kardex_Unidad_Medida2_idx`(`Unidad_Medida_idUnidad_Medida2`) USING BTREE,
  INDEX `fk_Kardex_IVA1_idx`(`IVA_idIVA`) USING BTREE,
  INDEX `fk_Kardex_Proveedores1_idx`(`Proveedores_idProveedores`) USING BTREE,
  INDEX `fk_Kardex_Productos1_idx`(`Productos_idProductos`) USING BTREE,
  CONSTRAINT `fk_Kardex_IVA1` FOREIGN KEY (`IVA_idIVA`) REFERENCES `IVA` (`idIVA`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Productos1` FOREIGN KEY (`Productos_idProductos`) REFERENCES `Productos` (`idProductos`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Proveedores1` FOREIGN KEY (`Proveedores_idProveedores`) REFERENCES `Proveedores` (`idProveedores`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Unidad_Medida` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida`) REFERENCES `Unidad_Medida` (`idUnidad_Medida`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Unidad_Medida1` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida1`) REFERENCES `Unidad_Medida` (`idUnidad_Medida`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Unidad_Medida2` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida2`) REFERENCES `Unidad_Medida` (`idUnidad_Medida`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Productos
-- ----------------------------
DROP TABLE IF EXISTS `Productos`;

CREATE TABLE `Productos` (
  `idProductos` int NOT NULL AUTO_INCREMENT,
  `Codigo_Barras` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `Nombre_Producto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Graba_IVA` int NOT NULL COMMENT 'Campo para almacenar si el producto graba IVA o no\n1 = Graba IVA\n0 = No posee IVA',
  PRIMARY KEY (`idProductos`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Proveedores
-- ----------------------------
DROP TABLE IF EXISTS `Proveedores`;

CREATE TABLE `Proveedores` (
  `idProveedores` int NOT NULL AUTO_INCREMENT,
  `Nombre_Empresa` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Direccion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `Telefono` varchar(17) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Contacto_Empresa` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Campo para almacenar el nombre del empleado de la empresa para contactarse',
  `Telefono_Contacto` varchar(17) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Campo para almacenar el numero de telefono del coantacto de la emprsa',
  PRIMARY KEY (`idProveedores`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Roles
-- ----------------------------
DROP TABLE IF EXISTS `Roles`;

CREATE TABLE `Roles` (
  `idRoles` int NOT NULL AUTO_INCREMENT,
  `Detalle` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idRoles`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Unidad_Medida
-- ----------------------------
DROP TABLE IF EXISTS `Unidad_Medida`;

CREATE TABLE `Unidad_Medida` (
  `idUnidad_Medida` int NOT NULL AUTO_INCREMENT,
  `Detalle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `Tipo` int NULL DEFAULT NULL COMMENT '1 = Unidad de Medida Ej: Gramos, Litros, Kilos\n0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack\n2 = Factor de Conversion Ej: Kilos a libras',
  PRIMARY KEY (`idUnidad_Medida`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Usuarios
-- ----------------------------
DROP TABLE IF EXISTS `Usuarios`;

CREATE TABLE `Usuarios` (
  `idUsuarios` int NOT NULL AUTO_INCREMENT,
  `Nombre_Usuario` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Contrasenia` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Estado` int NOT NULL,
  `Roles_idRoles` int NOT NULL,
  PRIMARY KEY (`idUsuarios`) USING BTREE,
  INDEX `fk_Usuarios_Roles_idx`(`Roles_idRoles`) USING BTREE,
  CONSTRAINT `fk_Usuarios_Roles` FOREIGN KEY (`Roles_idRoles`) REFERENCES `Roles` (`idRoles`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

SET
  FOREIGN_KEY_CHECKS = 1;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-07-2024 a las 06:19:40
-- Versión del servidor: 10.5.20-MariaDB
-- Versión de PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id22338061_hanami`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `ID_Like` int(11) NOT NULL,
  `ID_User_FK` int(11) NOT NULL,
  `ID_Movie_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `ID_Review` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Text` text DEFAULT NULL,
  `Score` decimal(4,2) NOT NULL,
  `Date` datetime NOT NULL,
  `ID_User_FK` int(11) NOT NULL,
  `ID_Movie_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `ID_Rol` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`ID_Rol`, `Name`, `Description`) VALUES
(1, 'Admin', 'Usuario Administrador con todos los privilegios.'),
(2, 'Normal', 'Usuarios normales de la app.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `ID_Tag` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID_User` int(11) NOT NULL,
  `ID_Rol_FK` int(11) NOT NULL DEFAULT 0,
  `UserName` varchar(50) NOT NULL DEFAULT '',
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(70) NOT NULL DEFAULT '',
  `Mail` varchar(70) NOT NULL DEFAULT '',
  `Genero` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID_User`, `ID_Rol_FK`, `UserName`, `FirstName`, `LastName`, `Password`, `Mail`, `Genero`) VALUES
(6, 2, 'negro', 'Guillermo', 'Garcia', '$2y$10$P9rNndfRHRdFMfLSvsUfXu0qfl5fQu3KwosgycNYB8/kg/KaQZHvS', 'negro@gmail.com', 'Masculino'),
(7, 2, 'Ch15toph3r', 'Cristopher', 'Avila', '$2y$10$ZvJ7KFUwx2dcomwFSgXknu4CktkXYP7Y6yHGNJw24Ywyrrrtq0gI6', 'smolchristopher@gmail.com', 'Masculino'),
(8, 2, 'geyser0612', 'Geyser ', 'Velasquez', '$2y$10$SzsACLJaiVBNl4WyIfXc0uavzDUP/uXCVU9t8BZ6voqXXGOEkV.Lq', 'geyser2004@gmail.com', 'Masculino'),
(9, 2, 'WillyW', 'Guillermo ', 'García ', '$2y$10$/iHqqdlUbCEAScBK2L4XVutXO1yyMX2JR1IIQZvwT1NJ1lprMFXfm', 'ggarcia.5065@unimar.edu.ve', 'Masculino'),
(10, 2, 'Gbriel13 ', 'Gabriel ', 'Cardona ', '$2y$10$IXZsuxxLfno9wsvNYSGOdOwYQpl5Y5oT1ZlsGNWDiuUU1BIxdcfkK', 'gabricarort@gmail.com', 'Masculino'),
(11, 2, 'god', 'God', 'God', '$2y$10$Q1/76DaeQ2fOtO6Eap26KO9wK3VZuUjeNvtr8yuFwetEWzGhmRgBC', 'god@gmail.com', 'Otro'),
(12, 2, 'pepe11', 'pepe', 'gonzalez', '$2y$10$RDITOftMRqqIXh25WE8vW.DiNLKDl1UCGtpITtrhaZ7vYT.b3GZLi', 'pepe@gmail.com', 'Masculino'),
(13, 2, 'mariaDB', 'maria', 'db', '$2y$10$yf2XImITjiSTOyXKPzRDUO0JJW9gAzGNHZ/Q5sTg2pkzeshpW50ha', 'maria@gmail.com', 'Femenino'),
(14, 2, 'Martin', 'Martin', 'Velasquez', '$2y$10$KB34gdCi5aldujVWpi.iWuSjgJZMFB/i9VDxWXRkHGKE1JkqFMlMy', 'martin@gmail.com', 'Masculino'),
(15, 2, 'Mano', 'mano', 'Mano', '$2y$10$ujWsC299rd4uxDkvW.6sDe/mEQh.GnD3TMav4wv7yNinGVp1fagxO', 'gg@gmail.com', 'Masculino'),
(16, 2, 'xdddgod', 'xdd', 'god', '$2y$10$kZXFvsU3ln1Oi1GffOj2SeaLooH7/llNxDzDl62qRdlDPx.V.kiTm', 'xdd@gmail.com', 'Otro'),
(17, 2, 'IzakiPedro', 'Pedro', 'Ernández', '$2y$10$4gymNYddi0HR0dy90buJsOrtDI1yPvv8IL8PAuNeLeAHfA/koo9mW', 'pedroernandezizaki@gmail.com', 'Masculino'),
(18, 2, 'walas', 'William', 'Alas', '$2y$10$1xcj22lR928gZGkarpXEu.a4quuAvAeJmozBV3WzzUEZqE/PTi7/G', 'walas.9519@unimar.edu.ve', 'Masculino'),
(19, 2, 'mroz', 'Miguel', 'Rodriguez', '$2y$10$bY9DTXFZ/UUrEJBuX/RzfuWZRdZX1cI6cyndEi7tXVqh976trYvAe', 'mroz@gmail.com', 'Masculino'),
(20, 2, 'sack', 'Manuel', 'Casique ', '$2y$10$l.M2krScotbhaoslLTjOC.jb0rNxSo7Nn1Fi05ticQSyoaGLX2j8e', 'mcasique.4784@unimar.edu.ve', 'Masculino'),
(21, 2, 'jija', 'Joberson', 'Buscema', '$2y$10$56F3g6kQo0b19zVbK5kP.uGXmGlcK4Tbl/wEZ5pPV28VT76u8WbYG', 'cansor.beach@gmail.com', 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usertags`
--

CREATE TABLE `usertags` (
  `ID_UserTags` int(11) NOT NULL,
  `ID_User_FK` int(11) DEFAULT NULL,
  `ID_Tag_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`ID_Like`),
  ADD KEY `ID_User_FK` (`ID_User_FK`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ID_Review`),
  ADD KEY `ID_User_FK` (`ID_User_FK`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`ID_Tag`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_User`) USING BTREE,
  ADD KEY `Roles` (`ID_Rol_FK`);

--
-- Indices de la tabla `usertags`
--
ALTER TABLE `usertags`
  ADD PRIMARY KEY (`ID_UserTags`),
  ADD KEY `Users` (`ID_User_FK`) USING BTREE,
  ADD KEY `UserTags_Tags` (`ID_Tag_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `ID_Like` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `ID_Review` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `ID_Tag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `usertags`
--
ALTER TABLE `usertags`
  MODIFY `ID_UserTags` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`ID_User_FK`) REFERENCES `users` (`ID_User`) ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`ID_Movie_FK`) REFERENCES `movies` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`ID_Movie_FK`) REFERENCES `movies` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`ID_User_FK`) REFERENCES `users` (`ID_User`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `Roles` FOREIGN KEY (`ID_Rol_FK`) REFERENCES `rols` (`ID_Rol`);

--
-- Filtros para la tabla `usertags`
--
ALTER TABLE `usertags`
  ADD CONSTRAINT `UserTags_Tags` FOREIGN KEY (`ID_Tag_FK`) REFERENCES `tags` (`ID_Tag`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `UserTags_Users` FOREIGN KEY (`ID_User_FK`) REFERENCES `users` (`ID_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

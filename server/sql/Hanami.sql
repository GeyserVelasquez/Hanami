-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 19, 2024 at 11:10 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hanami`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `ID` int NOT NULL,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Sinopsis` varchar(500) NOT NULL DEFAULT '',
  `Length` time NOT NULL,
  `Year` year NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `moviestags`
--

CREATE TABLE `moviestags` (
  `ID_MoviesTags` int NOT NULL,
  `ID_Movie_FK` int DEFAULT NULL,
  `ID_Tag_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `ID_Review` int NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Text` text,
  `Score` decimal(4,2) NOT NULL,
  `Date` datetime NOT NULL,
  `ID_User_FK` int NOT NULL,
  `ID_Movie_FK` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rols`
--

CREATE TABLE `rols` (
  `ID_Rol` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rols`
--

INSERT INTO `rols` (`ID_Rol`, `Name`, `Description`) VALUES
(1, 'Admin', 'Usuario Administrador con todos los privilegios.'),
(2, 'Normal', 'Usuarios normales de la app.');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `ID_Tag` int NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID_User` int NOT NULL,
  `ID_Rol_FK` int NOT NULL DEFAULT '0',
  `UserName` varchar(50) NOT NULL DEFAULT '',
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(70) NOT NULL DEFAULT '',
  `Mail` varchar(70) NOT NULL DEFAULT '',
  `Genero` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID_User`, `ID_Rol_FK`, `UserName`, `FirstName`, `LastName`, `Password`, `Mail`, `Genero`) VALUES
(1, 1, 'revan', 'Geyser', 'Velasquez', '1234', 'gvelasquez.9312@unimar.edu.ve', 'Masculino'),
(2, 2, 'geyser', 'geyser', 'geyser', 'geyser', 'geyser', 'geyser'),
(3, 2, 'revancito', 'geyser', 'velasquez', '123', 'Geyser@gmail.com', 'Masculino');

-- --------------------------------------------------------

--
-- Table structure for table `usertags`
--

CREATE TABLE `usertags` (
  `ID_UserTags` int NOT NULL,
  `ID_User_FK` int DEFAULT NULL,
  `ID_Tag_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `moviestags`
--
ALTER TABLE `moviestags`
  ADD PRIMARY KEY (`ID_MoviesTags`),
  ADD KEY `MoviesTags_Movies` (`ID_Movie_FK`),
  ADD KEY `MovieTags_Tag` (`ID_Tag_FK`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ID_Review`),
  ADD KEY `ID_User_FK` (`ID_User_FK`),
  ADD KEY `ID_Movie_FK` (`ID_Movie_FK`);

--
-- Indexes for table `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`ID_Tag`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_User`) USING BTREE,
  ADD KEY `Roles` (`ID_Rol_FK`);

--
-- Indexes for table `usertags`
--
ALTER TABLE `usertags`
  ADD PRIMARY KEY (`ID_UserTags`),
  ADD KEY `Users` (`ID_User_FK`) USING BTREE,
  ADD KEY `UserTags_Tags` (`ID_Tag_FK`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `moviestags`
--
ALTER TABLE `moviestags`
  MODIFY `ID_MoviesTags` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ID_Review` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rols`
--
ALTER TABLE `rols`
  MODIFY `ID_Rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `ID_Tag` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID_User` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usertags`
--
ALTER TABLE `usertags`
  MODIFY `ID_UserTags` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `moviestags`
--
ALTER TABLE `moviestags`
  ADD CONSTRAINT `MoviesTags_Movies` FOREIGN KEY (`ID_Movie_FK`) REFERENCES `movies` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `MovieTags_Tag` FOREIGN KEY (`ID_Tag_FK`) REFERENCES `tags` (`ID_Tag`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`ID_Movie_FK`) REFERENCES `movies` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`ID_User_FK`) REFERENCES `users` (`ID_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `Roles` FOREIGN KEY (`ID_Rol_FK`) REFERENCES `rols` (`ID_Rol`);

--
-- Constraints for table `usertags`
--
ALTER TABLE `usertags`
  ADD CONSTRAINT `UserTags_Tags` FOREIGN KEY (`ID_Tag_FK`) REFERENCES `tags` (`ID_Tag`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `UserTags_Users` FOREIGN KEY (`ID_User_FK`) REFERENCES `users` (`ID_User`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

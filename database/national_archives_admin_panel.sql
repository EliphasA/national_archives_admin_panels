-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2023 at 09:12 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `national_archives_admin_panel`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(150) NOT NULL,
  `password` longtext NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `profile` longtext NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `user_type`, `profile`, `created_at`, `updated_at`) VALUES
(1, 'Cairococers Ednalan', 'cairocoders@gmail.com', '123456789', '1234', 'admin', '', '2022-10-21', '2023-07-18'),
(2, 'Jesse Sambo', 'AiriSatou@gmail.com', '123446465', '12345', '', '', '2022-10-21', '2023-07-18'),
(3, 'Clydey Ednalan', 'clydeyednalan@gmail.com', '3546565', '12345', '', '', '2022-10-22', '0000-00-00'),
(4, 'Angelica Ramos', 'AngelicaRamos@gmail.com', '53465465', '1234', '', '', '2022-10-22', '0000-00-00'),
(5, 'Ashton Cox', 'AshtonCox@gmail.com', '354656', '1234', '', '', '2022-10-22', '0000-00-00'),
(6, 'Bradley Greer', 'BradleyGreer@gmail.com', '544665', '1234', '', '', '2022-10-22', '0000-00-00'),
(7, 'Brenden Wagner', 'BrendenWagner@gmail.com', '35443554', '1234', '', '', '2022-10-22', '0000-00-00'),
(8, 'Brielle Williamson', 'BrielleWilliamson@gmail.com', '3546', '1234', '', '', '2022-10-22', '0000-00-00'),
(9, 'Bruno Nash', 'BrunoNashgmail.com', '5465465', '1234', '', '', '2022-10-22', '0000-00-00'),
(10, 'Caesar Vance', 'CaesarVance@gmail.com', '46465', '1234', '', '', '2022-10-22', '0000-00-00'),
(11, 'Cara Stevens123', 'CaraStevens@gmail.com', '465465', '1234', '', '', '2022-10-22', '2023-07-18'),
(18, 'Jesse Sambo', 'jessesambo487@gmail.com', '89794448', '1234', 'admin', '', '2023-07-18', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

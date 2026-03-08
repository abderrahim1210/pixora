-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2026 at 06:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `p_recover`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Animal'),
(7, 'Architecture'),
(10, 'Art'),
(3, 'Cartoon'),
(18, 'Landscape'),
(6, 'Nature'),
(5, 'Travel');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `photo_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(3, 19, 3, 'Great', '2025-11-22 12:15:16', NULL),
(4, 20, 3, 'Wow👀', '2025-11-22 12:21:34', NULL),
(5, 18, 3, 'Nice picture💜', '2025-11-22 12:23:03', NULL),
(6, 15, 1, 'Cyclops is a real book ! 😮', '2025-11-22 20:24:12', '2025-11-23 19:25:43'),
(9, 20, 1, 'Wow👀', '2025-11-23 19:25:56', '2025-11-28 19:47:03'),
(17, 19, 1, 'Wow😍', '2025-11-25 15:51:52', '2025-11-28 19:37:29'),
(20, 1, 1, 'Brown bear is a favorite bear', '2025-11-27 11:02:11', NULL),
(21, 14, 1, 'Bears', '2025-11-29 11:33:30', '2026-01-23 21:26:24'),
(23, 15, 1, 'He', '2026-01-18 19:27:52', '2026-01-24 15:23:26'),
(27, 15, 6, 'Woooow', '2026-01-24 14:40:50', NULL),
(44, 34, 1, 'Wooow', '2026-01-29 13:15:49', NULL),
(46, 35, 1, 'Wo', '2026-02-15 21:31:58', '2026-02-15 21:32:07');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`id`, `follower_id`, `following_id`, `created_at`) VALUES
(58, 1, 2, '2025-11-12 10:30:02'),
(60, 5, 1, '2025-11-13 12:12:28'),
(62, 1, 3, '2025-11-22 21:07:05'),
(63, 6, 1, '2025-12-05 20:18:25');

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_photos`
--

CREATE TABLE `gallery_photos` (
  `id` int(11) NOT NULL,
  `gallery_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `licensing`
--

CREATE TABLE `licensing` (
  `id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `license_type` enum('public','editorial','commercial','private') DEFAULT 'public',
  `price` decimal(10,2) DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `photo_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `photo_id`, `created_at`) VALUES
(6, 2, 1, '2025-11-13 11:48:55'),
(17, 3, 14, '2025-11-13 11:48:55'),
(19, 3, 1, '2025-11-13 11:48:55'),
(20, 3, 17, '2025-11-13 11:48:55'),
(55, 5, 15, '2025-11-13 13:12:37'),
(56, 5, 20, '2025-11-13 13:12:43'),
(60, 3, 18, '2025-11-22 13:25:16'),
(61, 3, 20, '2025-11-22 13:25:22'),
(62, 3, 19, '2025-11-22 14:39:40'),
(70, 6, 1, '2025-12-06 18:52:09'),
(71, 6, 19, '2025-12-12 14:42:01'),
(87, 1, NULL, '2026-01-16 19:05:05'),
(118, 1, 20, '2026-01-16 20:03:27'),
(121, 1, 19, '2026-01-16 20:03:39'),
(129, 1, 18, '2026-01-16 20:09:35'),
(178, 1, 15, '2026-01-17 21:45:15'),
(190, 1, 1, '2026-01-18 18:55:05'),
(194, 6, 15, '2026-01-24 15:40:40'),
(196, 1, 14, '2026-01-25 14:23:32'),
(219, 1, 17, '2026-02-03 21:55:08');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `link` varchar(355) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `visibility` enum('public','private') DEFAULT 'public',
  `isLiked` tinyint(1) DEFAULT 0,
  `location` varchar(455) DEFAULT NULL,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `ratio` varchar(10) DEFAULT NULL,
  `size` decimal(6,0) DEFAULT NULL,
  `orientation` varchar(20) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `user_id`, `category_id`, `title`, `description`, `type`, `filename`, `visibility`, `isLiked`, `location`, `upload_date`, `width`, `height`, `ratio`, `size`, `orientation`, `tags`, `status`) VALUES
(1, 1, 1, 'Brown Bears', 'Brown Bear is a hard bear between bears', NULL, 'wallhaven-0jwz3q.jpg', 'public', 0, NULL, '2025-10-21 19:11:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 1, 3, 'Sad bear', 'Brown bear', NULL, 'wallhaven-j8k9qm.jpg', 'public', 0, NULL, '2025-10-23 17:22:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, 3, 'Cyclops', 'Cyclops book', NULL, 'thumb-1920-578128.jpg', 'public', 0, 'Casablanca', '2025-10-23 18:39:47', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 3, 1, 'Ice bear', 'Ice bear is a beutiful animal and bear', NULL, 'wallhaven-j5l2xp.jpg', 'public', 0, NULL, '2025-10-23 20:13:14', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 1, 3, 'Adventure time mountain', 'Advneture time mountain', NULL, '176605.png', 'public', 0, NULL, '2025-10-29 18:00:47', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 1, 1, 'Bears', 'Brown bear', NULL, 'wallhaven-0pd95j.jpg', 'public', 0, 'Casablanca', '2025-10-29 18:01:58', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 5, 6, 'Rain', 'Rain at road', NULL, 'wallhaven-48e93k.jpg', 'public', 0, NULL, '2025-11-13 12:12:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 1, 3, 'Fine meurte', 'CR', 'free', '6977d04defd16.jpeg', 'public', 0, NULL, '2026-01-26 20:36:29', 4336, 2440, '1', 0, NULL, '', 'approved'),
(34, 1, 1, 'Adventure', 'Adventure time', 'licensed', '6978ce95d0eab.png', 'public', 0, 'Rabat', '2026-01-27 14:41:25', 1600, 901, '1', 2, NULL, '', 'rejected'),
(35, 1, 3, 'Nature Magazine&quot;, &quot;Nature (magazine)&quot;, and &quot;Nature News&quot; redirect here. For the American magazine published 1923–1959', 'Nature is a British weekly international scientific journal publishing peer-reviewed research across the natural sciences, including biology, physics, chemistry, the earth sciences, and related interdisciplinary fields. It operates editorial offices in London, the United States, continental Europe, and Asia under the international scientific publishing company Springer Nature. According to the 2022 Journal Citation Reports, Nature had one of the highest impact factors among multidisciplinary science journals (50.5), reflecting its strong citation influence within the scientific literature;[1] some commentators also regard it as among the most influential scientific journals worldwide.[2][3][4] In 2007, Nature (together with Science) received the Prince of Asturias Award for Communications and Humanity.[5][6] As of 2012, it claimed an online readership of about three million unique readers per month.[7]', 'free', '69790265c607e.jpeg', 'public', 0, NULL, '2026-01-27 18:22:29', 5120, 2880, '1', 16, NULL, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `display_name` varchar(155) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `photo_profile` varchar(355) DEFAULT NULL,
  `cover_image` varchar(355) DEFAULT NULL,
  `country` varchar(355) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `instagram` varchar(355) DEFAULT NULL,
  `facebook` varchar(355) DEFAULT NULL,
  `x` varchar(355) DEFAULT NULL,
  `website` varchar(355) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `display_name`, `email`, `password_hash`, `bio`, `photo_profile`, `cover_image`, `country`, `gender`, `phone_number`, `birth_date`, `created_at`, `instagram`, `facebook`, `x`, `website`, `token`, `role`) VALUES
(1, 'abderrahimkhaliali', 'Abd Errahim', 'abderrahimkhaliali@gmail.com', '$2y$10$2G0Lzz5sMXaUoJulR0AuOeAHmdPDSgNuT1x6mjsMLsiXaFOxts3Uy', 'Anything ✨!', '6991fa2a66873.jpeg', NULL, 'Morocco', 'Male', '669054064', '2006-04-21', '2025-10-21 19:07:44', '', '', '', '', '6784a37f0828a156962a2b19a78d0aded7b4d14c42db12e4054b853740367cae', 'user'),
(2, 'john_2980', NULL, 'john123@gmail.com', '$2y$10$M8bsKrZNvApoOJGVJ/h/iu2Vuxghhpoz.IGcFNFCYCbk5x3ykhSAa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-10-21 21:04:06', NULL, NULL, NULL, NULL, NULL, 'user'),
(3, 'abdelhadi_8490', 'Abd Elhadi', 'abdelhadi123@gmail.com', '$2y$10$gR83DGz5gHwnWdmIlHzCHe9uKjLeKlxtPOhTg./UiXOeqZy9JATju', 'Welcome for you 😀', NULL, NULL, 'Morocco', 'Male', '645324640', '2000-02-01', '2025-10-23 20:05:18', NULL, NULL, NULL, NULL, '838345b3180b68f6270dd897cf21c1b278331e6dbf20b8a43f96663d525b9a5c', 'user'),
(5, 'Abdellah_5221', NULL, 'aboudaboud@gmail.com', '$2y$10$gi3Pa5VdsH1Ej3CZnnfbBuHj34LptczgkL.ZSYLSWWxY.2lqpfd4q', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-13 12:00:46', NULL, NULL, NULL, NULL, NULL, 'user'),
(6, 'fine_9892', 'Fine', 'finnne123@gmail.com', '$2y$10$DewTgxCOEy3wOphC9J/0xOAGy9/wfSCD5XRo2YPDOdPYL/qPKeg5i', 'Welcome to my profile !', '6934207a5c69e.jpeg', NULL, 'Morocco', 'Male', '+212669054064', '2001-02-03', '2025-12-05 20:18:00', 'https://www.instagram.com/abderrahim47_?igsh=YTBoc3FmZmd4cDVo', '', '', '', '113ab153ffc51aab56275cb93ca8006deea4e1df5b90d9fde792bfe0fe5b6b94', 'user'),
(7, 'sara_6097', 'Sara', 'sarasara@gmail.com', '$2y$10$cOvvPxFziDfnhOQ7Yks4Le84g6g4EkZzJCWkoSdAB9kDCIjsMIfoS', NULL, NULL, NULL, 'Casablanca', '', '0765432356', '2005-02-23', '2026-01-31 12:41:20', NULL, NULL, NULL, NULL, NULL, 'user'),
(8, 'omar_9949', 'Omar', 'omaromar20@gmail.com', '$2y$10$1aq/cCZ7xJBg4WnaMnF7E.8xTr81w7I9puirZW1rzzubyDtaqD.mG', NULL, NULL, NULL, '', 'Male', '', '0000-00-00', '2026-01-31 12:43:13', NULL, NULL, NULL, NULL, NULL, 'user'),
(9, 'abderrahmane_1700', '', 'abderrahmane12@gmail.com', '$2y$10$kG0.He.qZIok2.AhuIfY9.otRXDqwf6zLoxLn/nvRSTP9IwxWcRuy', NULL, NULL, NULL, '', '', '', '0000-00-00', '2026-03-01 16:19:27', NULL, NULL, NULL, NULL, NULL, 'user'),
(12, 'ahmed_4123', '', 'ahmedahmed@gmail.com', '$2y$10$SrT8g2dAQq5FBh1xUWPAxupU2n33jlThxcJJcns09cclFKjPe2cha', NULL, NULL, NULL, 'Morocco', 'Male', '', '0000-00-00', '2026-03-01 16:22:02', NULL, NULL, NULL, NULL, '8834fc3acabf6ef58657d58afa4beb9743da818fef383f44a87c675cb58b4706', 'admin'),
(14, 'Abdou_9658', '', 'fares123@gmail.com', '$2y$10$eetcuW8o3fDn2h1b2C3ZHuFY/7VGuudzIGAbfR.11OerJKRAZNbsK', NULL, NULL, NULL, '', '', '', '0000-00-00', '2026-03-03 14:39:35', NULL, NULL, NULL, NULL, '5de12cf3d36a0802e3d0ac39187028944d07bd652973d740d270566a6809dd94', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo_id` (`photo_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_follow` (`follower_id`,`following_id`),
  ADD KEY `following_id` (`following_id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `gallery_photos`
--
ALTER TABLE `gallery_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_id` (`gallery_id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Indexes for table `licensing`
--
ALTER TABLE `licensing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_photos`
--
ALTER TABLE `gallery_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `licensing`
--
ALTER TABLE `licensing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gallery_photos`
--
ALTER TABLE `gallery_photos`
  ADD CONSTRAINT `gallery_photos_ibfk_1` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gallery_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `licensing`
--
ALTER TABLE `licensing`
  ADD CONSTRAINT `licensing_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

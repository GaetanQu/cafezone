-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 22 mars 2024 à 09:53
-- Version du serveur : 10.6.16-MariaDB-0ubuntu0.22.04.1
-- Version de PHP : 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cafezone`
--

-- --------------------------------------------------------

--
-- Structure de la table `aromas`
--

CREATE TABLE `aromas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aromas`
--

INSERT INTO `aromas` (`id`, `name`) VALUES
(1, 'Floral'),
(2, 'Noisette'),
(3, 'Chocolat'),
(4, 'Miel'),
(5, 'Caramel'),
(6, 'Noix'),
(7, 'Boisé'),
(8, 'Amandes'),
(9, 'Prune'),
(10, 'Fraise'),
(11, 'Citron'),
(12, 'Myrtille'),
(13, 'Épicé'),
(14, 'Fruits jaunes'),
(15, 'Fruits rouges'),
(16, 'Abricot'),
(17, 'Coriandre');

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Liste de marques présentes sur le site';

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'De\'Longhi'),
(2, 'Cafézone');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Bean'),
(2, 'Machine');

-- --------------------------------------------------------

--
-- Structure de la table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `flag` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `countries`
--

INSERT INTO `countries` (`id`, `name`, `flag`) VALUES
(1, 'Burundi', 'http://localhost/cafezone/images/Flags/bi.svg'),
(2, 'Papouasie Nouvelle Guinée', 'http://localhost/cafezone/images/Flags/pg.svg'),
(3, 'Nicaragua', 'http://localhost/cafezone/images/Flags/ni.svg'),
(4, 'Bolivie', 'http://localhost/cafezone/images/Flags/bo.svg'),
(5, 'République Dominicaine', 'http://localhost/cafezone/images/Flags/do.svg'),
(6, 'Éthiopie', 'http://localhost/cafezone/images/Flags/et.svg'),
(7, 'Cuba', 'http://localhost/cafezone/images/Flags/cu.svg'),
(8, 'Costa Rica', 'http://localhost/cafezone/images/Flags/cr.svg');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `reference` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sca` int(3) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `images` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `reference`, `description`, `brand_id`, `price`, `sca`, `country_id`, `category_id`, `images`) VALUES
(1, 'Magnifica S Smart', 'FEB2523.SB', 'Expresso broyeur élégant aux finitions épurées pour habiller toutes les cuisines', 1, '449.99', NULL, NULL, 2, 'images/Products/FEB2523.SB'),
(2, 'Shembati - Kayanza', '1', 'Encore une pépite de Salum Ramadan. Des notes d\'épices et de fruits jaunes, et une longueur en bouche chocolatée avec des touches d\'amande.', NULL, '7.99', 86, 1, 1, 'images/Products/1'),
(3, 'Santiago Mamani', '2', 'Un café complexe, aux notes de chocolat, de fraise, de citron et de myrtilles | Un café d\'exception, rare et unique', NULL, '8.90', 87, 4, 1, 'images/Products/1'),
(4, 'Hacienda Colima', '3', 'Des saveurs florales sublimées par la gourmandise de la noisette, du chocolat et du miel.', NULL, '5.50', 84, 8, 1, 'images/Products/1'),
(5, 'Iguana - San José de Ocoa', '4', 'Une tasse parfumée, aux notes de noisette et de caramel. Un régal pour les papilles sans trop bousculer les néophytes en café de spécialité.', NULL, '5.80', 82, 5, 1, 'images/Products/1'),
(6, 'El Toston Diplito', '5', 'Un café rond et équilibré, des notes de caramel et de chocolat avec des touches d\'amande et de prune. Bonne longueur en bouche, corps plein.', NULL, '6.30', NULL, 3, 1, 'images/Products/1'),
(7, 'Mélange Mokka', '6', 'Un café équilibré aux notes florales, légèrement boisé. Idéal pour s\'initier aux cafés d\'Afrique, tout en douceur', NULL, '4.95', NULL, 6, 1, 'images/Products/1'),
(8, 'Raggiana', '7', 'Un café boisé, avec des notes de noix, d\'abricot et de coriandre. Un café d\'origine lointaine, pour un voyage des sens.', NULL, '5.70', NULL, 2, 1, 'images/Products/1'),
(9, 'Serrano Lavado', '8', 'Des arômes riches, avec des notes de chocolat et de noix. Un corps plein, légèrement boisé.', NULL, '5.99', NULL, 7, 1, 'images/Products/1'),
(10, 'Maestosa', 'EPAM960.75.GLM', 'L’expresso broyeur Maestosa au design saisissant et technologie de pointe', 1, '2899.99', NULL, NULL, 2, 'images/Products/EPAM960.75.GLM'),
(11, 'Style Dedica', 'EC695.M', 'Une machine expresso pratique, simple d’utilisation, moderne et design qui vous offre le goût exquis de l’expresso chez vous', 1, '249.99', NULL, NULL, 2, 'images/Products/EC695.M'),
(12, 'La Specialista Prestigio', 'EC9355.BM', 'N’hésitez plus à créer les boissons qui vous correspondent grâce à La Specialista Prestigio.', 1, '899.90', NULL, NULL, 2, 'images/Products/EC9355.BM');

-- --------------------------------------------------------

--
-- Structure de la table `products_aromas`
--

CREATE TABLE `products_aromas` (
  `product_id` int(11) DEFAULT NULL,
  `aroma_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products_aromas`
--

INSERT INTO `products_aromas` (`product_id`, `aroma_id`) VALUES
(3, 3),
(3, 10),
(3, 11),
(3, 12),
(2, 13),
(2, 14),
(2, 3),
(2, 8);

-- --------------------------------------------------------

--
-- Structure de la table `products_types`
--

CREATE TABLE `products_types` (
  `product_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products_types`
--

INSERT INTO `products_types` (`product_id`, `type_id`) VALUES
(10, 2),
(10, 3),
(1, 2),
(1, 3),
(11, 1),
(11, 3),
(12, 1),
(12, 3),
(12, 2);

-- --------------------------------------------------------

--
-- Structure de la table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `stars` tinyint(1) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `product_id`, `stars`, `comment`) VALUES
(1, 1, 6, 5, 'Mon café préféré');

-- --------------------------------------------------------

--
-- Structure de la table `shops`
--

CREATE TABLE `shops` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `color` varchar(6) DEFAULT NULL,
  `logo` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `shops`
--

INSERT INTO `shops` (`id`, `name`, `color`, `logo`) VALUES
(1, 'De\'Longhi', '0d213d', 'images/shops/DeLonghi.webp'),
(2, 'Au Bon Kawa', 'b35333', '');

-- --------------------------------------------------------

--
-- Structure de la table `shops_products`
--

CREATE TABLE `shops_products` (
  `shop_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `shops_products`
--

INSERT INTO `shops_products` (`shop_id`, `product_id`) VALUES
(1, 1),
(1, 10),
(2, 6),
(2, 4),
(2, 5),
(2, 7),
(2, 8),
(2, 2),
(2, 3),
(2, 9),
(1, 11),
(1, 12);

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Percolateur'),
(2, 'Broyeur'),
(3, 'Espresso');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(100) DEFAULT NULL,
  `fisrt_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `location` point DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `fisrt_name`, `last_name`, `password`, `location`) VALUES
(1, 'Anateg', 'Gaëtan', 'Quenouille', 'Ceci_Est_Un_Mot_De_Passe', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `aromas`
--
ALTER TABLE `aromas`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `products_aromas`
--
ALTER TABLE `products_aromas`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `aroma_id` (`aroma_id`);

--
-- Index pour la table `products_types`
--
ALTER TABLE `products_types`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Index pour la table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `shops_products`
--
ALTER TABLE `shops_products`
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `aromas`
--
ALTER TABLE `aromas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `products_aromas`
--
ALTER TABLE `products_aromas`
  ADD CONSTRAINT `products_aromas_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_aromas_ibfk_2` FOREIGN KEY (`aroma_id`) REFERENCES `aromas` (`id`);

--
-- Contraintes pour la table `products_types`
--
ALTER TABLE `products_types`
  ADD CONSTRAINT `products_types_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_types_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

--
-- Contraintes pour la table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Contraintes pour la table `shops_products`
--
ALTER TABLE `shops_products`
  ADD CONSTRAINT `shops_products_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shops_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

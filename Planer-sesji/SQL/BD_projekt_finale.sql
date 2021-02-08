-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 08 Lut 2021, 17:59
-- Wersja serwera: 8.0.21
-- Wersja PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `g19`
--

DELIMITER $$
--
-- Funkcje
--
DROP FUNCTION IF EXISTS `add_player`$$
CREATE DEFINER=`g19`@`localhost` FUNCTION `add_player` (`ID` INT, `LOGIN` VARCHAR(45)) RETURNS INT BEGIN 
  DECLARE id1 INT;
  DECLARE id2 INT;
  DECLARE id3 INT;
  DECLARE id4 INT;
  DECLARE current_people INT;
  DECLARE max_people INT;
  SELECT g.id_druzyna,g.id_druzyna2,g.id_druzyna3,g.id_druzyna4 INTO id1,id2,id3,id4 from gracze g where g.login = LOGIN;
  SELECT d.l_czlonkow, d.max_l_czlonkow INTO current_people, max_people FROM druzyna d WHERE d.id = ID;
  IF current_people < max_people 
  	THEN
  	IF id1 IS NULL AND NOT ID <=> id2 AND NOT ID <=> id3 AND NOT ID <=> id4
		THEN UPDATE gracze SET gracze.id_druzyna = ID WHERE gracze.login = LOGIN;
		RETURN 1;
  	ELSEIF id2 IS NULL AND NOT ID <=> id1 AND NOT ID <=> id3 AND NOT ID <=> id4
		THEN UPDATE gracze SET gracze.id_druzyna2 = ID WHERE gracze.login = LOGIN;
		RETURN 2;
  	ELSEIF id3 IS NULL AND NOT ID <=> id1 AND NOT ID <=> id2 AND NOT ID <=> id4
		THEN UPDATE gracze SET gracze.id_druzyna3 = ID WHERE gracze.login = LOGIN;
        RETURN 3;
  	ELSEIF id4 IS NULL AND NOT ID <=> id1 AND NOT ID <=> id2 AND NOT ID <=> id3
		THEN UPDATE gracze SET gracze.id_druzyna4 = ID WHERE gracze.login = LOGIN;
		RETURN 4;
  	ELSE
		RETURN 0;
  	END IF;
  ELSE
	RETURN -1;    	
  END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `druzyna`
--

DROP TABLE IF EXISTS `druzyna`;
CREATE TABLE `druzyna` (
  `id` int UNSIGNED NOT NULL,
  `id_mistrzowie` int UNSIGNED NOT NULL,
  `l_czlonkow` int UNSIGNED NOT NULL DEFAULT '0',
  `max_l_czlonkow` int UNSIGNED NOT NULL DEFAULT '4',
  `system` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `l_odbytych_sesji` int UNSIGNED NOT NULL,
  `nazwa` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Wyzwalacze `druzyna`
--
DROP TRIGGER IF EXISTS `before_del_team`;
DELIMITER $$
CREATE TRIGGER `before_del_team` BEFORE DELETE ON `druzyna` FOR EACH ROW BEGIN
UPDATE gracze SET gracze.id_druzyna = NULL where gracze.id_druzyna = OLD.id;
UPDATE gracze SET gracze.id_druzyna2 = NULL where gracze.id_druzyna2 = OLD.id;
UPDATE gracze SET gracze.id_druzyna3 = NULL where gracze.id_druzyna3 = OLD.id;
UPDATE gracze SET gracze.id_druzyna4 = NULL where gracze.id_druzyna4 = OLD.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gracze`
--

DROP TABLE IF EXISTS `gracze`;
CREATE TABLE `gracze` (
  `id` int UNSIGNED NOT NULL,
  `id_druzyna` int UNSIGNED DEFAULT NULL,
  `id_druzyna2` int UNSIGNED DEFAULT NULL,
  `id_druzyna3` int UNSIGNED DEFAULT NULL,
  `id_druzyna4` int UNSIGNED DEFAULT NULL,
  `login` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `haslo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `system` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `system2` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `system3` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `l_odbytych_sesji` int UNSIGNED NOT NULL,
  `imie` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `staz` int UNSIGNED DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `miasto` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Wyzwalacze `gracze`
--
DROP TRIGGER IF EXISTS `after_del_gracz_min1`;
DELIMITER $$
CREATE TRIGGER `after_del_gracz_min1` AFTER DELETE ON `gracze` FOR EACH ROW UPDATE druzyna SET druzyna.l_czlonkow = druzyna.l_czlonkow - 1 WHERE (OLD.id_druzyna = druzyna.id OR OLD.id_druzyna2 = druzyna.id OR OLD.id_druzyna3 = druzyna.id OR OLD.id_druzyna4 = druzyna.id) AND druzyna.l_czlonkow > 0
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lokalizacja`
--

DROP TABLE IF EXISTS `lokalizacja`;
CREATE TABLE `lokalizacja` (
  `id` int UNSIGNED NOT NULL,
  `id_mistrzowie` int UNSIGNED NOT NULL,
  `adres` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `miasto` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_liczba_osob` int UNSIGNED NOT NULL DEFAULT '5',
  `dostep_kuchni` tinyint NOT NULL DEFAULT '0',
  `rodzaj_miejsca` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pietro` int NOT NULL DEFAULT '0',
  `czy_winda` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `mistrzowie`
--

DROP TABLE IF EXISTS `mistrzowie`;
CREATE TABLE `mistrzowie` (
  `id` int UNSIGNED NOT NULL,
  `login` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `haslo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `system` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `system2` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `system3` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `l_poprowadzonych` int UNSIGNED NOT NULL,
  `imie` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oplata_za_sesje` int UNSIGNED NOT NULL DEFAULT '0',
  `staz` int UNSIGNED DEFAULT NULL,
  `minimalny_staz_gracza` int UNSIGNED DEFAULT '0',
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `miasto` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `termin`
--

DROP TABLE IF EXISTS `termin`;
CREATE TABLE `termin` (
  `id` int UNSIGNED NOT NULL,
  `id_druzyna` int UNSIGNED DEFAULT NULL,
  `id_mistrzowie` int UNSIGNED NOT NULL,
  `id_lokalizacja` int UNSIGNED NOT NULL,
  `system` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `czas_start` datetime NOT NULL,
  `czas_stop` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Wyzwalacze `termin`
--
DROP TRIGGER IF EXISTS `after_deltermin_rem1`;
DELIMITER $$
CREATE TRIGGER `after_deltermin_rem1` AFTER DELETE ON `termin` FOR EACH ROW BEGIN
IF OLD.id_druzyna IS NOT NULL
THEN
UPDATE mistrzowie SET mistrzowie.l_poprowadzonych = mistrzowie.l_poprowadzonych - 1 WHERE mistrzowie.id = OLD.id_mistrzowie AND mistrzowie.l_poprowadzonych > 0;
UPDATE druzyna SET druzyna.l_odbytych_sesji = druzyna.l_odbytych_sesji - 1  WHERE druzyna.id = OLD.id_druzyna AND druzyna.l_odbytych_sesji > 0;
UPDATE gracze SET gracze.l_odbytych_sesji = gracze.l_odbytych_sesji - 1 WHERE (gracze.id_druzyna = OLD.id_druzyna OR gracze.id_druzyna2 = OLD.id_druzyna OR gracze.id_druzyna3 = OLD.id_druzyna OR gracze.id_druzyna4 = OLD.id_druzyna) AND gracze.l_odbytych_sesji > 0;
END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `after_termin_add1`;
DELIMITER $$
CREATE TRIGGER `after_termin_add1` AFTER UPDATE ON `termin` FOR EACH ROW BEGIN
UPDATE mistrzowie SET mistrzowie.l_poprowadzonych = mistrzowie.l_poprowadzonych + 1 WHERE mistrzowie.id = NEW.id_mistrzowie;
UPDATE druzyna SET druzyna.l_odbytych_sesji = druzyna.l_odbytych_sesji + 1  WHERE druzyna.id = NEW.id_druzyna;
UPDATE gracze SET gracze.l_odbytych_sesji = gracze.l_odbytych_sesji + 1 WHERE gracze.id_druzyna = NEW.id_druzyna OR gracze.id_druzyna2 = NEW.id_druzyna OR gracze.id_druzyna3 = NEW.id_druzyna OR gracze.id_druzyna4 = NEW.id_druzyna;
END
$$
DELIMITER ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `druzyna`
--
ALTER TABLE `druzyna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id_mistrzowie_idx` (`id_mistrzowie`);

--
-- Indeksy dla tabeli `gracze`
--
ALTER TABLE `gracze`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idgracze_UNIQUE` (`id`),
  ADD KEY `id_druzyna_idx` (`id_druzyna`),
  ADD KEY `id_druzyna2` (`id_druzyna2`),
  ADD KEY `id_druzyna3` (`id_druzyna3`),
  ADD KEY `id_druzyna4` (`id_druzyna4`);

--
-- Indeksy dla tabeli `lokalizacja`
--
ALTER TABLE `lokalizacja`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id_mistrzowie_idx` (`id_mistrzowie`);

--
-- Indeksy dla tabeli `mistrzowie`
--
ALTER TABLE `mistrzowie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indeksy dla tabeli `termin`
--
ALTER TABLE `termin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id_druzyna_idx` (`id_druzyna`),
  ADD KEY `id_lokalizacja_idx` (`id_lokalizacja`),
  ADD KEY `id_mistrzowie_idx` (`id_mistrzowie`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `druzyna`
--
ALTER TABLE `druzyna`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `gracze`
--
ALTER TABLE `gracze`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `lokalizacja`
--
ALTER TABLE `lokalizacja`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `mistrzowie`
--
ALTER TABLE `mistrzowie`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `termin`
--
ALTER TABLE `termin`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `druzyna`
--
ALTER TABLE `druzyna`
  ADD CONSTRAINT `id_mistrzowie` FOREIGN KEY (`id_mistrzowie`) REFERENCES `mistrzowie` (`id`);

--
-- Ograniczenia dla tabeli `gracze`
--
ALTER TABLE `gracze`
  ADD CONSTRAINT `gracze_ibfk_1` FOREIGN KEY (`id_druzyna2`) REFERENCES `druzyna` (`id`),
  ADD CONSTRAINT `gracze_ibfk_2` FOREIGN KEY (`id_druzyna3`) REFERENCES `druzyna` (`id`),
  ADD CONSTRAINT `gracze_ibfk_3` FOREIGN KEY (`id_druzyna4`) REFERENCES `druzyna` (`id`),
  ADD CONSTRAINT `id_druzyna` FOREIGN KEY (`id_druzyna`) REFERENCES `druzyna` (`id`);

--
-- Ograniczenia dla tabeli `lokalizacja`
--
ALTER TABLE `lokalizacja`
  ADD CONSTRAINT `id_mistrzowieL` FOREIGN KEY (`id_mistrzowie`) REFERENCES `mistrzowie` (`id`);

--
-- Ograniczenia dla tabeli `termin`
--
ALTER TABLE `termin`
  ADD CONSTRAINT `id_druzynaT` FOREIGN KEY (`id_druzyna`) REFERENCES `druzyna` (`id`),
  ADD CONSTRAINT `id_lokalizacjaT` FOREIGN KEY (`id_lokalizacja`) REFERENCES `lokalizacja` (`id`),
  ADD CONSTRAINT `id_mistrzowieT` FOREIGN KEY (`id_mistrzowie`) REFERENCES `mistrzowie` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

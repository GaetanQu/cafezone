<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$mysqlClient = new PDO(
    'mysql:
    host=localhost;
    dbname=cafezone;
    charset=utf8',
    'root',
    'motdepasse'
)
?>

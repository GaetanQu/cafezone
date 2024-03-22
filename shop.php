<?php
require_once(__DIR__.'/pdo.php');

$shopStatement = $mysqlClient -> prepare('SELECT * FROM shops WHERE shops.name = "'.$_GET['shop'].'"');
$shopStatement -> execute();
$shop = ($shopStatement -> fetchAll())[0];
?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/shop_style.css">
    <script type="module" src="main.js"></script>
</head>

<body>
    <?php require_once(__DIR__.'/header.php') ?>
    <div class="hero">
        <div class="title up blur floating">
            <div class="div">
                <img src="<?php echo $shop['logo']?>" alt="Logo">
                <h2><?php echo $_GET['shop'] ?></h2>
            </div>
        </div>
        <div class="cards">
            <div class="card blur"></div>
            <div class="card blur"></div>
            <div class="card blur"></div>
            <div class="card blur"></div>
        </div>
    </div>
</body>
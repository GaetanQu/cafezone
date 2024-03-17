<?php
$product_infos = $mysqlClient -> prepare('SELECT products.name, products.images, products.reference')
?>

<DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles/style.css">
    <script type="module" src="main.js"></script>
</head>
<body>
    <?php require_once(__DIR__.'/header.php') ?>
</body>
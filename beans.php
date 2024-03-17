<?php require_once(__DIR__ . '/pdo.php'); ?>

<?php
$shopsStatement = $mysqlClient -> prepare('SELECT * FROM shops');
$shopsStatement -> execute();
$shops = $shopsStatement -> fetchAll();

?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/filters_style.css">
    <link rel="stylesheet" href="styles/products_style.css">
    <link rel="stylesheet" href="styles/beans_style.css">
    <script type="module" src="main.js"></script>
</head>

<body>
    <?php require_once(__DIR__.'/header.php') ?>
    <float class="side filters blur">
        <h3>Filtres</h3>
        <ul>
            <li class="sca">
                <h4>Note SCA</h4>
                <div class="sca-input">
                    <input type="number" value="80" disabled>
                    <input type="number" value="100" disabled>
                </div>
                <div class="slider">
                    <div class="selected">
                    </div>
                </div>
                <div class="range-input">
                    <input type="range" class="range-min" min="0" max="20" value="0">
                    <input type="range" class="range-max" min="0" max="20" value="20">
                </div>
            </li>
            <div class="separator"></div>
            <li class="country">
                <h4>Pays d'origine</h4>
                <ul>
                    <?php foreach ($allProducts as $allProduct){ ?>
                    <li>
                        <country-filter country="<?php echo $allProduct['country']?>">
                    </li>
                    <?php }?>
                </ul>
            </li>
        </ul>
    <div id="title">Filtres</div>
    </float>
    <section id="beans">
        <a href="#" id="famous">
            <div class="title down">
                <h2>Découvrez le café du moment</h2>
            </div>
        </a>
        <div class="shops">
            <carousel-dots></carousel-dots>
        </div>
    </section>
</body>

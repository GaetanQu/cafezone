<?php require_once(__DIR__ . '/pdo.php'); ?>

<?php

if($_GET['category'] === "Bean"){
    $productsStatement = $mysqlClient -> prepare('SELECT products.name AS name, countries.name AS country, countries.flag AS flag, shops.color AS color, products.images AS images, products.description AS description, products.price AS price, products.reference AS reference FROM products JOIN countries ON countries.id = products.country_id JOIN shops_products ON shops_products.product_id = products.id JOIN shops ON shops.id = shops_products.shop_id JOIN categories ON categories.id = products.category_id WHERE categories.name ="'.$_GET['category'].'"');
}

else{
    $productsStatement = $mysqlClient -> prepare('SELECT products.name AS name, brands.name AS brand, shops.color AS color, products.images AS images, products.description AS description, products.price AS price, products.reference AS reference FROM products JOIN brands ON brands.id = products.brand_id JOIN shops_products ON shops_products.product_id = products.id JOIN shops ON shops.id = shops_products.shop_id JOIN categories ON categories.id = products.category_id WHERE categories.name ="'.$_GET['category'].'"');
}

$productsStatement -> execute();
$products = $productsStatement -> fetchAll();

$shopsStatement = $mysqlClient -> prepare('SELECT * FROM shops');
$shopsStatement -> execute();
$shops = $shopsStatement -> fetchAll();

?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/products_style.css">
    <link rel="stylesheet" href="styles/filters_style.css">
    <script type="module" src="js/filters_source.js"></script>
    <script type="module" src="js/products_source.js"></script>
</head>

<body>
    <?php require_once(__DIR__.'/header.php') ?>
    <float class="side filters blur">
        <h3>Filtres</h3>
        <form method="POST" action="products.php?<?php echo $_GET['category']?>">
            <ul>
                <?php if($_GET['category']==="Bean"):?>
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
                        <?php
                        $allCountriesStatement = $mysqlClient -> prepare('SELECT * FROM countries');
                        $allCountriesStatement -> execute();
                        $allCountries = $allCountriesStatement -> fetchAll();

                        $availableCountries = [];
                        foreach($products as $product){
                            foreach($allCountries as $country){
                                if (in_array($country['id'], $product) and !in_array($country, $availableCountries)){
                                    $availableCountries[] = $country;
                                }
                            }
                        }
                        ?>
                        <ul>
                            <?php foreach($availableCountries as $country):?>
                                <li>
                                    <input type="checkbox" id="<?php echo $country['name']?>"><label for="<?php echo $country['name']?>"><?php echo $country['name']?></label>
                                </li>
                            <?php endforeach?>
                        </ul>
                    </li>
                <?php elseif($_GET['category']==="Machine"):?>
                    <li class="type">
                        <h4>Type de machine</h4>
                        <?php
                        $allTypesStatement = $mysqlClient -> prepare('SELECT types.id AS id, types.name AS name FROM types JOIN products_types ON types.id = products_types.type_id JOIN products ON products.id = products_types.product_id WHERE products.category_id = 2');
                        $allTypesStatement -> execute();
                        $allTypes = $allTypesStatement -> fetchAll();

                        $types = [];
                        foreach($allTypes as $alltype){
                            if (!in_array($alltype, $types)){
                                $types[] = $alltype;
                            }
                        }
                        ?>
                        <ul>
                            <?php foreach ($types as $type):?>
                                <li><input type="checkbox" name="" id="<?php echo $type['id']?>"><label for="<?php echo $type['id']?>"><?php echo $type['name']?></label></li>
                            <?php endforeach?>
                        </ul>
                    </li>
                <?php endif?>
            </ul>
        </form>
    <div id="title">Filtres</div>
    </float>
    <div class="shops">
        <cafezone-shop shop_name = "Tous les produits" color = "20100b">
            <div class="products">
                <?php foreach($products as $product):
                    $images = scandir($product['images']); ?>
                    <cafezone-product
                        link = "product.php?ref=<?php echo $product['reference'] ?>"
                        product_name = "<?php echo $product['name']?>"
                        image = "<?php echo $images[2]?>"
                        color = "<?php echo $product['color']?>"
                        description = "<?php echo $product['description']?>"
                        price = "<?php echo $product['price']?>"
                        reference = "<?php echo $product['reference'] ?>"
                        <?php if ($_GET['category']==="Bean"):?>
                            class="bean"
                            country = "<?php echo $product['country']?>"
                            flag = "<?php echo $product['flag']?>"
                        <?php else:?>
                            brand = "<?php echo $product['brand']?>"
                        <?php endif?>
                    ></cafezone-product>
                <?php
                endforeach; ?>
            </div>
        </cafezone-shop>
        <?php foreach($shops as $shop): ?>
            <?php 
            if($_GET['category'] === "Bean"){
                $productsStatement = $mysqlClient -> prepare('SELECT products.name AS name, countries.name AS country, countries.flag AS flag, shops.color AS color, products.images AS images, products.description AS description, products.price AS price, products.reference AS reference FROM products JOIN countries ON countries.id = products.country_id JOIN shops_products ON shops_products.product_id = products.id JOIN shops ON shops.id = shops_products.shop_id JOIN categories ON categories.id = products.category_id WHERE categories.name ="'.$_GET['category'].'" AND shops.id ='.$shop['id']);
            }
            
            else{
                $productsStatement = $mysqlClient -> prepare('SELECT products.name AS name, brands.name AS brand, shops.color AS color, products.images AS images, products.description AS description, products.price AS price, products.reference AS reference FROM products JOIN brands ON brands.id = products.brand_id JOIN shops_products ON shops_products.product_id = products.id JOIN shops ON shops.id = shops_products.shop_id JOIN categories ON categories.id = products.category_id WHERE categories.name ="'.$_GET['category'].'" AND shops.id ='.$shop['id']);
            }
            $productsStatement -> execute();
            $products = $productsStatement -> fetchAll();
            ?>
            <?php if(count($products) != 0): ?>
                <cafezone-shop shop_name = "<?php echo $shop['name'] ?>" color = "<?php echo $shop['color'] ?>">
                    <div class="products">
                        <?php foreach($products as $product): 
                            $images = scandir($product['images']);?>
                            <cafezone-product
                                link = "product.php?ref=<?php echo $product['reference'] ?>"
                                product_name = "<?php echo $product['name']?>"
                                image = "<?php echo $images[2]?>"
                                color = "<?php echo $product['color']?>"
                                description = "<?php echo $product['description']?>"
                                price = "<?php echo $product['price']?>"
                                reference = "<?php echo $product['reference'] ?>"
                                <?php if ($_GET['category']==="Bean"):?>
                                    class="bean"
                                    country = "<?php echo $product['country']?>"
                                    flag = "<?php echo $product['flag']?>"
                                <?php else:?>
                                    brand = "<?php echo $product['brand']?>"
                                <?php endif?>
                            ></cafezone-product>
                        <?php endforeach ?>
                    </div>
                </cafezone-shop>
            <?php endif ?>
        <?php endforeach ?>
        <carousel-dots></carousel-dots>
    </div>
</body>
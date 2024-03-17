<?php require_once(__DIR__ . '/pdo.php'); ?>

<?php

$productsStatement = $mysqlClient -> prepare('SELECT products.name AS name, shops.color AS color, products.images AS images, brands.name AS brand, products.description AS description, products.price AS price, products.reference AS reference FROM products JOIN shops_products ON shops_products.product_id = products.id JOIN shops ON shops.id = shops_products.shop_id JOIN brands ON brands.id = products.brand_id WHERE products.category_id = 2');
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
    <script type="module" src="main.js"></script>
</head>

<body>
    <?php require_once(__DIR__.'/header.php') ?>
    <section id="machines">
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
                            brand = "<?php echo $product['brand']?>"
                            description = "<?php echo $product['description']?>"
                            price = "<?php echo $product['price']?>"
                            reference = "<?php echo $product['reference'] ?>"
                        ></cafezone-product>
                    <?php
                    endforeach; ?>
                </div>
            </cafezone-shop>
            <?php foreach($shops as $shop): ?>
                <?php 
                $productsStatement = $mysqlClient -> prepare('SELECT products.name AS name, shops.color AS color, products.images AS images, brands.name AS brand, products.description AS description, products.price AS price, products.reference AS reference FROM products JOIN shops_products ON shops_products.product_id = products.id JOIN shops ON shops.id = shops_products.shop_id JOIN brands ON brands.id = products.brand_id WHERE products.category_id = 2 AND shops.id = '.$shop['id']);
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
                                brand = "<?php echo $product['brand']?>"
                                description = "<?php echo $product['description']?>"
                                price = "<?php echo $product['price']?>"
                                reference = "<?php echo $product['reference'] ?>"
                            ></cafezone-product>
                            <?php endforeach ?>
                        </div>
                    </cafezone-shop>
                <?php endif ?>
            <?php endforeach ?>
            <carousel-dots></carousel-dots>
        </div>
    </section>
</body>
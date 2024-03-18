<?php require_once(__DIR__ . '/pdo.php'); ?>

<?php
$productInfosStatement = $mysqlClient -> prepare('SELECT products.images AS images, products.name AS name, brands.name AS brand, products.description AS description, products.reference AS reference, products.price AS price, shops.color AS color FROM products JOIN shops_products ON products.id = shops_products.product_id JOIN shops ON shops.id = shops_products.shop_id JOIN brands ON brands.id = products.brand_id WHERE products.reference ="'.$_GET['ref'].'"');
$productInfosStatement -> execute();
$productsInfos = $productInfosStatement -> fetchAll();

$product = $productsInfos[0];


$images = scandir('images/Products/'.$_GET['ref'])
?>

<DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/product_style.css">
    <script type="module" src="js/product_source.js"></script>
</head>
<body>
    <?php require_once(__DIR__. '/header.php');?>
    <div class="product">
        <div class="images_div">
            <div id="div">
                <div class="left arrow">
                    <img src="images/Icons/left arrow.svg" alt="">
                </div>
                <div class="right arrow">
                    <img src="images/Icons/right arrow.svg" alt="">
                </div>
                <div class="images">
                    <?php foreach($images as $image):
                        if($image != "." && $image != ".."):?>
                            <img src="images/Products/<?php echo $_GET['ref']?>/<?php echo $image?>" alt="Image <?php echo pathinfo($image,PATHINFO_FILENAME)?>" class=<?php echo pathinfo($image,PATHINFO_FILENAME)?>>
                        <?php endif?>
                    <?php endforeach?>
                </div>
            </div>
            <div class="thumbnails">
                <?php foreach($images as $image):
                    if($image != "." && $image != ".."):?>
                    <img src="images/Products/<?php echo $_GET['ref']?>/<?php echo $image?>" alt="Image <?php echo pathinfo($image,PATHINFO_FILENAME)?>" class=<?php echo pathinfo($image,PATHINFO_FILENAME)?>>
                    <?php endif?>
                <?php endforeach?>
            </div>
        </div>
        <div class="infos">
            <div class="name floating" style="background-color: #<?php echo $product['color'] ?>">
                <h1><?php echo $product['name']?></h1>
                <h3><?php echo $product['brand']?></h3>
            </div>
            <div class="details">
                <h4><?php echo $product['description'] ?></h4>
                <p>Référence : <?php echo $product['reference']?></p>
            </div>
            <div class="price">
                <input type="number" name="quantity" id="quantity" value=1 min=1>
                <p><?php echo $product['price']?> €</p>
            </div>
        </div>
    </div>
</body>
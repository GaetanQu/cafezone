<?php require_once(__DIR__ . '/pdo.php');

$productCategoryStatement = $mysqlClient -> prepare('SELECT categories.name FROM products JOIN  categories ON categories.id = products.category_id WHERE products.reference ="'.$_GET['ref'].'"');
$productCategoryStatement -> execute();
$productCategory = ($productCategoryStatement -> fetchall())[0][0];

if($productCategory === "Bean")
{
    $productStatement = $mysqlClient -> prepare('SELECT products.id AS id, products.images AS images, products.name AS name, products.description AS description, products.reference AS reference, products.price AS price, shops.name AS shop, shops.color AS color FROM products JOIN shop_product ON products.id = shop_product.product_id JOIN shops ON shops.id = shop_product.shop_id WHERE products.reference ="'.$_GET['ref'].'"');

    $aromasStatement = $mysqlClient -> prepare('SELECT aromas.name FROM aromas JOIN product_aroma ON product_aroma.aroma_id = aromas.id JOIN products ON products.id = product_aroma.product_id WHERE products.reference ="'.$_GET['ref'].'"');
    $aromasStatement -> execute();
    $aromas = $aromasStatement -> fetchall();
}

else
{
    $productStatement = $mysqlClient -> prepare('SELECT products.id AS id, products.images AS images, products.name AS name, products.description AS description, products.reference AS reference, products.price AS price, shops.name AS shop, shops.color AS color, brands.name AS brand FROM products JOIN shop_product ON products.id = shop_product.product_id JOIN shops ON shops.id = shop_product.shop_id JOIN brands ON brands.id = products.brand_id WHERE products.reference ="'.$_GET['ref'].'"');
}

$productStatement -> execute();
$product = ($productStatement -> fetchAll())[0];


$ratingsStatement = $mysqlClient -> prepare('SELECT * FROM ratings WHERE product_id = '.$product['id']);
$ratingsStatement -> execute();
$ratings = $ratingsStatement -> fetchAll();

$avgRatingStatement = $mysqlClient -> prepare('SELECT AVG(stars) FROM ratings WHERE product_id = '.$product['id']);
$avgRatingStatement -> execute();
$avgRatinglist = $avgRatingStatement -> fetchAll();

$avgRating = $avgRatinglist[0][0];

$images = scandir('images/Products/'.$_GET['ref']);
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
                <?php if($productCategory != "Bean"):?>
                    <h3><?php echo $product['brand']?></h3>
                <?php else :
                    $i = 0;?>
                    <h3><?php foreach($aromas as $aroma){
                        echo $aroma[0]." ";
                        $i++;
                        if($i < count($aromas)){
                            echo " - ";
                        }
                        }?></h3>
                <?php endif?>
            </div>
            <div class="details">
                <h4><?php echo $product['description'] ?></h4>
                <p>Vendu par <a href="shop.php?shop=<?php echo $product['shop']?>" style="color:<?php echo $product['color']?>; font-weight:bold; text-decoration:underline;"><?php echo $product['shop'] ?></a></p>
                <p>Référence : <?php echo $product['reference']?></p>
                <div class="rating">
                    <?php for($i = 1; $i <= 5; $i++):?>
                        <img src="<?php 
                            if($avgRating >= $i)
                            {
                                echo  'images/Icons/active star.svg';
                            }
                            else
                            {
                                echo 'images/Icons/star.svg';
                            }
                        ?>">
                    <?php endfor?>
                </div>
            </div>
            <div class="price">
                <input type="number" name="quantity" id="quantity" value=1 min=1>
                <p><?php echo $product['price']?> €</p>
            </div>
        </div>
    </div>
</body>
<!-- блок Пироги -->
<?php
require_once("connect/db_connect.php");
$sql = mysqli_query($conn, "SELECT * FROM `products` WHERE `category` = 79");
?>
<div class="category-wrap category-wrap-spy" id="category_wrap_79">
	<div class="category-name category-name_v2" id="category_79">
		<div class="container">
			<h2>Пироги</h2>
		</div>
	</div>
	<div class="category-items container" id="category_items_79">
		<div class="row">
			<?php
			while ($result = mysqli_fetch_assoc($sql)) {
				?>
				<div class="col-md-4 col-xs-6 col-item tovar">
					<div class="dish-item dish-item__with_img" id="dish-item-179">
						<div class="img-wrap" title="<?php echo $result['altin'] ?>" data-img-num="1">
							<img class="item-img lazy-img" src="images/transparent.png"
								data-src="<?php echo $result['img'] ?>" alt="<?php echo $result['alti'] ?>" />
							<div class="item-description-wrap">
								<div class="item-description">
									<?php echo $result['info'] ?>
								</div>
							</div>
						</div>
						<div class="item-content-wrap">
							<div class="dish-item-name">
								<?php echo $result['name'] ?>
							</div>
							<div class="dish-item-name">
								<button class="product__size-element btn btn-success"
									data-sb-curent-price="<?php echo $result['price_one'] ?>"
									data-sb-curent-size="<?php echo $result['size_one'] ?>"
									data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_one'] ?>
									гр</button>
								<button class="product__size-element btn btn-success"
									data-sb-curent-price="<?php echo $result['price_two'] ?>"
									data-sb-curent-size="<?php echo $result['size_two'] ?>"
									data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_two'] ?>
									гр</button>
							</div>
							<div class="dish-item-name">
								<div class="product__price"><span class="product__price-number">
										<?php echo $result['price_one'] ?>
									</span> ₽
								</div>
								<div class="product__quantity"></div>
							</div>
							<div class="dish-item-name">
								<a class="buyes btn btn-success" href="javascript:void(0)"
									data-sb-id-or-vendor-code="z<?php echo $result['id'] ?>"
									data-sb-product-name="<?php echo $result['name'] ?>"
									data-sb-product-price="<?php echo $result['price_one'] ?>" data-sb-product-quantity="1"
									data-sb-product-img="<?php echo $result['img'] ?>">Добавить в корзину
								</a>
							</div>
						</div>
					</div>
				</div>
				<?php
			}
			?>
		</div>
	</div>
</div>


<!-- блок Хлеб -->

<?php
$sql = mysqli_query($conn, "SELECT * FROM `products` WHERE `category` = 98");
?>
<div class="category-wrap category-wrap-spy" id="category_wrap_98">
	<div class="category-name category-name_v2" id="category_98">
		<div class="container">
			<h2>Хлеб</h2>
		</div>
	</div>
	<div class="category-items container" id="category_items_98">
		<div class="row">
			<?php
			while ($result = mysqli_fetch_assoc($sql)) {
				?>
				<div class="col-md-4 col-xs-6 col-item tovar">
					<div class="dish-item dish-item__with_img" id="dish-item-393">
						<div class="img-wrap" title="<?php echo $result['altin'] ?>" data-img-num="18">
							<img class="item-img lazy-img" src="images/transparent.png"
								data-src="<?php echo $result['img'] ?>" alt="<?php echo $result['altin'] ?>" />

							<div class="item-description-wrap">
								<div class="item-description">
									<?php echo $result['info'] ?>
								</div>
							</div>
						</div>
						<div class="item-content-wrap">
							<div class="dish-item-name">
								<?php echo $result['name'] ?>
							</div>
							<div class="dish-item-name">
								(<span class="product__size-element"
									data-sb-curent-price="<?php echo $result['price_one'] ?>"
									data-sb-curent-size="<?php echo $result['size_one'] ?>"
									data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_one'] ?>
									гр</span>)
							</div>
							<div class="dish-item-name">
								<div class="product__price"><span class="product__price-number">
										<?php echo $result['price_one'] ?>
									</span> ₽
								</div>
								<div class="product__quantity"></div>
							</div>
							<div class="dish-item-name">
								<a class="buyes btn btn-success" href="javascript:void(0)"
									data-sb-id-or-vendor-code="z<?php echo $result['id'] ?>"
									data-sb-product-name="<?php echo $result['name'] ?>"
									data-sb-product-price="<?php echo $result['price_one'] ?>" data-sb-product-quantity="1"
									data-sb-product-img="<?php echo $result['img'] ?>">Добавить в корзину
								</a>
							</div>
						</div>
					</div>
				</div>
				<?php
			}
			?>
		</div>
	</div>
</div>

<!-- блок Пицца -->
<?php
$sql = mysqli_query($conn, "SELECT * FROM `products` WHERE `category` = 99");
?>

<div class="category-wrap category-wrap-spy" id="category_wrap_99">
	<div class="category-name category-name_v2" id="category_99">
		<div class="container">
			<h2>Пицца</h2>
		</div>
	</div>
	<div class="category-items container" id="category_items_99">
		<div class="row">
			<?php
			while ($result = mysqli_fetch_assoc($sql)) {
				?>
				<div class="col-md-4 col-xs-6 col-item tovar">
					<div class="dish-item dish-item__with_img" id="dish-item-393" data-id="393" data-parent-id="12244">
						<div class="img-wrap" title="<?php echo $result['altin'] ?>" data-img-num="18">
							<img class="item-img lazy-img" src="images/transparent.png"
								data-src="<?php echo $result['img'] ?>" alt="<?php echo $result['altin'] ?>" />

							<div class="item-description-wrap">
								<div class="item-description">
									<?php echo $result['info'] ?>
								</div>
							</div>
						</div>
						<div class="item-content-wrap">
							<div class="dish-item-name">
								<?php echo $result['name'] ?>
							</div>
							<div class="dish-item-name">
								<button class="product__size-element btn btn-success"
									data-sb-curent-price="<?php echo $result['price_one'] ?>"
									data-sb-curent-size="<?php echo $result['size_one'] ?>"
									data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_one'] ?>
									гр</button>
								<button class="product__size-element btn btn-success"
									data-sb-curent-price="<?php echo $result['price_two'] ?>"
									data-sb-curent-size="<?php echo $result['size_two'] ?>"
									data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_two'] ?>
									гр</button>
							</div>
							<div class="dish-item-name">
								<div class="product__price"><span class="product__price-number">
										<?php echo $result['price_one'] ?>
									</span> ₽
								</div>
								<div class="product__quantity"></div>
							</div>
							<div class="dish-item-name">
								<a class="buyes btn btn-success" href="javascript:void(0)"
									data-sb-id-or-vendor-code="z<?php echo $result['id'] ?>"
									data-sb-product-name="<?php echo $result['name'] ?>"
									data-sb-product-price="<?php echo $result['price_one'] ?>" data-sb-product-quantity="1"
									data-sb-product-img="<?php echo $result['img'] ?>">Добавить в корзину
								</a>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>

<!-- блок Пирожки -->
<?php
$sql = mysqli_query($conn, "SELECT * FROM `products` WHERE `category` = 128");
?>
<div class="category-wrap category-wrap-spy" id="category_wrap_128">
	<div class="category-name category-name_v2" id="category_128">
		<div class="container">
			<h2>Пирожки</h2>
		</div>
	</div>
	<div class="category-items container" id="category_items_128">
		<div class="row">
			<?php
			while ($result = mysqli_fetch_assoc($sql)) {
				?>
				<div class="col-md-4 col-xs-6 col-item tovar">
					<div class="dish-item dish-item__with_img" id="dish-item-1500" data-id="1500" data-parent-id="13588">
						<div class="img-wrap" title="<?php echo $result['altin'] ?>" data-img-num="35">
							<img class="item-img lazy-img" src="images/transparent.png"
								data-src="<?php echo $result['img'] ?>" alt="<?php echo $result['altin'] ?>" />

							<div class="item-description-wrap">
								<div class="item-description">
									<?php echo $result['info'] ?>
								</div>
							</div>
						</div>
						<div class="item-content-wrap">
							<div class="dish-item-name">
								<?php echo $result['name'] ?>
							</div>
							<div class="dish-item-name">
								<?php if ($result['size_one'] > 0) { ?>
									(<span class="product__size-element"
										data-sb-curent-price="<?php echo $result['price_one'] ?>"
										data-sb-curent-size="<?php echo $result['size_one'] ?>"
										data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_one'] ?>
										гр</span>)
								<?php } ?>
							</div>
							<div class="dish-item-name">
								<div class="product__price"><span class="product__price-number">
										<?php echo $result['price_one'] ?>
									</span> ₽
								</div>
								<div class="product__quantity"></div>
							</div>
							<div class="dish-item-name">
								<a class="buyes btn btn-success" href="javascript:void(0)"
									data-sb-id-or-vendor-code="z<?php echo $result['id'] ?>"
									data-sb-product-name="<?php echo $result['name'] ?>"
									data-sb-product-price="<?php echo $result['price_one'] ?>" data-sb-product-quantity="1"
									data-sb-product-img="<?php echo $result['img'] ?>">Добавить в корзину
								</a>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>

		</div>
	</div>
</div>

<!-- блок Сладкое -->
<?php
$sql = mysqli_query($conn, "SELECT * FROM `products` WHERE `category` = 127");
?>
<div class="category-wrap category-wrap-spy" id="category_wrap_127">
	<div class="category-name category-name_v2" id="category_127">
		<div class="container">
			<h2>Сладкое</h2>
		</div>
	</div>
	<div class="category-items container" id="category_items_127">
		<div class="row">
			<?php
			while ($result = mysqli_fetch_assoc($sql)) {
				?>
				<div class="col-md-4 col-xs-6 col-item tovar">
					<div class="dish-item dish-item__with_img" id="dish-item-1504" data-id="1504" data-parent-id="13592">
						<div class="img-wrap" title="<?php echo $result['altin'] ?>" data-img-num="39">
							<img class="item-img lazy-img" src="images/transparent.png"
								data-src="<?php echo $result['img'] ?>" alt="<?php echo $result['altin'] ?>" />

							<div class="item-description-wrap">
								<div class="item-description">
									<?php echo $result['info'] ?>
								</div>
							</div>
						</div>
						<div class="item-content-wrap">
							<div class="dish-item-name">
								<?php echo $result['name'] ?>
							</div>
							<div class="dish-item-name">
								<?php if ($result['size_one'] > 0) { ?>
									(<span class="product__size-element"
										data-sb-curent-price="<?php echo $result['price_one'] ?>"
										data-sb-curent-size="<?php echo $result['size_one'] ?>"
										data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_one'] ?>
										гр</span>)
								<?php } ?>
							</div>
							<div class="dish-item-name">
								<div class="product__price"><span class="product__price-number">
										<?php echo $result['price_one'] ?>
									</span> ₽
								</div>
								<div class="product__quantity"></div>
							</div>
							<div class="dish-item-name">
								<a class="buyes btn btn-success" href="javascript:void(0)"
									data-sb-id-or-vendor-code="z<?php echo $result['id'] ?>"
									data-sb-product-name="<?php echo $result['name'] ?>"
									data-sb-product-price="<?php echo $result['price_one'] ?>" data-sb-product-quantity="1"
									data-sb-product-img="<?php echo $result['img'] ?>">Добавить в корзину
								</a>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>


<!-- блок Другое -->
<?php
$sql = mysqli_query($conn, "SELECT * FROM `products` WHERE `category` = 127");
?>

<div class="category-wrap category-wrap-spy" id="category_wrap_119">
	<div class="category-name category-name_v2" id="category_119">
		<div class="container">
			<h2>Другое</h2>
		</div>
	</div>
	<div class="category-items container" id="category_items_119">
		<div class="row">
			<?php
			while ($result = mysqli_fetch_assoc($sql)) {
				?>
				<div class="col-md-4 col-xs-6 col-item tovar">
					<div class="dish-item dish-item__with_img" id="dish-item-1326" data-id="1326" data-parent-id="13417">
						<div class="img-wrap" title="<?php echo $result['altin'] ?>" data-img-num="43">
							<img class="item-img lazy-img" src="images/transparent.png"
								data-src="<?php echo $result['img'] ?>" alt="<?php echo $result['altin'] ?>" />

							<div class="item-description-wrap">
								<div class="item-description">
									<?php echo $result['info'] ?>
								</div>
							</div>
						</div>
						<div class="item-content-wrap">
							<div class="dish-item-name">
								<?php echo $result['name'] ?>
							</div>
							<div class="dish-item-name">
								<?php if ($result['size_one'] > 0) { ?>
									(<span class="product__size-element"
										data-sb-curent-price="<?php echo $result['price_one'] ?>"
										data-sb-curent-size="<?php echo $result['size_one'] ?>"
										data-sb-curent-id-or-vendor-code="z<?php echo $result['id'] ?>"><?php echo $result['size_one'] ?>
										гр</span>)
								<?php } ?>
							</div>
							<div class="dish-item-name">
								<div class="product__price"><span class="product__price-number">
										<?php echo $result['price_one'] ?>
									</span> ₽
								</div>
								<div class="product__quantity"></div>
							</div>
							<div class="dish-item-name">
								<a class="buyes btn btn-success" href="javascript:void(0)"
									data-sb-id-or-vendor-code="z<?php echo $result['id'] ?>"
									data-sb-product-name="<?php echo $result['name'] ?>"
									data-sb-product-price="<?php echo $result['price_one'] ?>" data-sb-product-quantity="1"
									data-sb-product-img="<?php echo $result['img'] ?>">Добавить в корзину
								</a>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>

<br>

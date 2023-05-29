<!--Скрипт самой корзины-->
<link rel="stylesheet" href="smartbasket/css/smartbasket.min.css">

<div class="smart-basket__wrapper"></div>

<script src="./smartbasket/js/smartbasket.min.js"></script>

<script>
	$(function () {
		$('.smart-basket__wrapper').smbasket({
			productElement: 'tovar',
			buttonAddToBasket: 'buyes',
			productPrice: 'product__price-number',
			productSize: 'product__size-element',

			productQuantityWrapper: 'product__quantity',
			smartBasketMinArea: 'basket',
			countryCode: '+7',
			smartBasketCurrency: '₽',
			smartBasketMinIconPath: 'images/korzina.png',

			agreement: {
				isRequired: true,
				isChecked: true,
				isLink: 'oplata.php',
			},
			nameIsRequired: true,
			telIsRequired: true,
			emailIsRequired: true,
		});
	});
</script>
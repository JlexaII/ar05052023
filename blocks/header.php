<nav class="navbar navbar-default navbar-fixed-top navbar-v1">
	<div class="container">
		<div class="flex_wrap">
			<div class="flex_logo">
				<a class="logo" href="index.php">
					<img src="images/logo3.png" alt="Осетинские Пироги" title="Осетинские Пироги" style="width: 100%;">
			</div>
			<div class="flex_work">
				<div class="header-notes hidden-sm">Режим работы: с 10:00-20:00</div>
				<div class="header-notes">
					<a onclick="openModal()" class="modales" href="#" title="Доставка и оплата"><u>Доставка и
							оплата</u></a>
				</div>
			</div>
			<div class="flex_phone">
				<a href="tel:+79205593503" class="phone-wrap">Заказ по тел:
					(<span class="phone-code ya-phone-code">+7</span>) <span class="ya-phone-num">920-559-35-03</span>
				</a>
			</div>
			<div class="flex_links">
				<div class="nav-sm-wrap">
				</div>
				<div class="basket">

				</div>
</nav>
<div class="header header1">
	<div class="header-inner">
		<div class="header-inner_wrap">
			<div class="header_top">
				<div class="flex_wrap">
				</div>
			</div>
			<div class="header-categories header_body">

			</div>
		</div>
	</div>
</div>
<div class="header-bottom">

</div>
<div class="page-wrap">




	<div class="bg-line bg-green hidden-sm hidden-xs">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<!--<div class="tbl">
						<span>
							<img class="img-responsive" src="/images/green-350.png" alt="Минимальная сумма заказа 350 руб."/>
						</span>
						<h2>
							Минимальная сумма заказа
							<span>&nbsp;</span>
						</h2>
					</div>-->
					<div class="morder_params">
						Доставка по городу от <span>1000р</span>
					</div>
				</div>
				<div class="col-sm-6">
					<!--<div class="tbl">
						<span>
							<img class="img-responsive" src="/images/green-0.png" alt="Бесплатная доставка "/>
						</span>
						<h2>
							Бесплатная доставка
							<span>при заказе от 1500 руб</span>
						</h2>
					</div>-->
					<div class="morder_params">
						бесплатная доставка от <span>500р</span>
					</div>
				</div>
			</div>
			<!--<div class="alert alert-danger">

			</div>-->
		</div>
	</div>

	<style>
		.owl-stage {
			/* width: 590px; */
			margin: 0 auto;
		}
	</style>
	<div class="items-container items-container_v2">

		<div class="new_nav_categories">
			<div class="new_nav_categories_inner">
				<div class="container">
					<div class="owl-carousel owl-carousel_nav"
						data-plugin-options="{loop:false, dots:true, dotsData:true, dotsEach:true, autoplay:false, responsiveClass:true, responsive:{ 0:{ items:5},600:{items:7},1000:{items:9},1200:{items:9}}}">
						<a data-dot="79" class="js_to_cat active" href="#category_wrap_79">
							<img src="images/catalog/category/c/bolsie-sytnye-pirogi-79.png" alt="Пироги" />
							<div>Пироги</div>
						</a>
						<a data-dot="98" class="js_to_cat " href="#category_wrap_98">
							<img src="images/catalog/category/c/pirozki-fursetnye-98.png" alt="Хлеб" />
							<div>Хлеб</div>
						</a>
						<a data-dot="99" class="js_to_cat " href="#category_wrap_99">
							<img src="images/catalog/category/c/rzanye-pirozki-106.png" alt="Пицца" />
							<div>Пицца</div>
						</a>
						<a data-dot="128" class="js_to_cat " href="#category_wrap_128">
							<img src="images/catalog/category/c/sety-111.png" alt="Пирожки" />
							<div>Пирожки</div>
						</a><a data-dot="127" class="js_to_cat " href="#category_wrap_127">
							<img src="images/catalog/category/c/pirozki-77.png" alt="Сладкое" />
							<div>Сладкое</div>
						</a><a data-dot="119" class="js_to_cat " href="#category_wrap_119">
							<img src="images/catalog/category/c/rzanye-pirogi-117.png" alt="Другое" />
							<div>Другое</div>
						</a>
					</div>
				</div>
				<div class="hide">
					<div class="dropdown-categories-menu">
						<ul class="nav">
							<li><a href="#category_wrap_79">Пироги</a></li>
							<li><a href="#category_wrap_98">Хлеб</a></li>
							<li><a href="#category_wrap_99">Пицца</a></li>
							<li><a href="#category_wrap_128">Пирожки</a></li>
							<li><a href="#category_wrap_127">Сладкое</a></li>
							<li><a href="#category_wrap_119">Другое</a></li>
							<li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<script>
			function openModal() {
				var modalWindow = window.open('delivery.html', '_blank', 'height=850,width=800,modal=yes,alwaysRaised=yes');

				//если вы хотите, чтобы окно было центрировано на экране 
				modalWindow.moveTo((screen.availWidth - 850) / 2, (screen.availHeight - 800) / 2);
			}
		</script>

		<style>
			.modales {
				font-size: 28px;
				line-height: 32px;
				margin-right: 50px;
				padding: 20px 0 15px 15px;
				font-family: "Lobster", cursive;
				color: #532f23;
			}
		</style>
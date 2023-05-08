var _arr 	= {};
var _pluginsDir = '/plugins/';
var _fly = true;
var _modal_fly = false;
var _ym_id = 53557858;

function isDefined(_f){
	return typeof(_f) !== 'undefined'
}

setTimeout(function(){
	if(isDefined(ym)){
		ym(_ym_id,'reachGoal','more_2minutes');
	}
}, 1000*60*2);

function loadScript(scriptName, callback) {
	if (!_arr[scriptName]) {
		_arr[scriptName] = true;
		var body 		= document.getElementsByTagName('body')[0];
		var script 		= document.createElement('script');
		script.type 	= 'text/javascript';
		script.src 		= scriptName;
		script.onload = callback;
		body.appendChild(script);
	} else if (callback) {
		callback();
	}
}

$(function(){
	init();
});

function init(){
	$(document).on('pjax:start', function(){
		$('.pjax-wrapper').addClass('loading');
	});
	$(document).on('pjax:end', function(){
		$('.pjax-wrapper').removeClass('loading');
		re_init();
	});
	re_init();

	setTimeout(function () {
		_affixCategories(false);
	}, 1500);

	_shopTriggers();
	_pageWrapHeight();

	if ($('.items-container').length){
		_loadJui();
	}


	_fancybox();
}

function _fancybox() {
	var _container = jQuery('a.fancybox');

	if(_container.length > 0) {
		loadScript('/plugins/fancybox/source/jquery.fancybox.pack.js', function() {
			_container.fancybox({
				padding: 5,
				prevEffect : 'none',
				nextEffect : 'none',
				helpers: {
					title : {
						type : 'over'
					}
				},
				tpl : {
					closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>'
				}
			});
		});
	}
}

function re_init(){
	$('[data-toggle=\"tooltip\"]').tooltip({container:'body', trigger:'hover'});
	$('input.numeric-only').ForceNumericOnly();
	lazy('.lazy-img');
	_owl();
	loadCart();
}

function _pageWrapHeight() {
	var _fix = ($(window).height() - $('.navbar-fixed-top').outerHeight());
	if($(window).width() <= 767){
		_fix = ($(window).height() - $('.navbar-fixed-top').outerHeight() - $('.footer').outerHeight());
	}
	//if ($('.page-wrap').outerHeight() < _fix)
		$('.page-wrap').css('min-height', _fix);
}

function _affixCategories(onlyUpdate) {
	var _v2 = $('.new_nav_categories_inner');
	if(_v2.length){
		if (onlyUpdate){
			$(window).off('.affix');
			if (onlyUpdate){
				_v2.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
			}
		}

		_v2.affix({
			offset: {
				top: function () {
					return (this.top = (_v2.parent().offset().top - $('.navbar-fixed-top').outerHeight(true) -1))
				},
				bottom: function () {
					return (this.bottom = 300 )
				}
			}
		});

		_v2.affix('checkPosition');

		if (!onlyUpdate){
			// and spy
			$('body').scrollspy({target:'.dropdown-categories-menu', offset:200});

			$(window).on('activate.bs.scrollspy', function (e) {
				var _target = $(e.target).find('a');
				if (!_target.length){
					_target = $('.dropdown-categories-menu').find('.active a');
				}
				var _href = _target.attr('href');

				$('.js_to_cat').removeClass('active');
				var _new_a = $('.js_to_cat[href="'+_href+'"]');
				_new_a.addClass('active');
				var _index = _new_a.parent().index();
				$('.owl-carousel_nav').trigger( 'to.owl.carousel', [_index, 200, true] );
			});

			// init active
			setTimeout(function () {
				$(window).trigger('activate.bs.scrollspy');
			},10);

			// scrollToCategory
			$('.js_to_cat, .header-categories a.cat-item').on('click', function (e) {
				e.preventDefault();
				var fix = 0;
				if ($(window).width() < 1200)
					fix = 20;
				scrollToCategory($(this).attr('href'), fix);
			});
		}

	}else{
		var _container = $('.category-name');
		if (_container.length){
			if (onlyUpdate){
				$(window).off('.affix');
			}

			_container.each(function () {
				var _el = $(this);
				var _fixBottom = 0;
				if ($(this).hasClass('category-name-dropdown'))
					_fixBottom = 100;

				if (onlyUpdate){
					_el.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
				}

				_el.affix({
					offset: {
						top: function () {
							return (this.top = (_el.offset().top - $('.navbar-fixed-top').outerHeight(true) -30))
						},
						bottom: function () {
							return (this.bottom = ($(document).height() - $('.items-container').offset().top - $('.items-container').outerHeight(true)) + 100 + _fixBottom)
						}
					}
				});

				_el.affix('checkPosition');
			});

			if (!onlyUpdate){
				// and spy
				$('body').scrollspy({target:'.dropdown-categories-menu', offset:200});
				// scrollToCategory
				$('.dropdown-categories-menu a, .header-categories a.cat-item').on('click', function (e) {
					e.preventDefault();
					var fix = 0;
					if ($(window).width() < 1200)
						fix = 20;
					scrollToCategory($(this).attr('href'), fix);
				});
			}
		}
	}
}

function scrollToElement(element, callback){
	if (typeof element == 'string'){
		element = $(element);
	}
	var hasAffix = false;
	var _isItem = element.hasClass('dish-item');
	var _view = false;

	var fixSize = 80;
	var viewFix = 0;
	var _winWidth = $(window).width();

	if(_winWidth > 303){
		fixSize = 84;
	}
	if(_winWidth > 320){
		fixSize = 88;
	}
	if(_winWidth > 360){
		fixSize = 88;
	}
	if(_winWidth > 767){
		fixSize = 110;
	}
	if(_winWidth > 991){
		fixSize = 140;
		if (_view)
			viewFix = 48;
	}
	if(_winWidth > 1199){
		fixSize = 220;
		if (_view)
			viewFix = 48;
	}
	if(_winWidth > 1659){
		fixSize = 220;
		if (_view)
			viewFix = 48;
	}

	if (_isItem)
		fixSize += 10;
	var destination = element.offset().top - fixSize + viewFix;

	$('html, body').animate({
		scrollTop: destination
	}, 500, function () {
		// callback
		if (typeof callback !== 'undefined'){
			callback();
		}
	});
}

function _shopTriggers() {
	$(document).on('click', '.finish-items .cart-btn', function (e) {
		e.preventDefault();
		var id = $(this).parents('tr').data('id');
		var _count = parseInt($(this).parent().find('.cart-count-item').text());
		var _pane = $(this).parents('.tab-pane');

		var city_id = $('.order_city_id').val();
		var ddate = $('.order_dateDos').val();
		var cashback = $('.order_cashback').val() ? parseInt($('.order_cashback').val()) : 0;

		if ($(this).hasClass('cart-btn-plus')){
			_count+=1;
		}else{
			_count-=1;
		}
		$.ajax({
			url:$('.cart-wrap').data('url'),
			method:'post',
			data:{
				id:id,
				count:_count,
				city_id:city_id,
				ddate:ddate,
				cashback:cashback
			},
			dataType:'json',
			success:function(data){
				createBasket(data);
				_validatePane(_pane);
			}
		});
	});
	// img-wrap
	$(document).on('click', '.modal-control', function () {
		var _img_num = $(this).data('item');
		$('.img-wrap[data-img-num="'+_img_num+'"]').trigger('click');
	});
	
	$(document).on('click', '.col-modal-btn .cart-btn', function () {
		var _count = parseInt($(this).parent().find('.cart-count-item').text());
		if ($(this).hasClass('cart-btn-plus')){
			_count+=1;
		}else{
			_count-=1;
		}
		if (_count){
			$(this).parent().find('.cart-count-item').text(_count);
		}
	});

	$(document).on('click', '.modal-add-to-cart', function () {
		_fly = false;
		_modal_fly = true;
		var id = $(this).data('id');
		var _parent = $('#dish-item-'+id);
		var _count = parseInt($(this).parent().find('.cart-count-item').text());

		_parent.find('.count-items').val(_count).change();
		_parent.find('.btn-add').trigger('click');
	});

	$(document).on('click', '.img-wrap', function () {
		var _src = 	$(this).find('.item-img').data('full');
		var _item = $(this).parents('.dish-item');
		if (_src){
			var title = _item.find('.dish-item-name').text(),
				description = _item.find('.item-description').html(),
				_modal = $('#img-modal'),
				_data_img_num = parseInt($(this).data('img-num')),
				_prev = _data_img_num ? _data_img_num-1 : '',
				_next = _data_img_num ? _data_img_num+1 : '';

			var _modal_content = '<div class="modal-header">'+
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
					'<h4 class="modal-title">'+title+'</h4>'+
				'</div>'+
				'<div class="modal-body">'+
					'<img src="'+_src+'" class="img-responsive"/>'+
					'<div class="modal-control modal-prev '+(_prev ? '' : 'hide')+'" data-item="'+_prev+'"><i class="fa fa-angle-left"></i></div>'+
					'<div class="modal-control modal-next '+(_next ? '' : 'hide')+'" data-item="'+_next+'"><i class="fa fa-angle-right"></i></div>'+
				'</div>'+
				'<div class="modal-footer">' +
					'<div class="row">' +
						'<div class="col-sm-8 text-left"><div class="modal-description">'+description+'</div></div>' +
						'<div class="col-sm-4 text-right col-modal-btn">' +
							'<span class="cart-btn cart-btn-minus">-</span> <span class="cart-count-item">1</span> <span class="cart-btn cart-btn-plus">+</span>'+
							'<button data-id="'+_item.data('id')+'" type="button" class="btn btn-success btn-lg modal-add-to-cart">Заказать</button> ' +
						'</div>' +
					'</div>'+
				'</div>';

			if (_modal.length){
				_modal.find('.modal-content').fadeOut('fast', function () {
					_modal.html('<div class="modal-dialog">'+
						'<div class="modal-content" style="display:none;">'+_modal_content+'</div>'+
					'</div>');
					_modal.find('.modal-content').fadeIn('fast');
				});
				if (!_modal.is(':visible')){
					_modal.modal('show');
				}
			}else{
				$('body').append('<div class="modal fade" id="img-modal">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+_modal_content+'</div>'+
					'</div>'+
				'</div>');
				$('#img-modal').modal({});
			}
		}
	});

	$(document).on('click', 'a.modals', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		var title = $(this).attr('title') ? $(this).attr('title') : $(this).text();
		var id = ($(this).attr('data-id') ? $(this).attr('data-id') : $(this).attr('id')) + '-modal';
		if($('#'+id).length){
			var _modalOpen = $('.modal.in');
			if(_modalOpen.length){
				_modalOpen.modal('hide');
				setTimeout(function () {
					$('#'+id).modal('show');
					//console.log('hi2');
				}, 500);
			}else{
				$('#'+id).modal('show');
			}
			//$('body').removeClass('modal-open').addClass('modal-open');
		}else{
			$(this).prepend('<i class="fa fa-spinner fa-spin loading-modal"></i>');
			var modalContent = '<div id="'+id+'" class="modal modal-rsv fade">'+
				'<div class="modal-dialog">'+
				'<div class="modal-content">'+
				'<div class="modal-header text-center">'+
				'<button type="button" class="close" data-dismiss="modal" aria-label="Закрыть"><span aria-hidden="true">&times;</span></button>'+
				'<h4 class="modal-title">'+title+'</h4>'+
				'</div>'+
				'<div class="modal-body">'+

				'</div>'+
				'</div>'+
				'</div>'+
				'</div>';
			$('body').append(modalContent);

			$.ajaxSetup({cache: true});
			$('#'+id).find('.modal-body').load(url, function(){
				$.ajaxSetup({cache: false});
				if (($(this).attr('id') == 'login-user-modal') || ($(this).attr('id') == 'register-user-modal')){
					$(this).find('form').append('<input type="hidden" name="returnUrl" value="'+location.href+'"/>');
				}
				var _modalOpen = $('.modal.in');
				if(_modalOpen.length){
					_modalOpen.modal('hide');
					setTimeout(function () {
						$('#'+id).modal({});
						//console.log('hi3');
					}, 500);
				}else{
					$('#'+id).modal({});
				}
				$('.loading-modal').remove();
				//$('body').removeClass('modal-open').addClass('modal-open');
			});
		}

		$('.modal.modal-km').on('shown.bs.modal', function(){
			$('body').removeClass('modal-open').addClass('modal-open');
		});
	});

	$(window).on('resize', function () {
		setTimeout(function () {
			_affixCategories(true);
		}, 500);
		_pageWrapHeight();
	});

	$('a.add-review').on('click', function (e) {
		e.preventDefault();
		if (!$('#new-comment').length){
			var url = $(this).data('url');
			$('body').append('<div class="modal fade" id="new-comment"></div>');
			$('#new-comment').load(url, function(){
				$('#new-comment').modal({});
			});
		}else{
			$('#new-comment').modal('show');
		}
	});

	$('.alert').on('closed.bs.alert', function () {
		$('#alert-container').remove();
		/*setTimeout(function () {
			_affixCategories(true);
		}, 1000);*/
	});


	// quantity fields in block menu
	$(document).on('focusin', 'input.count-items', function () {
		if($(this).val() == 1)
			$(this).val('');
		//return false
	}).on('focusout', 'input.count-items', function(){
		if($(this).val() == '' || $(this).val() < 1)
			$(this).val(1);
		//return false
	}).on('change', 'input.count-items', function(){
		if($(this).val() == '') $(this).val(1);
		else $(this).val(parseInt($(this).val()));
		//return false;
	});

	// quantity buttons in block menu
	$(document).on('click', '.rp-count-control .btn', function(){
		var input = $(this).parents('.rp-count-control').find('input.count-items');
		if($(this).hasClass('btn-plus')){
			input.val(parseInt(input.val())+1);
		} else if($(this).hasClass('btn-minus')){
			if(parseInt(input.val()) > 1)
				input.val(parseInt(input.val())-1);
			else
				return false;
		}else{
			var id = parseInt(input.data('id'));
			var count = parseInt(input.val());
			count += parseInt(input.data('cart'));

			//add fly
			flyItem(id, function () {});
			addToCart(id, count);
		}
	});

	$('.cart-wrap .dropdown-menu').on('click', function (e) {
		var _target = $(e.target);
		var input;
		if (_target.hasClass('send-order')){
			//e.preventDefault();
			//$('#dropdown_cart').dropdown('toggle');
			if (!$('.modal').length){
				$('body').addClass('modal-wait');
			}
			return true;
		}else if(_target.hasClass('cart-item-name')){
			var fix = -155;
			if ($(window).width() < 1200)
				fix = - 120;
			e.preventDefault();
			scrollToCategory(_target.attr('href'), fix);
		}else if(_target.hasClass('btn-plus')){
			input = _target.parents('.rp-cart-count-control').find('input.count-items');
			input.val(parseInt(input.val())+1).trigger('change');
			return false;
		}else if(_target.hasClass('btn-minus')){
			input = _target.parents('.rp-cart-count-control').find('input.count-items');
			if(parseInt(input.val()) > 0)
				input.val(parseInt(input.val())-1).trigger('change');
			return false;
		}else{
			e.preventDefault();
			return false;
		}
	});

	$('.cart-items').on('change', 'input.count-items', function (e) {
		addToCart(parseInt($(this).data('id')), parseInt($(this).val()));
	});

	$('#data_dropdown_cart').on('shown.bs.dropdown', function () {
		basketScroll();
	});

	_orderForm();
	
	$('.bg-green .tbl').on('click', function () {
		$('#a_delivery').trigger('click');
	});

	// check address for delivery on day
	$(document).on('change', '.tab-step-2 .form-control', function () {
		var _city = $('.order_city_id').val();
		var _street = $('#useraddress-street').val();
		var _home = $('#useraddress-house').val();
		var _url = $('.tab-step-2').data('check');
		if (_city && _street && _home){
			$.ajax({
				type:'POST',
				url:_url,
				data:{city:_city, street:_street, home:_home},
				success:function (response) {
					if (response.onday){
						$.fn.kvDatepicker.dates={};
						if ($('.order_dateDos').data('kvDatepicker')) {
							$('.order_dateDos').kvDatepicker('destroy');
						}
						$('.order_dateDos').kvDatepicker({
							"autoclose":true,
							"format":"dd.mm.yyyy",
							"startDate":"+0d",
							"container":".order-date-dos-wrap",
							"language":"ru",
							"datesDisabled": [
								'22.02.2019',
								'01.01.2022',
								'02.01.2021',
								'19.02.2021',
								'20.02.2021',
								'21.02.2021',
								'07.03.2021',
								'04.03.2021',
								'08.03.2021',
								'05.03.2021',
								'30.04.2021',
								'11.05.2021',
								'10.01.2022'
							]
						});
						$('.order_dateDos').val('').kvDatepicker('update', '').kvDatepicker('setStartDate', '+0d');
					}else{
						$.fn.kvDatepicker.dates={};
						if ($('.order_dateDos').data('kvDatepicker')) {
							$('.order_dateDos').kvDatepicker('destroy');
						}
						$('.order_dateDos').kvDatepicker({
							"autoclose":true,
							"format":"dd.mm.yyyy",
							"startDate":"+1d",
							"container":".order-date-dos-wrap",
							"language":"ru",
							"datesDisabled": [
								'22.02.2019',
								'01.01.2022',
								'02.01.2021',
								'19.02.2021',
								'20.02.2021',
								'21.02.2021',
								'07.03.2021',
								'04.03.2021',
								'08.03.2021',
								'05.03.2021',
								'30.04.2021',
								'11.05.2021',
								'10.01.2022'
							]
						});
						$('.order_dateDos').val('').kvDatepicker('update', '').kvDatepicker('setStartDate', '+1d');
					}
				}
			});
		}
	});
	$(document).on('change', '.order_dateDos', function () {
		var _url = $('.order_dtime').data('times');
		var _date = $(this).val();
		if (_date){
			$.ajax({
				type:'GET',
				url:_url,
				data:{date:_date},
				success:function (response) {
					if (response.on_day || $('.order_dateDos').data('changed')){
						$('.order_dtime').val(null);
						$('.order_dtime').find('option').remove();

						$.each(response.times, function (i, e) {
							var newOption = new Option(i, e, false, false);
							$('.order_dtime').append(newOption);
						});
						$('.order_dtime').trigger('change');
					}
					$('.order_dateDos').data('changed', 1);
				}
			});
		}
	});
}

function _orderForm() {
	$(document).on('afterValidateAttribute', '.send-order-form', function(event, attr, msg) {
		var _toggleAttr = $(this).find('.field-userprofile-first_name, .field-userprofile-last_name');
		if (attr.name == 'email'){
			_toggleAttr.removeClass('hide');
			if (typeof msg[0] != 'undefined' && msg[0].search('rsv-error') >= 0){
				_toggleAttr.removeClass('hide').addClass('hide');
			}
		}
		if (attr.name == 'phone'){
			_toggleAttr = $(this).find('.field-order_city_id_ajax, .field-order_city_id, .field-useraddress-street, .field-useraddress-house, .field-useraddress-office');
			_toggleAttr.removeClass('hide');
			if (typeof msg[0] != 'undefined' && msg[0].search('rsv-error') >= 0){
				_toggleAttr.removeClass('hide').addClass('hide');
			}
		}

		//console.log(attr);

		_validatePane($(this).find(attr.input).parents('.tab-pane'));
	});

	$(document).on('afterValidate', '.send-order-form', function(event, msg, errAttributes) {
		if (errAttributes.length){
			var _first = errAttributes[0];
			var _input = $(this).find(_first.input);
			var _pane = _input.parents('.tab-pane');
			$(this).find('a[href="#'+_pane.attr('id')+'"]').trigger('click');
			_input.focus();
		}
	});
	
	$(document).on('click', '.ajax-lost-password', function (e) {
		e.preventDefault();
		var _link = $(this);
		var _parent = _link.parents('.form-group.has-error');
		var _login = _parent.hasClass('field-user-email') ? _parent.find('#user-email').val() : _parent.find('.user-phone').val();
		_parent.find('.ajax-lost-wrap').html('<i class="fa fa-spinner fa-spin"></i>');
		$.ajax({
			url:_link.data('url'),
			method: 'POST',
			data: {'RemindPassword[contact]':_login},
			success: function (response) {
				if (response.message){
					_parent.find('.ajax-lost-wrap').addClass(response.type).html(response.message);
				}
			}
		});
	});

	$(document).on('click', '.ajax-login-form .btn', function (e) {
		e.preventDefault();
		var _link = $(this);
		var _parent = _link.parents('.form-group.has-error');
		var _login = _parent.hasClass('field-user-email') ? _parent.find('#user-email').val() : _parent.find('.user-phone').val();
		var _password = _link.parent().parent().find('input').val();
		var _pane = _parent.parent('.tab-pane');
		var _form = _pane.parents('.send-order-form');
		$.ajax({
			url:_parent.find('.ajax-login-form').data('action'),
			method: 'POST',
			data: {
				'FrontendLogin[username]':_login,
				'FrontendLogin[password]':_password
			},
			success: function (response) {
				if (response.type == 'success'){
					_form.addClass('login');
					_form.find('.first-tab').addClass('disabled');
					_pane.addClass('tab-loaded');
					_pane.prepend('<div class="h2 h2-message">'+response.message+'</div>');
					_form.find('#userprofile-first_name').val(response.user.profile.first_name);
					_form.find('#userprofile-last_name').val(response.user.profile.last_name);
					_form.find('.user-phone').val('').trigger('change').val(response.user.phone).change();
					_form.find('#user-email').val('').trigger('change').val(response.user.email).change();

					if (response.user.address){
						_form.find('.order_city_id').val(response.user.address.city_id).change();
						_form.find('#useraddress-street').val(response.user.address.street).change();
						_form.find('#useraddress-house').val(response.user.address.house).change();
						_form.find('#useraddress-office').val(response.user.address.office).change();
					}

					_validatePane(_pane);
				}
			}
		});
	});
	
	$(document).on('show.bs.tab', 'a.disabled[data-toggle="tab"]', function (e) {
		e.stopPropagation();
		return false;
	});

	$(document).on('shown.bs.tab', '.send-order-form a[data-toggle="tab"]', function (e) {
		var _parent = $(this).parents('.send-order-form');
		var _pane = _parent.find($(this).attr('href'));
		var _toFocus = _pane.find('.required input');
		var i = 0;
		_toFocus.each(function () {
			if (!$(this).val() && !i){
				$(this).focus();
				i++;
			}
		});

		if ($(this).hasClass('last-tab')){
			var url = $('.cart-wrap').data('load')+'?city='+_parent.find('.order_city_id').val()+_parent.find('.order_dateDos').val();
			$.getJSON(url, function (data) {
				/*var _table = _parent.find('.finish-items tbody');
				var _finDelivery = _parent.find('.finish-delivery');
				_table.html('');
				_finDelivery.html('');
				var _sum = 0;
				$.each(data.cart, function(id, item){
					_table.append('<tr><td>'+item.name+'</td><td class="text-center">'+item.count+'</td><td class="text-right">'+(item.count*item.price)+' руб.</td></tr>');
					_sum += item.count*item.price;
				});

				if (data.params.delivery){
					_finDelivery.text('ДОСТАВКА: '+number_format(data.params.delivery, 0, ',', ' ')+' руб.');
				}

				_parent.find('.finish-sum').text('ИТОГО: '+number_format(_sum+data.params.delivery, 0, ',', ' ')+' руб.');*/
				_createBasketCart(data);
				_validatePane(_pane);
			});
		}
	});

	var ch = null;
	$(document).on('change', '.send-order-form .order_dateDos', function () {
		var _parent = $(this).parents('.send-order-form');
		var _pane = _parent.find('.tab-pane.active');
		clearTimeout(ch);
		ch = setTimeout(function () {
			var url = $('.cart-wrap').data('load')+'?city='+_parent.find('.order_city_id').val()+'&ddate='+_parent.find('.order_dateDos').val();
			$.getJSON(url, function (data) {
				_createBasketCart(data);
				_validatePane(_pane);
			});
		}, 100);
	});

	$(document).on('click', '.btn-next', function () {
		if (!$(this).hasClass('disabled')){
			var _next = $(this).parents('form').find('a[href="'+$(this).data('next')+'"]');
			_next.removeClass('disabled').trigger('click');
		}else{
			_validatePane($(this).parents('.tab-pane'), true);
		}
	});

	$(document).on('click', '.btn-finish.disabled', function (e) {
		return false;
	});

	$(document).on('shown.bs.modal', '#modals_send_order-modal', function () {
		var _parent = $(this).find('.send-order-form');
		var _pane = _parent.find('.tab-pane.active');
		var _toFocus = _pane.find('.required input');
		var i = 0;
		_toFocus.each(function () {
			if (!$(this).val() && !i){
				$(this).focus();
				i++;
			}
		});
		var url = $('.cart-wrap').data('load')+'?city='+_parent.find('.order_city_id').val();
		$.getJSON(url, function (data) {
			_createBasketCart(data);
			_validatePane(_pane);
		});
	});
}

function upd_discount(){
	var _parent = $('.send-order-form');
	var _cashback = 0;
	if(_parent.find('.order_cashback').val()){
		_cashback = _parent.find('.order_cashback').val();
	}
	var url = $('.cart-wrap').data('load')+'?city='+_parent.find('.order_city_id').val()+'&ddate='+_parent.find('.order_dateDos').val()+'&pickup='+($('.checkbox_v').prop('checked') ? 1 : 0)+'&promo='+_parent.find('.promocode-val').val().replace(/^#/, '')+'&cashback='+_cashback;
	$.getJSON(url, function (data) {
		_createBasketCart(data);
	});
}

function _createBasketCart(data) {
	var _table = $('.finish-items tbody');
	if (_table.length){
		var _finDelivery = $('.finish-delivery');
		var _finDiscount = $('.finish-discount');
		var _finDiscountCash = $('.finish-cashback');
		var _finError = $('.finish-error');
		_table.html('');
		_finDelivery.html('');
		_finDiscount.html('');
		_finError.html('').removeClass('has-error');
		var _sum = 0;
		$.each(data.cart, function(id, item){
			_table.append('<tr class="cart-tr" data-id="'+item.id+'"><td>'+item.name+'</td><td class="text-center"><span class="cart-btn cart-btn-minus">-</span><span class="cart-count-item">'+item.count+'</span><span class="cart-btn cart-btn-plus">+</span></td><td class="text-right last-td">'+(item.count*item.price)+' руб.</td></tr>');
			_sum += item.count*item.price;
		});

		if (_sum < data.params.min_sum){
			_finError.removeClass('has-error').addClass('has-error').text('Минимальная сумма заказа: '+number_format(data.params.min_sum, 0, ',', ' ')+' руб. Выберите ещё что-нибудь!');
		}

		var _dDelivery = data.params.delivery;
		if (_dDelivery && !_finDelivery.hasClass('free_delivery')){
			_finDelivery.text('ДОСТАВКА: '+number_format(_dDelivery, 0, ',', ' ')+' руб.').data('val', data.params.delivery);
		}else{
			_finDelivery.data('val', 0);
			_dDelivery = 0;
		}

		if (data.params.discount){
			_finDiscount.text('СКИДКА: '+number_format(data.params.discount, 0, ',', ' ')+' руб.').data('val', data.params.discount);
		}else{
			_finDiscount.data('val', 0);
		}

		var _bnPay = $('.bonus-pay');
		if(_bnPay.length){
			if(data.params.max_cashback && _bnPay.data('count-o')){
				$('.order_cashback').prop('disabled', false);
				$('#bonus-pay-calculate').prop('disabled', false);
				$('#bonus-pay-calculate').removeClass('disabled');
			}else{
				$('.order_cashback').prop('disabled', true);
				$('#bonus-pay-calculate').prop('disabled', true);
				$('#bonus-pay-calculate').removeClass('disabled').addClass('disabled');
			}
			$('#maxPayBonus').text(data.params.max_cashback).data('max', data.params.max_cashback).attr('data-max', data.params.max_cashback);
			$('#order-cashback').attr('max', data.params.max_cashback);

			if (data.params.cashback){
				_finDiscountCash.html('СКИДКА(баллы): '+number_format(data.params.cashback, 0, ',', ' ')+' руб.').data('val', data.params.cashback);
			}else{
				_finDiscountCash.html('').data('val', 0);
			}
		}

		$('.finish-pre-sum').text('СУММА: '+number_format(_sum, 0, ',', ' ')+' руб.').data('val', _sum);

		$('.finish-sum').text('ИТОГО: '+number_format(_sum+_dDelivery-data.params.discount-data.params.cashback, 0, ',', ' ')+' руб.');

		calculateTotal();
	}
}



function number_format_r(number, rub){
	var _r = (typeof rub === 'undefined') ? '' : ' ₽';
	return number_format(number, 0, ',', ' ')+_r;
}

function _validatePane(pane, change) {
	setTimeout(function () {
		var inputs = pane.find('input');
		var _status = true;
		inputs.each(function () {
			if ($(this).attr('aria-required')){
				if (!$(this).val()){
					_status = false;
					if (change){
						//	$(this).focus().focusout();
					}
				} else{
					//$(this).focus().focusout();
				}
			}
		});

		if (_status && pane.html().search('has-error') < 0){
			pane.find('.btn-next, .btn-finish').removeClass('disabled');
		}else{
			pane.find('.btn-next, .btn-finish').removeClass('disabled').addClass('disabled');
		}
	}, 200);
}

function _loadJui() {
	setTimeout(function () {
		loadScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js', function () {});
	}, 100);
}

function flyItem(id, callback) {
	if(!$('#fly_wrap').length){
		$('body').append('<div id="fly_wrap" class="fly_wrap"></div>');
	}
	if (_fly){
		_modal_fly = false;
		var item = $('#dish-item-'+id);
		var cart = $('#dropdown_cart');
		var imgtodrag = item.find('img').eq(0);
		if (imgtodrag) {
			var _w = 350;
			var _tw = 75;
			if ($(window).width() < 390){
				_w = imgtodrag.parent().width();
				_tw = 34;
			}
			var imgclone = imgtodrag.clone()
				.offset({
					top: imgtodrag.offset().top,
					left: imgtodrag.offset().left
				})
				.css({
					'opacity': '0.5',
					'position': 'absolute',
					'height': 'auto',
					'width': _w+'px',
					'z-index': '1039'
				})
				.appendTo($('#fly_wrap'))
				.animate({
					'top': cart.offset().top + 10,
					'left': cart.offset().left + 10,
					'width': _tw
				}, 700, 'easeInOutExpo');

			imgclone.animate({
				'width': 0,
				'height': 0
			}, function () {
				$(this).detach();

				// callback
				if (typeof callback !== 'undefined')
					callback();
			});
		}
	}else{
		if (_modal_fly){
			var _m_imgtodrag = $('.modal-body').find('img').eq(0);
			var _m_cart = $('#dropdown_cart');
			if (_m_imgtodrag) {
				//var _m__w = 350;
				var _m__w = $('.modal-body').outerWidth();
				var _m__tw = 75;
				if ($(window).width() < 390){
				//	_m__w = 300;
					_m__tw = 34;
				}
				var _m_imgclone = _m_imgtodrag.clone()
					.offset({
						top: _m_imgtodrag.offset().top,
						left: _m_imgtodrag.offset().left
					})
					.css({
						'opacity': '0.5',
						'position': 'absolute',
						'height': 'auto',
						'width': _m__w+'px',
						'z-index': '5001'
					})
					.appendTo($('#fly_wrap'))
					.animate({
						'top': _m_cart.offset().top + 10,
						'left': _m_cart.offset().left + 10,
						'width': _m__tw
					}, 700, 'easeInOutExpo');

				_m_imgclone.animate({
					'width': 0,
					'height': 0
				}, function () {
					$(this).detach();
				});
			}
		}

		// callback
		if (typeof callback !== 'undefined')
			callback();
		_fly = true;
		_modal_fly = false;
	}
}

function addToCart(id, count){
	var _cart = $('.cart-wrap');
	$.ajax({
		url:_cart.data('url'),
		method:'POST',
		data:{id:id, count:count},
		dataType:'json',
		success:function(data){
			createBasket(data);

			let _item_bl = $('#dish-item-'+id);
			dataLayer.push({
				"ecommerce": {
					"add": {
						"products": [
							{
								"id": "rp"+id,
								"name": _item_bl.find('.dish-item-name').text(),
								"price": parseFloat(_item_bl.find('.dish-item-price').text()),
								"category": _item_bl.parents('.category-wrap').find('h2').text(),
								"quantity": count
							}
						]
					}
				}
			});

			//console.log(dataLayer);

			if(isDefined(ym)){
				ym(_ym_id, 'reachGoal', 'add_to_cart');
			}
			/*if(isDefined(VK)){
				VK.Goal('add_to_cart');
				VK.Retargeting.Add(45035283);
			}*/
		}
	});
}

function createBasket(data){
	$('.dish-item').removeClass('success').find('.count-items').val(1).data('cart', 0);

	var cart_items = $('.cart-items');
	var sm_count = $('.sm-cart-count');
	var _count = 0;
	sm_count.removeClass('hide').addClass('hide');
	cart_items.html('');
	if(data.cart.length){
		$.each(data.cart, function(id, item){
			var selector = '#dish-item-'+item.id;
			//item.name = $(selector).find('.dish-item-name').text();
			$(selector).addClass('success').find('.count-items').data('cart', item.count);
			cart_items.append('<div class="row">' +
				'<div class="col-lg-6 col-sm-7 col-xs-7"><a href="#dish-item-'+item.id+'" class="cart-item-name">'+item.name+'</a></div>' +
				'<div class="col-lg-6 col-sm-5 col-xs-5 col-count-control">' +
					'<div class="cart-count-control-wrap">' +
						'<span class="cart-count-control">' +
							'<div class="input-group rp-cart-count-control">' +
								'<span class="input-group-btn"><button class="btn btn-minus" type="button">-</button></span>' +
								'<input class="form-control count-items numeric-only" name="count" data-id="'+item.id+'" value="'+item.count+'" type="text">' +
								'<span class="input-group-addon">шт.</span>' +
								'<span class="input-group-btn"><button class="btn btn-plus" type="button">+</button></span>' +
							'</div>' +
						'</span>' +
						'<span class="cart-item-sum">'+(item.price*item.count)+' руб.</span>' +
					'</div>' +
				'</div>' +
			'</div>');
			cart_items.find('input.numeric-only').ForceNumericOnly();
			_count += item.count*1;
		});
	}else{
		//cartBlock.html('<div class="alert alert-warning empty-basket">Ваша корзина пока пуста</div>');
		//sendOrder.html('').removeClass('hide').addClass('hide');
		//clearCart.fadeOut(100);
	}
	$('.ucart-sum').html(number_format(data.params.total, 0, ',', ' '));

	var _haven_bonus = $('.haven_bonus');
	if(_haven_bonus.length){
		if(data.params.all_bonus){
			_haven_bonus.find('.right-col').html('<b>'+data.params.all_bonus_txt+'</b>');
			_haven_bonus.removeClass('hide');
		}else{
			_haven_bonus.find('.right-col').html('');
			_haven_bonus.removeClass('hide').addClass('hide');
		}
	}

	sm_count.text(_count);
	if (_count)
		sm_count.removeClass('hide');


	var send_order = $('a.send-order');
	send_order.removeClass('modals')
	if(data.params.total)
		send_order.addClass('modals');

	basketScroll();

	//$('.basket').removeClass('loading');
	//cartBlock.animate({scrollTop:0}, 500);
	//createScrollBar();
	//if($(window).width() < 770)
	//	mobileCartIcon(data);

	_createBasketCart(data);
}

function basketScroll() {
	if($('.cart-wrap .dropdown-menu .slimScrollDiv').length){
		$('.cart-items').slimscroll({destroy:true}).css({height:'auto'});
	}
	var maxHeight = $(window).height() - $('.navbar-fixed-top').outerHeight(true) - $('.cart-footer').outerHeight(true) - 50;
	var cart_items = $('.cart-items');
	if (cart_items.outerHeight(true) > maxHeight){
		cart_items.slimscroll({
			height: maxHeight+'px',
			size: '6px',
			position: 'right',
			color: '#222',
			distance: '0px',
			railColor: '#eee',
			railOpacity: 0.3,
			allowPageScroll: false,
			disableFadeOut: true
		});
	}
}

function loadCart(){
	var cartBlock = $('.cart-wrap');
	$.ajax({
		url:cartBlock.data('load'),
		method:'get',
		dataType:'json',
		success:function(data){
			createBasket(data);
		}
	});
}

function scrollToCategory(element, fix){
	var destination = $(element).offset().top - 100;
	if (typeof fix !== 'undefined')
		destination += fix;
	$('html, body').animate({
		scrollTop: destination
	}, 300);
}

function _owl(){
	var _containers = $('.owl-carousel');
	if(_containers.length){
		loadScript(_pluginsDir + 'owl-carousel/owl.carousel.min.js', function() {
			$.each(_containers, function(){
				if(!$(this).hasClass('owl-carousel-init')){
					if ($(this).data('plugin-options')) {
						$(this).data('plugin-options', $(this).data('plugin-options').replace(/'/g, '"'));
					}
					var options = $(this).data('plugin-options');
					var $opt = eval('(' + options + ')');
					var defaults = {
						loop:true,
						responsiveClass:true,
						responsive:{
							 0:{
							    items:1
							 },
							 600:{
							    items:2
							 },
							 1000:{
							    items:3
							 }
						},
						items: 3,
						autoPlay: true,
						autoplayHoverPause:true,
						nav:false,
						navText: [
							'<i class="fa fa-angle-left"></i>',
							'<i class="fa fa-angle-right"></i>'
						],
						slideBy : 'page',
						dots:false,
						lazyLoad: true,
						vertical:true,
						mouseDrag: true,
						touchDrag: true
					};

					var config = jQuery.extend({}, defaults, $opt);
					$(this).addClass('owl-theme').owlCarousel(config).addClass('owl-carousel-init');
				}
			});
		});
	}
}

$(document).on('shown.bs.tab','a[data-toggle="tab"]', function(){
	var input = $('#tabSelect');
	var tab = $(this).attr('href').replace('#', '');
	if(input.length)
		setTabInput(tab);
	else{
		var form = $(this).parents('form');
		if(form.length){
			form.append('<input type="hidden" name="tab" id="tabSelect">');
			setTabInput(tab);
		}
	}
});

function setTabInput(tab){
	$('#tabSelect').val(tab);
}

$.fn.ForceNumericOnly = function(){
	return this.each(function(){
		$(this).keydown(function(e){
			var key = e.charCode || e.keyCode || 0;
			return (
			key == 8 ||
			key == 9 ||
			key == 13 ||
			key == 46 ||
			(key >= 37 && key <= 40) ||
			(key >= 48 && key <= 57) ||
			(key >= 96 && key <= 105));
		});
	});
};

function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
					.toFixed(prec);
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		.split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '')
			.length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1)
			.join('0');
	}
	return s.join(dec);
}

/*Lazy Load*/
function lazy(element){
	$(element).lazyload({
		effect : 'fadeIn',
		data_attribute : 'src',
		threshold : 400
	});
}

function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/*slimscroll*/
(function(e){e.fn.extend({slimScroll:function(f){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},f);this.each(function(){function v(d){if(r){d=d||window.event;
	var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&n(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function n(d,g,e){k=!1;var f=b.outerHeight()-c.outerHeight();g&&(g=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),g=Math.min(Math.max(g,0),f),g=0<d?Math.ceil(g):Math.floor(g),c.css({top:g+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());g=
	l*(b[0].scrollHeight-b.outerHeight());e&&(g=d,d=g/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),f),c.css({top:d+"px"}));b.scrollTop(g);b.trigger("slimscrolling",~~g);w();p()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
		!0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var q=b.scrollTop(),c=b.siblings("."+a.barClass),m=b.siblings("."+a.railClass);x();if(e.isPlainObject(f)){if("height"in f&&"auto"==f.height){b.parent().css("height","auto");b.css("height","auto");var h=b.parent().parent().height();b.parent().css("height",
	h);b.css("height",h)}else"height"in f&&(h=f.height,b.parent().css("height",h),b.css("height",h));if("scrollTo"in f)q=parseInt(a.scrollTo);else if("scrollBy"in f)q+=parseInt(a.scrollBy);else if("destroy"in f){c.remove();m.remove();b.unwrap();return}n(q,!1,!0)}}else if(!(e.isPlainObject(f)&&"destroy"in f)){a.height="auto"==a.height?b.parent().height():a.height;q=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",
	width:a.width,height:a.height});var m=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,
	WebkitBorderRadius:a.borderRadius,zIndex:99}),h="right"==a.position?{right:a.distance}:{left:a.distance};m.css(h);c.css(h);b.wrap(q);b.parent().append(c);b.parent().append(m);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);n(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",
	function(a){a.stopPropagation();a.preventDefault();return!1});m.hover(function(){w()},function(){p()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(n((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});
	x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),n(0,!0)):"top"!==a.start&&(n(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);

"use strict";

var cart = {};

cart.items = 0;
cart.total = 0.00;
cart.products = [];

if (JSON.parse(localStorage.getItem('cart')) === null) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function initSpinners(){
    $('.sidebar-spinner').spinner('changing', function (e, newVal, oldVal) {
        var $this = $(this);

        $this.closest('.quantity').find('.spinner-value').html(newVal);
        $this.closest('li').find('.item-price span').html(newVal);
        $('.cart-quickview .view-cart-button').addClass('is-hidden');
        $('.cart-quickview .update-cart-button').removeClass('is-hidden');
    });
}

function updateCartSidebar(){
    var cartObject = {};
    var productsCount = $('.cart-quickview .product-container').length;

    cartObject.products = [];
    cartObject.items = productsCount;
    $('.cart-quickview .product-container').each(function(){
        var $this = $(this);
        var productId = $this.attr('data-product-id');
        var productName = $this.find('.item-name').text();
        var productPrice = parseFloat($this.find('.item-price').text());
        var productQuantity = $this.find('.quantity input').val();
        var productImage = $this.find('img').attr('src');

        cartObject.products.push({
            id: productId,
            name: productName,
            quantity: productQuantity,
            price: productPrice,
            images: [
                {
                    url: productImage
                }
            ]
        })
    })
    localStorage.setItem('cart', JSON.stringify(cartObject));
    console.log(cartObject);
}

function addToCart(trigger) {
    var data = JSON.parse(localStorage.getItem('cart'));
    console.log(data);
    var $container = trigger.closest('.product-container');
    var productId = parseInt($container.attr('data-product-id'));
    var productName = $container.find('.product-name').text();
    var productPrice = parseFloat($container.find('.product-price span:first-child').text());
    var productImage = $container.find('img').attr('src');
    var productQuantity = 1;

    //const { length } = data.products;
    //const id = length + 1;
    const found = data.products.some(el => el.id === productId);
    if (!found) {
        console.log('Product does not exist in cart');
        data.items = data.items + 1;
        data.products.push({
            id: productId,
            name: productName,
            quantity: productQuantity,
            price: productPrice,
            images: [
                {
                    url: productImage
                }
            ]
        });
        localStorage.setItem('cart', JSON.stringify(data));
        console.log(data);
    }
    else {
        console.log('Product exists in cart');
        for (var i = 0; i < data.products.length; i++) {
            if (data.products[i].id == productId){
                data.products[i].quantity = data.products[i].quantity + 1;
            }
            localStorage.setItem('cart', JSON.stringify(data));
            console.log(data);
        }
    }
}

function getCart() {
    const plusIcon = feather.icons.plus.toSvg();
    const minusIcon = feather.icons.minus.toSvg();
    const closeIcon = feather.icons.x.toSvg();
    //const profileIcon = feather.icons['more-horizontal'].toSvg();
    var data = JSON.parse(localStorage.getItem('cart'));

    var cartTotal = 0.00;

    //Populate cart sidebar
    $('.cart-loader').addClass('is-active');

    $('.cart-quickview .cart-body ul').empty();

    if (data.products.length > 0) {
        $('.cart-quickview .empty-cart').addClass('is-hidden');

        for (var i = 0; i < data.products.length; i++) {
            cartTotal = parseFloat(cartTotal) + (parseFloat(data.products[i].price) * parseInt(data.products[i].quantity));

            var template = `
                <li class="clearfix product-container" data-product-id="${data.products[i].id}">
                    <img src="http://via.placeholder.com/250x250" data-demo-src="${data.products[i].images[0].url}"  alt="" />
                    <span class="item-meta">
                        <span class="item-name">${data.products[i].name}</span>
                        <span class="item-price">
                            <var>${parseFloat(data.products[i].price).toFixed(2)}</var> x <span>${data.products[i].quantity}</span>
                        </span>
                    </span>
                    <span class="quantity">
                        <div id="spinner-${data.products[i].id}" data-trigger="spinner" class="sidebar-spinner">
                            <input class="hidden-spinner" type="hidden" value="${data.products[i].quantity}" data-spin="spinner"
                                data-rule="quantity" data-min="1" data-max="99">
                            <a class="spinner-button is-remove" href="javascript:;" data-spin="down">
                                ${minusIcon}
                            </a>
                            <span class="spinner-value">${data.products[i].quantity}</span>
                            <a class="spinner-button is-add" href="javascript:;" data-spin="up">
                                ${plusIcon}
                            </a>
                        </div>
                    </span>

                    <span class="remove-item remove-from-cart-action has-simple-popover" data-content="Remove from Cart" data-placement="top">
                        ${closeIcon}
                    </span>
                </li>
            `

            $('.cart-quickview .cart-body ul').append(template);

            if (i == data.products.length - 1) {
                data.total = cartTotal;
                $('#quickview-cart-count var').html(data.items);
                localStorage.setItem('cart', JSON.stringify(data));
                $('.cart-quickview .cart-total').html(parseFloat(cartTotal).toFixed(2));
                initSpinners();
                changeDemoImages();
                initPopovers();
                opitimizePopovers();
                removeFromCart();
            }
        }
        $('#cart-dot').removeClass('is-hidden');
        setTimeout(function () {
            $('.cart-loader').removeClass('is-active');
        }, 800);
    } else {
        $('#cart-dot').addClass('is-hidden');
        $('.cart-quickview .empty-cart').removeClass('is-hidden');
        cartTotal = 0.00;
        data.total = cartTotal;
        localStorage.setItem('cart', JSON.stringify(data));
        $('.cart-quickview .cart-total').html(parseFloat(cartTotal).toFixed(2));
    }
}

function removeFromCart() {
    $('.remove-from-cart-action').on('click', function(){
        var $this = $(this);
        var productId = $this.closest('.product-container').attr('data-product-id');
        var data = JSON.parse(localStorage.getItem('cart'));

        $('.cart-loader').addClass('is-active');

        //Update cart Data
        setTimeout(function () {
            data.products = $.grep(data.products, function (e) {
                return e.id != productId;
            })
            data.items = data.products.length;
            localStorage.setItem('cart', JSON.stringify(data));
            $('.webui-popover').removeClass('in').addClass('pop-out');
            getCart();
        }, 300);
        //Simulate loading
        setTimeout(function(){
            $('.cart-loader').removeClass('is-active');
            toasts.service.success('', 'fas fa-check', 'Product successfully removed from cart', 'bottomRight', 2500);
        }, 800);
    })
}

$(document).ready(function(){

    $('.update-cart-button').on('click', function(){
        var $this = $(this);
        $this.addClass('is-loading');
        $('.cart-loader').addClass('is-active');
        setTimeout(function () {
            updateCartSidebar();
            getCart();
        }, 300)
        setTimeout(function(){
            $this.removeClass('is-loading').addClass('is-hidden');
            $('.cart-quickview .view-cart-button').removeClass('is-hidden');
            $('.cart-loader').removeClass('is-active');
            toasts.service.success('', 'fas fa-check', 'cart updated successfully', 'bottomRight', 2500);
        }, 800)
    })

    //Products Grid implementation
    if ($('#shop-grid').length) {

        //Add to cart
        $('.product-container .actions .add').on('click', function(){
            var $this = $(this);
            if ($('.cart-quickview').hasClass('is-active')) {
                $('.cart-loader').addClass('is-active');
            }
            setTimeout(function(){
                $.when(addToCart($this)).done(function(){
                    getCart()
                })
            }, 300)
            setTimeout(function () {
                if ($('.cart-quickview').hasClass('is-active')) {
                    $('.cart-loader').removeClass('is-active');
                }
                toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
            }, 800)
        })

    }

    //Products List implementation
    if ($('#shop-list').length) {

        //Add to cart
        $('.product-container .actions .add').on('click', function () {
            var $this = $(this);
            if ($('.cart-quickview').hasClass('is-active')) {
                $('.cart-loader').addClass('is-active');
            }
            setTimeout(function () {
                $.when(addToCart($this)).done(function () {
                    getCart()
                })
            }, 300)
            setTimeout(function () {
                if ($('.cart-quickview').hasClass('is-active')) {
                    $('.cart-loader').removeClass('is-active');
                }
                toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
            }, 800)
        })

    }
})
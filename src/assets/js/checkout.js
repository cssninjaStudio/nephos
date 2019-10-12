"use strict";

$(document).ready(function () {

    //Shipping methods checkout
    $('.shipping-wrapper .mini-card').on('click', function () {
        $('.shipping-wrapper .mini-card').removeClass('is-active');
        $('.active-indicator').removeClass('gelatine')
        $(this).addClass('is-active');
        $(this).find('.active-indicator').addClass('gelatine');
    })

    //Data Payment
    $('.payment-method').on("click", function () {
        var category_id = $(this).attr('data-method');
        $('#payment-header, #payment-methods').addClass('is-hidden');
        $("#" + category_id).removeClass('is-hidden');
    })

    $('.back-to-methods').on("click", function () {
        $('#paypal, #bank-transfer, #cash, #credit-card').addClass('is-hidden');
        $('#payment-header, #payment-methods').removeClass('is-hidden');
    })

    if ($('#credit-card').length) {
        var card = new Card({
            form: '.active form',
            container: '.card-wrapper'
        })
    }

    //Checkout mobile mode
    if ($('.action-bar').length) {

        //Js Media Query
        if (window.matchMedia('(max-width: 768px)').matches) {
            $('.action-bar').addClass('is-mobile');
            $('.shop-wrapper').addClass('is-mobile-mode');
            $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
            $('.pageloader, .infraloader').addClass('is-full');
        } else {
            //$('.mobile-navbar').removeClass('is-active');
            $('.shop-wrapper').removeClass('is-mobile-mode');
            $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
            $('.pageloader, .infraloader').removeClass('is-full');
        }

        //resize handler
        $(window).on('resize', function () {
            if (window.matchMedia('(max-width: 768px)').matches) {
                $('.action-bar').addClass('is-mobile');
                $('.shop-wrapper').addClass('is-mobile-mode');
                $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
                $('.pageloader, .infraloader').addClass('is-full');
            } else {
                //$('.mobile-navbar').removeClass('is-active');
                $('.shop-wrapper').removeClass('is-mobile-mode');
                $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
                $('.pageloader, .infraloader').removeClass('is-full');
            }
        })
    }

})
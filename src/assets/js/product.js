"use strict";

$(document).ready(function(){

    //Product panel
    $('.product-action').on('click', function () {
        $('.product-action.is-active').removeClass('is-active');
        $(this).addClass('is-active');
    })

    //show product
    $('#show-product').on('click', function () {
        $('#meta-view, #ratings-view').addClass('is-hidden');
        $('#product-view').removeClass('is-hidden');
    })

    //show meta
    $('#show-meta').on('click', function () {
        $('#product-view, #ratings-view').addClass('is-hidden');
        $('#meta-view').removeClass('is-hidden');
    })

    //show ratings
    $('#show-ratings').on('click', function () {
        $('#meta-view, #product-view').addClass('is-hidden');
        $('#ratings-view').removeClass('is-hidden');
    })

    //Add to wishlist
    $('.sidebar-whishlist').on('click', function () {
        $(this).toggleClass('is-active');
        $('.product-panel .panel-header .likes svg').toggleClass('is-liked gelatine');
    })

})
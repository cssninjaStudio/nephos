"use strict";

$(document).ready(function () {

    //Data orders list
    $('.list-card ul li').on("click", function () {
        $('.list-card ul li').removeClass('is-active');
        $(this).addClass('is-active');
        var order_id = $(this).attr('data-order');
        $('.order-list-card').addClass('is-hidden');
        $("#" + order_id).removeClass('is-hidden');
    })

})
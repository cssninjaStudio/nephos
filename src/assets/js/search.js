"use strict";

$(document).ready(function(){

    var searchOptions = {
        url: "assets/data/products.json",
        getValue: "name",
        template: {
            type: "custom",
            method: function (value, item) {
                return `
                    <div class="nephos-search-template">
                        <img class="autocpl-product" src="${item.pic}" alt="">
                        <div class="entry-text">
                            <span>${value}</span>
                            <span>${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                    </div>
                `
            }
        },
        highlightPhrase: false,
        list: {
            maxNumberOfElements: 6,
            showAnimation: {
                type: "fade", //normal|slide|fade
                time: 400,
                callback: function () { }
            },
            match: {
                enabled: true
            },
            onShowListEvent: function () {
                if (!$('#full-search').length){
                        var searchLink = `
                        <li id="full-search">
                            <div class="eac-item">
                                <div class="nephos-search-template">
                                    <a>Full Search</a>
                                </div>
                            </div>
                        </li>
                    `
                    $('.search-input-wrapper .easy-autocomplete-container ul').append(searchLink);
                }
                $('.search-input-wrapper .easy-autocomplete-container ul').addClass('opened');
            },
            onHideListEvent: function () {
                $('.search-input-wrapper .easy-autocomplete-container ul').removeClass('opened');
                $('#full-search').remove();
            },
            onKeyEnterEvent: function (e) {
                $('#clear-search').removeClass('is-active');
                $('#nephos-search').closest('.control').addClass('is-loading');
                setTimeout(function () {
                    window.location.href = '/search-results.html'
                }, 2200);
            }
        },
    };

    $("#nephos-search").easyAutocomplete(searchOptions);

})
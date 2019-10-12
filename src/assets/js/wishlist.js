"use strict";

function initWishlistTabs() {
    $('.is-account-grid .wishlists li').on('click', function(){
        var targetWishlist = $(this).attr('data-target-wishlist');
        $(this).siblings('li').removeClass('is-active');
        $(this).addClass('is-active');
        $('ul.wishlist').addClass('is-hidden');
        $('#' + targetWishlist).removeClass('is-hidden');
    })
}

function getWishlists() {
    const cartIcon = feather.icons['shopping-cart'].toSvg();
    const trashIcon = feather.icons['trash-2'].toSvg();

    var userData = JSON.parse(localStorage.getItem('user'));

    //If not logged in, hide wishlist
    if (!userData.isLoggedIn) {
        $('#wishlist-main, #wishlist-main-placeholder').toggleClass('is-hidden');
    }

    //Load wishlists
    else {

        //Empty wishlists menu and Grid
        $('.is-account-grid .menu-card li, #wishlists-container .wishlist-card .wishlist').remove();

        for (var i = 0; i < userData.wishlists.length; i++) {

            if (i == 0) {
                var template = `
                        <li class="is-active" data-target-wishlist="wishlist-${userData.wishlists[i].id}" data-wishlist-id="${userData.wishlists[i].id}">
                            <a>${userData.wishlists[i].name}</a>
                            <div class="action-block">
                                <span>${userData.wishlists[i].products.length} items</span>
                                <button class="remove-button remove-wishlist-action">
                                    ${trashIcon}
                                </button>
                            </div>
                        </li>
                    `
                var listContainer = `
                        <ul id="wishlist-${userData.wishlists[i].id}" class="wishlist"></ul>
                    `
            }

            else {
                var template = `
                        <li data-target-wishlist="wishlist-${userData.wishlists[i].id}" data-wishlist-id="${userData.wishlists[i].id}">
                            <a>${userData.wishlists[i].name}</a>
                            <div class="action-block">
                                <span>${userData.wishlists[i].products.length} items</span>
                                <button class="remove-button remove-wishlist-action">
                                    ${trashIcon}
                                </button>
                            </div>
                        </li>
                    `

                var listContainer = `
                        <ul id="wishlist-${userData.wishlists[i].id}" class="wishlist is-hidden"></ul>
                    `
            }

            $('.is-account-grid .wishlists').append(template);
            $('#wishlists-container .wishlist-card').append(listContainer);
        }

        for (var w = 0; w < userData.wishlists.length; w++) {

            for (var t = 0; t < userData.wishlists[w].products.length; t++) {

                var template = `
                        <li class="wishlist-item product-container" onclick="return true" data-wishlist-id="${userData.wishlists[w].id}"
                            data-product-id="${userData.wishlists[w].products[t].id}">
                            <div class="item-wrapper">
                                <!-- Product Image -->
                                <img src="http://via.placeholder.com/500x500/ffffff/999999" data-demo-src="${userData.wishlists[w].products[t].images[0].url}" alt="">
                                <!-- Product meta -->
                                <span class="product-info">
                                    <a class="product-name">${userData.wishlists[w].products[t].name}</a>
                                    <span>${userData.wishlists[w].products[t].category}</span>
                                    <span class="product-price is-hidden"><span>${userData.wishlists[w].products[t].price}</span></span>
                                </span>
                                <div class="action">
                                    <!-- actions -->
                                    <a class="add-button whishlist-cart-button pop-button">
                                        <div class="add-button-inner">
                                            ${cartIcon}
                                        </div>
                                    </a>
                                    <a class="remove-button remove-wishlist-item-action">
                                        <div class="remove-button-inner">
                                            ${trashIcon}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                    `

                $('#wishlist-' + userData.wishlists[w].id).append(template);
            }

            if (w == userData.wishlists.length - 1) {
                changeDemoImages();
                initWishlistTabs();
                removeWishlist();
                addToCartFromWishlist();
                initPopButtons();

                $('#wishlists-container .wishlist-card .wishlist').each(function () {
                    if ($(this).children('li').length) {
                        console.log('full array')
                    }

                    else {
                        console.log('empty array');
                        var placeholder = `
                                <li class="placeholder-wrap">
                                    <div class="placeholder-content">
                                        <img src="assets/img/illustrations/couch.svg" alt="">
                                        <h3>Empty Wishlist</h3>
                                        <p>This wishlist is still empty. Items will be shown as soon as you add some to it.</p>
                                    </div>
                                </li>
                            `
                        $(this).append(placeholder);
                    }
                })

                $('.account-loader').removeClass('is-active');
            }

        }
    }
}

function addWishlist(){

    $('.add-wishlist-action').on('click', function () {
        var $this = $(this);
        var data = JSON.parse(localStorage.getItem('user'));
        var newWishlistName = $this.closest('.modal').find('input').val();

        $this.addClass('is-loading');
        $('.account-loader').addClass('is-active');

        //Update wishlist Data
        setTimeout(function () {

            var newWishlist = {
                id: data.wishlists.length + 1,
                name: newWishlistName,
                products: []
            }

            data.wishlists.push(newWishlist);
            localStorage.setItem('user', JSON.stringify(data));
            getWishlists();
            $this.closest('.modal').removeClass('is-active');
        }, 1000);
        //Simulate loading
        setTimeout(function () {
            $this.removeClass('is-loading');
            $('.account-loader').removeClass('is-active');
            toasts.service.success('', 'fas fa-check', 'New wishlist successfully added', 'bottomRight', 2500);
        }, 1500);
    })

}

function removeWishlist() {
    $('.remove-wishlist-action').on('click', function () {
        var $this = $(this);
        var wishlistId = parseInt($this.closest('li').attr('data-wishlist-id'));
        var data = JSON.parse(localStorage.getItem('user'));

        launchAlert('Delete Wishlist?', 'Are you sure you want to delete this wishlist? All items will be removed and this cannot be undone.', 'Delete', 'Cancel', function(){
            $('.account-loader').addClass('is-active');

            //Update wishlist Data
            setTimeout(function () {
                data.wishlists = $.grep(data.wishlists, function (e) {
                    return e.id != wishlistId;
                })
                localStorage.setItem('user', JSON.stringify(data));
                getWishlists();
            }, 1000);
            //Simulate loading
            setTimeout(function () {
                $('.cart-loader').removeClass('is-active');
                toasts.service.success('', 'fas fa-check', 'Wishlist successfully deleted', 'bottomRight', 2500);
            }, 1500);
        })
    })
}

function addToCartFromWishlist() {
    $('.whishlist-cart-button').on('click', function(){
        var $this = $(this);
        $('.cart-loader').addClass('is-active');
        addToCart($this);
        setTimeout(function(){
            toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
            getCart();
        }, 800);
    })
}

function removeWishlistItem() {
    $('.remove-wishlist-item-action').on('click', function () {
        var $this = $(this);
        var productId = parseInt($this.closest('li').attr('data-product-id'));
        var wishlistId = parseInt($this.closest('li').attr('data-wishlist-id'));
        var data = JSON.parse(localStorage.getItem('user'));

        launchAlert('Remove From Wishlist?', 'Are you sure you want to remove this product from the current wishlist? This cannot be undone.', 'Delete', 'Cancel', function () {
            $('.account-loader').addClass('is-active');

            //Update wishlist Data
            setTimeout(function () {
                data.wishlists[wishlistId].products = $.grep(data.wishlists[wishlistId].products, function (e) {
                    return e.id != productId;
                })
                localStorage.setItem('user', JSON.stringify(data));
                getWishlists();
            }, 1000);
            //Simulate loading
            setTimeout(function () {
                $('.cart-loader').removeClass('is-active');
                toasts.service.success('', 'fas fa-check', 'Product successfully removed', 'bottomRight', 2500);
            }, 1500);
        })
    })
}

function initWishlistSelect() {

    $('.flat-card.product-container .actions .like').on('click', function(){
        console.log('clicked')
        var productId = $(this).closest('.product-container').attr('data-product-id');
        $('#add-to-wishlist-modal').attr('data-product-id', productId);
    })

    $('#wishlist-modal-list .list-item').on('click', function(){
        $(this).siblings('.list-item').removeClass('is-active');
        $(this).addClass('is-active');
    })

    $('.add-to-wishlist-action').on('click', function(){
        var $this = $(this);
        var userData = JSON.parse(localStorage.getItem('user'));
        var targetWishlist = parseInt($('#wishlist-modal-list .list-item.is-active').attr('data-wishlist-id'));
        var productId = parseInt($this.closest('.modal').attr('data-product-id'));

        $this.addClass('is-loading');
        for (var i = 0; i < userData.wishlists[targetWishlist].products.length; i++) {
            if (userData.wishlists[targetWishlist].products[i].id == productId){
                console.log('This product already exists in the list')
                $('#existing-product-message').removeClass('is-hidden');
                setTimeout(function(){
                    $('#existing-product-message').addClass('is-hidden');
                }, 3000)
            } else {
                console.log('This product doesn\'t exist in the list');
            }
        }
    })
}

function loadWishlistsInModal() {
    const checkIcon = feather.icons.check.toSvg();

    var userData = JSON.parse(localStorage.getItem('user'));

    //If not logged in, hide wishlist
    if (!userData.isLoggedIn) {
        $('#wishlist-modal-list, #wishlist-modal-list-placeholder').toggleClass('is-hidden');
    }

    //Load wishlists
    else {
        //Empty wishlists in modal
        $('#wishlist-modal-list ul li').remove();

        for (var i = 0; i < userData.wishlists.length; i++) {

            if (i == 0) {
                var template = `
                    <li class="list-item is-active" data-wishlist-id="${userData.wishlists[i].id}">
                        <div class="meta">
                            <span class="name">${userData.wishlists[i].name}</span>
                            <span class="count"><var>${userData.wishlists[i].products.length}</var> Items</span>
                        </div>
                        <div class="selected-indicator">
                            ${checkIcon}
                        </div>
                    </li>
                `
            }

            else {
                var template = `
                    <li class="list-item" data-wishlist-id="${userData.wishlists[i].id}">
                        <div class="meta">
                            <span class="name">${userData.wishlists[i].name}</span>
                            <span class="count"><var>${userData.wishlists[i].products.length}</var> Items</span>
                        </div>
                        <div class="selected-indicator">
                            ${checkIcon}
                        </div>
                    </li>
                `
            }

            $.when($('#wishlist-modal-list ul').append(template)).done(function(){
                initWishlistSelect();
            })
        }
    }
}

$(document).ready(function(){

    if ($('#shop-wishlist').length) {

        getWishlists();

        addWishlist();

        removeWishlistItem();

    }

    //Init add to wishlist modal if any
    if ($('#add-to-wishlist-modal').length){

        loadWishlistsInModal();

    }

})
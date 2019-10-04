$(document).ready(function(){

    "use strict";

    //Change demo images
    function changeDemoImages() {
        $('*[data-demo-src]').each(function () {
            var newSrc = $(this).attr('data-demo-src');
            $(this).attr('src', newSrc);
        });

        $('*[data-demo-background]').each(function () {
            var newBg = $(this).attr('data-demo-background');
            $(this).attr('data-background', newBg);
        });
    }

    $('*[data-demo-href]').each(function () {
        var newHref = $(this).attr('data-demo-href');
        $(this).attr('href', newHref);
    });

    changeDemoImages();

    //Mobile menu toggle
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function(){
            $(this).toggleClass('is-active');
            if ($('.navbar-menu').hasClass('is-active')) {
                $('.navbar-menu').removeClass('is-active');
            } else {
                $('.navbar-menu').addClass('is-active');
            }
        });
    }

    //Page loader
    if ($('.pageloader').length) {

        $('.pageloader').toggleClass('is-active');

        $(window).on('load', function() {
            //var pageloaderTimeout = 
            setTimeout( function() {
                $('.pageloader').toggleClass('is-active');
                $('.infraloader').removeClass('is-active')
                //clearTimeout( pageloaderTimeout );
            }, 700 );
        })
    }

    //Initialize Feather Icons
    feather.replace();

    //Attribute background images
    if ($('.has-background-image').length) {
        $(".has-background-image").each(function() {
            var bgImage = $(this).attr('data-background');
            if (bgImage !== undefined) {
                $(this).css('background-image', 'url(' + bgImage + ')');
            } 
        }
                                       )}

    //Full screen slick slider
    if ($('.slider-wrapper').length) {
        $('.fullscreen-slick').slick({
            dots: true,
            infinite: true,
            speed: 500,
            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
        });
    }

    //Product slick
    if ($('.is-carousel').length) {
        $('.is-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            arrows: false,
        });
    }

    //Popover query (for simple popovers)
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('.has-simple-popover').removeClass('has-simple-popover').addClass('popover-removed');
    } else {
        $('.popover-removed').addClass('has-simple-popover').removeClass('popover-removed');
    }

    $(window).on('resize', function() {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $('.has-simple-popover').removeClass('has-simple-popover').addClass('popover-removed');
        } else {
            $('.popover-removed').addClass('has-simple-popover').removeClass('popover-removed');
        }  
    })

    //Popover query (for simple popovers)
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('.has-popover-top').removeClass('has-popover-top').addClass('popover-removed');
    } else {
        $('.popover-complex-removed').addClass('has-popover-top').removeClass('popover-complex-removed');
    }

    $(window).on('resize', function() {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $('.has-popover-top').removeClass('has-popover-top').addClass('popover-removed');
        } else {
            $('.popover-complex-removed').addClass('has-popover-top').removeClass('popover-complex-removed');
        }  
    })

    //Sidebar close button
    $('.hamburger-btn').on('click', function() {
        $('.menu-toggle .icon-box-toggle').toggleClass('active');
        $('.category-quickview').toggleClass('is-active');
    })

    //sidebar behaviour
    $('.icon-menu li a').on('click', function() {
        $('.icon-menu li a.is-active').removeClass('is-active');
        $(this).addClass('is-active');
    })

    //Open search 
    $('#open-search').on('click', function() {
        $('.search-overlay').toggleClass('is-active');
        $(this).addClass('is-opened is-hidden');

        $('#close-search').removeClass('is-hidden');
        setTimeout(function(){
            $('#close-search').removeClass('is-inactive');
        }, 50);
        $('.search-input-wrapper').removeClass('is-hidden');
        setTimeout(function(){
            $('.search-input-wrapper .control').addClass('is-active');
        }, 300);
    })

    //Close search 
    $('#close-search').on('click', function(){
        $('.search-overlay').toggleClass('is-active');
        $(this).addClass('is-inactive is-hidden');

        $('#open-search').removeClass('is-hidden');
        setTimeout(function(){
            $('#open-search').removeClass('is-opened');
        }, 50);

        $('.search-input-wrapper .control').removeClass('is-active');
        setTimeout(function(){
            $('.search-input-wrapper').addClass('is-hidden');
        }, 150);
    })

    //Clear search
    $('#clear-search').on('click', function() {
        $(this).siblings('input').val('');
    })

    //shop sidebar
    $('#open-shop').on('click', function() {
        if ($('.cart-quickview, .filters-quickview').hasClass('is-active')) {
            $('.cart-quickview, .filters-quickview').removeClass('is-active');
        }

        if ($('.menu-fab').hasClass('dismissed')){
            $('.menu-fab').removeClass('dismissed')
        } 

        $('.shop-quickview').toggleClass('is-active');
    })

    //close shop sidebar
    $('#close-shop-sidebar').on('click', function(){
        $('.shop-quickview, #open-shop').toggleClass('is-active');
    })

    //Filters sidebar
    $('#open-filters').on('click', function(){
        if ($('.shop-quickview, .cart-quickview').hasClass('is-active')) {
            $('.shop-quickview, .cart-quickview').removeClass('is-active');
        }

        if (!$('.menu-fab').hasClass('dismissed')) {
            $('.menu-fab').addClass('dismissed')
        } 

        $('.filters-quickview').toggleClass('is-active');
    })

    //close filters sidebar
    $('#close-filters-sidebar').on('click', function(){
        $('.menu-fab').removeClass('dismissed')
        $('.filters-quickview, #open-filters').toggleClass('is-active');
    })

    //Cart sidebar
    $('#open-cart').on('click', function(){
        if ($('.shop-quickview, .filters-quickview').hasClass('is-active')) {
            $('.shop-quickview, .filters-quickview').removeClass('is-active');
        }

        if (!$('.menu-fab').hasClass('dismissed')) {
            $('.menu-fab').addClass('dismissed')
        } 

        $('.cart-quickview').toggleClass('is-active');
    })

    //close cart sidebar
    $('#close-cart-sidebar').on('click', function(){
        $('.menu-fab').removeClass('dismissed')
        $('.cart-quickview, #open-cart').toggleClass('is-active');
    })

    //Range slider filter
    if ($('.price-range-wrapper').length) {
        var range = $('.input-range'),
            value = $('.range-value');

        value.html('$0' + ' ' + '-' + ' ' + '$' + range.attr('value'));

        range.on('input', function() {
            value.html('$0' + ' ' + '-' + ' ' + '$' + this.value);
        });
    }

    //Toasts
    $('.flat-card .actions .like svg, .sidebar-whishlist svg').on('click', function(){
        $(this).toggleClass('is-active gelatine');

        if (!$(this).hasClass('is-active')) {
            iziToast.show({
                class: 'success-toast',
                icon: 'fa fa-heart-o',
                title: 'Successfuly removed from Wishlist',
                message: '',
                titleColor: '#fff',
                messageColor: '#fff',
                iconColor: "#fff",
                backgroundColor: '#FF7273',
                progressBarColor: '#444F60',
                position: 'bottomRight',
                transitionIn: 'fadeInUp',
                close: false,
                timeout: 2000,
                zindex: 99999,
            }); 
        }
        else {
            iziToast.show({
                class: 'success-toast',
                icon: 'fa fa-heart',
                title: 'Successfuly added to Wishlist',
                message: '',
                titleColor: '#fff',
                messageColor: '#fff',
                iconColor: "#fff",
                backgroundColor: '#FF7273',
                progressBarColor: '#444F60',
                position: 'bottomRight',
                transitionIn: 'fadeInUp',
                close: false,
                timeout: 2000,
                zindex: 99999,
            });
        }    
    })

    $('.flat-card .actions .add svg').on('click', function(){
        $(this).toggleClass('is-active gelatine');

        if (!$(this).hasClass('is-active')) {
            iziToast.show({
                class: 'success-toast',
                icon: 'fa fa-shopping-cart',
                title: 'Successfuly removed from Cart',
                message: '',
                titleColor: '#fff',
                messageColor: '#fff',
                iconColor: "#fff",
                backgroundColor: '#0023ff',
                progressBarColor: '#444F60',
                position: 'bottomRight',
                transitionIn: 'fadeInUp',
                close: false,
                timeout: 2000,
                zindex: 99999,
            }); 
        }
        else {
            iziToast.show({
                class: 'success-toast',
                icon: 'fa fa-cart-plus',
                title: 'Successfuly added to Cart',
                message: '',
                titleColor: '#fff',
                messageColor: '#fff',
                iconColor: "#fff",
                backgroundColor: '#0023ff',
                progressBarColor: '#444F60',
                position: 'bottomRight',
                transitionIn: 'fadeInUp',
                close: false,
                timeout: 2000,
                zindex: 99999,
            });
        }    
    })

    $('.cart-button').on('click', function(){
        $(this).toggleClass('is-active gelatine');

        iziToast.show({
            class: 'success-toast',
            icon: 'fa fa-cart-plus',
            title: 'Successfuly added to Cart',
            message: '',
            titleColor: '#fff',
            messageColor: '#fff',
            iconColor: "#fff",
            backgroundColor: '#0023ff',
            progressBarColor: '#444F60',
            position: 'bottomRight',
            transitionIn: 'fadeInUp',
            close: false,
            timeout: 2000,
            zindex: 99999,
        }); 
    })

    if ($('.chosen-select-no-single').length) {
        //Chosen
        var config = {
            '.chosen-select': {
                disable_search_threshold: 10,
                width: "100%"
            },
            '.chosen-select-deselect': {
                allow_single_deselect: true,
                width: "100%"
            },
            '.chosen-select-no-single': {
                disable_search_threshold: 100,
                width: "100%"
            },
            '.chosen-select-no-single.no-search': {
                disable_search_threshold: 10,
                width: "100%"
            },
            '.chosen-select-no-results': {
                no_results_text: 'Oops, nothing found!'
            },
            '.chosen-select-width': {
                width: "95%"
            }
        };
        for (var selector in config) {
            if (config.hasOwnProperty(selector)) {
                $(selector).chosen(config[selector]);
            }
        }
    }

    //Chosen select init
    if ($('.chosen-select').length) {
        $(".chosen-select").chosen({
            disable_search_threshold: 6,
            width: '100%'
        });
    }

    //Product panel
    $('.product-action').on('click', function(){
        $('.product-action.is-active').removeClass('is-active');
        $(this).addClass('is-active');
    })

    //show product
    $('#show-product').on('click', function(){
        $('#meta-view, #ratings-view').addClass('is-hidden');
        $('#product-view').removeClass('is-hidden');
    })

    //show meta
    $('#show-meta').on('click', function(){
        $('#product-view, #ratings-view').addClass('is-hidden');
        $('#meta-view').removeClass('is-hidden');
    })

    //show ratings
    $('#show-ratings').on('click', function(){
        $('#meta-view, #product-view').addClass('is-hidden');
        $('#ratings-view').removeClass('is-hidden');
    })

    //Add to wishlist
    $('.sidebar-whishlist').on('click', function(){
        $(this).toggleClass('is-active');
        $('.product-panel .panel-header .likes svg').toggleClass('is-liked gelatine');
    })

    //Modals
    $('.modal-trigger').on('click', function(){
        var modalID = $(this).attr('data-modal');
        $('#' + modalID).toggleClass('is-active').find('.box').addClass('scaleIn');
    });

    $('.modal-delete').on('click', function(){
        $(this).closest('.modal').removeClass('is-active');
    })


    //File inputs
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
                                 {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

        //listen to changes
        input.addEventListener( 'change', function( e )
                               {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });

    var inputField = document.querySelectorAll('.field-input')

    for (var i = 0, len = inputField.length; i < len; i++) {
        customInput(inputField[i])
    }
    //Create custom input
    function customInput (el) {
        const fileInput = el.querySelector('[type="file"]')
        const label = el.querySelector('[data-js-label]')

        fileInput.onchange =
            fileInput.onmouseout = function () {
            if (!fileInput.value) return

            var value = fileInput.value.replace(/^.*[\\\/]/, '')
            el.className += ' -chosen'
            label.innerText = value
        }
    }

    //Pop Dropdowns
    $('.dropdown-trigger').on('click', function(event) {
        event.stopPropagation();
        $('.dropdown').removeClass('is-active');
        $(this).closest('.dropdown').addClass('is-active');
    })
    //Close pop dropdowns on click outside
    $(window).on('click', function(event) {
        //if(!$(event.target).find('.dropdown-menu').length) {
        if($('.dropdown').hasClass('is-active')) {
            $('.dropdown').removeClass('is-active');
        }
        //} 
    });

    //Popovers
    if ($('.has-popover-top').length) {
        $('.has-popover-top').webuiPopover({
            trigger:'hover',
            placement: 'top',
            width: 280,
            animation: 'pop'
        }); 
    }

    if ($('.has-simple-popover').length) {
        $('.has-simple-popover').webuiPopover({
            trigger:'hover',
            animation: 'pop'
        }); 
    }


    //Shipping methods checkout
    $('.shipping-wrapper .mini-card').on('click', function(){
        $('.shipping-wrapper .mini-card').removeClass('is-active');
        $('.active-indicator').removeClass('gelatine')
        $(this).addClass('is-active');
        $(this).find('.active-indicator').addClass('gelatine');
    })

    //Data Payment
    $('.payment-method').on("click", function(){
        var category_id = $(this).attr('data-method');
        $('#payment-header, #payment-methods').addClass('is-hidden');
        $("#" + category_id).removeClass('is-hidden');
    })

    $('.back-to-methods').on("click", function(){
        $('#paypal, #bank-transfer, #cash, #credit-card').addClass('is-hidden');
        $('#payment-header, #payment-methods').removeClass('is-hidden');
    })

    if ($('#credit-card').length) {
        var card = new Card ({ 
            form: '.active form', 
            container: '.card-wrapper' 
        })
        }

    //Navigation Tabs
    $('.tabs li').on('click', function() {
        var tab_id = $(this).attr('data-tab');

        $(this).siblings('li').removeClass('is-active');
        $(this).closest('.tabs-wrapper').children('.navtab-content').removeClass('is-active');

        $(this).addClass('is-active');
        $("#"+tab_id).addClass('is-active');
    })

    //Mobile mode
    if ($('#mobile-mode, #sidebar-mode').length) {

        //mobile mode
        $('#mobile-mode, #sidebar-mode').on('click', function(){
            $('.icon-menu li a.is-active').removeClass('is-active');
            $('.mobile-navbar').toggleClass('is-active');
            $('.shop-wrapper').toggleClass('is-mobile-mode');
            $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').toggleClass('is-pushed-mobile');
            $('.pageloader, .infraloader').toggleClass('is-full');
        })

        if (window.matchMedia('(max-width: 768px)').matches) {
            $('.mobile-navbar').addClass('is-active');
            $('.shop-wrapper').addClass('is-mobile-mode');
            $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
            $('.pageloader, .infraloader').addClass('is-full');
        } else {
            $('.mobile-navbar').removeClass('is-active');
            $('.shop-wrapper').removeClass('is-mobile-mode');
            $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
            $('.pageloader, .infraloader').removeClass('is-full');
        }

        //resize handler
        $(window).on('resize', function(){
            if (window.matchMedia('(max-width: 768px)').matches) {
                $('.mobile-navbar').addClass('is-active');
                $('.shop-wrapper').addClass('is-mobile-mode');
                $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
                $('.pageloader, .infraloader').addClass('is-full');
            } else {
                $('.mobile-navbar').removeClass('is-active');
                $('.shop-wrapper').removeClass('is-mobile-mode');
                $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
                $('.pageloader, .infraloader').removeClass('is-full');
            }
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
        $(window).on('resize', function(){
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

    //Avatar Upload
    if ($('#avatar-upload').length) {

        var readURL = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('.profile-pic').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $(".file-upload").on('change', function(){
            readURL(this);
        });

        $(".upload-button").on('click', function() {
            $(".file-upload").click();
        });

    }

    //loading buttons 
    $('.button.will-upload').on('click', function() {
        $(this).removeClass('will-upload').addClass('is-loading');
        setTimeout(function(){
            $('.button.is-loading').removeClass('is-loading').addClass('will-upload');
            iziToast.show({
                class: 'success-toast',
                icon: 'fa fa-check',
                title: 'Your profile picture has been saved',
                message: '',
                titleColor: '#fff',
                messageColor: '#fff',
                iconColor: "#fff",
                backgroundColor: '#00b289',
                progressBarColor: '#444F60',
                position: 'topRight',
                transitionIn: 'fadeInDown',
                close: false,
                timeout: 2000,
                zindex: 99999,
            }); 
        }, 2000);
    })

    //Address switch
    $('.form-switch .is-switch').on('change', function() {
        $(this).closest('.flat-card').find('.card-body').toggleClass('is-disabled');
    })

    //Data orders list
    $('.list-card ul li').on("click", function(){
        $('.list-card ul li').removeClass('is-active');
        $(this).addClass('is-active');
        var order_id = $(this).attr('data-order');
        $('.order-list-card').addClass('is-hidden');
        $("#" + order_id).removeClass('is-hidden');
    })

})

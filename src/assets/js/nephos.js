$(document).ready(function(){

    "use strict";

    changeDemoImages();

    initPageloader();

    initNavbarBurger();

    initFullscreenSlider();

    initShopSidebar();

    initProductDetailsLinks();

    initOrderDetailsLinks();

    initCartSidebar();

    initGlobalSearch();

    initFilterSidebar();

    initCategoriesSidebar();

    feather.replace();

    initTabs();

    initDropdowns();

    initModals();

    initClosableMessage();

    initChosenSelects();

    initBackgroundImages();

    initFileInputs();

    //Check viewport size
    if (!mobileTrue) {
        initPopovers();
    }

    initCardActions();

    initAnimatedCheckboxes();

    initMobileMode();

    getCart();
})

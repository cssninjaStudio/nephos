"use strict";

var user = {
    isLoggedIn: false,
    firstName: null,
    lastName: null,
    email: null,
    photoUrl: 'assets/img/avatars/altvatar.png'
}

var elie = {
    isLoggedIn: true,
    firstName: 'Elie',
    lastName: 'Daniels',
    email: 'elie@mail.com',
    phone: null,
    photoUrl: 'assets/img/avatars/elie.jpg',
    wishlists: elieWishlists,
    orders: 'assets/data/orders.json',
    addresses: elieAddresses
}

if (JSON.parse(localStorage.getItem('user')) === null) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser(){
    var data = JSON.parse(localStorage.getItem('user'));
    //Populate user areas
    $('#quickview-avatar').attr('src', data.photoUrl);
    $('#quickview-avatar').attr('data-demo-src', data.photoUrl);
    $('#review-modal .box-header img').attr('src', data.photoUrl);
    $('#review-modal .box-header img').attr('data-demo-src', data.photoUrl);
    if (data.firstName !== null){
        $('#quickview-username').html(data.firstName + ' ' + data.lastName);
    } else {
        $('#quickview-username').html('Guest');
    }
    if (!data.isLoggedIn) {
        $('#logout-link').addClass('is-hidden');
        $('#login-link').removeClass('is-hidden');
    } else {
        $('#login-link').addClass('is-hidden');
        $('#logout-link').removeClass('is-hidden');
    }
}

function initAuthenticationForms() {

    //Toggle login and registration wrappers
    $('.auth-toggler input').on('change', function(){
        if ($(this).prop('checked')) {
            $('.login-form-wrapper, .registration-form-wrapper').toggleClass('is-hidden');
            $('.reset-form').addClass('is-hidden');
            $('.login-form').removeClass('is-hidden');
            $('#auth-main-title').html('REGISTER');
        } else {
            $('.login-form-wrapper, .registration-form-wrapper').toggleClass('is-hidden');
            $('.reset-form').addClass('is-hidden');
            $('.login-form').removeClass('is-hidden');
            $('#auth-main-title').html('LOGIN');
        }
    })

    //Toggle login and reset form
    $('.login-form .forgot-link a').on('click', function(){
        $('.login-form, .reset-form').toggleClass('is-hidden');
        $('#auth-main-title').html('FORGOT PASSWORD');
    })

    $('.reset-form .back-link a').on('click', function () {
        $('.login-form, .reset-form').toggleClass('is-hidden');
        $('#auth-main-title').html('LOGIN');
    })
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    console.log("You have entered an invalid email address!")
    return (false)
}

function ValidateLength(value, length) {
    if (value.length === length) {
        return (true)
    }
    console.log("You didn't enter enough characters!")
    return (false)
}

function fakeLogin() {
    //Email validation example
    $('#login-email').on('change', function(){
        var $this = $(this);
        var email = $this.val().trim();
        if (!ValidateEmail(email)) {
            $this.closest('.field').addClass('has-error');
        } else {
            $this.closest('.field').removeClass('has-error');
        }
    })
    //Password Length validation example
    $('#login-password').on('change', function () {
        var $this = $(this);
        var password = $this.val().trim();
        if (!ValidateLength(password, 8)) {
            $this.closest('.field').addClass('has-error');
        } else {
            $this.closest('.field').removeClass('has-error');
        }
    })
    //Login
    $('#login-submit').on('click', function(){
        var $this = $(this);
        var emailValue = $('#login-email').val();
        var passwordValue = $('#login-password').val();
        $this.addClass('is-loading');
        $('.small-auth-loader').addClass('is-active');

        if ((emailValue === 'elie@mail.com') && (passwordValue === 'testpassword')) {
            setTimeout(function () {
                $this.removeClass('is-loading');
                var data = elie;
                localStorage.setItem('user', JSON.stringify(data));
                toasts.service.success('', 'fas fa-check', 'Successfully logged in', 'bottomRight', 2000);
            }, 1200)
            setTimeout(function () {
                window.location.href = '/shop.html';
            }, 3200)
        }

        else {
            setTimeout(function(){
                $this.removeClass('is-loading');
                toasts.service.error('', 'fas fa-meh', 'Couldn\'t find an account matching those credentials', 'bottomRight', 2800)
            }, 800)
        }
    })
}

function fakeLogout() {
    $('#logout-link').on('click', function(){
        $('.small-auth-loader').addClass('is-active');
        localStorage.removeItem('user');
        setTimeout(function () {
            toasts.service.success('', 'fas fa-check', 'Successfully logged out', 'bottomRight', 2000);
        }, 600)
        setTimeout(function () {
            window.location.href = '/home.html';
        }, 2600)
    })
}

//Redirect logged use to shop if tries to view login or registration
$(window).on('load', function(){
    var url = window.location.href;
    var userData = JSON.parse(localStorage.getItem('user'));
    if (url.indexOf("/authentication.html") > -1) {
        //If logged in, redirect
        if (userData.isLoggedIn) {
            window.location.href = '/shop.html';
        }
    } else {
        console.log('something');
    }
})

$(document).ready(function(){

    initAuthenticationForms();

    getUser();

    fakeLogin();

    fakeLogout();
})
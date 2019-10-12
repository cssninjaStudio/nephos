"use strict";

$(document).ready(function () {

    //Avatar Upload
    if ($('#avatar-upload').length) {

        var readURL = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('.profile-pic').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $(".file-upload").on('change', function () {
            readURL(this);
        });

        $(".upload-button").on('click', function () {
            $(".file-upload").click();
        });

    }


    //Address switch
    $('.form-switch .is-switch').on('change', function () {
        $(this).closest('.flat-card').find('.card-body').toggleClass('is-disabled');
    })

})
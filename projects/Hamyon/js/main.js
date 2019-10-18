$(document).ready(function () {
    $(".show-balance").click(function (e) {
        if ($("#balance").attr("type") === "password") {
            $("#balance").attr("type", "text");
            $("#rashod").attr("type", "text");
            $(".show-balance i").removeClass("fa-eye-slash");
            $(".show-balance i").addClass("fa-eye");
            $(".show-balance i").css("color", "#5fcbff");
        } else {
            $("#balance").attr("type", "password");
            $("#rashod").attr("type", "password");
            $(".show-balance i").addClass("fa-eye-slash");
            $(".show-balance i").removeClass("fa-eye");
            $(".show-balance i").css("color", "#d8d9d9");
        }
    });

    $(".show-password").click(function (e) {
        if ($("#user-password").attr("type") === "password") {
            $("#user-password").attr("type", "text");
            $(".show-password i").removeClass("fa-eye-slash");
            $(".show-password i").addClass("fa-eye");
            $(".show-password i").css("color", "#5fcbff");
        } else {
            $("#user-password").attr("type", "password");
            $(".show-password i").addClass("fa-eye-slash");
            $(".show-password i").removeClass("fa-eye");
            $(".show-password i").css("color", "#d8d9d9");
        }
    });

    $("#user-password").keypress(function (e) {
        if ((e.target.value.length + 1) >= 6) {
            $(".modal-footer .btn-success").addClass("btn-active");
        } else {
            $(".modal-footer .btn-success").removeClass("btn-active");
        }
    });

    $(".step-4 .modal-body select").change(function (e) {
        $(e.target).css("color", "#2a4688");
    });

    $(".minus-UzTT").click(function (e) {
        let UzTT_value = $(".UzTT-value").val();
        UzTT_value--;
        $(".UzTT-value").val(UzTT_value);
    });

    $(".plus-UzTT").click(function (e) {
        let UzTT_value = $(".UzTT-value").val();
        UzTT_value++;
        $(".UzTT-value").val(UzTT_value);
    });

    $('.main-banner').slick();

    $('.credit-card-pay-slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    $("#testAnimate").click(function (e) {
        var i = 100;
        var currWidth = 100;
        let timer = setInterval(function () {
            if (i <= 0) {
                clearInterval(timer);
            }
            currWidth--;
            i--;
            $(".modal-body #user-key + hr").css("width", currWidth + "%");
            $(".time-to-unncode").val(i + " сек");
        }, 1000);
    });


    $("#zagl").modal({
        keyboard: false,
        backdrop: "static"
    });
});
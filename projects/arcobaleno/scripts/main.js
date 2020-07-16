$(document).ready(function () {
    $(".anchor").on("click", function (e) {
        e.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr("href").toString()).offset().top
        }, 1000);
    });


    $(".certificates__slider").slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: false,
        prevArrow: "<button type='button' class='slick-prev slick-arrow'><i class='icon icon-angle-left'></i></button>",
        nextArrow: "<button type='button' class='slick-next slick-arrow'><i class='icon icon-angle-right'></i></button>",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 525,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $(".clients__slider").slick({
        arrows: false
    });

    $(".clients__slider .btn-nav.prev").on("click", function (e) {
        $(".clients__slider").slick('slickPrev');
    });

    $(".clients__slider .btn-nav.next").on("click", function (e) {
        $(".clients__slider").slick('slickNext');
    });

    $(".quiz-slider").slick({
        arrows: false
    });

    $(".quiz-slider .prev").on("click", function (e) {
        $(".quiz-slider").slick('slickPrev');
    });

    $(".quiz-slider .next").on("click", function (e) {
        $(".quiz-slider").slick('slickNext');
    });

    $(".quiz-slider .popup").on("click", function (e) {
        $(".quiz-popup").toggleClass("show");
    });

    $(".quiz-popup .popup-close").on("click", function (e) {
        $(".quiz-popup").toggleClass("show");
    });

    $(".menu-btn").on("click", function (e) {
        $(".header__wrapper .nav").slideToggle();
    });
});

$(document).ready(function () {
    $(".nav__menu-toggler").on("click", function(event) {
        $(".nav__menu").toggleClass("show");
        setTimeout(() => {
            $(".nav__menu-toggler").toggleClass("show");
        }, 300);
    });

    $('.section-ourService__wrapper').slick({
        dots: false,
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $(".nav__menu .menu__link").click(function(event) {
        if ($(".nav__menu").hasClass("show")) {
            $(".nav__menu").toggleClass("show");
            $(".nav__menu-toggler").toggleClass("show");
        }
        $([document.documentElement, document.body]).animate({
            scrollTop: $(event.target.getAttribute("href")).offset().top + Number.parseInt($(event.target.getAttribute("href")).css("padding-top").toString().replace(/[^0-9]/g,''))
        }, 1000);
    });
});

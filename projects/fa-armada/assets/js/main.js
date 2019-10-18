$(document).ready(function () {
    $(".new-cars-slider").slick({
        dots: false,
        arrow: true,
        infinite: true,
        prevArrow: '<button class="slider-arrow sl-prev"><i class="fal fa-angle-left"></i></button>',
        nextArrow: '<button class="slider-arrow sl-next"><i class="fal fa-angle-right"></i></button>',
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $(".stock-cars-slider").slick({
        dots: false,
        arrow: true,
        infinite: true,
        prevArrow: '<button class="slider-arrow sl-prev"><i class="fal fa-angle-left"></i></button>',
        nextArrow: '<button class="slider-arrow sl-next"><i class="fal fa-angle-right"></i></button>',
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $(".stock-today .sl-prev").click(function () {
        $(".stock-cars-slider").slick('slickPrev');
    });
    $(".stock-today .sl-next").click(function () {
        $(".stock-cars-slider").slick('slickNext');
    });
});
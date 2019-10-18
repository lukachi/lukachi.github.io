$(document).ready(function () {
    $(".complect-slider").slick({
        nextArrow: '<button type="button" class="arrow-btn arrow-next">&#8594;</button>',
        prevArrow: '<button type="button" class="arrow-btn arrow-prev">&#8592;</button>',
        dots: true
    });
    $(".compl-prod-slider").slick({
        nextArrow: '<button type="button" class="arrow-btn arrow-next">&#8594;</button>',
        prevArrow: '<button type="button" class="arrow-btn arrow-prev">&#8592;</button>',
        slidesToShow: 4,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
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
        ]
    });
    $(".rev-vid-slider").slick({
        nextArrow: '<button type="button" class="arrow-btn arrow-next">&#8594;</button>',
        prevArrow: '<button type="button" class="arrow-btn arrow-prev">&#8592;</button>',
        dots: true
    });
});
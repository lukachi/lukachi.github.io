$(document).ready(function () {
    // Инициализация анимаций для плагина AOS
    AOS.init();

    $(window).on("load", function () {
        AOS.refresh();
    });

    // ресайз элементов при деформации окна
    $(window).on("resize", function (e) {
        if ($(".reviews-slider").length) {
            $(".reviews-slider").slick('resize');
        }
        if ($(".facts-about-slider").length) {
            $(".facts-about-slider").slick('resize');
        }
        $(".second-text__scroller").attr("max", ($(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight()));
    });

    // Скроллер для сео блока
    setTimeout(function () {
        $(".second-text__scroller").attr("max", ($(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight()));
    }, 500);
    $(".second-text__scroller").on("propertychange input", function (e) {
        $(".second-text .content").scrollTop(e.target.value);
    });
    $(".second-text .content").on("scroll", function (e) {
        $(".second-text__scroller").attr("value", $(this).scrollTop());
    });
    $(".go-top__btn").on("click", function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("header.header").offset().top
        }, 1000);
    });

    // центр элемента
    let goAllPortfolioBtn_element_center_original = {
        x: $(".go-all-portfolio").offset().left + ($(".go-all-portfolio").width() / 2),
        y: $(".go-all-portfolio").offset().top + ($(".go-all-portfolio").height() / 2)
    };
    $(window).on("scroll", function (e) {

        //ссылка на все портфолио
        portfolioSlidering(goAllPortfolioBtn_element_center_original);
    });

    // header-menu
    $(".header-menu__label").on("click", function (e) {
        $(".header-menu__wrapper").toggleClass("show");
        $(".header-menu__wrapper .header-menu__burger.close").toggleClass("show");
        $(".main-content__article").toggleClass("cropped");
    });

    // sliders
    $(".reviews-slider").slick({
        arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1
    });
    $(".facts-about-slider").slick({
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    $(".reviews__wrapper .arrow-prev").on("click", function (e) {
        $(".reviews-slider").slick('prev');
    });
    $(".reviews__wrapper .arrow-next").on("click", function (e) {
        $(".reviews-slider").slick('next');
    });
    $(".facts-about__wrapper .arrow-prev").on("click", function (e) {
        $(".facts-about-slider").slick('prev');
    });
    $(".facts-about__wrapper .arrow-next").on("click", function (e) {
        $(".facts-about-slider").slick('next');
    });

    // parallax effect on elements
    $(window).on("mousemove", function (e) {
        if ($(".parallaxing").length) {
            const parallaxing_elements = $(".parallaxing");
            const mousePos = {
                x: e.pageX,
                y: e.pageY
            };
            parallaxing_elements.each(function (index) {
                let parallax_radius = parseInt($(this).attr("data-radius"));
                let element_center = {
                    x: $(this).offset().left + ($(this).width() / 2),
                    y: $(this).offset().top + ($(this).height() / 2)
                };
                const different = {
                    x: mousePos.x - element_center.x,
                    y: mousePos.y - element_center.y
                };
                let move = {
                    x: ((-1 * different.x) / parallax_radius) / 3,
                    y: ((-1 * different.y) / parallax_radius) / 3
                };
                gsap.to($(this), 1, {
                    x: move.x,
                    y: move.y
                });
            });
        }
    });

    //Scramble text
    ScramblingElement($(".first-screen .scramble-element"));

    //SplittedTextShow
    fadeRightTextLetterByLetter($(".splittext_show"));

    //Tilting Portfolio
    $('.portfolio-item__img-wrapper').tilt({
        glare: true,
        maxGlare: .25,
        maxTilt: 2,
        scale: 1.05
    });

});

function ScramblingElement(DOMElement) {
    setTimeout(function () {
        const jumbler = scramble(DOMElement[0]);
        jumbler.run();
        const words = DOMElement.attr("data-textInsteads").split(",");
        let wordsScrumbletCounter = 0;
        setInterval(function () {
            if (jumbler.finished()) {
                $(".first-screen .scramble-element").text(words[wordsScrumbletCounter]);
                wordsScrumbletCounter = (wordsScrumbletCounter === words.length - 1) ? 0 : ++wordsScrumbletCounter;
                scramble(DOMElement[0]).run();
            }
        }, 9000);
    }, 0);
}

function fadeRightTextLetterByLetter(DOMElement) {

}

function portfolioSlidering(goAllPortfolioBtn_element_center_original) {
    // отсчёт от начала окна + центр экрана
    let centerScreen = $([document.documentElement, document.body]).scrollTop() + ($(window).height() / 2);

    // конец секции с портфолио
    let wrapper_endpoints_Y = $(".portfolio__wrapper").offset().top + $(".portfolio__wrapper").height();

    if (centerScreen >= goAllPortfolioBtn_element_center_original.y &&
        centerScreen <= wrapper_endpoints_Y - ($(".portfolio__wrapper .portfolio-item").height() / 2)) {
        if (!$(".go-all-portfolio").hasClass("fixing")) {
            $(".go-all-portfolio").addClass("fixing");
        }
    } else {
        if (centerScreen <= goAllPortfolioBtn_element_center_original.y) {
            //over
            if ($(".go-all-portfolio").hasClass("fixing")) {
                $(".go-all-portfolio").removeClass("fixing");
            }
            if ($(".go-all-portfolio-wrapper").hasClass("end")) {
                $(".go-all-portfolio-wrapper").removeClass("end");
            }
        } else if (centerScreen >= wrapper_endpoints_Y - ($(".portfolio__wrapper .portfolio-item").height() / 2)) {
            //under
            if ($(".go-all-portfolio").hasClass("fixing")) {
                $(".go-all-portfolio").removeClass("fixing");
            }
            if (!$(".go-all-portfolio_wrapper").hasClass("end")) {
                $(".go-all-portfolio-wrapper").addClass("end");
            }
        }
    }
}

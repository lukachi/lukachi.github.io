$(document).ready(function () {
    $(window).on("resize", function (e) {
        if ($(".reviews-slider").length) {
            $(".reviews-slider").slick('resize');
        }
        if ($(".facts-about-slider").length) {
            $(".facts-about-slider").slick('resize');
        }
    });
    $(".second-text__scroller").attr("min", "0");
    $(".second-text__scroller").attr("max", $(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight());
    $(".second-text__scroller").attr("value", "0");
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
    // $(window).on("scroll", function (e) {
    //
    // });


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
});

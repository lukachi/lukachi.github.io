$(document).ready(function () {
    header_collapse_wrapper_count();
    $(window).on("resize", function (e) {
        header_collapse_wrapper_count();
        $(".reviews-slider").slick('resize');
        $(".facts-about-slider").slick('resize');
    });
    $(".header-menu__toggler").on("click", function (e) {
        $(this).parent().find(".header-menu__wrapper").toggleClass("show");
        $(this).parent().find(".header-menu__languages").toggleClass("show");
        $(this).parent().find(".header-menu__phone").toggleClass("show");
        $(".main-content__article").toggleClass("cropped");
    });
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
});

function header_collapse_wrapper_count() {
    $(".header-menu__wrapper").css("top", "calc(" + $(".header").css("height") + " - 1px)");
    $(".header-menu__wrapper").css("height", "calc(100vh - " + $(".header").css("height") + " + 2px)");
}

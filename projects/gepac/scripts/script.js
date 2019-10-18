$(document).ready(function (e) {
    $(".nav-toggle").on("click", function (e) {
        e.preventDefault();
        $("header nav").addClass("show");
        $(".back-shape").addClass("show");
        $("body").addClass("show");
    });

    $(".back-shape").on("click", function (e) {
        e.preventDefault();
        $("header nav").removeClass("show");
        $(".back-shape").removeClass("show");
        $("body").removeClass("show");
    });

    $(".sertificates .sertificate-slider").slick({
        draggable: false,
        slidesToShow: 1,
        arrows: false,
        dots: true,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {

                }
            },
            {
                breakpoint: 480,
                settings: {

                }
            }
        ]
    });

    $(".sertificates .sertificate-slider").on("beforeChange", function (e, slick, currentSlide, nextSlide) {
        $('.sertificate-slider-photo').slick('slickGoTo', nextSlide);

        var current = $(slick.$slides[nextSlide]);
        var next = current.next(),
            prev = current.prev();
        prev.prev();
        prev.next();
        slick.$prev = prev;
        slick.$next = next;
    });

    $('.sertificate-slider-photo').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: '32%',
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {

                }
            }
        ]
    });

    $(".sertificate-slider-photo").magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{
            enabled: true
        }
    });

    $("section.viewers .viewers-slider").slick({
        infinite: true,
        draggable: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 625,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    });

    $(".viewer-prev").on("click", function (e) {
        $("section.viewers .viewers-slider").slick("prev");
    });

    $(".viewer-next").on("click", function (e) {
        $("section.viewers .viewers-slider").slick("next");
    });

    $("section.preparate-video .video-container .play-button-area button").on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass("hide");
        $("section.preparate-video .video-container iframe").toggleClass("show");
    });

    $(window).on('scroll', function (e) {
        if ($(window).scrollTop() >= 500) {
            $('header .fixing-nav').css('top', '0');
        } else {
            $('header .fixing-nav').css('top', '-500%');
        }
    });

    $(".navbar-nav a").on('click', function (e) {
        e.preventDefault();
        $(".back-shape").trigger('click');
        if ($(e.target).attr("href") == "#how-order") {
            $('html, body').animate({
                scrollTop: $($(e.target).attr("href")).offset().top - 75
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: $($(e.target).attr("href")).offset().top
            }, 1000);
        }
    });

    setTimeout(function () {
        $(".findS + div").css("display", "none");
        console.log("Deleted");
    }, 5000);
});
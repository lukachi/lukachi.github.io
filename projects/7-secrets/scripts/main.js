function is_touch_device() {

    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    var mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

$(document).ready(function () {
    const ISTOUCH = is_touch_device();
    if (!ISTOUCH) {
        $(".reviews__item .item-container").tilt({
            maxTilt: 5,
            scale: 1.05
        });
        $(".gifts__item").tilt({
            maxTilt: 1.5,
            scale: 1.05,
            axis: 'x'
        });
        $(".nuances-wrapper .img-wrapper img").tilt({
            maxTilt: 3,
            scale: 1.05,
        });
    } else {
        if ($(window).width() <= 768) {
            $(".reviews__wrapper").slick({
                infinite: true,
                slidesPerRow: 1,
                rows: 3,
                prevArrow: "<button type=\"button\" class=\"slick-prev\"><</button>",
                nextArrow: "<button type=\"button\" class=\"slick-next\">></button>"
            });
        }
    }

    $(window).on("orientationchange", function () {
        $(".reviews__wrapper").slick("resize");
    });

    $(window).on("resize", function () {
        $(".reviews__wrapper").slick("resize");
    });

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        // startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        // initClassName: 'aos-init', // class applied after initialization
        // animatedClassName: 'aos-animate', // class applied on animation
        // useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        // disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        // debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        // throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 50, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        // mirror: false, // whether elements should animate out while scrolling past them

    });

});

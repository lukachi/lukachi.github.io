$(document).ready(function () {
    $(".plan__wrapper").slick({
        dots: true,
        arrows: false
    });

    $(".plan__nav .arrow-left").on("click", function (e) {
        $(".plan__wrapper").slick("slickPrev");
    })

    $(".plan__nav .arrow-right").on("click", function (e) {
        $(".plan__wrapper").slick("slickNext");
    })

    $(".plan__item .toggle").on("click", function (e) {
        $(this).parent().toggleClass("show");
        $(".plan__wrapper .slick-dots").toggleClass("hide");
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

    $(".faq__header").on("click", function (e) {
        $(this).next().slideToggle();
        $(this).parent().toggleClass("show");
    });
});

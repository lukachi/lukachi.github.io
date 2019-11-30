$(document).ready(function (event) {
    $(".list-wrapper__title").on("click", function (e) {
        $("." + $(this).parent().parent().parent().attr("class") + "  .list-wrapper__list").toggleClass("show");
    });
    $(".header__menu-toggler").on("click", function (e) {
        $(".header__menu").toggleClass("show");
    });

    let myTabs = document.querySelectorAll(".eventParty__wrapper ul.nav-tabs > li");
    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("active");
        }
        let clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("active");
        tabClickEvent.preventDefault();
        let myContentPanes = document.querySelectorAll(".tab-pane");
        for (i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("active");
        }
        let anchorReference = tabClickEvent.target;
        let activePaneId = anchorReference.getAttribute("href");
        let activePane = document.querySelector(activePaneId);
        activePane.classList.add("active");
    }
    for (i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks)
    }

    $(".album-gallery").magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        // other options
        gallery: {
            enabled: true
        }
    });

    $(".testimonial-slider").slick({
        dots: false,
        infinite: true,
        speed: 300,
        draggable: false,
        arrows: false
    });

    $(".control-prev").on("click", function (e) {
        $(".testimonial-slider").slick("slickPrev");
    });

    $(".control-next").on("click", function (e) {
        $(".testimonial-slider").slick("slickNext");
    });

    $(".slider-team").slick({
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $(window).on("mousewheel", function(e){
        const header = $('.header-fixed'),
            scroll = $(window).scrollTop();
        if (e.originalEvent.wheelDelta >= 0) {
            if (scroll >= 700) {
                header.addClass('show');
            } else {
                header.removeClass('show');
            }
        }
        else {
            header.removeClass('show');
        }
    });
});

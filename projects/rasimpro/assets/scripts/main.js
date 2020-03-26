class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({from, to, start, end});
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {from, to, start, end, char} = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

function ScramblingElement(DOMElement) {
    const phrases = [
        ...DOMElement.attr("data-textInsteads").split(",")
    ];

    const el = DOMElement[0];
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 5000);
        });
        counter = (counter + 1) % phrases.length
    };

    next();
}

function fadeRightTextLetterByLetter(DOMElement, duration) {
    var textWrapper = DOMElement;
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
        .add({
            targets: textWrapper,
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: duration,
            delay: (el, i) => 25 * (i + 1)
        });
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

function toggleMenu() {

    const menu_wrapper = $(".header-menu__wrapper");
    menu_wrapper.css({
        "height": window.innerHeight
    });

    //set NRJ phrase
    let img_expressions = $(".header-menu__img-wrapper").attr("data-menu-expression").split(",");
    if ($(window).width() <= 525) {
        $(".header-menu__img-wrapper").text(img_expressions[2]);
    } else if ($(window).width() > 525 && $(window).width() <= 768) {
        $(".header-menu__img-wrapper").text(img_expressions[1]);
    } else {
        $(".header-menu__img-wrapper").text(img_expressions[0]);
    }

    if (menu_wrapper.hasClass("show")) {
        TweenLite.to(menu_wrapper, .15, {
            left: "500%",
            ease: Linear.easeInOut
        });
    } else {
        TweenLite.set(menu_wrapper, {
            left: "0%",
            ease: Linear.easeInOut
        });
        TweenLite.from(menu_wrapper, .15, {
            left: "500%",
            ease: Linear.easeInOut
        });
    }

    menu_wrapper.toggleClass("show");
}

$(document).ready(function () {
    window.onload = function () {
        new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 0);
        }).then(res => {
            // header-menu
            $(".header-menu__label").on("click", function (e) {
                toggleMenu();
            });

            // footer-menu
            $(".footer-menu__label").on("click", function (e) {
                toggleMenu();
            });

            // ресайз элементов при деформации окна
            $(window).on("resize", function (e) {
                $(".header-menu__wrapper").css({
                    "height": window.innerHeight
                });
                if ($(".reviews-slider").length) {
                    $(".reviews-slider").slick('resize');
                }
                if ($(".facts-about-slider").length) {
                    $(".facts-about-slider").slick('resize');
                }
                if ($(".recent-posts__wrapper").length) {
                    $(".recent-posts__wrapper").slick('resize');
                }
                if ($(".second-text__scroller").length) {
                    $(".second-text__scroller").attr("max", ($(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight()));
                }
                if ($(".overview").length) {
                    $(".overview").css({
                        "padding-top": ($(".first-section__description").outerHeight() / 2) - 3
                    });
                }
                if ($(".experience-item__img-wrapper").length) {
                    $(".experience-item__img-wrapper").slick("resize");
                }
                //filters on blog archive & categories page
                if ($(".blog-filters").length) {
                    if ($(window).width() <= 525) {
                        const item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin"));
                        const container_width = Array.from($(".filter-wrapper__container .filter-item")).map(el => el.clientWidth + (item_margin * 3)).reduce((accumulator, currentValue) => accumulator + currentValue) / 3;

                        $(".filter-wrapper__container").css({
                            width: container_width
                        });
                    }
                }
                //filters on portfolio archive page
                if ($(".portfolio-filter").length) {
                    if ($(window).width() <= 525) {
                        const item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin-right"));
                        const container_width = Array.from($(".filter-wrapper__container .filter-item")).map(el => el.clientWidth + (item_margin * 3)).reduce((accumulator, currentValue) => accumulator + currentValue);

                        $(".filter-wrapper__container").css({
                            width: container_width
                        });
                    }
                }
                if ($(".services-list").length && $(".welcome-screen-services-archive").length) {
                    $(".services-list").css({
                        "padding-top": ($(".welcome-screen-services-archive .first-section__description").outerHeight() / 2)
                    });
                }
            });

            // ресайз элементов при деформации окна
            $(window).on("orientationchange", function (e) {
                $(".header-menu__wrapper").css({
                    "height": window.innerHeight
                });
                if ($(".reviews-slider").length) {
                    $(".reviews-slider").slick('resize');
                }
                if ($(".facts-about-slider").length) {
                    $(".facts-about-slider").slick('resize');
                }
                if ($(".recent-posts__wrapper").length) {
                    $(".recent-posts__wrapper").slick('resize');
                }
                if ($(".second-text__scroller").length) {
                    $(".second-text__scroller").attr("max", ($(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight()));
                }
                if ($(".overview").length) {
                    $(".overview").css({
                        "padding-top": ($(".first-section__description").outerHeight() / 2) - 3
                    })
                }
                if ($(".experience-item__img-wrapper").length) {
                    $(".experience-item__img-wrapper").slick("resize");
                }
                //filters on blog archive & categories page
                if ($(".blog-filters").length) {
                    if ($(window).width() <= 525) {
                        const item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin"));
                        const container_width = Array.from($(".filter-wrapper__container .filter-item")).map(el => el.clientWidth + (item_margin * 3)).reduce((accumulator, currentValue) => accumulator + currentValue) / 3;

                        $(".filter-wrapper__container").css({
                            width: container_width
                        });
                    }
                }
                //filters on portfolio archive page
                if ($(".portfolio-filter").length) {
                    if ($(window).width() <= 525) {
                        const item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin-right"));
                        const container_width = Array.from($(".filter-wrapper__container .filter-item")).map(el => el.clientWidth + (item_margin * 3)).reduce((accumulator, currentValue) => accumulator + currentValue);

                        $(".filter-wrapper__container").css({
                            width: container_width
                        });
                    }
                }
                if ($(".services-list").length && $(".welcome-screen-services-archive").length) {
                    $(".services-list").css({
                        "padding-top": ($(".welcome-screen-services-archive .first-section__description").outerHeight() / 2)
                    });
                }
            });

            // центр элемента
            let goAllPortfolioBtn_element_center_original = ($(".go-all-portfolio").length) ? {
                x: $(".go-all-portfolio").offset().left + ($(".go-all-portfolio").width() / 2),
                y: $(".go-all-portfolio").offset().top + ($(".go-all-portfolio").height() / 2)
            } : undefined;
            $(window).on("scroll", function (e) {

                // движ ссылки на архив - портфолио
                if (goAllPortfolioBtn_element_center_original) {
                    portfolioSlidering(goAllPortfolioBtn_element_center_original);
                }

                if ($(".header-menu__wrapper").hasClass("show")) {
                    $(window).scrollTop(0);

                    const menu_wrapper = $(".header-menu__wrapper");
                    menu_wrapper.css({
                        "height": window.innerHeight
                    });
                }
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

            // Скроллер для сео блока
            if ($(".second-text__scroller").length) {
                setTimeout(function () {
                    $(".second-text__scroller").attr("max", ($(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight()));
                }, 500);
                const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
                if (isTouch) {
                    $(".second-text__scroller")[0].disabled = true;
                }
            }
            if ($(".second-text__scroller").length) {
                $(".second-text__scroller").on("propertychange input", function (e) {
                    $(".second-text .content").scrollTop(e.target.value);
                });
            }
            if ($(".second-text .content").length) {
                $(".second-text .content").on("scroll", function (e) {
                    $(".second-text__scroller")[0].value = $(this).scrollTop();
                });
            }
            if ($(".go-top__btn").length) {
                $(".go-top__btn").on("click", function (e) {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("header.header").offset().top
                    }, 1000);
                });
            }

            // sliders
            if ($(".reviews-slider").length) {
                $(".reviews-slider").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 525,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                    ]
                });
                if ($(".reviews__wrapper .arrow-prev").length) {
                    $(".reviews__wrapper .arrow-prev").on("click", function (e) {
                        $(".reviews-slider").slick('prev');
                    });
                }
                if ($(".reviews__wrapper .arrow-next").length) {
                    $(".reviews__wrapper .arrow-next").on("click", function (e) {
                        $(".reviews-slider").slick('next');
                    });
                }
            }
            if ($(".facts-about-slider").length) {
                $(".facts-about-slider").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 525,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                    ]
                });
                if ($(".facts-about__wrapper .arrow-prev").length) {
                    $(".facts-about__wrapper .arrow-prev").on("click", function (e) {
                        $(".facts-about-slider").slick('prev');
                    });
                }
                if ($(".facts-about__wrapper .arrow-next").length) {
                    $(".facts-about__wrapper .arrow-next").on("click", function (e) {
                        $(".facts-about-slider").slick('next');
                    });
                }
            }
            if ($(".recent-posts__wrapper").length) {
                if ($(".other-publications .recent-posts__wrapper").length) {
                    $(".recent-posts__wrapper").slick({
                        arrows: true,
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        prevArrow: "<button type=\"button\" class=\"slider-arrow arrow-prev\">\n" +
            "                            <span class=\"icon-wrapper\">\n" +
            "                                <i class=\"icon icon-arrow\"></i>\n" +
            "                            </span>\n" +
            "                        </button>",
                        nextArrow: "<button type=\"button\" class=\"slider-arrow arrow-next\">\n" +
            "                            <span class=\"icon-wrapper\">\n" +
            "                                <i class=\"icon icon-arrow\"></i>\n" +
            "                            </span>\n" +
            "                        </button>",
                        responsive: [
                            {
                                breakpoint: 525,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                }
                            },
                        ]
                    });
                } else {
                    $(".recent-posts__wrapper").slick({
                        arrows: false,
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        responsive: [
                            {
                                breakpoint: 525,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                }
                            },
                        ]
                    });
                }
                if ($(".recent-posts .arrow-prev").length) {
                    $(".recent-posts .arrow-prev").on("click", function (e) {
                        $(".recent-posts__wrapper").slick('prev');
                    });
                }
                if ($(".recent-posts .arrow-next").length) {
                    $(".recent-posts .arrow-next").on("click", function (e) {
                        $(".recent-posts__wrapper").slick('next');
                    });
                }
                if ($(".other-publications .arrow-prev").length) {
                    $(".other-publications .arrow-prev").on("click", function (e) {
                        $(".recent-posts__wrapper").slick('prev');
                    });
                }
                if ($(".other-publications .arrow-next").length) {
                    $(".other-publications .arrow-next").on("click", function (e) {
                        $(".recent-posts__wrapper").slick('next');
                    });
                }
                if ($(".more-articles-posts .arrow-prev").length) {
                    $(".more-articles-posts .arrow-prev").on("click", function (e) {
                        $(".recent-posts__wrapper").slick('prev');
                    });
                }
                if ($(".more-articles-posts .arrow-next").length) {
                    $(".more-articles-posts .arrow-next").on("click", function (e) {
                        $(".recent-posts__wrapper").slick('next');
                    });
                }
            }
            if ($(".RN-gallery").length) {
                $(".RN-gallery").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 525,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                    ]
                });
                $(".RN-gallery").magnificPopup({
                    delegate: 'a', // child items selector, by clicking on it popup will open
                    type: 'image',
                    gallery: {
                        enabled: true,
                        tCounter: ''
                    }
                    // other options
                });
                if ($(".RN-gallery__slider-wrapper .arrow-prev").length) {
                    $(".RN-gallery__slider-wrapper .arrow-prev").on("click", function (e) {
                        $(".RN-gallery").slick('prev');
                    });
                }
                if ($(".RN-gallery__slider-wrapper .arrow-next").length) {
                    $(".RN-gallery__slider-wrapper .arrow-next").on("click", function (e) {
                        $(".RN-gallery").slick('next');
                    });
                }
            }
            if ($(".volunteer-gallery").length) {
                $(".volunteer-gallery").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 525,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                    ]
                });
                $(".volunteer-gallery").magnificPopup({
                    delegate: 'a', // child items selector, by clicking on it popup will open
                    type: 'image',
                    gallery: {
                        enabled: true,
                        tCounter: ''
                    }
                    // other options
                });
                if ($(".volunteer-gallery__slider-wrapper .arrow-prev").length) {
                    $(".volunteer-gallery__slider-wrapper .arrow-prev").on("click", function (e) {
                        $(".volunteer-gallery").slick('prev');
                    });
                }
                if ($(".volunteer-gallery__slider-wrapper .arrow-next").length) {
                    $(".volunteer-gallery__slider-wrapper .arrow-next").on("click", function (e) {
                        $(".volunteer-gallery").slick('next');
                    });
                }
            }
            if ($(".experience-item__img-wrapper").length) {
                $(".experience-item__img-wrapper").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 525,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: true
                            }
                        },
                    ]
                });
                $(".experience-item__img-wrapper").magnificPopup({
                    delegate: 'a', // child items selector, by clicking on it popup will open
                    type: 'image',
                    gallery: {
                        enabled: true,
                        tCounter: ''
                    }
                    // other options
                });
            }

            if ($(".first-screen .scramble-element").length) {
                //Scramble text
                setTimeout(function () {
                    ScramblingElement($(".first-screen .scramble-element"))
                }, 1500);
            }

            if ($('.portfolio-item__img-wrapper').length) {
                //Tilting Portfolio
                $('.portfolio-item__img-wrapper').tilt({
                    glare: true,
                    maxGlare: .25,
                    maxTilt: 2,
                    scale: 1.05
                });
            }

            //section-about
            if ($(".overview").length) {
                $(".overview").css({
                    "padding-top": ($(".first-section__description").outerHeight() / 2) - 3
                })
            }
            if ($("section.experience").length) {
                if ($("section.experience .experience__item").length) {
                    $("section.experience .experience__item").each(function (index) {
                        let steps_container = $(this).find($(".experience-item__step"));
                        if (steps_container.length >= 2) {
                            steps_container.each(function (i) {
                                $(this).find($(".experience-item__block-title .title")).toggleClass("connected");
                            });
                            $(this).find($(".experience-item__step:not(:last-child)")).each(function (i) {
                                $(this).toggleClass("connected");
                            });
                        }
                        // $(this).find($(".experience-item__step.connected:not(:last-child)")).each(function (i) {
                        //     let title = $(this).find($(".experience-item__block-title .title"));
                        //     let title_begin = {
                        //         x: title.offset().left + title.width() / 2,
                        //         y: title.offset().top + title.height() / 2
                        //     };
                        // });
                    });
                }
            }

            //section-about -- recommendations
            if ($(".recommendations").length) {
                const max_container_height = 5 * parseFloat($(".recommendations .recommendations__item").find(".recommendations__body .text p").css("line-height"));

                $(".recommendations .recommendations__item").each(function (i) {
                    $(this).find(".recommendations__body .text").css({
                        height: max_container_height
                    });
                    $(this).find(".recommendations__body .btn-show")[0].disabled = $(this).find(".recommendations__body .text p").outerHeight() <= max_container_height;
                });

                $(".recommendations__item .btn-show").on("click", function (e) {
                    const textElem = $(this).prev();
                    if (textElem.hasClass("show")) {
                        TweenLite.to(textElem, .25, {
                            height: max_container_height
                        });
                    } else {
                        TweenLite.set(textElem, {
                            height: "auto"
                        });
                        TweenLite.from(textElem, .25, {
                            height: max_container_height
                        });
                    }
                    textElem.toggleClass("show");
                });
            }

            //section-about -- rank & awards
            if ($(".ranks-awards").length) {
                const max_container_height = 5 * parseFloat($(".ranks-awards__item").find(".text p").css("line-height"));

                $(".ranks-awards__item").each(function (i) {
                    $(this).find(".text").css({
                        height: max_container_height
                    });

                    $(this).find(".btn__show-more")[0].disabled = $(this).find(".text p").outerHeight() < max_container_height;
                });

                $(".ranks-awards__body .btn__show-more").on("click", function (e) {
                    const textElem = $(this).prev();
                    if (textElem.hasClass("show")) {
                        TweenLite.to(textElem, .25, {
                            height: max_container_height
                        });
                    } else {
                        TweenLite.set(textElem, {
                            height: "auto"
                        });
                        TweenLite.from(textElem, .25, {
                            height: max_container_height
                        });
                    }
                    textElem.toggleClass("show");
                });
            }

            //filters on blog archive & categories page
            if ($(".blog-filters").length) {
                if ($(window).width() <= 525) {
                    const item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin"));
                    const container_width = Array.from($(".filter-wrapper__container .filter-item")).map(el => el.clientWidth + (item_margin * 3)).reduce((accumulator, currentValue) => accumulator + currentValue) / 2.5;

                    $(".filter-wrapper__container").css({
                        width: container_width
                    });
                }
            }

            //filters on portfolio archive page
            let checked_portfolio_cat = ($(".portfolio-filter").length) ? $('input[name="portfolio_category"]:checked').val() : undefined;
            if ($(".portfolio-filter").length) {
                $("section.portfolio").css({
                    "padding-top": $(".portfolio-filter").outerHeight()
                });
                $('input[name="portfolio_category"]').on("click", function(e) {
                    if ($(this).val().toString().includes(checked_portfolio_cat)) {
                        $(".filter-item:first-child").find('input[name="portfolio_category"]')[0].checked = true;
                    } else {
                        checked_portfolio_cat = $(this).val();
                    }
                });
                if ($(window).width() <= 525) {
                    const item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin-right"));
                    const container_width = Array.from($(".filter-wrapper__container .filter-item")).map(el => el.clientWidth + (item_margin * 3)).reduce((accumulator, currentValue) => accumulator + currentValue);

                    $(".filter-wrapper__container").css({
                        width: container_width
                    });
                }
            }

            //services archive page marquee
            if ($(".item-marquee").length) {
                $(".marquee-mover").slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 0,
                    speed: 6000,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    cssEase: "linear",
                    variableWidth: true,
                    draggable: false,
                    arrows: false,
                    dots: false,
                    swipeToSlide: false,
                    swipe: false,
                    touchMove: false,
                });
            }

            if ($(".services-list").length && $(".welcome-screen-services-archive").length) {
                $(".services-list").css({
                    "padding-top": ($(".welcome-screen-services-archive .first-section__description").outerHeight() / 2)
                });
            }

            if ($(".contact-form__section").length) {
                $(".contact-form__section").css({
                    "padding-top": ($(".welcome-screen-contacts .first-section__description").outerHeight() / 2) + 75
                });
            }

            if ($(".consultation-form").length) {
                $(".consultation-popup").on("click", function (e) {
                    $(".consultation-form").toggleClass("show");
                    $(".consultation-form .consultation-form__wrapper").toggleClass("show");
                });
                $(".consultation-form .btn-close").on("click", function (e) {
                    $(".consultation-form").toggleClass("show");
                    $(".consultation-form .consultation-form__wrapper").toggleClass("show");
                });
            }


            // waypont a titles | SplittedTextShow
            // const waypoint = $(".first-screen .splittext_show").waypoint({
            //     handler: function (direction) {
            //         console.log(this.element.classList.toString().includes("first-screen"));
            //         fadeRightTextLetterByLetter(this.element, 1500);
            //     },
            //     offset: "90%"
            // });

            //waypont a titles | SplittedTextShow
            // const waypointElseTitles = $(".splittext_show").waypoint({
            //     handler: function (direction) {
            //         console.log(this);
            //         fadeRightTextLetterByLetter(this.element, 800);
            //     },
            //     offset: "90%"
            // });
        }).then(res => {
            $(".preloader").css({
                "top": "-5000%",
                "bottom": "auto",
                "opacity": "0"
            });

            // Инициализация анимаций для плагина AOS
            AOS.init();
        });
    };
});

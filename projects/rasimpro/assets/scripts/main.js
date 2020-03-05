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

    // центр элемента
    let goAllPortfolioBtn_element_center_original = {
        x: $(".go-all-portfolio").offset().left + ($(".go-all-portfolio").width() / 2),
        y: $(".go-all-portfolio").offset().top + ($(".go-all-portfolio").height() / 2)
    };
    $(window).on("scroll", function (e) {

        // движ ссылки на архив - портфолио
        portfolioSlidering(goAllPortfolioBtn_element_center_original);


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

    //Scramble text
    setTimeout(function () {
        ScramblingElement($(".first-screen .scramble-element"))
    }, 1500);

    //Tilting Portfolio
    $('.portfolio-item__img-wrapper').tilt({
        glare: true,
        maxGlare: .25,
        maxTilt: 2,
        scale: 1.05
    });

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

});

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

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
            this.queue.push({ from, to, start, end });
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
            let { from, to, start, end, char } = this.queue[i];
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
            opacity: [0,1],
            easing: "easeInOutQuad",
            duration: duration,
            delay: (el, i) => 25 * (i+1)
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

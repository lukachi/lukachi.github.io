"use strict";

function toggleMenu() {
  console.log("toggle menu");
  var tlm = new TimelineMax();
  var menu_wrapper = $(".header-menu__wrapper");

  if (menu_wrapper.hasClass("show")) {
    tlm.to(menu_wrapper, .15, {
      left: "500%"
    });
  } else {
    menu_wrapper.css({
      "height": window.innerHeight
    }); //set NRJ phrase

    var img_expressions = $(".header-menu__img-wrapper").attr("data-menu-expression").split(",");

    if ($(window).width() <= 525) {
      $(".header-menu__img-wrapper").text(img_expressions[2]);
    } else if ($(window).width() > 525 && $(window).width() <= 768) {
      $(".header-menu__img-wrapper").text(img_expressions[1]);
    } else {
      $(".header-menu__img-wrapper").text(img_expressions[0]);
    }

    tlm.fromTo(menu_wrapper, .15, {
      left: "500%"
    }, {
      left: "0"
    });
  }

  menu_wrapper.toggleClass("show");
}

function onWindowDeformResize() {
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
    $(".second-text__scroller").attr("max", $(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight());
  }

  if ($(".overview").length) {
    $(".overview").css({
      "padding-top": $(".first-section__description").outerHeight() / 2 - 3
    });
  }

  if ($(".experience-item__img-wrapper").length) {
    $(".experience-item__img-wrapper").slick("resize");
  } //filters on blog archive & categories page


  if ($(".blog-filters").length) {
    if ($(window).width() <= 525) {
      var item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin"));
      var container_width = Array.from($(".filter-wrapper__container .filter-item")).map(function (el) {
        return el.clientWidth + item_margin * 3;
      }).reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }) / 3;
      $(".filter-wrapper__container").css({
        width: container_width
      });
    }
  } //filters on portfolio archive page


  if ($(".portfolio-filter").length) {
    if ($(window).width() <= 525) {
      var _item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin-right"));

      var _container_width = Array.from($(".filter-wrapper__container .filter-item")).map(function (el) {
        return el.clientWidth + _item_margin * 3;
      }).reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      });

      $(".filter-wrapper__container").css({
        width: _container_width
      });
    }
  }

  if ($(".services-list").length && $(".welcome-screen-services-archive").length) {
    $(".services-list").css({
      "padding-top": $(".welcome-screen-services-archive .first-section__description").outerHeight() / 2
    });
  }
}

function slidersInit() {
  //  sliders
  if ($(".reviews-slider").length) {
    $(".reviews-slider").slick({
      arrows: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 525,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
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
      responsive: [{
        breakpoint: 525,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
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
        prevArrow: "<button type=\"button\" class=\"slider-arrow arrow-prev\">\n" + "                            <span class=\"icon-wrapper\">\n" + "                                <i class=\"icon icon-arrow\"></i>\n" + "                            </span>\n" + "                        </button>",
        nextArrow: "<button type=\"button\" class=\"slider-arrow arrow-next\">\n" + "                            <span class=\"icon-wrapper\">\n" + "                                <i class=\"icon icon-arrow\"></i>\n" + "                            </span>\n" + "                        </button>",
        responsive: [{
          breakpoint: 525,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    } else {
      $(".recent-posts__wrapper").slick({
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 525,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
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
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 525,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
    $(".RN-gallery").magnificPopup({
      delegate: 'a',
      // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
        enabled: true,
        tCounter: ''
      } // other options

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
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 525,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
    $(".volunteer-gallery").magnificPopup({
      delegate: 'a',
      // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
        enabled: true,
        tCounter: ''
      } // other options

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
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 525,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }]
    });
    $(".experience-item__img-wrapper").magnificPopup({
      delegate: 'a',
      // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
        enabled: true,
        tCounter: ''
      } // other options

    });
  }
}

function componentsInit() {
  // Скроллер для сео блока
  if ($(".second-text__scroller").length) {
    setTimeout(function () {
      $(".second-text__scroller").attr("max", $(".second-text .content")[0].scrollHeight - $(".second-text .content").outerHeight());
    }, 500);

    if (IS_DEVICE_TOUCH) {
      $(".second-text__scroller")[0].disabled = true;
    }

    $(".second-text__scroller").on("propertychange input", function (e) {
      $(".second-text .content").scrollTop(e.target.value);
    });
    $(".second-text .content").on("scroll", function (e) {
      $(".second-text__scroller")[0].value = $(this).scrollTop();
    });
  } // Кнопка на-верх


  if ($(".go-top__btn").length) {
    $(".go-top__btn").on("click", function (e) {
      $([document.documentElement, document.body]).animate({
        scrollTop: $("header.header").offset().top
      }, 1000);
    });
  } // Main Page Scramble Text on first screen


  if ($(".first-screen .scramble-element").length) {
    //Scramble text
    setTimeout(function () {
      ScramblingElement($(".first-screen .scramble-element"));
    }, 1500);
  } // Tilting on mini portfolio preview


  if ($('.portfolio-item__img-wrapper').length) {
    if (!IS_DEVICE_TOUCH) {
      VanillaTilt.init(document.querySelectorAll(".portfolio-item__img-wrapper"), {
        max: 5,
        glare: true,
        maxGlare: .25,
        maxTilt: 2,
        scale: 1.05
      });
    }
  } // section-about


  if ($(".overview").length && $(".welcome-screen").length) {
    $(".overview").css({
      "padding-top": $(".first-section__description").outerHeight() / 2 - 3
    });
  } // section-portfolio case


  if ($(".portfolio-case-page").length && $(".welcome-screen-case").length) {
    $(".overview").css({
      "padding-top": $(".first-section__description").outerHeight() / 2 - 3
    });
  }

  if ($("section.experience").length) {
    if ($("section.experience .experience__item").length) {
      $("section.experience .experience__item").each(function (index) {
        var steps_container = $(this).find($(".experience-item__step"));

        if (steps_container.length >= 2) {
          steps_container.each(function (i) {
            $(this).find($(".experience-item__block-title .title")).toggleClass("connected");
          });
          $(this).find($(".experience-item__step:not(:last-child)")).each(function (i) {
            $(this).toggleClass("connected");
          });
        }
      });
    }
  } // section-about -- recommendations


  if ($(".recommendations").length) {
    var max_container_height = 5 * parseFloat($(".recommendations .recommendations__item").find(".recommendations__body .text p").css("line-height"));
    $(".recommendations .recommendations__item").each(function (i) {
      $(this).find(".recommendations__body .text").css({
        height: max_container_height
      });
      $(this).find(".recommendations__body .btn-show")[0].disabled = $(this).find(".recommendations__body .text p").outerHeight() <= max_container_height;
    });
    $(".recommendations__item .btn-show").on("click", function (e) {
      var textElem = $(this).prev();

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
  } // section-about -- rank & awards


  if ($(".ranks-awards").length) {
    var _max_container_height = 5 * parseFloat($(".ranks-awards__item").find(".text p").css("line-height"));

    $(".ranks-awards__item").each(function (i) {
      $(this).find(".text").css({
        height: _max_container_height
      });
      $(this).find(".btn__show-more")[0].disabled = $(this).find(".text p").outerHeight() < _max_container_height;
    });
    $(".ranks-awards__body .btn__show-more").on("click", function (e) {
      var textElem = $(this).prev();

      if (textElem.hasClass("show")) {
        TweenLite.to(textElem, .25, {
          height: _max_container_height
        });
      } else {
        TweenLite.set(textElem, {
          height: "auto"
        });
        TweenLite.from(textElem, .25, {
          height: _max_container_height
        });
      }

      textElem.toggleClass("show");
    });
  } // filters on blog archive & categories page


  if ($(".blog-filters").length) {
    if ($(window).width() <= 525) {
      var item_margin = parseFloat($(".filter-wrapper__container .filter-item").css("margin"));
      var container_width = Array.from($(".filter-wrapper__container .filter-item")).map(function (el) {
        return el.clientWidth + item_margin * 3;
      }).reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }) / 2.5;
      $(".filter-wrapper__container").css({
        width: container_width
      });
    }
  } // filters on portfolio archive page


  var checked_portfolio_cat = $(".portfolio-filter").length ? $('input[name="portfolio_category"]:checked').val() : undefined;

  if ($(".portfolio-filter").length) {
    $("section.portfolio").css({
      "padding-top": $(".portfolio-filter").outerHeight()
    });
    $('input[name="portfolio_category"]').on("click", function (e) {
      if ($(this).val().toString().includes(checked_portfolio_cat)) {
        $(".filter-item:first-child").find('input[name="portfolio_category"]')[0].checked = true;
      } else {
        checked_portfolio_cat = $(this).val();
      }
    });

    if ($(window).width() <= 525) {
      var _item_margin2 = parseFloat($(".filter-wrapper__container .filter-item").css("margin-right"));

      var _container_width2 = Array.from($(".filter-wrapper__container .filter-item")).map(function (el) {
        return el.clientWidth + _item_margin2 * 3;
      }).reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      });

      $(".filter-wrapper__container").css({
        width: _container_width2
      });
    }
  } // services archive page marquee


  if ($(".item-marquee").length) {
    $(".item-marquee").on("click", function (e) {
      return false;
    });
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
      touchMove: false
    });
  }

  if ($(".services-list").length && $(".welcome-screen-services-archive").length) {
    $(".services-list").css({
      "padding-top": $(".welcome-screen-services-archive .first-section__description").outerHeight() / 2
    });
  }

  if ($(".contact-form__section").length) {
    $(".contact-form__section").css({
      "padding-top": $(".welcome-screen-contacts .first-section__description").outerHeight() / 2 + 75
    });
  }

  if (Cookies.get("acceptedCookie")) {
    $(".cookie-accept").css({
      "display": "none"
    });
  }

  lazyload($("img.lazy"), {
    root: null,
    rootMargin: "500px",
    threshold: .5
  });

  if ($(".consultation-form").length) {
    $(".consultation-popup").on("click", function (e) {
      $(".consultation-form").toggleClass("show");
      $(".consultation-form .consultation-form__wrapper").toggleClass("show");
    });
    $(".consultation-form .btn-close").on("click", function (e) {
      $(".consultation-form").toggleClass("show");
      $(".consultation-form .consultation-form__wrapper").toggleClass("show");
    });
    $(".consultation-form .bg-close").on("click", function (e) {
      $(".consultation-form").toggleClass("show");
      $(".consultation-form .consultation-form__wrapper").toggleClass("show");
    });
  }

  console.log("components init!");
}

var swup = new Swup({
  plugins: [new SwupScriptsPlugin({
    head: true,
    body: true
  }), new SwupOverlayTheme({
    color: '#fefefe',
    duration: 1000,
    direction: 'to-right'
  })]
});
swup.on('animationOutDone', function (event) {
  window.scrollTo(0, 0);

  if ($(".header-menu__wrapper").hasClass("show")) {
    toggleMenu();
  }
});
swup.on('contentReplaced', function (event) {
  slidersInit();
  onWindowDeformResize();
  componentsInit();
});
"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IS_DEVICE_TOUCH = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

var TextScramble = /*#__PURE__*/function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [{
    key: "setText",
    value: function setText(newText) {
      var _this = this;

      var oldText = this.el.innerText;
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {
        return _this.resolve = resolve;
      });
      this.queue = [];

      for (var i = 0; i < length; i++) {
        var from = oldText[i] || '';
        var to = newText[i] || '';
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({
          from: from,
          to: to,
          start: start,
          end: end
        });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
  }, {
    key: "update",
    value: function update() {
      var output = '';
      var complete = 0;

      for (var i = 0, n = this.queue.length; i < n; i++) {
        var _this$queue$i = this.queue[i],
            from = _this$queue$i.from,
            to = _this$queue$i.to,
            start = _this$queue$i.start,
            end = _this$queue$i.end,
            _char = _this$queue$i["char"];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!_char || Math.random() < 0.28) {
            _char = this.randomChar();
            this.queue[i]["char"] = _char;
          }

          output += "<span class=\"dud\">".concat(_char, "</span>");
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
  }, {
    key: "randomChar",
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }]);

  return TextScramble;
}();

function ScramblingElement(DOMElement) {
  var phrases = _toConsumableArray(DOMElement.attr("data-textInsteads").split(","));

  var el = DOMElement[0];
  var fx = new TextScramble(el);
  var counter = 0;

  var next = function next() {
    fx.setText(phrases[counter]).then(function () {
      setTimeout(next, 5000);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
}

function fadeRightTextLetterByLetter(DOMElement) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1";
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
  var textWrapper = DOMElement;
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  var elements = textWrapper.querySelectorAll(":scope .letter");
  var tlm = new TimelineMax();
  tlm.staggerFrom(elements, 2, {
    opacity: 0,
    x: "70%",
    stagger: {
      amount: parseFloat(duration)
    },
    delay: parseFloat(delay)
  });
}

function textBlockFragmentation(DOMElement) {
  var rowsArr = [];
  var spanElements = DOMElement.textContent.split(" ").map(function (el) {
    var newSpan = document.createElement("span");
    newSpan.innerText = el + " ";
    return newSpan;
  });
  DOMElement.innerHTML = null;
  spanElements.forEach(function (el) {
    DOMElement.append(el);
  });
  var offsetTop = 0;
  DOMElement.querySelectorAll(":scope span").forEach(function (el) {
    var prop = 'line_' + el['offsetTop'];

    if (!rowsArr[prop]) {
      rowsArr[prop] = [];
      rowsArr[prop].push(el);
    } else {
      rowsArr[prop].push(el);
    }
  });
  DOMElement.innerHTML = null;

  for (var row in rowsArr) {
    var line = document.createElement("div");
    line.classList.add("anim-row");

    var _iterator = _createForOfIteratorHelper(rowsArr[row]),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var word = _step.value;
        line.append(word);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    line.innerHTML = line.textContent;
    DOMElement.append(line);
  }

  return DOMElement;
}

function fadeDownText(DOMElement) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1";
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
  var textWrapper = DOMElement;
  var elements = textBlockFragmentation(textWrapper).querySelectorAll(":scope .anim-row");
  var tlm = new TimelineMax();
  tlm.staggerFrom(elements, 1, {
    opacity: 0,
    y: "-150%",
    stagger: {
      amount: parseFloat(duration)
    },
    delay: parseFloat(delay)
  });
}

function fadeDownBlock(DOMElement) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "1";
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
  var textWrapper = DOMElement;
  var tlm = new TimelineMax();
  tlm.from(textWrapper, parseFloat(duration), {
    y: "-50px",
    opacity: 0,
    scaleY: .7,
    delay: parseFloat(delay)
  });
}

function portfolioSlidering(goAllPortfolioBtn_element_center_original) {
  // отсчёт от начала окна + центр экрана
  var centerScreen = $([document.documentElement, document.body]).scrollTop() + $(window).height() / 2; // конец секции с портфолио

  var wrapper_endpoints_Y = $(".portfolio__wrapper").offset().top + $(".portfolio__wrapper").height();

  if (centerScreen >= goAllPortfolioBtn_element_center_original.y && centerScreen <= wrapper_endpoints_Y - $(".portfolio__wrapper .portfolio-item").height() / 2) {
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
    } else if (centerScreen >= wrapper_endpoints_Y - $(".portfolio__wrapper .portfolio-item").height() / 2) {
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
  console.log("toggle menu");
  var tlm = new TimelineMax();
  var menu_wrapper = $(".header-menu__wrapper");

  if (menu_wrapper.hasClass("show")) {
    tlm.fromTo(menu_wrapper, .05, {
      left: "0"
    }, {
      left: "150%",
      ease: Back.easeInOut,
      delay: 0
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

    tlm.fromTo(menu_wrapper, .5, {
      left: "150%"
    }, {
      left: "0",
      ease: Back.easeInOut
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
      infinite: false,
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
    var RNGallery = new SmartPhoto(".RN-gallery .gallery-item", {
      nav: false
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
      infinite: false,
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
    var volunteerGallery = new SmartPhoto(".volunteer-gallery .gallery-item", {
      nav: false
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
      infinite: false,
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
    $(".experience-item__img-wrapper").each(function (i) {
      var elements = $(this)[0].querySelectorAll(":scope .img-wrapper__item");
      var ExperienceGallery = new SmartPhoto(elements, {
        nav: false
      });
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
  } // services archive page marquee


  if ($(".item-marquee").length) {// $(".item-marquee").each(function (el) {
    //
    // });
    // $("#item-marquee").hpanel({
    //     duration: 75000,
    //     padding: 0,
    //     stop: false,
    //     hover: false,
    //     focus: false
    // });
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
  var $isotope_grid = $(".portfolio-archive .portfolio__wrapper").isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'vertical'
  }); // filters on portfolio archive page

  var checked_portfolio_cat = $(".portfolio-filter").length ? $('input[name="portfolio_category"]:checked').val() : undefined;

  if ($(".portfolio-filter").length) {
    $("section.portfolio").css({
      "padding-top": $(".portfolio-filter").outerHeight()
    });
    $('input[name="portfolio_category"]').on("click", function (e) {
      if ($(this).val().toString().includes(checked_portfolio_cat)) {
        $(".filter-item:first-child").find('input[name="portfolio_category"]')[0].checked = true;
        $isotope_grid.isotope({
          filter: $(".filter-item:first-child").find('input[name="portfolio_category"]')[0].value
        });
      } else {
        checked_portfolio_cat = $(this).val();
        $isotope_grid.isotope({
          filter: "." + this.value
        });
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
  }

  console.log("components init!");
}

$(document).ready(function () {
  //  ресайз элементов при деформации окна
  $(window).on("resize", function (e) {
    onWindowDeformResize();
  }); //  ресайз элементов при деформации окна

  $(window).on("orientationchange", function (e) {
    onWindowDeformResize();
  }); //  центр элемента для блока мини портфолио

  var goAllPortfolioBtn_element_center_original = $(".go-all-portfolio").length ? {
    x: $(".go-all-portfolio").offset().left + $(".go-all-portfolio").width() / 2,
    y: $(".go-all-portfolio").offset().top + $(".go-all-portfolio").height() / 2
  } : undefined;
  $(window).on("scroll", function (e) {
    // движ ссылки на архив - портфолио
    if (goAllPortfolioBtn_element_center_original && $(".go-all-portfolio").length) {
      portfolioSlidering(goAllPortfolioBtn_element_center_original);
    }

    $(".header-menu__wrapper.show").css({
      "height": window.innerHeight
    });
  }); //  parallax effect on elements

  $(window).on("mousemove", function (e) {
    if ($(".parallaxing").length) {
      var parallaxing_elements = $(".parallaxing");
      var mousePos = {
        x: e.pageX,
        y: e.pageY
      };
      parallaxing_elements.each(function (index) {
        var parallax_radius = parseInt($(this).attr("data-radius"));
        var element_center = {
          x: $(this).offset().left + $(this).width() / 2,
          y: $(this).offset().top + $(this).height() / 2
        };
        var different = {
          x: mousePos.x - element_center.x,
          y: mousePos.y - element_center.y
        };
        var move = {
          x: -1 * different.x / parallax_radius / 3,
          y: -1 * different.y / parallax_radius / 3
        };
        gsap.to($(this), 1, {
          x: move.x,
          y: move.y
        });
      });
    }
  }); //  header-menu

  $(".header-menu__label").on("click", function (e) {
    toggleMenu();
  }); //  footer-menu

  $(".footer-menu__label").on("click", function (e) {
    toggleMenu();
  });
  componentsInit();
  slidersInit();
  var wayPointBigTitles = $(".split-text").waypoint({
    handler: function handler(direction) {
      if (direction == "down") {
        fadeRightTextLetterByLetter(this.element, $(this.element).data("split-duration"), $(this.element).data("split-delay"));
      } else {
        HideRightTextLetterByLetter(this.element, $(this.element).data("split-duration"), $(this.element).data("split-delay"));
      }
    },
    offset: "125%"
  });
  var wayPointSimpleText = $(".split-block-rows").waypoint({
    handler: function handler(direction) {
      if (direction == "down") {
        fadeDownText(this.element, $(this.element).data("split-duration"), $(this.element).data("split-delay"));
      } else {
        fadeUpText(this.element);
      }
    },
    offset: "115%"
  });
  var wayPointBlockDown = $(".fade-block-down").waypoint({
    handler: function handler(direction) {
      if (direction == "down") {
        fadeDownBlock(this.element, $(this.element).data("split-duration"), $(this.element).data("split-delay"));
      }
    },
    offset: "125%"
  });
  $(".cookie-accept .actions button").on("click", function (e) {
    Cookies.set("acceptedCookie", 1, {
      expires: 7,
      path: "/"
    });
    $(".cookie-accept").css({
      "display": "none"
    });
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

  if ($(".cstm-popup").length) {
    $(".cstm-popup__trigger").on("click", function (e) {
      $(".cstm-popup").toggleClass("show");
      $(".cstm-popup .cstm-popup__wrapper").toggleClass("show");
    });
    $(".cstm-popup .btn-close").on("click", function (e) {
      $(".cstm-popup").toggleClass("show");
      $(".cstm-popup .cstm-popup__wrapper").toggleClass("show");
    });
    $(".cstm-popup .bg-close").on("click", function (e) {
      $(".cstm-popup").toggleClass("show");
      $(".cstm-popup .cstm-popup__wrapper").toggleClass("show");
    });
  }
});
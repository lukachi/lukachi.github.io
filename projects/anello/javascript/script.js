function preloadImages(imgArray) {
    var imgCount = 0;
    var currentIndex = 0;

    for (key in imgArray) {
        for (image in imgArray[key]) {
            imgCount++;
        }
    }

    for (key in imgArray) {
        for (image in imgArray[key]) {
            var img = new Image();
            img.src = image;
            img.onload = function (ev) {
                currentIndex++;
                if (currentIndex === imgCount) {
                    alert("Картинки загрузились");
                }
            }
        }
    }
}

document.body.onload = function (ev) {
    setTimeout(function () {
        var preload = document.querySelector(".preloader");
        if (!preload.classList.contains("done")) {
            preload.classList.add("done");
        }
    }, 1000);
};

$(document).ready(function (e) {

    const colorurls = {
        "rgb(84, 105, 162)": [ "images/backpacks/blue/front.png", "images/backpacks/blue/front.png", "images/backpacks/blue/front.png", "images/backpacks/blue/front.png"],
        "rgb(48, 100, 87)": [ "images/backpacks/crazycolor/front.png", "images/backpacks/crazycolor/back.png", "images/backpacks/crazycolor/open.png", "images/backpacks/crazycolor/open2.png", "images/backpacks/crazycolor/profile.png"],
        "rgb(252, 1, 142)": ["images/backpacks/shokingpink/front.png", "images/backpacks/shokingpink/back.png", "images/backpacks/shokingpink/open.png", "images/backpacks/shokingpink/back.png"],
        "rgb(102, 100, 49)": ["images/backpacks/khaki/front.png", "images/backpacks/khaki/open.png", "images/backpacks/khaki/front.png", "images/backpacks/khaki/open.png"],
        "rgb(115, 129, 103)": ["images/backpacks/lightgreen/profile.png", "images/backpacks/lightgreen/profile.png", "images/backpacks/lightgreen/profile.png", "images/backpacks/lightgreen/profile.png"],
        "rgb(255, 120, 120)": ["images/backpacks/salmonpink/front.png", "images/backpacks/salmonpink/back.png",  "images/backpacks/salmonpink/open.png", "images/backpacks/salmonpink/front.png"],
        "rgb(134, 219, 239)": ["images/backpacks/saxblue/front.png", "images/backpacks/saxblue/back.png", "images/backpacks/saxblue/open.png", "images/backpacks/saxblue/back.png"],
        "rgb(232, 68, 67)": ["images/backpacks/wine/front.png", "images/backpacks/wine/back.png", "images/backpacks/wine/open.png", "images/backpacks/wine/front.png"],
        "rgb(255, 10, 49)": ["images/backpacks/whitered/front.png", "images/backpacks/whitered/back.png", "images/backpacks/whitered/front2.png", "images/backpacks/whitered/open.png"],
        "rgb(70, 74, 103)": ["images/backpacks/navy/front.png", "images/backpacks/navy/back.png", "images/backpacks/navy/front2.png", "images/backpacks/navy/open.png"],
        "rgb(56, 53, 60)": ["images/backpacks/black/front.png", "images/backpacks/black/back.png", "images/backpacks/black/open.png", "images/backpacks/black/back.png"],
        "rgb(221, 207, 170)": ["images/backpacks/natutal/profile.png", "images/backpacks/natutal/profile.png", "images/backpacks/natutal/profile.png", "images/backpacks/natutal/profile.png"],
        "rgb(89, 114, 82)": ["images/backpacks/Dgreen/front.png", "images/backpacks/Dgreen/back.png", "images/backpacks/Dgreen/open.png", "images/backpacks/Dgreen/back.png"],
        "rgb(255, 255, 255)": ["images/backpacks/white/front.png", "images/backpacks/white/back.png", "images/backpacks/white/open.png", "images/backpacks/white/back.png"],
        "rgb(200, 201, 205)": ["images/backpacks/lightgray/front.png", "images/backpacks/lightgray/back.png", "images/backpacks/lightgray/open.png", "images/backpacks/lightgray/back.png"],
        "rgb(240, 51, 31)": ["images/backpacks/red/front.png", "images/backpacks/red/back.png", "images/backpacks/red/open.png", "images/backpacks/red/back.png"],
        "rgb(6, 99, 106)": ["images/backpacks/Egreen/front.png", "images/backpacks/Egreen/back.png", "images/backpacks/Egreen/open.png", "images/backpacks/Egreen/front.png"],
        "rgb(252, 146, 158)": ["images/backpacks/pinkpurple/front.png", "images/backpacks/pinkpurple/back.png", "images/backpacks/pinkpurple/open.png", "images/backpacks/pinkpurple/front.png"],
        "rgb(228, 255, 119)": ["images/backpacks/yellow/front.png", "images/backpacks/yellow/back.png", "images/backpacks/yellow/open.png", "images/backpacks/yellow/back.png"],
        "rgb(187, 63, 53)": ["images/backpacks/orange/front.png", "images/backpacks/orange/back.png", "images/backpacks/orange/open.png", "images/backpacks/orange/front.png"],
        "rgb(90, 76, 63)": ["images/backpacks/camouflage/front.png", "images/backpacks/camouflage/back.png", "images/backpacks/camouflage/back.png", "images/backpacks/camouflage/open.png", "images/backpacks/camouflage/back2.png"],
        "rgb(178, 165, 139)": ["images/backpacks/lightcamouflage/front.png", "images/backpacks/lightcamouflage/back.png", "images/backpacks/lightcamouflage/open.png", "images/backpacks/lightcamouflage/front.png"]
    };

    // preloadImages(colorurls);

    const colors = document.querySelectorAll(".choosecolor .color-item");

    var ind = 0;

    var colorSelected = "black";

    for ( key in colorurls) {
        colors[ind].style.backgroundColor = key;
        ind++;
    }

    function ClearClider() {
        $(".slider-pack").slick('removeSlide', null, null, true);
        $(".slider-thumber").slick('removeSlide', null, null, true);
    }

    $(".choosecolor .color-item").click(function (e) {
        const colorname = document.querySelector(".colorname");
        colorname.innerText = e.target.dataset.coloritem;

        colorSelected = e.target.dataset.coloritem;

        ClearClider();

        var MassOfUrls = [];

        for (clr in colorurls) {
            if (e.target.style.backgroundColor === clr) {
                MassOfUrls = Array.from(colorurls[clr]);
            }
        }

        for (var i = 0; i < MassOfUrls.length; i++) {
            const sliderItem = document.createElement("div");
            sliderItem.classList.add("slider-item");

            const sliderItem2 = document.createElement("div");
            sliderItem.classList.add("slider-item");

            const sliderimage = document.createElement("img");

            const sliderimage2 = document.createElement("img");

            var img = new Image();
            img.src = MassOfUrls[i];

            img.onload = function() {
                sliderimage.src = this.src;
            };

            var img2 = new Image();
            img2.src = MassOfUrls[i];

            img2.onload = function() {
                sliderimage2.src = this.src;
            };

            sliderItem.appendChild(sliderimage);

            sliderItem2.appendChild(sliderimage2);

            $(".slider-thumber").slick('slickAdd', sliderItem);

            $(".slider-pack").slick('slickAdd', sliderItem2);
        }
    });

    $('.slider').slick({
        dots: false,
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slider-pack').slick({
        infinite: false,
        arrows: false,
        dots: false,
        speed: 300,
        fade: true,
        draggable: false
    });

    $('.slider-thumber').slick({
        arrows: true,
        slidesToShow: 3,
        focusOnSelect: true,
        vertical: true,
        infinite: false,
        asNavFor: '.slider-pack',
        prevArrow: $(".forPagination .prev"),
        nextArrow: $(".forPagination .next"),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                }
            }
        ]
    });

    $('.style-slider').slick({
        dots: true,
        infinite: true,
        arrows: true,
        speed: 300,
        slidesToShow: 4,
        adaptiveHeight: true,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.action input[type="range"]').on("input change", function(e){
        e.preventDefault();
        const range = document.querySelector("input[type='range']");
        range.max = Math.round($(".slider").slick("getSlick").slideCount/2);

        var slideno = $(this).val();
        $('.slider').slick('slickGoTo', slideno );
    });

    $(".buyNow").click(function (e) {
        e.preventDefault();
        var offset = 500;
        $('html, body').animate({
            scrollTop: $("#OrderBtn").offset().top - offset
        }, 500);
        return false;
    });

    $(".ToMail").click(function (e) {
        e.preventDefault();
        var offset = 520;
        $('html, body').animate({
            scrollTop: $("#DescrSection").offset().top - offset
        }, 500);
        return false;
    });

    $(".logo a").click(function (e) {
        e.preventDefault();
        location.reload();
    });

    $(".fasterbuy").click(function (e) {
        e.preventDefault();
        var offset = 0;
        $('html, body').animate({
            scrollTop: $("#fasters").offset().top - offset
        }, 500);
        return false;
    });

    $(".haiped").click(function (e) {
        e.preventDefault();
        var offset = 0;
        $('html, body').animate({
            scrollTop: $("#practs").offset().top - offset
        }, 500);
        return false;
    });

    $(".pulse-border:nth-child(1)").hover(function (e) {
        $(".ab-i1 span").css("transition", "1s ease").css("fontSize", "1.53rem");
        $(".ab-i1 p").css("transition", "1s ease")
            .css("fontSize", ".95rem")
            .css("color", "rgba(0, 0, 0, .75)")
            .css("fontWeight", "bold");
    });

    $(".pulse-border:nth-child(1)").mouseleave(function (e) {
        $(".ab-i1 span").css("fontSize", "1.5rem");
        $(".ab-i1 p").css("fontSize", ".9rem")
            .css("color", "#7b7f87")
            .css("fontWeight", "normal");

    });

    $(".pulse-border:nth-child(2)").hover(function (e) {
        $(".ab-i2 span").css("transition", "1s ease").css("fontSize", "1.53rem");
        $(".ab-i2 p").css("transition", "1s ease")
            .css("fontSize", ".95rem")
            .css("color", "rgba(0, 0, 0, .75)")
            .css("fontWeight", "bold");
    });

    $(".pulse-border:nth-child(2)").mouseleave(function (e) {
        $(".ab-i2 span").css("fontSize", "1.5rem");
        $(".ab-i2 p").css("fontSize", ".9rem")
            .css("color", "#7b7f87")
            .css("fontWeight", "normal");
    });

    $(".pulse-border:nth-child(3)").hover(function (e) {
        $(".ab-i3 span").css("transition", "1s ease").css("fontSize", "1.53rem");
        $(".ab-i3 p").css("transition", "1s ease")
            .css("fontSize", ".9rem")
            .css("color", "rgba(0, 0, 0, .75)")
            .css("fontWeight", "bold");
    });

    $(".pulse-border:nth-child(3)").mouseleave(function (e) {
        $(".ab-i3 span").css("fontSize", "1.5rem");
        $(".ab-i3 p").css("fontSize", ".9rem")
            .css("color", "#7b7f87")
            .css("fontWeight", "normal");
    });

    $(".pulse-border:nth-child(4)").hover(function (e) {
        $(".ab-i4 span").css("transition", "1s ease").css("fontSize", "1.53rem");
        $(".ab-i4 p").css("transition", "1s ease")
            .css("fontSize", ".9rem")
            .css("color", "rgba(0, 0, 0, .75)")
            .css("fontWeight", "bold");
    });

    $(".pulse-border:nth-child(4)").mouseleave(function (e) {
        $(".ab-i4 span").css("fontSize", "1.5rem");
        $(".ab-i4 p").css("fontSize", ".9rem")
            .css("color", "#7b7f87")
            .css("fontWeight", "normal");
    });

    $('.magnific-item').magnificPopup({
        type: "image",
        gallery: {
            enabled: true
        },
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    $("#input-phone").inputmask("+7(999) 999-9999");
    $("#input-phone-phone").inputmask("+7(999) 999-9999");
});
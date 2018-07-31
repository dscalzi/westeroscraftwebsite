$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
        $(".header").addClass("headershow");
    } else {
        $(".header").removeClass("headershow");
    }
});

$("#top-down-arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 1500);
});

$(".mobileMenu").click(function() {
    $(".contentWrapper").toggleClass("contentWrapperVisibility");
    $(".navbarLink").toggleClass("navbarLinkVisibility");
    $(".mobileMenu i").toggleClass("mobileMenuColor");
});
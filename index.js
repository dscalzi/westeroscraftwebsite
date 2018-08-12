$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
        $(".home-navigation").addClass("navigation-show");
    } else {
        $(".home-navigation").removeClass("navigation-show");
    }
});
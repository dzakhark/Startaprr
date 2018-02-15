$(function() {

	$('.hamburger').click(function () {
        $(this).toggleClass('is-active');
        $('.nav').slideToggle(500);
    });

    checkVisibleItem('.team__list', '.team__item');
    checkVisibleItem('.list__clients', '.client');

    $(window).resize(function() {
        checkVisibleItem('.team__list', '.team__item');
        checkVisibleItem('.list__clients', '.client');
    });

    $('.top').click(function () {
        console.log('top');
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    function checkVisibleItem(list, item) {
        $(item).each(function () {
            $(this).css({'display': 'none'});
        });
        var sliderSize = $(list).outerWidth();
        var itemSize = $(item).outerWidth(true);
        var count = Math.floor(sliderSize/itemSize);
        for (var i = 0; i < count; i++) {
            $(item).eq(i).css({'display' : 'block'})
        }
    }
});

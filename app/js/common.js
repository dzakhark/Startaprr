$(function() {

	$('.hamburger').click(function () {
        $(this).toggleClass('is-active');
        $('.nav').slideToggle(500);
    });

    checkVisibleItem('.membersTeamList', '.memberItem');
    checkVisibleItem('.clientsList', '.client');

    $(window).resize(function() {
        checkVisibleItem('.membersTeamList', '.memberItem');
        checkVisibleItem('.clientsList', '.client');
    });

    $('.top').click(function () {
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

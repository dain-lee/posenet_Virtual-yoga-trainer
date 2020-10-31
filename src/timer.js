var time = 0; /* how long the timer runs for */
var initialOffset = '440';
var i = 5;
var j = 1;
var interval = setInterval(function () {
    $('.circle_animation').css('stroke-dashoffset', initialOffset - (j * (initialOffset / 5)));
    $('.timer').text(i);
    if (i == 1) {
        clearInterval(interval);
        setTimeout("$('.timer').text('PASSED')", 1000);
    }
    i--;
    j++;
}, 1000);
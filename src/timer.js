var time = 0; /* how long the timer runs for */
var initialOffset = '440';
var i = 5;
var j = 1;
var interval = setInterval(function () {
<<<<<<< HEAD
        $('.circle_animation').css('stroke-dashoffset', initialOffset - (j * (initialOffset / 5)));
        $('.timer').text(i);
        if (i == 1) {
            clearInterval(interval);
            setTimeout("$('.timer').text('PASSED')", 1000);
        }
        i--;
        j++;
    }, 1000);

=======
    $('.circle_animation').css('stroke-dashoffset', initialOffset - (j * (initialOffset / 5)));
    $('.timer').text(i);
    if (i == 1) {
        clearInterval(interval);
        setTimeout("$('.timer').text('0')", 1000);
    }
    i--;
    j++;
}, 1000);
>>>>>>> b277e29dbc1a7fdbbe4e45fafa7eca1874cca724

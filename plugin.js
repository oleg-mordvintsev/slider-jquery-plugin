(function ($) {

    $.fn.CssSlider = function (options) {
        let settings = $.extend({
                'Animate': 'slide', // bounce,fade,slide,zoom
                'Direction': 'horizontal', // horizontal,vertical
                'Delay': 5000 // Время до авто-прокрутки в мс
            }, options),
            $this = this;

        // Слайдер
        if ($this.find('a').length > 1) {
            // Слайдов больше одного

            // Переменные
            let // Текущий элемент слайда
                current = 1,
                // Следующий элемент слайда
                nextsld = 2,
                // Предыдущий элемент слайда
                prevsld = $this.find('.Slider>a').length,
                // Общее кол-во слайдов
                lengths = $this.find('.Slider>a').length,
                // Left,Up
                Left = settings.Direction === 'vertical' ? 'Up' : 'Left',
                // Right,Down
                Right = settings.Direction === 'vertical' ? 'Down' : 'Right',
                // Сброс указателей
                ResetControl = function () {
                    $this.find('.Control b').removeClass('active');
                    $this.find('.Control b:nth-child(' + current + ')').addClass('active');
                };

            // Устанавливаем для текущего главного слайда z-index 2
            $this.find('a').css({'z-index': '0', 'display': 'none'});
            $this.find('a:nth-child(' + current + ')').css({'z-index': '1', 'display': ''});

            // Устанавливаем Control
            $.each($this.find('a'), function () {
                $this.find('.Control').append('<b></b>');
            });
            $this.find('.Control b:first').addClass('active');

            // Следующий
            $this.find('.Right').click(function () {

                // Устанавливаем индексы наложения
                $this.find('a').css({'z-index': '0', 'display': 'none'});
                $this.find('a:nth-child(' + current + ')').css({'z-index': '1', 'display': ''});
                $this.find('a:nth-child(' + nextsld + ')').css({'z-index': '2', 'display': ''});

                // Убираем со всех классы анимации и устанавливаем на текущие
                $this.find('a')
                    .removeClass(settings.Animate + 'Out' + Right)
                    .removeClass(settings.Animate + 'In' + Left)
                    .removeClass(settings.Animate + 'Out' + Left)
                    .removeClass(settings.Animate + 'In' + Right);
                $this.find('a:nth-child(' + current + ')')
                    .addClass(settings.Animate + 'Out' + Left);
                $this.find('a:nth-child(' + nextsld + ')')
                    .addClass(settings.Animate + 'In' + Right);

                // Расчеты значений текущих
                prevsld = current;
                current++;
                if (current > lengths) current = 1;
                nextsld = current + 1;
                if (nextsld > lengths) nextsld = 1;

                // Указатели
                ResetControl();

            });

            // Предыдущий
            $this.find('.Left').click(function () {

                // Устанавливаем индексы наложения
                $this.find('a').css({'z-index': '0', 'display': 'none'});
                $this.find('a:nth-child(' + current + ')').css({'z-index': '1', 'display': ''});
                $this.find('a:nth-child(' + prevsld + ')').css({'z-index': '2', 'display': ''});

                // Убираем со всех классы анимации и устанавливаем на текущие
                $this.find('a')
                    .removeClass(settings.Animate + 'Out' + Right)
                    .removeClass(settings.Animate + 'In' + Left)
                    .removeClass(settings.Animate + 'Out' + Left)
                    .removeClass(settings.Animate + 'In' + Right);
                $this.find('a:nth-child(' + current + ')')
                    .addClass(settings.Animate + 'Out' + Right);
                $this.find('a:nth-child(' + prevsld + ')')
                    .addClass(settings.Animate + 'In' + Left);

                // Расчеты значений текущих
                nextsld = current;
                current--;
                if (current === 0) current = lengths;
                prevsld = current - 1;
                if (prevsld === 0) prevsld = lengths;

                // Указатели
                ResetControl();

            });

            // Клик по указателям
            $this.find('.Control b').click(function () {

                let index = $(this).index('b') + 1,
                    now = current;

                if (now < index) {
                    // Следующий
                    nextsld = index;
                    $this.find('.Right').trigger('click');
                } else if (now > index) {
                    prevsld = index;
                    $this.find('.Left').trigger('click');
                }

                current = index;
                nextsld = current + 1;
                if (nextsld > lengths) nextsld = 1;
                prevsld = current - 1;
                if (prevsld === 0) prevsld = lengths;

                ResetControl();

            });

            // Автоматика
            let $interval = setInterval(function () {
                $this.find('.Right').trigger('click');
            }, settings.Delay);

            $this.hover(function () {
                clearInterval($interval);
            }, function () {
                $interval = setInterval(function () {
                    $this.find('.Right').trigger('click');
                }, settings.Delay);
            });

        } else {

            // Слайдов мало - скрываем управление слайдами
            $this.find('.Right,.Left,.Control').css({'display': 'none'});

        }

        // Функция смещения изображения подложки (не общего фона)
        let MarginImg = function () {

            let img = $('#Slider>.Slider>a>.Slide>img'),
                i_w = img.width(),
                s_w = $(window).width(),
                h_w = $('#Slider>.Slider>a>.Html').width(),
                boo = $('#Slider>.Slider').height() > 20 * $('body').css('font-size').replace("px", "") ? true : false;

            if (s_w < i_w) {
                if (s_w < 640 && boo === true) {
                    img.css('margin-left', (s_w - (i_w / 2)) - ((s_w - h_w) / 2) + 'px');
                } else {
                    img.css('margin-left', ((s_w - i_w) / 2) + 'px');
                }
            }

        };

        // Исправление подложки
        $(window).on('load resize', function () {
            MarginImg();
        });

    };

})(jQuery);

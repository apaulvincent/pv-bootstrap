// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


(function ($) {

    $.Reveal = function (el, options) {
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data('Reveal', base);

        base.init = function () {
            base.options = $.extend({}, $.Reveal.default, options);
            base.bindUI();
        }

        base.detect = function () {
            var viewport = {};
            var bounds = {};
            viewport.top = $(window).scrollTop();
            viewport.bottom = viewport.top + $(window).height();
            bounds.top = base.$el.offset().top;
            bounds.bottom = bounds.top + base.$el.outerHeight();
            if ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top)){
                base.$el.addClass('reveal');
            }
        }

        base.bindUI = function () {
            $(document).bind('scroll mousewheel DOMMouseScroll', function(){
                setTimeout(function () {
                    base.detect();
                },600)
            })
        }

        base.init();

    }

    $.Reveal.default = {};

    // attaching constructor
    $.fn.reveal = function (options) {
        return this.each(function(){
            (new $.Reveal(this, options));
        })
    }

})(jQuery);

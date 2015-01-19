(function($) {
	
	$(function() {
		

		var h = $('.header').outerHeight(),
			sh = $('.search').outerHeight(),
			wh = $(window).outerHeight() - h;

		$('.content').height(wh);
		$('.main-area').height(wh-sh);

		$(window).on('resize', function() {
			$('.content').height(wh);
			$('.main-area').height(wh-sh);	
		});


		$('.pin a').on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('on');
		});




		$('.header').transition({opacity: 1, delay: 300});
		$('.sidenav').transition({opacity: 1, delay: 500});
		$('.content-wrap').transition({opacity: 1, delay: 800});



	});

}(jQuery));
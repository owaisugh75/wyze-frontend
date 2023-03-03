new Swiper('.wyze-product-slide', {
	loop: true,
	speed:700,     
	grabCursor: true,
	spaceBetween: 15,
	slidesPerView: 2,
	centeredSlides:true,
	navigation: {
      nextEl: ".wyze-slide-btn-next",
      prevEl: ".wyze-slide-btn-prev",
    },
    pagination: {
      el: ".wyze-slide-pagination",
      clickable: true,
    },
	breakpoints: {
		100: {
			slidesPerView: 1,
			spaceBetween: 15,
		},
		1199: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
	},
});

;(function($){

	// SLIDE WITH ACCOURDION
	(function AccourdionSlideFun(){
	    var SlideItems = [];
	    var AccourdionItems = $('.accordion-slide-wrap .accordion-item');
	    for(var i=0; i<AccourdionItems.length; i++){
	    	SlideItems.push(AccourdionItems[i].outerHTML)
	    }
	    $('.accordion-slide-wrap').empty();
		var interleaveOffset = 0.4;
		new Swiper('.wyze-slide-wrapper2', {
			loop: true,
			speed:700,     
			grabCursor: false,
			watchSlidesProgress: true,
			mousewheelControl: false,  
			keyboardControl: true,
			resistance : true, 
			resistanceRatio : 0.5, 
			parallax:true,
			allowTouchMove:false,
			pagination: {
	          el: ".accordion-slide-wrap",
	          clickable: true,
	          renderBullet: function (index, className) {
	          	return '<div class="' + className + '">' + SlideItems[index] + "</div>";
	          },
	        },
			on: { 
				progress: function() {
				  var swiper = this;
				  for (var i = 0; i < swiper.slides.length; i++) {
				    var slideProgress = swiper.slides[i].progress;
				    var innerOffset = swiper.width * interleaveOffset;
				    var innerTranslate = slideProgress * innerOffset;
				    swiper.slides[i].querySelector(".slide_bg").style.transform =
				      "translate3d(" + innerTranslate + "px, 0, 0)";
				  }      
				},
				touchStart: function() {
				  var swiper = this;
				  for (var i = 0; i < swiper.slides.length; i++) {
				    swiper.slides[i].style.transition = "";
				  }
				},
				setTransition: function(speed) {
				  var swiper = this;
				  for (var i = 0; i < swiper.slides.length; i++) {
				    swiper.slides[i].style.transition = speed + "ms"; 
				    swiper.slides[i].querySelector(".slide_bg").style.transition = speed + "ms";   
				  }
				}
			}
		}); 

	    $('.accordion-slide-wrap .accordion-title').click(function(j) {
	        var dropDown = $(this).closest('.accordion-item').find('.accordion-body');

	        $(this).closest('.accordion-slide-wrap').find('.accordion-body').not(dropDown).slideUp(200);

	        if ($(this).hasClass('active')) {
	            $(this).removeClass('active');
	        } else {
	            $(this).closest('.accordion-slide-wrap').find('.accordion-title.active').removeClass('active');
	            $(this).addClass('active');
	        }

	        dropDown.stop(false, true).slideToggle(200);

	        j.preventDefault();
	    });
	})();




})(jQuery);
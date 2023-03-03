new Swiper('.testimonial-slide', {
	loop: false,
	speed:700,     
	grabCursor: true,
	spaceBetween: 15,
	slidesPerView: 2,
	centeredSlides:false,
  pagination: {
    el: ".testimonial-slide-pagination",
    clickable: true,
  },
	breakpoints: {
		0: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		991: {
			slidesPerView: 3,
			spaceBetween: 30,
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

	    $('.accordion-slide-wrap .accordion-item .accordion-title').click(function(j) {
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


	// DOORBELL SLIDE
	function ToggleViewFun(){
		ToggleView = setInterval(function(){
			$('.prod-view-area').toggleClass('active-view');
		}, 3000);
	} ToggleViewFun();
	
	$('.prod-view-area').hover(function() {
		clearInterval(ToggleView);
	}, function() {
		ToggleViewFun();
	});

	$('.prod-view-nav-item-2').click(function() {
		$('.prod-view-area').addClass('active-view');
	});
	$('.prod-view-nav-item-1').click(function() { 
		$('.prod-view-area').removeClass('active-view');
	});

	(function RectScroll(){ 
			// Global Variable
			var ScrollCtrl = new ScrollMagic.Controller();
	
			var HeightWrap = $('.doorbell-bg-section').innerHeight();
			var ScTl = new TimelineMax();
					ScTl.set('.doorbell-bg-wrapper .bg-2', {clip:"rect(0,100vw,"+HeightWrap+"px,0)"}) 
	
					ScTl.to('.doorbell-bg-wrapper .bg-2', 1, {clip:"rect(0,100vw,0px,0)", ease: Power3.easeInOut})
	
				var DoorbelScene = new ScrollMagic.Scene({
					triggerElement:'.doorbell-bg-section',
					triggerHook: 0,
					duration: '300%',
				}).setPin('.doorbell-bg-section')
				// .addIndicators() 
				.setTween(ScTl)
				.addTo(ScrollCtrl);
		})();

		// AUDIO SCRIPS
		(function AudioScripts(){

			// var $AudioProgresRange = $('.audio-progressbar-range');
			var $AudioProgres = $('.audio-progressbar');
	     $AudioProgres.rangeslider({
	        polyfill: false,
	        onInit: function() {
	          $(".rangeslider__handle").attr('slide-val', $('.slider-range-wrap input').val());
	        },
	        onSlide: function(position, value) {
	          
	        }
	      });

			const PlayButton = document.querySelector('.audio-wrapper .play-button'),
			    PrevButton = document.querySelector('.audio-wrapper .prev-button'),
			    NextButton = document.querySelector('.audio-wrapper .next-button'),
			      ProgressBar = document.querySelector('.audio-wrapper .audio-progressbar');
			    CreateTrack = document.createElement('audio');
			    CreateTrack.setAttribute('id', 'track');

			CreateTrack.setAttribute('src','assets/audios/1.wav');
			
			    document.querySelector('body').appendChild(CreateTrack);
			const track = document.querySelector('#track'); 
			trackIndex = 0; 

			AudioList = [
			  "assets/audios/1.wav",
			  "assets/audios/2.wav",
			  "assets/audios/3.wav",
			  "assets/audios/4.wav"
			];

			// PLAY BUTTON
			let playing = true;
			function pausePlay() {
			  if (playing) {
			    PlayButton.classList.add('played');
			    track.play();
			    playing = false;
			    StartinterVal = setInterval(ProgressValue, 100);
			  } else {
			    PlayButton.classList.remove('played');
			    track.pause();
			    playing = true;
			    clearInterval(StartinterVal);
			  }
			}

			PlayButton.addEventListener("click", pausePlay);

			// NEXT BUTTON
			function nextTrack() {
			  trackIndex++;
			  if (trackIndex > AudioList.length - 1) {
			    trackIndex = 0;
			  }
			  track.src = AudioList[trackIndex];
			  playing = true;
			  pausePlay();
			}
			NextButton.addEventListener("click", nextTrack);

			// PREV BUTTON
			function prevTrack() {
			  trackIndex--;
			  if (trackIndex < 0) {
			    trackIndex = AudioList.length - 1;
			  }
			  track.src = AudioList[trackIndex];
			  playing = true;
			  pausePlay();
			}
			PrevButton.addEventListener("click", prevTrack);

			// PROGRESS VALUE
			function ProgressValue(){
			  ProgressBar.max = track.duration;
			  ProgressBar.value = track.currentTime;
			  $AudioProgres.rangeslider('update', true);
			}	
			// CHANGE PROGRESS VALUE
			function ChangeProgressValue(){
			    track.currentTime = ProgressBar.value;
			}
			ProgressBar.addEventListener('click', ChangeProgressValue);

			function endMusic(){
				clearInterval(StartinterVal);
				track.pause();
				ProgressBar.max = "";
				ProgressBar.min = 0
				ProgressBar.value = 0; 
				$AudioProgres.rangeslider('update', true);
				PlayButton.classList.remove('played');
				// pausePlay();
			}

			track.addEventListener("ended", endMusic);


		})();

})(jQuery);
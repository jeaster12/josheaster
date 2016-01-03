/*
 * ENVIGO Responsive HTML template v1.1
 * http://themeforest.net/user/dexWrThemes
 *
 * Author, dexWrThemes
 * 
 */
 
 $(document).on('ready', function(){
  
	visible = false;
	automatic_scroll_down = true; 
	$('nav a, .btn-front').click(function(e){
		e.preventDefault();
		var idPlace = $(this).attr('href');
		if(idPlace=="#home"){
			idPlace = "body";
		}
		visible = false;
		if($(idPlace).length && !visible){
			visible = true
			disable_scroll();
			var position = $(idPlace).offset().top+0;
			$('html, body').animate({scrollTop: position
			}, 4000, 'easeOutExpo').promise().done(function(){
			enable_scroll();
			});
		}
		return false;
	});
 
	var keys = [37, 38, 39, 40];
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
		  e.preventDefault();
	  e.returnValue = false;  
	}

	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				preventDefault(e);
				return;
			}
		}
	}

	function wheel(e) {
	  preventDefault(e);
	}

	function disable_scroll() {
	  if (window.addEventListener) {
		  window.addEventListener('DOMMouseScroll', wheel, false);
	  }
	  window.onmousewheel = document.onmousewheel = wheel;
	  document.onkeydown = keydown;
	}

	function enable_scroll() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
	}
 
 
 
 
 
	//---------------   Methods on INIT ----------------------//
	var isiPad = navigator.userAgent.match(/iPad/i) != null;	
	if($(window).width() > 1024 && !isiPad) {
	
		//---------------   nicescroll ----------------------//
		$("html").niceScroll({
			touchbehavior: false,
			cursorcolor: "#39515D",
			cursorborder: "#16A085",
			cursorwidth: 10,
			background: "",
			zindex: "99999",
			autohidemode: false,
			cursorborderradius: 0
		});
		
		//---------------   progress bar animation ----------------------//
		$('.progress-bar').appear();
		$('.progress-bar').width('0');
		$(document.body).on('appear', '.progress-bar', function(e, $affected) {
			$affected.each(function() {
				$(this).animate({width: $(this).data('progress')}, 2000, 'easeOutBounce');
			})
		});
		
		
		//---------------   entrance animations ----------------------//
		$('.animate').appear();
		$(document.body).on('appear', '.animate', function(e, $affected) {
			if ($(this).data("delay")) {
				fadeDelayAttr = $(this).data("delay")
				fadeDelay = fadeDelayAttr;				
			} else {
				fadeDelay = 0;
			}			
			$(this).delay(fadeDelay).queue(function(){
				$(this).addClass('animated').clearQueue();
			});          
		});
		
		
		
		//---------------   fact number count ----------------------//
		$('.fact-number').appear();
		$(document.body).one('appear', '.fact-number', function(e, $affected) {		
			$('.fact-number').countTo();
		});
		
		
		
		
		
		
		
	}else if($(window).width() < 850){
		var navpost = $('#header').offset().top;
		jQuery.event.add(window, "scroll", function() {
		
			var currentPos = $(window).scrollTop();
			
			if(navpost <currentPos){
				
				$('#header').addClass('fixed');
			}else{
				$('#header').removeClass('fixed');
			}
		});
		
		

	}
		
	

	
	//---------------  FORM FIELDS ----------------------//
	
	$('#contact-form .text-field input,#contact-form .textarea-field textarea').on('focus',function(){
		if(this.value == ''){
			this.value = ''; 
			$(this).next().css('display','none') 
		}
	});
	$('#contact-form .text-field input,#contact-form .textarea-field textarea').on('blur',function(){
		if(this.value == ''){
			this.value = ''; 
			$(this).next().css('display','block');
		}	
	});
	$('#contact-form .label').on('click',function(){
		$(this).css('display','none');
		$(this).prev().focus();
	});
	
	
	
	
	
	
	//--------------- CONTACT: EMAIL FUNCTION + AJAX  ----------------------//

	$("#sendemail").click(function(e){
		e.preventDefault();
		$('#sendemail').attr({'disabled' : 'true', 'value' : 'Sending...' });
			
		$.post("include/process.php?send=comments", $("#contact-form").serialize(),		
		function(data){
			
			if(data.frm_check == 'error'){ 
				
				$("#message_post").html("<div class='alert alert-danger entrance'><button type='button' class='close' data-dismiss='alert'>x</button>ERROR: " + data.msg + "!</div>"); 
				$('#sendemail').removeAttr('disabled').attr('value', 'SEND');
				$("#message_post>div").css('opacity','1');
				$('.close').on("click",function(){
					$(this).parent().removeClass('entrance');
					$(this).parent().fadeOut();					
				});
			} else {
				$("#message_post").html("<div class='alert alert-success entrance'><button type='button' class='close' data-dismiss='alert'>x</button> Your message has been sent successfully!</div>"); 
				$("#message_post>div").css('opacity','1');
				$('#sendemail').removeAttr('disabled').attr('value', 'SEND');
				$('.close').on("click",function(){
					$(this).parent().removeClass('entrance');
					$(this).parent().fadeOut();					
				});					
			}
		}, "json");
			
		return false;
			
	});
	
	
	
	
	

	
	
	
	
	

	//--------------- PORFOLIO FUNCTIONS  ----------------------//
	
	$('.open-post').click(function(e){
		e.preventDefault();
		post_id = $(this).data('post');
		prev_post = parseInt(post_id)-1;
		next_post = parseInt(post_id)+1;
			
		if(post_id==1){
			prev_post = 6;
		}
		if(post_id==6){
			next_post = 1;
		}
		post = $('#post-'+post_id).html();
		porfolio_control = '<a class="portfolio-left" data-post="'+prev_post+'" href="#"><span class="fa fa-angle-left"></span></a><a class="portfolio-right" data-post="'+(next_post)+'" href="#"><span class="fa fa-angle-right"></span></a>';			
			
		$('#porfolio-content').html(post+porfolio_control).parent().show(1000);		
		
		visible = true
		disable_scroll();
		
		var position = $('#porfolio-content').offset().top-130;
		$('html, body').animate({scrollTop: position}, 1000, 'easeOutExpo').promise().done(function(){
			enable_scroll();
			});;
		
		move_post();		
	});
	
	//--------------- PREV/NEXT PORTFOLIO  ----------------------//
	function move_post(){
		$('.portfolio-left, .portfolio-right').click(function(e){
			e.preventDefault();
			post_idd = $(this).data('post');
			prev_post = parseInt(post_idd)-1;
			next_post = parseInt(post_idd)+1;
			
			if(post_idd==1){
				prev_post = 6;
			}
			if(post_idd==6){
				next_post = 1;
			}
			post = $('#post-'+post_idd).html();
			porfolio_control = '<a class="portfolio-left" data-post="'+prev_post+'" href="#"><span class="fa fa-angle-left"></span></a><a class="portfolio-right" data-post="'+(next_post)+'" href="#"><span class="fa fa-angle-right"></span></a>';
			
			
			$('#porfolio-content').html(post+porfolio_control);
			$('#porfolio-content').css({'opacity':0}).promise().done(function(){
				$('#porfolio-content').animate({'opacity':1},500)
			});;
			
			move_post();
		});
	}
	
	
	$('.portfolio-close').click(function(e){
		e.preventDefault();			
		$('.porfolio-content-wrapper').hide(1000);		
	});
	
	
	
	
	
	//---------------  mobile menu ----------------------//
	
	$('.btn.menu-mobile').click(function(){
	$(this).next().fadeToggle();
	return false;
	});
    
})
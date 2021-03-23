/* ==============================
 * 작성일 : 2019-06-01
 * 작성자 : 안효주, 장영석
 * 작성자의 허락없이 무단 도용시 고발 조치 합니다.
 * ============================== */

var isMobile
$(function(){
	isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	$(window).resize(function(){
		isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	})

	/* ==============================
	 * common
	 * ============================== */

	common.init() //header, footer, quick 공통 불러오기
	layerpopup();
	scroll.animation();
	
	/* ==============================
	 * main
	 * ============================== */
	if($('#headerWrap.main').length){
		main.init();
	}
	
	/* ==============================
	* content
	* ============================== */
	$(window).load(function(){
		setTimeout(function() { 
			window.scrollTo(0, 1);
		}, 100);
		if($('.loading').length){
			$('.loading').addClass('off').delay(500).queue(function(next){
				$('.loading').remove();
				common.pageTitle();
				next();
			});
		}else{
			common.pageTitle();
		}
		// sub.product();
	});
});

var common = {
	header: function(){
		var mobileSize = 1024;
		$(document).on('click','.gnbWrap .gnb>ul>li>a', function(e){
			if($(window).width() <= mobileSize){
				e.preventDefault();
				if($(this).hasClass('open')){
					$(this).removeClass('open')
					$(this).next().stop(true,false).slideUp();
				}else{
					$(this).addClass('open')
					$(this).next().stop(true,false).slideDown();
				}
			}
		});
		$(window).resize(function(){
			if($(window).width() <= mobileSize){
				$('.gnb>ul>li>a').removeClass('open');
				$('.gnb>ul>li>ul').removeAttr('style');
			}
		});
		$(document).on('mouseenter','#header .gnbWrap .gnb > ul', function(){
			if($(window).width() > mobileSize){
				$('#headerWrap').addClass('hover');
				$('#header .gnbWrap .gnb li ul, .headerBg').slideDown();
			}
		});
		$(document).on('mouseleave','#headerWrap', function(){
			if($(window).width() > mobileSize){
				$('#headerWrap').removeClass('hover');
				$('#header .gnbWrap .gnb li ul, .headerBg').slideUp();
			}
		});
	
		$(document).on('click','#header .btnMenu',function(){
			$(this).toggleClass('on');
			$('.gnbWrap').toggleClass('on');
			return false;
		});
		$(document).on('click','.gnbWrap>.bg',function(){
			$('#header .btnMenu').removeClass('on');
			$('.gnbWrap').removeClass('on');
			return false;
		});
	},
	menuActive: function(){
		if($('.gnb').length){
			var $link = $('.gnb>ul a');
			var $path = location.pathname;
			var $title = $('.pageTitle h1').text();
			$link.each(function(){
				var $this = $(this);
				var $thisTxt = $this.text();;
				var $hrefAry = $this.attr('href').split('/');
				var $href = $hrefAry.pop();
				var $category = $hrefAry.pop();
				var isActive = false;
				if(($path.indexOf($href) > -1) && ($path.indexOf($category) > -1)){
					isActive = true;
				}else if($title === $thisTxt){
					isActive = true;
				}

				if(isActive){;
					$this.parents('li').each(function(){
						$(this).children('a').addClass('on');
					})
				}
			});

			var dep1Active = $('.kb-lnb-dep1>.active');
			var lnbTit = dep1Active.children('.kb-lnb-link').text();
			if(lnbTit !== ''){
				$('.kb-sidebar').removeClass('hide');
				$('.kb-footer').removeClass('full');
				$('.kb-navbar-nav .nav-link').each(function(){
					var $this = $(this);
					var $text = $this.text();
					if(lnbTit === $text){
						$this.addClass('active');
					}
				});
			}else{
				$('.kb-sidebar').addClass('hide');
				$('.kb-footer').addClass('full');
			}
		}
	},
	include: function(){
		var $include = $('[data-include]');
		$include.each(function(i,el){
			var $this = $(this);
			var src = $this.data('include');
			var srcAry = src.split('/');
			var srcFile = srcAry.pop();
			$this.load(src,function(res,sta,xhr){
				if(sta === 'success'){
					if(srcFile === 'header.html'){
						common.menuActive();
					}
					$this.removeAttr('data-include');
				}
			});
		});
	},
	form: function(){
		$('.inputFile :file').change(function(){
			$(this).next().find('p').text($(this).val());
		})
	},
	ieScroll: function(){
		if(navigator.userAgent.match(/Trident\/7\./)){
			$('html,body').on('mousewheel',function(e){
				e.preventDefault();
	
				var wheelDelta = event.wheelDelta;
				var currentScrollPosition = window.pageYOffset;
				window.scrollTo(0,currentScrollPosition - wheelDelta);
			});
		};
	},
	button: function(){
		$(document).on('click', btnInEfList,function(e){
			var $href = $(this).attr('href');
			if($href == '#none')e.preventDefault();
		});
		var btnInEfList = 'a.button, button.button, .btnClickEf';
		$(document).on('click', btnInEfList,function(e){
			var $btnEl = $(this),
				$delay = 650;

			if(!$btnEl.is('.disabled')){
				if(!$btnEl.find('.btnClickIn').length)$btnEl.append('<i class="btnClickIn"></i>');
				var $btnIn = $btnEl.find('.btnClickIn'),
					$btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight()),
					$btnX = e.pageX - $btnEl.offset().left - $btnMax/2,
					$btnY = e.pageY - $btnEl.offset().top - $btnMax/2;
				$btnIn.css({
					'left':$btnX,
					'top':$btnY,
					'width':$btnMax,
					'height':$btnMax
				}).addClass('animate').delay($delay).queue(function(next){
					$btnIn.remove();
					next();
				});
			}
		});
	},
	pageTitle: function(){
		if($('.pageVisual').length){
			$('.pageVisual').addClass('on');
		}
	},
	init: function(){
		common.header();
		common.menuActive();
		common.include();
		common.form();
		common.ieScroll();
		common.button();
	}
}

var sub = {
	productImg:function(array){
		var $wrap = $('.productMasonry');
		if($wrap.length){
			for(var i = 0;i < array.length;i++){
				appendEl = '<div class="item"><div class="img"><img src="'+array[i]+'" alt=""></div></div>';
				$wrap.append( appendEl );
			}
		}
	},
	product:function(array) {
		var $wrap = $('.productMasonry');
		if($wrap.length){
			var msnry = $wrap.masonry({
				itemSelector: '.item',
				columnWidth: '.size',
				percentPosition: true
			});
		}
	}
}

var mainSwiper;
var main = {
	video: function(){
		var ratio = {v:16,h:9} //비디오비율 16x9
		var $winW = $(window).width();
		var $visual = $('.mainSec01 .visualBg');
		var $video = $visual.find('video');
		var $mask = $visual.find('.mask');
		var $visualW = $visual.outerWidth();
		var $visualH = $visual.outerHeight();
		var $videoW = ($visualH/ratio.h)*ratio.v;
		var $videoH = ($visualW/ratio.v)*ratio.h;
		if(isMobile){
			$video.remove(); //모바일에서 비디오 삭제(사용자 데이터 잡아먹을수 있음)
			$mask.remove();
		}else{
			if($winW < $videoW){
				$video.css({
					'width':$videoW+2,
					'height':'100%'
				});
			}else{
				$video.css({
					'width':'100%',
					'height':$videoH+2
				});
			}
		}
	},
	swiper: function(){
		mainSwiper = new Swiper('.mainSwiper', {
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		$(document).on('click','.mainSwiper .swiper-auto-ctl',function(e){
			e.preventDefault();
			if($(this).hasClass('play')){
				console.log('play');
				mainSwiper.autoplay.start();
				$(this).removeClass('play');
			}else{
				console.log('stop');
				mainSwiper.autoplay.stop();
				$(this).addClass('play');
			}
		});
	},
	header: function(){
		var scrollTop = $(window).scrollTop();
		var offsetTop = $('.mainSec02').offset().top - $('#header').outerHeight();
		
		if(scrollTop > offsetTop){
			$('#headerWrap.main').addClass('scrollBg')
		}else{
			$('#headerWrap.main').removeClass('scrollBg')
		}
	},
	init: function(){
		main.swiper();
		$(window).resize(function(){
			main.header();
			main.video();
		});
	
		$(window).scroll(function(){
			main.header();
		});
	
		$(window).resize();
	}
}

/* 레이어 팝업 */
var layerpopup = function(){
	$(document).on('click','.layerPopOpen',function(){
		var href = $(this).attr('href');
		if(!href){
			href = $(this).data('href');
		}
		layerPopOpen(href,$(this));
		return false;
	});
}
var layerPopOpen = function(target,change){
	var cont = $(target).find('.layerPopCont');
	$(target).addClass('on');
	setTimeout(function(){
		cont.focus();
	},30)
	$('body').addClass('scrollLock');
	
	cont.find('.btnPopClose').last().on('keydown',function(e){
		var code = e.which;
		if(code == 9){
			$(this).closest('.layerPopCont').focus();
		};
	});

	if(change.find('img').length){
		var imgSrc = change.find('img').attr('src');
		$(target).find('.imgPopCont img').attr('src',imgSrc)
	}
	
	layerPopClose(change);
}

var layerPopClose = function(target){
	$(document).on('click','.btnPopClose',function(){
		$(this).closest('.layerPopWrap').removeClass('on');
		$('body').removeClass('scrollLock');
		target.focus();
		
		return false;
	});
	$(document).on('click','.layerPopWrap .bg',function(){
		$(this).closest('.layerPopWrap').removeClass('on');
		$('body').removeClass('scrollLock');
		target.focus();
		return false;
	});

	$(document).on('click','.layerPopWrap',function(e){
		if($(e.originalEvent.target).hasClass('layerPopWrap')){
			$('.layerPopWrap').removeClass('on');
			$('body').removeClass('scrollLock');
			target.focus();
		}
	});
}


var scroll = {
	attr: function(target){
		$delay = target.data('delay'),
		$duration = target.data('duration');
		if($delay>0){target.css({'-webkit-animation-delay':$delay+'ms','animation-delay':$delay+'ms'})}
		if($duration>0){target.css({'-webkit-animation-duration':$duration+'ms','animation-duration':$duration+'ms'})}
	},
	wpoint: function(target){
		var Wpoint = 100,
		Wonce = false;
		if(target.data('waypoint-point')) Wpoint = target.data('waypoint-point');
		if(target.data('waypoint-once')) Wonce = target.data('waypoint-once');

		return [Wpoint,Wonce];
	},
	animation: function(){
		$(window).load(function(){
			var $elements = $( '*[data-animation]' );
			var h = $(window).height();
			$elements.each( function( i, el ) {
				var $el = $( el ),
					animationClass = $el.data('animation'),
					isClass =  false,
					check = true;

				if(animationClass === 'on' || animationClass === 'active')isClass =  true;
				var $wpoint = scroll.wpoint($el);
				if(!isClass){
					scroll.attr($el);
					var t = $el.offset().top;
					if(t > h*$wpoint[0]/100){
						$el.addClass('wait-animation');
					}
					$el.addClass('animated '+animationClass);
				}
	
				$el.waypoint(function(){
					if(check){
						check = false;
						if(isClass){
							$el.addClass(animationClass);
						}else{
							$el.removeClass('wait-animation');
						}
					}else{
						check = true;
						if(isClass){
							$el.removeClass(animationClass);
						}else{
							$el.removeClass('animated '+animationClass);
		
							setTimeout(function(){
								$el.addClass('wait-animation animated '+animationClass);
							},10)
						}
					}
				}, { offset: $wpoint[0] +'%',triggerOnce: $wpoint[1]});
			});
		});
	}
}
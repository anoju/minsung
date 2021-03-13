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
			$link.each(function(){
				var $this = $(this);
				var $hrefAry = $this.attr('href').split('/');
				var $href = $hrefAry.pop();
				var $category = $hrefAry.pop();
				var isActive = false;
				if(($path.indexOf($href) > -1) && ($path.indexOf($category) > -1)){
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

/* parallax scrolling motion */
/*
	data-animation
	data-delay : 지연시간 1초 = 1000
	data-duration : 동작시간 1초 = 1000

	[waypoint]
	data-waypoint-once : 한번만 쓸지
	data-waypoint-point : 동작 포인트 (퍼센트)
*/

var _0x13b6=['.JSnumberMotion','appendTo','.JSnumberMotionRow','type3','random','%;animation:confettiSwing','find','wait-animation','%;animation:confettiFlash\x20','text-animation','children','waypoint','ms\x20infinite\x22></span>','ms;\x22></span>','add','\x20color','*[data-animation]','replace','*[data-text-animation]','prepend','%;animation:confettiDrop\x20','animation','delay','split','animate','top','load','hover','updown','<span\x20class=\x22item\x20color','duration','toFixed','css','opacity','transition\x20','val','type2','stop','*[data-number-animation]','push','offset','.JSnumberMotionRow,.JSnumberMotion','.before','*[data-hover]','addClass','ms\x20infinite\x20ease-out\x20','data','<span\x20class=\x22item\x20item','animated\x20','append','removeClass','reverse','indexOf','<div\x20class=\x22JSnumberMotion\x22></div>','height','empty','hasClass','\x22\x20style=\x22left:','each','ms,\x20confettiDrop\x20','texteffect2','number-animation','<div\x20class=\x22after\x22></div><div\x20class=\x22before\x22></div>','waypoint-point','toString','text','space','floor','down'];(function(_0x3bd218,_0x13b60e){var _0x5c6826=function(_0x4da006){while(--_0x4da006){_0x3bd218['push'](_0x3bd218['shift']());}};_0x5c6826(++_0x13b60e);}(_0x13b6,0x1e1));var _0x5c68=function(_0x3bd218,_0x13b60e){_0x3bd218=_0x3bd218-0x0;var _0x5c6826=_0x13b6[_0x3bd218];return _0x5c6826;};animation();function animation(){hoverAnimation(),scrollAnimation(),numberAnimation(),textAnimation();}function textAnimation(){var _0x1cb6ed=_0x5c68;$(window)[_0x1cb6ed('0x1c')](function(){var _0x591eaf=_0x1cb6ed,_0x4da006=$(_0x591eaf('0x14')),_0x5a7b28=$(window)[_0x591eaf('0x38')]();_0x4da006[_0x591eaf('0x3c')](function(_0x42486b,_0x51dc98){var _0x66ad4c=_0x591eaf,_0x2160bb=$(_0x51dc98),_0x347666=_0x2160bb[_0x66ad4c('0x30')](_0x66ad4c('0xb')),_0x3a03e3=_0x2160bb[_0x66ad4c('0x43')](),_0x82948b,_0x2a7eca=0x64,_0x2c3e56=0x0;if(_0x2160bb[_0x66ad4c('0x30')](_0x66ad4c('0x20'))>0x0)_0x2a7eca=_0x2160bb['data'](_0x66ad4c('0x20'));if(_0x2160bb[_0x66ad4c('0x30')]('delay')>0x0)_0x2c3e56=_0x2160bb[_0x66ad4c('0x30')](_0x66ad4c('0x18'));_0x2160bb[_0x66ad4c('0x2e')](_0x347666),textMotionType2(_0x2160bb,_0x2a7eca,_0x2c3e56),_0x2160bb[_0x66ad4c('0xd')](function(_0x12f424){var _0x29467c=_0x66ad4c;_0x12f424==_0x29467c('0x1')&&textMotionType2(_0x2160bb,_0x2a7eca,_0x2c3e56);;},{'offset':waypointerCheck(_0x2160bb)[0x0]+'%','triggerOnce':waypointerCheck(_0x2160bb)[0x1]});});});};function numberAnimation(){var _0x5016ec=_0x5c68;$(window)[_0x5016ec('0x1c')](function(){var _0x24038d=_0x5016ec,_0x555537=$(_0x24038d('0x28')),_0x1d5d2c=$(window)[_0x24038d('0x38')]();_0x555537[_0x24038d('0x3c')](function(_0x4cad77,_0x5aee05){var _0x4e26ce=_0x24038d,_0x51828c=$(_0x5aee05);_0x51828c[_0x4e26ce('0x22')](_0x4e26ce('0x23'),0x1);if(_0x51828c['data']('number-animation')=='count'){var _0x2a134f=0x320,_0x111244=0x0,_0x27ce1a=Math[_0x4e26ce('0x0')](_0x51828c[_0x4e26ce('0x43')]());if(_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x20'))>0x0)_0x2a134f=_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x20'));if(_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x18'))>0x0)_0x111244=_0x51828c['data']('delay');waypointerCheck(_0x51828c),_0x51828c[_0x4e26ce('0xd')](function(_0x25c189){var _0x5e172d=_0x4e26ce;_0x25c189=='down'&&$({'val':0x0})[_0x5e172d('0x27')]()['delay'](_0x111244)[_0x5e172d('0x1a')]({'val':_0x27ce1a},{'duration':_0x2a134f,'step':function(){var _0x4ae46e=_0x5e172d;_0x51828c[_0x4ae46e('0x43')](addComma(Math['floor'](this[_0x4ae46e('0x25')])));},'complete':function(){var _0x3ff50b=_0x5e172d;_0x51828c[_0x3ff50b('0x43')](addComma(Math[_0x3ff50b('0x0')](this[_0x3ff50b('0x25')])));}});;},{'offset':waypointerCheck(_0x51828c)[0x0]+'%','triggerOnce':waypointerCheck(_0x51828c)[0x1]});}else{if(_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x3f'))==_0x4e26ce('0x1e')){var _0x51828c=$(_0x5aee05),_0x4ea794=_0x51828c[_0x4e26ce('0x43')]();_0x51828c['text'](addComma(Math[_0x4e26ce('0x0')](_0x4ea794)));var _0x2ef5ac=_0x51828c[_0x4e26ce('0x43')]()['split'](''),_0x1e8035=0x0;_0x51828c['text'](''),$[_0x4e26ce('0x3c')](_0x2ef5ac,function(_0x3237c1){var _0x466996=_0x4e26ce;$('<div\x20class=\x22JSnumberMotionRow\x22><div></div></div>')['appendTo'](_0x51828c);if(_0x2ef5ac[_0x3237c1]==',')_0x51828c[_0x466996('0x8')](_0x466996('0x4'))['eq'](_0x3237c1)[_0x466996('0x43')](',');else{var _0x42c376=0x0;for(var _0x102dba=0x0;_0x102dba<0x14;_0x102dba++){$(_0x466996('0x37'))[_0x466996('0x3')](_0x51828c[_0x466996('0x8')](_0x466996('0x4'))['eq'](_0x3237c1)[_0x466996('0xc')]())['text'](_0x42c376),_0x42c376>=0x9?_0x42c376=0x0:_0x42c376++;};};_0x1e8035=_0x51828c[_0x466996('0x8')](_0x466996('0x2'))['height'](),_0x51828c[_0x466996('0x22')](_0x466996('0x38'),_0x1e8035)['find'](_0x466996('0x2b'))[_0x466996('0x22')](_0x466996('0x38'),_0x1e8035),_0x51828c['waypoint'](function(_0x25d030){var _0x161a28=_0x466996;_0x25d030==_0x161a28('0x1')&&_0x1749f8();;},{'offset':waypointerCheck(_0x51828c)[0x0]+'%','triggerOnce':waypointerCheck(_0x51828c)[0x1]});function _0x1749f8(){var _0x409cf3=_0x466996,_0x3e42e9=Math[_0x409cf3('0x0')](Math[_0x409cf3('0x6')]()*0x3e8+0x1f4);_0x51828c[_0x409cf3('0x8')](_0x409cf3('0x4'))['eq'](_0x3237c1)[_0x409cf3('0xc')]()[_0x409cf3('0x22')]('margin-top','0')[_0x409cf3('0x1a')]({'margin-top':-_0x1e8035*(Math['abs'](_0x2ef5ac[_0x3237c1])+0xa)},_0x3e42e9,function(){});};});}else{var _0x5b9ba7=_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x3f')),_0x4ea794=_0x51828c[_0x4e26ce('0x43')](),_0x287393,_0x2a134f=0x64,_0x111244=0x0;_0x51828c[_0x4e26ce('0x2e')](_0x5b9ba7)[_0x4e26ce('0x43')](addComma(Math['floor'](_0x4ea794)));if(_0x51828c[_0x4e26ce('0x30')]('duration')>0x0)_0x2a134f=_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x20'));if(_0x51828c['data'](_0x4e26ce('0x18'))>0x0)_0x111244=_0x51828c[_0x4e26ce('0x30')](_0x4e26ce('0x18'));textMotionType2(_0x51828c,_0x2a134f,_0x111244),_0x51828c[_0x4e26ce('0xd')](function(_0x257bc3){var _0x224aaa=_0x4e26ce;_0x257bc3==_0x224aaa('0x1')&&textMotionType2(_0x51828c,_0x2a134f,_0x111244);;},{'offset':waypointerCheck(_0x51828c)[0x0]+'%','triggerOnce':waypointerCheck(_0x51828c)[0x1]});}}});});}function addComma(_0x2cfebf){var _0xb8446d=_0x5c68,_0x495820=/\B(?=(\d{3})+(?!\d))/g;return _0x2cfebf[_0xb8446d('0x42')]()[_0xb8446d('0x13')](_0x495820,',');};function textEffect(_0x390571,_0x4bc867){var _0x40fd99=_0x5c68,_0x38f8b2=$(_0x390571),_0x1119dd=_0x38f8b2[_0x40fd99('0x30')](_0x40fd99('0x3e')),_0x4f9148=_0x4bc867,_0x124a30,_0x588921=0x64,_0x388dce=0x0;_0x38f8b2['addClass'](_0x1119dd)[_0x40fd99('0x43')](addComma(Math[_0x40fd99('0x0')](_0x4f9148)));if(_0x38f8b2[_0x40fd99('0x30')](_0x40fd99('0x20'))>0x0)_0x588921=_0x38f8b2[_0x40fd99('0x30')](_0x40fd99('0x20'));if(_0x38f8b2[_0x40fd99('0x30')](_0x40fd99('0x18'))>0x0)_0x388dce=_0x38f8b2[_0x40fd99('0x30')](_0x40fd99('0x18'));textMotionType2(_0x38f8b2,_0x588921,_0x388dce);}function textMotionType2(_0x379751,_0x7620d2,_0x12bf37){var _0x5b90b3=_0x5c68,_0x387e19,_0x48d862=_0x379751['text']()[_0x5b90b3('0x19')](''),_0x5dc4ff=_0x48d862['length']-0x1;_0x379751[_0x5b90b3('0x43')](''),_0x379751[_0x5b90b3('0x39')](),clearTimeout(_0x387e19),$[_0x5b90b3('0x3c')](_0x48d862,function(_0x565724){var _0x2679a1=_0x5b90b3;$('<span\x20class=\x22JStextMotion\x22></span>')[_0x2679a1('0x3')](_0x379751)[_0x2679a1('0x43')](_0x48d862[_0x565724])[_0x2679a1('0x2e')](_0x48d862[_0x565724]=='\x20'?_0x2679a1('0x44'):''),_0x387e19=setTimeout(function(){var _0x5061e6=_0x2679a1;_0x379751[_0x5061e6('0x8')]('.JStextMotion')['eq'](_0x379751['data'](_0x5061e6('0x35'))?_0x5dc4ff-_0x565724:_0x565724)[_0x5061e6('0x2e')]('on');},_0x565724*_0x7620d2);});}function waypointerCheck(_0x3e6f65){var _0x49fdef=_0x5c68,_0x3850e2=0x64,_0x4c0fb2=![];if(_0x3e6f65[_0x49fdef('0x30')](_0x49fdef('0x41')))_0x3850e2=_0x3e6f65[_0x49fdef('0x30')](_0x49fdef('0x41'));if(_0x3e6f65[_0x49fdef('0x30')]('waypoint-once'))_0x4c0fb2=_0x3e6f65[_0x49fdef('0x30')]('waypoint-once');return[_0x3850e2,_0x4c0fb2];}function scrollDD(_0x4ce688){var _0x40cdbc=_0x5c68;$delay=_0x4ce688['data'](_0x40cdbc('0x18')),$duration=_0x4ce688[_0x40cdbc('0x30')](_0x40cdbc('0x20')),$delay>0x0&&_0x4ce688[_0x40cdbc('0x22')]({'-webkit-animation-delay':$delay+'ms','animation-delay':$delay+'ms'}),$duration>0x0&&_0x4ce688[_0x40cdbc('0x22')]({'-webkit-animation-duration':$duration+'ms','animation-duration':$duration+'ms'});}function scrollAnimation(){var _0x1d3ca6=_0x5c68;$(window)[_0x1d3ca6('0x1c')](function(){var _0x1e4e5b=_0x1d3ca6,_0x43f558=$(_0x1e4e5b('0x12')),_0x4d608b=$(window)[_0x1e4e5b('0x38')]();_0x43f558[_0x1e4e5b('0x3c')](function(_0x3c0b57,_0x9942eb){var _0xae1b38=_0x1e4e5b,_0x58d043=$(_0x9942eb),_0x180c5f=_0x58d043[_0xae1b38('0x30')](_0xae1b38('0x17')),_0xed1d71=_0x58d043[_0xae1b38('0x30')](_0xae1b38('0x18')),_0x15b4bd=_0x58d043[_0xae1b38('0x30')]('duration'),_0x25b8f1=!![];scrollDD(_0x58d043);var _0x406093=_0x58d043[_0xae1b38('0x2a')]()[_0xae1b38('0x1b')];_0x406093>_0x4d608b*waypointerCheck(_0x58d043)[0x0]/0x64&&_0x58d043[_0xae1b38('0x2e')](_0xae1b38('0x9')),_0x58d043[_0xae1b38('0x2e')](_0xae1b38('0x32')+_0x180c5f),_0x58d043[_0xae1b38('0xd')](function(){var _0x231b87=_0xae1b38;_0x25b8f1?(_0x25b8f1=![],_0x58d043[_0x231b87('0x34')](_0x231b87('0x9'))):(_0x25b8f1=!![],_0x58d043[_0x231b87('0x34')](_0x231b87('0x32')+_0x180c5f),setTimeout(function(){var _0x4c279a=_0x231b87;_0x58d043[_0x4c279a('0x2e')]('wait-animation\x20animated\x20'+_0x180c5f);},0xa));},{'offset':waypointerCheck(_0x58d043)[0x0]+'%','triggerOnce':waypointerCheck(_0x58d043)[0x1]});});});};function hoverAnimation(){var _0x2e00fc=_0x5c68;$(window)[_0x2e00fc('0x1c')](function(){var _0x3703e5=_0x2e00fc,_0x2a4c30=$(_0x3703e5('0x2d')),_0x577a54=$(window)['height']();_0x2a4c30[_0x3703e5('0x3c')](function(_0x38695c,_0x567878){var _0x22ecbd=_0x3703e5,_0xadaf54=$(_0x567878),_0x522580=_0xadaf54['data'](_0x22ecbd('0x1d')),_0x562df3=_0xadaf54['data'](_0x22ecbd('0x18')),_0x2a3a71=_0xadaf54[_0x22ecbd('0x30')](_0x22ecbd('0x20')),_0x1a9dc1=_0xadaf54['data']('color'),_0x435743=!![];_0xadaf54[_0x22ecbd('0x33')](_0x22ecbd('0x40')),scrollDD(_0xadaf54),_0x1a9dc1&&_0xadaf54[_0x22ecbd('0x30')](_0x22ecbd('0x1d'))[_0x22ecbd('0x36')]('line')>=0x0&&_0xadaf54[_0x22ecbd('0x8')]('.after')[_0x22ecbd('0x10')](_0xadaf54['find'](_0x22ecbd('0x2c')))[_0x22ecbd('0x22')]({'background':_0x1a9dc1}),_0xadaf54[_0x22ecbd('0x2e')](_0x22ecbd('0x24')+_0x522580);});});};function randomNumber(_0x49184c,_0x9949d2,_0x57c0c2){var _0x1c5142=_0x5c68;return(Math[_0x1c5142('0x6')]()*(_0x9949d2-_0x49184c)+_0x49184c)[_0x1c5142('0x21')](_0x57c0c2);};function complateEffect(_0x1624da,_0x520197){var _0x390440=_0x5c68;if(_0x520197>0x14)_0x520197=0x14;var _0x46c64c=$(_0x1624da),_0x2380b9=_0x520197,_0x20b219,_0xb2f92d,_0x2a7157,_0x33deeb,_0x5e46e8,_0xb4bfbf,_0x3d5d56,_0x5ee3d7=[];for(var _0x24970d=0x0;_0x24970d<_0x2380b9;_0x24970d++){_0x20b219=randomNumber(0x1,0x3,0x0),rdColor=_0x24970d%0x3+0x1,_0x2a7157=randomNumber(0x0,0x14,0x0)*0x5,_0x33deeb=randomNumber(0x4,0x12,0x0)*0x5,_0x5e46e8=randomNumber(0x0,0x1e,0x0)*0x64,_0xb4bfbf=randomNumber(0x1,0x6,0x0),_0x3d5d56=randomNumber(0x1e,0x46,0x0)*0x64;if(_0x5ee3d7[_0x390440('0x36')](_0x2a7157)>=0x0)_0x24970d--;else{_0x5ee3d7[_0x390440('0x29')](_0x2a7157);if(_0x46c64c[_0x390440('0x3a')](_0x390440('0x26')))_0x3d5d56=randomNumber(0x1e,0x46,0x0)*0x32,_0x46c64c[_0x390440('0x15')]('<span\x20class=\x22item\x20size'+_0x20b219+'\x22\x20style=\x22left:'+_0x2a7157+_0x390440('0x16')+_0x3d5d56+_0x390440('0x2f')+_0x5e46e8+_0x390440('0xf'));else _0x46c64c[_0x390440('0x3a')](_0x390440('0x5'))?(_0x3d5d56=randomNumber(0x1e,0x46,0x0)*0x32,_0x46c64c[_0x390440('0x15')](_0x390440('0x31')+_0x20b219+_0x390440('0x11')+rdColor+_0x390440('0x3b')+_0x2a7157+'%;top:'+_0x33deeb+_0x390440('0xa')+_0x3d5d56+_0x390440('0xe'))):_0x46c64c['prepend'](_0x390440('0x1f')+rdColor+_0x390440('0x3b')+_0x2a7157+_0x390440('0x7')+_0xb4bfbf+'\x20'+_0x3d5d56/0x2+'ms\x20infinite\x20'+_0x5e46e8+_0x390440('0x3d')+_0x3d5d56+'ms\x20infinite\x20ease-out\x20'+_0x5e46e8+_0x390440('0xf'));}}};

//if($('.loding-act').size() > 0){
//	//http://kottenator.github.io/jquery-circle-progress/
//	var lodingActVal = parseInt($('.loding-act .loding-txt span').text());
//	$('.loding-act').circleProgress({
//	  value: lodingActVal/100, //변수값
//	  startAngle:-Math.PI / 2, //스타트 지점설정
//	  fill : { color:"red"}, //색상값
//	  emptyFill:'silver', //뒷 색상값
//	  size:120 // 전체 사이즈
//	}).on('circle-animation-progress', function(event, progress) {
//	  $(this).find('.loding-txt').html('진도율 <br /><span>' + parseInt(lodingActVal * progress) + '%</span>');
//	});
//}
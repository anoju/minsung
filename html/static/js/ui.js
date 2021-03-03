/* ==============================
 * 작성일 : 2019-06-01
 * 작성자 : 안효주, 장영석
 * 작성자의 허락없이 무단 도용시 고발 조치 합니다.
 * ============================== */


$(function(){
	let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	$(window).resize(function(){
		isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	})

	/* ==============================
	 * common
	 * ============================== */

	include() //header, footer, quick 공통 불러오기
	clickMotion();
	layerpopup();
	header(isMobile);
	footer();
	quick();
	ieScroll();
	
	/* ==============================
	 * main
	 * ============================== */
	if($('#headerWrap.main').length){
		main();
	}
	
	/* ==============================
	* content
	* ============================== */
	imgChange();
	form();
	if($('.qprogramWrap .galleryBox').length){
		qprogram();
	}
});

function qprogram(){
	$('.galleryBox .slickWrap').slick({
		dots: false,
		arrows:true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
			  breakpoint: 1000,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			breakpoint: 450,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
		  ]
	  })
}

function form(){
	$('.inputFile :file').change(function(){
		$(this).next().find('p').text($(this).val());
	})
}

function main(){
	// nav();
	main1();
	main3();

	function nav(){
		let idx = 0;
		const length = $('#container.main > section').length -1;

		$('#container.main > section').each(function(){
			$('.mainSecNav .nav').append('<span></span>');
		});
		$('.mainSecNav .nav span').eq(idx).addClass('on')
		
	}

	function main1(){
		let idx = 0;
		const length = $('.mainSec01 .visualBg > div').length -1;
		const delay = 5000;
		let time = setInterval(timer, delay);

		$('.mainSec01 .arrow').mouseenter(function(){
			clearInterval(time);
		}).mouseleave(function(){
			time = setInterval(timer, delay);
		})

		$('.mainSec01 .arrow > a').click(function(){
			clearInterval(time);
			let btnIdx = $(this).index();
			if(btnIdx == 0){ 
				idx == 0 ? idx = length : idx--;
			} else {
				idx == length ? idx = 0 : idx++;
			}
			$('.mainSec01 .visualBg > div').eq(idx).addClass('on').siblings().removeClass('on')
			$('.mainSec01 .textBox').eq(idx).addClass('on').siblings().removeClass('on')
			return false;
		})

		function timer(){
			idx == length ? idx = 0 : idx++;
			$('.mainSec01 .visualBg > div').eq(idx).addClass('on').siblings().removeClass('on')
			$('.mainSec01 .textBox').eq(idx).addClass('on').siblings().removeClass('on')
		}
	}

	function main3(){
		const length = $('.mainSec03 .slickWrap > div').length
		$('.mainSec03 .slickWrap').slick({
			dots: false,
			arrows:false,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
				{
				  breakpoint: 1000,
				  settings: {
					slidesToShow: 2
				  }
				},
				{
				  breakpoint: 450,
				  settings: {
					slidesToShow: 1,
					variableWidth: false
				  }
				},
			  ]
		  }).on('beforeChange',function(event, slick, currentSlide, nextSlide){
			$('.mainSec03 .slickPlay .status').html('<span>0' + (nextSlide + 1) + '</span> / 0' + length)
		  });

		$('.mainSec03 .arrowBtn a').click(function(){
			if($(this).index() == 0){
				$('.mainSec03 .slickWrap').slick('slickPrev')
			}else{
				$('.mainSec03 .slickWrap').slick('slickNext')
			}
			return false;
		});

		$('.mainSec03 .slickPlay a').click(function(){
			if($(this).hasClass('play')){
				$('.mainSec03 .slickWrap').slick('slickPlay');
			}else {
				$('.mainSec03 .slickWrap').slick('slickPause');
			}
			$(this).hide().siblings('a').show();
			return false;
		})
	}
}

function imgChange(){
	if($('*[data-mo-image]').length){
		resizeImg();
		$(window).resize(function(){
			resizeImg();
		});
		
		function resizeImg(){
			const width = $(window).outerWidth();
			$('*[data-mo-image]').each(function(){
				const name = $(this).prop('tagName');
				if(name === 'IMG'){
					if( width < 768){
						$(this).attr('src',$(this).data('mo-image'));
					} else {
						$(this).attr('src',$(this).data('pc-image'));
					}
				}else{
					if( width < 768){
						$(this).css('background-image','url(' + $(this).data('mo-image') + ')');
					} else {
						$(this).css('background-image','url(' + $(this).data('pc-image') + ')');
					}
				}
			});
		};
	}
};

function header(mobileCheck){
	$(document).on('click','.asideGnb > a',function(){
		if(!$(this).hasClass('menuOpenClose')){
			$('.asideGnb').addClass('on');
			$('.gnbViewBox > div').eq($(this).index()-1).addClass('on').siblings().removeClass('on')
		}else {
			$('.asideGnb').toggleClass('on')
		}
		return false;
	});

	$(document).on('click','.asideGnb .menuView h3 a',function(){
		$(this).parent().toggleClass('on').next('ul').slideToggle();
		return false;
	});

	if(!mobileCheck){
		$(document).on('mouseenter','#header .gnbWrap .gnb > div', function(){
			$('#headerWrap').addClass('hover');
			$('#header .gnbWrap .gnb ul, .headerBg').slideDown();
		});
		$(document).on('mouseleave','#headerWrap', function(){
			$('#headerWrap').removeClass('hover');
			$('#header .gnbWrap .gnb ul, .headerBg').slideUp();
		});
	}

	scrollJS();
	$(window).scroll(function(){
		scrollJS();
	});

	function scrollJS(){
		const scrollTop = $(window).scrollTop();
		if(scrollTop > 100){
			$('#headerWrap.main').addClass('scrollBg')
		}else{
			$('#headerWrap.main').removeClass('scrollBg')
		}
	}
}

function footer(){
	$(document).on('click','#footer .btnTop',function(){
		$('html, body').animate({'scrollTop':0},1000,'easeInOutQuint')
		return false;
	});
}

function clickMotion(){
	$(document).on('click','.clickMotion',function(e){
		const width =  $(window).outerWidth();
		const $this = $(this),
			$delay = 650;
		
		if(!$this.find('.click-in').length) $this.prepend('<i class="click-in"></i>')
		
		let btnIn = $this.find('.click-in'),
			btnMax = Math.max($this.outerWidth(),$this.outerHeight()),
			btnX = e.pageX - $this.offset().left - btnMax/2,
			btnY = e.pageY - $this.offset().top - btnMax/2;

		btnIn.css({'left':btnX,'top':btnY,'width':btnMax,'height':btnMax})
			.addClass('animate').delay($delay).queue(function(next){
				btnIn.remove();
			});
	});
}

function quick(){
	const target = $('.quickWrap');
	let height = 0;
	let index = 0;
	reset();

	$(window).scroll(function(e){
		scrollCheck();
	});

	$(document).on('click','.quickViewCont .quickTab a',function(e){
		index = $(this).index();
		
		$(this).addClass('on').siblings().removeClass('on')
		target.find('.quickCont').find('> div').eq(index).addClass('on').siblings().removeClass('on').addClass('off');
		reset();
		setTimeout(function(){
			target.find('.quickCont').find('> div').removeClass('off');
		}, 300)
		return false;
	});

	$(document).on('click','.quickMenu .quick1',function(){
		target.find('.quickViewWrap').addClass('on');
		$('body').addClass('scrollLock');
		return false;
	});
	
	$(document).on('click','.quickViewWrap .bg,.quickViewCont .quickClose',function(){
		target.find('.quickViewWrap').removeClass('on');
		$('body').removeClass('scrollLock');
		return false;
	});

	$(document).on('click','.quickMenu .btnTop',function(){
		$('html, body').animate({'scrollTop':0},1000,'easeInOutQuint')
		return false;
	});

	function reset(){
		height = target.find('.quickCont').find('> div.on').outerHeight();
		target.find('.quickCont').css('height',height)
	}

	function scrollCheck(){
		const scrollTop = $(window).scrollTop();
		if (scrollTop > 200) {
			target.addClass('show')
		} else {
			target.removeClass('show')
		}
	}
}

function include(){
	$(window).load(function(){
		const $include = $('[data-include]');
		$include.each(function(i,el){
			const $this = $(this)
			const src = $this.data('include');
			const active = $('body').data('menuactive');
			$this.load(src,function(){
				$this.removeAttr('data-include');

				if(active){
					$('#header .gnbWrap .gnb > div').eq(active[0] - 1).children('a').addClass('on').next('ul').find('li').eq(active[1] - 1).find('a').addClass('on');
					$('#header .asideGnb .gnbViewBox .menuView h3').eq(active[0] - 1).addClass('on').next('ul').slideDown()
						.find('li').eq(active[1] - 1).addClass('on');
				}
			});
		});
	});
}

/* 레이어 팝업 */
function layerpopup(){
	$(document).on('click','.layerPopOpen',function(){
		let href = $(this).attr('href');
		if(!href){
			href = $(this).data('href');
		}
		layerPopOpen(href,$(this));
		return false;
	});
}

function layerPopOpen(target,change){
	let cont = $(target).find('.layerPopCont');
	$(target).addClass('on');
	setTimeout(function(){
		cont.focus();
	},30)
	$('body').addClass('scrollLock');
	
	cont.find('.btnPopClose').last().on('keydown',function(e){
		let code = e.which;
		if(code == 9){
			$(this).closest('.layerPopCont').focus();
		};
	});

	if(change.find('img').length){
		const imgSrc = change.find('img').attr('src');
		$(target).find('.imgPopCont img').attr('src',imgSrc)
	}
	
	layerPopClose(change);
}

function layerPopClose(target){
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

function ieScroll(){
	if(navigator.userAgent.match(/Trident\/7\./)){
		$('html,body').on('mousewheel',function(e){
			e.preventDefault();

			var wheelDelta = event.wheelDelta;
			var currentScrollPosition = window.pageYOffset;
			window.scrollTo(0,currentScrollPosition - wheelDelta);
		});
	};
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
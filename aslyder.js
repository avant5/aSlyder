(function(){

	// Variables here for scope, but initializing moved into load function

	var _sw; // = $("#aslyder > ul > li").width();
	var _sh; // = $("#aslyder > ul > li").height();
	var _slideCount; // = $("#aslyder").find("li").length;


	// Slide Interval
	var _t; // holder for the interval/timeout
	var _tp; // transition delay

	var _it// = 0; // flow style - snapback default (0), flow illusion = 1
	var _c; // = 0; // current slide marker set in starter - need 1 for movers, 0 for faders
	var _slideStyle; // = "slide"; // the default, unless over-ridden by css class
	var _ss; // = "snap"; // For flow illusion vs snap-back form

	var _slideDirection; // = "left"; // default - peel off direction only for peeltype() transitions
	var _slideRandom; // = false; // for peel type transition, randomize the direction. Over-rides _slideDirection when true
	var _dirs; // = ["up","down","left","right"];

	var _sp; // = 5000; // Slide pause time.  The time the slide is in display before moving to the next slide in ms.
	var _st; // = 800; // Slide transition time.  The amount of time the slide moves/fades to the next slide in ms.

	var _zIndex; // = 100 + _slideCount;

// CONTROL FUNCTIONS
	function slideright() {
		_newPos = $("#aslyder > ul > li:eq("+_c+")").position();
		$("#aslyder > ul").animate({ left : '-'+_newPos.left },_st,function(){
			t = setTimeout(slideright,_sp);

			if ( _c >= _slideCount - 1 ) {
				_c = 0;
				if ( _ss == "flow" ) {
					$("#aslyder > ul").css({ 'left' : '0' });
					_c = 1;
				}		
			} else {
				_c++;
			}
		});
	}

	function slidePeel() {

		if ( _slideRandom ) {
			_slideDirection = _dirs[Math.floor( Math.random() * _dirs.length )];
		}

		switch ( _slideDirection ) {
			case "up":
				$("#aslyder > ul > li:eq("+ _c +")").animate({top:-_sh},_st,function(){
					if ( _c >= _slideCount - 1 ) {
						$("#aslyder > ul > li").animate({top:'0',left:'0'},0);
						_c = 0;
						t = setTimeout(slidePeel,_sp);
					} else {
						_c++;
						t = setTimeout(slidePeel,_sp);
					}
				});
				break;
			case "left":
				$("#aslyder > ul > li:eq("+ _c +")").animate({left:-_sw},_st,function(){
					if ( _c >= _slideCount - 1 ) {
						$("#aslyder > ul > li").animate({top:'0',left:'0'},0);
						_c = 0;
						t = setTimeout(slidePeel,_sp);
					} else {
						_c++;
						t = setTimeout(slidePeel,_sp);
					}
				});
				break;

			case "right":
				$("#aslyder > ul > li:eq("+ _c +")").animate({left:_sw},_st,function(){
					if ( _c >= _slideCount - 1 ) {
						$("#aslyder > ul > li").animate({top:'0',left:'0'},0);
						_c = 0;
						t = setTimeout(slidePeel,_sp);
					} else {
						_c++;
						t = setTimeout(slidePeel,_sp);
					}
				});
				break;

			default:
				$("#aslyder > ul > li:eq("+ _c +")").animate({top:_sh},_st,function(){
					if ( _c >= _slideCount - 1 ) {
						$("#aslyder > ul > li").animate({top:'0',left:'0'},0);
						_c = 0;
						t = setTimeout(slidePeel,_sp);
					} else {
						_c++;
						t = setTimeout(slidePeel,_sp);
					}
				});

		}

		navUpdate(_c);
	}

	function fadetype() {
		// Fade out each slide in succession from the top down
		if ( _c == _slideCount - 1) {
			// Last slide, so reset
			$("#aslyder > ul > li:eq(0)").fadeIn(_st,function(){
				$("#aslyder > ul > li").show().css({'opacity':'1'});
				t = setTimeout(fadetype,_sp);
			});
			_c = 0;
		} else {
			$("#aslyder > ul > li:eq("+_c+")").fadeOut(_st,function(){
				t = setTimeout(fadetype,_sp);
			});
			_c++;
		}
		navUpdate(_c);
		
	}

	function navUpdate(_i) {
		if ( $("#aslyder-nav").length ) {
			$("#aslyder-nav").find("li").removeClass("aslyder-active-slide");
			$("#aslyder-nav li:eq(" + _i + ")").addClass("aslyder-active-slide");
		}
	}



// INITIALIZERS AND STARTERS
	$(document).ready(function(){
	});

	$(window).on("load",function() {

		// INITIALIZE VARIABLES HERE - Bugs out of initializing outside of load function
		_sw = $("#aslyder > ul > li").width();
		_sh = $("#aslyder > ul > li").height();
		_slideCount = $("#aslyder").find("li").length;
		_slideStyle = "slide";
		_ss = "snap";
		_slideDirection = "left";
		_slideRandom = false;
		_dirs = ["up","down","left","right"];
		_sp = 5000;
		_st = 800;
		_c = 0;
		_it = 0;
		_zIndex = 100 + _slideCount;


		$("#aslyder-nav").html("<ul></ul>");
		$("#aslyder > ul > li").each(function(_index){
			$("#aslyder-nav ul").append('<li><a href="#"' + (_index + 1) + "</a></li>");
		});
		$("#aslyder-nav > ul > li:first-child").addClass("aslyder-active-slide");

		// CONFIG VARIABLE SETS

		if ( $("#aslyder").hasClass("fadetype") || $("#aslyder").hasClass("aslyder-fade") ) {
			_slideStyle = "fade";
		}
		if ( ($("#aslyder").hasClass("contslide") || $("#aslyder").hasClass("aslyder-flow")) && (!$("#aslyder").hasClass("fadetype") && !$("#aslyder").hasClass("aslyder-fade")) ) {
			$("#aslyder > ul > li:first-child").clone().appendTo("#aslyder > ul");
			_slideCount++;
			
			_ss = "flow";
		}
		var _q = $("#aslyder").attr("class");
		if (_q) {
			var _qx = _q.split(/\s+/);
			$.each(_qx,function(ii,vv) {
				// Most of these have migrated to class checks.  This is only needed where it needs to be split to set a variable
				if ( vv.substr(0,6)=="pause-" ) {
					_sp = vv.substr(6);
					if ( isNaN(_sp) ) { _sp = 3000; } else { _sp = Math.abs(_sp); }
				}
				if ( vv.substr(0,5)=="peel-" ) {
					_slideStyle = "peel";
					$("#aslyder > ul > li:first-child").clone().appendTo("#aslyder > ul");
					_slideDirection = vv.substr(5);
					switch ( _slideDirection ) {
						// guarantee a proper direction. This way, cuz I suck at regexes!
						case "up":
						case "left":
						case "right":
						break;
						case "random":
							_slideRandom = true;
							_slideDirection = "down"; // not needed, but just in case
						default:
							_slideDirection = "down";
					}
				}
				if ( vv.substr(0,6)=="speed-" ) {
					_st = vv.substr(6);
					if ( isNaN(_st) ) { _st = 800; } else { _sp = Math.abs(_sp); }
				}

			});
		}

		switch ( _slideStyle ) {
			case "fade":
			case "peel":
				// Reverse the stacking order so first slide is on top
				$("#aslyder").find("li").each(function(){
					$(this).css({'z-index':_zIndex,'position':'absolute'});
					_zIndex--;
				});
			break;

			case "slide":
			default:
				// standard slide style
		}

		console.log("Slide count: " + _slideCount); // DEBUG

		// Intervals include the transition time, so the transition does not reduce the slide display time.
		switch ( _slideStyle ) {
			case "fade":
				t = setTimeout(fadetype,_sp);
			break;
			case "peel":
				t = setTimeout(slidePeel,_sp);
			break;
			default:
				_c = 1;
				t = setTimeout(slideright,_sp);
		}
	});

})(jQuery);
jQuery(document).ready(function() {
	
	"use strict";
	
	
	// ========== Custom Data Attribute ========== //
	$("*").css('height', function () {
		return $(this).attr('data-height')+'px'
	});
	
	$("*").css('color', function () {
		return $(this).data('color')
	});
	
	$("*").css('opacity', function () {
		return $(this).data('opacity')
	});
	
	$("*").css('background-color', function () {
		return $(this).data('bg-color')
	});
	
	
	// ========== Smooth scroll to content section ========== //
	// Cache selectors
	var lastId,
		topMenu = $(".nav-menu"),
		topMenuHeight = topMenu.outerHeight()-924,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
	
	// Bind click handler to menu items
	menuItems.click(function(e){
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 500);
		e.preventDefault();
	});
	
	// Bind to scroll
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop()+topMenuHeight;
	   
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
				return this;
			});

		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
	   
		if (lastId !== id) {
			lastId = id;
			menuItems
				.parent().removeClass("active")
				.end().filter("[href=#"+id+"]").parent().addClass("active");
		}                   
	});
	
	
	// ========== Add class to Text Number ========== //
	$('.number').html(function(i, v){
		return v.replace(/(\d)/g, '<span class="font-number">$1</span>');
	});
	
	
	// ===== Load Progress Bar When Scroll To Element ===== //
	var progressBar = ".progress-bar-wrapper:in-viewport";
	
	function loadDaBars() {
		$('.progress-bar').css('width',  function() {
			return ($(this).attr('data-percentage')+'%')
		});
		
		$('.progress-title').css('opacity', '1');
	}
	
	$(window).on("scroll", function(){
		$(progressBar).each(function(){
			loadDaBars();
		});
	});
	
	
	// ===== jQuery FitVids Settings ===== //
	$(".video-wrapper").fitVids();
	
});
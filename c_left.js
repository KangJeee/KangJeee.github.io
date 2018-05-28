$(function(){
	var i = 2;
	function plus(){
		var imax = i + 13;
		for(i; i < imax; i++)
			$('body').append("<button id='button1' onClick=\"parent.c_right.location.href='c_lecture.html'\">강의" + i +"</button>");
	}
	plus();
	$(window).scroll(function(){
		var scrollHeight = $(window).scrollTop() + $(window).height();
		var documentHeight = $(document).height();

		if(scrollHeight >= documentHeight - 10)
			plus();
	})
});
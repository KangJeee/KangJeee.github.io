$(function(){
	function plus(){
		for(var i = 0; i < 10; i++)
			$('body').append("	<li class='lectureMedia'><div id='videos'><img src='http://placehold.it/100x100'/><a href = '#''></div><div style='margin-top: 40px;''><strong> 인터넷 강의 </strong></div></li>");
	}
	plus();
	$(window).scroll(function(){
		var scrollHeight = $(window).scrollTop() + $(window).height();
		var documentHeight = $(document).height();

		if(scrollHeight >= documentHeight - 10)
			plus();
	})
});
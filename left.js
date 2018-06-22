var hours = 0;
var minutes = 0, dmin = 0;
var sec = 0, dsec = 0;;
$(function(){
	var timer = setInterval(function(){
		hours = Math.round(sec/60/60);
		minutes = Math.round(sec/60);
		dmin = minutes%60;
		sec++;
		dsec = Math.round(sec%60);
		$('#Num').empty();
		$('#Num').append(numdate(hours) + ":" + numdate(dmin) + ":" + numdate(dsec));
	}, 1000);
	function numdate(date){
		if(date<10)
			return "0"+date;
		else
			return date;
	}
})
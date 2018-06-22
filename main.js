$(function(){
	/*웹 페이지 로딩시 크기가 커졌다 작아짐*/
	var j = 0;
	var start2;
	var start;
	var tab = false;
	start = setInterval(sizeup, 1);

	function sizeup(){
			$('.psp-form').css('width', j+'%');
			$('.psp-form').css('height', j+'%');
			j = j + 10;
			if(j > 88){
				clearInterval(start);
				start2 = setInterval(sizedown,1);
			}
	}

	function sizedown(){
			$('.psp-form').css('width', j+'%');
			$('.psp-form').css('height', j+'%');
			j--;
			if(j < 80){
				clearInterval(start2);
			}
	}

	/*로그인 버튼 클릭 시 로그인 창 출력*/
	$('#login_btn').mousedown(function(){
		$('.login-page').css('display','block');
				
		var i = 0;
		var interval = setInterval(login_up,1);

		function login_up(){
			$('.login-page').css('width', i+'px');
			$('.form').css('width', i+'px');
			$('.form').css('height', i/3*2 +'px');
			i = i + 15;
			if(i > 340){
				clearInterval(interval);
			}
		};
	});

	/*로그인 닫기 버튼 클릭시 로그인창 다운*/
	$('#login_close').mousedown(function(){
		var k = 340;
		var interval2 = setInterval(login_down,1);

		function login_down(){
			$('.login-page').css('width', k+'px');
			$('.form').css('width', k+'px');
			$('.form').css('height', k/3*2 +'px');
			k = k - 15;
			if(k < 0){
				clearInterval(interval2);
				$('.login-page').css('display','none');
			}
		}
	});

	/*메뉴버튼을 눌렀을시 메뉴 출력*/
	$('.btn_tab').mousedown(function(){
		if(tab){
			var f = 100;
			var interval4 = setInterval(menu_up,1);

			function menu_up(){
				$('li').css('width', f+'px');
				f = f - 3;
				if(f < 2){
					clearInterval(interval4);
					$('li').css('display','none');
					tab = false;
				}
			}
		}
		else{
			var f = 0;
			$('li').css('display','block');
			var interval3 = setInterval(menu_up,1);

			function menu_up(){
				$('li').css('width', f+'px');
				f = f + 3;
				if(f > 100){
					clearInterval(interval3);
					tab = true;
				}
			}
		}
	});
		
});
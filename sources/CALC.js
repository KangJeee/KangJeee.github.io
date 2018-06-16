document.write("<script src = './sources/math.js'></script>");

$(function() {
    /*계산영역 변수*/
    var header = ".calc-header";
    var body = ".calc-body";
    var $buttons = $("button");
    var $past_string = '';
    var x, y, z;
    var f, g, w;
    var x_count, y_count, z_count;
    var f_count, g_count;
    var fval, gval, fname, gname;
    var xp, yp;
    var realScale = 10;

    w = "x*x+2x+1";
    /*그래프 구현 영역*/
    $('body').mousedown(function draw() {

        var parser = math.parser();

        function fun1(x) {return eval(fval);}
        function fun2(x) {return eval(gval);}
        var canvas = document.getElementById("canvas");
        if (null==canvas || !canvas.getContext) return;

        var axes={}, ctx=canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
        axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
        axes.scale = realScale;                 // 40 pixels from x=0 to x=1
        axes.doNegativeX = true;
        

        showAxes(ctx,axes);
        //그래프를 그리는 부분
        funGraph(ctx,axes,fun1,"rgb(11,153,11)",0); 
        funGraph(ctx,axes,fun2,"rgb(66,44,255)",1);
    });
    function funGraph (ctx,axes,func,color,thick) {
        var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
        var iMax = Math.round((ctx.canvas.width-x0)/dx);
        var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
        var w=ctx.canvas.width;
        var h=ctx.canvas.height;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        for (var i=iMin;i<=iMax;i++) {
            xx = dx*i; yy = scale*func(xx/scale);
            if (i==iMin){ 
                ctx.moveTo(x0+xx,y0-yy);
            }
            else ctx.lineTo(x0+xx,y0-yy);

            /*함수이름을 표시할 좌표값 저장*/
            if(y0-yy <= 15 && y0-yy >= 0)
            {
                xp = x0+xx + 5; yp = y0-yy + 15;
            }
            else if(y0-yy >= h-15 && y0-yy <= h)
            {
                xp = x0+xx + 5; yp = y0-yy - 15;
            }
            else if(x0+xx >= w-10 && y0-yy > 5)
            {
                xp = x0+xx - 15; yp = y0-yy + 10;
            }
            else if(x0+xx <= 10 && y0-yy > 5)
            {
                xp = x0+xx + 15; yp = y0-yy + 10;
            }
        }
        var funcName = new Array(fname, gname);

        ctx.font='10px Gulim';
        if(funcName[thick] != null)
            //함수 이름을 표시
            ctx.strokeText(funcName[thick], xp, yp);
        ctx.stroke();

        ctx.closePath();
    }

    function showAxes(ctx,axes) {
        var x0=axes.x0, w=ctx.canvas.width;
        var y0=axes.y0, h=ctx.canvas.height;
        var xmin = axes.doNegativeX ? 0 : x0;
        var count = y0 + axes.scale;
        var numCount = 0;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)"; 
        ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
        ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
        /*눈금을 그린다.*/
        ctx.font='8px Gulim';
        /*눈금을 표시하는 영역*/
        while(count < h){
            numCount--;
            ctx.moveTo(x0 - 4, count);
            ctx.lineTo(x0 + 4, count);
            ctx.strokeText(numCount, x0 + 5, count)
            count = count + axes.scale;
        }
        count = y0 - axes.scale;
        numCount = 0;
        while(count > 0){
            numCount++;
            ctx.moveTo(x0 - 4, count);
            ctx.lineTo(x0 + 4, count);
            ctx.strokeText(numCount, x0 + 5, count - 2)
            count = count - axes.scale;
        }
        count = x0 - axes.scale;
        numCount = 0;
        while(count > 0){
            numCount--;
            ctx.moveTo(count, y0 - 4);
            ctx.lineTo(count, y0 + 4);
            ctx.strokeText(numCount, count - 3, y0 - 5)
            count = count - axes.scale;
        }
        count = x0 + axes.scale;
        numCount = 0;
        while(count < w){
            numCount++;
            ctx.moveTo(count, y0 - 4);
            ctx.lineTo(count, y0 + 4);
            ctx.strokeText(numCount, count - 3, y0 - 5)
            count = count + axes.scale;
        }
        //그린다
        ctx.stroke();

    }
    /*캔버스 위에서 확대 및 축소 이벤트(좌클릭, 우클릭)*/
    $('#canvas').mousedown(function (e) { 
        if(e.which == 1)
            realScale++;
        else if(e.which == 3)
            if(realScale>4) realScale--;
    });

    /*계산기 구현 영역*/
    $buttons.mousedown(function (){
        var newVal = $(this).val();
        var $inval = $("#inval");
        var $oldval = $inval.val();

        /* for math.parser use */
        var parser = math.parser();

        if(newVal == 'ex')  //Ex버튼을 입력받았을 때
        {
            $past_string += '<BR>';
            try
            {
                /*split을 사용하여 변수저장유무 학인후 조치*/
                var token = $oldval.split('=');
                if(token[0] == 'x' && token[1] != null){
                    x = $oldval; x_count = 1; $oldval = '';
                }
                if(token[0] == 'y' && token[1] != null){
                    y = $oldval; y_count = 1; $oldval = '';
                }
                if(token[0] == 'z' && token[1] != null){
                    z = $oldval; z_count = 1; $oldval = '';
                }
                if(x_count == 1)
                    parser.eval(x.toString());
                if(y_count == 1)
                    parser.eval(y.toString());
                if(z_count == 1)
                    parser.eval(z.toString());

                /*split을 사용하여 함수저장유무 학인후 조치*/
                if((token[0] == 'f(x)' || token[0] == 'f(y)' || token[0] == 'f(z)' ||
                    token[0] == 'f(x,y)' || token[0] == 'f(x,z)' || token[0] == 'f(y,x)' ||
                    token[0] == 'f(x,z)' || token[0] == 'f(z,x)' || token[0] == 'f(z,y)' ||
                    token[0] == 'f(x,y,z)' || token[0] == 'f(x,z,y)' || token[0] == 'f(y,x,z)' ||
                    token[0] == 'f(y,z,x)' || token[0] == 'f(z,x,y)' || token[0] == 'f(z,y,x)')
                    && token[1] != null)
                {
                    f = $oldval; f_count = 1; $oldval = ''; fval = token[1]; fname = token[0];
                    /*그래프를 그릴때 Math의 메소드를 사용하기 위함*/
                    if(fval.match('sin')) fval = fval.replace(/sin/gi,'Math.sin');
                    if(fval.match('cos')) fval = fval.replace(/cos/gi,'Math.cos');
                    if(fval.match('tan')) fval = fval.replace(/tan/gi,'Math.tan');
                    if(fval.match('exp')) fval = fval.replace(/exp/gi,'Math.exp');
                    if(fval.match('log')) fval = fval.replace(/log/gi,'Math.log');
                    if(fval.match('sqrt')) fval = fval.replace(/sqrt/gi,'Math.sqrt');
                }
                if((token[0] == 'g(x)' || token[0] == 'g(y)' || token[0] == 'g(z)' ||
                    token[0] == 'g(x,y)' || token[0] == 'g(x,z)' || token[0] == 'g(y,x)' ||
                    token[0] == 'g(x,z)' || token[0] == 'g(z,x)' || token[0] == 'g(z,y)' ||
                    token[0] == 'g(x,y,z)' || token[0] == 'g(x,z,y)' || token[0] == 'g(y,x,z)' ||
                    token[0] == 'g(y,z,x)' || token[0] == 'g(z,x,y)' || token[0] == 'g(z,y,x)')
                    && token[1] != null)
                {
                    g = $oldval; g_count = 1; $oldval = ''; gval = token[1]; gname = token[0];
                    if(gval.match('sin')) gval = gval.replace(/sin/gi,'Math.sin');
                    if(gval.match('cos')) gval = gval.replace(/cos/gi,'Math.cos');
                    if(gval.match('tan')) gval = gval.replace(/tan/gi,'Math.tan');
                    if(gval.match('exp')) gval = gval.replace(/exp/gi,'Math.exp');
                    if(gval.match('log')) gval = gval.replace(/log/gi,'Math.log');
                    if(gval.match('sqrt')) gval = gval.replace(/sqrt/gi,'Math.sqrt');
                }
                if(f_count == 1)
                    parser.eval(f.toString());
                if(g_count == 1)
                    parser.eval(g.toString());

                /*수식 계산*/
                var result = parser.eval($oldval);
                
            }
            catch(Exception)
            {
                 $('#past').html(Exception);
                 return 0;
            }
            if(result != null)
            {
                $('#past').html($past_string);
                $past_string += result;
            }
        }
        else if(newVal == 'AC') //AC버튼을 입력받았을 때
        {
            $past_string = '';
            $('#past').html($past_string);
            var result = null;
        }
        else if(newVal == 'func')
        {
            var obj = $("#id_func").offset();
            $("#selector_func").css("top", obj.top - 40);
            $("#selector_func").css("left", obj.left  - 85);
            $("#selector_func").show();
            var result = $oldval;
        }
        else if(newVal == 'ang')
        {
            var obj = $("#id_ang").offset();
            $("#selector_ang").css("top", obj.top - 40);
            $("#selector_ang").css("left", obj.left  - 135);
            $("#selector_ang").show();
            var result = $oldval;
        }
        else if(newVal == 'const')
        {
            var obj = $("#id_const").offset();
            $("#selector_const").css("top", obj.top - 40);
            $("#selector_const").css("left", obj.left  - 85);
            $("#selector_const").show();
            var result = $oldval;
        }
        else if(newVal == 'logic')
        {
            var obj = $("#id_logic").offset();
            $("#selector_logic").css("top", obj.top - 40);
            $("#selector_logic").css("left", obj.left  - 160);
            $("#selector_logic").show();
            var result = $oldval;
        }
        else if(newVal == 'bracket')
        {
            var obj = $("#id_bracket").offset();
            $("#selector_bracket").css("top", obj.top - 40);
            $("#selector_bracket").css("left", obj.left  - 60);
            $("#selector_bracket").show();
            var result = $oldval;
        }
        else if(newVal == 'matrix')
        {
            var obj = $("#id_matrix").offset();
            $("#selector_matrix").css("top", obj.top - 40);
            $("#selector_matrix").css("left", obj.left  - 160);
            $("#selector_matrix").show();
            var result = $oldval;
        }
        else if(newVal == 'var')
        {
            var obj = $("#id_var").offset();
            $("#selector_var").css("top", obj.top - 40);
            $("#selector_var").css("left", obj.left  - 110);
            $("#selector_var").show();
            var result = $oldval;
        }
        else if(newVal == 'dfunc')
        {
            var obj = $("#id_dfunc").offset();
            $("#selector_dfunc").css("top", obj.top - 40);
            $("#selector_dfunc").css("left", obj.left  - 160);
            $("#selector_dfunc").show();
            var result = $oldval;
        }
        else if(newVal == 'back')
        {
            if($oldval != '')
            {
                var result = $oldval.slice(0, -1);
                $past_string = $past_string.slice(0,-1);
                $('#past').html($past_string);
                $inval.val(result);

            }
        }
        else
        {
            var result = $oldval+newVal;
            $past_string += newVal;
            $('#past').html($past_string);
        }
        $inval.val(result);
        $('#past').html($past_string);
    });

    /*구조선택자 이벤트 처리*/
    $('.selector_btn').mouseover(function(){
            $(this).css("background-color", "#008CBA");
    });
    $('.selector_btn').mouseout(function(){
            $(this).css("background-color", "#00BCEA");
    });
    /*마우스가 떨어졌을 때 구조선택자가 사라짐*/
    $('body').mouseup(function(){
        $(".selector").hide();
    });
    $('.selector_btn').mouseup(function(){
        var newVal = $(this).val();
        var $inval = $("#inval");
        var $oldval = $inval.val();
        var parser = math.parser();

        var result = $oldval+newVal;
        $past_string += newVal;
        $('#past').html($past_string);
        $inval.val(result);
        $(".selector").hide();
    });
});

$(function(){
	$(document).delegate(".own-option,.option-m,.timetable-btn,.time-list","click",function(){
		var e = e || window.event;
    	var _o = e.target || e.srcElement;
    	var $ops = $(_o).parents(".timetable");
    	if ($(_o).hasClass("own-option")) {
    		var $ot = $(_o).parent().siblings(".timetable");
    		$ot.fadeIn();
    		var _init = $ot.attr("data-init");
    		//判断日历表格  是否已经初始化  如果data-init存在 则不需要任何操作  否则需要初始化数据
    		if (!_init) {
    			//调用初始化的函数
    			dateInit($(_o).parent().siblings(".timetable"));
    		}
    		
    	}else if ($(_o).hasClass("option-m")) {
    		//点击上一月  下一月的时候 重新刷新日历表格
    		var _type = $(_o).parent().attr("data-type");
    		var _tm = getTodayD("m"),_ty = getTodayD("y"),_showym = $ops.find(".y-month-"+_type).html().split("/");
    		console.log(_showym);

    		//获取到的 年 月 调用函数 updataDate() 进行处理
    		updataDate(parseInt(_showym[0]),parseInt(_showym[1]),$(_o).attr("data-type"),$ops.find(".time-lists-"+_type));

    	}else if ($(_o).hasClass("timetable-btn")) {
    		var _sD = $ops.siblings(".timetable-start").val(),_eD = $ops.siblings(".timetable-end").val();
    		// console.log((new Date(_sD)).getTime());
    		if((new Date(_sD)).getTime() - (new Date(_eD)).getTime() > 0) return false;
    		$(_o).parents(".timetable").fadeOut();
    		//进行其它操作
    	}else if ($(_o).hasClass("time-list")) {
    		//点击时间按钮 的时候 更新数据表单的数据
    		var $tp = $(_o).parent(),_type = $tp.attr("data-type");
    		var _ym = $ops.find(".y-month-"+_type).html(),_ymd = _ym+ "/" + $(_o).html();
    		$ops.siblings(".timetable-"+_type).val(_ymd);
    	}
	})

	/**
     * 得到 今天的日期  y/m/d y-m-d  
     * type [年月日的连接方式]  ymd返回的y | m | d  默认y-m-d
     */   
    function getTodayD(ymd,type){
    	var data = {
    		"_y": (new Date()).getFullYear(),
    		"_m": (new Date()).getMonth() + 1,
    		"_d": (new Date()).getDate()
    	}
    	if (!type && !ymd) return data['_y']+"-"+data['_m']+"-"+data['_d'];
    	if (!ymd && type) return data['_y']+type+data['_m']+type+data['_d'];
    	ymd = ymd.split("");
    	var result = '';
    	for(var i = 0; i<ymd.length;i++){
    		i > 0 ? (result += type + data['_'+ymd[i]]) : (result += data['_'+ymd[i]]);
    	}
    	return result;
    }

     /**
     * 判断是否为闰年
     */
    function isLeapYear(year){
    	return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0); 
    }

    /**
     * 初始化的函数  
     */
    
    function dateInit(obj){
    	var _y = parseInt(getTodayD('y')),_m = parseInt(getTodayD('m')),_d = parseInt(getTodayD('d'));

	    obj.find(".y-month").html(_y+"/"+_m);
	    //得到月份  判断 是否 是闰年
	    template(_d,obj.find(".time-lists-start"));
	    template(_d,obj.find(".time-lists-end"));
    }

    /**
     * 模板 函数
     */
    function template(_d,obj){
    	var darr = [_d];
	    while (--_d) {
	    	darr.push(_d);
	    }
	    darr = darr.reverse();
	    var _html = '';
	    for(var i=0;i<darr.length;i++){
	    	_html += '<a href="javascript:;" data-d="'+darr[i]+'" class="time-list">'+(darr[i] < 10 ? "0"+darr[i] : darr[i])+'</a>';
	    }
	    obj.html('').append(_html);
    }


    /**
     * 根据 传入的年月  重新渲染日期模板
     */
    
    function updataTemp(y,m,obj){
    	var _d = 0;
    	//判断是不是 当月
    	if(m === parseInt(getTodayD("m"))){
    		_d = parseInt(getTodayD('d'));  		
    	}else {
    		//不是当月  首先判断是不是二月
    		if (m === 2) {
    			//判断是不是闰年
    			isLeapYear(y) ? _d=29 : _d=28;
    		}else if (m == 2 || m == 4 || m == 6 || m == 9 || m == 11) {
    			_d = 30;
    		}else {
    			_d = 31;
    		}
    	}
    	template(_d,obj);
    }

    /**
     * 更新加载 日期表格  
     */
    function updataDate(y,m,type,obj){
    	if (!y || !m || !type) return false;
    	console.log(type);
    	switch (type) {
    		case "left":
    			// 月份 减去1
    			--m === 0 ? y--&&(m=12) : '';
    			break;
    		case "right":
    			//判断当前月份  和 ++m的大小
    			m++;
    			if (y >= parseInt(getTodayD("y"))) {
    				if(m > parseInt(getTodayD("m"))) return false;
    			}
    			m === 13 ? y++&&(m=1) : '';
    			break;
    		default:
    			// statements_def
    			break;
    	}
    	obj.siblings().children(".y-month").html(y + "/" + (m < 10 ? "0"+m : m));
    	updataTemp(y,m,obj);
    }
});
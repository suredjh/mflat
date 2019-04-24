/**
 * tools function
 * author djh
 * timer 2017 02 17 begin
 */
var _c = {
	isLeapYear: function(year){
		return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
	},
	/**
	 * 得到今天的日期
	 * type [年月日的连接方式]  ymd返回的y | m | d  默认y-m-d
	 */
	getTodayD: function(ymd,type){
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
	},
	/**
     * 获取时间列表  以天为单位  _tody  今天的日期 type时间列表的类型/-：  _month 当前的月份 _num获取时间节点的个数
     */
    getDateList: function(_month,_tody,_num,callback,type){
    	if(!_month || !_tody || !_num) return false;
    	_month = parseInt(_month);
    	_tody = parseInt(_tody);
    	type = type || "/";
    	var _xdate = [];
    	// if(_tody >= type)
    	for(var i= 0; i < _num; i++){
    		if (_tody == 0) {
    			--_month == 0 ? _month = 12 : '';
    			if (_month == 2) {
    				isLeapYear(parseInt(getTodayD("y"))) ? _tody = 29 : _tody = 28;
    			}else if(_month == 1 || _month == 3 || _month == 5 || _month == 7 || _month == 8 || _month == 10 || _month == 12){
    				_tody = 31;
    			}else {
    				_tody = 30;
    			}
    		}
    		_xdate.push(_month+type+(_tody--));
    	}
    	callback&&callback(_xdate.reverse());
    },
    /**
     * 简单的鼠标 拖动效果  dragObj鼠标放的区域  moveObg要拖动的对象
     */
    dragMove: function(dragObj,moveObg){
        var _start = _move =  _offset = {};
        dragObj.on("mousedown",function(e){
            e = e || window.event;
            _start = {
                "left": moveObg.offset().left,
                "top": moveObg.offset().top,
                "px": e.pageX,
                "py": e.pageY
            };
            $(document).on("mousemove",function(ev){
                ev = ev || window.event;
                _move = {
                    "px": ev.pageX,
                    "py": ev.pageY
                };
                _offset = {
                    _mleft: _move.px - _start.px,
                    _mtop: _move.py - _start.py
                }
                _start.px = _move.px;
                _start.py = _move.py;
                moveObg.css({
                    "left": _start.left + _offset._mleft + "px",
                    "top": _start.top + _offset._mtop + "px"
                });
                _start.left = _start.left + _offset._mleft;
                _start.top = _start.top + _offset._mtop;
                console.log(_offset);
            })
            $(document).on("mouseup",function(e){
                $(document).off("mousemove");
                $(document).off("mouseup");
                return false;
            })
        })
    },
    /**
     * 倒计时读秒 函数  *obj count  
     */
    countDown: function(obj,count,callback){
        var _this = arguments.callee;
        if (count) {
            obj.html(count-- +"s");
            setTimeout(function(){
                _this.call(null,obj,count);
            },1000)
        }else {
            callback && callback();
        }
    },
    //未完待续。。。
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,'');
}
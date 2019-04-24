$(function(){
	var toolPosition = '';
	if (navigator.appName === 'Microsoft Internet Explorer') { //判断是否是IE浏览器
	    if (navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i)) { //判断浏览器内核是否为Trident内核IE8.0
	        console.info('IE8');
	        toolPosition = ["40%","80%"];
	    }
	}
	$(".sort-select").on("click",function(){
    	$(this).attr("data-type") == "up" ? ($(this).parents(".sort-btn").addClass("up").addClass("active").siblings().removeClass("active")) : ($(this).parents(".sort-btn").removeClass("up"));
    });
	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,'');
	}
	function lineImg(_data,callback){
		var option = {
		    title: {
		        // text: _data.title,
		        subtext: '侵权数/条',
		        // padding: 10,
		        left: 40,
		        textStyle: {
		        	color: "#999",
		        	fontSize: "16"
		        }
		    },
		    tooltip: {
		        trigger: 'axis',//提示框配置项
		        position: toolPosition
		    },
		    legend: {
		        data: _data.legend,
		        // backgroundColor:'rgba(128, 128, 128, 0.5)'
		        top: 10
		    },
		    toolbox: {
		        show: false,
		        feature: {
		            // dataZoom: {
		            //     yAxisIndex: 'none'
		            // },
		            // dataView: {readOnly: false},
		            // magicType: {type: ['line', 'bar']},
		            // restore: {},
		            saveAsImage: {}
		        },
		        right: 30,
		        top: 10
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: true,
		        data: _data.xAxis,
		        offset: 3,
		        minInterval: 1,
		        // axisLabel: {
	         //        interval: 1
	         //    },
	            axisTick: {
	            	interval:  0 //强制显示所有刻度
	            }
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value}'+_data.yAxis
		        }
		    },
		    series: [
		        {
		            name: _data.legend[0],
		            type:'line',
		            smooth: true,//是否显示平滑的曲线
		             areaStyle: {normal: {
		            	color: "#ffbbb2"
		    //         	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						//   offset: 0, color: '#fbc2c2' // 0% 处的颜色
						// }, {
						//   offset: 1, color: '#fffefe' // 100% 处的颜色
						// }], false)
		            }},
		            //symbol: "circle",//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' 'url'
		            // symbolSize: 10,//设置  尺寸
		            itemStyle: {
		            	normal: {
		            		borderColor: "#f35c48" //改变 节点的颜色
		            	}
		            },
		            lineStyle: {
		            	normal: {
		            		color: "#f35c48" //改变线条的颜色
		            	}
		            },
		            data: _data.data[0],
		            // markPoint: {
		            //     data: [
		            //         {type: 'max', name: '最大值'},
		            //         {type: 'min', name: '最小值'}
		            //     ]
		            // },
		            // markLine: {
		            //     data: [
		            //         {type: 'average', name: '平均值'}
		            //     ]
		            // }
		        },
		        {
		            name: _data.legend[1],
		            type:'line',
		            smooth: true,//是否显示平滑的曲线
		            areaStyle: {normal: {}},
		            data: _data.data[1],
		            areaStyle: {normal: {
		            	color: "#b2fbe5"
		            }},
		            //symbol: "circle",//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' 'url'
		            // symbolSize: 10,//设置  尺寸
		            itemStyle: {
		            	normal: {
		            		borderColor: "#00f1aa" //改变 节点的颜色
		            	}
		            },
		            lineStyle: {
		            	normal: {
		            		color: "#00f1aa" //改变线条的颜色
		            	}
		            },
		            // markLine: {
		            //     data: [
		            //         {type: 'average', name: '平均值'}
		            //     ]
		            // }
		        }
		    ]
		};

		callback&&callback(option);
	}
	/**
	 * 添加作品包模板
	 */
	function addBagTemplate(){

		return '<div class="works-bag-m"></div><div class="add-works-bag" data-show="true"><div class="close-add-bag">×</div><div class="drag-bag">添加作品包</div><div class="bag-cont"><label for="">作品包名称：</label><input type="text" name="" class="new-bagname" /><div class="btn ensure-bag">确定</div></div></div>';
	}

    $(document).delegate(".ensure-bag,.close-add-bag,.add-list,.date-select,.data-sys-more","click",function(e){
    	var e = e || window.event;
    	var _target = e.target || e.srcElement;
    	/**
		 * 如果弹层 在的话 就提示
		 */
		// console.log($(_this).hasClass("ensure-bag"));
		if ($(".add-works-bag").attr("data-show") && (!$(_target).hasClass("ensure-bag") && !$(_target).hasClass("close-add-bag"))) {
			$(".add-works-bag").css("border-color","red");
			setTimeout(function(){
				$(".add-works-bag").css("border-color","transparent");
			},100)
			return false;
		}
    	if ($(_target).hasClass("data-sys-more")) {
    		//第一次展现 数据图表时候调用的函数
    		showImg(_target);
    	}else if ($(_target).hasClass("date-select")) {
    		//点击选择不同时间段  时候调用的函数
    		optionDate(_target);
    	}else if ($(_target).hasClass("add-list")) {
    		$("body").append(addBagTemplate());
    	}else if ($(_target).hasClass("close-add-bag")) {
    		$(".works-bag-m").hide().remove();
    		$(".add-works-bag").fadeOut().remove();
    	}else if ($(_target).hasClass("ensure-bag")) {
    		//do something
    		$(".works-bag-m").hide().remove();
    		$(".add-works-bag").fadeOut().remove();
    	}
    	return false;
    })

    /**
     * 展现 概况表格
     */
    var dateData = {
    };
    function showImg(_this){
    	var _type = $(_this).attr("data-type");
    	_type == "show" ? ($(_this).removeClass("up").html("展示详情").attr("data-type","") && $(".link-sys-sheet").hide()) 
    	: ($(_this).addClass("up").html("关闭详情").attr("data-type","show") 
    	&& ($(".link-sys-sheet").attr("data-first") == "true") ? ajaxData("week",function(data){
			createSheet($(".link-sys-sheet"),"week",data);
    	}) : $(".link-sys-sheet").show());
    }

    /**
     * 生成图表 默认的类型为 week
     */
    function createSheet(obj,type,data){
    	var _num = 7;
    	switch (type) {
    		case "week":
    			_num = 7;
    			break;
    		case "bmonth":
    			// 获取时间列表
    			_num = 14;
    			break;
    		case "month":
    			// 获取时间列表
    			_num = 30;
    			break;
    		case "all":
    			// 获取时间列表
    			_num = 60;
    			break;
    		default:
    			// statements_def
    			break;
    	}
    	// 如果没有生成 数据 则在此时 生成对应的 数据 包括时间 列表
    	if (!dateData[type]) {
			dateData[type] = {};
			getDateList(getTodayD("m"),getTodayD("d"),_num,function(tarr){
				var _data = [];
				dateData[type].title = data.title;
				dateData[type].legend = data.legend;
				dateData[type].yAxis = data.yAxis;
				dateData[type].xAxis = tarr;
				_data.push(data["add"].slice(0, _num));
				_data.push(data["rate"].slice(0, _num));
				dateData[type].data = _data;
				console.log(dateData);
			})
		}
    	obj.show(function(){
    		var myChart = echarts.init(document.getElementById("newaddchart"));
			var chartData = echarts.init(newaddchart);
			var app = {};
			lineImg(dateData[type],function(option){
				chartData.setOption(option,true);
			})
    	}).attr("data-first","");
    }

    /**
     * 点击时间  按钮时候  触发的函数  主要目的  传入生成数据所需要的 type(week bmonth month all) 同时重置图标
     *
     */
    function optionDate(self){
    	if($(self).hasClass("active")) return false;
    	$(self).addClass("active").siblings().removeClass("active");
    	$(".lmain-box").html('<div id="lmain" style="width: 100%; height: 250px;" class=""></div>');
    	var _type = $(self).attr("data-type");
    	ajaxData(_type,function(data){
			createSheet($(".link-sys-sheet"),_type,data);
    	})
    }

    /**
     * 发送 ajax请求数据 type: week bmonth month all  主要分发数据 类型  如果没有数据 则会 向后台请求数据
     */
    function ajaxData(type,callback){
		if (!dateData[type]) {
			if (!dateData["_data"]) {
				$.ajax({
			        type:'GET',
			        url:"/new12426v0301/doc/evday.json",
			        // data:{type: type},
			        // dataType:"json",
			        success: function(msg){
			        	if (msg) {
			        		dateData["_data"] = msg;
			        		callback && callback(msg);
			        	}
			        }
			    })
			}else {
				callback && callback(dateData["_data"]);
			}
		}else {
			callback && callback(dateData[type]);
		}
	}

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
    // console.log(getTodayD("md","/"));

    /**
     * 获取时间列表  以天为单位  _tody  今天的日期 type时间列表的类型  _month 当前的月份
     */
    function getDateList(_month,_tody,_num,callback,type){
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
    }

    // console.log(getDateList(getTodayD("m"),getTodayD("d"),30));

    /**
     * 判断是否为闰年
     */
    function isLeapYear(year){
    	return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0); 
    }




	/**
	 * 导航栏 滑动效果
	 */
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var _navTop = (scrollTop !== 0 ? 70 : $(".center-nav")[0].getBoundingClientRect().top);
    $(window).on("scroll",function(){
    	scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    	scrollTop <= _navTop ? $(".center-nav").css("top","0px") : $(".center-nav").css("top",scrollTop - _navTop +"px");
    	
    })
})
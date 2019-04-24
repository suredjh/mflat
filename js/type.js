var currentShowData = {
		"1": {
			"date": ["2015/01/02","2015/02/02","2015/03/02","2016/01/02","2016/03/03","2017/01/05","2017/02/05","2017/03/09","2017/03/10"],
			"num": [4,5,7,8,9,7,8,9,7],
			"off": [3,4,6,7,8,6,8,9,7]
		},
		"2": {
			"date": ["2016/01/02","2016/01/03","2017/01/05","2017/01/09","2017/01/22"],
			"num": [4,5,7,8,9],
			"off": [3,4,6,7,8]
		}
	}

	/**
	 * 获取当前日期 在一年中是第几周  传入参数“年-月-日  年/月/日”
	 */
	function GetWeekByDate(d) {
            var arrayMonthDay = null;
            var nowDate = new Date(d);//当前日期
            var nowYear = nowDate.getFullYear();//当前年
            var nowMonth = 1;//第一月
            var nowDay = 1;//第一天
            var week = 1;//第一周
        
          //根据年是否为闰年,得到 arrayMonthDay的值
            if ((nowYear % 400 == 0) || (nowYear % 4 == 0) && (nowYear % 100 != 0)) {
                arrayMonthDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
            else {
                arrayMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
            
           //获取当前年的一月一号 是星期几
            var time = nowYear + "-" + nowMonth + "-" + nowDay;
            var weekDay = new Date(time).getDay();


            var bdate = new Date(d); //选择的时间
            var bmonth = bdate.getMonth() + 1; //月
            var bday = bdate.getDate(); //日期
            var bweek = 0;
            while (true) {
                 //如果当前的月份是验证的月份的值,并且当前的天数是验证的日期的值,则结束循环,保存日期
                if (nowMonth == bmonth && nowDay == bday) {
                    bweek = week;
                    break;
                }
               //否则当天++,星期xx
                nowDay++;
                weekDay++;

                 //如果当天的值>当前月份所对应的的最大天数,则月份+1,日期改为1
                if (nowDay > arrayMonthDay[nowMonth - 1]) {
                    nowMonth++;
                    nowDay = 1;
                }
                 
                 //如果当前星期大于6,则说明这周已完成,周数+1,星期改为 0 
                if (weekDay > 6) {
                    week++;
                    weekDay = 0;
                }
            }
            var value = bweek ;
            return value;
    }

    /**
     * 获取日期的年份 
     * return number
     */
    function GetYearByDate(d){
    	return (new Date(d)).getFullYear();
    }

	var quantumData = {};

	/**
	 * 获取当前日期 在一年中是第几月  传入参数“年-月-日  年/月/日”
	 *
	 * return number|string
	 */
	function GetMonthByDate(d){
		var _m = (new Date(d)).getMonth() + 1;
		console.log(_m);
		return _m < 10 ? "0"+_m : _m;
	}

	/**
	 * 把数据 按type划分
	 * return object
	 */
	function getTypeData(oldD,_type,_id){
		var _date;
		var sum = [],count = 0,newSum = {},addSum = {};
		for(var key in oldD){
			newSum[key] = [];
			if (key == "date") {
				_date = oldD[key];
			}else {
				sum[key] = oldD[key];
				/**
				 * 设置一个储存 相加结果的数组
				 */
				addSum[key] = 0;
				count++;
			}
		}

		var _y = GetYearByDate(_date[0]),
			_w = GetWeekByDate(_date[0]),
			_mt = parseInt(GetMonthByDate(_date[0]));


		if (!_y) return false;

		for(var k in addSum){
			addSum[k] += sum[k][0];
		}
		if (_date.length < 2) {
			newSum["date"].push(_date[0]);
			for(var k in addSum){
				newSum[k].push(addSum[k]);
			}
		}else {
			var j = 1;
			for(;j<_date.length;j++){
				//判断是哪一年  判断是哪一周  判断是哪一月
				if (_type == "week") {
					if(_y == GetYearByDate(_date[j]) && _w == GetWeekByDate(_date[j])){
						//如果到这一层 则对相应的数据  进行进行相加
						for(var k in addSum){
							addSum[k] += sum[k][j];
						}
					}else {
						newSum["date"].push(_date[j-1]);
						for(var k in addSum){
							newSum[k].push(addSum[k]);
							//赋予新值
							addSum[k] = sum[k][j];
						}
						_y = GetYearByDate(_date[j]);
						_w = GetWeekByDate(_date[j]);
					}
				}else if (_type == "month") {
					// console.log(_mt);
					console.log(_date[j]);
					if(_y == GetYearByDate(_date[j]) && _mt == parseInt(GetMonthByDate(_date[j]))){
						//如果到这一层 则对相应的数据  进行进行相加
						for(var k in addSum){
							addSum[k] += sum[k][j];
						}
						// console.log(addSum);
					}else {
						newSum["date"].push(_date[j-1]);
						for(var k in addSum){
							newSum[k].push(addSum[k]);
							//赋予新值
							addSum[k] = sum[k][j];
						}
						_y = GetYearByDate(_date[j]);
						_mt = parseInt(GetMonthByDate(_date[j]));
					}
					// console.log(111);
				}
			}

			newSum["date"].push(_date[j-1]);
			for(var k in addSum){
				newSum[k].push(addSum[k]);
			}
		}		
		quantumData[_id+_type] = newSum;		
	}


	/**
	 * 
	 */
	function showQuantumData(_data,_type,_id,callback){
		if (!quantumData[_id+_type]) {
			switch (_type) {
				case "day":
					quantumData[_id+_type] = _data;
					break;
				case "week":
					/**
					 * 调用方法 以自然周为一周
					 */
					getTypeData(_data,_type,_id);
					break;
				case "month":
					/**
					 * 调用方法 以自然月为一月
					 */
					getTypeData(_data,_type,_id);
					break;
				default:
					return false;
					break;
			}
		}

		callback&&callback(quantumData[_id+_type]);
 	}

	$(".quantum-list").on("click",function(){
		if($(this).hasClass("active")) return false;
		$(this).addClass("active").siblings().removeClass("active");
		//图表类型的id
		var _id = $(this).parents(".data-chart").attr("data-id"),
			_type = $(this).attr("data-type");//当前的类型 日 周  月

		showQuantumData(currentShowData[_id],_type,_id,function(result){
			/**
			 *  根据 不同图标的_id的值  调用不同的方法
			 */
			console.log(result);
			// switch (_id) {
			// 	case label_1:
			// 		// statements_1
			// 		break;
			// 	default:
			// 		// statements_def
			// 		break;
			// }
		});
	});
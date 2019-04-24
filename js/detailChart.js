$(function(){

	var timer = null;
	$(".switch-list").on("hover",function(){
		if ($(this).hasClass("active")) return false;
		var _oid = $(".switch-list.active").attr("data-id"),
			_nid = $(this).attr("data-id");
		clearTimeout(timer);
		var _this = this;
		timer = setTimeout(function(){
			$(_this).addClass("active").siblings(".switch-list").removeClass("active");
			$(".switch-tag").animate({"left": (parseInt(_nid)-1)*88+"px"},50);
			$(".switch-box"+_oid).hide();
			$(".switch-box"+_nid).fadeIn();
		},200);
	});

	var toolPosition = '';
	if (navigator.appName === 'Microsoft Internet Explorer') { //判断是否是IE浏览器
	    if (navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i)) { //判断浏览器内核是否为Trident内核IE8.0
	        console.info('IE8');
	        toolPosition = ["40%","80%"];
	    }
	}

	var _lineData = [
		        {
		            name: '主流视频网站',
		            type:'line',
		            //smooth: false,//是否显示平滑的曲线
		            //areaStyle: { 
		            //	normal: {
		            //		color: "rgba(a,0,0,.5)"//改变 堆叠图 面积颜色
		            //	}
		            //},
		            //symbol: "circle",//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' 'url'
		            // symbolSize: 10,//设置  尺寸
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#f35c48" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#f35c48" //改变线条的颜色
		            // 	}
		            // },
		            data: [11, 15, 13, 12, 13, 10,11]
		        },
		        {
		            name: '小网站',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            //areaStyle: {normal: {}},
		            data: [18, 12, 13, 9, 11, 15,9],
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#00f1aa" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#00f1aa" //改变线条的颜色
		            // 	}
		            // }
		        },
		        {
		            name: '搜索引擎',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            //areaStyle: {normal: {}},
		            data: [7, 2, 3, 5, 3, 8],
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#00f1aa" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#00f1aa" //改变线条的颜色
		            // 	}
		            // }
		        },
		        {
		            name: '网盘',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            //areaStyle: {normal: {}},
		            data: [8, 9, 3, 5, 10, 4,5],
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#00f1aa" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#00f1aa" //改变线条的颜色
		            // 	}
		            // }
		        },
		        {
		            name: '电视应用',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            //areaStyle: {normal: {}},
		            data: [8, 3, 7, 3, 16, 2,5],
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#00f1aa" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#00f1aa" //改变线条的颜色
		            // 	}
		            // }
		        },
		        {
		            name: 'OTT盒子',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            //areaStyle: {normal: {}},
		            data: [33, 24, 13, 19, 21, 25,19],
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#00f1aa" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#00f1aa" //改变线条的颜色
		            // 	}
		            // }
		        },
		        {
		            name: '社交',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            //areaStyle: {normal: {}},
		            data: [1, 2, 3, 2, 1, 5,0],
		            // itemStyle: {
		            // 	normal: {
		            // 		borderColor: "#00f1aa" //改变 节点的颜色
		            // 	}
		            // },
		            // lineStyle: {
		            // 	normal: {
		            // 		color: "#00f1aa" //改变线条的颜色
		            // 	}
		            // }
		        }
		    ],_currData = [];
	_currData = _lineData;
	$(".flat-list").on("click",function(){
		if($(this).hasClass("active")) return false;
		$(this).addClass("active").siblings().removeClass("active");
		var _id = $(this).attr("data-id");
		_currData = [];
		parseInt(_id) < 0 ? _currData = _lineData : _currData[0] = _lineData[_id];
		/**
		 * 清空 重新 加载数据
		 */
		$("#trendchart").html('');
		trendChart()

	})

	/**
	 * 饼状图
	 */
	function pancakeChart(data){
		return {
				color: ['#f35c48','#fba74a', '#f1e76b', '#53c4fe', '#84c855','#6167c1', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
			    title : {
			        text: '',
			        subtext: '',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)",
			        position: toolPosition,
			        backgroundColor: "rgba(255,255,255,1)",//改变提示框的颜色
			        borderWidth: 2,
			        borderColor: "#ffd6d6",
			        color: "#000",
			        formatter: function (params, ticket, callback) {
			         	//console.log(params);
					    return '<span style="color: #999;">'+params.name+'</span><br><span style="color: #999;">占比：'+params.percent+'%</span><br><span style="color: #999;">侵权数：'+params.value+'</span>';
					},
			    },
			    textStyle: {
		        	color: "#999"
		        },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '30%',
			        containLabel: true
			    },
			    legend: {
			        orient: 'vertical',//horizontal  or vertical
			        left: 'right',
			        bottom: '20%',
			        data: ['新浪微博','百度云网盘','腾讯视频','酷六视频','百度贴吧','qq空间']
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            radius: ['30%', '60%'],
			            center: ['50%', '50%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: false,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:335, name:'新浪微博'},
			                {value:310, name:'百度云网盘'},
			                {value:234, name:'腾讯视频'},
			                {value:135, name:'酷六视频'},
			                {value:1548, name:'百度贴吧'},
			                {value:1548, name:'qq空间'}
			            ]
			        }
			    ],
			    // series : [
			    //     {
			    //         name: '平台占比',
			    //         type: 'pie',
			    //         radius : '55%',
			    //         center: ['50%', '40%'],
			    //         data:[
			    //             {value:335, name:'新浪微博'},
			    //             {value:310, name:'百度云网盘'},
			    //             {value:234, name:'腾讯视频'},
			    //             {value:135, name:'酷六视频'},
			    //             {value:1548, name:'百度贴吧'},
			    //             {value:1548, name:'qq空间'}
			    //         ],
			    //         itemStyle: {
			    //             emphasis: {
			    //                 shadowBlur: 10,
			    //                 shadowOffsetX: 0,
			    //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
			    //             },
			    //             normal: {
			    //             	// color: "#f35c48"
			    //  //            	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							// 	//   offset: 0, color: 'red' // 0% 处的颜色
							// 	// }, {
							// 	//   offset: 1, color: 'blue' // 100% 处的颜色
							// 	// }], false)
			    //             }
			    //         }
			    //     }
			    // ]
			};
	}
	/**
	 * 折线图
	 */
	function lineChart(data){
		return {
			color: ['#f35c48','#fba74a', '#f1e76b', '#53c4fe', '#84c855','#6167c1', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
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
		        data: '',
		        // backgroundColor:'rgba(128, 128, 128, 0.5)'
		        top: 10
		    },
		    toolbox: {
		        show: false,
		        feature: {
		            saveAsImage: {}
		        },
		        right: 30,
		        top: 10
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: true,
		        data: ['01/01','01/02','01/03','01/04','01/05','01/06','01/07'],
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
		            formatter: '{value}'
		        }
		    },
		    series: _currData
		};
	}

	/**
	 * 堆叠面积图
	 */
	function areaChart(data){
		return {
			title: {
				subtext: '侵权数/条',
				left: 40,
		        textStyle: {
		        	color: "#999",
		        	fontSize: "16"
		        }
			},
		    // tooltip: {
		    //     trigger: 'axis',
		    //     axisPointer: {
		    //         type: 'cross',
		    //         crossStyle: {
		    //             color: '#999'
		    //         }
		    //     }
		    // },
		    // toolbox: {
		    //     feature: {
		    //         dataView: {show: true, readOnly: false},
		    //         magicType: {show: true, type: ['line', 'bar']},
		    //         restore: {show: true},
		    //         saveAsImage: {show: true}
		    //     }
		    // },
		    tooltip: {
		        trigger: 'axis',//提示框配置项
		        position: toolPosition,
		        axisPointer: {
		            type: 'shadow',
		            // crossStyle: {
		            //     color: '#999'
		            // }
		        }
		    },
		    legend: {
		        data:["新增侵权数","新增下线数"],
		        top: 10
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['01/01','01/02','01/03','01/04','01/05','01/06','01/07','01/01','01/02','01/03','01/04','01/05'],
		            axisPointer: {
		                type: 'shadow'
		            }
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '',
		            min: 0,
		            max: 250,
		            interval: 50,
		            axisLabel: {
		                formatter: '{value}'
		            }
		        },
		        // {
		        //     type: 'value',
		        //     name: '温度',
		        //     min: 0,
		        //     max: 25,
		        //     interval: 5,
		        //     axisLabel: {
		        //         formatter: '{value} °C'
		        //     }
		        // }
		    ],
		    series: [
		        {
		            name:'新增侵权数',
		            type:'bar',
		            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		        },
		        {
		            name:'新增下线数',
		            type:'bar',
		            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
		        },
		        // {
		        //     name:'平均温度',
		        //     type:'line',
		        //     yAxisIndex: 1,
		        //     data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
		        // }
		    ]
		};
		// return {
		// 	// backgroundColor: 'red',
		//     title: {
		//         // text: _data.title,
		//         subtext: '侵权数/条',
		//         // padding: 10,
		//         left: 40,
		//         textStyle: {
		//         	color: "#999",
		//         	fontSize: "16"
		//         }
		//     },
		//     tooltip: {
		//         trigger: 'axis',//提示框配置项
		//          position: toolPosition
		//     },
		//     // tooltip: {
		//     //     trigger: 'axis',
		//     //     axisPointer: {
		//     //         type: 'cross',
		//     //         crossStyle: {
		//     //             color: '#999'
		//     //         }
		//     //     }
		//     // },
		//     legend: {
		//         data: ["新增侵权数","新增下线数"],
		//         // backgroundColor:'rgba(128, 128, 128, 0.5)'
		//         top: 10
		//     },
		//     toolbox: {
		//         show: false,
		//         feature: {
		//             // dataZoom: {
		//             //     yAxisIndex: 'none'
		//             // },
		//             // dataView: {readOnly: false},
		//             // magicType: {type: ['line', 'bar']},
		//             // restore: {},
		//             saveAsImage: {}
		//         },
		//         right: 30,
		//         top: 10
		//     },
		//     xAxis:  {
		//         type: 'category',
		//         boundaryGap: true,
		//         data: ['01/01','01/02','01/03','01/04','01/05','01/06','01/07'],
		//         offset: 3,
		//         minInterval: 1,
		//         // axisLabel: {
	 //         //        interval: 1
	 //         //    },
	 //            axisTick: {
	 //            	interval:  0 //强制显示所有刻度
	 //            },
	 //            // axisPointer: {
	 //            //     type: 'shadow'
	 //            // }
		//     },
		//     yAxis: {
		//         type: 'value',
		//         axisLabel: {
		//             formatter: '{value}'
		//         }
		//     },
		//     series: [
		//         {
		//             name: '新增侵权数',
		//             type:'bar',
		//             //symbol: "circle",//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' 'url'
		//             // symbolSize: 10,//设置  尺寸
		//             itemStyle: {
		//             	normal: {
		//             		color: "red"
		//             	},
		//             	emphasis: {
		//             		color: "orange"
		//             	}
		//             },
		//             data: [11, 15, 13, 12, 13, 10,11],
		//             // markPoint: {
		//             //     data: [
		//             //         {type: 'max', name: '最大值'},
		//             //         {type: 'min', name: '最小值'}
		//             //     ]
		//             // },
		//             markLine: {
		//                 data: [
		//                     {type: 'average', name: '平均值'}
		//                 ]
		//             }
		//         },
		//         {
		//             name: '新增下线数',
		//             type:'bar',
		//             //smooth: true,//是否显示平滑的曲线
		//             areaStyle: {normal: {}},
		//             data: [18, 12, 13, 9, 11, 15,9],
		//             areaStyle: {normal: {
		//             	color: "red",
		//             	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		// 				  offset: 0, color: '#e7f3ff' // 0% 处的颜色
		// 				}, {
		// 				  offset: 1, color: '#fffefe' // 100% 处的颜色
		// 				}], false)
		//             }},
		//             //symbol: "circle",//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' 'url'
		//             // symbolSize: 10,//设置  尺寸
		//             itemStyle: {
		//             	normal: {
		//             		borderColor: "#ff0000" //改变 节点的颜色
		//             	}
		//             },
		//             lineStyle: {
		//             	normal: {
		//             		color: "#ff0000", //改变线条的颜色
		//             		width: 1
		//             	}
		//             },
		//             markLine: {
		//                 data: [
		//                     {type: 'average', name: '平均值'}
		//                 ]
		//             }
		//         }
		//     ]
		// };
	}

	/**
	 * 单折线图
	 */
	function oneLineChart(data){
		return {
			// backgroundColor: 'red',
		    title: {
		        // text: _data.title,
		        subtext: '票房(万)',
		        // padding: 10,
		        left: 40,
		        textStyle: {
		        	color: "#999",
		        	fontSize: "16"
		        }
		    },
		    tooltip: {
		        trigger: 'axis',//提示框配置项
		         position: toolPosition,
		         formatter: function (params, ticket, callback) {
		         	// console.log(params);
				     return '<span style="font-size: 12px">'+params[0].name+'</span><br>票房：'+params[0].value+'万';
				},
		    },
		    legend: {
		        data: ["票房统计"],
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
		        data: ['01/01','01/02','01/03','01/04','01/05','01/06','01/07'],
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
		            formatter: '{value}'
		        }
		    },
		    series: [
		        {
		            name: '票房统计',
		            type:'line',
		            //smooth: true,//是否显示平滑的曲线
		            areaStyle: { 
		            	normal: {
		            		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							  offset: 0, color: '#ffc0f4' // 0% 处的颜色
							}, {
							  offset: 1, color: '#fffefe' // 100% 处的颜色
							}], false)
		            		//color: "rgba(231,178,227,.5)"//改变 堆叠图 面积颜色
		            	}
		            },
		            //symbol: "circle",//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' 'url'
		            // symbolSize: 10,//设置  尺寸
		            itemStyle: {
		            	normal: {
		            		borderColor: "#ff1bd7" //改变 节点的颜色
		            	}
		            },
		            lineStyle: {
		            	normal: {
		            		color: "#ff1bd7", //改变线条的颜色
		            		width: 1
		            	}
		            },
		            data: [11, 15, 13, 12, 13, 10,11],
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
		        }
		    ]
		};
	}

	/**
	 * 下线情况分析  百分比图表 <div class="off-list">
								<span class="off-list-t">主流视频网站</span>
								<span class="off-list-s">
									<span class="off-list-l"></span>
									<span class="off-list-n">0%</span>
								</span>
							</div>
	 */
	function precentChart(){
		var title = ['主流视频网站','小网站','搜索引擎','网盘','电视应用','OTT盒子','社交'],
			precent = [30,10,10,20,5,5,20];
		var colorArr = ["#15c1c3","#007cc2","#fd6de8","#00a658","#f1772a","#f17829","#f6cd5b","#6d5c54","#ffb764"];
		$(".off-chart-box").html('');
		var _html = '';
		for(var i=0;i<title.length;i++){
			_html += '<div class="off-list"><span class="off-list-t">'+title[i]+'</span><span class="off-list-s">';
			_html += '<span class="off-list-l" style="width:'+precent[i]+'%;transition:all 0.2s;background-color:'+colorArr[i]+'"></span><span class="off-list-n" style="left:'+(2 + precent[i])+'%;">'+precent[i]+'%</span></span></div>';
			$(".off-chart-box").append(_html);
			_html = '';
		}
		_html = '';
		_html += '<div class="list-scale"><span class="scale-t">0%</span><span class="scale-t scale-t2">20%</span><span class="scale-t scale-t4">40%</span><span class="scale-t scale-t6">60%</span>';
		_html += '<span class="scale-t scale-t8">80%</span><span class="scale-t scale-t10">100%</span></div>';
		$(".off-chart-box").append(_html);
		var ltimer = null;
		$(".off-list").on("mouseover",function(e){
			clearTimeout(ltimer);
			e = e || window.event;
			var _n = $(this).children(".off-list-t").html(),
				_p = $(this).find(".off-list-n").html();
			$(".time-axis-tag").html(_n+"<br>下线率："+_p).css({"left":e.clientX+20+"px","top":e.clientY+"px"});
			$(".time-axis-tag").show();
		})

		$(".off-list").on("mouseleave",function(e){
			ltimer = setTimeout(function(){
				$(".time-axis-tag").fadeOut();
			},200);
			
		})
	}

	/**
	 * 下线情况分析
	 */
	precentChart();

	/**
	 * pc端
	 */
	function pcChart(data){
		var myChart = echarts.init(document.getElementById("pcchart"));
		var chartData = echarts.init(pcchart);
		var app = {};
		chartData.setOption(pancakeChart(),true);
	}
	/**
	 * 移动端
	 */
	function mobileChart(data){
		var myChart = echarts.init(document.getElementById("mobchart"));
		var chartData = echarts.init(mobchart);
		var app = {};
		chartData.setOption(pancakeChart(),true);
	}
	/**
	 * ott端
	 */
	function ottChart(data){
		var myChart = echarts.init(document.getElementById("ottchart"));
		var chartData = echarts.init(ottchart);
		var app = {};
		chartData.setOption(pancakeChart(),true);
	}
	/**
	 * 新增侵权和下线统计
	 */
	function newAddChart(data){
		var myChart = echarts.init(document.getElementById("newaddchart"));
		var chartData = echarts.init(newaddchart);
		var app = {};
		chartData.setOption(areaChart(),true);
	}
	/**
	 * 侵权平台传播趋势
	 */
	function trendChart(){
		var myChart = echarts.init(document.getElementById("trendchart"));
		var chartData = echarts.init(trendchart);
		var app = {};
		chartData.setOption(lineChart(),true);
	}
	
	/**
	 * 票房统计
	 */
	function officeChart(){
		var myChart = echarts.init(document.getElementById("officechart"));
		var chartData = echarts.init(officechart);
		var app = {};
		chartData.setOption(oneLineChart(),true);
	}
	pcChart();
	// mobileChart();
	// ottChart();
	newAddChart();
	trendChart();
	officeChart();
	// offLineChart();

	
})
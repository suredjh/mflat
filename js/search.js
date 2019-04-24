
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,'');
}
// 监听 搜索框 数值变化  渲染搜索结果
function showSearchResult(obj,data){
	obj.fadeIn().html('');
	var _html = '';
	for(var i=0;i<data.length;i++){
		_html += '<p class="search-result-list"><i class="result-list-t">'+data[i].name+'</i>('+data[i].timer+')</p>';
	}
	obj.append(_html);
	clickD();
}

function getTargetHtml(){
	var pathArr = window.location.pathname.split("/");
	var _t = pathArr[pathArr.length - 1].split(".")[0];
	_t == '' ? _t='index' : '';
	if (_t == "index" || _t == "compose" || _t == "news" || _t == "examples" || _t == "about") {
		$("[data-type="+_t+"]").addClass("active").siblings().removeClass("active");
	}else {
		$(".naver-list.active").removeClass("active");
	}
}

//点击查报告 zhi为空的时候调用的函数  $t: 点击对象   t:显示的文本
function noContentTag($t,t){
	alert("www");
	var _html = '<div class="no-content-tag hide">请选择作品再查看报告！</div>';
	// $t.parent().insertBefore(_html);
	// $(".no-content-tag").fadeIn(100);
	$t.parent().parent().append(_html);
	$(".no-content-tag").fadeIn(100);
	setTimeout(function(){
		$(".no-content-tag").fadeOut().remove();
	},3000)
}

$(".search-btn").on("click",function(){
	noContentTag($(this),"请选择作品再查看报告！");
	return false;
})


$(".naver-btn").on("click",function(){
	if($(this).hasClass("active")) return false;
	$(this).siblings(".search-result").hide();
	window.location.href = '/new12426v0301/html/worksDets.html';
});

function clickD(){
	$(".search-result-list").on("click",function(){
		var _v = $(this).children(".result-list-t").html();
		$(this).parent().siblings(".naver-search").val(_v).siblings(".naver-btn").removeClass("active");
	});
}
var searchT = null;
$(".naver-search").on("keyup",function(){
	var _v = $(this).val().trim(),_this = this;
	clearTimeout(searchT);
	searchT = setTimeout(function(){
		if(!_v){
			$(_this).siblings(".naver-btn").addClass("active");
			$(_this).siblings(".search-result").fadeOut();
			return false;
		}
		$(_this).siblings(".naver-btn").removeClass("active");
		$.ajax({
			type:'POST',
	        url:"/new12426v0301/doc/sr.json",
	        data:{value: _v},
	        dataType:"json",
	        success: function(data){
	        	if (data) {
	        		showSearchResult($(_this).siblings(".search-result"),data);
	        	}else {
	        		$(_this).siblings(".search-result").html('暂无相关影片');
	        	}
	        }
		})
	},200)
})


getTargetHtml();

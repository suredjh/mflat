
"use strict";



String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
// console.log((" tes t").trim());
function testPhone(phone){
	phone = phone.trim() || "";
	var testPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
	return testPhone.test(phone);
}

function testEmail(email){
	email = email.trim() || "";
	//var testEmail = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
	var testEmail = /^[0-9a-z_]+@(([0-9a-z]+)[.]){1,2}[a-z]{2,3}$/;
	return testEmail.test(email);
}

function testUserName(name){
	name = name.trim() || "";
	var testUserName = /^(?=.{6,16}$)[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$/;
	return testUserName.test(name);
}

function testVal(obj){
	var flag = true;
	obj.map(function(){
		if ($(this).val().trim() == "") {
			flag = false;
		}
	});
	return flag;
}

function texTag(str,timer) {
	str = str || '';
	timer = timer || 500;
	$(".fixed-show").attr("data-show","true").html(str).fadeIn(timer);
}

function testPassW(str){
	str = str.trim() || "";
//	var pa = /^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\1)[0-9a-zA-Z]+$/;
	var pa = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,20}$/;
	return pa.test(str);
}


function commonOp(){
	/**
	 * 上传图片 预览
	 */
	$(".infile").on("change",function(){
		var _this = this;
		var file = this.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e){
	 		var data = e.target.result;
	 		$("#file-show"+$(_this).attr("data-type")).append('<img src="'+data+'" />');
	 	};
	});

	/**
	 * 侵权投诉 上传多个不同类型的文件
	 */
	$("#report-file").on("change",function(){
		var files = this.files,_this = this;
		// console.log(files);
		var fileName = "";
		if (files.length === 0) {
			return false;
		}
		// 实例化一个表单数据对象
		var formData = new FormData();
		// 遍历图片文件列表，插入到表单数据中
		for (var i = 0, file; file = files[i]; i++) {
		    // 文件名称，文件对象
		    formData.append(file.name, file);
		    fileName +=file.name + " / ";
		}
		$(".report-file-list").html(fileName);
		// console.log(formData);
	});
};

commonOp();

//example-iframe

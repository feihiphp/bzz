// 甜粽子临时存储
var sweetZZ = "none";
// 咸粽子临时存储
var saltyNo = "none";
var saltyZZ = new Array();
// 全部粽子存储
var allZZ = new Array();
var allNo = 0;
var allIndex = 0;
// 包装存储
var $package = 'FT03生';
//定制单号
var customizeNo;
// 图片加载
var images = new Array();
var preload = new Array(
	"img/chose-bg.png",
	"img/rice-before.png",
	"img/big-rice_2.png",
	"img/big-rice_3.png",
	"img/big-title0_1.png",
	"img/big-title0_2.png",
	"img/big-title0_3.png",
	"img/big-title0_4.png",
	"img/big-title1_1.png",
	"img/big-title1_2.png",
	"img/big-title1_3.png",
	"img/big-title1_4.png",
	"img/chose-bg.png",
	"img/chose-ok-bg.png",
	"img/continue-text.png",
	"img/inde-img.png",
	"img/chose-bg.png",
	"img/big-rice_2.png",
	"img/big-rice_3.png",
	"img/big-title0_1.png",
	"img/big-title0_2.png",
	"img/big-title0_3.png",
	"img/big-title0_4.png",
	"img/big-title1_1.png",
	"img/big-title1_2.png",
	"img/big-title1_3.png",
	"img/big-title1_4.png",
	"img/chose-bg.png",
	"img/chose-ok-bg.png",
	"img/continue-text.png",
	"img/inde-img.png"
	);

//进度条js
	function $s(d){
	
	return document.getElementById(d);
	
	}
	var sz="50%";
		
	function smation(){ 
		// sz为0的时候 bar为0
	if (sz=="0%") {
		$s("bar").style.width = 0; 
	}
	$s("bar").style.width = parseInt($s("bar").style.width) + 1 + "%"; 
	$s("progress-sz").innerHTML = $s("bar").style.width; 
	if($s("bar").style.width == "100%"){ 
		$(".loading").hide();//当页面加载完成后将loading页隐藏  
		$('.five-page').show();
		// window.clearInterval(bar);  禁止执行  停住
	  }
	} 
	var bar = setInterval(function(){
	smation();
	}, 30);
	window.onload = function(){
		bar;
	}

$(function(){
	// 音乐暂停/播放
	$('.five-page .music img').click(function() {
		// 判断当前状态
		if($('.five-page .music').attr('class').indexOf('curr') > -1) {
			// 此处为播放中
			// 暂停音乐
			$('audio')[0].pause();
			// 停止旋转
			$('.five-page .music').removeClass('curr');
		} else {
			// 此处为暂停中
			// 播放音乐
			$('audio')[0].play();
			// 开始旋转
			$('.five-page .music').addClass('curr');
		}
	});
	// 选包装
	$(".packbox-table ul li").click(function(){
        $(this).addClass("checked-li");
        $(this).siblings().removeClass("checked-li");
        // 获取包装编号并存储至容器
        $package = $(this).attr('value');
	});
	// 根据规格显示粽子数量
	if($("#packingtype").val() == 4) {
		$($('.standby-icon')[4]).hide();
		$($('.standby-icon')[5]).hide();
		$(".pack-table").hide();
		$(".pack-table2").show();
	}
	/*点击开始定制*/
	$("#start-btn").click(function(){
		$(".page").hide();
		$(".start-work-tan").hide();
		$("#page3").fadeIn().show();//进入包粽子页面
		$(".tan-box1").fadeIn().show();
		
		$('.chose-btn ul li')[1].click(); // 模拟点击（切换到咸粽子）
		
		setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
	       $(".tan-box1").hide();
	    }, 50000000);
		var divHeight = document.getElementById("operation-box").offsetHeight; //用来适配page3页面的
		var standbyTop = document.getElementById("standby-box");
		standbyTop.style.top = (document.documentElement.clientHeight - divHeight ) /5 + 'px'; //根据不同屏幕来调整待包粽子的top值
		var operationHeight = document.getElementById("operation-top");
		if(document.documentElement.clientHeight >= 2400){ //长手机的适配调整
		     operationHeight.style.width = 10 + 'rem';
		     operationHeight.style.height = 8.8 + 'rem';
		}		
	});
	 /*切换咸粽子和甜粽子*/
	 $(".chose-btn ul li").click(function(){
	    $(this).siblings().removeClass("li-cur");
	    $(this).addClass("li-cur");
	    $(".menu-box").hide();
	    $("#"+$(this).attr("value")).show();
	    // 判断要显示的是甜是咸
	    if('chose-middle1' == $(this).attr("value")) {
	    	if(sweetZZ == 'NO:55' || sweetZZ == 'NO:57') {
	    		// 大粽子显示抹茶底色
				$("#operation-top").attr('class', 'operation-top rice-bg2')
	    	} else {
	    		// 大粽子显示白色底色
				$("#operation-top").attr('class', 'operation-top rice-bg1')
	    	}
	    	// 此处为甜,隐藏咸味已选馅料
	    	$("#sweetName").css('opacity', 1);
			$("#saltyName").css('opacity', 0);
	    	$('.operate3').hide();
	    	$('.operate1').show();
	    } else {
	    	// 大粽子显示棕色底色
			$("#operation-top").attr('class', 'operation-top rice-bg3')
	    	// 此处为咸,隐藏甜味已选馅料
			$("#sweetName").css('opacity', 0);
			$("#saltyName").css('opacity', 1);
	    	$('.operate3').show();
	    	$('.operate1').hide();
	    }
	  });
	/*包完点击下一步*/
	$("#next-step").click(function(){
		// 判断当前页面是甜是咸
		if($('#chose-middle1').css('display') == 'none') {
			// 此处为咸
//			if(saltyNo == 'none') {
//				// 为选择,弹出提示框
//				$('.tan-box2').show();
//				setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
//			       $(".tan-box2").hide();
//			    }, 3000);
////				$('.tan-box2').hide(3000);
//				return;
//			}
			if(saltyNo == 'none') {
				if(saltyZZ.length == 0) {
					$('.tan-box6').show();
					setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
				       $(".tan-box6").hide();
				    }, 3000);
					return;
				} else if(saltyZZ.length == 1) {
					$('.tan-box4').show();
					setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
				       $(".tan-box4").hide();
				    }, 3000);
					return;
				} else if(saltyZZ.length == 2) {
					$('.tan-box5').show();
					setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
				       $(".tan-box5").hide();
				    }, 3000);
					return;
				}
			}
			// 添加至全部粽子存储
			allZZ[allIndex] = saltyNo;
			// 隐藏馅料名称
			hideNames();
			// 清空临时存储
			saltyNo = 'none';
			saltyZZ = [];
		} else {
			// 此处为甜
			if(sweetZZ == 'none') {
				// 为选择,弹出提示框
				$('.tan-box6').show();
				setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
			       $(".tan-box6").hide();
			    }, 3000);
//				$('.tan-box2').hide(3000);
				return;
			}
			// 隐藏馅料名称
			hideNames();
			// 添加至全部粽子存储
			allZZ[allIndex] = sweetZZ;
			// 清空临时存储
			sweetZZ = 'none';
		}
		// 对应粽子显示为包好状态,添加下一步骤需要展示的数据
		$($(".standby-icon")[allIndex]).addClass('standby-icon-cur');
		// 已包粽子加一,数组下标加一
		allNo = allNo + 1;
		allIndex = allIndex + 1;
		// 判断是否包好全部粽子
		if(allNo == $("#packingtype").val()) {
			$.each(allZZ, function(i, item) {
				// 获取馅料组合
				getGroup(item, function(arr) {
					if(arr) {
						if($("#packingtype").val() == 6) {
							$($('.pack-table ul li font')[i]).text(arr[0]+'+'+arr[1]+'+'+arr[2]);
						} else {
							$($('.pack-table2 ul li font')[i]).text(arr[0]+'+'+arr[1]+'+'+arr[2]);
						}
					} else {
						let msg = '';
						switch(item) {
						case 'NO:39': msg='章鱼须';break;
						case 'NO:50': msg='肉松蛋黄';break;
						case 'NO:51': msg='豆沙球';break;
						case 'NO:52': msg='豆沙+巧克力';break;
						case 'NO:53': msg='豆沙+摩卡';break;
						case 'NO:55': msg='豆沙+蜜枣';break;
						case 'NO:56': msg='燕窝';break;
						case 'NO:57': msg='莲蓉+蛋黄';break;
						case 'NO:58': msg='六颗蜜枣';break;
						case 'NO:59': msg='芝麻+核桃';break;
						}
						if($("#packingtype").val() == 6) {
							$($('.pack-table ul li font')[i]).text(msg);
						} else {
							$($('.pack-table2 ul li font')[i]).text(msg);
						}
					}
					if($("#packingtype").val() == 6) {
						$($('.pack-table ul li i')[i]).attr('value', i);
					} else {
						$($('.pack-table2 ul li i')[i]).attr('value', i);
					}
				});
			});
			// 跳转至下一个步骤
			$(".page").hide();
			$(".start-work-tan").hide();
			$("#page4").fadeIn().show();
			$(".pack").hide();
			$(".pack1").fadeIn().show();
		} else {
			// 清空馅料区域内容及临时存储
			if($('#chose-middle2').css('display') == 'none') {
				// 此处为甜
				$("#operation-top").attr('class', 'operation-top rice-bg1')
			}
			$('.operate1 img').attr('src', 'img/lucency.jpg');
			$('.operate3 img').attr('src', 'img/lucency.jpg');
			$(".menu-box-fr1 ul li").removeClass("menu-black");
			$(".menu-box-fr2 ul li").removeClass("menu-black");
			sweetZZ = 'none'; saltyNo = "none"; saltyZZ = [];
		}
	});
	// 4只粽子重新选馅料监听
	$('.pack-table2 ul li i').click(function() {
		// 隐藏馅料名称
		hideNames();
		// 已包粽子数量减一,记录对应数组下标
		allNo = allNo - 1;
		allIndex = $(this).attr('value');
		// 对应粽子还原
		$($(".standby-icon")[allIndex]).removeClass('standby-icon-cur');
		// 馅料区域还原
		$("#operation-top").attr('class', 'operation-top rice-bg1')
		$('.operate1 img').attr('src', 'img/lucency.jpg');
		$('.operate3 img').attr('src', 'img/lucency.jpg');
		$(".menu-box-fr1 ul li").removeClass("menu-black");
		$(".menu-box-fr2 ul li").removeClass("menu-black");
		$(".chose-middle2").hide();
		$(".chose-middle1").show();
		sweetZZ = 'none'; saltyNo = "none"; saltyZZ = [];
		allZZ[allIndex] = '';
		// 返回选馅料步骤
		$("#page4").hide();
//		$(".pack").hide();
		$(".start-work-tan").hide();
		$("#page3").fadeIn().show();
	});
	// 6只粽子重新选馅料监听
	$('.pack-table ul li i').click(function() {
		// 隐藏馅料名称
		hideNames();
		// 已包粽子数量减一,记录对应数组下标
		allNo = allNo - 1;
		allIndex = $(this).attr('value');
		// 对应粽子还原
		$($(".standby-icon")[allIndex]).removeClass('standby-icon-cur');
		// 馅料区域还原
		$("#operation-top").attr('class', 'operation-top rice-bg1')
		$('.operate1 img').attr('src', 'img/lucency.jpg');
		$('.operate3 img').attr('src', 'img/lucency.jpg');
		$(".menu-box-fr1 ul li").removeClass("menu-black");
		$(".menu-box-fr2 ul li").removeClass("menu-black");
		$(".chose-middle2").hide();
		$(".chose-middle1").show();
		sweetZZ = 'none'; saltyNo = "none"; saltyZZ = [];
		allZZ[allIndex] = '';
		// 返回选馅料步骤
		$(".pack").hide();
		$(".start-work-tan").hide();
		$("#page3").fadeIn().show();
	});
	/*看完几只包装点击下一步*/
	$("#next-step2").click(function(){
		$(".pack").hide();
		$(".start-work-tan").hide();
		$(".pack2").fadeIn().show();
	});
	/*点击返回*/
	$("#btn1").click(function(){
		$(".pack").hide();
		$(".start-work-tan").hide();
		$("#page4").fadeIn().show();
		$(".pack1").fadeIn().show();
	});
	/*点击进入最后页面*/
	$("#btn2").click(function(){
		$(".page").hide();
		$(".start-work-tan").hide();
		$("#page5").fadeIn().show();
		//保存数据并返回定制单号
		// saveDataAndRetCusNo();
	});
	
	/*点击套餐名显示对应套餐*/
	/*$(".menu-box-fl ul li").click(function(){
		$(this).removeClass("menu-black");
        $(this).siblings().addClass("menu-black");
	});*/
	/*点击馅料高亮*/
	/*$(".menu-box-fr ul li").click(function(){
        $(this).removeClass("menu-black");
        $(this).siblings().addClass("menu-black");
	});*/
	// 甜粽子馅料点击事件
	$(".menu-box-fr2 ul li").click(function(){
		// 判断是否可点
//		if($(this).attr('class') && $(this).attr('class').indexOf('menu-black') > -1) {
//			// 此处为不可点,弹出提示语
//			$('.tan-box3').show();
//			setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
//		       $(".tan-box3").hide();
//		    }, 3000);
////			$('.tan-box3').hide(3000);
//			return;
//		}
		// 馅料置灰
//		$(".menu-box-fr2 ul li").addClass("menu-black");
		// 显示馅料名称
		showNames('sweet', $(this).children('font').text());
		// 判断馅料,更换大粽子颜色
		if($(this).attr('value') == 'NO:55' || $(this).attr('value') == 'NO:57') {
			// 此处显示抹茶色
			$("#operation-top").attr('class', 'operation-top rice-bg2')
		} else {
			// 此处显示白色
			$("#operation-top").attr('class', 'operation-top rice-bg1')
		}
        // 显示图片
        $('.operate1 img').attr('src', $(this).children('span').children('img')[0].src);
        $('.operate1').show();
        // 馅料添加至临时存储
        sweetZZ = $(this).attr('value');
	});
	// 甜粽子套餐点击事件
	$(".menu-box-fl2 ul li").click(function(){
		// 大粽子显示白色底色
		$("#operation-top").attr('class', 'operation-top rice-bg1')
		// 馅料置灰
//		$(".menu-box-fr2 ul li").addClass("menu-black");
		// 判断选择的是哪个套餐,显示对应馅料图片,添加至临时存储
		if($(this).children('span').children('img')[0].src.indexOf('big-title0_1') > -1) {
			// 传统经典
			$('.operate1 img').attr('src', 'img/sweet-icon1.png');
			// 显示馅料名称
			showNames('sweet', '豆沙球');
			sweetZZ = $(this).attr('value');
		} else if($(this).children('span').children('img')[0].src.indexOf('big-title0_2') > -1) {
			// 浓情蜜意
			$('.operate1 img').attr('src', 'img/sweet-icon2.png');
			// 显示馅料名称
			showNames('sweet', '豆沙+巧克力');
			sweetZZ = $(this).attr('value');
		} else if($(this).children('span').children('img')[0].src.indexOf('big-title0_3') > -1) {
			// 富贵养生
			$('.operate1 img').attr('src', 'img/sweet-icon5.png');
			// 显示馅料名称
			showNames('sweet', '燕窝');
			sweetZZ = $(this).attr('value');
		} else {
			// 补脑充电
			$('.operate1 img').attr('src', 'img/sweet-icon7.png');
			// 显示馅料名称
			showNames('sweet', '芝麻+核桃');
			sweetZZ = $(this).attr('value');
		}
        $('.operate1').show();
	});
	// 咸粽子馅料点击事件
	$(".menu-box-fr1 ul li").click(function(){
		// 判断是否可点
		if($(this).attr('class') && $(this).attr('class').indexOf('menu-black') > -1) {
			// 此处为不可点,弹出提示语
			$('.tan-box3').show();
			setTimeout(function() { ///*包粽子操作前5秒弹窗提示*/
		       $(".tan-box3").hide();
		    }, 3000);
//			$('.tan-box3').hide(3000);
			return;
		}
		let $this = $(this);
		// 所有馅料置灰
		$(".menu-box-fr1 ul li").addClass("menu-black");
        // 判断已选了几种馅料
        if($($('.operate3 img')[1])[0].src.indexOf('lucency.jpg') < 0) {
        	// 此处为已选两种,在第三个位置放入图片,添加至临时存储,获取对应编号
        	$($('.operate3 img')[2]).attr('src', $(this).children('span').children('img')[0].src);
        	saltyZZ.push($(this).children('font').text());
			// 显示馅料名称
			showNames('salty', $(this).children('font').text(), 3);
        	// 获取馅料编号
        	getEnableFillings(saltyZZ, function(no) {
        		saltyNo = no;
        	});
        } else if($($('.operate3 img')[0])[0].src.indexOf('lucency.jpg') < 0) {
        	// 此处为已选一种,在第二个位置放入图片,剩余可选馅料置白,添加至临时存储
        	$($('.operate3 img')[1]).attr('src', $(this).children('span').children('img')[0].src);
        	saltyZZ.push($(this).children('font').text());
			// 显示馅料名称
			showNames('salty', $(this).children('font').text(), 2);
        	// 获取可用馅料
        	getEnableFillings(saltyZZ, function(arr) {
        		// 遍历所有咸味馅料,可选馅料置白
        		$(".menu-box-fr1 ul li font").each(function() {
        			if(arr[$(this).text()]) {
        				$(this).parent().removeClass("menu-black");
        			}
        		});
        	});
        } else if($(this).children('span').children('img')[0].src.indexOf('salt-icon4') > -1) {
        	// 选择章鱼须时,显示图片,添加至临时存储
        	$($('.operate3 img')[3]).attr('src', $(this).children('span').children('img')[0].src);
			// 显示馅料名称
			showNames('salty', $(this).children('font').text(), 1);
        	saltyNo = 'NO:39';
        } else if($(this).children('span').children('img')[0].src.indexOf('salt-icon10') > -1) {
        	// 选择肉松蛋黄时,显示图片,添加至临时存储
        	$($('.operate3 img')[3]).attr('src', $(this).children('span').children('img')[0].src);
			// 显示馅料名称
			showNames('salty', $(this).children('font').text(), 1);
        	saltyNo = 'NO:50';
        } else {
        	// 此处为已选零种,在第一个位置放入图片,剩余可选馅料置白,添加至临时存储
			$($('.operate3 img')[0]).attr('src', $(this).children('span').children('img')[0].src);
			// 显示馅料名称
			showNames('salty', $(this).children('font').text(), 1);
        	saltyZZ.push($(this).children('font').text());
        	// 获取可用馅料
        	getEnableFillings(saltyZZ, function(arr) {
        		// 遍历所有咸味馅料,可选馅料置白
        		$(".menu-box-fr1 ul li font").each(function() {
        			if(arr[$(this).text()]) {
        				$(this).parent().removeClass("menu-black");
        			}
        		});
        	});
        }
        $('.operate3').show();
        console.log(saltyZZ);
	});
	// 咸粽子套餐点击事件
	$(".menu-box-fl1 ul li").click(function(){
		// 馅料置灰
		$(".menu-box-fr1 ul li").addClass("menu-black");
		// 判断选择的是哪个套餐,显示对应馅料图片,添加至临时存储
		if($(this).children('span').children('img')[0].src.indexOf('big-title1_1') > -1) {
			// 传统经典一
			$($('.operate3 img')[3]).attr('src', 'img/lucency.jpg');
			$($('.operate3 img')[0]).attr('src', 'img/salt-icon12.png');
			$($('.operate3 img')[1]).attr('src', 'img/salt-icon12.png');
			$($('.operate3 img')[2]).attr('src', 'img/salt-icon12.png');
			// 显示馅料名称
			showNames('salty', '黑猪后腿肉', 1);
			showNames('salty', '黑猪后腿肉', 2);
			showNames('salty', '黑猪后腿肉', 3);
			saltyNo = $(this).attr('value');
		} else if($(this).children('span').children('img')[0].src.indexOf('big-title1_2') > -1) {
			// 传统经典二
			$($('.operate3 img')[3]).attr('src', 'img/lucency.jpg');
			$($('.operate3 img')[0]).attr('src', 'img/salt-icon12.png');
			$($('.operate3 img')[1]).attr('src', 'img/salt-icon1.png');
			$($('.operate3 img')[2]).attr('src', 'img/salt-icon5.png');
			// 显示馅料名称
			showNames('salty', '黑猪后腿肉', 1);
			showNames('salty', '咸蛋黄', 2);
			showNames('salty', '板栗', 3);
			saltyNo = $(this).attr('value');
		} else if($(this).children('span').children('img')[0].src.indexOf('big-title1_3') > -1) {
			// 牛气冲天
			$($('.operate3 img')[3]).attr('src', 'img/lucency.jpg');
			$($('.operate3 img')[0]).attr('src', 'img/salt-icon3.png');
			$($('.operate3 img')[1]).attr('src', 'img/salt-icon3.png');
			$($('.operate3 img')[2]).attr('src', 'img/salt-icon2.png');
			// 显示馅料名称
			showNames('salty', '牛腩', 1);
			showNames('salty', '牛腩', 2);
			showNames('salty', '牛筋', 3);
			saltyNo = $(this).attr('value');
		} else {
			// 剁手款
			$($('.operate3 img')[0]).attr('src', 'img/lucency.jpg');
			$($('.operate3 img')[1]).attr('src', 'img/lucency.jpg');
			$($('.operate3 img')[2]).attr('src', 'img/lucency.jpg');
			$($('.operate3 img')[3]).attr('src', 'img/salt-icon4.png');
			saltyNo = $(this).attr('value');
			// 显示馅料名称
			hideNames('salty');
			showNames('salty', '章鱼须', 1);
		}
		$('.operate3').show();
	});
	// 重新选择
	$('#renew-chose').click(function() {
		// 判断当前页面是甜是咸
		if($('#chose-middle1').css('display') == 'none') {
			// 此处为咸,清空已选馅料,按钮回复可选状态
			$('.operate3 img').attr('src', 'img/lucency.jpg');
			$(".menu-box-fr1 ul li").removeClass("menu-black");
			// 大粽子显示棕色底色
			$("#operation-top").attr('class', 'operation-top rice-bg3')
			// 隐藏馅料名称
			hideNames('salty');
			// 清空临时存储
			saltyNo = "none"; saltyZZ = [];
		} else {
			// 此处为甜,清空已选馅料,按钮回复可选状态
			$('.operate1 img').attr('src', 'img/lucency.jpg');
			$(".menu-box-fr2 ul li").removeClass("menu-black");
			// 大粽子显示白色底色
			$("#operation-top").attr('class', 'operation-top rice-bg1');
			// 隐藏馅料名称
			hideNames('sweet');
			// 清空临时存储
			sweetZZ = 'none';
		}
	});
	// 确认下单按钮
	$('.sure-btn img').one('click', function() {
		alert("亲！已经成功下单啦！")
		// 判断是有赞还是手淘
		// if($(this).attr('value') == 'yz') {
		// 	// 此处为有赞
		// 	yzOrder();
		// } else {
		// 	// 此处为手淘
		// 	stOrder();
		// }
	});
});

function stOrder() {
	//console.log("customizeNo:"+customizeNo)
	if(!customizeNo) {
		saveDataAndRetCusNo();
		alert('网络原因下单失败，请重新点击下单！');
		return;
	}
	var packUrl = pacUrl($package);
	var params = {
			pic: [{id : 1, url : packUrl}],
			text: [{
				id: 1, content: '定制单号:' + customizeNo
			}, {
				id: 2, content: '包装:' + $package
			}, {
				id: 3, content: '馅料编号:' + allZZ.join(",")
			}]
	};
//	console.log(params);return;
	Tida.customization.buildOrder(params, function(res){
		 if(res.msg != "success"){
			 Tida.toast(JSON.stringify(res));
		 } else {
			 console.log("下单成功", res);
		 }
	});
}

function yzOrder() {
	// 拼接JSON
	var json = [
		'定制单号:' + customizeNo, 
		'包装:' + $package, 
		'馅料编号:' + allZZ.join(",")
    ];
	// ajax请求后台接口
//	console.log(json);return;
//	console.log(JSON.stringify(json));return;
	$.ajax({
		url : "https://dmapi.ews.m.jaeapp.com/c2b/wfz/bill",
		type : "POST",
		data : {"message" : JSON.stringify(json),
			"itemId" : $('#itemId').val()},
		dataType : "json",
		success : function(res) {
			if(res.errcode) {
				alert(res.errmsg);
			} else {
				location.href = "https://" + res.data.replace(/trade/g, "cashier").replace(/wxpay/g, "pay");
				//location.href = "https://" + res.data;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(JSON.stringify(errorThrown));
			alert("定制失败了，请重新定制！");
		}
	});
}

/**
 * 获取粽子馅料并返回对象
 * @returns
 */
function getFilling() {
	var zz = [];
	$.each(allZZ, function(i, item) {
		getGroup(item, function(arr) {
			//console.log(item);
			if(arr) {
				zz.push(arr);
			} else {
				let msg = [];
				msg.push(item);
				switch(item) {
				case 'NO:39': msg[1]='章鱼须';break;
				case 'NO:50': msg[1]='肉松蛋黄';break;
				case 'NO:51': msg[1]='豆沙球';break;
				case 'NO:52': msg[1]='豆沙';msg[2]='巧克力';break;
				case 'NO:53': msg[1]='豆沙';msg[2]='摩卡';break;
				case 'NO:55': msg[1]='豆沙';msg[2]='蜜枣';break;
				case 'NO:56': msg[1]='燕窝';break;
				case 'NO:57': msg[1]='莲蓉';msg[2]='蛋黄';break;
				case 'NO:58': msg[1]='六颗蜜枣';break;
				case 'NO:59': msg[1]='芝麻';msg[2]='核桃';break;
				}
				zz.push(msg);
			}
		});
	});
	return zz;
}

function closeBox(){
	$(".start-work-tan").hide();
}

function saveDataAndRetCusNo() {
	var json = {};
	json['包装'] = $package;
	json['馅料编号'] = allZZ;
	$.ajax({
		url : "/front/wfz/saveDataAndRetCusNo",
		type : "POST",
		data : {"message" : JSON.stringify(json),
			"itemId" : $('#itemId').val()},
		dataType : "json",
		success : function(res) {
			if(res.succ) {
//				console.log(res.str0Param);
				customizeNo = res.str0Param;
			} else {
				alert("生成定制单号失败，请重新尝试！");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(JSON.stringify(errorThrown));
			alert("生成定制单号失败，请重新尝试！");
		}
	});
}
// 显示粽子馅料名称
function showNames(kind, text, step) {
	if(kind == 'sweet') {
		// 此处为甜粽子
		$("#saltyName").css('opacity', 0);
		$("#sweetName").css('opacity', 1);
		var str = text.split('+');
		if(str.length == 2) {
			text = str[0]+'+<br>'+str[1];
			$($('#sweetName span')[0]).html(text);
		} else {
			$($('#sweetName span')[0]).text(text);
		}
	} else if(kind == 'salty') {
		// 此处为咸粽子
		$("#sweetName").css('opacity', 0);
		$("#saltyName").css('opacity', 1);
		if(step == 1) {
			// 第一个馅料
			$($('#saltyName span')[0]).text(text);
		} else if(step == 2) {
			// 第二个馅料
			$($('#saltyName font')[0]).css('opacity', 1);
			$($('#saltyName span')[1]).text(text);
		} else if(step == 3) {
			// 第三个馅料
			$($('#saltyName font')[1]).css('opacity', 1);
			$($('#saltyName span')[2]).text(text);
		}
	}
}
// 清空粽子馅料名称
function hideNames(kind) {
	if(kind == 'sweet') {
		// 此处为甜粽子
		$($('#sweetName span')[0]).text('');
	} else if(kind == 'salty') {
		// 此处为咸粽子
		$('#saltyName span').text('');
	} else {
		$('.operate-name span').text('');
	}
	$('.operate-name font').css('opacity', 0);
}


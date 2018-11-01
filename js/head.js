
$(function(){
	try{
		Tida.ready({
			module: ["customization", "widget","media"]
		}, function(){
			if(lib.env.aliapp.appname == "TB"){
				if(lib.env.aliapp.version.lt("6.0.0")){
					Tida.toast("当前手淘版本过低无法录音，请升级手淘的版本");
					window.location.href = "https://h5.m.taobao.com/we/isv.html";
					return ;
				}
			}else if(lib.env.aliapp.appname == "TM"){
				if(lib.env.aliapp.version.lt("4.9.1")){
					Tida.toast("当前天猫版本过低无法录音，请升级天猫的版本或使用手淘打开");					
					return ;
				}
			}
		});		
	}catch(e){
		Tida.toast("请用手淘或者天猫打开应用！");
		return ;
	}
	
	
});
var state=1;
var stompClient = null;
var ip="192.168.1.1";
var nowindex;
var nowip;


$(document).ready(function(){
	
	connect();

});


function connect(){
	var socket = new SockJS('http://118.25.100.232:8080/websocket/lowe');
	stompClient=Stomp.over(socket);
	stompClient.connect({},function(frame){
		stompClient.subscribe('/topic/customer', function (greeting) {
			if(JSON.parse(greeting.body).text=='ini'){
				var flag=0;  //1表示已经接入过了
				$('.cur-dia-demo').each(function(){
					if($(this).attr('ip')==JSON.parse(greeting.body).ip){
						flag=1;
					}
				});
				if(flag==0){   
					useradd(JSON.parse(greeting.body).ip);
				}
			}else{
				leftadd(JSON.parse(greeting.body).ip,'客服001',JSON.parse(greeting.body).text);
			}
			
		});
	});
}


$('#send').click(function(){
	var m=document.getElementsByClassName("workbar-cen-record");
	if($('#te').val()==""){
		alert("请在对话框输入聊天内容。");
		return;
	}
	rightadd($('#te').val());

	// $('.panel').scrollTop($('.panel').scrollHeight);
	m[0].scrollTop=m[0].scrollHeight;
	if(state==1){
		stompClient.send("/app/toclient",{},JSON.stringify({'ip':nowip,'text':$('#te').val()}));  
		// stompClient.send("/app/tocustomer",{},JSON.stringify({'ip':ip,'text':$('#te').val()}));   //测试用，发送给自己
	}
	$('#te').val("");
});

function leftadd(ip,name,message){
	$('.workbar-cen-record').each(function(){
		if($(this).attr('ip')==ip){
			$(this).append("<div class='chat-one' style='height: 60px;'><div class='chat-name'>"+name+"</div><div class='left-entity' >"+message+"</div></div>");
		}
	});
	
}

function rightadd(message){
	$('.workbar-cen-record:eq('+nowindex+')').append("<div class='chat-two' style='height: 60px;'><div class='right-entity'>"+message+"</div></div>");
}



$('body').on('click','.cur-dia-demo',function(){
	$('#no-user').css('display','none');
	var i=$(this).index();
	nowindex=i;
	nowip=$(this).attr('ip');
	$(this).addClass('cur-dia');
	$('.cur-dia-demo').each(function(){
		if($(this).index()!=i){
			$(this).removeClass('cur-dia');
		}
	});
	$('.workbar-cen-record').each(function(){
		$(this).css('display','block');
		if($(this).index()!=i){
			$(this).css('display','none');
		}
	});
});


function useradd(ip){
	$('#cur-conversation').prepend("<div class='cur-dia-demo' ip="+ip+"><div class='cur-dia-pic-back iconfont pc'></div><div style='float: left;'><div class='cur-dia-demo-name'>浙江杭州用户</div><div class='cur-dia-demo-ip'>IP: "+ip+"</div></div></div>");
	// $('#no-user').css('display','none');
	$('#workbar-centern').prepend("<div class='workbar-cen-record' ip="+ip+"><h style='width: 100%;height: 50px;display: block;'></h><a class='workbar-his' style='display: block;'>点击加载历史消息</a></div>")
}





















function changeRightOne(){
	var x=document.getElementsByClassName("workbar-right-option-son");
	x[0].style.background="rgb(54,168,255)";
	x[1].style.background="rgb(242,242,247)";
	x[2].style.background="rgb(242,242,247)";
	x[0].style.color="white";
	x[1].style.color="black";
	x[2].style.color="black";
	var y=document.getElementsByClassName("workbar-right-option-entity");
	y[0].style.display="block";
	y[1].style.display="none";
	y[2].style.display="none";

}

function changeRightTwo(){
	var x=document.getElementsByClassName("workbar-right-option-son");
	x[1].style.background="rgb(54,168,255)";
	x[0].style.background="rgb(242,242,247)";
	x[2].style.background="rgb(242,242,247)";
	x[1].style.color="white";
	x[0].style.color="black";
	x[2].style.color="black";
	var y=document.getElementsByClassName("workbar-right-option-entity");
	y[0].style.display="none";
	y[1].style.display="block";
	y[2].style.display="none";
}
function changeRightThree(){
	var x=document.getElementsByClassName("workbar-right-option-son");
	x[2].style.background="rgb(54,168,255)";
	x[0].style.background="rgb(242,242,247)";
	x[1].style.background="rgb(242,242,247)";
	x[2].style.color="white";
	x[0].style.color="black";
	x[1].style.color="black";
	var y=document.getElementsByClassName("workbar-right-option-entity");
	y[0].style.display="none";
	y[2].style.display="block";
	y[1].style.display="none";
}



function changeLeftOne(){
	var x=document.getElementsByClassName("workbar-left-option-son");
	x[0].style.background="rgb(54,168,255)";
	x[1].style.background="rgb(242,242,247)";
	x[2].style.background="rgb(242,242,247)";
	x[0].style.color="white";
	x[1].style.color="black";
	x[2].style.color="black";
	var y=document.getElementsByClassName("workbar-left-option-entity");
	y[0].style.display="block";
	y[1].style.display="none";
	y[2].style.display="none";

}

function changeLeftTwo(){
	var x=document.getElementsByClassName("workbar-left-option-son");
	x[1].style.background="rgb(54,168,255)";
	x[0].style.background="rgb(242,242,247)";
	x[2].style.background="rgb(242,242,247)";
	x[1].style.color="white";
	x[0].style.color="black";
	x[2].style.color="black";
	var y=document.getElementsByClassName("workbar-left-option-entity");
	y[0].style.display="none";
	y[1].style.display="block";
	y[2].style.display="none";
}

function changeLeftThree(){
	var x=document.getElementsByClassName("workbar-left-option-son");
	x[2].style.background="rgb(54,168,255)";
	x[0].style.background="rgb(242,242,247)";
	x[1].style.background="rgb(242,242,247)";
	x[2].style.color="white";
	x[0].style.color="black";
	x[1].style.color="black";
	var y=document.getElementsByClassName("workbar-left-option-entity");
	y[0].style.display="none";
	y[2].style.display="block";
	y[1].style.display="none";
}










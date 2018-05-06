var state=0; //人工为0，客服为1
var count=0;
var stompClient = null;
//传递用户key值
var login = "ricky";
var ip=returnCitySN["cip"];



$('#send').click(function(){
	var m=document.getElementsByClassName("panel");
	if($('#te').val()==""){
		alert("请在对话框输入聊天内容。");
		return;
	}
	rightadd($('#te').val());
	
	// $('.panel').scrollTop($('.panel').scrollHeight);
	m[0].scrollTop=m[0].scrollHeight;
	if(state==1){
		// stompClient.send("/app/toclient",{},JSON.stringify({'ip':ip,'text':$('#te').val()}));  //测试用，发送给自己
    	stompClient.send("/app/tocustomer",{},JSON.stringify({'ip':ip,'text':$('#te').val()}));
	}
    $('#te').val("");
});

function connect(){
	// var socket = new SockJS('http://localhost:8080/lowe');
    var socket = new SockJS('http://118.25.100.232:8080/websocket/lowe');
	stompClient=Stomp.over(socket);
	stompClient.connect({},function(frame){
		stompClient.subscribe('/topic/client-'+ip, function (greeting) {
			leftadd('客服001',JSON.parse(greeting.body).text);
		});
		stompClient.send("/app/tocustomer",{},JSON.stringify({'ip':ip,'text':'ini'}));
	});
}



function turnper(){
	
	state=1;
	$('.change:eq(1)').css('display','none');
	$('.top-name:eq(0)').text("客服001");
	$('.kefu-pic:eq(0)').css('display','block');
	leftadd("客服001","您好，有什么可以帮助您的吗？");


	connect();
}



$("#quit").click(function(){
	$(".kbques-zhedang").css("display","block");
	$(".eva").css("display","block");
});


$("#commit-evaluete").click(function(){
	$(".kbques-zhedang").css("display","none");
	$(".eva").css("display","none");
});


function leftadd(name,message){
	$('.panel').append("<div class='chat-one' style='height: 60px;'><div class='chat-name'>"+name+"</div><div class='left-entity' >"+message+"</div></div>");
}

function rightadd(message){
	$('.panel').append("<div class='chat-two' style='height: 60px;'><div class='right-entity'>"+message+"</div></div>");
}










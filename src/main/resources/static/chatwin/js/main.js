var state=0; //人工为0，客服为1
var count=0;
var isInputM=0;
var stompClient = null;
//传递用户key值
var login = "ricky";
var ip=returnCitySN["cip"];

var pid;
var compid;






$('#send').click(function(){
	var m=document.getElementsByClassName("panel");
	if($('#te').val()==""){
		alert("请在对话框输入聊天内容。");
		return;
	}
	str=replace_em($('#te').val());
	rightadd(str);
	m[0].scrollTop=m[0].scrollHeight;
	if(isInputM==1){
		if(state==1){
			// stompClient.send("/app/toclient",{},JSON.stringify({'ip':ip,'text':$('#te').val()}));  //测试用，发送给自己
			stompClient.send("/app/tocustomer",{},JSON.stringify({'ip':ip,'text':$('#te').val()}));
		}else{
			$.ajax({
				type: "GET",
				// dataType:'jsonp',
				data:{"pid":pid,"compid":compid,"q":str},
				url: "http://localhost:44442",
				success: function(data){

					leftadd('小蓝',data);
					
				},
				error: function(){
            	// $("#logininfo").text("请求超时");
            	console.log("fail");
            	alert("请求失败");
            },
        });
		}
	}else{
		confirmInput(str);
		
	}
	
	$('#te').val("");
});

function connect(){
	var socket = new SockJS('http://localhost:8080/lowe');
	// var socket = new SockJS('http://118.25.100.232:8080/websocket/lowe');
	stompClient=Stomp.over(socket);
	stompClient.connect({},function(frame){
		stompClient.subscribe('/topic/client-'+ip, function (greeting) {
			var str=replace_em(JSON.parse(greeting.body).text)
			leftadd('客服001',str);
		});
		stompClient.send("/app/tocustomer",{},JSON.stringify({'ip':ip,'text':'ini'}));
	});
}



function turnper(){
	if(isInputM==0){
		leftadd("小蓝","请先输入公司和产品型号。");
		return;
	}
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





function replace_em(str){

	str = str.replace(/\</g,'&lt;');

	str = str.replace(/\>/g,'&gt;');

	str = str.replace(/\n/g,'<br/>');

	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="arclist/$1.gif" border="0" />');

	return str;

}

function confirmInput(mes){
	var arr=mes.split('-');
	compid=arr[0];
	pid=arr[1];
	console.log(arr[0]);
	console.log(arr[1]);
	if(arr[0]==null||arr[1]==null){
		leftadd("小蓝","请按照正确的格式输入公司和产品型号");
		return;
	}
	isInputM=1;
}









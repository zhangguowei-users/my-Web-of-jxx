var zhanghu1;
$(document).ready(function(){
//获取userid
$.ajax({
    url:config.ip + config.port + '/getUserInfo',
    type: 'POST',
    async: false,
    xhrFields:{withCredentials:true},
    success:function(data){
        if(data.length == 0 || data ==null) return'未登录无法获取userid';
        else zhanghu1 = data[0].userid;  
    },
    error:function(){
        return'未登录无法获取userid';
    }
});
tuichudenglu();
$("#login").click(function(){
    PDclick();
});
if(jiancelogin()){
    $("#login1").css("display","none");
    $("#gb").css("display","inline-block");
    $("#help").css("display","inline-block");
    $("#setting").css("display","inline-block");
    $("#inf-namenow-time").html(newTime());
    huoquName();
    $("#login").css("display","inline-block");
};
$("#gb").click(function(){
    $("#login1").css("display","inline-block");
    $("#gb").css("display","none");
    $("#help").css("display","none");
    $("#setting").css("display","none");
    $("#login").css("display","none");
});
$("#login1").click(function () {
    window.location.href = "./login.html";
});
$("#time1").html(newTime());
$(".control").click(function(){
    if(jiancelogin()){
        if(this.className == "control one"){
            $.ajax({
                url:config.newip + config.newport + '/arcgis/Other/PostLog',
                type:'POST',
                async:false,
                data:{userid:zhanghu1,content:'点击资源共享'}
              });
            window.location.href = "zygx.html";
        }else if(this.className == "control two"){
            $.ajax({
                url:config.newip + config.newport + '/arcgis/Other/PostLog',
                type:'POST',
                async:false,
                data:{userid:zhanghu1,content:'点击专项调查'}
              });
            window.location.href = "zxdc.html";
        }else if(this.className == "control three"){
            $.ajax({
                url:config.newip + config.newport + '/arcgis/Other/PostLog',
                type:'POST',
                async:false,
                data:{userid:zhanghu1,content:'点击统计分析'}
              });
            window.location.href = "tjfx.html";
        }else if(this.className == "control four"){
            $.ajax({
                url:config.newip + config.newport + '/arcgis/Other/PostLog',
                type:'POST',
                async:false,
                data:{userid:zhanghu1,content:'点击文档共享'}
              });
            window.location.href = "wdgx.html";
        }
    }else{
        window.location.href = "./login.html";
    }    
});
//获取新闻列表
$.ajax({
    url:config.newip + config.newport + '/arcgis/Other/GetNoticeList?istitle=1',
    type: 'GET',
    async: false,
    success:function(data){
       let str='';
       let tr = '';
       for(let i=0,len=data.data.length;i<len;i++){
         if(data.data[i].titleimage == null){
            data.data[i].titleimage = './img/time.png';
         };
         if(data.data[i].createtime == null){
            data.data[i].createtime = '0000-00-00T00:00:00';
         };
         if(data.data[i].istitle == 0){
            str+=`<div class="sum" Intime='${data.data[i].createtime}' Inhtml='${data.data[i].content}'  title='${data.data[i].title}'><div class="data"><div class="day">${data.data[i].createtime.split('T')[0].split('-')[2]}</div><div class="year">${data.data[i].createtime.split('T')[0].split('-')[0]}-${data.data[i].createtime.split('T')[0].split('-')[1]}</div></div><img class="sum-img" src="./img/home__19.png" alt=""><div class="inf"><div class="inf-tilte">${data.data[i].title}</div><div class="inf-con">${data.data[i].content}</div></div></div>`;
         }else{
            tr+=`<img class='time-pc' Intime='${data.data[i].createtime}' title='${data.data[i].title}' src="${data.data[i].titleimage}" inhtml='${data.data[i].content}'/>`;
         }; 
       };
       $('#time-r').append(str);
       $('#time-pc').append(tr);
    }
});
$.ajax({
    url:config.newip + config.newport + '/arcgis/Other/GetNoticeList?istitle=0',
    type: 'GET',
    async: false,
    success:function(data){
       let str='';
       let tr = '';
       for(let i=0,len=data.data.length;i<len;i++){
         if(data.data[i].titleimage == null){
            data.data[i].titleimage = './img/time.png';
         };
         if(data.data[i].createtime == null){
            data.data[i].createtime = '0000-00-00T00:00:00';
         };
         if(data.data[i].istitle == 0){
            str+=`<div class="sum" Intime='${data.data[i].createtime}' Inhtml='${data.data[i].content}'  title='${data.data[i].title}'><div class="data"><div class="day">${data.data[i].createtime.split('T')[0].split('-')[2]}</div><div class="year">${data.data[i].createtime.split('T')[0].split('-')[0]}-${data.data[i].createtime.split('T')[0].split('-')[1]}</div></div><img class="sum-img" src="./img/home__19.png" alt=""><div class="inf"><div class="inf-tilte">${data.data[i].title}</div><div class="inf-con">${data.data[i].content}</div></div></div>`;
         }else{
            tr+=`<img class='time-pc' Intime='${data.data[i].createtime}' title='${data.data[i].title}' src="${data.data[i].titleimage}" inhtml='${data.data[i].content}'/>`;
         }; 
       };
       $('#time-r').append(str);
       $('#time-pc').append(tr);
    }
});
//头条新闻轮播图
let len = $('.time-pc').length;
let i = 0;
$(".time-pc").eq(0).fadeIn(3000);
setInterval(function(){
    if(i<len-1){
        $(".time-pc").eq(i).fadeIn(3000);
        $(".time-pc").eq(i).fadeOut(3000);
        i++;
    }else if(i==len-1){
        $(".time-pc").eq(i).fadeIn(3000);
        $(".time-pc").eq(i).fadeOut(3000);
        i=0;
    };
},6005);
//top轮播图
$.ajax({
    url:config.newip + config.newport + '/arcgis/Other/GetBannerList',
    type: 'GET',
    async: false,
    success:function(data){

    }
});
//点击新闻打开
$('.time-pc,.sum').on('click',function(){
   $('#news').css('display','block');
   $('#title').html($(this).attr('title'));
   $('#time_7').html($(this).attr('Intime').split('T')[0].split('-')[0]+'年'+$(this).attr('Intime').split('T')[0].split('-')[1]+'月'+$(this).attr('Intime').split('T')[0].split('-')[2]+'日')
   $('#content').html($(this).attr('inhtml'));
});
//点击新闻关闭
$('#off').on('click',function(){
   $('#news').css('display','none');
});
});



/****登陆注册界面*****/

/****点击jd图标跳转到jd首页**/
$('.icon_link .icon_img').onclick =function(){
    location.href = 'index.html';
}
let account = $('.login_tab_item .zhanghu');
let qrcode = $('.login_tab_item .saoma');

/***切换登录方式**/

$('#account').onclick = function(){
    account.style.display = 'block';
    qrcode.style.display = 'none';
}
$('#saoma').onclick = function(){
    account.style.display = 'none';
    qrcode.style.display = 'block';
}
$('.saoma .saoma_img').onmouseenter = function(){
    // $('.phone_img').fadeIn();
    $('.phone_img').style.display = 'block';
    $('.code_img').style.marginLeft = '10px';
}
$('.saoma .saoma_img').onmouseleave = function(){
    $('.phone_img').style.display = 'none';
    $('.code_img').style.marginLeft = '80px';
}


//登录
let inputel = $('.login_tab_item .zhanghu .tel');
let psw = $('.login_tab_item .zhanghu .password');
let loginBtn = $('.login_tab_item .zhanghu button');
loginBtn.onclick = function (){
    console.log(inputel.value);
    if(inputel.value == 'zs' && psw.value ==123456){
        location.href = 'index.html';
    }
}

// obj["zhangsan"] = ['zs','123456'];
//         // 设置存储属性 用户名 密码
//         localStorage.setItem('users',JSON.stringify(obj));
//         let obj1 = localStorage.getItem('users');
//         obj1 = JSON.parse(obj1);
//         //遍历数组  如果存在用户名 zs 登录
//         for(let i in obj1){
//             if(i == 'zhangsan'){
//                 location.href = 'index.html';
//             }
//         }
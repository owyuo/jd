/***填写账号信息***/
//获取元素
let username = $('main>form .username');
let password = $('main>form .password');
let psw = $('main>form .psw');
let address = $('main>form .address');
let email =$('main>form .email');
let  index = 0;
console.log(password);
console.log(psw);

let tip1 = $('.tip1');
let tip2 = $('.tip2');
let tip3 = $('.tip3');
let tip4 = $('.tip4');
let tip5 = $('.tip5');
console.log(tip3,tip5);
// console.log(typeof(index));
/********/

//tip1 用户名正则，4到16位（字母，数字，下划线，减号）
username.onblur = userKey
function userKey(){
    //4-16为数字，字母，下划线
    let uName = username.value;
    // console.log(uName);
    let unameReg = /^[a-zA-Z0-9_-]{4,8}$/ ;
    if(unameReg.test(uName) ){
        index ++;
        tip1.style.display = 'none';
        console.log(index);
        return uName;
    }
    else{
        tip1.style.display = 'block';
        return false;
    }
}

//tip2.密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
password.onblur = pswTest
function  pswTest(){
    let passw = password.value;
    let passwReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/ ;
    if(passwReg.test(passw)){
        index ++;
        tip2.style.display = 'none';
        return password.value;
        
    }
    else{
        tip2.style.display = 'block';
        return false
    }
   
}

//tip3请确认密码
psw.onblur = function (){
    let pswInput = psw.value;
    let pswSure = pswTest()
    // console.log();
    if(pswInput==pswSure){
        index ++;
        tip3.style.display = 'none';
    }
    else{
        tip3.style.display = 'block';
        return false
    }
}
address.onblur = function (){
    //4-16为数字，字母，下划线
    let addre = address.value;
    let addreReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
    if(addreReg.test(addre) ){
        index ++;
        tip4.style.display = 'none';
        console.log(index);
    }
    else{
        tip4.style.display = 'block';
        return false
    }
}
email.onblur = function (){
    //4-16为数字，字母，下划线
    let emai = email.value;
    let emailReg = /^[1-9]{6}$/ ;
    if(emailReg.test(emai) ){
        index ++;
        console.log(index);
    }
    else{
        return false;
    }
}



//禁止表单的默认行为
//注册成功则转到首页
let formBtn =$('form');
// console.log(formBtn);
formBtn.onclick = function (){
    if(index == 5){
        location.href = 'index.html';
        let u_key = userKey();
        get_userList(u_key);
    }else{
       // return false;
    }
}
//处理得到的id（以用户名为id）
function get_userList (val){
    let userdata = localStorage.getItem('database');
if(!userdata) {
    user_list = { [id]:val }
    localStorage.setItem('database',JSON.stringify(user_list));
    location.href = 'index.html';
}
else {
    tip5.style.display = 'block';
    console.log('用户已经存在');
    location.href = 'login.html';
}
}

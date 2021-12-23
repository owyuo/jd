/***填写账号信息***/
//获取元素
let username = $('main>form .username');
let password = $('main>form .password');
let psw = $('main>form .psw');
let address = $('main>form .address');
let email =$('main>form .email');
let  index = 0;

let tip1 = $(' .tip1');
let tip2 = $(' .tip2');
let tip3 = $('.tip3');
let tip4 = $(' .tip4');
console.log(tip1,tip2);
// console.log(typeof(index));
/********/


username.onblur = function (){
    //4-16为数字，字母，下划线
    let uName = username.value;
    console.log(uName);
    let unameReg = /^[a-zA-Z0-9_-]{4,8}$/ ;
    if(unameReg.test(uName) ){
        index ++;
        tip1.style.display = 'none';
        console.log(index);
    }
    else{
        tip1.style.display = 'block';
        return false;
    }
}
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
password.onblur = pswTest()
function  pswTest(){
    let passw = password.value;
    let passwReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/ ;
    if(passwReg.test(passw)){
        index ++;
        tip2.style.display = 'none';
        return passw;
    }
    else{
        tip2.style.display = 'block';
        return false
    }
}
//请确认密码
password.onblur = function (){
    let pswInput = psw.value;
    let pswSure = pswTest()
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
        return false
    }
}
//禁止表单的默认行为
let formBtn =$('form');
console.log(formBtn);
formBtn.onclick = function (){
    if(index == 5){
        location.href = 'index.html';
    }else{
        return false;
    }
}

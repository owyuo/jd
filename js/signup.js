/***填写账号信息***/
//获取元素
let phonenum = $('main>form .phonenum');
let username = $('main>form .username');
let password = $('main>form .password');
let psw = $('main>form .psw');
let address = $('main>form .address');
let email =$('main>form .email');
let  index = 0;
console.log(password);
console.log(psw);
let tip0 = $('.tip0');
let tip1 = $('.tip1');
let tip2 = $('.tip2');
let tip3 = $('.tip3');
let tip4 = $('.tip4');
let tip5 = $('.tip5');
console.log(tip3,tip5);
// console.log(typeof(index));

/********/
//tip0
phonenum.onblur = telCode
function telCode(){
    //4-16为数字，字母，下划线
    let phone = phonenum.value;
    // let phoneReg = /^1[3-9]\d{9}$/ ;
    let phoneReg = /^[1-9]{6}$/
    if(phoneReg.test(phone) ){
        index ++;
        tip0.style.display = 'none';
        console.log(index);
        return phone;
    }
    else{
        tip0.style.display = 'block';
        return false;
    }
}

//tip1 用户名正则，4到16位（字母，数字，下划线，减号）
username.onblur =function (){
    //4-16为数字，字母，下划线
    let uName = username.value;
    // console.log(uName);
    //let unameReg = /^[a-zA-Z0-9_-]{4,8}$/ ;
    let unameReg = /^[1-9]{6}$/ ;
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

//tip2.密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
password.onblur = pswTest
function  pswTest(){
    let passw = password.value;
    console.log(passw);
    //let passwReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/ ;
    let passwReg = /^[1-9]{6}$/ ;

    if(passwReg.test(passw)){
        index ++;
        tip2.style.display = 'none';
        console.log(index);
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
    if(pswInput==pswSure && pswSure){
        // index ++;
        tip3.style.display = 'none';
        console.log(index);
    }
    else{
        tip3.style.display = 'block';
        console.log(1123456);
        return false
    }
}
//邮箱
address.onblur = function (){
    //4-16为数字，字母，下划线
    let addre = address.value;
    //let addreReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
    let addreReg = /^[1-9]{6}$/ ;

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
//邮箱验证码
email.onblur = function (){
    //6位数字
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
    console.log(index);
    let pn = telCode();
    console.log(pn);
    if(index == 6 ||index == 7||index == 8||index == 9||index == 10){
        // location.href = 'index.html';
        let key = telCode();
        console.log(key);
        get_userList(key);
        return false
    }else{
        return false;
    }
}
//处理得到的id（以用户名为id）
//mima
// let usercode = pswTest();
//yonghuming
// let key  = telCode();
function get_userList (key){
    let userList = localStorage.getItem('teldata');
if(!userList) {
    //用户不存在新建数据
    userList = { key }
    console.log(userList);
    localStorage.setItem('teldata',JSON.stringify(userList));
    // location.href = 'index.html';
}
else {
    tip5.style.display = 'block';
    for(let keyword in userList){
        //如果用户存在
        if(keyword == key) {
            location.href = 'login.html';
            console.log(key);
        }
        else {
            userList = {  key }
            console.log(userList);
            localStorage.setItem('teldata',JSON.stringify(userList));
            console.log('已经添加数据');
            tip5.style.display = 'none';
        }
    }
    // console.log('用户已经存在');
    // location.href = 'login.html';
}
}

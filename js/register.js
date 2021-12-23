$('.w .icon_img').onclick = function(){
    location.href = 'index.html';
}

$('.icon_link .login span a').onclick = function(){
    localocation.href = 'login.html';
} 


/***验证***/

let reginput = $('.many>input');
let tip2 =$('.tip2');
let tip3 = $('.tip3');
let bt2 = $('main>.bt2');
// console.log(tip3);
//验证手机号表达式
let telReg = /^1[3-9]\d{9}$/
//失去焦点时获取输入的手机号码
/***阻止默认提交行为**/
reginput.onblur = function(){
    if(telReg.test(reginput.value)){
       bt2.onclick = function(){
           location.href = 'sign-up-two';
       }
    }else{
        tip3.style.display= 'block';
        tip2.style.display= 'none';
    }
}
//禁止表单的默认行为
let formBtn =$('form');
console.log(formBtn);
formBtn.onclick = function (){
        // return false;
}



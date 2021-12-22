$('.location').onmouseenter = function(){
    //鼠标移入显示位置信息
    $('.location .loca').style.display = 'block';
}
$('.location').onmouseleave= function(){
    //鼠标移入显示位置信息
    $('.location .loca').style.display = 'none';
}
/***点击下拉列表改变定位*****/
let loca_list = $$('.location .loca li');
let loca_name = $('.location span');
for(let i=0;i<loca_list.length;i++){
$$('.location .loca li')[i].onclick = function (){
    //清除样式
    for(let j =0;j<loca_list.length;j++){
        // console.log('123'+this);
        //此处this不指向loca_list;
        loca_list[j].style.backgroundColor = '#fff';
        loca_list[j].style.color = '#999';
    }
    // console.log(this);
    this.style.backgroundColor = '#f10215';
    this.style.color = '#fff';
    loca_name.innerHTML = loca_list[i].innerHTML;
    }
}

/****头部导航栏****/
//事件委托
let tabMenu_li =$$('.user_tab_items .user_tab_menu');
for (let i=0;i<tabMenu_li.length;i++){
    // tabMenu_li[i].setAttribute('top_num',i);
    $$('.user_tab_items .tab_item')[i].onmouseenter = function(event){
        let target =event.target;
            if(target.nodeType ==1){
                console.log(this);
                console.log(this.childNodes.childNodes);
                this.childNodes[3].style.display='block';
        }
    }
    $$('.user_tab_items .tab_item')[i].onmouseleave = function(event){
        let target =event.target;
            if(target.nodeType ==1){
                console.log(this);
                console.log(this.childNodes.childNodes);
                this.childNodes[3].style.display='none';
        }
    }
}
//点击头部大图标转到首页
$('.head_search .icon_img').onclick = function (){
    location.href = 'index.html';
}
//鼠标划入显示分类
$('.head_search .total_class').onmouseenter = function (){
    $('.total_class .class_tab').style.display = 'block';
    $('.total_class .sanjiao').style.transform = 'rotate(225deg)';

}
//小箭头旋转
$('.head_search .total_class').onmouseleave = function (){
    $('.total_class .class_tab').style.display = 'none';
    $('.total_class .sanjiao').style.transform = 'rotate(45deg)';
}

//导航栏事件委托
let nav_li =$$('.nav_tab .item_tab_msg');
for (let i=0;i<nav_li.length;i++){
    // tabMenu_li[i].setAttribute('top_num',i);
    $$('.nav_tab_list .nav_tab_item')[i].onmouseenter = function(event){
        let target =event.target;
            if(target.nodeType ==1){
                // console.log(this);
                // console.log(this.childNodes.childNodes);
                this.childNodes[3].style.display='block';
        }
    }
    $$('.nav_tab_list .nav_tab_item')[i].onmouseleave = function(event){
        let target =event.target;
            if(target.nodeType ==1){
                // console.log(this);
                // console.log(this.childNodes.childNodes);
                this.childNodes[3].style.display='none';
        }
    }
}

//huawei
$('.left .huawei_item').onmouseenter = function(){
    $('.goods_msg .left .more_goods').style.display = 'block';
}
$('.left .huawei_item').onmouseleave = function(){
    $('.goods_msg .left .more_goods').style.display = 'none';
}

//放大镜

let smallBox = $('.product_details .mid_photo');
let mask = $('.product_details .mask');
let bigBox = $('.product_details .big_photo');
let pic = $('.big_photo .big_img');
// console.log(pic);

smallBox.onmouseenter=function (){
    mask.style.display = 'block';
    bigBox.style.display = 'block';
}
smallBox.onmouseleave=function (){
    mask.style.display = 'none';
    bigBox.style.display = 'none';
}
//当鼠标移入到smallBox里面时让鼠标进行跟随
smallBox.onmousemove = function(e){
    e = e || window.event;
    //获取鼠标的坐标
    let x = e.pageX - smallBox.offsetLeft - mask.offsetWidth/2 
    let y = e.pageY - smallBox.offsetTop - mask.offsetHeight/2
    // console.log(x,y);
    //边界值判断
    if(x<=0){
        x = 0
    }else if(x>=smallBox.offsetWidth - mask.offsetWidth){
        x = smallBox.offsetWidth - mask.offsetWidth;
    }
    if(y<=0) {
        y = 0
    }else if (y>=smallBox.offsetHeight - mask.offsetHeight) {
        y = smallBox.offsetHeight - mask.offsetHeight;
    }
    mask.style.left = x + 'px';
    mask.style.top = y + 'px';

    //计算比例
    let bigPhoto = $('.product_details .mid_photo .showimg');
    // console.log(bigPhoto);
    let w = x / (smallBox.offsetWidth - mask.offsetWidth)
    let h = y / (smallBox.offsetHeight - mask.offsetHeight)
    //给大图进行赋值操作
    
    // console.log(bigPhoto)
    bigPhoto.style.left = -w * (bigPhoto.offsetWidth - bigBox.offsetWidth) + 'px'
    bigPhoto.style.top = -h * (bigPhoto.offsetHeight - bigBox.offsetHeight) + 'px'
    // console.log(bigPhoto.style.left);
    // console.log(bigPhoto.style.top);

}

//鼠标移入切换图片
let picList=$$('.product_details .list_item_menu li');
let mid_photo = $$('.product_details .mid_photo>img');
let big_photo = $$('.product_details .mid_photo .big_photo img');
// console.log(picList,mid_photo,big_photo);

for (let i = 0;i<picList.length;i++){
    
    picList[i].onclick = function(){  
        for (let j=0;j<picList.length;j++){
            mid_photo[j].style.display = 'none';
            big_photo[j].style.display = 'none';
            big_photo[j].classList.remove('showimg');
            picList[j].classList.remove('tab_current');
            // console.log(123);
        }
        mid_photo[i].style.display = 'block';
        big_photo[i].style.display = 'block';
        big_photo[i].classList.add('showimg');
        this.classList.add('tab_current');

    }
}



//点击增加数量
let buy_num = $('.product_details .num_box .count');
let buyNum_add=$('.product_details .num_box .add');
let buyNum_minus=$('.product_details .num_box .minus');
buyNum_add.onclick = function(){
    buy_num.innerHTML = (buy_num.innerHTML-0)+1;
}
buyNum_minus.onclick = function(){
    if(buy_num.innerHTML != '1')
    buy_num.innerHTML = (buy_num.innerHTML-0)-1;
}
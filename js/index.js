
/***定位***/
/*****鼠标划入划出显示列表***/
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

// $('.user .user_tab_items').onmouseleave = function(eve){
//     let tar =eve.target;
//     if(tar.nodeName.toLowerCase()== 'a'){
//         tar.nextElementSibling.style.display = 'none';
//     }else if(tar.nodeName.toLowerCase()== 'li'){
//         tar.nextElementSibling.style.display = 'none';
//     }
// }

/***头部搜索栏****/
let topInput = $('.search_item input[type="text"]');
let ul = $('.input_content');
let timer= '';
let timer1 = '';
topInput.oninput = function (){
    clearInterval(timer);
    clearInterval(timer1);
    timer = setTimeout(() => {
        this.value && sendRequest(this.value);
    }, 1000);
    timer1 = setTimeout(() => {
        if(!this.value){
            ul.innerHTML = '';
        }
    }, 2000);
}
function sendRequest(keyword){
    let sc = document.createElement('script');
    sc.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + keyword + "&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=callback";
    document.head.appendChild(sc);
    sc.remove();
}
function callback(data){
    let {s} = data;
    s.forEach(keyword =>{
        let li =document.createElement('li');
        li.innerHTML = keyword;
        ul.appendChild(li);
    }
    )
}

/*****第一个大轮播图*****/
let container = $('.shop_nav .lunbotu .content');
let pic = container.children
let numBtn = $('.dotted');
let next = $('.lunbotu .btn_r');
let prev =$('.lunbotu .btn_l');
let showBtn = $('.shop_nav .lunbotu');

//鼠标划入时显示按钮划出时按钮隐藏
showBtn.onmouseenter = function(){
    next.style.display = 'block';
    prev.style.display = 'block';
}
showBtn.onmouseleave = function(){
    next.style.display = 'none';
    prev.style.display = 'none';
}
        //动态创建数字按钮
        function setNumbtn() {
            for (let i = 0; i < pic.length; i++) {
                let li = document.createElement('li');
                numBtn.appendChild(li);
            }  
            numBtn.children[0].className = 'active';
    //把第一张图片赋值给最后面，true表示不仅复制了li标记，还把他里面的图片复制了
            let first = pic[0].cloneNode(true);
            container.appendChild(first);
        }
        setNumbtn()

        //点击按钮切换图片
        //当点击过快时，事件重复触发，并没有进入回调函数
        //解决方式：开关
        function picSwitch() {
            for (let i = 0; i < numBtn.children.length; i++) {
                //设置自定义属性，得到下标ol下li的下标
                numBtn.children[i].setAttribute('index', i)
                numBtn.children[i].onclick = function () {
                    let index = this.getAttribute('index')
                    //点击数字按钮时将它的值赋给右侧按钮实现同步操作
                    num = index
                    circle = index;
                    //改变数字按钮颜色,先排他
                    for (let j = 0; j < numBtn.children.length; j++) {
                        numBtn.children[j].className = ''
                    }
                    this.className = 'active'
                    //pic[0].offsetWidth表示第一个图片的宽度
                    //设置负值才会向左移动
                    animation(container, -pic[0].offsetWidth * index, 'left')
                }
            }
        }
        picSwitch()
        let num = 0
        let cir = 0;
        //使用开关的思路解决点击过快不执行判断条件的情况
        let flag = true;
        next.onclick = function () {
            if (flag) {
                flag=false;
                num++;
                animation(container, -pic[0].offsetWidth * num, 'left', function () {
                    if (num == pic.length - 1) {
                        num = 0;
                        container.style.left = 0;
                    }
                    flag=true;
                })
                cir++;
                if (cir > numBtn.children.length-1) {
                    cir = 0;
                }
                for (let j = 0; j < numBtn.children.length; j++) {
                    numBtn.children[j].className = ''
                }
                numBtn.children[cir].className = 'active'
            }
        }
        //点击左侧按钮进行切换
        prev.onclick = function(){
            if (flag) {
                flag=false;
                if (num == 0) {
                        num = pic.length - 1;
                        container.style.left = -pic[0].offsetWidth*num+'px';
                    }
                num--;
                animation(container, -pic[0].offsetWidth * num, 'left', function () {
                   flag=true;
                })
                cir--;
                if (cir < 0) {
                    cir = numBtn.children.length-1;
                }
                for (let j = 0; j < numBtn.children.length; j++) {
                    numBtn.children[j].className = ''
                }
                numBtn.children[cir].className = 'active'
            }
        }
        //自动轮播
        let timer2 = null;
        function auto(){
            timer2=setInterval(() => {
                //next.onclick里面保存的是函数，所以加括号就可以直接调用
                next.onclick()
            }, 2000);
        }
        auto()
        //鼠标移入时自动轮播停止
        container.parentNode.onmouseover = function(){
            clearInterval(timer2)
        }
        container.parentNode.onmouseout = function(){
            auto()
        }


/***第二个小轮播**/

let swiper_container = $('.right_lunbotu .right_content1');
right_pic = swiper_container.children;
let showBtn_right = $('.right_lunbotu');
let swiper_next =$('.right_lunbotu .btn .btn_r');
let swiper_prev=$('.right_lunbotu .btn .btn_l');

//克隆第一张图片
let first_item = right_pic[0].cloneNode(true);
swiper_container.appendChild(first_item);


//鼠标划入划出
showBtn_right.onmouseenter = function(){
    swiper_next.style.display = 'block';
    // console.log(123);
    swiper_prev.style.display = 'block';
}
showBtn_right.onmouseleave = function(){
    swiper_next.style.display = 'none';
    swiper_prev.style.display = 'none';
}

let numb = 0;
let flag1 =true; 
swiper_next.onclick = function () {
    if (flag1) {
        flag1=false;
        numb++;
        animation(swiper_container, -right_pic[0].offsetWidth * numb, 'left', function () {
            if (numb == right_pic.length - 1) {
                numb = 0;
                swiper_container.style.left = 0;
            }
            flag1=true;
        })
    }
}
//点击左侧按钮进行切换
swiper_prev.onclick = function(){
    if (flag1) {
        flag1=false;
        if (numb == 0) {
            numb = right_pic.length - 1;
            swiper_container.style.left = -right_pic[0].offsetWidth*numb+'px';
            }
        num--;
        animation(swiper_container, -right_pic[0].offsetWidth * numb, 'left', function () {
           flag1=true;
        })
    }
}
//自动轮播
let timer3 = null;
function right_auto(){
            timer3=setInterval(() => {
                //next.onclick里面保存的是函数，所以加括号就可以直接调用
                swiper_next.onclick()
            }, 2000);
        }
        right_auto()
        //鼠标移入时自动轮播停止
        swiper_container.parentNode.onmouseover = function(){
            clearInterval(timer3)
        }
        swiper_container.parentNode.onmouseout = function(){
            right_auto()
        }

/***抢购倒计时**/


let hoursBox = $('.count_time .hour');
let minuteBox = $('.count_time .minute');
let secondsBox = $('.count_time .seconds');

//设置将来的时间
let  endTime = new Date('2021/12/23 10:00:00');
//先调用一次,页面初次加载时显示的是h1标签中给定的时间，然后再显示现在的时间
//需要先调用一次函数直接显示现在的时间，然后一秒之后再调用定时器里的djs
djs();
//使用定时器获取时间
setInterval(djs, 1000);
function djs() {
    //设置现在的时间
    let nowTime = new Date();
    //获取总的秒数
    let seconds = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
    // //天数
    // let day = complement(parseInt(seconds / 3600 / 24));
    //小时
    let hours = complement(parseInt(seconds / 3600 % 24));

    //分钟
    let minutes = complement(parseInt(seconds / 60 % 60));

    //秒
    let s = complement(parseInt(seconds % 60));
    //赋值
    hoursBox.innerHTML = hours;
    minuteBox.innerHTML = minutes;
    secondsBox.innerHTML = s;
}
//补位操作：当分钟显示个位数时在前面添加0
function complement(num) {
    return num < 10 ? num = '0' + num : num
}


/**秒杀轮播图****/
let seckill_container = $('.miaosha_lunbo .miaosha_content');
let seckill_pic = seckill_container.children;
let seckill_next = $('.miaosha_lunbo .btn_r');
let seckill_prev = $('.miaosha_lunbo .btn_l');
let seckill_num = 0;
let seckill_cir = 0;
let seckill_flag = true;
//点击按钮切换
seckill_next.onclick = function () {
    if (seckill_flag) {
        seckill_flag=false;
        seckill_num++;
        animation(seckill_container, -seckill_pic[0].offsetWidth * seckill_num, 'left', function () {
            if (seckill_num == seckill_pic.length - 1) {
                seckill_num = 0;
                seckill_container.style.left = 0;
                }
                seckill_flag=true;
                })
            }
        }
        //点击左侧按钮进行切换
seckill_prev.onclick = function(){
    if (seckill_flag) {
        seckill_flag=false;
        if (seckill_num == 0) {
            seckill_num = seckill_pic.length - 1;
            seckill_container.style.left = -seckill_pic[0].offsetWidth*seckill_num+'px';
            }
            seckill_num--;
            animation(seckill_container, -seckill_pic[0].offsetWidth * seckill_num, 'left', function () {
                seckill_flag=true;
                })
            }
        }
       




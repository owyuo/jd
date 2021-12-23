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
//点击图标转到首页
$('.shop_search .icon_img').onclick =function (){
    location.href = 'index.html';
}


/***购物车***/
    // console.log($$('.checkall'));
    let cart_list= $('.cart-item-list');

class Cart {
    constructor() {
        this.checkAll();
        this.delSelected();
        this.getCartGoods();
        cart_list.addEventListener('click', this.clickBubbleFn.bind(this))
    }
    clickBubbleFn(event) {
        let tar = event.target;
        // console.log(tar);
        // console.log(1111111111);

        tar.classList.contains('j-checkbox') && this.oneCheckFn(tar);
        //判断是否点击添加
        tar.classList.contains('increment') && this.addClickFn(tar);
        //判断点击是否减少
        tar.classList.contains('decrement') && this.decrementClickFn(tar);
        //判断是否点击删除
        tar.classList.contains('p-action_x') && this.delClickFn(tar);
    }

    /******获取购物车数据****/
    async getCartGoods (){
        let cartGoods = localStorage.getItem('cart');
        if(!cartGoods) return false;
        cartGoods = JSON.parse(cartGoods);
        //发送请求获取商品数据
        let goodsData = await axios.get({
            url : './js/data.json'
        })
        //循环商品信息，判断是否存在id
        let have_cartGoods = goodsData.filter(item=>{
            return cartGoods[item.id];
        })
        //存在则渲染购物车
        this.render(have_cartGoods,cartGoods);
    }
    //渲染数据
    render(goodsData,render_cartGoods){
        let template = '';
        goodsData.forEach(ele =>{
            // console.log(ele);
            template +=`<div class="cart-item " goods-id="${ele.id}">
            <div class="p-checkbox">
                <input type="checkbox" name="" id=""  class="j-checkbox">
            </div>
            <div class="p-goods">
                <div class="p-img">
                    <img src="${ele.src}" alt="">
                </div>
                <div class="p-msg two_row">${ele.name}</div>
                <div class="p_taocan">小米灰（12+256G）标准版+定制皮套</div>
            </div>
            <div class="p-price">${ele.price}.00</div>
            <div class="p-num">
                <div class="quantity-form">
                    <a href="javascript:;" class="decrement">-</a>
                    <input type="text" class="itxt" value="${render_cartGoods[ele.id]}">
                    <a href="javascript:;" class="increment">+</a>
                </div>
            </div>
            <div class="p-sum">${ele.price* render_cartGoods[ele.id]}.00</div>
            <div class="p-action"><a href="javascript:;" class="p-action_x">删除</a><br><a href="javascript:;">移入关注</a></div>
        </div>` 
        });
        $('.c-container .shop_list').innerHTML = template ; 
    }


     /***全选的实现****/
     checkAll() {
        let allObj = $$('.checkall');
        // console.log(allObj);
        //给全选按钮绑定事件，事件的回调函数this指向节点对象，使用bind
        allObj[0].addEventListener('click', this.allClickFn.bind(this, 1))
        allObj[1].addEventListener('click', this.allClickFn.bind(this, 0))
    }
    allClickFn(checkAllIndex, event) {
        //获取点击的全选按钮的状态 返回结果为true
        let status = event.target.checked;
        // console.log(status);
        $$('.checkall')[checkAllIndex].checked = status;
        this.oneChecked(status);
        this.subTotal(status);
    }
    /***单个商品的选中****/
    //点击全选后所有的单选框选中
    oneChecked(status) {
        // console.log(this.$$('.j-checkbox'));
        $$('.j-checkbox').forEach(one => {
            one.checked = status;
        })
    }

 /***商品单选框回调函数***/
//将单选按钮的点击通过事件委托来实现

    oneCheckFn(target) {
        // console.log(target.checked);
        this.subTotal();
        //单选框全选中的话，让全选框也选中
        
        if (!target.checked) {
            $$('.checkall')[0].checked = false;
            $$('.checkall')[1].checked = false;
            return;
          }
        /******判断购物车中商品数量*****/
        let count = 0 ;
        $$('.j-checkbox').forEach(v=>{
            v.checked && count++;
        })
        //选中的数量等于购物车的数量，则全选中
        console.log(count);
        if(count == $$('.j-checkbox').length){
            $$('.checkall')[0].checked = true;
            $$('.checkall')[1].checked = true;
        }
    }

/****统计数量和价格*****/
//全选框点击和商品的单选框点击都要调用该函数
subTotal ( sta = true){
    let totalNum= 0 ,totalPrice = 0;
    sta && $$('.j-checkbox').forEach(ele=>{
        if(ele.checked){
            let listObj = ele.parentNode.parentNode;
            // console.log(listObj);
            //获取小计和数量  -0是将获取到的价格转从字符型换成数值型
            totalNum+=(listObj.querySelector('.c-container .quantity-form .itxt').value-0);
            totalPrice +=(listObj.querySelector('.c-container .cart-item .p-sum').innerHTML-0);
        }
    })
    $('.cart-floatbar .price-sum em').innerHTML = totalPrice;
    $('.cart-floatbar .amount-sum em').innerHTML = totalNum;
}

/***点击增加数量*****/
addClickFn(target){
    let num = target.previousElementSibling;
    //-0是将他转换成数字
    num.value = num.value -0 +1;
    let sub = target.parentNode.parentNode.nextElementSibling;
    let price = target.parentNode.parentNode.previousElementSibling.innerHTML;
    // sub.innerHTML = (num.value*price).toFixed(2);
    //此处*100再/100 处理数据
    sub.innerHTML = parseInt(((num.value*price)*100)/100);
    let cartItem_list = target.parentNode.parentNode.parentNode
    //当input是选中时。统计价格和数量
    cartItem_list.querySelector('.j-checkbox').checked && this.subTotal();
    //修改local的值
     this.changeNum_list(cartItem_list.getAttribute('goods-id'),num.value);
}
//点击减少数量
decrementClickFn(target){
    let num = target.nextElementSibling;
    if(num.value == '1') return;
    num.value = num.value -0 -1;
    //获取小计
    let sub = target.parentNode.parentNode.nextElementSibling;
    let price = target.parentNode.parentNode.previousElementSibling.innerHTML;
    sub.innerHTML = parseInt(((num.value*price)*100)/100);
    let cartItem_list = target.parentNode.parentNode.parentNode

    cartItem_list.querySelector('.j-checkbox').checked && this.subTotal();
    //修改数量
     this.changeNum_list(cartItem_list.getAttribute('goods-id'),num.value);
}


/***删除商品********/
delClickFn(target){
    let del_list = target.parentNode.parentNode;
    console.log(del_list);
    let that = this;
    layer.open({
        title: '确认删除框'
        , content: '确认删除吗?',
        btn: ['取消', '确认']
        , btn2: function (index, layero) {
        //   console.log(target);
          // 删除当前商品节点
           del_list.remove();
           del_list.querySelector('.j-checkbox').checked && that.subTotal();
        }
      })
      this.changeNum_list(del_list.getAttribute('goods-id'));
}
/****修改数量，num为0删除****/
changeNum_list(id,num = 0){
    console.log(id ,num);
    //取出local数据
    let cartGoods = localStorage.getItem('cart');
    if(!cartGoods) return;
    cartGoods = JSON.parse(cartGoods);
    console.log(cartGoods[id]);
    //删除
    num == 0 && delete cartGoods[id];
    //修改商品数量
    num != 0 && (cartGoods[id] = num);
     localStorage.setItem('cart',JSON.stringify(cartGoods));
}

//底部删除按钮
//遍历购物车数据，找到选中的数据，删除
delSelected(){
    let delSele = $('.cart-floatbar .operation .remove-batch');
    let undefi = $(' .c-container .shop_list');
    // console.log(undefi);
    let chil = undefi.childNodes;
    // console.log(chil);
    console.log($$('.j-checkbox'));
    // for(let ele in chil){
    //      console.log(this);
    // }
    delSele.onclick = function(){
        console.log(this);
    }  
    // chil.filter(item=>{

    //     return $('.c-container .shop_list input')
    // })
}


}
new Cart;
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
//点击图标转到首页
$('.shop_search .icon_img').onclick =function (){
    location.href = 'index.html';
}


/***购物车***/
    console.log($$('.checkall'));
    console.log($('.cart-item-list'));

class Cart {
    constructor() {
        this.checkAll();
        //给tbody绑定事件
        $('.cart-item-list').addEventListener('click', this.clickBubbleFn.bind(this))
    }
    clickBubbleFn(event) {
        let tar = event.target;
        //判断是否是check-one 也就是单选按钮
        //这里不使用className是因为单选按钮有两个类名check-one check
        tar.classList.contains('check-one') && this.oneCheckFn(tar);
        //判断是否点击添加
        tar.classList.contains('add') && this.addClickFn(tar);
        //判断是否点击删除
        tar.classList.contains('delete') && this.delClickFn(tar);
    }
     /***全选的实现****/

     checkAll() {

        let allObj = $$('.checkall');
        console.log(allObj);
        
        //给全选按钮绑定事件，事件的回调函数this指向节点对象，使用bind
        allObj[0].addEventListener('click', this.allClickFn.bind(this, 1))
        allObj[1].addEventListener('click', this.allClickFn.bind(this, 0))
    }
    //使用bind和event时，bind传递的参数在前
    allClickFn(checkAllIndex, event) {
        // console.log(this);
        // console.log(checkAllIndex);
        // console.log(event);
        //获取点击的全选按钮的状态 返回结果为true
        let status = event.target.checked;
        // console.log(status);
        $$('.checkall')[checkAllIndex].checked = status;
        this.oneChecked(status);
        //统计数量和价格
        //传递全选状态   如果是都未选中  status值为false
        // this.subTotal(status);

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
    //将单选按钮的点击事件委托给tbody来实现

    oneCheckFn(target) {

        // console.log(target.checked);

        //不用传递status，使用默认值true
        this.subTotal();
        //单选框全选中的话，让全选框也选中
        
        if (!target.checked) {
            this.$$(' .checkall')[0].checked = false;
            this.$$(' .checkall')[1].checked = false;
            return;
          }
        /******判断购物车中商品数量*****/
        let count = 0 ;
        this.$$('.j-checkbox').forEach(v=>{
            v.checked && count++;
        })
        //选中的数量等于购物车的数量，则全选中
        console.log(count);
        if(count == this.$$('.j-checkbox').length){
            this.$$('.checkall')[0].checked = true;
            this.$$('.checkall')[1].checked = true;
        }
    }

/****统计数量和价格*****/
//全选框点击和商品的单选框点击都要调用该函数
// subTotal ( sta = true){
//     let totalNum= 0 ,totalPrice = 0;
//     sta && $$('.j-checkbox').forEach(ele=>{
//         if(ele.checked){
//             //找到tr
//             let trObj = ele.parentNode.parentNode;
//             // console.log(trObj);
//             //获取小计和数量  -0是将获取到的价格转从字符型换成数值型
//             totalNum+=(trObj.querySelector('.count input').value-0);
//             totalPrice +=(trObj.querySelector('.subtotal').innerHTML-0);
//         }

//     })
//     this.$('#priceTotal').innerHTML = totalPrice;
//     this.$('#selectedTotal').innerHTML = totalNum;
// }

/***点击增加数量*****/
addClickFn(target){
    //获取数量  上一个兄弟节点
    let num = target.previousElementSibling;
    num.value = num.value -0 +1;
    //获取小计
    let sub = target.parentNode.nextElementSibling;
    let price = target.parentNode.previousElementSibling.innerHTML;
    // sub.innerHTML = (num.value*price).toFixed(2);
    //此处*100再/100 处理数据
    sub.innerHTML = parseInt(((num.value*price)*100)/100);
    let tr = target.parentNode.parentNode
    //当input是选中时。统计价格和数量
    tr.querySelector('.j-checkbox').checked && this.subTotal();
    //修改local的值
    // this.modifyLocal(tr.getAttribute('goods-id'),num.value);
}

/***删除商品********/
// delClickFn(target){
//     let tr = target.parentNode.parentNode;
//     let that = this;
//     layer.open({
//         title: '确认删除框'
//         , content: '确认删除吗?',
//         btn: ['取消', '确认']
//         , btn2: function (index, layero) {
//           //按钮【按钮二】的回调
//           //return false 开启该代码可禁止点击该按钮关闭
//         //   console.log(target);
//           // 删除当前商品节点
//            tr.remove();
//            //如果当前删除的行处于选中状态，则重新计算价格和数量
//            //此处注意改变this指向
//            tr.querySelector('.j-checkbox').checked && that.subTotal();
//         }
//       })
//       this.modifyLocal(tr.getAttribute('goods-id'));
// }
// /****修改数量，num为0则为删除****/
// modifyLocal(id,num = 0){
//     // console.log(id ,num);
//     //取出local数据
//     let cartGoods = localStorage.getItem('cart');
//     if(!cartGoods) return;
//     cartGoods = JSON.parse(cartGoods);
//     console.log(cartGoods[id]);
//     //删除
//     num == 0 && delete cartGoods[id];
//     //修改商品数量
//     num != 0 && (cartGoods[id] = num);
//     // localStorage.setItem('cart',JSON.stringify(cartGoods));
// }

}
new Cart;
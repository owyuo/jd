/****获取节点的函数***/
function $ (ele){
    return document.querySelector(ele);
}

function $$(elem){
    return document.querySelectorAll(elem);
}

/*
    缓动动画封装
    + 注意点：缓动动画的步长需要使用缓动动画公式直接计算出来，所以不需要自己传值进去
    @param {object} ele 表示要做动画的元素
    @param {number} target 表示目标值
    @param {string} attr 表示要做动画的属性
    @param {function} callback 回调函数，当前函数执行完毕后，后面的回调函数执行
*/
function animation(ele, target, attr, callback) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        //开始位置  width:200px  200px + 10px  210px + 10px
        let begin = parseFloat(getStyle(ele, attr))
        //步长
        let step = (target - begin) / 10
        //判断
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //赋值结果
        let res = begin + step
        //给元素进行赋值操作
        ele.style[attr] = res + 'px'
        //清除下定时器
        if (res == target) {
            clearInterval(ele.timer)
            //如果咱们传递了这个函数，那就执行，如果没有就不执行
            if (callback) {
                callback()
            }
        }
    }, 30)
}
//获取属性封装
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(ele, null)[attr]
    } else {
        return ele.currentStyle[attr]
    }
}
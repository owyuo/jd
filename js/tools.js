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

//axios方法
class axios {
    static get(params = {}) {
        params.method = 'get';
        return axios.http(params);
    }
    static post(params = {}) {
      params.method = 'post';
        return axios.http(params);
    }
    static http(params) {
        //解析参数
        let {
          method,
            url,
            data,
            dataType = 'json',
        } = params;
        //url不为空
        if (!url) {
            //抛出错误
            throw new Error('url值不为空');
        }
        let msg = null;
        if (data) {
            //将data传入的数据存入新建的数组msg
            msg = [];
            for (let attr in data) {
                msg.push(`${attr}=${data[attr]}`)
            }
            msg = msg.join('&');
            //判断如果是get请求则把参数拼接到url后面
            if (method == 'get') {
                url = url + '?' + msg;
                msg = null;
            }
        }
        //创建Promise对象
        return new Promise((resolve, reject) => {
            //创建对象
            const xhr = new XMLHttpRequest();
            //打开连接
            xhr.open(method, url);
            //设置请求头
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            //发送请求
            xhr.send(msg);
            //处理响应
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    //HTTP状态码 2**表示成功
                    if (xhr.status == 200 ) {
                        let data = xhr.response;
                        //如果从后端传回json数据则进行转换
                        if (dataType == 'json') {
                            data = JSON.parse(data);
                        }
                        resolve(data);
                    } else {
                        // error && error(xhr.status);
                        reject(xhr.status);
                    }
                }
            }
        })
  
    }
  }
  
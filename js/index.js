/**
 * Created by 伊凡 on 2016/7/8.
 */



'use strict';
window.onload = function() {
    //调用轮播图JS
    slide();
    //调用搜索框JS特效
    search();
    //调用倒计是时JS
    downTime();

}

function downTime() {
    //一 总共有5个小时的倒计时
    //二 每隔一秒要减一秒 小时得换成算成秒
    //三 设置定时器每秒总时间--
    //四 设置倒计时标签上
    var time = 5 * 60 * 60; //5个小时的总秒数
    var seckillTime = document.querySelectorAll('.seckill-time')[0];
    var spans = seckillTime.querySelectorAll('span');
    var timer = setInterval(function () {
        time--;//每秒总时间--
        //设置倒计时标签上
        //一 设置时 分十位和个位
        //二 设置分 分十位和个位
        //三 设置秒 分十位和个位
        var h = time / 3600; //求小时 比如 7200 / 3600 == 2小时
        var m = time % 3600 / 60; //求分钟7200 % 3600 == 100秒 / 60 ==1分
        var s = time % 60; //求秒 100 % 60 == 40
        //设置倒计时标签
        spans[0].innerHTML = Math.floor(h / 10); //求十位 23 / 10 == 2
        spans[1].innerHTML = Math.floor(h % 10); //求个位 23 % 10 == 3
        spans[3].innerHTML = Math.floor(m / 10); //求十位  23 /10  == 2
        spans[4].innerHTML = Math.floor(m % 10); //求个位 23 % 10 == 3
        spans[6].innerHTML = Math.floor(s / 10); //求十位  23 /10  == 2
        spans[7].innerHTML = Math.floor(s % 10); //求个位 23 % 10 == 3
    }, 1000);
}




//轮播图JS
function slide() {
    //一 轮播图要自动播
    //二轮播可以无缝轮播
    //三小圆点要跟着轮播图切换
    //四轮播图要滑动 从左往右滑 切换到上一张 从右往左滑 切换到下一张
    //一 定义一个定时器然后每隔几秒 切换一张图片
    //那怎么切换图片 设置ul的translateX() 1*10 2*10 3*30
    var slideUl = document.querySelector('#slide').querySelectorAll('ul')[0];
    var index = 1; //定义一个索引值
    var timer = setInterval(function() {
        //让ul移动 得知道要移动多少
        index++;
        //设置ul的translateX的值
        //获取ul
        //谨记 tranform 一定别错了 translateX
        slideUl.style.transform = "translateX(" + -index * 10 + "%)";
        //加过渡
        addTransition();
    }, 1000);
   //为什么要添加过渡完成事件因为第8张播到第一张
    //还在播的过程中突然就跳到了第一张
    //我们应该等他第8张播到第一张播完才让index偷偷回到第一张index
    //过渡完成之后有一个事件可以触transitionend
    //谁过渡的是不是ul过渡
    //给ul添加过渡完成事件
    //使用CSS3里面的一些高级事件 要使用H5的高级JS添加事件方式
    var points = document.querySelectorAll('#slide ul')[1];//获取小圆点所有的ul
    var lis = points.querySelectorAll('li'); //获取ul里面的所有li
    slideUl.addEventListener('transitionend', function() {
        //conslo.log('过渡完成了' +index);
        // 等过渡完成才偷偷回到第一张
        if(index >=9) {
            console.log(index);
            index = 1;
            //设置ul的translateX的值
            //获取ul
            //谨记 transform 一定别错了 translateX 单位一定要记得
            console.log(slideUl);
            setTranslateX(-index * slideWidth);
            //删除过渡
            removeTransition();
        } else if (index <= 0) {
            index = 8;
            setTranslateX(-index * slideWidth);
            //删除过渡
            removeTransition();
        }
        //一 实现下面的小圆点跟着走
        //二 得获取所有小圆点元素
        //三 给当前这个图片对应的小圆点添加类名
        //四 在等图片切换完成才切换小点
        //所有我们的设置小圆点代码应该放到过渡完成之后
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
        }
        lis[index - 1].className = "now";
    });
    //一 实现轮播图左右滑动
    //二 首先得知道他往哪个方向滑动
    //三 如果是从右往左滑切换到下一张 index++
    //四 index++加完或者减都要设置一下定位 也得过渡
    //一 我们要给ul或者div添加滑动事件
    var startX = 0; //开始的位置
    var endX = 0; //结束的位置
    var distanceX = 0; //移动的位置
    var moveX = 0; //移动中的位置
    var moveDistanceX; //滑动中的时候的移动距离
    slideUl.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        //我们在滑动的过程中定时器也还在走
        //所以我们滑动的时候可能就滑到2张图
        //我们做法是在滑动的时候要清除定时器不让她在继续自动播
        clearInterval(timer);
    });
    //-1000px 1000px +100px == -1100px
    //一 我们滑动中的时间要看得到下一张或者下一张的一点点
    //一 添加滑动中的事件
    //二 得获取他滑动中的位置
    //三 设置滑动中距离+之前的移动的位置
    //四 设置到UL身上
    slideUl.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
        moveDistanceX = moveX - startX; //滑动中的滑动距离
        var x = moveDistanceX + -index * slideWidth;
        //设置到Ul身上
        setTranslateX(x);
        //因为我们在滑动中的时候已经是很慢几十像素 或者1-200
        removeTransition();
    });
    slideUl.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        distanceX = endX - startX;
        //这时候我们在滑动的时候如果不超过一张图片的1/3就让他滑动
        //让他吸附回去（弹回去）
        if (Math.abs(distanceX) > (slideWidth * 1 / 3)) {
            //判断滑动的距离是正的还是负的 负的就是从右往左正的是从左往右
            if (distanceX < 0) {
                index++;
                //到处者要设置这个移动的值
                setTranslateX(-index * slideWidth);
                //加过渡
                addTransition();
            } else {
                //左往右滑切换到上一张 index--
                index--;
                setTranslateX(-index * slideWidth);
                //加过渡
                addTransition();
            }
        }
        //我们如果不超过1/3要让他吸附回去 index 既不加也不减
        index = index;
        setTranslateX(-index * slideWidth);
        //加过渡
        addTransition();
        //建议大家在重新设置定时器在清除一下确保没有问题
        clearInterval(timer);
        //滑动完成之后要重新开始让他自动播放设置回去
        timer = setInterval(function () {
            //让ul移动 得知道移动多少
            index++;
            //设置ul的translateX的值
            //获取ul
            //谨记 transform 一定别错了 translateX 单位一定要记得
            setTranslateX(-index * slideWidth);
            //加过渡
            addTransition();
        }, 1000);
    });
    //获取一张轮播图的宽度
    var slideWidth = document.querySelector('#slide').offsetWidth;
//封装设置移动位置的涵数
    function setTranslateX(x) {
        //因为我们封装涵数要考虑的东西多所以我们为了兼容性
        //我们使用px
        slideUl.style.transform = "translateX(' + x + 'px)";
    }
//封装添加过渡的涵数
    function addTransition() {
        slideUl.style.transition = "all 0.2s";
    }
//封装删除过渡涵数
    function removeTransition() {
        slideUl.style.transition = "none";
    }
}









//搜索框JS
function search() {
    //头部滚动渐变
    //一 得获取这个渐变的盒子 topbar这个盒子
    //二 得获取轮播图盒子的高度 来求得我们透明度值
    //三 监听滚动事件 获取滚动的高度
    //四 计算透明度值 滚动高度 / 轮播图的高度
    //五 设置透明度到我们的topbar盒子身上
    var topbar = document.getElementsByClassName('topbar')[0];
    var slideHeight = document.querySelector('#slide').offsetHeight;

    window.onscroll = function() {
        window.onscroll = function() {
            var scrollTop = document.body.scrollTop;
            var opcity = scrollTop / slideHeight;
            //console.log(opcity);
            topbar.style.background = "rgba(201,21,25," + opcity + ")";
        };
    };
}

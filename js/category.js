/**
 * Created by 伊凡 on 2016/7/9.
 */

window.onload = function () {
    //分类菜单左滑
    swipeLeft();
    swipeRight();
};
function swipeLeft() {
    //一 swipeul要滑动 要能实现连续滑动
    //二 有一个最大允许滑动的距离和最小允许滑动的距离
    //三 最大的Y定位0 最小定位是 -（ul的高度 -左侧分类div的高度）
    //四 最大允许滑动的距离是 （最大定位位置）0 + 缓冲区的的距离
    //最小允许滑动的距离是 最小定位的位置 - 缓冲区的距离
    //五 如果超过最大的定位的位置 让他吸附回去（弹回去）>最大
    //六 如果超过最小的定位的位置 让他吸附回去（弹回去）<小于
    //七 我们要点击li的时候让这个li变为焦点状态
    //八 然后要让这个li跳到顶部
    var categoryLeft = document.querySelector('.category-left');
    var swipeUl = categoryLeft.querySelector('ul');
    //要让ul滑动所以给ul注册滑动事件
    var startY = 0; //初始注册滑动事件
    var moveY = 0; //滑动中的位置
    var distanceY = 0; //滑动中的距离 moveY-startY
    var currentY = 0; //记录当前要定位的位置 （和我们轮播图的index)
    var maxPosition = 0; //最大定位位置
    var minPosition = -(swipeUl.offsetHeight - categoryLeft.offsetHeight); //最小定位位置
    var buffer = 150; //缓冲区的距离
    var maxSwipe = maxPosition + buffer; //最大允许滑动的距离
    var minSwipe = minPosition - buffer; //最小谲诈滑动的距离
    var lis = swipeUl.querySelectorAll('li'); //获取左侧分类的所有li
    swipeUl.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    swipeUl.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //一定记得要记录上次滑动的位置到哪了 下一次滑动从那个位置开始
        //我们当前要滑动的位置要小于最大的 大于最小的才是合法的滑动距离
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            //为了连续滑动 让滑动中的时候根据滑动中的距离不断的改变位置
            setTranslateY(currentY + distanceY);
            //我们在Move的时候已经很慢了所以这个时候不要加过渡
            removeTransition();
        }
    });
    swipeUl.addEventListener('touchend', function(e) {
        //连续记录上次的位置
        currentY = currentY + distanceY;
        if ((currentY + distanceY) > maxPosition) {
            currentY = maxPosition;
            //每次你只要设置了这个setTranslateY current就是要记录一下
            setTranslateY(currentY);
            //因为这时候很快弹回去了所以要加过渡慢慢弹回去
            addTransition();
        } else if ((currentY + distanceY) < minPosition) {
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });
    //添加一个click事件
    swipeUl.addEventListener('click', function(e) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
        }
        e.target.parentNode.className = "now";
        //console.log(e.target.parentNode.index);
        var height = -e.target.parentNode.index * 50;
        //-500px 的时候是大于 -600px 合法 -700px < -600px 不合法
        if (height > minPosition) {
            currentY = height;
            setTranslateY(currentY);
            addTransition();
        } else {
            //如果我们height超过了最小的定位位置 就设置最小定位
            //然后每次设置定位 记得记录到当前的位置currentY
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });
    //封装设置移动位置的涵数
    function setTranslateY(y) {
        //因为我们封装涵数要考虑的东西多所以我们为了兼容性
        //我们使用px
        swipeUl.style.transform = "translateY(" + y + "px)";
    }
    //封装添加过渡的涵数
    function addTransition() {
        swipeUl.style.transition = "all 0.2s";
    }
    //封装删除过渡涵数
    function removeTransition() {
        swipeUl.style.transition = "none";
    }
}


function swipeRight() {
    //一 swipeul要滑动 要能实现连续滑动
    //二 有一个最大允许滑动的距离和最小允许滑动的距离
    //三 最大的Y定位0 最小定位是 -（ul的高度 -左侧分类div的高度）
    //四 最大允许滑动的距离是 （最大定位位置）0 + 缓冲区的的距离
    //最小允许滑动的距离是 最小定位的位置 - 缓冲区的距离
    //五 如果超过最大的定位的位置 让他吸附回去（弹回去）>最大
    //六 如果超过最小的定位的位置 让他吸附回去（弹回去）<小于
    //七 我们要点击li的时候让这个li变为焦点状态
    //八 然后要让这个li跳到顶部
    var categoryLeft = document.querySelector('.category-right');
    var swipeUl = categoryLeft.querySelector('.category-right-content');
    //要让ul滑动所以给ul注册滑动事件
    var startY = 0; //初始注册滑动事件
    var moveY = 0; //滑动中的位置
    var distanceY = 0; //滑动中的距离 moveY-startY
    var currentY = 0; //记录当前要定位的位置 （和我们轮播图的index)
    var maxPosition = 0; //最大定位位置
    var minPosition = -(swipeUl.offsetHeight - categoryLeft.offsetHeight); //最小定位位置
    var buffer = 150; //缓冲区的距离
    var maxSwipe = maxPosition + buffer; //最大允许滑动的距离
    var minSwipe = minPosition - buffer; //最小谲诈滑动的距离
    var lis = swipeUl.querySelectorAll('li'); //获取左侧分类的所有li
    swipeUl.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    swipeUl.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //一定记得要记录上次滑动的位置到哪了 下一次滑动从那个位置开始
        //我们当前要滑动的位置要小于最大的 大于最小的才是合法的滑动距离
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            //为了连续滑动 让滑动中的时候根据滑动中的距离不断的改变位置
            setTranslateY(currentY + distanceY);
            //我们在Move的时候已经很慢了所以这个时候不要加过渡
            removeTransition();
        }
    });
    swipeUl.addEventListener('touchend', function(e) {
        //连续记录上次的位置
        currentY = currentY + distanceY;
        if ((currentY + distanceY) > maxPosition) {
            currentY = maxPosition;
            //每次你只要设置了这个setTranslateY current就是要记录一下
            setTranslateY(currentY);
            //因为这时候很快弹回去了所以要加过渡慢慢弹回去
            addTransition();
        } else if ((currentY + distanceY) < minPosition) {
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });
    //添加一个click事件
    swipeUl.addEventListener('click', function(e) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
        }
        e.target.parentNode.className = "now";
        //console.log(e.target.parentNode.index);
        var height = -e.target.parentNode.index * 50;
        //-500px 的时候是大于 -600px 合法 -700px < -600px 不合法
        if (height > minPosition) {
            currentY = height;
            setTranslateY(currentY);
            addTransition();
        } else {
            //如果我们height超过了最小的定位位置 就设置最小定位
            //然后每次设置定位 记得记录到当前的位置currentY
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });
    //封装设置移动位置的涵数
    function setTranslateY(y) {
        //因为我们封装涵数要考虑的东西多所以我们为了兼容性
        //我们使用px
        swipeUl.style.transform = "translateY(" + y + "px)";
    }
    //封装添加过渡的涵数
    function addTransition() {
        swipeUl.style.transition = "all 0.2s";
    }
    //封装删除过渡涵数
    function removeTransition() {
        swipeUl.style.transition = "none";
    }
}
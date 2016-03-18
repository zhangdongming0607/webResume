/**
 * Created by Administrator on 2016/3/17.
 */
//绑定翻页事件
(function(){
        var winH=document.documentElement.clientHeight;
        var oLis=document.querySelectorAll("#list>li");
        oLis[0].getElementsByTagName("div")[1].id="a0";
        attach();
        displayAll(0);
        oLis[1].style.webkitTransform="translate(0,"+(winH)+"px)";
        oLis[1].style.display="block";
        document.getElementsByClassName("name")[0].onclick=function(){
            oLis[0].nextLi=oLis[1];
            oLis[0].style.webkitTransition="0.7s";
            oLis[0].nextLi.style.webkitTransition="0.7s";
            oLis[0].style.webkitTransform="translate(0,"+(-winH)+"px)";
            oLis[0].nextLi.style.webkitTransform="translate(0,0)";
            //console.log(oLis[0].nextLi);
            oLis[0].nextLi.addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                var temp;
                if(this.index===0){temp=1;}
                else if(this.index===1){temp=4;}
                else if(this.index===2){temp=1;}
                else{return;}
                this.getElementsByTagName("div")[temp].id="a"+this.index;
            }, false)
        }
        //参数是例外
        function start(e){
           this.startPos= e.changedTouches[0].pageY;
        }
        function move(e){
            this.movePos= e.changedTouches[0].pageY-this.startPos;
            if(this.movePos<0){//向上滑
                var dir=1;//指示方向
                if(this.index===oLis.length-1){
                    //nextIndex=0;
                    nextIndex=this.index;
                    this.movePos=0;
                    return;
                }else{
                   var  nextIndex=this.index+1;
                }
            }
            else {//向下滑
                 var dir=-1;
                if (this.index === 0) {
                   // nextIndex = oLis.length - 1;
                    this.movePos=0;
                   nextIndex = this.index;
                    return;
                } else {
                    nextIndex = this.index - 1;
                }
            }
            displayAll(this.index);//这里display比start好在不会出白
            this.nextLi=oLis[nextIndex];
            this.style.webkitTransition="";
            this.nextLi.style.webkitTransition="";
            this.nextLi.style.display="block";
            this.nextLi.style.webkitTransform="translate(0,"+(dir*winH+this.movePos)+"px)";
            this.style.webkitTransform = "translate(0,"+this.movePos+"px)";
        }
        function end(){
                if(this.movePos<-0.1*winH){//向上滑的足够大
                    var dir=-1
                }else if(this.movePos>0.1*winH){
                    dir=1
                }else{
                    dir=0;
                }
                this.style.webkitTransform="translate(0,"+(dir*winH)+"px)";
            if(dir===0){
                this.nextLi.style.webkitTransform="translate(0,"+(-this.movePos/Math.abs(this.movePos)*winH)+"px)";
            }
            else{
                    this.nextLi.style.webkitTransform="translate(0,0)";
                }
            this.style.webkitTransition="0.7s";
            this.nextLi.style.webkitTransition="0.7s";
            this.nextLi.addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                var temp;
                if(this.index===0){temp=1;}
                else if(this.index===1){temp=4;}
                else if(this.index===2){temp=1;}
                else{return;}
                this.getElementsByTagName("div")[temp].id="a"+this.index;
                console.log(this.getElementsByTagName("div")[temp])
            }, false)
        }
        function attach(){
            [].forEach.call(oLis,function(item,index){
                item.addEventListener("touchstart",start,false);
                item.addEventListener("touchmove",move,false);
                item.addEventListener("touchend",end,false);
                item.index=index;
            });
        };
        function displayAll(liIndex){
            [].forEach.call(oLis,function(item,index){
                if(item.index!==liIndex){item.style.display="none";}
            });
        }
    }
)();
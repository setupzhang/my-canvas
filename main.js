var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var lineWidth = 4



autoSetCanvasSize(canvas)





var mouseDown = false
var lastPoint = {x: undefined, y: undefined}
if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(aaa){
       mouseDown = true
       var x = aaa.touches[0].clientX
       var y = aaa.touches[0].clientY
       if(eraserEnabled){
       ctx.clearRect(x-2,y-2,10,10)
       }else{
       lastPoint = {x: x,y: y}
    }
}
    
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if(mouseDown){
          if(eraserEnabled){
             ctx.clearRect(x-2,y-2,10,10)
      }else{
        var newPoint = {x: x,y: y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
        }
    } 
    }
    canvas.ontouchend = function(){
        mouseDown = false
    }
}else{
    //非触屏设备
canvas.onmousedown = function(aaa){
    mouseDown = true
    var x = aaa.clientX
    var y = aaa.clientY
    if(eraserEnabled){
      ctx.clearRect(x-2,y-4,10,10)
    }else{
    lastPoint = {x: x,y: y}
    }
}
}
//var newPoint = {x: undefined, y: undefined}
canvas.onmousemove = function(aaa){
    var x = aaa.clientX
    var y = aaa.clientY
    if(mouseDown){
        if(eraserEnabled){
            ctx.clearRect(x-2,y-2,10,10)
        }else{
        var newPoint = {x: x,y: y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
        }
    }
}
canvas.onmouseup = function(aaa){
    mouseDown = false;
}
var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
save.onclick = function(){
    var url = canvas.toDataURL("img/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url 
    a.download = '我的画板'
    a.click()
}
pink.onclick = function(){
    ctx.strokeStyle = 'pink';
    pink.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}
green.onclick = function(){
    ctx.strokeStyle = 'green';
    green.classList.add('active')
    pink.classList.remove('active')
    yellow.classList.remove('active')
}
yellow.onclick = function(){
    ctx.strokeStyle = 'yellow';
    yellow.classList.add('active')
    pink.classList.remove('active')
    green.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 4
}
thick.onclick = function(){
    lineWidth = 8
}



function autoSetCanvasSize(){
    setCanvasSize()
    window.onresize = function(){
    setCanvasSize ()}
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
     }
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()   
}




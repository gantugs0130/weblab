
var yellow = document.getElementsByClassName("yellow");
var length = yellow.length;
for( var i=0; i<length; i++){
  yellow[i].style.backgroundColor = "yellow";
}
var black = document.getElementsByClassName("black");
length = black.length;
for( var i=0; i<length; i++){
  black[i].style.backgroundColor = "black";
}
var red = document.getElementsByClassName("red");
length = red.length;
for( var i=0; i<length; i++){
  red[i].style.backgroundColor = "red";
}
var ongo = 'white';
var color = ['black','red','yellow', 'green', 'blue'];
function setcolor(index){
  ongo = color[index];
}
var c=[];
for(var i=0; i<7; i++){
  c[i]=[];
  for(var j=0; j<8; j++){
    c[i][j]=0;
  }
}
for(var i=1; i<7;i++){
  c[0][i]="yellow";
}
  c[1][0]="yellow";
  c[1][7]="yellow";
  c[2][0]="yellow";
  c[2][7]="yellow";
  c[3][0]="yellow";
  c[3][7]="yellow";
  c[4][0]="yellow";
  c[4][7]="yellow";
  c[5][0]="yellow";
  c[5][7]="yellow";
  for(var i=1; i<7;i++){
    c[6][i]="yellow";
  }
  c[2][2]="black";
  c[4][2]="black";
  c[2][5]="red";
  c[3][5]="red";
  c[4][5]="red";
  var b=[];
for(var i= 0; i<7; i++){
  b[i]=[];
  for(var j=0; j<8; j++){
    b[i][j]=0;
  }
}
var starting = false;
for(var i=0; i < 7; i++){
  for( var j=0; j < 8; j++){
    var aa = document.getElementById(i+"_"+j);
    aa.addEventListener("click", function(){
      var x=this.id;
      myfunc(x);
    });
  }
}
function myfunc(x){

  var aaa=document.getElementById(x);
  aaa.style.backgroundColor=ongo; 
  var x1=x[0];
  var x2=x[2];
  b[x1][x2]=ongo;
  if(starting==true){
    check();
  }

}

function check(){
  var p=0;
  for(var i=0; i<7; i++){
    for(var j=0; j<8; j++){
      if(b[i][j]!=c[i][j]){
          p++;
      }
    }
  }
  if(p==0){
    clearInterval(a2);
    starting=false;
    setTimeout(function(){
      alert("Ta hojloo");
    }, 100);


  }
}
  var z=0;
function link(){

  var x=document.getElementById("time");
  if(15-z==-1){
    clearInterval(a2);
    alert("ta hojigdloo");
  }
  else{
  x.innerHTML = 15-z;
  z++;}

}
var a2=0;
var start = document.getElementById("start");
start.addEventListener("click", function(){
  starting=true;
    a2 = setInterval(link, 1000);
  //setTimeout(function(){ alert("Ta hojigdloo"); }, 60000);
});

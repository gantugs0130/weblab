var question = ["Musical instrument", "Space Ship", "The most awesome fruit", "Sport of Wimbledon", "Planet"];
var answer = [ "violin", "rocket", "mango", "tennis", "mars"];
var health = 5;
var answers = "";
var picture = document.getElementById("pictureCurrent");
var questionCurrent;
var answerCurrent;
var correct = 0;
var correct1 = 0;
var charStr = '';
var hole;
var index = 0;
function checkCharInWord(char, word) {
	if (word.indexOf(char) > -1) {
		return true;
	}
	return false;
}
function randommy(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function Rocket(){
  var A = document.getElementById("writeAnswerHere");
  if(A.childNodes.length > 0){
    var answered = A.firstChild;
    while(answered) {
        A.removeChild(answered);
        answered = A.firstChild;
    }
  }
      var Q = document.getElementById("question");
  Q.innerHTML = "Question";
      index = Math.floor(randommy(question.length));
      questionCurrent = question[index];
      Q.innerHTML += ": "+ questionCurrent+"?";
      answerCurrent = answer[index];
      answers = "";
      hole = document.getElementById("writeAnswerHere");
      for(var l=0; l<answerCurrent.length; l++){
        var single = document.createElement("div");
      single.setAttribute("class", "hole");
      var writeAnswerHere = document.getElementById("writeAnswerHere");
      writeAnswerHere.appendChild(single);
      }
      Marsy(Math.round( Math.random() * (20 - 16) + 16));
}
function Marsy(sec){
  document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    charStr = String.fromCharCode(charCode);
    // buruu useg orson ued 1 amiin hasna
    if(!checkCharInWord(charStr, answerCurrent)){
      health--;
      picture.setAttribute("src", "hangman"+(1-health+(4))+".png");
			// console.log('')
			setTimeout(function() {
				if(health == 0){
		      window.alert("YOU LOSSE");
		      window.location.href = 'hangman.html';
				}
			}, 1000)
    }
    else{
      var holes = document.getElementsByClassName("hole");
        for(var i=0; i<answerCurrent.length; i++){
          if(charStr==answerCurrent[i]){
            holes[i].innerHTML = charStr;
            correct1++;
          }
        }
    }
  }
  // end usgee awaad answer uurchiluud boloo

  var interval = setInterval(function(){
    sec = parseInt(sec);
    if(sec>0){
      sec--;
    } else {
      window.alert(" YOU LOSSE");
      window.location.href = 'hangman.html';
    }

    document.getElementById("time").innerHTML = sec;
if(answerCurrent.length == correct1){
      correct++;
      clearInterval(interval);
      if(correct == 5){
        alert("YOU WON ");
        window.location.href = 'hangman.html';
      }
      else {
			  answer.splice( answer.indexOf(answerCurrent), 1 );
			  question.splice( question.indexOf(questionCurrent), 1 );
        correct1=0;
				console.log(answer, question)
        Rocket();
      }
    }
  //   for(var y=0; y < answers.length; y++){
  //   if(answerCurrent.charAt(y) != answers.charAt(y)){
  //       health--;
  //       picture.setAttribute("src", "hangman"+(1-health+(4))+".png");
  //       break;
  // }
  // }
  }, 1000)
}
window.onload = function (){

document.getElementById("start").addEventListener('click', function(){
    correct = 0;
    Rocket();



})
};


var student = {
  name: "",
  type: "student"
};

var myDie=[];
var numDice=5;
var throwNumber=1; //this will go from 1..3

function initialisePlay() {
  for (var i = 1; i<=numDice; i++) {
    aDice=new Object();
    aDice.isLocked=false;
    aDice.throw=function() {
        if (this.isLocked==false) {
        this.value=Math.floor(Math.random()*6) + 1;
      };
    }
    aDice.imageName=function() {
      switch (this.value) {
        case 1:
          return "DiceOne.png";
          break;
        case 2:
          return "DiceTwo.png";
          break;
        case 3:
          return "DiceThree.png";
          break;
        case 4:
          return "DiceFour.png";
          break;
        case 5:
          return "DiceFive.png";
          break;
        case 6:
          return "DiceSix.png";
          break;
      }
    }
    aDice.throw();
    myDie.push(aDice);
  }
}

function captureLockStatus() {
  // start HERE next time to scan the checkbutton status and update isLocked
  var els = document.getElementsByClassName('diceCheck');
  for (var i=0; i<els.length; i++) {
    myDie[i].isLocked=els[i].checked;
  }
}

function drawDice() {
  var el=document.getElementById('diceSection');
  var newHTML="";
  for (var i=1; i<=numDice;i++) {
    var thisOne=myDie[i-1];
    newHTML=newHTML+"<img src="+"'" + thisOne.imageName() +"'> ";
    newHTML=newHTML+'  <input type="checkbox" name="DiceTwo" class="diceCheck" value=""';
    if (thisOne.isLocked) {
      newHTML=newHTML+' checked="checked"';
    }
    newHTML=newHTML+'>';
  }
  el.innerHTML=newHTML;
}

document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded(event) {
  document.getElementById('name').addEventListener("keyup", keyUp);
  document.getElementById('throw').addEventListener("click", diceThrow);
  document.getElementById('reset').addEventListener("click", diceReset);
  initialisePlay();
  drawDice();
}


function diceThrow() {
console.log("diceThrow ",throwNumber);
captureLockStatus(); // get the locks first
  for (var i=1; i<=numDice;i++) {
    var thisOne=myDie[i-1];
    thisOne.throw();
    drawDice();
}
console.log(throwNumber)
throwNumber++; //increment the number of the throw
if (throwNumber==3) {
    document.getElementById('statusBox').innerHTML="that's it";
    document.getElementById('throw').disabled=true;
  }
  else {
    document.getElementById('statusBox').innerHTML="that was throw" + throwNumber;
  }
}


function diceReset() {
  throwNumber=1;
  document.getElementById('throw').disabled=false;
  //reset all the locks on the checkboxed - NOT WORKING
  for (var i=0;i<numDice; i++) {
    myDie[i].isLocked=false;
  }
  var els = document.getElementsByClassName('diceCheck');
  for (var i=0; i<els.length; i++) {
    els[i].checked=false;
  }

  diceThrow();
  throwNumber=1;
  drawDice();
  document.getElementById('statusBox').innerHTML="here's your first throw";
}

function keyUp(event) {
  calculateNumericOutput();
}



function calculateNumericOutput() {
  student.name = document.getElementById('name').value;

  var totalNameValue = 0;
  for (var i = 0; i < student.name.length; i++) {
    totalNameValue += student.name.charCodeAt(i);
  }

  // Insert result into page
  var output = "Total Numeric value of person's name is " + totalNameValue;
  document.getElementById('output').innerText = output;
}

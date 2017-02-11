
var student = {
  name: "",
  type: "student"
};

var myDie=[];

function initialisePlay() {
  for (var i = 1; i<=6; i++) {
    aDice=new Object();
    aDice.isLocked=false;
    aDice.throw=function() {
      console.log(this.isLocked)
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

}

function drawDice() {
  var el=document.getElementById('diceSection');
  var newHTML="";
  for (var i=1; i<=6;i++) {
    var thisOne=myDie[i-1];
    console.log(thisOne.isLocked);
    newHTML=newHTML+"<img src="+"'" + thisOne.imageName() +"'> ";
    newHTML=newHTML+'  <input type="checkbox" name="DiceTwo" value=""';
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
  initialisePlay();
  drawDice();
}


function diceThrow() {
captureLockStatus(); // get the locks first
  for (var i=1; i<=6;i++) {
    var thisOne=myDie[i-1];
    thisOne.throw();
    drawDice();
}

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
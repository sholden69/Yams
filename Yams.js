
var student = {
  name: "",
  type: "student"
};


var scoreboard = [
{index:1, rowText:"1s", sc1:0, sc2:0, sc3:0, sc4:0},
{index:2, rowText:"2s", sc1:0, sc2:0, sc3:0, sc4:0},
{index:3, rowText:"4s", sc1:0, sc2:0, sc3:0, sc4:0},
{index:4, rowText:"5s", sc1:0, sc2:0, sc3:0, sc4:0},
{index:5, rowText:"6s", sc1:0, sc2:0, sc3:0, sc4:0},
{index:6, rowText:"Bonus", sc1:0, sc2:0, sc3:0, sc4:0},
{index:7, rowText:"Above Line Total", sc1:0, sc2:0, sc3:0, sc4:0},
{index:8, rowText:"Full House", sc1:0, sc2:0, sc3:0, sc4:0},
{index:9, rowText:"Run ", sc1:0, sc2:0, sc3:0, sc4:0},
{index:10, rowText:"High", sc1:0, sc2:0, sc3:0, sc4:0},
{index:11, rowText:"Low", sc1:0, sc2:0, sc3:0, sc4:0},
{index:12, rowText:"Yams", sc1:0, sc2:0, sc3:0, sc4:0},
{index:13, rowText:"Below Line Total", sc1:0, sc2:0, sc3:0, sc4:0},
{index:14, rowText:"Grand Total", sc1:0, sc2:0, sc3:0, sc4:0}
];


var myDie=[];
var numDice=5;
var throwNumber=0; //this will go from 1..3
var numPlayers=4;
var currentPlayer=1;

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
        case 0:
          return "DiceBlank.png";
          break;
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
    aDice.value=0;
    myDie.push(aDice);
  }
  diceReset();
  drawScoreBoard();

  /*myDie.sort(function(a,b) {
    return a.value-b.value;
  });*/
}

function captureLockStatus() {
  // start HERE next time to scan the checkbutton status and update isLocked
  var els = document.getElementsByClassName('diceCheck');
  for (var i=0; i<els.length; i++) {
    myDie[i].isLocked=els[i].checked;
  }
}
//------------------------------------------------------------------

// Drawing functions: Draw the dice from the array
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

function drawScoreBoard() {
  var el=document.getElementById('Scorecard');
  var newHTML="  <table>    <tr>      <th></th>"
  for (var i=1;i<=numPlayers;i++){
    newHTML=newHTML+"     <th scope ='col'>Player "+i+"</th> ";
  }
//  newHTML=newHTML+"     <th scope ='col'>Player 1</th>     <th scope ='col'>Player 2</th>     <th scope ='col'>Player 3</th>     <th scope ='col'>Player 4</th>   </tr>";
//{index:1, rowText:"1s", sc1:0, sc2:0, sc3:0, sc4:0},
  console.log(Object.keys(scoreboard));
  for (var iRow=0;iRow<=13;iRow++) {
    if (iRow==5 || iRow==6 || iRow==12 || iRow==13) {
      newHTML=newHTML+"<tr class='total'>     <th scope='row'>";
    }
    else {
      newHTML=newHTML+"<tr>      <th scope='row'>";
    }
    newHTML=newHTML+scoreboard[iRow].rowText+"</th>";
    //if index 6,7,13,14 then it's a total row

    newHTML=newHTML+"<td class='score'>0</td>      <td class='score'>0</td>      <td class='score'>0</td>      <td class='score'>0</td>     </tr>    "
  }
  el.innerHTML=newHTML;
}

//-------------------------------------------------------------
// event listeners
document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded(event) {
  document.getElementById('name').addEventListener("keyup", keyUp);
  document.getElementById('throw').addEventListener("click", diceThrow);
  document.getElementById('reset').addEventListener("click", diceReset);
  initialisePlay();
  drawDice();
}


function compare(a,b) {
  if (a.value < b.value)
    return -1;
  if (a.value > b.value)
    return 1;
  return 0;
}

function turnOver() {
  var newHTML="player "+currentPlayer+":that's it";

  myDie.sort(compare);
  drawDice();
  document.getElementById('throw').disabled=true;
// Try and work out the scores
  if (IsYams()) {
     newHTML=newHTML+"Yams + <BR>"
  }
  if (isStraight()) {
     newHTML=newHTML+" Straight + <BR>"
  }
  if (IsFullHouse()) {
     newHTML=newHTML+" FullHouse + <BR>"
  }
  newHTML=newHTML+" Total" + dieTotal() + "<BR>";

//Check each digit
var res=0;
  for (var i=1; i<=6; i++){
      res=CountDigits(i);
      if (res>0) {
        newHTML=newHTML+res+"* "+i+" <BR>";
    }
  }
  document.getElementById('statusBox').innerHTML=newHTML;

// move on to the next player  currentPlayer++;
  currentPlayer++;
  if (currentPlayer>numPlayers)
    currentPlayer=1;
}


function diceThrow() {
  drawScoreBoard();
  console.log("diceThrow ",throwNumber);
  captureLockStatus(); // get the locks first
  for (var i=1; i<=numDice;i++) {
    var thisOne=myDie[i-1];
    thisOne.throw();
    drawDice();
    }
throwNumber++; //increment the number of the throw
if (throwNumber==3) {
   turnOver();
 }
  else
  {  document.getElementById('statusBox').innerHTML="player "+currentPlayer+":that was throw" + throwNumber;
}
}


function diceReset() {
  throwNumber=0;
  document.getElementById('throw').disabled=false;
  //reset all the locks on the checkboxed - NOT WORKING
  for (var i=0;i<numDice; i++) {
    myDie[i].isLocked=false;
    myDie[i].value=0;
  }
  var els = document.getElementsByClassName('diceCheck');
  for (var i=0; i<els.length; i++) {
    els[i].checked=false;
  }
  drawDice();
  document.getElementById('statusBox').innerHTML="Player " + currentPlayer+" press throw to start";
}

function keyUp(event) {
  calculateNumericOutput();
}

//-----------------------------------------
function CountDigits(digVal) {
//-- count the occurrences of i in the hand. Used for above the board.
  var digCount=0;
  for (var i=0;i<numDice; i++) {
    if (myDie[i].value==digVal)
      digCount++;
  }
  return digCount;
}
function IsFullHouse() {
//-- returns true if the sorted hand is a sequence of 2+3 or 3+2
//look for a run of 3+2 or 2+3

// count the first run
var legSeqCounter=0; //count sequences of 2 or 3
var seqLength=1;
var seqTwo=false;
var seqThree=false;
var myDig=myDie[0].value; //that's the current digit

for (var i=1;i<numDice; i++) {
  if (myDie[i].value==myDig) {  //increment the sequence length
      seqLength++
  }
  if ((myDie[i].value!=myDig) || (i==4)) {  //new sequence or last digit
     if (seqLength==2 || seqLength==3) {
        if (seqLength==2) {
            seqTwo=true;
        }
        if (seqLength==3) {
            seqThree=true;
        }
        legSeqCounter++;
      }
     seqLength=1; // reset the sequence
     myDig=myDie[i].value;  //change the digit we're tracking
  }
}
  return ((legSeqCounter==2) && seqTwo && seqThree)
}

function isStraight() {
//-- returns true is the sorted hand goes in sequence
 var myDig=myDie[0].value;
 for (var i=1;i<numDice; i++) {
   if (myDie[i].value!=myDig+1)
     return false;
  else {
      myDig=myDie[i].value;
  }
 }
 return true;
}

function dieTotal() {
//-- returns the total of all the die
  var total=0
   for (var i=0;i<numDice; i++) {
     total=total+myDie[i].value;
}
  return total;
}

function IsYams() {
//-- returns true if the hand is Yams.
var myDig=myDie[0].value;
for (var i=1;i<numDice; i++) {
  if (myDie[i].value!=myDig)
    return false;
 else {
     myDig=myDie[i].value;
 }
}
return true;
}

//----------------------------------------------------------------

// Old crap from the original web page
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

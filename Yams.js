
var myDie=[];
var numDice=5;
var throwNumber=0; //this will go from 1..3
var numPlayers=1;
var currentPlayer=1;
var currentRound=1;
var scoreboard;


function startGame() {
  scoreboard = [
  {index:1, rowText:"1s", scores:[]},
  {index:2, rowText:"2s", scores:[]},
  {index:3, rowText:"3s", scores:[]},
  {index:4, rowText:"4s", scores:[]},
  {index:5, rowText:"5s", scores:[]},
  {index:6, rowText:"6s", scores:[]},
  {index:7, rowText:"Bonus", scores:[]},
  {index:8, rowText:"Above Line Total", scores:[]},
  {index:9, rowText:"Full House", scores:[]},
  {index:10, rowText:"Run", scores:[]},
  {index:11, rowText:"High", scores:[]},
  {index:12, rowText:"Low", scores:[]},
  {index:13, rowText:"Yams", scores:[]},
  {index:14, rowText:"Below Line Total", scores:[]},
  {index:15, rowText:"Grand Total", scores:[]}
  ];

  numPlayers=document.getElementById('numPlayers').value;
  if (numPlayers=="")
    numPlayers=1;
  console.clear();
  console.log("NEW GAME: players:",numPlayers);
  for (var iRow=0;iRow<15;iRow++){
    for (var iPlayer=0; iPlayer<numPlayers;iPlayer++) {
      if (iRow==6 || iRow==7 || iRow==13 || iRow==14)
        {
          scoreboard[iRow].scores[iPlayer]=0;
        }
      else {
          scoreboard[iRow].scores[iPlayer]=-1;
        }
  }
}
  currentRound=1;
  currentPlayer=1;
  diceReset();
  drawScoreBoard();
}


function initialisePlay() {
  for (var i = 1; i<=numDice; i++) {
    aDice=new Object();
    aDice.isLocked=false;
    aDice.throw=function() {
        if (this.isLocked==false) {
        this.value=Math.floor(Math.random()*6) + 1;
      };
    }

//function to display the right dice value
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
  startGame();

  /*myDie.sort(function(a,b) {
    return a.value-b.value;
  });*/
}

function toggleDice(i) {
// Change the lock status for dice i 1..5
 if (throwNumber>0) {
  myDie[i-1].isLocked=!myDie[i-1].isLocked;
// I need to check the relevant checkbox
  var els = document.getElementsByClassName('diceCheck');
  els[i-1].checked=myDie[i-1].isLocked;
  }
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
    newHTML=newHTML+"<input type='image' src='" + thisOne.imageName()+"'";
    newHTML=newHTML+" onclick=toggleDice("+i+") />";
    console.log("Check out",newHTML);
//    newHTML=newHTML+"<img src="+"'" + thisOne.imageName() +"'> ";
    newHTML=newHTML+'  <input type="checkbox" name="DiceTwo" class="diceCheck" value=""';
    if (throwNumber==0) {
     console.log("DISABLING CHECBOX: drawing dice, throwNumber",throwNumber);
     newHTML=newHTML+" disabled ";
    }
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
    newHTML=newHTML+"     <th scope ='col'>Player "+i+"</th>";
  }
  newHTML=newHTML+"  <th scope='col'>Score </th>";

//  newHTML=newHTML+"     <th scope ='col'>Player 1</th>     <th scope ='col'>Player 2</th>     <th scope ='col'>Player 3</th>     <th scope ='col'>Player 4</th>   </tr>";
//{index:1, rowText:"1s", sc1:-1, sc2:-1, sc3:-1, sc4:-1},
  for (var iRow=0;iRow<=14;iRow++) {
    if (iRow==6 || iRow==7 || iRow==13 || iRow==14) {
      newHTML=newHTML+"<tr class='total'>     <th scope='row'>";
    }
    else {
      newHTML=newHTML+"<tr>      <th scope='row'>";
    }
    newHTML=newHTML+scoreboard[iRow].rowText+"</th>";
    //if index 6,7,13,14 then it's a total row
    for (var i=0;i<numPlayers;i++) {
      if (scoreboard[iRow].scores[i]==-1)  {
        newHTML=newHTML+"<td class='score'> </td>";
      }
      else {
        newHTML=newHTML+"<td class='score'>"+scoreboard[iRow].scores[i]+"</td>";
      }
     }

// now add the right radio button for the score on non total rows
    var okToScore=false;
    if (iRow!=6 && iRow!=7 && iRow!=13 && iRow!=14) {
      okToScore=scoreboard[iRow].scores[currentPlayer-1]==-1;
      }
   //special check to disable high if score not greater than a low

     if (okToScore) {
         newHTML=newHTML+"<td>  <input type='radio' name='scorechoice' value ='"  + scoreboard[iRow].rowText+"'/> ";
     }
     else {
        newHTML=newHTML+"<td> ";
      }
  }
  el.innerHTML=newHTML;
}

//-------------------------------------------------------------
// event listeners
document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded(event) {
  document.getElementById('throw').addEventListener("click", diceThrow);
  document.getElementById('reset').addEventListener("click", startGame);
  document.getElementById('score').addEventListener("click", scoreTurn);
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
  document.getElementById('statusBox').innerHTML="Player " + currentPlayer+ ": Total="+dieTotal()+" - please score your turn";
}


function diceThrow() {
   drawScoreBoard();
  captureLockStatus(); // get the locks first
  for (var i=1; i<=numDice;i++) {
    var thisOne=myDie[i-1];
    thisOne.throw();
    }
throwNumber++; //increment the number of the throw
drawDice();
drawScoreBoard();
if (throwNumber==3) {
   turnOver();
 }
  else
  {  var myStr="Player "+currentPlayer+": That was throw" + throwNumber;
     myStr=myStr+ ". Total="+dieTotal();
     document.getElementById('statusBox').innerHTML=myStr;
}
}


function diceReset() {
  throwNumber=0;
  document.getElementById('throw').disabled=false;
  document.getElementById('score').disabled=false;
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
  document.getElementById('statusBox').innerHTML="Player " + currentPlayer+":  Press throw to start";
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
function isFullHouse() {
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

function isYams() {
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

function scoreTurn() {
  // Takes the current dice and settings from the scorechoice div and updates scoreboard = [
//{index:1, rowText:"1s", sc1:-1, sc2:-1, sc3:-1, sc4:-1},

// stop gap for inability to disable score button
if (myDie[0].value==0) {
   console.log();("scoring blank turn");
    return;
  }

myDie.sort(compare);
drawDice();

  //first pick up the radio button that is selected
  var radioButtons = document.getElementsByName("scorechoice");
   for (var x = 0; x < radioButtons.length; x ++) {
     if (radioButtons[x].checked) {
        var mySel=radioButtons[x].value
      }
    }

   // do a select case to update the right row in scoreboard for this player
  var thisScore=0;
  var index=0;
   switch (mySel) {
     case "1s":
       index=1;
       thisScore=CountDigits(1)*1;
       break;
     case "2s":
        index=2;
        thisScore=CountDigits(2)*2;
        break;
     case "3s":
        index=3;
        thisScore=CountDigits(3)*3;
        break;
     case "4s":
        index=4;
        thisScore=CountDigits(4)*4;
        break;
     case "5s":
        index=5;
        thisScore=CountDigits(5)*5;
       break;
    case "6s":
      index=6;
      thisScore=CountDigits(6)*6;
      break;
    case "Full House":
      index=9;
      if (isFullHouse()) {
        thisScore=20; }
        break;
    case "Run":
      index=10;
      if (isStraight() ) {
        thisScore=30;
      }
      break;
    case "High":
      index=11;
      thisScore=dieTotal();
      //Set to zero if <= Low
      if (thisScore<=scoreboard[11].scores[currentPlayer-1])
        thisScore=0;
      break;
    case "Low":
      index=12;
      thisScore=dieTotal();
      if (scoreboard[10].scores[currentPlayer-1]!=-1 && thisScore>=scoreboard[10].scores[currentPlayer-1])
        thisScore=0;
      break;
    case "Yams":
      index=13;
      if (isYams() ) {
        thisScore=50;
        }
      break;
   }
// Confirm a zero score
if ((thisScore==0) && !confirm('score zero?')) {
  return;
}

scoreboard[index-1].scores[currentPlayer-1]=thisScore;

calcTotals();
drawScoreBoard();
// move on to the next player  currentPlayer++;
  currentPlayer++;
  if (currentPlayer>numPlayers) {
    currentRound++;
    if (currentRound>11) {
        drawScoreBoard();
        alert("Game Over")
        document.getElementById('throw').disabled=true;
        document.getElementById('score').disabled=true;
        return;
        console.log("Game over, disabling throw and score");
    }
    currentPlayer=1;
}
  diceReset();
//Fix up the buttons for the next player

}

function calcTotals() {
//run up the totals
     var aboveTheLine=[];
     var belowTheLine=[];
     for (iPlayer=0; iPlayer<numPlayers;iPlayer++) {
       aboveTheLine[iPlayer]=0;
       belowTheLine[iPlayer]=0;
       for (var i=0;i<=13;i++){
         if (i<=5 && scoreboard[i].scores[iPlayer]>0)
             aboveTheLine[iPlayer]=aboveTheLine[iPlayer]+scoreboard[i].scores[iPlayer];
         if (i>=8 && i<=12  && scoreboard[i].scores[iPlayer]>0)
              belowTheLine[iPlayer]=belowTheLine[iPlayer]+scoreboard[i].scores[iPlayer];
            }
        }

     // now update bonus
    for (var i=0;i<numPlayers;i++) {
      if (aboveTheLine[i]>=60) {
        scoreboard[6].scores[i]=40;
      }
    scoreboard[7].scores[i]=scoreboard[6].scores[i]+aboveTheLine[i];
    scoreboard[13].scores[i]=belowTheLine[i];
    scoreboard[14].scores[i]=scoreboard[7].scores[i]+scoreboard[13].scores[i];
    }
}

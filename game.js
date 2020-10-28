var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userColorPattern=[];

var started=false;
var level=0;




$("body").keypress(function() {
    if(!started){
      $("#level-title").text("level  "+level);
        nextSequence();
        started=true;
    }
});
//geting the user chhosen color




$(".btn").click(function(){
   var userChoosenColor=$(this).attr("id");
    userColorPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userColorPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userColorPattern[currentLevel]){
   
    if(userColorPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }

  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},1000);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    
       startOver();
      
  }
}


//get the random color

function nextSequence(){
             userColorPattern=[];
             level++;
             $("#level-title").text("Level " + level);
    
             var randomNumber=Math.floor(Math.random()*4);
             var randomChoosenColor=buttonColors[randomNumber];
             gamePattern.push(randomChoosenColor);

             //for button flashing
             $("#"+ randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

             //button sound
             playSound(randomChoosenColor);

}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
 
     $("#"+currentColor).addClass("pressed");
     
     setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}



function startOver(){
  level = 0;
  gamePattern=[];
  started = false;
}
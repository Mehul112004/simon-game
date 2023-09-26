var gamePattern=[]
var buttonColors=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function (e) { 
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function () { 
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor)
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playAudio("wrong");
        $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
        startOver();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randommChosenColor=buttonColors[randomNumber];
    gamePattern.push(randommChosenColor);
    $(`#${randommChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randommChosenColor);
}
function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(()=> {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}
function playAudio(currentColor){
    var aud=new Audio("sounds/"+currentColor+".mp3");
    aud.play();
}
function startOver(){
    started=false;
    level=0;
    gamePattern=[];
}
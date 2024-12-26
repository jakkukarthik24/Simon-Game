var gamepattern=[];
var userClickedPattern=[];
var buttoncolors=["red","blue","green","yellow"];
var level=0;
var highScore=0;
var started=false;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    //const buttoncolors=["red","blue","green","yellow"];
    ++level;
    document.getElementById("score").innerHTML = "Score: " + level; 
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosencolor=buttoncolors[randomNumber];
    gamepattern.push(randomChosencolor);
    $("#"+randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolor); 
}
$(".btn").click(function() {
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}
function checkAnswer(currentlevel){
    
    if(gamepattern[currentlevel]===userClickedPattern[currentlevel]){
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        if(level>highScore){
            highScore=level; 
        }
        document.getElementById("high-score").innerHTML = "High Score: " + highScore;
        startover();
        
    }
    
}
function startover(){
    level=0;
    started=false;
    gamepattern=[];
    userClickedPattern=[];
}

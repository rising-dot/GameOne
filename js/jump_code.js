/**
 * Created by rising on 18/05/15.
 */

var barPoint=0;
var stage;
var scoreText;
var scoreDNAText;

var background_1;
var background_2;
var background_3;

var score=0;
var dnaScore=0;

var runningBar;
var gameRunning=false;



var myBackGroundSound;
var eatSound;
var jumpSound;
var dieSound;

var hero;
var enemy;
var nextLevelText;
var shootSpeed=3;
var deadHero=false;
var dead=true;
var pauseImgOn;
var pauseImgOff;
var stone=[];

var stoneSpeed=2;
var gameSpeed=-5;
var foodSpeed=2;

var food=[];
var tempForside;
var spaceKeyDown=false;
var soundImgOn;
var splash;

var soundOffImg;

var currentLevel=0;

var DNA=[];
var energi=[];
var energiSpeed=2;

var maxHeight=200;

var isMuted=false;
function init(){
    stage = new createjs.Stage("jumpGame");
    preloadText = new createjs.Text("Loading", "30px verdana", "#fff");
    preloadText.textBaseline="middle";
    preloadText.textAlign="center";
    preloadText.x=stage.canvas.width / 2;
    preloadText.y=stage.canvas.height / 2;
    stage.addChild(preloadText);


    splash = new createjs.Container();
    var temp = new createjs.Text("Start Game", "30px verdana", "#fff");
    temp.textBaseline="middle";
    temp.textAlign="center";
    temp.x=stage.canvas.width / 2;
    temp.y=stage.canvas.height / 3;

    splash.addChild(temp);
    stage.addChild(splash);




    preload();


}

function preload(){

    queue = new createjs.LoadQueue(true);
    queue.on("progress", progress, this);       // item load one by one
    queue.on("complete", gameIsLoaded, this);    // your game is ready

    queue.installPlugin(createjs.Sound);

    queue.loadManifest(

        [
            "img/stone_H_40.png", "img/fruit.png", "img/forest_1.png", "img/forest_2.png", "img/forest_3.png",
            "img/youDie.png","img/sound.png","img/soundOff.png", "img/forside.png","img/test_monster.png",
            "img/energi.png","img/DNA.png","img/pause.png","img/playGame.png","img/lineBar.png","img/bar.png",
            "img/ice_1.png","img/ice_2.png","img/ice_3.png","img/fire_1.png","img/fire_2.png","img/fire_3.png",
            "img/forest_level_2.png",


            {id: "bg_music", src: "audio/bg_music.mp3"},
            {id: "jump", src: "audio/Jump.wav"},
            {id: "eat", src: "audio/eat.mp4"},
            {id: "die", src: "audio/die.wav"},



            {id: "heroSheet", src: "spritesheets/heros.json"},
            "spritesheets/heros.png",

            {id: "fruitSheet", src: "spritesheets/fruit.json"},
            "spritesheets/fruit.png",


            {id: "enemySheet", src: "spritesheets/enemy.json"},
            "spritesheets/enemy.png"


        ]);

}




function progress(e){

    var percent = Math.round(e.progress*100);
    preloadText.text="LOADING... "+percent+"%";
    stage.update();


}


function gameIsLoaded(){
    console.log("let's start the game");
    stage.removeChild(preloadText);
    splash.on("click", startGame);



    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", tock);

    tempForside = new createjs.Bitmap("img/forside.png");

    stage.addChild(tempForside);

}





function startGame(){
    stage.removeChild(tempForside);
    addBackGround();
    var scoreContainer = new createjs.Container();
    scoreContainer.x =stage.canvas.width-120;
    scoreContainer.y =stage.canvas.height-340;

    var scoreFruitImg = new createjs.SpriteSheet(queue.getResult('fruitSheet'));
    var t = new createjs.Sprite(scoreFruitImg, "fruit");
    t.x=-40;
    scoreContainer.addChild(t);


    scoreText = new createjs.Text("Food: "+score, "26px Verdana", "#000");
    scoreContainer.addChild(scoreText);
    stage.addChild(scoreContainer);

    pointDNASocre();

    var processBar = new createjs.Container();

    processBar.x=stage.canvas.width -805.5;
    processBar.y=stage.canvas.height- 390;

    var myLineBar = new createjs.Bitmap("img/lineBar.png");
    processBar.addChild(myLineBar);

    runningBar = new createjs.Bitmap("img/bar.png");
    runningBar.x=stage.canvas.width -915 ;
    runningBar.y=stage.canvas.height- 395;
    processBar.addChild(runningBar);



    stage.addChild(processBar);

    if(myBackGroundSound!=undefined){
    myBackGroundSound.stop()
    }
    myBackGroundSound = new createjs.Sound.play("bg_music");
    myBackGroundSound.setVolume(0.3);

    pauseImgOn = new createjs.Bitmap("img/playGame.png");
    pauseImgOn.x=stage.canvas.width -886;
    pauseImgOn.y=stage.canvas.height -320;
    stage.addChild(pauseImgOn);
    pauseImgOn.on("click", pauseOn);

    pauseImgOff = new createjs.Bitmap("img/pause.png");
    pauseImgOff.x=stage.canvas.width -886;
    pauseImgOff.y=stage.canvas.height -320;

    pauseImgOff.on("click", pauseOff);


    soundImgOn = new createjs.Bitmap("img/sound.png");
    soundImgOn.x=20;
    soundImgOn.y=20;
    stage.addChild(soundImgOn);
    soundImgOn.on("click", soundOff);


    soundOffImg = new createjs.Bitmap("img/soundOff.png");
    soundOffImg.x=20;
    soundOffImg.y=20;

    soundOffImg.on("click", soundOn);

    runningHero();


    theEnemy();

    for(var i=0; i<5; i++){
        addFood();

    }

    for(var s=0; s<3; s++){
        addStone();

    }

    addEnergi();


    window.onkeyup=flyUp;
    window.onkeydown=keyHoldDown;



    stage.removeChild(splash);
    gameRunning=true;

}


function pointDNASocre(){

    var scoreDNAContainer = new createjs.Container();
    scoreDNAContainer.x = stage.canvas.width - 250;
    scoreDNAContainer.y =stage.canvas.height-340;

    var scoreDNAImg = new createjs.Bitmap("img/DNA.png");


    scoreDNAImg.x=-40;
    scoreDNAContainer.addChild(scoreDNAImg);
    scoreDNAText = new createjs.Text(dnaScore, "26px Verdana", "blue");
    scoreDNAContainer.addChild(scoreDNAText);
    stage.addChild(scoreDNAContainer);


}



function clickNextLevel(){

    stage.removeAllChildren();              //reset all your score and stuff
    gameRunning=false;
    barPoint=0;
    myBackGroundSound;
    stone=[];
    score=0;
    food=[];
    scoreDNAText;
    runningBar;
    stoneSpeed=2;
    gameSpeed=-5;
    foodSpeed=2;
    spaceKeyDown=false;
    soundOffImg;
    DNA=[];
    energi=[];
    energiSpeed=2;
    maxHeight=200;
    isMuted=false;

    yourMonster();
}




function gameSpeedScore(){

    if(score > 5){

        stoneSpeed=5;
        gameSpeed=-5;
        foodSpeed=5;

    }
    if(score > 20){

        stoneSpeed=10;
        gameSpeed=-10;
        foodSpeed=10;

    }



}





function runningHero(){

    var sheetHero = new createjs.SpriteSheet(queue.getResult('heroSheet'));
    hero = new createjs.Sprite(sheetHero, "hero");

    hero.x=stage.canvas.width-600;
    hero.y=stage.canvas.height-200;

    hero.width=40;
    hero.height=50;

    stage.addChild(hero);

}





function flyUp(e){
    spaceKeyDown=false;

    if(isMuted==false){
    jumpSound = new createjs.Sound.play("jump");
    jumpSound.setVolume(0.3);
}
}


function keyHoldDown(e){
    spaceKeyDown=true
}

function addStone(){

    var t = new createjs.Bitmap("img/stone_H_40.png");
    t.dx=0;
    t.dy=0;
    if(stone.length>0){
        var e = stone[stone.length-1];
        var tempX = e.x;
        t.x=tempX+Math.floor(Math.random()*600)+600;

    }else{
        t.x = stage.canvas.width+300;
    }

    t.y=stage.canvas.height-70;

    t.width=40;
    t.height=40;

    stage.addChild(t);
    stone.push(t);


}

function moveStone(){
    for(var i=stone.length-1; i>=0; i--){
        if(stone[i].dx>0){
            //vi ved stenen er ramt
            stone[i].x+=stone[i].dx;
            stone[i].y+=stone[i].dy;
        } else {
            stone[i].x-=stoneSpeed;             //move your stone to the left

        }

        if(stone[i].x<10 || stone[i].y<-10){

            stage.removeChild(stone[i]);
            stone.splice(i,1);       // splice vill remove i og på række en

        }
    }
}

function theEnemy() {

    var sheetEnemy = new createjs.SpriteSheet(queue.getResult('enemySheet'));
    enemy = new createjs.Sprite(sheetEnemy, "enemy");
    enemy.x = stage.canvas.width-870;
    enemy.y = stage.canvas.height-130;
    enemy.scaleX=-1;
    enemy.regX+=60;
    enemy.width = 60;
    enemy.height = 100;
    stage.addChild(enemy);

    enemy.on("click", killEnemy);



}




function addFood(){

      var myFruit = new createjs.SpriteSheet(queue.getResult('fruitSheet'));
      var t = new createjs.Sprite(myFruit, "fruit");


    if(food.length>0){
        var e = food[food.length-1];
        var tempX = e.x;
        t.x=tempX+110;

    }else{
        t.x = stage.canvas.width+500;
    }


    t.y= stage.canvas.height-70;
    t.width=30;
    t.height=31;
    stage.addChild(t);

    food.push(t);


}




function checkForNewFood(){
    var r = Math.floor(Math.random()*1001);

    if(r<=score+10){       //du kan sige r<=score+10 så får du flere
        addFood();
        addStone();
        addDNA();

    }
    if(r<=score+2){       //du kan sige r<=score+10 så får du flere

        addEnergi();

    }
}


function moveFood(){
    for(var i=food.length-1; i>=0; i--){
        food[i].x-=foodSpeed;
        if(food[i].x<0){
            stage.removeChild(food[i]);
            food.splice(i,1);       // splice vill remove i og på række en

        }
    }
}



function addBackGround(){

        background_1 = new createjs.Bitmap("img/forest_1.png");
        stage.addChild(background_1);

        background_2 = new createjs.Bitmap("img/forest_3.png");
        stage.addChild(background_2);
        background_2.x=900;

        background_3 = new createjs.Bitmap("img/forest_2.png");
        stage.addChild(background_3);
        background_3.x=1800;

}

function moveBackGround(){                  //move your background
    background_1.x+=gameSpeed;
    background_2.x+=gameSpeed;
    background_3.x+=gameSpeed;

    if( background_1.x<=-900){
        background_1.x=1800;
    }

    if( background_2.x<=-900){
        background_2.x=1800;
    }

    if( background_3.x<=-900){
        background_3.x=1800;
    }
}



function hitTest(rect1,rect2){
    if(rect1.x >= rect2.x + rect2.width
        || rect1.x + rect1.width <= rect2.x
        || rect1.y >= rect2.y + rect2.height
        || rect1.y + rect1.height <= rect2.y)
    {
        return false;
    }
    return true;
}



function getDelta(start,end,speed){             // monster throw stone

    var dy = end.y - start.y;
    var dx = end.x - start.x;
    var distance=Math.sqrt((dx*dx)+(dy*dy));
    dx/=distance;
    dy/=distance;
    dx*=speed;
    dy*=speed;
    return {dX:dx,dY:dy}
}

function checkCollisions(){

    for(var i=DNA.length-1; i>=0; i--){            //husk length ikke tæller fra 0
        if(hitTest(hero, DNA[i])){

            var tempX = DNA[i].x;
            var tempY = DNA[i].y;

            stage.removeChild(DNA[i]);
            DNA.splice(i, 1);


            var t = new createjs.Bitmap("img/DNA.png");

            t.x=tempX;
            t.y=tempY;
            stage.addChild(t);

            createjs.Tween.get(t).to({
                x:hero.x,
                y:hero.y,
                scaleX:0,
                scaleY:0

            },1000, createjs.Ease.backInOut).call(
                function(e){
                    stage.removeChild(this);
                    dnaScore++;


                    if(isMuted==false) {
                        eatSound = new createjs.Sound.play("eat");
                    }
                }
            );



        }
    }



    for(var i=energi.length-1; i>=0; i--){            //husk length ikke tæller fra 0
        if(hitTest(hero, energi[i])){

            maxHeight--;

            var tempX = energi[i].x;
            var tempY = energi[i].y;

            stage.removeChild(energi[i]);
            energi.splice(i, 1);


            var t = new createjs.Bitmap("img/energi.png");

            t.x=tempX;
            t.y=tempY;
            stage.addChild(t);

            createjs.Tween.get(t).to({
                x:hero.x,
                y:hero.y,
                scaleX:0,
                scaleY:0

            },1000, createjs.Ease.backInOut).call(
                function(e){
                    stage.removeChild(this);

                    if(maxHeight==10){

                        maxHeight=10;
                    }
                }
            );
        }
    }


    if(barPoint>711){
        tempKill = new createjs.Text("Click the Monster", "30px verdana", "#fff");
        tempKill.textBaseline="middle";
        tempKill.textAlign="center";
        tempKill.x=stage.canvas.width / 5;
        tempKill.y=stage.canvas.height / 2;
        stage.addChild(tempKill);
    }



    for(var i=0; i<stone.length; i++){
        if(hitTest(enemy, stone[i])){


            var dir = getDelta(stone[i], hero, shootSpeed);
            stone[i].dy=dir.dY;
            stone[i].dx=dir.dX;
        }
    }


    for(var i=0; i<stone.length; i++){
        if(hitTest(hero, stone[i])){

            var tempX = hero.x;
            var tempY = hero.y;

            stage.removeChild(hero);


            deadHero = new createjs.Bitmap("img/youDie.png");
            deadHero.x=tempX;
            deadHero.y=tempY;


            stage.addChild(deadHero);

            gameOver();
            console.log("stone stone ");
        }
    }


    if(hitTest(hero, enemy)){
        gameOver();


    }


    for(var i=food.length-1; i>=0; i--){            //husk length ikke tæller fra 0
        if(hitTest(hero, food[i])){

            var tempX = food[i].x;
            var tempY = food[i].y;

            stage.removeChild(food[i]);
            food.splice(i, 1);


            var myFruit = new createjs.SpriteSheet(queue.getResult('fruitSheet'));
            var t = new createjs.Sprite(myFruit, "fruit");


            t.x=tempX;
            t.y=tempY;
            stage.addChild(t);

            createjs.Tween.get(t).to({
                x:hero.x,
                y:hero.y,
                scaleX:0,
                scaleY:0

            },1000, createjs.Ease.backInOut).call(
                function(e){
                    stage.removeChild(this);
                    score++;


                    if(isMuted==false) {
                        eatSound = new createjs.Sound.play("eat");
                    }


                    enemy.x-=40;

                }
            );
            console.log("got food speed ");
        }
    }
}


function gameOver(){

    gameRunning=false;
    if(isMuted==false) {
        dieSound = new createjs.Sound.play("die");
    }

    myBackGroundSound.stop();
    console.log("DEAD");
    dead=false;


    var gameOverText = new createjs.Text(barPoint + " Meter", "30px verdana", "#000");

    gameOverText.x=stage.canvas.width /2;
    gameOverText.y=stage.canvas.height /3;
    stage.addChild(gameOverText);

    var restartGame = new createjs.Text("RestartGame", "30px verdana", "#000");
    restartGame.x=stage.canvas.width /2;
    restartGame.y=stage.canvas.height /2;

    restartGame.on("click", restartTheGame);
    stage.addChild(restartGame);
}


function restartTheGame(){


    dead=true;

    barPoint=0;

    scoreDNAText;

    score=0;
    dnaScore=0;

    runningBar;
     gameRunning=false;

     stone=[];

     stoneSpeed=2;
     gameSpeed=-5;
     foodSpeed=2;

     food=[];

     spaceKeyDown=false;
     soundOffImg;

     DNA=[];
     energi=[];
     energiSpeed=2;

     maxHeight=200;

     isMuted=false;
stage.removeAllChildren();
    startGame();

}




function addEnergi(){
    var y = stage.canvas.height+Math.floor(Math.random()*-400);

    if(energi.length>0){                  //laver mellemrum
        var e = energi[energi.length-1];    //tager den sidste energi

        var tempX = e.x;
        if(tempX<stage.canvas.width+400){       //hvis den e inde i din canvas så ryk den ud til canvas+400
            tempX = stage.canvas.width+400;
        }


    }else{
       var tempX = stage.canvas.width+400;         // ellers så skal den bare starte canvas+400
    }

    for(var i=0; i< 3 ; i++){                       // add din energi i række
        var t = new createjs.Bitmap("img/energi.png");
        t.y=y - (i*50);

        t.width=30;
        t.height=30;

        t.x=tempX+(i*50);
        stage.addChild(t);

        energi.push(t);
    }
}



function moveEnergi(){
    for(var i=energi.length-1; i>=0; i--){
        energi[i].x-=energiSpeed;
        if(energi[i].x<0){
            stage.removeChild(energi[i]);
            energi.splice(i,1);       // splice vill remove i og på række en

        }
    }
}


function addDNA(){
    var t = new createjs.Bitmap("img/DNA.png");

    if(DNA.length>0){
        var e = DNA[DNA.length-1];
        var tempX = e.x;
        t.x=tempX+110;

    }else{
        t.x = stage.canvas.width+400;
    }

    t.y= stage.canvas.height+Math.floor(Math.random()*-500);

    t.width=30;
    t.height=31;
    stage.addChild(t);

    DNA.push(t);
}



function moveDNA(){
    for(var i=DNA.length-1; i>=0; i--){
        DNA[i].x-=energiSpeed;
        if(DNA[i].x<0){
            stage.removeChild(DNA[i]);
            DNA.splice(i,1);       // splice vill remove i og på række en

        }
    }
}


function moveBar(){


    if(background_1.x==0){

        runningBar.x+=1;
        barPoint++;
        console.log("barPoint: "+ barPoint);
        if(barPoint>=237){

            background_1.image.src = "img/fire_1.png";

            background_2.image.src = "img/fire_2.png";

            background_3.image.src ="img/fire_3.png";
        }

        if(barPoint>=474){

            background_1.image.src = "img/ice_1.png";

            background_2.image.src = "img/ice_2.png";

            background_3.image.src = "img/ice_3.png";

        }
    }
}



function tock(e){

    if(gameRunning){
        checkCollisions();
        scoreText.text=score;

        scoreDNAText.text=dnaScore;
        moveBar();
        moveFood();
        checkForNewFood();
        moveBackGround();
        moveStone();
        moveEnergi();
        moveDNA();
        gameSpeedScore();


        if(spaceKeyDown){
            hero.y+=13;
        }
        if(hero.y>320){
            hero.y=320;


        }
        if(hero.y>maxHeight){
           hero.y-=3;

            enemy.x+=0.2;

        }
        if(enemy.x<stage.canvas.width-870){
            enemy.x=stage.canvas.width-870;

        }


    } else {
        deadHero.y++;



        if(deadHero.y>700){

            stage.removeChild(deadHero);
        }
    }

        stage.update(e);
}




















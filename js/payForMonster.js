/**
 * Created by rising on 14/06/15.
 */


function playNextLevelWith(){
    startGame();

}


function payForYellow(){                            //købe de forskille monster for DNA-points

        playNextLevelWith();

}
function payForRed(){


    var newScore=dnaScore-200;
    var t = new createjs.Text(200, "26px Verdana", "#FFF");
    t.x=400;
    t.y=20;
    stage.addChild(t);
    scoreDNAText.text=newScore;

    createjs.Tween.get(t).to({x:440, y:170}, 1500).call(function(){
        stage.removeChild(this);
        playNextLevelWith();
        hero.gotoAndPlay("hero2");
    })


}

function payForBlue(){


    var newScore=dnaScore-500;
    var t = new createjs.Text(500, "26px Verdana", "#FFF");
    t.x=400;
    t.y=20;
    stage.addChild(t);
    scoreDNAText.text=newScore;

    createjs.Tween.get(t).to({x:640, y:170}, 1500).call(function(){
        stage.removeChild(this);
        playNextLevelWith();
        hero.gotoAndPlay("hero3");
    })



}

function yourMonster(){

    var scoreDNAContainer = new createjs.Container();
    scoreDNAContainer.x = stage.canvas.width / 2;
    scoreDNAContainer.y =stage.canvas.height-380;

    var scoreDNAImg = new createjs.Bitmap("img/DNA.png");


    scoreDNAImg.x=-40;
    scoreDNAContainer.addChild(scoreDNAImg);
    scoreDNAText = new createjs.Text(dnaScore, "26px Verdana", "blue");
    scoreDNAContainer.addChild(scoreDNAText);
    stage.addChild(scoreDNAContainer);



    var monsterContainer = new createjs.Container();
    monsterContainer.x=stage.canvas.width /4;
    monsterContainer.y=stage.canvas.height / 3;



    stage.addChild(monsterContainer);



    monster1 = new createjs.Bitmap("img/monster_yellow.png");
    monster1.x=stage.canvas.width -900;

    monsterContainer.addChild(monster1);

    monster1.on("click", payForYellow);

    monster2 = new createjs.Bitmap("img/monster_red.png");
    monster2.x=stage.canvas.width -700;

    monsterContainer.addChild(monster2);

    if(dnaScore >1){
        monster2.on("click", payForRed);

    }

    monster3 = new createjs.Bitmap("img/monster_blue.png");
    monster3.x=stage.canvas.width -500;

    monsterContainer.addChild(monster3);

    if(dnaScore >4){
        monster3.on("click", payForBlue);
    }



}
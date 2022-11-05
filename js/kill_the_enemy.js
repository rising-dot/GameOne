/**
 * Created by rising on 14/06/15.
 */


function killEnemy(e){


    if(barPoint>711 && dead==true){
        stage.removeChild(enemy);
        gameRunning=false;

        var victoryText = new createjs.Text("Victory", "30px verdana", "#000");
        victoryText.textBaseline="middle";
        victoryText.textAlign="center";
        victoryText.x=stage.canvas.width / 2;
        victoryText.y=stage.canvas.height / 3;
        stage.addChild(victoryText);


        nextLevelText = new createjs.Text("Next Level", "30px verdana", "#000");
        nextLevelText.textBaseline="middle";
        nextLevelText.textAlign="center";
        nextLevelText.x=stage.canvas.width / 2;
        nextLevelText.y=stage.canvas.height / 2;
        stage.addChild(nextLevelText);
        nextLevelText.on("click", clickNextLevel);

        currentLevel++;

    console.log("level"+currentLevel);
    }

}











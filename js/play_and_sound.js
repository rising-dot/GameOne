/**
 * Created by rising on 14/06/15.
 */



function soundOff(e){

    stage.removeChild(soundImgOn);

    stage.addChild(soundOffImg);

    myBackGroundSound.stop();

    isMuted=true;

}



function soundOn(e){

    stage.removeChild(soundOffImg);

    stage.addChild(soundImgOn);

    myBackGroundSound.play();
    isMuted=false;

}


function pauseOn(e){

    stage.removeChild(pauseImgOn);

    stage.addChild(pauseImgOff);
    gameRunning=false;




}

function pauseOff(e){
    stage.removeChild(pauseImgOff);

    stage.addChild(pauseImgOn);
    gameRunning=true;


}
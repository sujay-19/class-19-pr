var mainplayer,mainplayeranimation,path,pathimg,bomb,bombimg,ghost,ghostimage,gameover,gameoverimg,bombGroup;
var gameState="PLAY",PLAY=1,END=0,edges,jungkd,score=0;

function preload(){
mainplayeranimation = loadAnimation("mainPlayer1.png","mainPlayer2.png")
ghostimage = loadImage("ghost-standing.png")
pathimg = loadImage("Road.png")
bombimg = loadImage("bomb.png")
gameoverimg = loadImage("gameOver.png")
}

function setup() {
 createCanvas(1200,400)

 path = createSprite(600,200,1200,400)
 path.addImage(pathimg)
 path.velocityX=-5

 mainplayer = createSprite(250,60)
 mainplayer.addAnimation("running",mainplayeranimation)
 mainplayer.scale=0.1

 ghost = createSprite(80,60)
 ghost.addImage(ghostimage)
 ghost.scale=0.6

 gameover = createSprite(600,200)
 gameover.addImage(gameoverimg)
 gameover.visible=false

 bombGroup=new Group()
 
}

function draw() {
 background("black")
 text("Score: "+ score, 500,50);
if(gameState==="PLAY") {
    if(keyDown("down")) {
        mainplayer.y=mainplayer.y+3
    }
    if(keyDown("up")) {
        mainplayer.y=mainplayer.y-3
    }
    edges= createEdgeSprites();
    mainplayer.collide(edges)
    score = score + Math.round(getFrameRate()/60);
   spawnbomb()
   if (mainplayer.isTouching(bombGroup)) {
       gameState="END"
   
   }
   
} 
if (gameState==="END") {
    path.velocityX=0
    
    bombGroup.destroyEach()
    ghost.x=mainplayer.x
    gameover.visible=true
    
}



 if(path.x<0) {
 path.x=path.width/2
 }
ghost.y=mainplayer.y
 drawSprites()

}


function spawnbomb() {
    if (frameCount%150===0) {
    bomb = createSprite(1300,200)
    bomb.addImage(bombimg)
    bomb.velocityX=-5
    bomb.y=Math.round(random(30,380))
    bomb.scale=0.1
    bombGroup.add(bomb)
    score=score+10
    }
}
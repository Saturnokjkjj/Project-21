 
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0

function preload(){
  towerImg = loadImage("marcioZuckerberg.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("sarpado.png");
  spookySound = loadSound("qualidadeMonstra.mp3");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.2;
  ghost.addImage("ghost", ghostImg);
 
}


function draw() {
  background(255);
   stroke("black");
  fill("yellow");
  text ("Score: " + score, 30,20);
  if(tower.y > 600){
      tower.y = 300
    } 
  
  if (gameState === PLAY) {
    
    if(keyDown("left")){
        ghost.x = ghost.x - 3;

      
    }
    if(keyDown("right")){
  
          ghost.x = ghost.x + 3;
      
    }
    if(keyDown("space")){
  
         ghost.velocityY = -10;


      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
    
      score = frameCount
      spawnDoors();

  
//escreva um código para fazer invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado do jogo para end.
     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = END
    }
}
  drawSprites();

  if (gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Aperte F5 para reiniciar", 230,250)
  }
}

function spawnDoors()
 {
  if (frameCount % 240 === 0) {
    var select_door = Math.round(random(100, 500))
    var door = createSprite(select_door, -50);
    var climber = createSprite(door.x, 10);
    var invisibleBlock = createSprite(door.x, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;


    
     
ghost.depth = door.depth+1;

    


 ghost.lifetime = 800;
    door.lifetime = 800;
    climber.lifetime = 800;
    
     doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


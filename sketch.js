
var student,studentImg;
var ground, invisibleGround,groundImg;
var score;
var obstaclesGroup,obstacle1,obstacle2,obstacle3;
var PLAY=1
var gameState=PLAY
var END=0
var score;
var gameOverImg,restartImg


function preload(){
    studentImg=loadImage("student.png")
    groundImg=loadImage("ground.png")
    obstacle1=loadImage("obstacle1.png")
    obstacle2=loadImage("obstacle2.png")
    obstacle3=loadImage("obstacle3.png")
    restartImg = loadImage("reset.png")
    gameOverImg = loadImage("gameOver.png")
}

function setup() {
    createCanvas(550,400)
  
    
    ground=createSprite(305,218,612,177)
    ground.addImage(groundImg)

    student= createSprite(100,290,20,50)
    student.addImage(studentImg)
    student.scale=0.2

    invisibleGround=createSprite(200,380,550,20)
    invisibleGround.visible= false 
    obstaclesGroup=new Group   

    score = 0;
   
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,180);
    restart.addImage(restartImg);

    gameOver.scale = 0.2;
  restart.scale = 0.2;
 
}

function draw() {
  background("skyblue")
  text("Score: "+ score, 400,50);


  if(gameState===PLAY){
    gameOver.visible = false
    restart.visible = false
    ground.velocityX=-4
    score = score + Math.round(frameCount/60);
    if(keyDown("space")&& student.y >= 100) {
      student.velocityY = -12 ;
    }
   
    if(ground.x<250){
      ground.x=ground.width/2

      student.velocityY = student.velocityY + 7   
    }
    spawnObstacles()
    if(obstaclesGroup.isTouching(student)){
      gameState=END
    }
  }
   

   

    else if(gameState===END){
      gameOver.visible = true;
      restart.visible = true;
      ground.velocityX=0
      obstaclesGroup.setLifetimeEach(-1)
      obstaclesGroup.setVelocityXEach(0)
      student.velocityY=0
      
    }
    student.collide(invisibleGround)
    

    if(mousePressedOver(restart)){
      reset()
    }
    
    drawSprites()

    
}

function reset(){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  score=0
  obstaclesGroup.destroyEach()
}

function spawnObstacles(){
    if (frameCount % 80 === 0){
     obstacle = createSprite(500,325,10,40);
      obstacle.velocityX = -6;
       
      var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
       }  
       obstacle.scale = 0.04;
       obstaclesGroup.add(obstacle)
       obstacle.lifetime = 60;
    }
   }

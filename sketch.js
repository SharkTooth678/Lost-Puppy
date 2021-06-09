var Ground;
var cityBackground;

var player;
var Car1, Cars2;

var Car1Group, Cars2Group, HelicopterGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;







function preload(){

    cityBackgroundImage = loadImage("images/City Background.jpg");

    jumpingAnimation = loadAnimation(
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump00.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump01.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump02.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump03.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump04.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump05.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump06.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump07.png'   
      );
      runningAnimation = loadAnimation(
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run00.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run01.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run02.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run03.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run04.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run05.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run06.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run07.png'  
      );

      
      RedCar = loadImage("images/Red Car.png");

      BlueCar = loadImage("images/Blue Car.png");

      Helicopter = loadImage("images/Helicopter.png");
                            



}

function setup(){
    createCanvas(400, 400);


    //ground = createSprite(20,390,400,20);
    // ground.visible = true;
    //ground.velocityX = -(6 + 3*score/100);

    // MovingBackground
    MovingBackground = createSprite(400, 200);
    MovingBackground.addImage(cityBackgroundImage);
    MovingBackground.velocityX = -2;
    MovingBackground.scale=1.75;

    player = createSprite(100, 310, 5, 90);
    player.addAnimation("running", runningAnimation) ;
    player.scale = 1;

    InvisibleGround = createSprite(200,388,400,10);
    InvisibleGround.visible = false;

   
   HelicopterGroup = new Group();
   Car1Group = new Group();
   Cars2Group = new Group();
  


}

function draw(){

   background(0);

  if(gameState === PLAY){
  
    

    MovingBackground.velocityX = -2;
    if(MovingBackground.x < 0){
      MovingBackground.x = MovingBackground.width/2;
    }

    if(keyDown("space")&& player.y >= -100) {
      player.addAnimation("jumping", jumpingAnimation) ; 
      player.velocityY = -12;
     } 

  player.velocityY = player.velocityY + 0.8;

  if (Cars2Group.isTouching(player)){
      gameState === END
      console.log("END")
  }

   else if (Car1Group.isTouching(player)){
      gameState === END
  }

  else if (HelicopterGroup.isTouching(player)){
    gameState === END
}

 

   SpawnCars();
   SpawnCars2();
   SpawnHelicopter();

  

  }

  else if(gameState === END){

    player.velocityX = 0;
    Car1Group.setVelocityXEach(0);
    Cars2Group.setVelocityXEach(0);
    HelicopterGroup.setVelocityXEach(0);
    MovingBackground.velocityX = 0;

    Car1Group.setLifetimeEach(-1);
    Cars2Group.setLifetimeEach(-1);
    HelicopterGroup.setLifetimeEach(-1);

  }

   

   // added gravity

   player.collide(InvisibleGround);

  //  Buildings1Group.setLifetimeEach(-1);
  //  Buildings1Group.setVelocityXEach(0);
 
  //  Buildings2Group.setLifetimeEach(-1);
  //  Buildings2Group.setVelocityXEach(0);




   drawSprites();



  
}


function SpawnCars(){
    if (frameCount % 150 === 0) {

      Car1 = createSprite(350,370,400,10);
      Car1.addImage(RedCar);
      // Car1.y = Math.round(random(340,370));
      Car1.scale = 0.15;
      Car1.velocityX = -3;

      Car1.lifetime = 400;
      
      Car1.depth = player.depth;
      player.depth = Car1.depth + 1;
      
      Car1Group.add(Car1);

    }

    
  




}

function SpawnCars2(){
  if (frameCount % 90 === 0) {

    Cars2 = createSprite(390,375,400,10);
    Cars2.addImage(BlueCar);
    // Cars2.y = Math.round(random(340,370));
    Cars2.scale = 0.035;
    Cars2.velocityX = -3;

    Cars2.lifetime = 400;

    Cars2.depth = player.depth;
    player.depth = Cars2.depth + 1;
    
    Cars2Group.add(Cars2);
  }

}

function SpawnHelicopter(){
  if (frameCount % 60 === 0){

    helicopter = createSprite(200,50,400,10);
    helicopter.addImage(Helicopter);
    helicopter.y = Math.round(random(20,100));
    helicopter.scale = 0.035;
    helicopter.velocityX = -10;

    helicopter.lifetime = 400;

    helicopter.depth = player.depth;
    player.depth = helicopter.depth + 1;

    HelicopterGroup.add(helicopter);


  }
  



}





  


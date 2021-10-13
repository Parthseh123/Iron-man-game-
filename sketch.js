var player,playerImg;
var bg, bgImage;
var coinsGroup, coinImage;
var diamondScore = 0;
var gameState = "play";
var restartimage,restart

function preload() {
  playerImg = loadImage("images/iron.png")
  
  diamondImg = loadImage("images/diamond.png")

  spikesImage = loadImage("images/spikes.png");
  stoneImage = loadImage("images/stone.png");
  
  restartImage = loadImage("images/restart.png");
  bgImage = loadImage("images/bg.jpg")
}

function setup() {
  createCanvas(1357, 580);

  //create background sprite
  bg = createSprite(580, 300);
  bg.addImage(bgImage);
  bg.scale = 2.5;
  bg.velocityY = 10;

  //create Mario sprite
  player = createSprite(650, 405, 20, 50);
  player.addImage(playerImg)
  player.scale = 0.2;
  // player.debug= true;
  //create ground sprite


  restart = createSprite(675,310,50,50)
  restart.addImage(restartImage)
  restart.scale = 0.3
  //create groups
  obstaclesGroup = new Group();
  diamondGroup = new Group();
}

function draw() {

  if (gameState === "play") {
    // play state code starts here
    //scroll background 
    if (bg.y < 200) {
      bg.y = 300;
    }

    //jump with space
    if (keyDown("right")) {
      player.velocityX = 5;
    }
    if (keyDown("left")) {
      player.velocityX = -5;
    }
      


    //call the function to generate diamonds
    generatediamonds();

    //Make Mario catch the coin
    for (var i = 0; i < (diamondGroup).length; i++) {
      var temp = (diamondGroup).get(i);

      if (temp.isTouching(player)) {
        //increase score when diamond is caught
        diamondScore++;
        //destroy diamond once it is caught
        temp.destroy();
        temp = null;
      }
    }
    //call the function to generate Obstacles
    generateObstacles();



    restart.visible = false;
    // play state code ends here
  }
   else if (gameState === "end") {
    // end state code starts here
    bg.velocityY = 0;

    player.velocityX = 0;
    player.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0);
    diamondGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);

   player.destroy()

    restart.visible = true;
    // end state code ends here
  }

  if(mousePressedOver(restart)){
    restartg();
  }

 
  if (obstaclesGroup.isTouching(player)) {
    gameState = "end";
  }







  //draw sprites on screen
  drawSprites();
  textSize(20);
  fill("brown");
  //display score
  text("Diamonds Collected: " + diamondScore, 500, 50);

}



function generatediamonds() { 
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 120, 40, 10);
    diamond.addImage("diamondImage");
    diamond.x = random(80, 350);
    diamond.scale = 0.1;
    diamond.velocityY = -3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }
}


function generateObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1200, 545, 10, 40);
    obstacle.velocityY = -4;
    obstacle.scale = 0.15;
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacle.addImage("spike");
        break;
      case 2:
        obstacle.addImage("stone");
        break;
      default:
        break;
    }
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function restartg (){
  gameState = "play";
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  // mario.y = 505;
  // mario.debug = true;
  mario.setCollider("rectangle",0,0,300,500)
}
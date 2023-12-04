var rocks = [];
var testRocks;
let timer = 10
var rocket = {
  y: 200,
  x: 200,
  t1: 0,
  t2: 0,
  t3: 0
}


function setup() {
  createCanvas(600,400)
  noStroke();

  for (var rockNum = 0; rockNum < 10; rockNum++) {
  	rocks[rockNum] = new Rock();  
  }

  let y = height;
  testRock = new Rock();
  testRock.size = 50;
  testRock.rockX = 0; 
  testRock.rockY = 0;
  testRock.red = 128;
  testRock.blue = 128;
  testRock.green = 128;
  testRock.speedX = 0;
  testRock.speedY = 1.2;
}


function draw() {
  
  background(0);
  textAlign(CENTER,BOTTOM);
  textSize(150);
  fill(225)
  text(timer, width/2, height/2);
  if (frameCount % 60 == 0 && timer > 0) { 
    timer --;
  }
  if (timer == 0) {
    background(5,200,120);
    textSize(60);
    text("You Win!",300,200);
    noLoop();
    return;
  }
  ship = new Ship()
  ship.display();
  ship.moveShip();
  
  
  testRockMove(); 
  
  for (var rockNum = 0; rockNum < rocks.length; rockNum++) {
    rocks[rockNum].display();
    rocks[rockNum].moveRock();
    rocks[rockNum].resetRock();
    rocks[rockNum].checkCollision();
  }
  
}


function testRockMove() {
  
  testRock.display();
  testRock.moveRock();
  testRock.resetRock();
  testRock.checkCollision();
}

class Ship{
  display(){
  fill(255);
  rect(rocket.x,rocket.y,25,30);
  triangle(rocket.x, rocket.y, rocket.x+12, rocket.y -15, rocket.x+25, rocket.y);
  triangle(rocket.x+12, rocket.y+20, rocket.x+30, rocket.y +40, rocket.x-5, rocket.y+40);
  fill(220);
  ellipse(rocket.x+13, rocket.y+10, 15,15);
  }
  
  moveShip(){
  if (keyIsPressed === true) {

    if (keyCode == UP_ARROW) {

      rocket.y -= 10
    } else if(keyCode == DOWN_ARROW) {
      rocket.y += 10
    } else if(keyCode == LEFT_ARROW) {
      rocket.x -= 10
    }else if(keyCode == RIGHT_ARROW) {
      rocket.x += 10
    }
  }
  }
}

class Rock{
  
  constructor() {
    this.rockX = random(0, width)
    this.rockY = 0
    
    this.speedY = random(1, 5);
    this.speedX = 0;
    
    this.size = random(10,70);
    
    this.alpha = 400
    
    // RGB values for color
    this.red   = 128;
    this.green = 128;
    this.blue  = 128;
    
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.rockX, this.rockY, this.size);
  }
  
  
  moveRock() {

    this.rockX += this.speedX;
  	this.rockY += this.speedY;
  }
  resetRock(){
    if (this.rockY >= 400){
      this.rockY = 0;
      this.rockX = random(0, width)
    }
  }
  checkCollision(){
    let radius = this.size / 2;
    if ((this.rockX + radius) > rocket.x && (this.rockX - radius) < rocket.x+25 && (this.rockY + radius) > rocket.y-15 && (this.rockY - radius) < rocket.y+40){
      background(255,0,0);
      fill(255,255,255)
      textSize(60);
      text("You Lose!",300,200);
      noLoop();
      return;
    }
  }
}



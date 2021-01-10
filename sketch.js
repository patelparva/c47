var canvas;
var greenHero, hImage;
var weapon,weaponImg;
var bgImg,bgSprite;
var tree,tcImage,treeCutter,tImage,tcAnimation,tdAnimation;
var plasticBag,pImg;
var car,carImg;
var factory,fImage;
var insecticides,iImage;
var pollutionLevel;
var weaponGrp;
var plasticLifetime;
var obstacle;

function preload() {
  hImage=loadImage("images/green-hero.png")
  bgImg=loadImage("images/background.png")
  tImage=loadImage("images/tree-standing.png")
  weaponImg=loadImage("images/rocket.png")
  tcAnimation=loadAnimation("images/c1.png","images/c2.png","images/c3.png","images/c4.png","images/c5.png","images/c6.png")
  tdAnimation=loadAnimation("images/d1.png","images/d2.png","images/d3.png","images/d4.png","images/d5.png","images/d6.png")
  pImg=loadImage("images/plasticbag.png")
  carImg=loadImage("images/vehicle.png")
  fImage=loadImage("images/factory.png")
  iImage=loadImage("images/insecticide.png")
  tcImage=loadImage("images/tree fallen.png")
  car1Img=loadImage("images/vehicle1.png")
}

function setup(){
  canvas = createCanvas(displayWidth-150, displayHeight-150);

  greenHero = createSprite(width/8,height-150,200,height/3);
  greenHero.addImage(hImage);
  greenHero.scale=0.6

  tree = createSprite(width+50,height-300,width/2,height/2);
  tree.addImage("tree",tImage)
  
  // treeCutter=createSprite(tree.x-width/11,tree.y+height/6,10,10)
  // treeCutter.addAnimation("tree-cutting",tcAnimation);
  // treeCutter.addAnimation("treecutter-die",tdAnimation);
  // treeCutter.scale=3
  // treeCutter.debug=true

  // plasticBag=createSprite(width+width+50,height-height/4,30,30)
  // plasticBag.addImage(pImg);
  // plasticBag.scale=0.15

  // car=createSprite(width+width+width+50,height-height/4,30,30);
  // car.addImage(carImg);

  // factory=createSprite(width+width+width+width+50,height-height/1.8);
  // factory.addImage(fImage);
  // factory.scale=1.3

  insecticides=createSprite(width+width+width+width+width+50,height-height/4);
  insecticides.addImage(iImage);
  insecticides.scale=0.3;

  weaponGrp=createGroup();

  plasticLifetime=5;
}

function draw(){
  background(bgImg);

  drawSprites();

  // if (weaponGrp.isTouching(plasticBag)) {
  //   plasticLifetime=plasticLifetime-1
  // }
  
  if (greenHero.x>width/2) {
    camera.position.x=greenHero.x;  
  }

  if (keyDown(UP_ARROW)) {
    greenHero.y=greenHero.y-5;
  }
  if (keyDown(DOWN_ARROW)) {
    greenHero.y=greenHero.y+5;
  }
  if (keyDown(LEFT_ARROW)) {
    greenHero.x=greenHero.x-5;
  }
  if (keyDown(RIGHT_ARROW)) {
    greenHero.x=greenHero.x+50;
  }

  if (keyDown("space")) {
    weapon=createSprite(greenHero.x,greenHero.y,10,10)
    weapon.velocityX=8;
    weapon.addImage(weaponImg);
    weapon.scale=0.1
    weapon.lifetime=150
    weaponGrp.add(weapon);
  }

  if (frameCount>600 || frameCount>1000 || frameCount>1500 || frameCount>2000 || frameCount>2500) {
    pollutionLevel=pollutionLevel+50;
  }

  console.log(frameCount)

  spawnObstacle();
}

function spawnObstacle() {
  if (frameCount%200===0) {
    var r = Math.round(random(1,5));

    obstacle=createSprite(camera.position.x+width,Math.round(random(200,500)))
    switch (r) {
      case 1:
        obstacle.addAnimation("tree-cutting",tcAnimation);
        obstacle.addAnimation("treecutter-die",tdAnimation);
        obstacle.scale=3
        obstacle.debug=true
        obstacle.setCollider("rectangle",-10,10,20,30)
        if (weaponGrp.isTouching(obstacle)) {
          obstacle.changeAnimation("treecutter-die",tdAnimation);
          weapon.velocityX=0;
          obstacle.lifetime=2
        }      
        break;
      case 2:
        obstacle.addImage(pImg);
        obstacle.scale=0.15;
        obstacle.lifetime=500;
        break;
      case 3:
        obstacle.addImage(carImg);
        obstacle.lifetime=500;
        break;
      case 4:
        obstacle.addImage(fImage);
        obstacle.scale=1
        obstacle.lifetime=500;
        break;
      case 5:
        obstacle.addImage(iImage);
        obstacle.scale=0.3;
        obstacle.lifetime=500;
        break;
      default:
        break;
    }
  }
}
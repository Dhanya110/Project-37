//Create variables here

var dog,dogImage,happyDogImage;
var database,foodS=0,foodStock
var fedTime,lastFed;
var foodObj;
var feed,addFood1;
function preload(){
 
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  //createCanvas
  createCanvas( 800, 800);
  
  database=firebase.database();

  foodObj=new Food();

  dog=createSprite(610,350,10,10);
  dog.addImage(dogImage);
  dog.scale=0.27

  feed=createButton("Feed Tipu")
  feed.position(950,190);
  feed.mousePressed(feedDog)
  
  addFood1=createButton("Add food")
  addFood1.position(470,190)
  addFood1.mousePressed(addFood)
}

function draw() {  
background(46,139,87)

fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
lastFed=data.val();
})

fill(255,255,254);
textSize(15);
if (lastFed>=12){
  text("Last Fed:"+lastFed % 12+"PM",350,30);
}else if(lastFed==0){
  text("Last Fed:12 AM",350,30);
}else{
  text("Last Fed:"+lastFed+"AM",350,30);
}


foodObj.display();
  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);

  foodObj.updateFoodStock(foodObj.foodStock-1);
  foodObj.deductFood();
  database.ref('/').update({
    FoodStock:foodObj.foodStock,
    FeedTime:hour()
  })
}

function addFood(){
  foodS=foodObj.foodStock+1;
  database.ref('/').update({
    FoodStock:foodS
  })
  foodObj.foodStock++;
}



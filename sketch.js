var dog, sadDog, happyDog,database;
var button1, button2;
var foodObj, feed, addFood, feedDog;
var foodS,foodStock;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readFood);

  feed = createButton("Feed The Dog");
  feed.position(700, 200);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 200);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  foodObj.display();


  drawSprites();
}

function readFood(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
  Food:foodObj.getFoodStock()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


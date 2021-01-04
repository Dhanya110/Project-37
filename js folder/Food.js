class Food{
    constructor(){
     this.foodStock=20;
      this.lastFed;  
      this.image=loadImage("js folder/Milk.png")
    }

    getFoodStock(){
        var foods_stock =database.ref('Food');
        foods_stock.on("value", readStock);
        //foodStock.set(20)
     }

     
    updateFoodStock(foodStock){
        database.ref('/').update({
            FoodStock:foodStock
        })
        
        }


     deductFood(){
          if(this.foodStock>0){
              this.foodStock=this.foodStock-1
          }
          return this.foodStock;
      }

    

      display(){
        var x=80,y=250;
        imageMode(CENTER);
        image(this.image,720,220,70,70)
        if(this.foodStock!=0){
        for(var i=0; i<this.foodStock; i++){
            if(i%10==0){
                 x=80;
                y=y+50
        }
            image(this.image,x,y,50,50);
             x=x+30;
        }
     }
    }
}
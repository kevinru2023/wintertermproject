const canvas = document.getElementById("gamearea"); 
const ctx = canvas.getContext("2d"); 


let cheight = canvas.height; 
let cwidth = canvas.width; 

let snakex = 100; 
let snakey= 100; 
let snakewidth = 100; 
let snakeheight = 100; 

let up = false; 
let down = false; 
let right = false; 
let left = false; 

//key up set var to false, key down set vars to true 
function keyUp(event){
     //left arrow key 
     if (event.keyCode == 37){
        left = false; 
    }
    //up arrow key
    if (event.keyCode == 38){
        up = false; 
    }  
    //right arrow key 
    if (event.keyCode == 39){
        right = false; 
    }
    //down arrow key 
    if (event.keyCode == 40){
        down = false; 
    }
    
}

function keyDown(event){
    //left arrow key 
    if (event.keyCode == 37){
       left = true; 
   }
   //up arrow key
   if (event.keyCode == 38){
       up = true; 
   }  
   //right arrow key 
   if (event.keyCode == 39){
       right = true; 
   }
   //down arrow key 
   if (event.keyCode == 40){
       down = true; 
   }
   
}

//need to fix this because snake doesn't allow you to move diagonally. 
function inputs(obj, u, d, r, l){
    //up and down arrow key logic 
    if(u && !d){
        obj.speedY = -5; 
    }
    else if(!u && d){
        obj.speedY = 5; 
    }
    else{
        obj.speedY = 0; 
    }
    
    //right and left arrow key logic 
    if(r && !l){
        obj.speedX = 5; 
    }
    else if(!r && l){
        obj.speedX = -5; 
    }
    else{
        obj.speedX = 0; 
    }
    
}



function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
}

class snakeobj{
    constructor(x, y, width, height){
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.speedX = 0;
        this.speedY = 0; 
    }
    
    draw() {
        ctx.fillStyle = "Green"; 
        ctx.beginPath(); 
        //this reason for this is so that the x and y coordinates are the middle of the drawn rectangle
        ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height); 

        if(this.left() < 0){
            this.x = cwidth/2; 
            this.y = cheight/2; 
        }
        if(this.right() > cwidth){
            this.x = cwidth/2; 
            this.y = cheight/2; 
        }

        if(this.top() < 0){
            this.x = cwidth/2; 
            this.y = cheight/2;
        }
        if(this.bottom() > cheight){
            this.x = cwidth/2; 
            this.y = cheight/2;
        }
       
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;  
    }

    //functions to help with collsions 
    left(){
        return this.x - this.width/2; 
    }
    right(){
        return this.x + this.width/2; 
    }
    top(){
        return this.y - this.height/2; 
    }
    bottom(){
        return this.y + this.height/2; 
    }
}

function gameLoop(){
    clearScreen();
    
    inputs(snake, up, down, right, left); 
    snake.move();
    snake.draw(); 

    requestAnimationFrame(gameLoop);
}

let snake = new snakeobj(snakex, snakey, snakewidth, snakeheight); 

document.body.addEventListener("keydown",keyDown)
document.body.addEventListener("keyup",keyUp)

gameLoop(); 



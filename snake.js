const canvas = document.getElementById("gamearea"); 
const ctx = canvas.getContext("2d"); 
const speed = 2; 

let cheight = canvas.height; 
let cwidth = canvas.width; 

//initial x and y are in the middle of canvas 
let snakex = cwidth/2; 
let snakey= cheight/2; 
let snakewidth = 25; 
let snakeheight = 25; 

//input var 
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
    if (r) {
        obj.speedX = speed;
        obj.speedY = 0;
    } else if (l) {
        obj.speedX = -speed;
        obj.speedY = 0;
    }

    // Determine vertical movement
    if (u) {
        obj.speedX = 0;
        obj.speedY = -speed;
    } else if (d) {
        obj.speedX = 0;
        obj.speedY = speed;
    }

    // Prevent simultaneous horizontal and vertical movement
    if ((u || d) && (l || r)) {
        obj.speedX = 0;
        obj.speedY = 0;
    }
    
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
}

class snakeobj{
    constructor(tempX, tempY, width, height){
        this.x = tempX; 
        this.y = tempY; 
        this.width = width; 
        this.height = height; 

        this.speedX = 0;
        this.speedY = 0; 
        //array for body parts 
        this.segments = []
        //adding head position to this array
        this.segments.push({x:this.x, y:this.y })
    }
    
    borderCollison(){
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
    
    
    drawHead() {
        ctx.fillStyle = "Green"; 
        ctx.beginPath(); 
        //this reason for this is so that the x and y coordinates are the middle of the drawn rectangle
        ctx.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height); 
        
        this.borderCollison();
    }
    
    addSegment(u,d,l,r){
        const lastseg = this.segments[this.segments.length - 1]; 
        if (r){
            this.segments.push({x:lastseg.x - this.width, y: lastseg.y});
        }
        else if (l){
            this.segments.push({x:lastseg.x + this.width, y: lastseg.y});
        }
        else if (u) {
            this.segments.push({x: lastseg.x, y: lastseg.y + this.height});
        } 
        else if (d) {
            this.segments.push({x: lastseg.x, y: lastseg.y - this.height});
        }
    }
    move(){
        this.x += this.speedX;
        this.y += this.speedY;  
        
        //changing coords of head 
        this.segments[0] = {x:this.x, y: this.y};

    }

    //functions to help with collsions with head 
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
    snake.drawHead(); 

    requestAnimationFrame(gameLoop);
}

let snake = new snakeobj(snakex, snakey, snakewidth, snakeheight); 

document.body.addEventListener("keydown",keyDown)
document.body.addEventListener("keyup",keyUp)

gameLoop(); 



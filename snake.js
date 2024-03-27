const canvas = document.getElementById("gamearea"); 
const ctx = canvas.getContext("2d"); 
const gridSize = 25; 
const speed = gridSize; 

let cheight = canvas.height; 
let cwidth = canvas.width; 

//making variables to keep track of grid 
const numCols = Math.floor(canvas.width / gridSize);
const numRows = Math.floor(canvas.height / gridSize);


let initsnakeX = Math.floor(numRows / 2) * gridSize; // Start in the middle of the grid
let initsnakeY = Math.floor(numCols / 2) * gridSize;
let snakewidth = gridSize; 
let snakeheight = gridSize; 

let applesize = gridSize;

//input var 
let up = false; 
let down = false; 
let right = false; 
let left = false; 

//only need key down cause you don't hold down a key
function keyDown(event){
    //left arrow key 
    if (event.keyCode == 37){
       left = true; 

       right = false; 
       up = false; 
       down = false; 
   }
   //up arrow key
   if (event.keyCode == 38){
       up = true; 

       left = false; 
       right = false; 
       down = false; 
   }  
   //right arrow key 
   if (event.keyCode == 39){
       right = true; 

       left = false; 
       up = false;
       down = false;
   }
   //down arrow key 
   if (event.keyCode == 40){
       down = true; 

       left = false; 
       right = false; 
       up = false; 
   }
   
}

//function to help with apple not generating on top of snake 
function isAppleOnSnake(apple,snake) {
    for (let i = 0; i < snake.segments.length; i++) {
        if (apple.position.x === snake.segments[i].x && apple.position.y === snake.segments[i].y) {
            return true;
        }
    }
    return false;
}

//need to fix this because snake doesn't allow you to move diagonally. also think maybe a different approach would be better maybe like moving the snake a
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
        //setting x and y in terms of grid units
        this.x = Math.floor(tempX / gridSize); 
        this.y =  Math.floor(tempY / gridSize); 
        this.width = width; 
        this.height = height; 

        this.speedX = 0;
        this.speedY = 0; 
        //array for body parts and adding the head to this
        this.segments = [{x:this.x, y:this.y }]
        

    }
    
    borderCollison(){
        if (this.left() < 0 || this.right() > numRows || this.top() < 0 || this.bottom() > numCols) {
            return true; // Return true to indicate collision
        }
        return false; // Return false if no collision
    }
    
    draw() {
        for(let i = 0; i < this.segments.length; i++){
            ctx.fillStyle = "Green";
            ctx.beginPath(); 
            // Draw the segment at the calculated position the * gridsize is to change into pixel units instead of grid units 
            ctx.fillRect(this.segments[i].x * gridSize, this.segments[i].y * gridSize, this.width, this.height);
        }
    }
        
    move(){
        this.segments[0].x += this.speedX / gridSize;
        this.segments[0].y += this.speedY / gridSize;  
        
        for(let i = 1; i < this.segments.length; i++){
            this.segments[i].x += this.segments[i-1].x; 
            this.segments[i].y += this.segments[i-1].y; 
        }

    }

    //functions to help with collsions with head also gridsize is here to get exact pixel 
    left(){
        return this.segments[0].x; 
    }
    right(){
        return this.segments[0].x + 1 ; 
    }
    top(){
        return this.segments[0].y; 
    }
    bottom(){
        return this.segments[0].y + 1; 
    }
}
//apple class from chatgpt cause im cooked on just snake logic and don't want to deal with apple spawn in logic 
class appleobj{
    constructor(appleSize) {
        this.appleSize = appleSize;
        this.position = this.generateRandomPosition();
    }

    generateRandomPosition() {
        //generate a random position in grid units 
        const x = Math.floor(Math.random() * (cwidth / gridSize));
        const y = Math.floor(Math.random() * (cheight / gridSize));
        return { x, y };
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.fillRect(this.position.x * gridSize, this.position.y * gridSize, this.appleSize,this.appleSize);
    }
}

function applecheck(snake,apple){
    while(isAppleOnSnake(apple,snake)){
        apple.position = apple.generateRandomPosition();
        isAppleOnSnake(apple,snake);
    }
}
//variables for frame rate
let frameCount = 0;
let targetFPS = 15;
let updateInterval = Math.round(60 / targetFPS);


function gameLoop(){ 
    //15 frames per second instead of 60 
    frameCount++; 
    if (frameCount >= updateInterval) {
        frameCount = 0; 
        //basic snake inputs, movement, and drawing 
        
        clearScreen();
        inputs(snake, up, down, right, left); 
        snake.move();
        snake.draw(); 
        
        apple.generateRandomPosition(); 
        //if the apple's random position is on any part of the snake generate a new random position 
        applecheck(snake,apple);
        apple.draw();

        //if the snake hits the border reset it back to the middle with no new segments and make its body be 1 square big 
        if(snake.borderCollison()){
            snake.segments = [{x: Math.floor(numRows / 2) , y: Math.floor(numCols / 2)}]; 
            snake.speedX = 0; 
            snake.speedY = 0; 
            up = false;
            down = false; 
            right = false; 
            left = false; 
        }
        //checks for seeing if snake has touched apple 
    }
    requestAnimationFrame(gameLoop);
}

let snake = new snakeobj(initsnakeX, initsnakeY, snakewidth, snakeheight); 
let apple = new appleobj(applesize)

document.body.addEventListener("keydown",keyDown)

gameLoop(); 



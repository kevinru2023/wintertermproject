//constant variables for canvas and grid 
const canvas = document.getElementById("gamearea"); 
const ctx = canvas.getContext("2d"); 
const gridSize = 25; 
const speed = gridSize; 
const numCols = Math.floor(canvas.width / gridSize);
const numRows = Math.floor(canvas.height / gridSize);

//inital snake variables 
let initsnakeX = Math.floor(numRows / 2) * gridSize; // Start in the middle of the grid
let initsnakeY = Math.floor(numCols / 2) * gridSize;
let snakeWidth = gridSize; 
let snakeHeight = gridSize; 

//apple vars 
let appleSize = gridSize;

//input var 
let up = false; 
let down = false; 
let right = false; 
let left = false; 

//vars for frame rate 
let frameCount = 0;
let targetFPS = 10;
let updateInterval = Math.round(60 / targetFPS);

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
}
//function for key inputs, only need a function for keydown in this case 
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

//functions for inputs 
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

//function to check whether or not the apple is on the snake. 
function isAppleOnSnake(snake,apple) {
    for (let i = 0; i < snake.segments.length; i++) {
        if (apple.position.x === snake.segments[i].x && apple.position.y === snake.segments[i].y) {
            return true;
        }
    }
    return false;
}

//checking if the random apple generated is on the snake if so genereate a new one 
function applespawncheck(snake,apple){
    while(isAppleOnSnake(snake,apple)){
        apple.position = apple.generateRandomPosition();
        isAppleOnSnake(snake,apple);
    }
}

//main game loop
function gameLoop(){ 
    //15 frames per second instead of 60 
    frameCount++; 
    if (frameCount >= updateInterval) {
        frameCount = 0; 
        clearScreen(); 
        
        //same as below but with body collisons instead 
        if(snake.bodyCollison()){
            snake.segments = [{x: Math.floor(numRows / 2) , y: Math.floor(numCols / 2)}]; 
            snake.speedX = 0; 
            snake.speedY = 0; 
            up = false;
            down = false; 
            right = false; 
            left = false; 
        }
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
        //if snake eats apple, generate new position that isn't on snake 
        if (isAppleOnSnake(snake,apple)){
            snake.addSeg(); 
            apple.generateRandomPosition();
            applespawncheck(snake,apple);
        }
        //update snake position 
        inputs(snake, up, down, right, left); 
        snake.move();

        //finally draw snake and apple 
        snake.draw();  
        apple.draw();

    }
    requestAnimationFrame(gameLoop);
}

class snakeobj{
    //most variables here are in grid units instead of pixel units
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
    
    bodyCollison(){
        for(let i = 1; i < this.segments.length; i++)
        {
            if(this.segments[0].x == this.segments[i].x && this.segments[0].y == this.segments[i].y){
                return true 
            }
        }
        return false; 
    }

    draw() {
        //make head orange
        ctx.fillStyle = "Orange";
        ctx.beginPath(); 
        ctx.fillRect(this.segments[0].x * gridSize, this.segments[0].y * gridSize, this.width, this.height);
        //make the rest of the body green
        for(let i = 1; i < this.segments.length; i++){
            ctx.fillStyle = "Green";
            ctx.beginPath(); 
            // Draw the segment at the calculated position the * gridsize is to change into pixel units instead of grid units 
            ctx.fillRect(this.segments[i].x * gridSize, this.segments[i].y * gridSize, this.width, this.height);
        }
    }
        
    move(){
        //position for head after movement 
        let newX = this.segments[0].x + this.speedX / gridSize;
        let newY = this.segments[0].y + this.speedY / gridSize;  

        //shoutout to the freeCodeCamp for this, I was losing my mind over figuring out how to do this with a for loop 
        //all this is doing is removing the last element say [1,2,3] -> [1,2], then adding in a new element with unshift so lets say we add 3 -> [3,1,2]
        //this is the same as moving the snake using previous elements 
        this.segments.pop(); 
        this.segments.unshift({x:newX, y:newY}); 

    }
    addSeg(){
        //adding an element to the array but it's gonna have the same value as the last index so the last two elements are identical 
        let lastseg = this.segments[this.segments.length - 1]; 
        this.segments.push({x: lastseg.x, y:lastseg.y}); 
    }
    //functions to help with collsions with head and border 
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
        const x = Math.floor(Math.random() * (canvas.width / gridSize));
        const y = Math.floor(Math.random() * (canvas.height / gridSize));
        return { x, y };
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.fillRect(this.position.x * gridSize, this.position.y * gridSize, this.appleSize,this.appleSize);
    }
}

let snake = new snakeobj(initsnakeX, initsnakeY, snakeWidth, snakeHeight); 
let apple = new appleobj(appleSize);

document.body.addEventListener("keydown",keyDown)

//initalizing the apple at a random position here so we don't have to do in the loop many times. 
apple.generateRandomPosition();
applespawncheck(snake,apple); 

gameLoop(); 



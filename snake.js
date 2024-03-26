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

let applesize = 25;

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

function isAppleOnSnake(apple,snake) {
    for (let i = 0; i < snake.segments.length; i++) {
        if (apple.position.x === snake.segments[i].x && apple.position.y === snake.segments[i].y) {
            return true;
        }
    }
    return false;
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
        //array for body parts and adding the head to this
        this.segments = [{x:this.x, y:this.y }]

    }
    
    borderCollison(){
        if (this.left() < 0 || this.right() > cwidth || this.top() < 0 || this.bottom() > cheight) {
            // No need to update x and y here
            return true; // Return true to indicate collision
        }
        return false; // Return false if no collision
    }
    
    draw() {
        //this reason for this is so that the x and y coordinates are the middle of the drawn rectangle
        for(let i = 0; i < this.segments.length; i++){
            ctx.fillStyle = "Green"; 
            ctx.beginPath(); 
            ctx.fillRect(this.segments[i].x - this.width/2, this.segments[i].y, this.width, this.height);
        }
    }
    
    addSegment(u,d,l,r){
        console.log('added seg');
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
        
        for(let i = 0; i < this.segments.length; i++){
            this.segments[i].x += this.speedX; 
            this.segments[i].y += this.speedY; 
        }

    }

    //functions to help with collsions with head 
    left(){
        return this.segments[0].x - this.width/2; 
    }
    right(){
        return this.segments[0].x + this.width/2; 
    }
    top(){
        return this.segments[0].y; 
    }
    bottom(){
        return this.segments[0].y + this.height; 
    }
}
//apple class from chatgpt cause im cooked on just snake logic and don't want to deal with apple spawn in logic 
class appleobj{
    constructor(appleSize) {
        this.appleSize = appleSize;
        this.position = this.generateRandomPosition();
    }

    generateRandomPosition() {
        const x = Math.floor(Math.random() * (cwidth - this.appleSize));
        const y = Math.floor(Math.random() * (cheight - this.appleSize));
        return { x, y };
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, this.appleSize,this.appleSize);
    }
}

function applecheck(snake,apple){
    while(isAppleOnSnake(apple,snake)){
        apple.position = apple.generateRandomPosition();
        isAppleOnSnake(apple,snake);
    }
}

function gameLoop(){
    let check = false; 
    clearScreen();
    //basic snake inputs, movement, and drawing 
    inputs(snake, up, down, right, left); 
    snake.move();
    snake.draw(); 
    
    apple.generateRandomPosition(); 
    //if the apple's random position is on any part of the snake generate a new random position 
    applecheck(snake,apple);
    apple.draw();

    //if the snake hits the border reset it back to the middle with no new segments and make its body be 1 square big 
    if(snake.borderCollison()){
        snake.segments = [{x:cwidth/2, y:cheight/2}]; 
        snake.speedX = 0; 
        snake.speedY = 0; 
    }

    for(let i = 0; i < snake.segments.length; i++){
        if(snake.segments[i].x == apple.position.x || snake.segments[i].y == apple.position.y){
            check = true;  
        }
    }
    if(check){
        snake.addSegment(up,down,left,right);
        apple.position = apple.generateRandomPosition();
        apple.draw(); 
    }
    requestAnimationFrame(gameLoop);
}

let snake = new snakeobj(snakex, snakey, snakewidth, snakeheight); 
let apple = new appleobj(applesize)

document.body.addEventListener("keydown",keyDown)
document.body.addEventListener("keyup",keyUp)

gameLoop(); 



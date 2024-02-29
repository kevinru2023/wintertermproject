//alot of what I am using is thanks to this tutorial in a different progrmaming language: https://www.instructables.com/Pong-With-Processing/ 
 //I'm also using a youtube tutorial that I was recommended to understand how to draw in js: https://www.youtube.com/watch?v=UUFPEgRKwf4
 //and of course lots of chatgpt to debug, I love chatgpt for debugging. 

const canvas = document.getElementById("gamearea"); 
const ctx = canvas.getContext("2d"); 

let cwidth = canvas.width; 
let cheight = canvas.height; 

//these are the x and y cords of the ball as well as the diameter 
let ballw = 200; 
let ballh= 200; 
let balld = 50; 


//using this function from math.random docs to generate random int between two values 
function randomint(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
  
//game screen
function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
}

//all things related to the ball, ps I hate javascript. 
class ballClass{
    constructor(tempX, tempY, tempDiameter){
        this.x = tempX; 
        this.y = tempY; 
        this.speedX = 0; 
        this.speedY = 0; 
        this.diameter = tempDiameter; 
    }
    draw(){
        ctx.fillStyle= "white"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter / 2, 0, Math.PI*2 );
        ctx.fill();

        if(this.right() > cwidth){
            this.speedX = -this.speedX; 
        }
        if(this.left() < 0){
            this.speedX = -this.speedX; 
        }
        if(this.top() > cheight){
            this.speedY = -this.speedY; 
        }
        if(this.bottom() < 0){
            this.speedY = -this.speedY; 
        }
    }
    move(){
        this.y += this.speedY; 
        this.x += this.speedX; 
    }
    
    //functions that help with collision detection of ball. 
    left(){
        return this.x - this.diameter/2; 
    }
    right(){
        return this.x + this.diameter/2;
    }
    top(){
        return this.y + this.diameter/2; 
    }
    bottom(){
        return this.y - this.diameter/2; 
    }
}

class paddleClass{
    constructor(tempX, tempY,tempWidth, tempHeight){
        this.x = tempX; 
        this.y = tempY; 
        this.speedX = 0; 
        this.speedY = 0; 
        this.width = tempWidth; 
        this.height = tempHeight; 
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.beginPath(); 
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fill(); 
    }
    move(){
        this.y += this.speedY; 
        this.x += this.speedX; 
    }
    //the reason for subtracting or adding width or height is because the x,y is the center of the paddle. 
    left(){
        return this.x - this.width/2; 
    }
    right(){
        return this.x + this.width/2; 
    }
    top(){
        return this.y + this.height/2; 
    }
    bottom(){
        return this.y - this.height/2; 
    }
}
//bunch of setup stuff for ball probably should do this in a function but nawwwwww 
let Ball = new ballClass(ballw,ballh,balld); 
Ball.speedX = 5; 
Ball.speedY = randomint(-3,3); 


//game loop 
function drawGame(){
    clearScreen(); 
    Ball.move();
    Ball.draw();
    requestAnimationFrame(drawGame);
    //requestanimation frame could be thought of as a way to recursivly call the function but being in sync with the refresh rate, shotout to chatgpt the best mentor on me understanding this cursed function
}
drawGame();
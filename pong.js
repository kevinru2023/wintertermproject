const canvas = document.getElementById("gamearea"); 
const ctx = canvas.getContext("2d"); 
 //alot of what I am using is thanks to this tutorial in a different progrmaming language: https://www.instructables.com/Pong-With-Processing/ 
 //I'm also using a youtube tutorial that I was recommended to understand how to draw in js: https://www.youtube.com/watch?v=UUFPEgRKwf4

 //initializing our game screen 
 function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
}

//game loop 
function drawGame(){
    clearScreen(); 
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
    }
    move(){
        this.y += this.speedY; 
        this.x += this.speedX; 
    }

}

drawGame();
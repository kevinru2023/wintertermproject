document.addEventListener("DOMContentLoaded", function(event){
{
    let win  = false; 
    let currentplayer = "x";
    let squares = [0,0,0,
                   0,0,0,
                   0,0,0];
    //had to change these to an array due to reference issues and js not having pointers shoutout to chatgpt for that ngl 
    //so if s[0] = 0 then no player has clicked it, if s[0] = 1 player x has clicked it, if s[0] = 2 then player o has clicked it

    
    function checkwin(arr)
    {
        if(arr[0] == arr[1] == arr[2])
        {
            win = true; 
        }
        else if(arr[3] == arr[4]== arr[5])
        {
            win = true; 
        }
        else if(arr[6] == arr[7]== arr[8])
        {
            win = true; 
        }
        else if(arr[0] == arr[3]== arr[6])
        {
            win = true; 
        }
        else if(arr[1] == arr[4]== arr[7])
        {
            win = true; 
        }
        else if(arr[2] == arr[5]== arr[8])
        {
            win = true; 
        }
        else if(arr[0] == arr[4]== arr[8])
        {
            win = true; 
        }
        else if(arr[2] == arr[4]== arr[6])
        {
            win = true; 
        }
        
        else;
            win = false; 
        

    }
    
    // things to do still, make it so the win function is called and print winners, and also fix image sizing 
    //heavily changed code here by the help of chat gpt because scope in javascript is stupid, and I can't belive im saying this but c pointers and memeory is clutch
    function change(index)
    {
        let bttn = document.getElementById("b" + (index+1));
        console.log(bttn)
        if(squares[index] == 0 && win != true)
        {
            if(currentplayer == "x")
            {
                console.log("x player")
                bttn.style.backgroundImage="chainsaws.jpg";
                squares[index] = 1; 
                currentplayer = "o"; 
            }
            else if(currentplayer == "o")
            {
                console.log("o player")
                bttn.style.backgroundImage="log.jpg"; 
                squares[index] = 2; 
                currentplayer = "x"; 
            }
            else
            {
                return 1; 
            }

        } 
        return 0; 
            
        
    }
    
    document.getElementById("b1").addEventListener("click",() => {
        change(0)}) ;
    document.getElementById("b2").addEventListener("click",() => {
        change(1)}); 
    document.getElementById("b3").addEventListener("click",() => {
        change(2)}); 
    document.getElementById("b4").addEventListener("click",() => {
        change(3)}); 
    document.getElementById("b5").addEventListener("click",() => {
        change(4)}); 
    document.getElementById("b6").addEventListener("click",() => {
        change(5)}); 
    document.getElementById("b7").addEventListener("click",() => {
        change(6)}); 
    document.getElementById("b8").addEventListener("click",() => {
        change(7)}); 
    document.getElementById("b9").addEventListener("click",() => {
        change(8)}); 
    
}
})


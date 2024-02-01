document.addEventListener("DOMContentLoaded", function(event){
{
    let win  = false; 
    let currentplayer = "x"
    let s1 = 0, s2 = 0, s3 = 0, s4 = 0, s5 = 0, s6 =0 , s7 = 0, s8 = 0, s9 = 0; 
    //these are variables containing the informatin needed for the squares 
    //so if s = 0 then no player has clicked it, if s = 1 player X has clicked it, if s = 2 then player O has clicked it

    function change(button, square)
    {
        let bttn = document.getElementById(button) 
        if(square === 0 && win != true)
        {
            if(currentplayer === "x")
            {
                bttn.style.backgroundImage="chainsaws.jpg"; 
                square = 1; 
                currentplayer = "o"; 
            }
            else if(currentplayer === "o")
            {
                bttn.style.backgroundImage="log.jpg"; 
                square = 2; 
                currentplayer = "x"; 
            }
            else
            {
                return 1; 
            }
        } 
        return 0; 
            
        
    }
    
    document.getElementById("b1").addEventListener("Click",change("b1", s1));
    document.getElementById("b2").addEventListener("Click",change("b2", s2)); 
    document.getElementById("b3").addEventListener("Click",change("b3", s3)); 
    document.getElementById("b4").addEventListener("Click",change("b4", s4)); 
    document.getElementById("b5").addEventListener("Click",change("b5", s5)); 
    document.getElementById("b6").addEventListener("Click",change("b6", s6)); 
    document.getElementById("b7").addEventListener("Click",change("b7", s7)); 
    document.getElementById("b8").addEventListener("Click",change("b8", s8)); 
    document.getElementById("b9").addEventListener("Click",change("b9", s9)); 
    
}
})


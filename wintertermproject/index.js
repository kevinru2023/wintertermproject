let win  = false; 
let currentplayer = "x"
let s1 = 0, s2 = 0, s3 = 0, s4 = 0, s5 = 0, s6 =0 , s7 = 0, s8 = 0, s9 = 0; 
//these are variables containing the informatin needed for the squares 
//so if s = 0 then no player has clicked it, if s = 1 player X has clicked it, if s = 2 then player O has clicked it

function change(button, square)
{
    if(square == 0)
    {
        
    }
    document.getElementById(button).src=""; 
    //this is just changing the image whenever the button is called 
}



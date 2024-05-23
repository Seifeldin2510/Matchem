var score = 0;
var moves = 0;
var counter =0;
var check = true;
card1=null;
card2=null;
Pirate = ["assets\\pirate\\1.png",'assets\\pirate\\1.png','assets\\pirate\\2.png','assets\\pirate\\2.png','assets\\pirate\\3.png','assets\\pirate\\3.png'
    ,'assets\\pirate\\4.png','assets\\pirate\\4.png','assets\\pirate\\5.png','assets\\pirate\\5.png','assets\\pirate\\6.png','assets\\pirate\\6.png'
    ,'assets\\pirate\\7.png','assets\\pirate\\7.png','assets\\pirate\\8.png','assets\\pirate\\8.png'
];

aliens = ["assets\\aliens\\1.png",'assets\\aliens\\1.png','assets\\aliens\\2.png','assets\\aliens\\2.png','assets\\aliens\\3.png','assets\\aliens\\3.png'
    ,'assets\\aliens\\4.png','assets\\aliens\\4.png','assets\\aliens\\5.png','assets\\aliens\\5.png','assets\\aliens\\6.png','assets\\aliens\\6.png'
    ,'assets\\aliens\\7.png','assets\\aliens\\7.png','assets\\aliens\\8.png','assets\\aliens\\8.png'
];

monsters = ["assets\\monsters\\1.png",'assets\\monsters\\1.png','assets\\monsters\\2.png','assets\\monsters\\2.png','assets\\monsters\\3.png','assets\\monsters\\3.png'
,'assets\\monsters\\4.png','assets\\monsters\\4.png','assets\\monsters\\5.png','assets\\monsters\\5.png','assets\\monsters\\6.png','assets\\monsters\\6.png'
,'assets\\monsters\\7.png','assets\\monsters\\7.png','assets\\monsters\\8.png','assets\\monsters\\8.png'
];


function startgame()
{
    var button = document.getElementById("button");
    var board_game = document.getElementById("GameBoard");
    var allCards = document.getElementsByClassName('card');
    if(button.className === "reset")
        {
            check = false;
            document.getElementById("Lose").style.visibility = 'visible';
            board_game.style.visibility = "hidden";
            for (var i = 0; i < allCards.length; i++) {
                allCards[i].style.transform = 'rotateY(0deg)'; 
                allCards[i].style.visibility = 'hidden';
            }
            setTimeout("lost()",4000);
        }
    if(check)
    {
        board_game.style.visibility = "visible";
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].style.transform = 'rotateY(0deg)'; 
            allCards[i].style.visibility = 'visible';
        }
    }
    button.textContent = "restart Game";
    button.setAttribute('class','reset');
    if(document.getElementById("options").value === "Pirates")
        {
            imgGiven = [...Pirate];
        }
        else if (document.getElementById("options").value === "Aliens")
        {
            imgGiven = [...aliens];
        }
        else if (document.getElementById("options").value === "Monsters")
            {
                imgGiven = [...monsters];
            }
    document.getElementById("Win").style.visibility = 'hidden';


    for (var i = 0; i < allCards.length; i++) {
        random = Math.floor(Math.random()*imgGiven.length);
        allCards[i].getElementsByClassName('back')[0].innerHTML= `<img src = ${imgGiven[random]} />`;
        imgGiven.splice(random,1);
    }
    card1=null;
    card2=null;
    score = 0;
    moves = 0;
    var scores = document.getElementById("Score");
    scores.textContent = `Score: ${score}`;
    var Move = document.getElementById("Moves");
    Move.textContent = `Moves: ${moves}/50`;
    counter =0;
}

function flipCard(id)
{
    if(card1==null)
        {
            card1clicked = document.getElementById(id);
            card1clicked.style.transform = 'rotateY(180deg)'; 
            card1 = card1clicked;
            moves ++;
            var Move = document.getElementById("Moves");
            Move.textContent = `Moves: ${moves}/50`;
            
        }
    else if((card2==null) && (id != card1.id))
        {
            card2clicked = document.getElementById(id);
            card2clicked.style.transform = 'rotateY(180deg)'; 
            card2 = card2clicked;
            moves ++;
            var Move = document.getElementById("Moves");
            Move.textContent = `Moves: ${moves}/50`;
            if(card2.getElementsByClassName("back")[0].firstChild.src == card1.getElementsByClassName("back")[0].firstChild.src)
                {
                    score +=5; 
                    var scores = document.getElementById("Score");
                    scores.textContent = `Score: ${score}`;
                    setTimeout("disapper()",1000);
                    counter++;

                }
            else
            {
                score -=2; 
                var scores = document.getElementById("Score");
                scores.textContent = `Score: ${score}`;
                setTimeout("flipBack()",1000);
            }
        }

        if(counter === 8)
            {
                var button = document.getElementById("button");
                button.setAttribute('class','start');
                document.getElementById("Win").style.visibility = 'visible';
                check = true;
            }
        if(moves === 50)
            {
                startgame();
            }
        if(moves === 40)
            {
                window.alert("Ten moves left");
            }
        
}

function flipBack()
{
    card1.style.transform = 'rotateY(0deg)';
    card2.style.transform = 'rotateY(0deg)'; 
    card1 = null;
    card2 = null;
}

function disapper()
{
    card1.style.visibility = 'hidden';
    card2.style.visibility = 'hidden'; 
    card1 = null;
    card2 = null;
}


function lost()
{
    var allCards = document.getElementsByClassName('card');
    var board_game = document.getElementById("GameBoard");
    document.getElementById("Lose").style.visibility = 'hidden';
    for (var i = 0; i < allCards.length; i++) {
        allCards[i].style.transform = 'rotateY(0deg)'; 
        allCards[i].style.visibility = 'visible';
    }
    board_game.style.visibility = "visible";
}
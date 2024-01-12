

document.addEventListener("DOMContentLoaded", function() {
    ProcessorRestart();
});


const HumanTag = "human";
const BotTag = "bot";

var WhoMove;

function swapWhoMove() {
    if (WhoMove === CrossTag) { WhoMove = CirclTag; return true; }
    if (WhoMove === CirclTag) { WhoMove = CrossTag; return true; }
    return false;
}

var BoxCanGo;

var PlaygroundState;

var Cross;
var Circl;


const WinComb = [[0, 4, 8], [2, 4, 6],
                             [0, 1, 2], [3, 4, 5],
                             [6, 7, 8], [0, 3, 6],
                             [1, 4, 7], [2, 5, 8]];

function trySet(indexes, who) {
    let CanGo = false;
    for (let i = 0; i < BoxCanGo.length; ++i) if (BoxCanGo[i] === indexes[0]) {
        CanGo = true;
        break;
    }
    if (!CanGo) return false;

    if (WhoMove !== who) return false;
    if (PlaygroundState[indexes[0]][indexes[1]] !== SpaceTag) return false;


    
    
    PlaygroundState[indexes[0]][indexes[1]] = who;
    
    let localWin = false;
    
    for (let i = 0; i < WinComb.length; ++i) {
        if (PlaygroundState[indexes[0]][WinComb[i][0]] !== SpaceTag && PlaygroundState[indexes[0]][WinComb[i][0]] === PlaygroundState[indexes[0]][WinComb[i][1]] && PlaygroundState[indexes[0]][WinComb[i][1]] === PlaygroundState[indexes[0]][WinComb[i][2]])
        {
            localWin = true;
            PlaygroundState[indexes[0]] = who;
            display([indexes[0]], who);
            break;
        }
    }
    
    
    if (!localWin) {
        display(indexes, who);
    }


    if (typeof (PlaygroundState[indexes[1]]) === "string") {
        BoxCanGo = [];
        for (let i = 0; i < PlaygroundState.length; ++i) {
            if (typeof (PlaygroundState[i]) !== "string")
                BoxCanGo.push(i);
        }
    }
    else BoxCanGo = [indexes[1]];

    return true;
}


function ProcessorRestart() {
    
    Cross = undefined;
    Circl = undefined;

    PlaygroundState = 
    [
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag],
        [SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag, SpaceTag]
    ];

    BoxCanGo = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    WhoMove = CrossTag;


    // copy template into playground
    document.getElementById("playground").innerHTML = document.getElementById("playground-template").innerHTML;

    let cross = document.getElementById("player1").value;
    let circl = document.getElementById("player2").value;

    if (cross === HumanTag)
        Cross = new Object(Human);

    if (circl === HumanTag)
        Circl = new Object(Human);
    
    Cross.Init();
    Circl.Init();

    console.log(Cross, Circl);

    
    Cross.addEventMoveListener((indexes) => {
        if (!trySet(indexes, CrossTag)) Cross.prepareMove(PlaygroundState, WhoMove);
        else { WhoMove = CirclTag; Circl.prepareMove(PlaygroundState, WhoMove); }
    });

    Circl.addEventMoveListener((indexes) => {
        if (!trySet(indexes, CirclTag)) Circl.prepareMove(PlaygroundState, WhoMove);
        else { WhoMove = CrossTag; Cross.prepareMove(PlaygroundState, WhoMove); }
    });

    Cross.prepareMove(PlaygroundState, WhoMove);
    
    DisplayManagerRestart();
}
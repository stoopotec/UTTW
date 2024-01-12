

const GenerateLegalMoves = (playgroundState, boxCanGo, whoMove) => {
    let legalMoves = [];
    for (let i = 0; i < boxCanGo.length; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (playgroundState[boxCanGo[i]][j] === SpaceTag)
                legalMoves.push([boxCanGo[i], j]);
        }
    }
    return legalMoves;
};



function set(indexes, who, playgroundState, boxCanGo) {


    let CanGo = false;
    for (let i = 0; i < boxCanGo.length; ++i) if (boxCanGo[i] === indexes[0]) {
        CanGo = true;
        break;
    }
    if (!CanGo) return false;

    if (WhoMove !== who) return false;
    if (playgroundState[indexes[0]][indexes[1]] !== SpaceTag) return false;


    
    
    playgroundState[indexes[0]][indexes[1]] = who;
    
    let localWin = false;
    
    for (let i = 0; i < WinComb.length; ++i) {
        if (playgroundState[indexes[0]][WinComb[i][0]] !== SpaceTag && playgroundState[indexes[0]][WinComb[i][0]] === playgroundState[indexes[0]][WinComb[i][1]] && playgroundState[indexes[0]][WinComb[i][1]] === playgroundState[indexes[0]][WinComb[i][2]])
        {
            localWin = true;
            playgroundState[indexes[0]] = who;
            break;
        }
    }



    let draw = true;
    for (let i = 0; i < playgroundState[indexes[0]].length; ++i)
        if (playgroundState[indexes[0]][i] === SpaceTag) { draw = false; break; }
    
    if (draw && !localWin) {
        playgroundState[indexes[0]] = SpaceTag;
    }
    
    
    if (typeof (playgroundState[indexes[1]]) === "string") {
        boxCanGo = [];
        for (let i = 0; i < playgroundState.length; ++i) {
            if (typeof (playgroundState[i]) !== "string")
            boxCanGo.push(i);
        }
    }
    else boxCanGo = [indexes[1]];


    return true;
}



function swapPlayer(player) {
    if (player === CrossTag) return CirclTag;
    if (player === CirclTag) return CrossTag;
    console.log("Игроки не поменялись");
    return player;
}


function dummy_eval(playgroundState, boxCanGo, whoMove) {
    let eval = 0;
    for (let i = 0; i < playgroundState.length; ++i) {
        let me = 0;
        let him = 0;
        if (typeof (playgroundState[i]) === "string") {
                 if (playgroundState[i] === SpaceTag) eval -= 10;
            else if (playgroundState[i] === whoMove)  eval += 9*9*1.25;
            else                                      eval -= 9*9*1.25;
        }
        else for (let j = 0; j < playgroundState[i].length; ++j) {
                 if (playgroundState[i] === SpaceTag) { }
            else if (playgroundState[i] === whoMove)  me  += 1;
            else                                      him += 1;
        }
        eval += me * me;
        eval -= him * him;
    }
    eval += boxCanGo.length * 3;

    return eval;
}


let branches = 0;

function evaluate(playgroundState, boxCanGo, whoMove, depth) {
    if (--depth <= 0) return dummy_eval(playgroundState, boxCanGo, whoMove);

    ++branches;

    let legal = GenerateLegalMoves(playgroundState, boxCanGo, whoMove)


    let bestIndex = 0;
    let maxEval = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < legal.length; ++i) {
        let newPlS = JSON.parse(JSON.stringify(playgroundState));
        let newBox = JSON.parse(JSON.stringify(boxCanGo));
        set(legal[i], whoMove, newPlS, newBox);
        let e = -evaluate(newPlS, boxCanGo, swapPlayer(whoMove), depth);
        if (e > maxEval) {
            maxEval = e;
            bestIndex = i;
        }
    }
    return maxEval;
    
}













const Bot = {

    Init() {
        
    },

    waitForMove: false,

    prepareMove(playgroundState, boxCanGo, whoMove) {
        this.waitForMove = true;




        let legal = GenerateLegalMoves(playgroundState, boxCanGo, whoMove)


        branches = 0;

        let bestIndex = 0;
        let maxEval = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < legal.length; ++i) {
            let newPlS = JSON.parse(JSON.stringify(playgroundState));
            let newBox = JSON.parse(JSON.stringify(boxCanGo));
            set(legal[i], whoMove, newPlS, newBox);
            let e = -evaluate(newPlS, boxCanGo, swapPlayer(whoMove), 4);
            if (e > maxEval) {
                maxEval = e;
                bestIndex = i;
            }
        }


        console.log("total branches:", branches, "eval:", maxEval, "dummy:", dummy_eval(playgroundState, boxCanGo, whoMove));

        for (let i = 0; i < this.moveListeners.length; ++i)
            this.moveListeners[i](legal[bestIndex]);
    },

    moveListeners: [],
    addEventMoveListener(callback) {
        this.moveListeners.push(callback);
    }
}
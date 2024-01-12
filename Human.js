

const Human = {

    who: "aboba",

    Init() {
        addEventClickListener((indexes) => {
            if (!this.waitForMove) return false;
            console.log(who, indexes);
            this.waitForMove = false;
            for (let i = 0; i < this.moveListeners.length; ++i)
                this.moveListeners[i](indexes);
            return true;
        });
    },
    
    waitForMove: false,
    
    prepareMove(playgroundState, boxCanGo, whoMove) {
        this.waitForMove = true; who = whoMove;
    },

    moveListeners: [],
    addEventMoveListener(callback) {
        this.moveListeners.push(callback);
    }
}



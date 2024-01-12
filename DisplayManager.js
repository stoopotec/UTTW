
// clickHandler(indexes)
var clickListeners = [];

const addEventClickListener = (callback) => {
    clickListeners.push(callback);
}   


var playground;

const DisplayManagerRestart = () => {
    clickListeners = [];

    playground = document.getElementById("playground").children[0];
    // some code

    for (let i = 0; i < playground.children.length; ++i)
        for (let j = 0; j < playground.children[i].children.length; ++j) {
            playground.children[i].children[j].addEventListener("click", () => {
                for (let k = 0; k < clickListeners.length; ++k)
                    if (clickListeners[k]([i, j])) break;
            });
        }
}


const SpaceTag = "space";
const CrossTag = "cross";
const CirclTag = "circl";

const display = (indexes, who) => {
    console.log("try to display", who, indexes);
    let box = playground.children[indexes[0]];

    if (indexes.length >= 2)
        box = box.children[indexes[1]];

    box.classList.remove(SpaceTag);
    box.classList.remove(CrossTag);
    box.classList.remove(CirclTag);

    //box.classList.remove("box");
    // while (box.firstChild)
    //     box.removeChild(box.firstChild);

    box.classList.add(who);

    for (let i = 0; i < box.children.length; ++i) {
        box.children[i].classList.remove(SpaceTag);
        box.children[i].classList.remove(CrossTag);
        box.children[i].classList.remove(CirclTag);

        box.children[i].classList.add(who);
    }
}

const displayEmergency = (text) => {
    while (playground.firstChild)
        playground.removeChild(playground.firstChild);
    playground.innerHTML = text;
}

const setTip = (boxes) => {
    for (let i = 0; i < playground.children.length; ++i) {
        playground.children[i].classList.remove("tip");
    }
    for (let k = 0; k < boxes.length; ++k)
        playground.children[boxes[k]].classList.add("tip");
}
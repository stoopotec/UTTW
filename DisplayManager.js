
// clickHandler(indexes)
var clickListeners = [];

const addEventClickListener = (callback) => {
    clickListeners.push(callback);
}   


var playground;

const DisplayManagerRestart = () => {
    playground = document.getElementById("playground").children[0];
    // some code

    for (let i = 0; i < playground.children.length; ++i)
        for (let j = 0; j < playground.children[i].children.length; ++j) {
            playground.children[i].children[j].addEventListener("click", () => {
                for (let k = 0; k < clickListeners.length; ++k)
                    if (clickListeners[k]([i, j])) break;;
            });
        }
}


const SpaceTag = "space";
const CrossTag = "cross";
const CirclTag = "circl";

const display = (indexes, who) => {
    let box = playground.children[indexes[0]];

    if (indexes.length >= 2)
        box = box.children[indexes[1]];

    box.classList.remove(SpaceTag);
    box.classList.remove(CrossTag);
    box.classList.remove(CirclTag);

    box.classList.remove("box");
    while (box.firstChild)
        box.removeChild(box.firstChild);

    box.classList.add(who);
}
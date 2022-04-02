var divs = ["#rec0", "#rec1", "#rec2", "#rec3", "#rec4", "#rec5", "#rec6", "#rec7", "#rec8", "#rec9"];
var colours = [];
var hexNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
var randomColourPressed = false;
var setColourPressed = false;

function moveRec(pos, recNum) {
    var rec = document.getElementById("#rec" + recNum.toString());
    var left = parseInt(rec.style.left);
    rec.style.left = pos.toString() + "px";
}

function getHeight(rec){
    return parseInt(document.getElementById(rec).style.height);
}

function moveRecL() {
    var rec = document.getElementById("#rec");
    var left = parseInt(rec.style.left);
    left = left - 100;
    rec.innerHTML = left;
    rec.style.left = left.toString() + "px";
}

function setRec(pos, rec, length) {
    var rec = document.getElementById(rec);
   
    rec.style.top = (600 - length).toString() + "px";
    rec.style.height = length.toString() + "px";
    rec.style.left = pos.toString() + "px";
}

function setPos(pos, rec){
    var rec = document.getElementById(rec);   
    rec.style.left = pos.toString() + "px";
}
function initialize(){
    setColourPressed = false;
    randomColourPressed = false;
    var box = document.getElementById(divs[0]);
    for (var i = 0; i < 10; i++){
        box = document.getElementById(divs[i]);
        setRec(450+(i * 100), divs[i], Math.floor(Math.random() * 500) + 10) ;
    }
}


function sort(rec1, rec2, count){
    var swapped = false;
    var recc = rec1;
    var recv = rec2;
    var counts = count;
    for(var i = 0; i < 10; i++){
        if (i == rec1){
            setGreen(divs[rec1]);
        } else if (i == rec2){
            setRed(divs[rec2]);
        } else {
            if(setColourPressed){
                resetColour(divs[i], document.getElementById("#colorInput").value);
            } else if (randomColourPressed) {
                resetColour(divs[i], colours[i]);
            } else {
                resetColour(divs[i], "blue");
            }
        }
    }
    if(getHeight(divs[rec1]) > getHeight(divs[rec2])){
        move(rec1, rec2);
        update();
        swapped = true;
    }

    if (swapped == true){
        counts = 0;
    }
    if(swapped == false){
        counts = counts + 1;
    }
    if(swapped == true || counts < 9){
        recc = rec1 + 1;
        recv = rec2 + 1;
        if (rec1 == 8){
            counts = 0;
            recc = 0;
            recv = 1;
        }
        setTimeout(function(){sort(recc, recv, counts); }, 500); //setTimeout is used to slow it down so you can actually see what is happening
    }
}


function move(rec1, rec2){
    var holder = divs[rec1];
    divs[rec1] = divs[rec2];
    divs[rec2] = holder;
}

function update() {
    for(var i = 0; i < 10; i++){
        setPos(450+(i*100), divs[i]);
    }
}

function setColour(){
    setColourPressed = true;
    randomColourPressed = false;
    var textBox = document.getElementById("#colorInput").value;

    for (var i = 0; i < 10; i++){
        document.getElementById(divs[i]).style.backgroundColor = textBox;
    }
}

function setGreen(rec){
    document.getElementById(rec).style.backgroundColor = "green";
}

function setRed(rec){
    document.getElementById(rec).style.backgroundColor = "red";
}

function resetColour(rec, colour) {
    document.getElementById(rec).style.backgroundColor = colour;
}
function randomizeColour(){
    colours = [];
    randomColourPressed = true;
    setColourPressed = false;
    var randCol = "#";
    for (var i = 0; i < 10; i++){
            randCol = "#";
            for(var j = 0; j < 6; j++){
                randCol = randCol + hexNums[Math.floor(Math.random()*16)].toString();
            }
        colours.push(randCol);
        document.getElementById(divs[i]).style.backgroundColor = randCol;
    }
}
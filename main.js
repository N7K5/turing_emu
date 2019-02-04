 

function createCanvas(cv) {
    cv = document.createElement('canvas');
    cv.id= "canvas";
    cv.width= window.innerWidth-20;
    cv.height= window.innerHeight-20;
    document.body.appendChild(cv);
    return cv;
}

window.addEventListener("load", () => {
    let a= createCanvas();
}, false);

let ip_submit= document.getElementById("ip_submit");
let ip_title= document.getElementById("ip_title");
let ip_inputs= document.getElementById("ip_inputs");

// let t= new turing("p,q,r", "a,b,c", "p", "r");
// t.setGrammar("p", "a", "p", "b", "R");
// t.setGrammar("p", "BLANK", "p", "c", "R");

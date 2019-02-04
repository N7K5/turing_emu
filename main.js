 

function createCanvas(cv) {
    cv = document.createElement('canvas');
    cv.id= "canvas";
    cv.width= window.innerWidth-20;
    cv.height= window.innerHeight-20;
    document.body.appendChild(cv);
    return cv;
}

let init_operations= ["Enter all states", "Enter input symbol set", "Enter initial state", 
                    "Enter final state set"];
let init_inputs= [];
let TM, TM_Set_done= false, STR_Set_done= false;

window.addEventListener("load", () => {
    let a= createCanvas();
    main();
}, false);

let ip_submit= document.getElementById("ip_submit");
let ip_title= document.getElementById("ip_title");
let ip_inputs= document.getElementById("ip_inputs");
let ip_1= document.getElementById("ip_1");
let ip_set_str= document.getElementById("ip_set_str");

// let t= new Turing("p,q,r", "a,b,c", "p", "r");
// t.setGrammar("p", "a", "p", "b", "R");
// t.setGrammar("p", "BLANK", "p", "c", "R");

function init() {

    if(TM_Set_done) {

        console.log("tm_set_done");

        let grammar_str= ip_1.value;
        let tmp_str= grammar_str.split("=>");
        let current= tmp_str[0].split("/");
        let next= tmp_str[1].split("/");
        for(let i=0; i<2; i++) {
            current[i]= current[i].trim();
            next[i]= next[i].trim();
        }
        next[2]= next[2].trim();

        if(!current[0] || !current[1] || !next[0] || !next[1] || !next[2]) {
            showError("Wrong Grammer");
        }

        console.log(current, "\n\n", next);
        TM.setGrammar(current[0], current[1], next[0], next[1], next[2]);
        ip_set_str.style.display= "block";


        return;
    }
    
    if(init_inputs.length<4) {

        console.log("init if",init_inputs.length );

        ip_title.innerHTML= init_operations[init_inputs.length+1] || "Enter Grammar<br />in q/r=>qn/W/M";
        init_inputs.push(ip_1.value);
        ip_1.value= "";
    }
    if(init_inputs.length==4) {

        console.log(init_inputs.length, "asas");

        ip_submit.innerText=" Set ";
        console.log("set TM");
        try {
            TM= new Turing(init_inputs[0], init_inputs[1], init_inputs[2], init_inputs[3]);
            TM_Set_done= true;
        }
        catch (e){
            ip_title.innerText= "Something went wrong... <br/>view console or relode...";
            console.log(e);
            ip_title.style.color="red";
        }
        
    }
}

function showError(str) {
    ip_title.innerText= "Something went wrong... <br/>view console or relode...";
    console.log(str);
    ip_title.style.color="red";
}


function main() {

    ip_submit= document.getElementById("ip_submit");
    ip_title= document.getElementById("ip_title");
    ip_inputs= document.getElementById("ip_inputs");
    ip_1= document.getElementById("ip_1");
    ip_set_str= document.getElementById("ip_set_str");

    ip_submit.addEventListener("click", init, false);
    ip_title.innerText= init_operations[0];



    ip_set_str.addEventListener("click", () => {
        TM.setString(ip_1.value);
        ip_set_str.style.display= "none";
        ip_submit.innerText= "Start";
        ip_submit.removeEventListener("click", init);
        ip_submit.addEventListener("click", start_tm, false);
    }, false);
}




function start_tm() {
    console.log(TM.move());
}

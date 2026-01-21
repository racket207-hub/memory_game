const GAME_CONFIG = {
    difficulties: {
        facile: { rows: 4, cols: 4 },
        medio: { rows: 4, cols: 6 },
        difficile: { rows: 5, cols: 8 }
    }
};

const settings = {
    state: null,
    difficulty: null,
    theme: "dark"
};

if (!localStorage.getItem("settings")) {
    localStorage.setItem("settings", JSON.stringify(settings));
}


function setSettings(usrSettings){
    localStorage.setItem("settings", JSON.stringify(usrSettings));
}

const storedSettings = localStorage.getItem("settings");

function getSettings() {
    if(storedSettings){
        const userSettings = JSON.parse(storedSettings);
        return userSettings;
    }else{
        console.log("Dati non trovati");
    }
    return null;
}

let solitaria_btn = document.getElementById("solitaria");
let oneVone_btn = document.getElementById("1v1");
let hidden_section1 = document.getElementById("hidden_section1");
let gameState = "menu";
let gameMode = null;
let usrSettings = getSettings();
let difficulty_buttons = document.getElementById("difficulty_buttons");
let stopwatch = document.getElementById("stopwatch");
let startBtn = document.getElementById("start_button");
let timeoutId = null;
let ms = 0;
let sec = 0;
let min = 0;

difficulty_buttons.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
    return;
    }
    btn = event.target.id
    switch (btn){
        case "facile":
            usrSettings.difficulty = "facile";
            break;
        case "medio":
            usrSettings.difficulty = "medio";
            break;
        case "difficile":
            usrSettings.difficulty = "difficile";
            break;
    }
    setSettings(usrSettings);
    controlloInput();
});


solitaria_btn.addEventListener("click", () => {
    if(hidden_section1.style.display === "none" || hidden_section1.style.display === ""){
        hidden_section1.style.display = "block";
        gameState = "solitaria";
    }else{
        hidden_section1.style.display = "none";
        gameState = "menu";
    }
    usrSettings.state = gameState;
    setSettings(usrSettings);
});

oneVone_btn.addEventListener("click", () => {
    if(hidden_section1.style.display === "none" || hidden_section1.style.display === ""){
        hidden_section1.style.display = "block";
        gameState = "1v1";
    }else{
        hidden_section1.style.display = "none";
        gameState = "menu"
    }
    usrSettings.state = gameState;
    setSettings(usrSettings);
})

function setState(state){
    hideAll();
    document.getElementById(state).style.display = "block";
    localStorage.setItem("state", state);
}

function controlloInput(){
    if(usrSettings.state === "solitaria" && usrSettings.difficulty != null){
        document.getElementById("menu").style.display = "none";
        document.getElementById("m_solitaria").style.display = "block";
        startGame();
    }
}

function startGame(){
    document.getElementById("start_button").addEventListener("click", () => {
        const config = GAME_CONFIG.difficulties[usrSettings.difficulty];
        document.getElementById("start_button").style.display = "none";
        document.getElementById("display_solitaria").style.display = "block";
        startTimer(true);
        createTable(config.rows, config.cols, config);
    });


}

function startTimer(flag) {
    if (flag) {
        startBtn.disabled = true;
    }
 
    timeoutId = setTimeout(function() {
        ms = parseInt(ms);
        sec = parseInt(sec);
        min = parseInt(min);
 
        ms++;
 
        if (ms == 100) {
            sec = sec + 1;
            ms = 0;
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (ms < 10) {
            ms = '0' + ms;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
 
        stopwatch.innerHTML = min + ':' + sec + ':' + ms;
 
        // calling start() function recursivly to continue stopwatch
        startTimer();
 
    }, 10); // setTimeout delay time 10 milliseconds
}
 
/* function to pause stopwatch */
function pause() {
    clearTimeout(timeoutId);
    startBtn.disabled = false;
}
 
/* function to reset stopwatch */
function reset() {
    ms = 0;
    sec = 0;
    min = 0;
    clearTimeout(timeoutId);
    stopwatch.innerHTML = '00:00:00';
    startBtn.disabled = false;
}


function createTable(rows, cols) {
    const table = document.getElementById("solitaria_table");
    table.innerHTML = "";

    const carteTotali = rows * cols;
    const numCoppie = carteTotali / 2;
    const cards = generaCoppie(numCoppie);


    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    let index = 0;

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");

        for (let j = 0; j < cols; j++) {
            const td = document.createElement("td");
            td.className = "w-30 h-30 bg-white rounded-lg";

            const div = document.createElement("div");
            div.className = "w-full h-full flex items-center justify-center";

            const front_card = document.createElement("div");
            front_card.className = "w-full h-full rounded-lg";

            const back_card = document.createElement("div");
            back_card.className = "hidden bg-blue-500 w-full h-full rounded-lg";

            setCardImage(front_card, cards[index]);
            index++;

            div.append(front_card, back_card);
            td.appendChild(div);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}


// function createTable(rows, cols, config){
//     let table = document.getElementById("solitaria_table");
//     let k;
//     let numeri = [];
//     table.appendChild(document.createElement("tbody"));
//     for(let i = 0; i < rows; i++){
//         let tr = document.createElement("tr");
//         for(let j = 0; j < cols; j++){
//             let td = document.createElement("td");
//             td.className = "w-30 h-30 bg-white rounded-lg";
//             tr.appendChild(td);
//             let div = td.appendChild(document.createElement("div"));
//             div.className = "w-full h-full flex items-center justify-center text-center";
//             div.id = `cell_${i}_${j}`;
//             let front_card = div.appendChild(document.createElement("div"));
//             let back_card = div.appendChild(document.createElement("div"));
//             front_card.className = "w-full h-full rounded-lg flex items-center justify-center text-center";
//             back_card.className = "hidden bg-blue-500 w-full h-full rounded-lg flex items-center justify-center text-center";
//             generaImg(front_card, k, numeri);
//         }
//         table.querySelector("tbody").appendChild(tr);
//     }
// }


function setCardImage(front_card, k) {
    front_card.style.backgroundImage =
        `url(../../assets/facile/emoji${k}.png)`;
    front_card.style.backgroundSize = "60%";
    front_card.style.backgroundRepeat = "no-repeat";
    front_card.style.backgroundPosition = "center";
}

// function generaImg(front_card, k, numeri){
//     k = Math.floor(Math.random() * 8) + 1;
//     numeri.push(k);
//     switch(usrSettings.difficulty){
//         case "facile":
//             const cards = generaCoppie(8);
//             cards.forEach(card => {
//                 front_card.style.backgroundImage = `url(../../assets/facile/emoji${card}.png)`;
//                 front_card.style.backgroundSize = "60%";
//                 front_card.style.backgroundRepeat = "no-repeat";
//                 front_card.style.backgroundPosition = "center";
//             })
//             // while(numeri.filter(num => num === k).length > 1){
//             //     k = Math.floor(Math.random() * 8) + 1;
//             //     numeri.pop();
//             //     numeri.push(k);
//             //     if(numeri.length >= 8){
//             //         numeri = [];
//             //     }
//             // }
//             // front_card.style.backgroundImage = `url(../../assets/facile/emoji${k}.png)`;
//             // front_card.style.backgroundSize = "60%";
//             // front_card.style.backgroundRepeat = "no-repeat";
//             // front_card.style.backgroundPosition = "center";
//             break;
//         case "medio":
//             break;
//         case "difficile":
//             break;
//     }
// }

function generaCoppie(numCoppie){
    const arr = [];

    for(let i = 1; i <= numCoppie; i++){
        arr.push(i);
        arr.push(i);
    }

    return shuffle(arr);
}

function shuffle(arr) {
  	for (let i = arr.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[arr[i], arr[j]] = [arr[j], arr[i]];
  	}
  	return arr;
}
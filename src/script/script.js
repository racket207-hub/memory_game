const GAME_CONFIG = {
    difficulties: {
        facile: { rows: 2, cols: 4 },
        medio: { rows: 4, cols: 4 },
        difficile: { rows: 4, cols: 6 }
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

// function setDifficulty(difficulty){

// }


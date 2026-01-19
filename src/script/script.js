const GAME_CONFIG = {
    difficulties: {
        easy: { rows: 2, cols: 4 },
        medium: { rows: 4, cols: 4 },
        hard: { rows: 4, cols: 6 }
    }
};

const settings = {
    state: null,
    difficulty: null,
    theme: "dark"
};

localStorage.setItem("settings", JSON.stringify(settings));

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
usrSettings = getSettings();


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

// function setDifficulty(difficulty){

// }


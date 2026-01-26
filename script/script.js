const GAME_CONFIG = {
    difficulties: {
        facile: { rows: 4, cols: 4 },
        // facile: { rows: 2, cols: 3 },
        medio: { rows: 4, cols: 6 },
        difficile: { rows: 5, cols: 8 }
    }
};

const settings = {
    state: null,
    difficulty: null,
    record: null
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
let oneVone_btn = document.getElementById("oneVone");
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
const table = document.getElementById("solitaria_table");

// createRecordTable();



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

// function setState(state){
//     hideAll();
//     document.getElementById(state).style.display = "block";
//     localStorage.setItem("state", state);
// }

function controlloInput(){
    if(usrSettings.state === "solitaria" && usrSettings.difficulty != null){
        document.getElementById("menu").style.display = "none";
        document.getElementById("mode").classList.remove("hidden");
        startGame(false);
    }

    if(usrSettings.state === "1v1" && usrSettings.difficulty != null){
        document.getElementById("menu").style.display = "none";
        document.getElementById("mode").classList.remove("hidden");
        document.getElementById("start_button").classList.add("hidden");
        startGame(false);
    }
}

function startGame(btn){

    const config = GAME_CONFIG.difficulties[usrSettings.difficulty];

    document.getElementById("start_button").addEventListener("click", () => {
        document.getElementById("start_button").style.display = "none";
        document.getElementById("display_solitaria").style.display = "block";
        startTimer(true);
        createTable(config.rows, config.cols, config);
    });

    if(usrSettings.state === "1v1"){
        document.getElementById("oneVone_display").classList.remove("hidden");
        createTable(config.rows, config.cols, config)
    }

    if(btn){
        if(usrSettings.state === "1v1"){
        document.getElementById("oneVone_display").classList.remove("hidden");
        document.getElementById("blue_points").children[0].innerText -= parseInt(document.getElementById("blue_points").children[0].innerText)
        document.getElementById("red_points").children[0].innerText -= parseInt(document.getElementById("red_points").children[0].innerText)
        createTable(config.rows, config.cols, config)
    }else{
        document.getElementById("start_button").style.display = "none";
        document.getElementById("display_solitaria").style.display = "block";
        startTimer(true);
        createTable(config.rows, config.cols, config);
    }

        
    }


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
            div.id = `card_container${index}`;

            const front_card = document.createElement("div");
            front_card.className = "hidden w-full h-full rounded-lg";
            front_card.dataset.cardValue = cards[index];

            const back_card = document.createElement("div");
            back_card.className = "bg-blue-500 w-full h-full rounded-lg";

            setCardImage(front_card, cards[index]);
            index++;

            div.append(front_card, back_card);
            td.appendChild(div);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }


    checkInput(cols, rows);
}


function setCardImage(front_card, k) {
    front_card.style.backgroundImage = `url(./assets/facile/emoji${k}.png)`;
    front_card.style.backgroundSize = "60%";
    front_card.style.backgroundRepeat = "no-repeat";
    front_card.style.backgroundPosition = "center";
}


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

function checkInput(cols, rows){
    for(let i = 0; i < cols * rows; i++){
        const card = document.getElementById(`card_container${i}`);
        card.addEventListener("click", () => {
            flipCard(card, rows, cols);
        })
    }
}

function flipCard(card, rows, cols){
    const front_card = card.children[0];
    const back_card = card.children[1];
    card.style.pointerEvents = "none";

    front_card.classList.remove("hidden", "flipped");
    front_card.classList.add("not-hidden")
    back_card.classList.add("hidden", "flipped");

    checkMatch(rows, cols);
}


function checkMatch(rows, cols){
    if(table.getElementsByClassName("not-hidden").length === 2){
        const flippedCards = table.getElementsByClassName("not-hidden");
        const firstCard = flippedCards[0];
        const secondCard = flippedCards[1];


        if(firstCard.dataset.cardValue === secondCard.dataset.cardValue){
            // Match found
            firstCard.parentElement.style.pointerEvents = "none";
            secondCard.parentElement.style.pointerEvents = "none";

            firstCard.classList.remove("not-hidden");
            secondCard.classList.remove("not-hidden");
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            setTimeout(() => {
                firstCard.parentElement.classList.add("opacity-50");
                secondCard.parentElement.classList.add("opacity-50");

                checkColore(true);
            }, 300)
        }else{
            setTimeout(() => {
                firstCard.classList.add("hidden")
                firstCard.nextSibling.classList.remove("hidden")
                secondCard.classList.add("hidden")
                secondCard.nextSibling.classList.remove("hidden")
                firstCard.classList.remove("not-hidden");
                secondCard.classList.remove("not-hidden");

                if(usrSettings.state === "1v1"){
                    checkColore(false);
                }
            }, 500);
            

            firstCard.parentElement.style.pointerEvents = "auto";
            secondCard.parentElement.style.pointerEvents = "auto";
        }
    }

    if(table.getElementsByClassName("matched").length === rows * cols){
        pause();
        setTimeout(() => {
            if(usrSettings.state === "solitaria"){
                risultato = document.getElementById("result");
                risultato.classList.remove("hidden");
                document.getElementById("testo-risultato").innerText = `Hai completato il gioco\n in ${stopwatch.innerText}`;
                // document.getElementById("span-risultato").innerText = stopwatch.innerText;
                risultato.classList.add("opacity-100");
                usrSettings.record = stopwatch.innerText;
                setSettings(usrSettings);
            }else{
                const punto_blu = document.getElementById("blue_points").children[0].innerText;
                const punto_rosso = document.getElementById("red_points").children[0].innerText;
                risultato = document.getElementById("result");
                risultato.classList.remove("hidden");
                
                if(parseInt(punto_blu) > parseInt(punto_rosso)){
                    document.getElementById("testo-risultato").innerText = `Ha vinto il giocatore Blu\n>con ${parseInt(punto_blu)} punti!`;
                }else if(parseInt(punto_rosso) > parseInt(punto_blu)){
                    document.getElementById("testo-risultato").innerText = `Ha vinto il giocatore Rosso\n con ${punto_rosso} punti!`;
                }else{
                    document.getElementById("testo-risultato").innerText = `Pareggio! I giocatori\n hanno ${punto_blu} punti!`;
                }
                risultato.classList.add("opacity-100");
            }

            const returnBtn = document.getElementById("return_home");
            const restartBtn = document.getElementById("restart");

            
            if(returnBtn) {
                returnBtn.removeEventListener("click", returnHome);
                returnBtn.addEventListener("click", returnHome);
            }
            
            if(restartBtn) {
                
                restartBtn.removeEventListener("click", restartGame);
                restartBtn.addEventListener("click", restartGame);
            }


        }, 500);
    }
}

function returnHome() {
    location.reload();
}

function restartGame() {
    const risultato = document.getElementById("result");
    risultato.classList.add("hidden");
    reset();
    startGame(true);
}


function swapTurno(puntoColore){
    const turnoColore = document.getElementById("turno_colore");

    if(puntoColore){
        turnoColore.classList.remove("text-blue-500");
        turnoColore.classList.add("text-red-500");
        turnoColore.innerText = "rosso";
    }else{
        turnoColore.classList.remove("text-red-500");
        turnoColore.classList.add("text-blue-500");
        turnoColore.innerText = "blu";
    }
}

function checkColore(boolean){
    const punto_blu = document.getElementById("blue_points");
    const punto_rosso = document.getElementById("red_points");

    if(document.getElementById("turno_colore").innerText === "blu"){
        if(boolean){
            punto_blu.children[0].innerText = parseInt(punto_blu.children[0].innerText) + 1;
            // return;
        }else{
            swapTurno(true);
        }
        
    }else{
        if(boolean){
            punto_rosso.children[0].innerText = parseInt(punto_rosso.children[0].innerText) + 1;
            // return;
        }else{
            swapTurno(false);
        }
        
    }

}

function createRecordTable(){
    const table = document.getElementById("tabella-valore")

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for(let i = 0; i < 10; i++){
        const tr = document.createElement("tr");
        
         for (let j = 0; j < 3; j++) {
            const td = document.createElement("td");
            td.className = "w-10 h-20 bg-white";
            td.innerText = "-"

            const div = document.createElement("div");
            div.className = "w-full h-full flex items-center justify-center";

            td.appendChild(div);
            tr.appendChild(td);
         }
    }
}
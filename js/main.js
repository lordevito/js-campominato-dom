`use strict`;

// const grigliaArray = 100;

// //functions

// function titoloOut (){
//     const titolo = document.getElementById(`remov`);
//     titolo.remove();
// }

// function scopriGriglia () {
//     titoloOut();
//     const grigliaTabella = document.createElement(`div`);
//     const tagMain = document.querySelector(`main`);
//     tagMain.append(grigliaTabella);
//     grigliaTabella.classList.add(`table`);   
//     for(let i = 0; i < grigliaArray.lenght - 1; i++){   
//         const celle = document.createElement(`div`); 
//         celle.classList.add(`celle`);
//         grigliaTabella.append(celle);
//         celle.addEventListener(`click`, interazioneBottone);
//         celle.innerHTML =  i;
//         celle.id = i;
//         console.log(grigliaArray.lenght);
//     }
// }

// function interazioneBottone (){
//     celle.classList.add (`.bg-blue`);
//     console.log(grigliaArray[i]);
// }

// //Dichiaro variabile per il pulsante e apro il collegamento al click sul bottone

// const btnPlay = document.querySelector(`button`);
// btnPlay.addEventListener(`click`, (scopriGriglia));

//Primo passo: richiamo dal file index il bottone e ci applico il metodo even listener al click.

// const btnPlay = document.querySelector(`.btn`);
// btnPlay.addEventListener(`click`, play);

// let valInput = document.querySelector('select').value;
// console.log(valInput);

// function setCellNumber (level){
// let totaleCelle;
// switch (level) {
//     case 2:
//         totaleCelle = 81;
//         break;
//     case 3:
//         totaleCelle = 49;
//         break;
//     case 1:
//     default:
//         totaleCelle = 100;
//         break;
// }

// return totaleCelle;
// }



// //Creo una funzione per la cella singola dove creo il l'elemento div e glia ggiungo la classe css.

// function creaCella (){
//     const cella = document.createElement(`div`);
//     cella.classList.add(`celle`);
//     return cella;
// }

// // //function generateBombs(cellNumbers) {
// //     const bombsGenerated = [];
// //     while (bombsGenerated.length < BOMBS_NUMBER) {
// //         const bomb = generateRandomNumber(1, cellNumbers);
// //         if (!bombsGenerated.includes(bomb)) {
// //             bombsGenerated.push(bomb);
// //         }
// //     }
// //     console.log('bombe', bombsGenerated);
// //     return bombsGenerated;
// // }


// //Dichiaro una funzione da usare al click dove rimuovo il titolo iniziale, faccio comparire la griglia.
// //Apro un ciclo dove richiamo la funzione per la creazione della cella, la scrivo nel file index,
// //la appendo alla tabella e infine ci applico il colore blu e le stampo in console ogni volta che si clicca sopra.

// function play() {
//     const titolo = document.getElementById(`remov`);
//     titolo.remove();
//     const grigliaTabella = document.createElement(`div`);
//     grigliaTabella.classList.add(`table`);
//     const tagMain = document.querySelector(`main`);
//     tagMain.append(grigliaTabella);

//     for (let i = 0; i < totaleCelle; i++) {
//         const cella = creaCella();
//         cella.innerText = (i + 1);
//         cella.id = i;
//         grigliaTabella.appendChild(cella);
//         cella.addEventListener(`click`, (function (index) {
//             return function () {
//                 cella.classList.add(`bg-blue`);
//                 console.log(index + 1);
//             }
//         })(i));
//     }
// }
// // cella.addEventListener(`click`, () => cella.classList.add(`bg-blue`));

// //Dichiaro variabile per il collegamento ai vari tag html

const main = document.querySelector('.game-wrapper');
const playBtn = document.querySelector('#play');
const levelSelect = document.querySelector('#level');

// Creo array per i livelli di difficoltà, 
// dichiaro una varibaile con il numero di bombe che ci saranno
// creo array per le bombe
// dichiaro il punteggio

const gridLevels = [100, 81, 49];
const BOMBS_NUMBER = 16;
let bombs = [];
let score = 0;

// Creo l'evento al click grazie alla funzione play

playBtn.addEventListener('click', play);

// Creo funzione play con dentro altre tre funzioni

function play(){
    const cellNumbers = gridLevels[levelSelect.value];
    generatePlayGround(cellNumbers);
    bombs = generateBombs(cellNumbers);
}

// Creo funzione per generare la griglia

function generatePlayGround(cellNumbers){
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for(let i = 1; i <= cellNumbers; i++){
        const cell = generateCell(i, cellNumbers);
        grid.append(cell);
    }
     main.append(grid);

}

// Creo la funzione per generare le celle

function generateCell (cellId, cellNumbers){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add('square' + cellNumbers);
    cell.cellId = cellId;
    cell.innerHTML = ` <span>${cellId}</span>`;
    cell.addEventListener('click', handleClickCell);
    return cell;
}

// Creo la funzione per generare le bombe

function generateBombs(cellNumbers){
    const bombsGenerated = [];
    while(bombsGenerated.length<BOMBS_NUMBER){
        const bomb = generateRandomNumber(1, cellNumbers);
        if(!bombsGenerated.includes(bomb)){
            bombsGenerated.push(bomb);
          }
        }
        console.log('bombe', bombsGenerated);
        return bombsGenerated;
      }

      function handleClickCell(){
        console.log(this.cellId);
        if(! bombs.includes(this.cellId)){
            this.classList.add('clicked'); 
            score++;
            const cells = document.getElementsByClassName('cell');
    if(score === cells.length - BOMBS_NUMBER){
      endGame(true);
    }

  } else {
    endGame(false);
    this.classList.add('bombed');
  }
}

// Creo funzione per creare il messaggio con il punteggio

function endGame(isWin){
    let msg;
  
    const cells = document.getElementsByClassName('cell');
    if(isWin){
      msg = `HAI VINTO! Hai cliccato tutte le caselle giuste!`
  
    }else{
      msg = `HAI PERSO! Hai fatto ${score} punti su ${cells.length - BOMBS_NUMBER} possibilità!`
    }
  
    document.querySelector('.endMessage').innerHTML = msg;
  }
  
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random()*(max - min + 1)) + min;
  }
  
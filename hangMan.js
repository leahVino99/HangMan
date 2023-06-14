// const hangMan = document.querySelectorAll(.hangman)

//#region Variables
const btnchooseWord = document.querySelector('.chooseWord');
var shownWord = document.querySelector('.shownWord');
const words = ['Hangman', 'strawberry', 'banana', 'rice'];
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const ShownResponseText= document.querySelector('.ShownResponseText');
const letterButtons= document.querySelector('.letterButtons');
const shapesList= document.querySelectorAll('.shape');
const startOverButton = document.querySelector('.startOver');



//var numOfInputs;


let buttons = [];
alphabet.forEach(el=>{
    const btns = document.createElement('button')
    btns.value = el;
    letterButtons.append(btns)
    btns.style.margin= '10px';
    btns.classList.add(el);
    btns.style.boxShadow= '0.5px 0.5px 3px 0.2px lightpink';
    btns.style.backgroundColor= 'lightBlue'
    btns.style.borderColor = 'white'
    btns.style.fontFamily=  "'Tahoma', Times, serif";
    btns.innerText = el;
    btns.id = el.toLowerCase();
    buttons.push(btns);  
})

//#endregion

for(let i= 0; i<shapesList.length; i++) {
 
shapesList[i].classList.add('hidden')
}

//#region Event Listeners


let NumOfFailedTries = 0;
let randomWord;

let hiddenWord;
let isLetterGood;
let selectedLetter;

function startOvButton(){
    if (shownWord.innerText === randomWord || NumOfFailedTries>=6) {
        startOverButton.classList.remove('hidden');
        console.log('start over');
    } else {
        startOverButton.classList.add('hidden');
    }
}
  
function chooseWord(){
 randomWord  = returnRandomWord();

 
 shownWord.innerHTML = gethiddenWord(randomWord).split('').join(' ');
}

function SplitAndShowHiddenWord(localHiddenWord){
    const LettersArr = localHiddenWord.split('')
   
    let letterElements = [];
    LettersArr.forEach(letter => {
        let newEl=document.createElement('label'); 
        newEl.innerText=letter
        letterElements.push(newEl.innerHTML);
    });

    shownWord.innerText = localHiddenWord;
    startOvButton();
}


/**
 * A function that gets a word and returns the HiddenWord, with only first and last letters shown.
 */
function gethiddenWord(randomWord){

    let firstLetter = randomWord[0];
    let lastLetter = randomWord[randomWord.length-1];
    let numOfHiddenLetters = randomWord.length - 2;
    let localHiddenWord = firstLetter; 
        for (i=1; i<=numOfHiddenLetters; i++){
            if (randomWord[i] !==firstLetter && randomWord[i] !==lastLetter){
                localHiddenWord+="_";
            } else {
                localHiddenWord+=randomWord[i]
            } 
        }   
    localHiddenWord+=lastLetter;
    hiddenWord = localHiddenWord;
    return localHiddenWord;
}


function returnRandomWord(){

    randomIndex = Math.floor(Math.random() * words.length);
    newRandomWord = words[randomIndex];
    return newRandomWord;
}


function onLetterGuessed(e){
    let selectedLetter = e.target.value.toLowerCase();
    let isLetterGood = isLetterInWord(selectedLetter);
    e.target.classList.add('hidden');
     
    if(isLetterGood){
            UpdateShownWord(selectedLetter);
        if (shownWord.innerText === randomWord){
   
            ShownResponseText.innerText= `Good job! You gussed the word!`;
            startOvButton();

        } else {UpdateShownWord(selectedLetter);
               ShownResponseText.innerText= `Good job! You gussed the letter!`;
        }
    } else if(NumOfFailedTries<6){
        console.log("In numofTries <6");
        substractNumOfTries();
        
        ShownResponseText.innerText= `Wrong! Please try again`;

    }
    else if(NumOfFailedTries>=6){
                console.log("In numofTries >=6");

        ShownResponseText.innerText= `Game Over!`;
        //startOverButton.classList.remove('hidden');
        startOvButton();



    }
}

function isLetterInWord(letter){
    return randomWord.includes(letter);
}

//This function finds where the letter is in the word, and updates the shown word accordingly.
function UpdateShownWord(newLetter){
    let arr = hiddenWord.split('');
    var str = randomWord;
    var indices = [];
    for(var i=0; i<str.length;i++) {
        if (str[i] === newLetter) indices.push(i);
    }
    for (let index = 0; index < indices.length; index++) {
       
        arr[indices[index]]=newLetter;
        shownWord.innerText=arr.join('');
        hiddenWord = shownWord.innerHTML
    }
    SplitAndShowHiddenWord(shownWord.innerText)
}

function keyBoardLetters(e){
    let selectedLetter = e.key;
    if (e.type === 'keydown'){
        let isLetterGood = isLetterInWord(selectedLetter);
         
        if(isLetterGood){
                UpdateShownWord(selectedLetter);
            if (shownWord.innerText === randomWord){
    
                ShownResponseText.innerText= `Good job! You gussed the word!`;
                //startOverButton.classList.remove('hidden');
                startOvButton()
                
            } else {UpdateShownWord(selectedLetter);
                   ShownResponseText.innerText= `Good job! You gussed the letter!`;
            }
        } else if(NumOfFailedTries<6){
            console.log("In numofTries <6");
            substractNumOfTries();
            ShownResponseText.innerText= `Wrong! Please try again`;
    
        }
        else if(NumOfFailedTries>=6){
                    console.log("In numofTries >=6");
    
            ShownResponseText.innerText= `Game Over!`;
            startOverButton.classList.remove('hidden');

        }
    }
    
}


function substractNumOfTries(){
   
    shapesList[NumOfFailedTries].classList.remove('hidden');
    
    NumOfFailedTries += 1;
     
}

function startOver() {
    // Reset game variables
    console.log("Start Over button clicked"); // Add this line

   NumOfFailedTries = 0;
   randomWord = '';
   hiddenWord = '';
   shownWord.innerText = '';
   ShownResponseText.innerText = '';
 
   // Reset letter buttons
   buttons.forEach((button) => {
     button.classList.remove('hidden');
   });
 
   // Reset hangman shapes
   shapesList.forEach((shape) => {
     shape.classList.add('hidden');
   });
 
   // Hide the start-over button again
     //startOverButton.classList.add('hidden');

    chooseWord();
  }
    
    // console.log("NumOfTries: " + NumOfFailedTries);


btnchooseWord.addEventListener('click',chooseWord)

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", onLetterGuessed);
}


    window.addEventListener('keydown', keyBoardLetters)

    startOverButton.addEventListener('click', startOver);









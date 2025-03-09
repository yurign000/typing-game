var textarea = document.querySelector("#typing__area");
var placeholder = document.querySelector("#placeholder__area");
var typo_area = document.querySelector("#typo__area");
var wordsGenerated = '';

var duration = 5;
var isTyping = false;
var wordsQuantity = 10;

var invalidKeysPressed = {
    'Control': false,
    'Tab': false,
}
document.addEventListener('keydown', ({key}) => invalidKeysPressed[key] = true)
document.addEventListener('keyup', ({key}) => invalidKeysPressed[key] = false)

window.addEventListener('load', async () => {
    wordsGenerated = (await generateRandomWords(wordsQuantity)).join().replace(/,/g, ' ');
    placeholder.innerHTML = wordsGenerated;
})

function sameTextAreaCheck(key){
    let isSame = placeholder.innerHTML.startsWith(textarea.value);

    if(!isTyping){
        isTyping = true;
        startTimer();
    }

    return inputOnTypoArea(isSame, key); 
}

function blockSpecialKeys(event){
    if(invalidKeysPressed['Tab'] && event.key == 'Enter'){
        event.preventDefault()
        window.location.reload()
    }
    else if(
        invalidKeysPressed['Control'] && event.key == 'Backspace' ||
        ['Enter','Tab','Alt'].includes(event.key)
    ){
        event.preventDefault()
    }
}

async function generateRandomWords(quantity){
    let random_words = [];

    await fetch(`https://random-word-api.vercel.app/api?words=${quantity}`).then(async data => {
        let words = await data.json();
    
        random_words = words;
    })

    return random_words;
}

function inputOnTypoArea(isSame, key){
    let letter = document.createElement('span');

    if(key.inputType == 'deleteContentBackward')
        typo_area.lastChild.remove();
    else{
        letter.innerHTML = key.data;

        if(isSame){
            letter.style.backgroundColor = "transparent";
            letter.style.color = "transparent";
            letter.style.outline = "none";
        } 
            
        typo_area.append(letter);
    }
}

function startTimer(){
    let interval = setInterval(() => {
        if(duration-- <= 1){ 
            clearInterval(interval);
        }
    }, 1000);
}
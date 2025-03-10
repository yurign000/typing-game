var wordsGenerated = '';
var typingTimer = 5;
var isTyping = false;
var wordsQuantity = 40;

var invalidKeysPressed = {
    'Control': false,
    'Tab': false,
}
document.addEventListener('keydown', ({key}) => invalidKeysPressed[key] = true)
document.addEventListener('keyup', ({key}) => invalidKeysPressed[key] = false)

window.addEventListener('load', async () => {
    // wordsGenerated = (await generateRandomWords(wordsQuantity)).join().replace(/,/g, ' ');
})

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

function startTimer(){
    let interval = setInterval(() => {
        if(typingTimer-- <= 1){ 
            clearInterval(interval);
        }
    }, 1000);
}
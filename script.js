var words_generated = '';
var typing_area = document.getElementById('typing__area');
var typing_timer = 5;
var is_typing = false;
var words_quantity = 40;

var invalid_keys_pressed = {
    'Control': false,
    'Tab': false,
}
document.addEventListener('keydown', ({key}) => invalid_keys_pressed[key] = true)
document.addEventListener('keyup', ({key}) => invalid_keys_pressed[key] = false)

window.addEventListener('load', async () => {
    // wordsGenerated = (await generateRandomWords(wordsQuantity)).join().replace(/,/g, ' ');
})

function blockSpecialKeys(event){
    if(invalid_keys_pressed['Tab'] && event.key == 'Enter'){
        event.preventDefault()
        window.location.reload()
    }
    else if(
        invalid_keys_pressed['Control'] && event.key == 'Backspace' ||
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
        if(typing_timer-- <= 1){ 
            clearInterval(interval);
        }
    }, 1000);
}

//test
let sentence = [
    'abacaxi', 'laranja', 'maça', 'pera', 'tomate', 
    'uva', 'tomada', 'coração','abacaxi', 'laranja', 
    'maça', 'pera', 'tomate', 'uva', 'tomada', 'coração',
    'maça', 'pera', 'tomate', 'uva', 'tomada', 'coração',
    'maça', 'pera', 'tomate', 'uva', 'tomada', 'coração',
    'abacaxi', 'laranja', 'maça', 'pera', 'tomate', 'uva', 'tomada', 
    'coração'
];

makePlaceholder()
function makePlaceholder(){
    let letterCount = 0;

    sentence.forEach((word) => {
        let word_element = document.createElement('label');
        word_element.setAttribute('class','words');
        
        for(let i = 0; i <= word.length; i++, letterCount++){
            let letter_element = document.createElement('span');
            letter_element.setAttribute('class','letters');
            letter_element.setAttribute('id','letter'+letterCount);
            letter_element.innerHTML = word[i] || ' '; 

            word_element.append(letter_element);
        }
        typing_area.append(word_element);
    })
}
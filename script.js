var words_generated = '';
var typing_area = document.getElementById('typing__area');
var typing_timer = 5;
var is_typing = false;
var words_quantity = 40;
var cursor_position = 0;
var is_input_focused = false;
var letter_elements = [];

var invalid_keys_pressed = {
    'Control': false,
    'Tab': false,
}
document.addEventListener('keydown', ({key}) => invalid_keys_pressed[key] = true)
document.addEventListener('keyup', ({key}) => invalid_keys_pressed[key] = false)

window.addEventListener('load', async () => {
    makePlaceholder()
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

async function makePlaceholder(){
    let letterCount = 0;
    let random_words = await generateRandomWords(words_quantity);

    random_words.forEach((word, id) => {
        let word_element = document.createElement('label');
        word_element.setAttribute('class','words');
        word_element.setAttribute('id','word'+id);
        
        for(let i = 0; i <= word.length; i++, letterCount++){
            let letter_element = document.createElement('span');
            letter_element.setAttribute('class','letters');
            letter_element.setAttribute('id','letter'+letterCount);
            letter_element.innerHTML = word[i] || '&ThinSpace;'; 

            word_element.append(letter_element);
            letter_elements.push(letter_element)
        }
        typing_area.append(word_element);
    })
}

document.addEventListener('keydown', typeLetter)
function typeLetter(e){
    let letter = e.key;
    let letter_to_type = letter_elements[cursor_position];

    if(letter == ' '){
        letter = String.fromCharCode(8201);
    }

    if(!is_input_focused && letter_elements.length > 0){
        letter_elements[0].setAttribute('id', 'cursor__position');
        is_input_focused = true;
    }

    else{
        if(letter == 'Backspace' && cursor_position > 0){
            letter_to_type.removeAttribute('id','cursor__position');
            letter_elements[cursor_position-1].style.color = '#aaa';
            letter_elements[cursor_position-1].style.backgroundColor = 'transparent';

            cursor_position--

            letter_elements[cursor_position].setAttribute('id','cursor__position');
        }
        else if(letter != 'Backspace'){
            if(letter == letter_to_type.innerHTML){
                letter_to_type.style.color = '#000'    
            }
            else{
                letter_to_type.style.backgroundColor = '#f00'
                letter_to_type.style.color = '#fff'    
            }

            letter_to_type.removeAttribute('id','cursor__position');
            cursor_position++;
            letter_elements[cursor_position].setAttribute('id','cursor__position');
        }
    }
}
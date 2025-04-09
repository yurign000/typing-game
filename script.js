// var words_generated = '';
var typing_area = document.getElementById('typing__area');
var typing_timer = 0;
var words_quantity = 20;
var cursor_position = 0;
var is_input_focused = false;
var letter_elements = [];
var have_typo = false;
var interval = 0;
var are_all_words_typed = false;
var typo_count = 0;
var wpm = 0;

window.addEventListener('load', async () => {
    makeWordsToType()
})

document.addEventListener('keydown', reset)
function reset(event){
    if(event.key == 'Tab'){
        event.preventDefault()
        window.location.reload()
    }
    let word0 = getComputedStyle(document.querySelector("#word0"))
    console.log(word0.lineHeight)
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
    if(interval == 0){
        interval = setInterval(() => {
            if(!is_input_focused){ 
                clearInterval(interval);
                interval = 0
                endTyping();
            }
            
            typing_timer = Number((typing_timer + 0.1).toFixed(1))
        }, 100);
    }
}
function endTyping(){
    cursor_position = 0;
    is_input_focused = false;
    have_typo = false;
    are_all_words_typed = false;
    letter_elements = []
    while(typing_area.childElementCount){
        typing_area.childNodes[0].remove();
    }
    wpm = Number((words_quantity * (60 / typing_timer)).toFixed(2));
    alert(`WPM: ${wpm} \nMistakes: ${typo_count} \nDuration: ${typing_timer}s`)

    typing_timer = 0;
    makeWordsToType()
}

async function makeWordsToType(){
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

document.addEventListener('keydown', getTypedLetter)
function getTypedLetter(e){
    let letter = e.key;
    let letter_to_type = letter_elements[cursor_position];

    if(are_all_words_typed){

    }
    else{
        if(letter.search(/[a-z\s\-']/gi) != -1 && letter.length == 1 || letter == 'Backspace'){
            if(letter == ' '){
                letter = String.fromCharCode(8201);
            }
            
            typeLetter(letter, letter_to_type);
        }
    }

}

function typeLetter(letter, letter_to_type){
    scrollTypingArea()
    if(!is_input_focused && letter_elements.length > 0){
        letter_elements[0].setAttribute('id', 'cursor__position');
        is_input_focused = true;
    }
    
    if(true){
        if(letter == 'Backspace' && cursor_position > 0 && have_typo){
            backspace(letter_to_type);
        }
    
        else if(letter != 'Backspace' && !have_typo){
            startTimer()
            document.documentElement.style.setProperty('--cursor-animation','infinite letter__cursor linear 0.6s, cursor_animation 0.08s linear')


            if(letter == letter_to_type.innerHTML){
                letter_to_type.style.color = '#333'    
            }

            else{
                letter_to_type.style.backgroundColor = '#0ff'
                letter_to_type.style.color = '#fff' 
                have_typo = true;
                typo_count++;
            }
    
            letter_to_type.removeAttribute('id','cursor__position');
            cursor_position++;
            letter_elements[cursor_position].setAttribute('id','cursor__position');
    
            let line = letter_elements[cursor_position].parentNode.dataset?.line;
    
            if(line){
                let word_height = letter_to_type.parentNode.clientHeight
                console.log(word_height)
                typing_area.scrollTop = word_height * Number(line)
            }

            if(letter_elements.length == cursor_position+1 && !have_typo){
                are_all_words_typed = true;
                is_input_focused = false;
            }
        }
    }
}
function backspace(letter_to_type){
    letter_to_type.removeAttribute('id','cursor__position');
    letter_elements[cursor_position-1].style.color = '#aaa';
    letter_elements[cursor_position-1].style.backgroundColor = 'transparent';

    document.documentElement.style.setProperty('--cursor-animation','infinite letter__cursor linear 0.6s')

    cursor_position--

    letter_elements[cursor_position].setAttribute('id','cursor__position');
    have_typo = false;
}

function scrollTypingArea(){
    let width_sum = 0
    let line_count = -1;

    typing_area.childNodes.forEach(word => {
        let word_width = word.clientWidth;

        width_sum += word_width;


        if(width_sum > typing_area.clientWidth){
            width_sum = word_width;

            word.classList.add("new__line")
            word.dataset.line = ++line_count
        }
    })
}
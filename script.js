var textarea = document.querySelector("#typing__area");
var placeholder = document.querySelector("#placeholder__area");
var typo_area = document.querySelector("#typo__area");
var wordsGenerated = '';
var textareLineHeight = Number(getComputedStyle(textarea).lineHeight.replace('px',''));
let oldTextareaScrollHeight = textarea.scrollHeight;

var duration = 5;
var isTyping = false;
var wordsQuantity = 40;

var invalidKeysPressed = {
    'Control': false,
    'Tab': false,
}
document.addEventListener('keydown', ({key}) => invalidKeysPressed[key] = true)
document.addEventListener('keyup', ({key}) => invalidKeysPressed[key] = false)

window.addEventListener('load', async () => {
    wordsGenerated = (await generateRandomWords(wordsQuantity)).join().replace(/,/g, ' ');
    console.log(wordsGenerated)
    placeholder.innerHTML = wordsGenerated;
})

function sameTextAreaCheck(key){
    let isSame = placeholder.innerHTML.startsWith(textarea.value);

    synchronizeScroll()

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

var isTypo_translated_to_up = false;
function synchronizeScroll(){
    if(textarea.scrollHeight >= oldTextareaScrollHeight){
        // placeholder.scroll(0, (textarea.scrollHeight - textareLineHeight * 2) - 1.4);
        // typo_area.scroll(0, (textarea.scrollHeight - textareLineHeight * 2) - 1.4);
        placeholder.style.transform = `translateY(-${(textarea.scrollHeight - textareLineHeight * 2) - 1.4}px)`
        
        if(textarea.scrollHeight > oldTextareaScrollHeight  && isTypo_translated_to_up == false){
            isTypo_translated_to_up = true;
            typo_area.style.transform = `translateY(-${(textarea.scrollHeight - textareLineHeight * 2) - 1.4}px)`
        }
        oldTextareaScrollHeight = textarea.scrollHeight;
        console.log(textarea.scrollHeight)
    }else{
        // placeholder.scroll(0, (textarea.scrollHeight - textareLineHeight * 2));
        // typo_area.scroll(0, (textarea.scrollHeight - textareLineHeight * 2));
        placeholder.style.transform = `translateY(-${(textarea.scrollHeight - textareLineHeight * 2)}px)`
        console.log(textarea.scrollHeight)
        if(textarea.scrollHeight == 50){
            isTypo_translated_to_up = false;
            typo_area.style.transform = `translateY(0px)`
        }
    }
}
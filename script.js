var textarea = document.querySelector("#typing__area");
var placeholder = document.querySelector("#placeholder__area");
var typo_area = document.querySelector("#typo__area");

function sameTextAreaCheck(key){
    let isSame = placeholder.value.startsWith(textarea.value);
    
    return inputOnTypoArea(isSame, key); 
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
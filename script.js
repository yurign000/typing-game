var textarea = document.querySelector("#typing__area");
var placeholder = document.querySelector("#placeholder__area");
var typo_area = document.querySelector("#typo__area");

function sameTextAreaCheck(){
    return placeholder.value.startsWith(textarea.value);
}

async function generateRandomWords(quantity){
    let random_words = [];

    await fetch(`https://random-word-api.vercel.app/api?words=${quantity}`).then(async data => {
        let words = await data.json();
    
        random_words = words;
    })

    return random_words;
}
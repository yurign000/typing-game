var textarea = document.querySelector("#typing__area");
var placeholder = document.querySelector("#placeholder__area");
var typo_area = document.querySelector("#typo__area");

function sameTextAreaCheck(){
    return placeholder.value.startsWith(textarea.value);
}
let themes = document.querySelectorAll(".theme-choices div")
let link = document.querySelector("link")
// console.log(themes)
themes.forEach(function(choices){
    choices.addEventListener("click",function(choice){
        localStorage.setItem("theme",choice.srcElement.textContent)
        link.href = `th${localStorage.getItem("theme")}me.css`
    })
})

link.href = `th${localStorage.getItem("theme")}me.css`

let progress = document.querySelector(".progress")
function changeProgress(){
    progress.textContent = arraySavedNumbers.join(" ") + " " + screenNumber.textContent
}

let number_keys = document.querySelectorAll(".number")
let operators_keys = document.querySelectorAll(".operator")
let screenNumber = document.querySelector(".result")
let arraySavedNumbers = []
let reset = document.querySelector(".reset")
let equal = document.querySelector(".equal")
let resultMade 

if(screenNumber.style.width > document.querySelector("div:has(.result)")){
    screenNumber.style.cssText = `overflow-x: scroll;`
}

number_keys.forEach(function(key){
    key.addEventListener("click",function(e){
        if(resultMade){
            resultMade = false
            screenNumber.textContent = e.srcElement.textContent
        }
        else {
            screenNumber.textContent = screenNumber.textContent + e.srcElement.textContent
        }
        changeProgress()
    })
})
operators_keys.forEach(function(key){
    key.addEventListener("click",function(e){
        arraySavedNumbers.push(screenNumber.textContent)
        arraySavedNumbers.push(e.srcElement.textContent)
        screenNumber.textContent = ""
        changeProgress()
    })
})
reset.addEventListener("click",function(){
    screenNumber.textContent = ""
    arraySavedNumbers = []
    changeProgress()
})
equal.addEventListener("click",function(){
    let lastSavedNum = arraySavedNumbers[arraySavedNumbers.length - 1]
    if(!/^[+\-*/%]$/.test(lastSavedNum)){
        return
    }
    else {
        arraySavedNumbers.push(screenNumber.textContent)
        try {
            screenNumber.textContent = eval(arraySavedNumbers.join(""))
        }
        catch(error){
            screenNumber.textContent = "Error"
        }
        arraySavedNumbers = []
        resultMade = true
    }
    changeProgress()
})

let deleteButton = document.querySelector(".delete-button")
console.log(deleteButton)


deleteButton.addEventListener("click",function(){
    let lastSavedNum = arraySavedNumbers[arraySavedNumbers.length - 1]
    if(screenNumber.textContent != ""){
        if(!/^[+\-*/%]$/.test(lastSavedNum)){
            screenNumber.textContent = screenNumber.textContent.slice(0,-1)
            arraySavedNumbers.pop()
            arraySavedNumbers.push(screenNumber.textContent)
            arraySavedNumbers = arraySavedNumbers.filter(e => e != "")
        }
        else {
            screenNumber.textContent = screenNumber.textContent.slice(0,-1)
            arraySavedNumbers.push(screenNumber.textContent)
            arraySavedNumbers = arraySavedNumbers.filter(e => e != "")
        }
    }
    else if(screenNumber.textContent == ""){
        if(/^[+\-*/%]$/.test(lastSavedNum)){
            arraySavedNumbers.pop()
        }
        else if(!/^[+\-*/%]$/.test(lastSavedNum)){
            screenNumber.textContent = lastSavedNum
        }
    }
    changeProgress()
})


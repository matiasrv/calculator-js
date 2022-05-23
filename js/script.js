const display = document.querySelector('#display');
const operators = document.getElementById("operators");
const clear = document.getElementById("clear")
const buttonC = document.getElementById("c")
const digits = Array.from(document.querySelectorAll(".number"));
digits.push(document.getElementById('zero'));
const equal = document.getElementById("equal");
equal.disabled = true;
const dot = document.getElementById("dot");
let n1, n2, operator;
n1 = 0;
let divisionError = "CAN'T DIVIDE BY ZERO";

function add(){
    return +n1 + +n2;
}
function substract(){
    return +n1 - +n2;
}
function divide(){
    let result;
    (n2 == 0) ? result = divisionError : result = +n1 / +n2;
    return result;
}
function multiply(){
    return +n1 * +n2;
}
function operate(){
    switch(operator){
        case '+':
            n1 = display.textContent = add(n1,n2).toString();
            break;
        case '-':
            n1 = display.textContent = substract(n1,n2).toString();
            break;
        case '*':
            n1 = display.textContent = multiply(n1,n2).toString();
            break;
        default:
            n1 = display.textContent = divide(n1,n2).toString();
            if(n1 == divisionError){
                n1 = 0;
            }
            break;
    }
    operator = n2 = undefined;
}
digits.forEach(button => {
    //change to one event listener on the parent node
    button.addEventListener("click", ()=>{
        display.textContent == 0 ? display.textContent = button.textContent: display.textContent += button.textContent;
        if(operator == undefined){
            if(n1){
                n1 += button.textContent.toString();
            }
            else{
                n1 = button.textContent.toString();
            }            
        }
        else{
            if(n2){
                n2 += button.textContent.toString();
            }
            else{
                n2 = button.textContent.toString();
                equal.disabled = false;
                operators.childNodes.forEach(button => button.disabled = false);
            }
        }
    });
    
});
clear.addEventListener("click", ()=>{
    n1 = display.textContent = 0;
    n2 = operator = undefined;
    equal.disabled = true;
    operators.childNodes.forEach(button => button.disabled = false);
});
buttonC.addEventListener("click", ()=>{
    if(display.textContent.length > 1 && display.textContent != divisionError){
        display.textContent = display.textContent.slice(0, -1);
    }else{
        display.textContent = '0';
    }
    if(n2 != undefined){
        n2 = n2.slice(0, -1);
        if(n2.length == 0){
            n2 = undefined;
            equal.disabled = true;
        }
    }
    else if(operator != undefined && n2 == undefined){
        operator = undefined;
        operators.childNodes.forEach(button => button.disabled = false);
    }
    else if(n1 != 0){
        n1 = n1.slice(0, -1);
        if(n1.length == 0){
            n1 = 0;
            equal.disabled = true;
        }
    }
});
operators.addEventListener("click", e =>{
    if(e.target.tagName == "BUTTON"){
        if(n2 != undefined){
            operate();
        }
        display.textContent += e.target.textContent;
        operator = e.target.textContent;
        operators.childNodes.forEach(b => b.disabled = true);
    }
});
equal.addEventListener("click", ()=>{
    operate();
    operators.childNodes.forEach(button => button.disabled = false);
    equal.disabled = true;
});
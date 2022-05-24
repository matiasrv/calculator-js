const display = document.querySelector('#display');
const operators = document.getElementById("operators");
const clear = document.getElementById("clear")
const buttonC = document.getElementById("c")
const digits = document.getElementById("numbers");
const zero = document.getElementById('zero');
const equal = document.getElementById("equal");
const dot = document.getElementById("dot");
equal.disabled = true;
const DISPLAYOVERFLOW = 25;
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
function addDigit(e){
    if(display.textContent.length > DISPLAYOVERFLOW){return};
    if(e == '0'){
        if(operator == undefined){
            if(n1 != 0){
                display.textContent += zero.textContent;
                n1 += zero.textContent.toString();
            }        
        }
        else{
            if(n2 == undefined){
                display.textContent += zero.textContent;
                n2 = zero.textContent.toString();
            }
            else if(n2 != '0'){
                n2 += zero.textContent.toString();
                display.textContent += zero.textContent
            }
            equal.disabled = false;
            operators.childNodes.forEach(button => button.disabled = false);
        }
    }else if(e.type == 'click'){
        if(e.target.tagName == "BUTTON"){
            if(operator == undefined){
                n1 == '0' ? display.textContent = e.target.textContent: display.textContent += e.target.textContent;
                n1 == 0 ? n1 = e.target.textContent.toString(): n1 += e.target.textContent.toString();         
            }
            else{
                if (n2 == '0'){
                    n2 = e.target.textContent.toString();
                    display.textContent = display.textContent.slice(0,-1) + e.target.textContent;
                }
                else if(n2 != undefined){
                    n2 += e.target.textContent.toString();
                    display.textContent += e.target.textContent;
                }
                else{
                    n2 = e.target.textContent.toString();
                    display.textContent += e.target.textContent;
                }
                equal.disabled = false;
                operators.childNodes.forEach(button => button.disabled = false);
            }
        }
    }
}
digits.addEventListener("click", addDigit);
zero.addEventListener("click", addDigit('0'));
clear.addEventListener("click", ()=>{
    n1 = display.textContent = 0;
    n2 = operator = undefined;
    equal.disabled = true;
    operators.childNodes.forEach(button => button.disabled = false);
    dot.disabled = false;
});
function backSpace(){
    if(display.textContent.length > 1 && display.textContent != divisionError){
        display.textContent = display.textContent.slice(0, -1);
    }else{
        display.textContent = '0';
    }
    if(n2 != undefined){
        if(n2.slice(-1, n2.length) == '.'){
            dot.disabled = false;
        }
        n2 = n2.slice(0, -1);
        if(n2.length == 0){
            n2 = undefined;
            equal.disabled = true;
            operators.childNodes.forEach(button => button.disabled = true);
        }
    }
    else if(operator != undefined && n2 == undefined){
        operator = undefined;
        operators.childNodes.forEach(button => button.disabled = false);
    }
    else if(n1.length >= 1){
        if(n1.slice(-1, n1.length) == '.'){
            dot.disabled = false;
        }
        n1 = n1.slice(0, -1);
        if(n1.length == 0){
            n1 = 0;
        }
    }
}
buttonC.addEventListener("click", backSpace);
function addOperator(e){
    if(e.target.tagName == "BUTTON"){
        if(n2 != undefined){
            operate();
        }
        display.textContent += e.target.textContent;
        operator = e.target.textContent;
        operators.childNodes.forEach(b => b.disabled = true);
        dot.disabled = false;
    }
}
operators.addEventListener("click", addOperator);
function evaluateEqual(){
    operate();
    operators.childNodes.forEach(button => button.disabled = false);
    equal.disabled = true;
    dot.disabled = false;
};
equal.addEventListener("click", evaluateEqual);
function addDot(){
    if(display.textContent.length > DISPLAYOVERFLOW){return};
    if(!operator){
        n1 += ".";
        display.textContent+= ".";
    }
    else if(n2 != undefined){
        n2 += ".";
        display.textContent+= ".";
    }
    else{
        n2 = "0.";
        display.textContent+= "0.";
    }
    dot.disabled = true;
};
dot.addEventListener("click", addDot);
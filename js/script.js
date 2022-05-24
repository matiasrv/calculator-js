const display = document.querySelector('#display');
const operators = document.getElementById("operators");
let operatorsDisabled = false;
const clear = document.getElementById("clear")
const buttonC = document.getElementById("c")
const digits = document.getElementById("numbers");
const zero = document.getElementById('zero');
const equal = document.getElementById("equal");
const dot = document.getElementById("dot");
equal.disabled = true;
const DISPLAYOVERFLOW = 23;
let n1, n2, operator;
n1 = 0;
let unexpectedError = "UNEXPECTED ERROR";

function add(){
    return +n1 + +n2;
}
function substract(){
    return +n1 - +n2;
}
function divide(){
    let result;
    (n2 == 0) ? result = unexpectedError : result = +n1 / +n2;
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
            break;
    }
    if(!isFinite(n1)){
        display.textContent = unexpectedError;
        n1 = 0;
    }
    operator = n2 = undefined;
}
function addDigit(e){
    if(display.textContent.length > DISPLAYOVERFLOW){return};
    if(isFinite(e) && e != 0){
        if(operator == undefined){
            n1 == '0' ? display.textContent = e: display.textContent += e;
            n1 == 0 ? n1 = e : n1 += e;         
        }
        else{
            if (n2 == '0'){
                n2 = e;
                display.textContent = display.textContent.slice(0,-1) + e;
            }
            else if(n2 != undefined){
                n2 += e;
                display.textContent += e;
            }
            else{
                n2 = e;
                display.textContent += e;
            }
            equal.disabled = false;
            operators.childNodes.forEach(button => button.disabled = false);
            operatorsDisabled = false;
        }
    }
    else if(e == '0'){
        if(operator == undefined){
            if(n1 != '0'){
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
            operatorsDisabled = false;
        }
    }
}
digits.addEventListener("click", e => addDigit(e.target.textContent));
zero.addEventListener("click", ()=> addDigit('0'));
clear.addEventListener("click", ()=>{
    n1 = display.textContent = 0;
    n2 = operator = undefined;
    equal.disabled = true;
    operators.childNodes.forEach(button => button.disabled = false);
    operatorsDisabled = false;
    dot.disabled = false;
});
function backSpace(){
    if(display.textContent.length > 1 && display.textContent != unexpectedError){
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
            operatorsDisabled = true;
        }
    }
    else if(operator != undefined && n2 == undefined){
        operator = undefined;
        operators.childNodes.forEach(button => button.disabled = false);
        operatorsDisabled = false;
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
    if(operatorsDisabled){return};
    if(n2 != undefined){
        operate();
    }
    display.textContent += e;
    operator = e;
    operators.childNodes.forEach(b => b.disabled = true);
    operatorsDisabled = true;
    dot.disabled = false;
}
operators.addEventListener("click", e => addOperator(e.target.textContent));
function evaluateEqual(){
    if(n2 == undefined){return};
    operate();
    operators.childNodes.forEach(button => button.disabled = false);
    operatorsDisabled = false;
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

document.body.addEventListener("keydown", k =>{
    switch(k.key){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            addDigit(k.key);
            break;
        case 'Backspace':
            backSpace();
            break;
        case '/':
        case '*':
        case '-':
        case '+':
            addOperator(k.key);
            break;
        case "Enter":
            evaluateEqual();
            break;
        case '.':
            if(!dot.disabled){addDot()};
            break;
    }
})
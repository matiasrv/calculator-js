const display = document.querySelector('#display');

function add(n1, n2){
    return n1 + n2;
}
function substract(n1,n2){
    return n1 - n2;
}
function divide(n1, n2){
    let result;
    (n2 == 0) ? result = "CAN'T DIVIDE BY ZERO" : result = n1 / n2;
    return result;
}
function multiply(n1, n2){
    return n1 * n2;
}
function operation(n1, operator, n2){
    switch(operator){
        case '+':
            display.textContent = add(n1,n2);
            break;
        case '-':
            display.textContent = substract(n1,n2);
            break;
        case '*':
            display.textContent = multiply(n1,n2);
            break;
        default:
            display.textContent = divide(n1,n2);
            break;
    }
}
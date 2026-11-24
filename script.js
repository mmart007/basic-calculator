let num1='';
let num2='';
let prevDec = false;
let operator='';
let result = 0;
let numberOperations = 0;
let equalPress = false;
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelector('#equal')
const clear = document.querySelector('#clear')
const del = document.querySelector('#delete')

//Create object of operations for operate function
const operations = {
add : (num1, num2) => num1+num2, 
subtract : (num1, num2) => num1-num2,
multiply : (num1, num2) => num1*num2,
divide : (num1, num2) => num2 !==0? num1/num2 : "You can't divide by 0"
};

//Calculate the result based on inputs
const operate = () => {
    result = typeof(operations[operator])==='function' ? 
    operations[operator](Number(num1),Number(num2)) : 
    'Missing operator';
    display.textContent = Math.abs(result).toString().replace('.', '').length > 12 ?
    result.toExponential(7) : result;
    
}

function storeNumber(digit) { 
    if(equalPress){
            reset();
    }
    if (display.textContent.includes(".") && digit ==='.') {

    } else {
        if(operator==='') { 
            num1 += digit;
            display.textContent = num1; 
        } else {
            num2 += digit;
            display.textContent = num2;
        }
    }
}

function handleOperator(clickedOperator){
        if(num2!==''){
            operate(num1, num2, operator);
            num1=result;
            num2='';
            numberOperations++;
        }
        if(num1===''){
            display.textContent = 'Enter a number first';
        } else {  
        operator = clickedOperator;
        }    
}

function handleEqual () {
    operate(num1, num2, operator);
    equalPress=true;
}

function handleDelete () {
   if(operator === ''){  
        num1=num1.slice(0,-1);
        display.textContent=num1;
    } else {
        num2=num2.slice(0,-1);
        display.textContent=num2;
    }
}

const reset = () => {
    num1='';
    num2='';
    operator='';
    numberOperations=0;
    result=0;
    display.textContent=result;
    equalPress=false;
}

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        storeNumber(event.currentTarget.textContent)
    })
})

operators.forEach(op => {
    op.addEventListener('click', (event) => {
        handleOperator(event.currentTarget.id);
        }
)});

equal.addEventListener('click', (event) => {
   handleEqual();
});

del.addEventListener('click', (event) => {
   handleDelete();
});

clear.addEventListener('click', (event)=> {
    reset();
})

document.addEventListener('keydown', (event) => {
    // Check if the pressed key is a single digit from '0' to '9' or a decimal point
    if (event.key==='.' || (event.key >= '0' && event.key <= '9')) {
        storeNumber(event.key);
    } 
    // Check if the pressed key is one of the 4 operator symbols
    const pushedButton = Array.from(operators).
    find(button => button.textContent === event.key);
    if (pushedButton)
         {
        handleOperator(pushedButton.id);
    }
    //treat the equal or enter keys as the equals button
    if (event.key === '=' || event.key === 'Enter'){
        event.preventDefault();
        handleEqual();
    }

    //trigger delete if backspace is pushed
    if (event.key === 'Backspace'){
        handleDelete();
    }

    //treat the esc or delete key as clear
    if (event.key === 'Escape' || event.key ==='Delete'){
        reset();
    }
});
let num1='';
let num2='';
let operator='';
let result = 0;
let numberOperations = 0;
let equalPress = false;
const display = document.querySelector('#display');

const operations = {
add : (num1, num2) => num1+num2, 
subtract : (num1, num2) => num1-num2,
multiply : (num1, num2) => num1*num2,
divide : (num1, num2) => num2 !==0? num1/num2 : "You can't divide by 0"
};

const operate = (num1, num2, operator) => {
    result = typeof(operations[operator])==='function' ? 
    operations[operator](Number(num1),Number(num2)) : 
    'Missing operator';
    display.textContent = result;
}

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if(equalPress){
            reset();
        }
        if(operator===''){
        num1 += event.currentTarget.textContent;
        console.log(`First number is ${num1}`);
        } else {
        num2 += event.currentTarget.textContent;
        console.log(`Second number is ${num2}`);
        } 
    })
})

const operators = document.querySelectorAll('.operators');
operators.forEach(op => {
    op.addEventListener('click', (event) => {
        
        if(num2!==''){
            operate(num1, num2, operator);
            num1=result;
            num2='';
            numberOperations++;
        }
        if(num1===''){
            display.textContent = 'Enter a number first';
        } else {  
        operator = event.currentTarget.id;
        console.log(operator)
        }        
        }
)});

const equal = document.querySelector('#equal')
equal.addEventListener('click', (event) => {
    //console.log(`Please calculate ${num1} ${operator} ${num2}`);
    operate(num1, num2, operator);
    equalPress=true;
    console.log(equalPress);
});

const clear = document.querySelector('#clear')
clear.addEventListener('click', (event)=> {
    reset();
})

const reset = () => {
    num1='';
    num2='';
    operator='';
    numberOperations=0;
    result=0;
    display.textContent=result;
    equalPress=false;
}
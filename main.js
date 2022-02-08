const output = document.getElementById('output-text');
const postfix = new Array();
const stack = new Array();

var flag = true;
var changed = false;
var num = 0;

//Event listner that reads input and covert it into postfix form
document.querySelectorAll(".key").forEach((item) => {
    item.addEventListener("click", (event) => {
        var val = item.innerHTML;
        changed = true;
        if (isNumber(val) || output.innerHTML == "ERROR") {
            if (flag || output.innerHTML == '0') {
                output.innerHTML = '';
                flag = false;
            }
            num = num * 10 + parseFloat(val);
            printToOutput(val);
        } else if (isOperator(item.getAttribute('alt')) && output.innerHTML != '') {
            if (output.innerHTML != '' && output.innerHTML != '0') {
                if (output.innerHTML == '0' || output.innerHTML == "ERROR") {
                    output.innerHTML = '';
                }
                num = parseFloat(output.innerHTML);
                flag = false;
                val = item.getAttribute('alt');
                postfix.push(num);
                num = 0;
                if (stack.length > 0)
                    if (isOperator(stack[stack.length - 1]))
                        while (precedCheck(stack[stack.length - 1]) >= precedCheck(val))
                            postfix.push(stack.pop());
                stack.push(val);
                printToOutput(val);
            }
        } else output.innerHTML = 'ERROR';
        output.scrollLeft = output.scrollWidth;
    });
});

//Event listner to evaluate postfix form and to generate output
document.getElementById('equals').addEventListener('click', function() {
    postfix.push(num);
    num = 0;
    while (stack.length > 0) {
        postfix.push(stack.pop());
    }
    if (changed) {
        while (postfix.length != 0) {
            let val = postfix[0];
            postfix.shift();
            if (isOperator(val)) {
                let y = stack.pop();
                let x = stack.pop();
                switch (val) {
                    case '*':
                        stack.push(x * y);
                        break;
                    case '/':
                        stack.push(x / y);
                        break;
                    case '+':
                        stack.push(x + y);
                        break;
                    case '-':
                        stack.push(x - y);
                        break;
                }
            } else
                stack.push(val);
        }
        if (stack) {
            output.innerHTML = stack.pop().toString();
            output.scrollLeft = output.scrollWidth;
            flag = true;
        } else output.innerHTML = 'ERROR';
        stack.length = 0;
        postfix.length = 0;
    }
});

//Event listner for backspce
document.getElementById('backspace').addEventListener('click', function() {
    var outString = output.innerHTML;
    outString = outString.substring(0, outString.length - 1);
    if (outString.length == 0)
        output.innerHTML = '0';
    else
        output.innerHTML = outString;
});

function isNumber(value) {
    if (value >= "0" && value <= "9") return true;
    return false;
}

function isOperator(value) {
    if (value == '/' || value == '*' || value == '+' || value == '-')
        return true;
    return false;
}

//Function that returns higher value if the precedence is higher
function precedCheck(value) {
    if (value == '*' || value == '/')
        return 2;
    else if (value == '+' || value == '-')
        return 1;
    else return -1;
}

function printToOutput(value) {
    if (value == '*')
        output.innerHTML += '×';
    else if (value == '/')
        output.innerHTML += '÷';
    else output.innerHTML += value;
}
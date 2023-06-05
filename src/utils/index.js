export function toPostfix(infix) {
  const postfix = [];
  const operatorStack = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "^": 3,
  };

  infix.split(/\s+/).forEach((token) => {
    if (/^\d+(\.\d+)?$/.test(token)) {
      postfix.push(token);
    } else if (token in precedence) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "(" &&
        precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]
      ) {
        postfix.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        postfix.push(operatorStack.pop());
      }
      if (operatorStack.length === 0) {
        throw new Error("Mismatched parentheses");
      }
      operatorStack.pop();
    } else {
      throw new Error(`Invalid token: ${token}`);
    }
  });

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    if (operator === "(") {
      throw new Error("Mismatched parentheses");
    }
    postfix.push(operator);
  }

  console.log("toPostfix", postfix.join(" "));
  return postfix.join(" ");
}



export function evaluatePostfix(postfix) {
  const operandStack = [];

  postfix.split(/\s+/).forEach((token) => {
    if (/^\d+(\.\d+)?$/.test(token)) {
      operandStack.push(parseFloat(token));
    } else if (token === "+") {
      const b = operandStack.pop();
      const a = operandStack.pop();
      operandStack.push(a + b);
    } else if (token === "-") {
      const b = operandStack.pop();
      const a = operandStack.pop();
      operandStack.push(a - b);
    } else if (token === "*") {
      const b = operandStack.pop();
      const a = operandStack.pop();
      operandStack.push(a * b);
    } else if (token === "/") {
      const b = operandStack.pop();
      const a = operandStack.pop();
      if (b === 0) {
        throw new Error("Division by zero");
      }
      operandStack.push(a / b);
    } else if (token === "%") {
      const b = operandStack.pop();
      const a = operandStack.pop();
      operandStack.push(a % b);
    } else if (token === "^") {
      const b = operandStack.pop();
      const a = operandStack.pop();
      operandStack.push(Math.pow(a, b));
    } else {
      throw new Error(`Invalid token: ${token}`);
    }
  });

  if (operandStack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return operandStack[0];
}

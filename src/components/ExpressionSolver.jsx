// src/components/ExpressionSolver.js
import React, { useState, useEffect } from "react";
import { toPostfix, evaluatePostfix } from "../utils";
import "../styles/index.css";

const ExpressionSolver = ({ solver }) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    generateExpression();
  }, [solver]);

  const handleExpressionChange = (event) => {
    setExpression(event.target.value);
  };


  const generateExpression = () => {
    // // 生成一个简单的四则运算表达式
    const operators = ["+", "-", "*", "/"];
    const operands = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 100)
    );
    let expression = operands.join("");

    for (let i = 0; i < 4; i++) {
      const operator = operators[Math.floor(Math.random() * operators.length)];
      expression += ` ${operator} ${Math.floor(Math.random() * 100)}`;
    }

    setExpression(expression);
  };

  const solveExpression = () => {
    // 如果输入的表达式为空，则不做任何处理
    if (!expression.trim()) {
      setResult("");
      return;
    }

    // 如果输入的表达式不合法，则给出错误提示
    try {
      // 判断'solver'属性是否为'postfix'，如果是则使用后缀表达式求解方法
      if (solver === "postfix") {
        const postfix = toPostfix(expression);
        const value = evaluatePostfix(postfix);
        setResult(`${expression} = ${value}`);
      }
      // 如果'solver'属性不是'postfix'，或者未设置'solver'属性，则使用eval()函数求解表达式
      else {
        // eslint-disable-next-line no-eval
        setResult(eval(expression));
      }
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <div className="calculator">
      <p className="calculator__expression-label">表达式：</p>
      <p className="calculator__expression">{expression}</p>
      <input
        className="calculator__input"
        type="text"
        value={expression}
        onChange={handleExpressionChange}
      />
      <div className="calculator__button-container">
        <button className="calculator__button" onClick={generateExpression}>
          生成新表达式
        </button>
        <button className="calculator__button" onClick={solveExpression}>
          求解
        </button>
      </div>
      {result !== null && <p className="calculator__result-label">结果：</p>}
      {result !== null && <p className="calculator__result">{result}</p>}
    </div>
  );
};

export default ExpressionSolver;

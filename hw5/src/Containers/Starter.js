import React, { useState } from 'react';
import '../App.css';

const Starter = () => {
  const [number, setNumber] = useState("0");
  const ops = "+-*/.";

  const increment1 = () => setNumber(number.length === 1 ? number.replace("0", "") + "1" : number + "1");
  const increment2 = () => setNumber(number.length === 1 ? number.replace("0", "") + "2" : number + "2");
  const increment3 = () => setNumber(number.length === 1 ? number.replace("0", "") + "3" : number + "3");
  const increment4 = () => setNumber(number.length === 1 ? number.replace("0", "") + "4" : number + "4");
  const increment5 = () => setNumber(number.length === 1 ? number.replace("0", "") + "5" : number + "5");
  const increment6 = () => setNumber(number.length === 1 ? number.replace("0", "") + "6" : number + "6");
  const increment7 = () => setNumber(number.length === 1 ? number.replace("0", "") + "7" : number + "7");
  const increment8 = () => setNumber(number.length === 1 ? number.replace("0", "") + "8" : number + "8");
  const increment9 = () => setNumber(number.length === 1 ? number.replace("0", "") + "9" : number + "9");
  const increment0 = () => setNumber(number.length === 1 ? number.replace("0", "") + "0" : number + "0");
  const ac = () => setNumber("0");
  const plus = () => {   
    if(ops.includes(number[number.length -1]))
      return;
    else
      setNumber(number + "+");
  }
  const minus = () => {   
    if(ops.includes(number[number.length -1]))
      return;
    else
      setNumber(number + "-");
  }
  const multiply = () => {   
    if(ops.includes(number[number.length -1]))
      return;
    else
      setNumber(number + "*");
  }
  const divide = () => {   
    if(ops.includes(number[number.length -1]))
      return;
    else
      setNumber(number + "/");
  }
  const equal = () => {
    if(eval(number) === Infinity || eval(number) === -Infinity)
    {
      if(number[number.length-1] === "0" && number[number.length-2] === "/")
      {
        setNumber("Meaningless!!");
      }
      else
      {
        setNumber("Overfloat!!");
      }
    }
    else
      setNumber(eval(number).toString(10));   
  }
  const reverse = () => {
    if(number === "0")
      setNumber("0");
    else if(number[0] === "-")
    {
      setNumber(number.replace("-", ""));
    }
    else
      setNumber("-" + number);
  }
  const dot = () => {   
    if(ops.includes(number[number.length -1]) || number.includes("."))
      return;
    else
      setNumber(number + ".");
  }
  const square = () => {
    setNumber(eval("Math.sqrt" + "(" + number + ")"));
  }
  const backspace = () => setNumber((number.length === 1 || (number.length === 2 && number[0] === "-")) ? "0" : number.replace(number[number.length-1], ""));

  return (
    <div className="Calculator__root">
      <h2 className ="Calculator__showBar">{number}</h2>
      <div className="Calculator__column1">
        <button id="AC" onClick = {ac}>AC</button>
        <button id="plus-minus" onClick = {reverse}>+/-</button>
        <button id="backspace" onClick = {backspace}>←</button>
        <button id="divide" onClick = {divide}>÷</button>
      </div>
      <div className="Calculator__column2">
        <button id="7" onClick = {increment7}>7</button>
        <button id="8" onClick = {increment8}>8</button>
        <button id="9" onClick = {increment9}>9</button>
        <button id="multiply" onClick = {multiply}>x</button>
      </div>   
      <div className="Calculator__column3">
        <button id="4" onClick = {increment4}>4</button>
        <button id="5" onClick = {increment5}>5</button>
        <button id="6" onClick = {increment6}>6</button>
        <button id="minus" onClick = {minus}>-</button>
      </div> 
      <div className = "Calculator__column4">
        <button id="1" onClick = {increment1}>1</button>
        <button id="2" onClick = {increment2}>2</button>
        <button id="3" onClick = {increment3}>3</button>
        <button id="plus" onClick = {plus}>+</button>
      </div> 
      <div className = "Calculator__column5">
        <button id ="0" onClick = {increment0}>0</button>
        <button id ="dot" onClick = {dot}>.</button>
        <button id ="sqrt" onClick = {square}>√</button>
        <button id ="equal" onClick = {equal}>=</button>
      </div>
    </div>
  );
}

export default Starter;

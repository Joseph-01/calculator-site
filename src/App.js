import './App.css';
import { useState } from 'react';

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '+', '-'];

  const updateCalc = (value) => {
    // Prevent multiple consecutive operators or starting with an operator
    if (ops.includes(value) && (calc === '' || ops.includes(calc.slice(-1)))) {
      return;
    }

    // Prevent more than one decimal point
    if (value === '.' && calc.includes('.')) {
      return;
    }

    // Update the display state
    setCalc((prevCalc) => prevCalc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    return setCalc(eval(calc).toString());
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const deleteLastkey = () => {
    if (calc === '') {
      return;
    }

    const value = calc.slice(0, -1);
    const newResult = result.slice(0, -1);
    setResult(newResult);
    setCalc(value);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}
          {calc || '0'}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => deleteLastkey()}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={() => calculate()}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;

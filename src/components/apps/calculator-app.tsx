'use client';

import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewVal, setWaitingForNewVal] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForNewVal) {
      setDisplay(digit);
      setWaitingForNewVal(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewVal) {
      setDisplay('0.');
      setWaitingForNewVal(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setWaitingForNewVal(false);
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    setDisplay((val * -1).toString());
  };

  const handlePercent = () => {
    const val = parseFloat(display);
    setDisplay((val / 100).toString());
  };

  const handleOp = (op: string) => {
    const val = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(val);
    } else if (operation) {
      const res = calculate(prevVal, val, operation);
      setPrevVal(res);
      setDisplay(res.toString());
    }
    setOperation(op);
    setWaitingForNewVal(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevVal !== null) {
      const current = parseFloat(display);
      const res = calculate(prevVal, current, operation);
      setDisplay(res.toString());
      setPrevVal(null);
      setOperation(null);
      setWaitingForNewVal(true);
    }
  };

  return (
    <div className="h-full w-full bg-neutral-900 flex flex-col justify-between p-4 select-none">
      {/* Calculator Display */}
      <div className="flex-1 flex items-end justify-end px-3 py-2">
        <span className="text-4xl font-light text-white tracking-tight truncate">
          {display}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <button onClick={handleClear} className="h-12 rounded-full bg-neutral-600 hover:bg-neutral-500 text-white font-medium text-sm transition-colors">
          {display !== '0' ? 'C' : 'AC'}
        </button>
        <button onClick={handleToggleSign} className="h-12 rounded-full bg-neutral-600 hover:bg-neutral-500 text-white font-medium text-sm transition-colors">
          ±
        </button>
        <button onClick={handlePercent} className="h-12 rounded-full bg-neutral-600 hover:bg-neutral-500 text-white font-medium text-sm transition-colors">
          %
        </button>
        <button onClick={() => handleOp('÷')} className={`h-12 rounded-full font-medium text-base transition-colors ${operation === '÷' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}>
          ÷
        </button>

        <button onClick={() => handleDigit('7')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          7
        </button>
        <button onClick={() => handleDigit('8')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          8
        </button>
        <button onClick={() => handleDigit('9')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          9
        </button>
        <button onClick={() => handleOp('×')} className={`h-12 rounded-full font-medium text-base transition-colors ${operation === '×' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}>
          ×
        </button>

        <button onClick={() => handleDigit('4')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          4
        </button>
        <button onClick={() => handleDigit('5')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          5
        </button>
        <button onClick={() => handleDigit('6')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          6
        </button>
        <button onClick={() => handleOp('-')} className={`h-12 rounded-full font-medium text-base transition-colors ${operation === '-' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}>
          −
        </button>

        <button onClick={() => handleDigit('1')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          1
        </button>
        <button onClick={() => handleDigit('2')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          2
        </button>
        <button onClick={() => handleDigit('3')} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          3
        </button>
        <button onClick={() => handleOp('+')} className={`h-12 rounded-full font-medium text-base transition-colors ${operation === '+' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}>
          +
        </button>

        <button onClick={() => handleDigit('0')} className="col-span-2 h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base text-left pl-6 transition-colors">
          0
        </button>
        <button onClick={handleDecimal} className="h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-base transition-colors">
          .
        </button>
        <button onClick={handleEquals} className="h-12 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-medium text-base transition-colors">
          =
        </button>
      </div>
    </div>
  );
};

export default CalculatorApp;

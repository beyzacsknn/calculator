import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const KawaiiCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const calculateResult = (expression) => {
    try {
      // math.js ile güvenli bir şekilde hesaplama
      return evaluate(expression);  // evaluate fonksiyonu ile hesaplama yapıyoruz
    } catch (error) {
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      if (input.trim() === '') {
        setResult('Error');
      } else {
        const calculatedResult = calculateResult(input);
        setResult(calculatedResult);
        setInput('');
      }
    } else if (value === 'C') {
      setInput('');
      setResult(0);
    } else {
      // Eğer işlem yapıldıysa, input kısmına mevcut sonucu ekleyelim
      if (input === '') {
        setInput(result + value); // Eğer input boşsa, mevcut sonucu ekle
      } else {
        setInput((prevInput) => prevInput + value); // Aksi halde input'a yeni değeri ekle
      }
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-pink-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-4 border-pink-400">
        <div className="mb-6">
          <div className="mt-4 text-3xl border rounded-full font-bold text-pink-600">{result}</div>
          <input
            type="text"
            value={input}
            readOnly
            className="w-full mt-4 p-4 border rounded-full text-right text-xl font-bold text-pink-700 shadow-inner"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className="p-4 bg-pink-400 rounded-full text-white hover:bg-pink-500 transition duration-300 ease-in-out shadow-md transform hover:scale-105"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KawaiiCalculator;

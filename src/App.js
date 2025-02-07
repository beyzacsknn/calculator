import React, { useState } from 'react';

const KawaiiCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  // Matematiksel işlem için güvenli bir çözüm
  const calculateResult = (expression) => {
    try {
      // Yalnızca geçerli matematiksel ifadeleri değerlendir
      // regex ile sadece sayılar ve temel işlemler ( +, -, *, /, . ) kabul edilir
      if (/[^0-9+\-*/.() ]/.test(expression)) {
        throw new Error('Invalid character');
      }
      // Burada `Function` constructor'ı ile güvenli bir hesaplama yapıyoruz
      const result = new Function('return ' + expression)();
      return result;
    } catch (error) {
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      // İşlem yapılacak ifade varsa sonucu hesapla
      if (input.trim() === '') {
        setResult('Error');
      } else {
        setResult(calculateResult(input));
        setInput(''); // Sonuç gösterildikten sonra input'u sıfırla
      }
    } else if (value === 'C') {
      setInput(''); // input'u sıfırla
      setResult(0); // Sonucu sıfırla
    } else {
      // Eğer daha önce bir işlem yapıldıysa, yeni işlem bu sonuca eklenmeli
      if (input === '') {
        setInput(result + value); // Sonuç varsa, input kısmında o sonucu kullan
      } else {
        setInput((prevInput) => prevInput + value); // Aksi halde input kısmına ekleme yap
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

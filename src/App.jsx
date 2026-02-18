import React, { useState, useEffect } from 'react';

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setSeconds(0);
    if (newMode === 'focus') setMinutes(25);
    else setMinutes(5);
  };

  // Helper to format 0:00 to 00:00
  const fmt = (num) => num.toString().padStart(2, '0');

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out flex items-center justify-center p-4 
      ${mode === 'focus' ? 'bg-slate-900' : 'bg-emerald-900'}`}>
      
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
        
        {/* Header / Mode Switcher */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => switchMode('focus')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              mode === 'focus' 
                ? 'bg-white text-slate-900 shadow-lg scale-105' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              mode === 'break' 
                ? 'bg-white text-emerald-900 shadow-lg scale-105' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="relative mb-12">
          {/* Outer Ring Effect */}
          <div className={`absolute -inset-4 rounded-full blur-xl opacity-30 animate-pulse 
            ${mode === 'focus' ? 'bg-indigo-500' : 'bg-emerald-400'}`}></div>
            
          <h1 className="relative text-9xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
            {fmt(minutes)}:{fmt(seconds)}
          </h1>
          <p className="text-white/60 font-medium tracking-widest uppercase mt-2">
            {isActive ? 'Timer Running' : 'Timer Paused'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={toggleTimer}
            className="h-16 w-16 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95"
          >
            {isActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button 
            onClick={resetTimer}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:rotate-180 duration-500"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;
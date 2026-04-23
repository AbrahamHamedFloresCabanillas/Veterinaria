import React, { useEffect, useState } from 'react';

const ToastUndo = ({ isVisible, onUndo, pacienteName }) => {
  const [progress, setProgress] = useState(100);

  // AI Assistance Recommendation: We use requestAnimationFrame to smoothly animate 
  // the progress bar width down to 0 over 5 seconds (5000ms), avoiding heavy React re-renders with setInterval.
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime = Date.now();
    const duration = 5000;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-800 text-white rounded-xl shadow-2xl overflow-hidden animate-slide-up sm:max-w-sm w-[90%] sm:w-auto flex flex-col pointer-events-auto border border-slate-700">
      <div className="p-4 flex items-center justify-between gap-6">
        <p className="text-sm font-medium">Paciente <span className="text-indigo-300 font-bold">{pacienteName}</span> eliminado.</p>
        <button
          onClick={onUndo}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-bold uppercase tracking-wider transition-colors bg-white/10 px-3 py-1.5 rounded-md hover:bg-white/20 active:scale-95 whitespace-nowrap"
        >
          Deshacer
        </button>
      </div>
      <div className="h-1 bg-slate-700 w-full">
        <div 
          className="h-full bg-indigo-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ToastUndo;

import React, { useState, useRef, useEffect } from 'react';

const CustomTimePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse hour and minute from value (HH:MM or empty)
  const initialHour = value ? value.split(':')[0] : '12';
  const initialMinute = value ? value.split(':')[1] : '00';
  
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  
  const containerRef = useRef(null);

  useEffect(() => {
    // Sync form value when opening
    if (isOpen && value) {
        setHour(value.split(':')[0]);
        setMinute(value.split(':')[1]);
    }

    const handleClickOutside = (event) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, value]);

  const handleApply = () => {
      onChange(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`);
      setIsOpen(false);
  };

  const hours = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
  // Generate minutes in 15 minute increments for cleanliness and ease of use in scheduling
  const minutes = ['00', '15', '30', '45'];

  // Formatting for display on input
  const displayValue = value ? value : '';

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={`w-full bg-slate-50 border ${isOpen ? 'border-indigo-500 ring-4 ring-indigo-500/10 bg-white' : 'border-slate-200'} text-slate-700 p-3 rounded-xl transition-all cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!displayValue ? 'text-slate-400' : 'text-slate-800 font-medium tracking-wider'}>
          {displayValue || "--:--"}
        </span>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full mt-2 right-0 left-0 min-w-max bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 sm:p-5 animate-slide-up origin-top">
             <div className="text-center mb-4">
                <h3 className="font-extrabold text-slate-800 tracking-wide">Hora</h3>
             </div>

             <div className="flex justify-center items-center gap-3 mb-5">
                 <div className="flex flex-col items-center">
                     <select 
                        size={3}
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                         className="w-16 pl-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-center text-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-hide appearance-none"
                        style={{ height: '100px' }}
                     >
                         {hours.map(h => (
                             <option key={`h-${h}`} value={h} className="py-2">{h}</option>
                         ))}
                     </select>
                 </div>
                 
                 <div className="text-2xl font-black text-slate-300 pb-2">:</div>
                 
                 <div className="flex flex-col items-center">
                     <select 
                        size={3}
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className="w-16 pl-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-center text-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-hide appearance-none"
                        style={{ height: '100px' }}
                     >
                         {minutes.map(m => (
                             <option key={`m-${m}`} value={m} className="py-2">{m}</option>
                         ))}
                     </select>
                 </div>
             </div>

             <div className="flex justify-between items-center px-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors px-3 py-2 hover:bg-slate-50 rounded-lg"
                  type="button"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleApply}
                  className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2.5 rounded-lg shadow-md shadow-indigo-200"
                  type="button"
                >
                  Aplicar Hora
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;

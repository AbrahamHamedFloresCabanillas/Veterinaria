import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, value, onChange, placeholder = "Seleccionar", label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={`w-full bg-slate-50 border ${isOpen ? 'border-indigo-500 ring-4 ring-indigo-500/10 bg-white' : 'border-slate-200'} text-slate-700 p-3 rounded-xl transition-all cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!selectedOption ? 'text-slate-400' : 'text-slate-800 font-medium'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full max-h-[250px] mt-2 left-0 right-0 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col animate-slide-up origin-top overflow-hidden">
            <div className="overflow-y-auto w-full p-2 space-y-1 scrollbar-hide">
              {options.length === 0 ? (
                 <div className="p-4 text-center text-slate-500 text-sm">No hay opciones disponibles.</div>
              ) : (
                options.map((option) => (
                    <div
                    key={option.value}
                    className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between text-sm
                        ${value === option.value 
                        ? 'bg-indigo-50 text-indigo-700 font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                        }
                    `}
                    onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                    }}
                    >
                    <span>{option.label}</span>
                    {value === option.value && (
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    </div>
                ))
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

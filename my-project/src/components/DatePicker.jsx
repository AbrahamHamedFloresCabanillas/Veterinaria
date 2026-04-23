import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const popoverRef = useRef(null);
  const inputRef = useRef(null);

  // Prevent body scroll and close when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // or 'visible'
    }

    const handleClickOutside = (event) => {
      // Allow closing when clicking the backdrop
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        event.target.classList.contains('backdrop-blur-md')
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'auto'; // ensure cleanup
    };
  }, [isOpen]);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Format to YYYY-MM-DD to match the previous input type="date" value format
    const formattedDate = newDate.toISOString().split('T')[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10 sm:h-12 sm:w-12"></div>);
    }
    
    // Formatted selected value for comparison
    const selectedDateStr = value; // YYYY-MM-DD
    
    for (let d = 1; d <= daysInMonth; d++) {
        const cellDate = new Date(year, month, d);
        const cellDateStr = cellDate.toISOString().split('T')[0];
        
        const isSelected = selectedDateStr === cellDateStr;
        const isToday = new Date().toISOString().split('T')[0] === cellDateStr;
        
        days.push(
            <button
                key={`day-${d}`}
                type="button"
                onClick={() => handleDateSelect(d)}
                className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-200
                    ${isSelected 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md transform scale-110' 
                        : isToday 
                            ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                            : 'text-slate-700 hover:bg-slate-100 hover:scale-110'
                    }
                `}
            >
                {d}
            </button>
        );
    }
    
    return days;
  };

  // Format value for display in input
  let displayValue = "";
  if (value) {
      // value is YYYY-MM-DD
      const [yearStr, monthStr, dayStr] = value.split('-');
      const dateObj = new Date(yearStr, parseInt(monthStr)-1, dayStr);
      displayValue = `${dateObj.getDate()} de ${months[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        readOnly
        placeholder="Selecciona una fecha"
        value={displayValue}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
      />
      {/* Calendar Icon overlay */}
      <div 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4 overflow-hidden">
            <div 
                ref={popoverRef}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 transform transition-all scale-100"
            >
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-3 bg-slate-50 rounded-full hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    
                    <h3 className="font-extrabold text-xl text-slate-800 capitalize tracking-wide">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    
                    <button 
                      onClick={handleNextMonth}
                      className="p-3 bg-slate-50 rounded-full hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-4">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider h-8 flex items-center justify-center">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 justify-items-center mb-4">
                {renderCalendarDays()}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center px-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors px-4 py-2 hover:bg-slate-50 rounded-lg"
                  type="button"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    onChange(formattedDate);
                    setIsOpen(false);
                  }}
                  className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-2.5 rounded-lg shadow-md shadow-indigo-200"
                  type="button"
                >
                  Seleccionar Hoy
                </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DatePicker;

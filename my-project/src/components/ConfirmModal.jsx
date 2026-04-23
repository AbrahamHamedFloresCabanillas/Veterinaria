import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ConfirmModal = ({ isOpen, onClose, onConfirm, pacienteName }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // or 'visible'
    }
    
    return () => {
        document.body.style.overflow = 'auto'; // ensure cleanup
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4 overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all scale-100 border border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-800 mb-4 tracking-wide">Confirmar Eliminación</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          ¿Estás seguro de que deseas eliminar al paciente <strong className="font-bold text-indigo-600">{pacienteName}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md shadow-red-200"
          >
            Eliminar Paciente
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;

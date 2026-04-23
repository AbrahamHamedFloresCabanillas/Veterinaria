import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { usePacienteStore } from '../store/pacienteStore';
import { Edit } from 'lucide-react';

const Paciente = ({paciente, eliminarPaciente}) => {
  const { nombre, propietario, email, fecha, sintomas } = paciente;
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const establecerPacienteActivo = usePacienteStore((state) => state.establecerPacienteActivo);

  const handleClickEditar = () => {
    establecerPacienteActivo(paciente);
  };

  // AI Assistance: Added CSS transition classes combined with React state (isDeleting) 
  // to smoothly fade out and scale down the card 300ms before it's actually removed from the DOM.
  const handleConfirmDelete = () => {
    setShowModal(false);
    setIsDeleting(true);
    setTimeout(() => {
      eliminarPaciente(paciente);
    }, 300); // 300ms matches the duration-300 transition class
  };

  return (
    <>
    <div className={`bg-white shadow-lg shadow-slate-200/40 px-6 py-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${isDeleting ? 'opacity-0 scale-95' : 'animate-slide-in opacity-100 scale-100'}`}>
      {/* Decorative side border */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-2xl"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pl-2">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre</p>
          <p className="font-semibold text-lg text-slate-800">{nombre}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Propietario</p>
          <p className="text-slate-700">{propietario}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
          <p className="text-slate-700 break-all">{email}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fecha de Alta</p>
          <p className="text-slate-700">{fecha}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-4 pl-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Síntomas</p>
          <p className="text-slate-600 leading-relaxed text-sm">
            {sintomas}
          </p>
        </div>
        
        <div className="shrink-0 flex sm:flex-col gap-2 mt-2 sm:mt-0 justify-end">
          <button
            type="button"
            className="py-2 px-6 sm:px-4 sm:w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg uppercase transition-colors shadow-sm shadow-indigo-200/50 flex items-center justify-center gap-2"
            onClick={handleClickEditar}
          >
            <Edit size={16} />
            Editar
          </button>
          <button
            type="button"
            className="py-2 px-6 sm:px-4 sm:w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg uppercase transition-colors shadow-sm shadow-red-200/50"
            onClick={() => setShowModal(true)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <ConfirmModal 
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleConfirmDelete}
      pacienteName={nombre}
    />
    </>
  )
}

export default Paciente
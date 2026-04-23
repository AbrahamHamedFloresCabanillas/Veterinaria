import React, { useState } from 'react';
import DatePicker from './DatePicker';
import CustomSelect from './CustomSelect';
import CustomTimePicker from './CustomTimePicker';
import { usePacienteStore } from '../store/pacienteStore';
import { useCitaStore } from '../store/citaStore';

const AgendarCita = () => {
  // Leer pacientes del store con selector (para el dropdown de pacientes)
  const pacientes = usePacienteStore((state) => state.pacientes);
  // Obtener la acción agregarCita del store de citas
  const agregarCita = useCitaStore((state) => state.agregarCita);

  const [pacienteId, setPacienteId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [duracion, setDuracion] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([pacienteId, fecha, hora, motivo, duracion].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    // AI Assistance: Here we construct the DraftCita object 
    // retrieving the patient name based on the ID to denormalize for easier rendering.
    const pacienteSeleccionado = pacientes.find(p => p.id === pacienteId);
    
    const draftCita = {
      pacienteId,
      pacienteNombre: pacienteSeleccionado ? pacienteSeleccionado.nombre : 'Desconocido',
      fecha,
      hora,
      motivo,
      duracion
    };

    agregarCita(draftCita);
    
    // Reset form
    setPacienteId('');
    setFecha('');
    setHora('');
    setMotivo('');
    setDuracion('');
  };

  return (
    <div className="w-full md:w-5/12 flex flex-col">
       <div className="shrink-0 mb-8 md:mb-5">
            <h2 className="font-extrabold text-2xl lg:text-3xl text-center text-slate-800">Agendar Cita</h2>
            <p className="text-md mt-2 text-center text-slate-600">
                Añade una <span className="text-indigo-600 font-bold">Nueva Cita</span>
            </p>
        </div>
        
        <div className="md:flex-1 md:overflow-y-auto scrollbar-hide md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-thumb]:bg-slate-300 md:[&::-webkit-scrollbar-track]:bg-transparent">
            {pacientes.length === 0 ? (
                <div className="bg-white shadow-lg p-6 rounded-2xl border border-slate-100 text-center text-slate-600">
                    <p>Agrega un paciente primero para poder agendar una cita.</p>
                </div>
            ) : (
                <form 
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl shadow-slate-200/50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col gap-5 relative group mx-auto max-w-lg mb-8"
                >
                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm text-center font-semibold mb-2 animate-fade-in border border-red-100">
                            Todos los campos son obligatorios
                        </div>
                    )}
                    
                     <div className="relative">
                        <label className="block text-slate-700 uppercase font-bold text-xs tracking-wider mb-2">Paciente</label>
                        <CustomSelect 
                            options={pacientes.map(p => ({ value: p.id, label: p.nombre }))}
                            value={pacienteId}
                            onChange={setPacienteId}
                            placeholder="-- Selecciona un Paciente --"
                            label="Seleccionar Paciente"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="fechaCita" className="block text-slate-700 uppercase font-bold text-xs tracking-wider mb-2">Fecha</label>
                            <DatePicker 
                                value={fecha}
                                onChange={setFecha}
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-slate-700 uppercase font-bold text-xs tracking-wider mb-2">Hora</label>
                            <CustomTimePicker 
                                value={hora}
                                onChange={setHora}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="motivo" className="block text-slate-700 uppercase font-bold text-xs tracking-wider mb-2">Motivo de Consulta</label>
                        <input 
                            id="motivo"
                            type="text"
                            placeholder="Ej. Vacunación, Revisión..."
                            className="w-full bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 text-slate-700 p-3 rounded-xl transition-all placeholder:text-slate-400"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-slate-700 uppercase font-bold text-xs tracking-wider mb-2">Duración Estimada</label>
                        <CustomSelect 
                            options={[
                                { value: '15min', label: '15 minutos' },
                                { value: '30min', label: '30 minutos' },
                                { value: '1hr', label: '1 hora' },
                                { value: 'Mas 1hr', label: 'Más de 1 hora' }
                            ]}
                            value={duracion}
                            onChange={setDuracion}
                            placeholder="-- Selecciona Duración --"
                            label="Duración"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 border border-indigo-700 hover:bg-indigo-700 text-white font-bold p-3 mt-2 rounded-xl uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-indigo-500/30 active:scale-95 duration-200"
                    >
                        Guardar Cita
                    </button>
                </form>
            )}
        </div>
    </div>
  )
}

export default AgendarCita

import React from 'react'
import { useCitaStore } from '../store/citaStore'

const CalendarioCitas = () => {
  // Leer las citas del store de Zustand con selector
  const citas = useCitaStore((state) => state.citas);
  const eliminarCita = useCitaStore((state) => state.eliminarCita);

  return (
    <div className="w-full md:w-7/12 flex flex-col overflow-visible md:overflow-hidden pb-10 md:pb-0">
        <div className="shrink-0 mb-8 md:mb-5">
            <h2 className="font-extrabold text-2xl lg:text-3xl text-center text-slate-800">Próximas Citas</h2>
            <p className="text-md mt-2 text-center text-slate-600">
                Administra tus <span className="text-indigo-600 font-bold">Citas y Horarios</span>
            </p>
        </div>

        <div className="md:flex-1 md:overflow-y-auto md:pr-2 space-y-5 scrollbar-hide md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-thumb]:bg-slate-300 md:[&::-webkit-scrollbar-track]:bg-transparent hover:md:[&::-webkit-scrollbar-thumb]:bg-slate-400 pb-4 pt-1">
            {citas && citas.length > 0 ? (
                <>
                {citas.map(cita => (
                    <div key={cita.id} className="bg-white shadow-lg shadow-slate-200/40 px-6 py-6 rounded-2xl border border-slate-100 hover:shadow-xl transition-all animate-slide-in group relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-l-2xl"></div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
                             <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Paciente</p>
                                <p className="font-semibold text-lg text-slate-800">{cita.pacienteNombre}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fecha y Hora</p>
                                <p className="text-slate-700 font-medium text-indigo-600">{cita.fecha} — {cita.hora}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Motivo</p>
                                <p className="text-slate-700">{cita.motivo}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duración</p>
                                <p className="text-slate-700">{cita.duracion}</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end pl-2">
                             <button
                                type="button"
                                className="py-2 px-6 sm:px-4 sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg uppercase transition-colors shadow-sm shadow-red-200/50"
                                onClick={() => eliminarCita(cita.id)}
                            >
                                Cancelar Cita
                            </button>
                        </div>
                    </div>
                ))}
                </>
            ) : (
                 <div className="text-center p-8 bg-white/50 rounded-2xl border border-dashed border-slate-300 animate-fade-in shadow-sm">
                    <p className="text-slate-500 font-medium">Aún no hay citas programadas.</p>
                    <p className="text-slate-400 text-sm mt-1">Programa una para empezar.</p>
                 </div>
            )}
        </div>
    </div>
  )
}

export default CalendarioCitas

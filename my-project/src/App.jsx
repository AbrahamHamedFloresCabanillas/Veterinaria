import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import AgendarCita from "./components/AgendarCita"
import CalendarioCitas from "./components/CalendarioCitas"
import { useState } from 'react'
import ToastUndo from './components/ToastUndo'
import { usePacienteStore } from './store/pacienteStore'

function App() {
  const eliminarPacienteDelStore = usePacienteStore((state) => state.eliminarPaciente)
  const deshacerEliminarPaciente = usePacienteStore((state) => state.deshacerEliminarPaciente)
  const [toastData, setToastData] = useState({ isVisible: false, paciente: null, timeoutId: null });

  // AI Assistance: Implementing 5-second timer logic using setTimeout. 
  // It removes the item from the store first, and waits 5s before removing the Toast notification. If undo is clicked, it clears the timeout.
  const eliminarPacienteConRetraso = (pacienteAEliminar) => {
    // Eliminar del store inmediatamente
    eliminarPacienteDelStore(pacienteAEliminar.id);

    if (toastData.timeoutId) {
      clearTimeout(toastData.timeoutId);
    }

    const id = setTimeout(() => {
       setToastData({ isVisible: false, paciente: null, timeoutId: null });
    }, 5000);

    setToastData({
       isVisible: true,
       paciente: pacienteAEliminar,
       timeoutId: id
    });
  };

  const deshacerEliminacion = () => {
     if (toastData.timeoutId) {
        clearTimeout(toastData.timeoutId);
     }
     // Restaurar paciente en el store
     deshacerEliminarPaciente(toastData.paciente);
     setToastData({ isVisible: false, paciente: null, timeoutId: null });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:pt-10 flex flex-col">
        <Header />
        
        {/* Pacientes Section */}
        <div className="mt-8 flex flex-col md:flex-row gap-8 lg:gap-10 animate-fade-in md:pb-6">
          {/* Formulario Section */}
          <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col">
             <div className="md:h-full md:flex md:flex-col overflow-visible">
                <Formulario />
             </div>
          </div>
          
          {/* ListadoPacientes Section */}
          <div className="w-full md:w-7/12 lg:w-3/5 overflow-visible flex flex-col mt-8 md:mt-0">
            <ListadoPacientes 
              eliminarPaciente={eliminarPacienteConRetraso}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px border-b border-dashed border-slate-300 my-12" />

        {/* Citas Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10 animate-fade-in pb-12">
            <AgendarCita />
            <CalendarioCitas />
        </div>

      </div>
      
      <ToastUndo 
        isVisible={toastData.isVisible}
        pacienteName={toastData.paciente?.nombre}
        onUndo={deshacerEliminacion}
      />
    </div>
  )
}

export default App
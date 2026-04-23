import React from 'react'
import Paciente from "./Paciente"
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { usePacienteStore } from '../store/pacienteStore'

const ListadoPacientes = ({eliminarPaciente}) => {
  // Leer pacientes del store de Zustand con selector (evita re-renders innecesarios)
  const pacientes = usePacienteStore((state) => state.pacientes);

  // AI Assistance: Used jsPDF and jspdf-autotable to parse React state into a downloadable PDF 
  // with a custom formatted localized date (es-MX) and automated table structure.
  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Add Clinic Logo / Title
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text("Clínica Veterinaria - Reporte", 14, 22);
    
    // Add current date 
    doc.setFontSize(11);
    doc.setTextColor(100);
    const fechaActual = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Fecha de generación: ${fechaActual}`, 14, 30);
    
    // Table generation using autoTable
    const tableColumn = ["Nombre", "Propietario", "Email", "Fecha Alta", "Síntomas"];
    const tableRows = [];

    pacientes.forEach(paciente => {
      const pacienteData = [
        paciente.nombre,
        paciente.propietario,
        paciente.email,
        paciente.fecha,
        paciente.sintomas
      ];
      tableRows.push(pacienteData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    doc.save(`reporte_pacientes_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="w-full md:h-full flex flex-col overflow-visible pb-10 md:pb-0">
      <div className="shrink-0 flex flex-col items-center">
        <h2 className="font-extrabold text-2xl lg:text-3xl text-center text-slate-800">
          Listado Pacientes
        </h2>
        
        {pacientes && pacientes.length > 0 && (
          <button
            onClick={generarPDF}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors text-sm"
          >
            Generar reporte PDF
          </button>
        )}

        <p className="text-md mt-4 mb-8 md:mb-5 text-center text-slate-600">
          Administra tus {''}
          <span className="text-indigo-600 font-bold">
            Pacientes y Citas
          </span>
        </p>
      </div>

      <div className="md:flex-1 md:pr-2 pb-4 pt-1 space-y-5">
        {pacientes && pacientes.length > 0 ? (
            <>
            {pacientes.map(paciente => (
                <Paciente 
                key={paciente.id} 
                paciente={paciente}
                eliminarPaciente={eliminarPaciente}
                />
            ))}
            </>
        ) : (
            <div className="text-center p-8 bg-white/50 rounded-2xl border border-dashed border-slate-300 animate-fade-in shadow-sm">
            <p className="text-slate-500 font-medium">Aún no hay pacientes.</p>
            <p className="text-slate-400 text-sm mt-1">Añade uno para empezar.</p>
            </div>
        )}
      </div>
    </div>
  )
}

export default ListadoPacientes
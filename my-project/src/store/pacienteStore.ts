import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Paciente, DraftPaciente } from '../types';

// ===== Store State Interface =====
interface PacienteState {
  pacientes: Paciente[];
  pacienteActivo: Paciente | null;
  agregarPaciente: (data: DraftPaciente) => void;
  eliminarPaciente: (id: string) => void;
  deshacerEliminarPaciente: (paciente: Paciente) => void;
  establecerPacienteActivo: (paciente: Paciente) => void;
  actualizarPaciente: (data: DraftPaciente) => void;
  limpiarPacienteActivo: () => void;
}

// ===== External Helper: creates a complete Paciente from a Draft =====
function crearPaciente(data: DraftPaciente): Paciente {
  return { ...data, id: uuidv4() };
}

// ===== Zustand Store with localStorage persistence =====
export const usePacienteStore = create<PacienteState>()(
  persist(
    (set) => ({
      pacientes: [],
      pacienteActivo: null,

      agregarPaciente: (data: DraftPaciente) => {
        const nuevoPaciente = crearPaciente(data);
        set((state) => ({
          pacientes: [...state.pacientes, nuevoPaciente],
        }));
      },

      eliminarPaciente: (id: string) => {
        set((state) => ({
          pacientes: state.pacientes.filter((p) => p.id !== id),
        }));
      },

      deshacerEliminarPaciente: (paciente: Paciente) => {
        set((state) => ({
          pacientes: [...state.pacientes, paciente],
        }));
      },

      establecerPacienteActivo: (paciente: Paciente) => {
        set(() => ({
          pacienteActivo: paciente,
        }));
      },

      actualizarPaciente: (data: DraftPaciente) => {
        set((state) => ({
          pacientes: state.pacientes.map((paciente) =>
            paciente.id === state.pacienteActivo?.id
              ? { ...data, id: state.pacienteActivo.id }
              : paciente
          ),
          pacienteActivo: null,
        }));
      },

      limpiarPacienteActivo: () => {
        set(() => ({
          pacienteActivo: null,
        }));
      },
    }),
    {
      name: 'pacientes-storage',
      partialize: (state) => ({ pacientes: state.pacientes }),
    }
  )
);

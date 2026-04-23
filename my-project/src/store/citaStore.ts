import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Cita, DraftCita } from '../types';

// ===== Store State Interface =====
interface CitaState {
  citas: Cita[];
  agregarCita: (data: DraftCita) => void;
  eliminarCita: (id: string) => void;
}

// ===== External Helper: creates a complete Cita from a Draft =====
function crearCita(data: DraftCita): Cita {
  return { ...data, id: uuidv4() };
}

// ===== Zustand Store with localStorage persistence =====
export const useCitaStore = create<CitaState>()(
  persist(
    (set) => ({
      citas: [],

      agregarCita: (data: DraftCita) => {
        const nuevaCita = crearCita(data);
        set((state) => ({
          citas: [...state.citas, nuevaCita],
        }));
      },

      eliminarCita: (id: string) => {
        set((state) => ({
          citas: state.citas.filter((c) => c.id !== id),
        }));
      },
    }),
    {
      name: 'citas-storage',
    }
  )
);

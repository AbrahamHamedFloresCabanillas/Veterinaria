// ===== Paciente (Patient) =====
export type Paciente = {
  id: string;
  nombre: string;
  propietario: string;
  email: string;
  fecha: string;
  sintomas: string;
};

/** Draft version without id — used by the form to capture input before ID generation */
export type DraftPaciente = Omit<Paciente, 'id'>;

// ===== Cita (Appointment) =====
export type Cita = {
  id: string;
  pacienteId: string;
  pacienteNombre: string;
  fecha: string;
  hora: string;
  motivo: string;
  duracion: string;
};

/** Draft version without id — used by the appointment form */
export type DraftCita = Omit<Cita, 'id'>;

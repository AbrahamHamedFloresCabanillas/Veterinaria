import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "./DatePicker";
import { usePacienteStore } from '../store/pacienteStore';

const Formulario = () => {
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente);
  const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente);
  const pacienteActivo = usePacienteStore((state) => state.pacienteActivo);
  const limpiarPacienteActivo = usePacienteStore((state) => state.limpiarPacienteActivo);

  const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      nombre: '',
      propietario: '',
      email: '',
      fecha: '',
      sintomas: ''
    }
  });

  useEffect(() => {
    if (pacienteActivo) {
      setValue('nombre', pacienteActivo.nombre);
      setValue('propietario', pacienteActivo.propietario);
      setValue('email', pacienteActivo.email);
      setValue('fecha', pacienteActivo.fecha);
      setValue('sintomas', pacienteActivo.sintomas);
    } else {
      reset();
    }
  }, [pacienteActivo, setValue, reset]);

  const registrarPaciente = (data) => {
    if (pacienteActivo) {
      actualizarPaciente(data);
    } else {
      agregarPaciente(data);
    }
    reset();
  };

  const handleCancelar = () => {
    limpiarPacienteActivo();
    reset();
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="w-full flex flex-col h-full">
      <div>
        <h2 className="font-extrabold text-2xl lg:text-3xl text-center text-slate-800">
          {pacienteActivo ? 'Editar Paciente' : 'Seguimiento Pacientes'}
        </h2>
        <p className="text-md mt-2 text-center mb-5 text-slate-600">
          {pacienteActivo ? 'Edita los datos del ' : 'Añade Pacientes y '}
          <span className="text-indigo-600 font-bold">
            {pacienteActivo ? 'Paciente' : 'Adminístralos'}
          </span>
        </p>
      </div>

      <form className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl py-6 px-5 border border-slate-100 flex-1 flex flex-col" onSubmit={handleSubmit(registrarPaciente)}>
        {hasErrors && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-r-md animate-fade-in text-sm">
                <p className="font-bold">Error</p>
                <p>Todos los campos son obligatorios</p>
            </div>
        )}

        <div className="mb-4 relative">
          <label className="block text-slate-700 font-semibold mb-1 xs:mb-2 text-sm xs:text-base" htmlFor="mascota">
            Nombre Mascota
          </label>
          <input
            type="text"
            id="mascota"
            placeholder="Ej. Firulais"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm xs:text-base"
            {...register('nombre', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 font-semibold mb-1 xs:mb-2 text-sm xs:text-base" htmlFor="propietario">
            Nombre Propietario
          </label>

          <input
            type="text"
            id="propietario"
            placeholder="Ej. Juan Pérez"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm xs:text-base"
            {...register('propietario', { required: true })}
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-slate-700 font-semibold mb-1 xs:mb-2 text-sm xs:text-base" htmlFor="email">
            Email Contacto
          </label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@correo.com"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm xs:text-base"
            {...register('email', { required: true })}
          />
        </div>

        <div className="mb-4 z-10 relative">
          <label className="block text-slate-700 font-semibold mb-1 xs:mb-2 text-sm xs:text-base" htmlFor="alta">
            Fecha de Alta
          </label>
          <Controller
            name="fecha"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="mb-5">
          <label className="block text-slate-700 font-semibold mb-1 xs:mb-2 text-sm xs:text-base" htmlFor="sintomas">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe brevemente los síntomas..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all min-h-[80px] lg:min-h-[100px] resize-none text-sm xs:text-base"
            {...register('sintomas', { required: true })}
          />
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
          >
            {pacienteActivo ? 'Guardar Cambios' : 'Agregar Paciente'}
          </button>
          
          {pacienteActivo && (
            <button
              type="button"
              onClick={handleCancelar}
              className="w-full py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors duration-200 flex items-center justify-center"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Formulario;
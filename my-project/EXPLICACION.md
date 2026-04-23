# Decisiones Arquitectónicas y Documentación Técnica (EXPLICACION)

Este documento detalla el análisis, las decisiones técnicas y de arquitectura implementadas para extender la aplicación de **Administración de Pacientes de Veterinaria** cumpliendo con los requisitos del examen, asegurando escalabilidad, mantenimiento de buenas prácticas en React y una perfecta integración con el ecosistema de Tailwind CSS.

---

## Tarea 1: Funcionalidad de Eliminación Avanzada
Se decidió extraer la lógica de eliminación directamente de `Paciente.jsx` para elevarla hacia `App.jsx` mediante retrasos (timers) y limpieza de los mismos. Esto permite gestionar un estado global del "Toast de Deshacer" (haciendo uso de `toastData` con la información del temporizador actual). El componente `ConfirmModal` fue creado de forma controlada por estado, evitando el bloqueo del hilo de ejecución que produce el método nativo `window.confirm`.

**Asistencia de IA utilizada:**  
La IA desempeñó un papel crucial al **escribir la lógica de temporización combinada con animaciones CSS/estado (Fade-out)** y, en especial, al crear la barra de progreso decreciente en el componente `ToastUndo.jsx`. La IA recomendó usar `requestAnimationFrame` en lugar de `setInterval` en un `useEffect` para lograr una animación a 60 fps absolutamente fluida en el navegador durante exactamente 5 segundos sin sobrecargar los re-renders de React.

---

## Tarea 2: Sistema de Exportación a PDF
Se optó por mantener este componente modular e invocar a librerías externas únicamente cuando es estrictamente necesario ("lazy logic"). La función principal está alojada dentro de `ListadoPacientes.jsx`, ya que este componente recibe las matrices de `pacientes` mediante *props*, facilitando su mapeo.

**Asistencia de IA utilizada:**  
La inteligencia artificial ayudó a estructurar la configuración necesaria de la librería **`jspdf-autotable`** para que las celdas se adaptaran correctamente a las descripciones potencialmente largas (como la columna "Síntomas") y para agregar estilos estéticos que coincidieran con la imagen de marca de la clínica (por ejemplo, los colores hex convertidos a RGB para cabeceras y filas alternas). También facilitó el cálculo y **formateo de la fecha actual** usando `toLocaleDateString('es-MX')` para asegurar la convención ortográfica correcta de los reportes.

---

## Tarea 3: Sistema Básico de Citas
A nivel arquitectónico, era importante no sobrescribir el estado existente de `pacientes`, por lo que se duplicó la lógica del Hook personalizado `useLocalStorage` para inicializar un array totalmente independiente llamado `citas` en `App.jsx`. Para una correcta experiencia visual sin forzar barras de desplazamiento dobles, se ajustó la estructura del DOM de `App.jsx` cambiando la clase principal de una pantalla fija (`h-screen overflow-hidden`) por un enfoque de página fluida (`min-h-screen`). 

**Asistencia de IA utilizada:**  
El uso de IA fue fundamental en el proceso de **desnormalización de datos del estado y estructura del formulario**. Al momento de que el usuario envía el formulario en `AgendarCita.jsx`, la IA ayudó a generar el fragmento de código que encuentra de forma proactiva al objeto Paciente padre asociado basándose en el Select, para extraer y guardar localmente `pacienteNombre` dentro de la propia Cita. Esto evita hacer consultas y cruces de estado complejos al momento de renderizar `CalendarioCitas.jsx`. Adicionalmente aportó un snippet básico para la generación de identificadores (IDs) únicos usando matemáticas aleatorias y fechas `Date.now()`.

---

> El código base existente no sufrió caídas, no alteró flujos de trabajo clave originales, y la UI se expandió adoptando las convenciones exactas del tailwind (sombrados, degradados, esquinas redondeadas clase -xl, y animaciones base) que el proyecto ya definía.

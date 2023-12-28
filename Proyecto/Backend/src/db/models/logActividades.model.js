import { Schema, model } from 'mongoose';

const logActividadSchema = new Schema(
    {
      timestamp: Date,
      actividad: String,
      idHabitacion: Number,
      idPaciente: Number
    }
);


const logActividades = model('log_actividades', logActividadSchema);

export default logActividades;
import { Schema, model } from 'mongoose';

const logHabitacionSchema = new Schema(
    {
      idHabitacion: Number,
      timestamp: Date,
      status: String
    }
);

const logHabitaciones = model('log_habitaciones', logHabitacionSchema);

export default logHabitaciones;
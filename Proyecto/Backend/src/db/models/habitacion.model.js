import { Schema, model } from 'mongoose';

const habitacionSchema = new Schema(
    {
      idHabitacion: Number,
      habitacion: String
    }
);


const habitaciones = model('habitaciones', habitacionSchema);

export default habitaciones;
import { Schema, model } from 'mongoose';

const pacienteSchema = new Schema(
    {
      idPaciente: Number,
      edad: Number,
      genero: String
    }
);

const pacientes = model('pacientes', pacienteSchema);

export default pacientes;
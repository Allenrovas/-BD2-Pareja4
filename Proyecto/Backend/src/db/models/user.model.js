import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: String,
    photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photos' },
    pdfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pdfs' }]
});

export const Users = model('Users', userSchema);
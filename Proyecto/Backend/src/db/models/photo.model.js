import mongoose, { Schema, model } from 'mongoose';

const photoSchema = new Schema(
    {
        user: String,
        name: String,
        content: Buffer
    },
    {
        timestamps: true
    }
);


const Photos = model('Photos', photoSchema);

export default Photos;
import mongoose, { Schema, model } from 'mongoose';

const photoSchema = new Schema(
    {
        name: String,
        content: { type: Buffer, contentType: String  }
    },
    {
        timestamps: true
    }
);


export const Photos = model('Photos', photoSchema);
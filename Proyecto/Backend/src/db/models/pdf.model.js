import mongoose, { Schema, model } from 'mongoose';

const pdfSchema = new Schema(
    {
        name: String,
        content: { type: Buffer, contentType: String  }
    },
    {
        timestamps: true
    }
);


export const PDFs = model('PDFs', pdfSchema);
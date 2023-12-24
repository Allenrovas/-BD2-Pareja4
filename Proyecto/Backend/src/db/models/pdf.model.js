import mongoose, { Schema, model } from 'mongoose';

const pdfSchema = new Schema(
    {
        user: String,
        name: String,
        content: Buffer
    },
    {
        timestamps: true
    }
);


const PDFs = model('PDFs', pdfSchema);

export default PDFs;
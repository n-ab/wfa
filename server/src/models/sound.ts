import * as mongoose from 'mongoose';

export interface SoundObject extends mongoose.Document {
    _id: any,
    title: string,
    status: string,
    keywords: string[],
    description: string,
    filePath: string,
    library: string,
    misc: string,
    length: number,
    price: number,
    discount: number,
    fileType: string,
    bitRate: string,
    sampleRate: string,
}

const schema = new mongoose.Schema({
    title: String,
    status: String,
    keywords: [String],
    description: String,
    filePath: String,
    library: String,
    misc: String,
    length: Number,
    price: Number,
    discount: Number,
    fileType: String,
    bitRate: String,
    sampleRate: String,
    }, { timestamps: true }
);

export const Sound = mongoose.model<SoundObject>('Sound', schema);
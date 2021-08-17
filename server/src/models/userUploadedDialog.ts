import * as mongoose from 'mongoose';

export interface UserUploadedDialogObject extends mongoose.Document {
    _id: any,
    title: string,
    projectNumber: string,
    fileType: string,
    userUploadedDialog: boolean,
    userId: string,
    status: string,
    filePath: string,
}

const schema = new mongoose.Schema({
    title: String,
    projectNumber: String,
    fileType: String,
    userUploadedDialog: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    filePath: String,
    }, { timestamps: true }
);

export const UserUploadedDialogModel = mongoose.model<UserUploadedDialogObject>('UserUploadedDialog', schema);
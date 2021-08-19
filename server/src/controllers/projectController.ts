import * as mongoose from 'mongoose';
import { ProjectModel } from '../models/project';

export function createNewProject(data: any) {
    console.log('----------------------------------');
    console.log('PRE createNewProject(): ', data);
    data.contactEmail1 = data.email;
    data.firstMessageFrom = data.name;
    delete data.name;
    delete data.email;
    console.log('POST going into createNewProject(): ', data);
    console.log('----------------------------------');
    return ProjectModel.findOneAndUpdate(data, {$set: {newProject: data}}, {new: true, upsert: true})
        .then(project => {
            project.save();
            console.log('NEW PROJECT SAVED AS: ', project);
            return project;
        })
        .catch(err => console.log('error with creating project model: ', err));
}

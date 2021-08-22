import * as mongoose from 'mongoose';
import { ProjectModel } from '../models/project';

export function createNewProject(data: any) {
    data.contactEmail1 = data.email;
    data.firstMessageFrom = data.name;
    delete data.name;
    delete data.email;
    return ProjectModel.findOneAndUpdate(data, {$set: {newProject: data}}, {new: true, upsert: true})
        .then(project => {
            project.save();
            return project;
        })
        .catch(err => console.log('error with creating project model: ', err));
}

export function fetchProject(email: string) {
    console.log('email: ', email);
    return ProjectModel.find({contactEmail1: email})
    .then(project => {
        console.log('IN CONTROLLER: project found: ', project);
        return project;
    }).catch(err => {
        console.log('error finding project = ', err);
        return err;
    });
}

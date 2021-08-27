import { HttpClient, HttpParams,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models';
import { Note } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  fetchProject(query: string): Promise<Project> {
    return this.http.get('/api/project/fetchProject', {params: {query}}).toPromise()
      .then(project => project)
      .catch(err => err);
  }

  fetchProjectWithProjectId(id: string): Promise<Project> {
    return this.http.get(`/api/project/${id}`).toPromise()
      .then(project => project)
      .catch(err => err);
  }

  fetchProjectNotes(projectId: any): Promise<Note[]> {
    console.log('projectId', projectId);
    return this.http.get('/api/project/fetchNotes', {params: {projectId}}).toPromise()
      .then(notes => { console.log('notes returned from server = ', notes); return notes;})
      .catch(err => err);
  }

  addProjectNote(data: any, ): Promise<Note> {
    return this.http.post('/api/project/addNote', data).toPromise()
      .then(note => note)
      .catch(err => err);
  }
}

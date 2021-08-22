import { HttpClient, HttpParams,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  fetchProject(email: string): Promise<Project> {
    console.log('params = ', email);
    return this.http.get('/api/project/fetch', {params: {email}}).toPromise()
      .then(project => {
        console.log('project returned from server: ', project);
        return project;
      })
      .catch(err => err);
  }
}

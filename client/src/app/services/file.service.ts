import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(data: object): Promise<any> {
    console.log('data: ', data);
    const postData = new FormData();
    postData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
    return this.http.post('/api/file/upload', postData).toPromise()
      .then(file => console.log(`file ${file} was successfully uploaded.`))
      .catch(err => console.log('err: ', err));
  }
}

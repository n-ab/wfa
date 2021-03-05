import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  appJson = new HttpHeaders({ 'Content-Type': 'application/json' });
  multipartForm = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http: HttpClient, public audioContext: AudioContext) { }

  uploadFile(data: any): Promise<any> {
    const audioShit = this.audioContext.decodeAudioData(data.audioFile);
    console.log('audioShit = ', audioShit);
    console.log('data: ', data.audioFile);
    const postData = new FormData();
    postData.append('title', data.title);
    postData.append('description', data.description);
    postData.append('keywords', data.keywords);
    postData.append('price', data.price);
    postData.append('library', data.library);
    postData.append('misc', data.misc);
    postData.append('audioFile', data.audioFile);
    return this.http.post('/api/file/upload', postData).toPromise()
      .then(file => console.log(`file ${file} was successfully uploaded.`))
      .catch(err => console.log('err: ', err));
  }
}

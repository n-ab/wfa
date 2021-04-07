import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sound } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private http: HttpClient) { }

  fetchSounds(searchQuery: string, searchBy: string): any {
    return this.http.get('/api/sound/fetch', {params: {searchQuery, searchBy}}).toPromise()
      .then(sounds => {
        return sounds;
      })
      .catch(err => {
        console.log('error gathering your shit bro...');
        return err;
      });
  }

}
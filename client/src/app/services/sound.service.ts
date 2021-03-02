import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sound } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private http: HttpClient) { }

  fetchSounds(searchQuery: string, searchBy: string): Promise<Sound[]> {
    console.log('fetching sounds with string: ', searchQuery);
    return this.http.get('/api/sound/fetch', {params: {searchQuery, searchBy}}).toPromise()
      .then(soundList => {
        console.log('');
        return soundList;
      })
      .catch(err => err);
  }
}

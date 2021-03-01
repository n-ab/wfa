import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sound } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  soundList: Sound[] = [];

  constructor(private http: HttpClient) { }

  fetchSounds(searchQuery: string): Promise<Sound[]> {
    console.log('fetching sounds with string: ', searchQuery);
    const queryParams = {
      searchQuery,
      searchBy: 'name'
    }
    return this.http.get('/api/sound/fetch', {headers: {searchQuery, searchBy: 'name'}}).toPromise()
      .then(soundList => {
        console.log('sound list found: ', soundList);
        return soundList;
      })
      .catch(err => err);
  }
}

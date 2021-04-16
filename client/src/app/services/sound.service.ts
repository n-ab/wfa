import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sound } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private http: HttpClient) { }

  fetchSounds(searchQuery: any, searchBy: string): Promise<object> {
    if (searchQuery && searchBy) { console.log('fetching sounds with', searchQuery.query + ' and ', searchBy); }
    else { console.log('fetching entire sound library.'); }
    const query = searchQuery.query;
    return this.http.get('/api/sound/fetch', {params: {query, searchBy}}).toPromise()
      .then(sounds => {
        return sounds;
      })
      .catch(err => {
        console.log('error gathering your shit bro...');
        return err;
      });
  }

}

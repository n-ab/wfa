import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sound } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  sounds: Observable<Sound[]> = new Observable<Sound[]>();

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

  // calling this 'Items' instead of 'Sounds' to make it easily copy-able
  returnItemsBy(selection: string, searchQuery: string): Promise<Sound[]> {
    switch (selection) {
      case 'name':
        return this.http.get('/api/sound/findByName', {params: {searchQuery}}).toPromise()
          .then(soundList => soundList)
          .catch(err => err);
      case 'keyword':
        return this.http.get('/api/sound/findByKeyword', {params: {searchQuery}}).toPromise()
          .then(soundList => soundList)
          .catch(err => err);
      case 'library':
        return this.http.get('/api/sound/findByLibrary', {params: {searchQuery}}).toPromise()
          .then(soundList => soundList)
          .catch(err => err);
      case 'any':
        return this.http.get('/api/sound/findByAny', {params: {searchQuery}}).toPromise()
          .then(soundList => soundList)
          .catch(err => err);
      // all switch statements need default values in typescript --strict
      default: throw new Error('derrr');
    }
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sound } from 'src/app/models';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-soundlist',
  templateUrl: './soundlist.component.html',
  styleUrls: ['./soundlist.component.scss']
})
export class SoundlistComponent implements OnInit, AfterViewInit {

  soundShit: Sound[] = [];
  soundList = true;

  constructor(private soundService: SoundService) {

  }

  ngOnInit(): void {
    this.compileSoundList('');
  }

  ngAfterViewInit(): void {
    this.prepSearchBars();
  }

  prepSearchBars(): void {
    this.prepNameSearchBar();
    this.prepKeywordSearchBar();
    this.prepLibrarySearchBar();
    this.prepAnySearchBar();
  }

  prepNameSearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('name-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

  prepKeywordSearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('keyword-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

  prepLibrarySearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('library-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

  prepAnySearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('any-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

  search(query: string): void {
    this.compileSoundList(query);
  }

  // USING PROMISE

  async compileSoundList(searchQuery: string): Promise<any> {
    const soundList = await this.soundService.fetchSounds(searchQuery, 'name');
    this.soundShit = soundList;
    return soundList;
  }
}

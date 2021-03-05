import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Sound } from 'src/app/models';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-soundlist',
  templateUrl: './soundlist.component.html',
  styleUrls: ['./soundlist.component.scss']
})
export class SoundlistComponent implements OnInit, AfterViewInit {

  soundList: Sound[] = [];
  soundListUp = false;

  constructor(private soundService: SoundService) { }

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
      this.soundList.splice(0, this.soundList.length);
      this.soundList = [];
      this.soundListUp = false;
      console.log('event: ', event);
    });
  }

  prepKeywordSearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('keyword-search-input');
    searchbar?.addEventListener('input', event => {
      this.soundList.splice(0, this.soundList.length);
      this.soundListUp = false;
      console.log('event: ', event);
    });
  }

  prepLibrarySearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('library-search-input');
    searchbar?.addEventListener('input', event => {
      this.soundList.splice(0, this.soundList.length);
      this.soundList = [];
      this.soundListUp = false;
      console.log('event: ', event);
    });
  }

  prepAnySearchBar(): void {
    const result = document.getElementById('derrr');
    const searchbar = document.getElementById('any-search-input');
    searchbar?.addEventListener('input', event => {
      this.soundList.splice(0, this.soundList.length);
      this.soundList = [];
      this.soundListUp = false;
      console.log('event: ', event);
    });
  }

  search(query: string): void {
    this.compileSoundList(query);
  }

  async compileSoundList(searchQuery: string): Promise<Sound[]> {
    const soundList = await this.soundService.fetchSounds(searchQuery, 'name');
    this.soundList = soundList;
    console.log('this.soundList INITIAL = ', this.soundList);
    this.soundList = Object.values(soundList);
    console.log('this.soundList = ', this.soundList);
    this.soundListUp = true;
    return soundList;
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sound } from 'src/app/models';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-soundlist',
  templateUrl: './soundlist.component.html',
  styleUrls: ['./soundlist.component.scss']
})
export class SoundlistComponent implements OnInit, AfterViewInit {

  soundList: Sound[] = [];
  soundsWereFound = false;
  searchByNameForm: FormGroup;
  searchByKeywordForm: FormGroup;
  searchByLibraryForm: FormGroup;
  searchByAnyForm: FormGroup;
  regexQuery = '';
  regex = new RegExp(`${this.regexQuery}/gm`);

  constructor(private soundService: SoundService) {
    this.searchByNameForm = new FormGroup({ query: new FormControl(null) });
    this.searchByKeywordForm = new FormGroup({ query: new FormControl(null) });
    this.searchByLibraryForm = new FormGroup({ query: new FormControl(null) });
    this.searchByAnyForm = new FormGroup({ query: new FormControl(null) });
  }

  ngOnInit(): void {
    this.compileSoundList('');
  }

  ngAfterViewInit(): void {
    this.prepSearchBars();
  }

  prepSearchBars(): void {
    setTimeout(() => {
      this.prepNameSearchBar();
    }, 100);
  }

  prepNameSearchBar(): void {
    const searchbar = document.getElementById('name-search-input');
    searchbar?.addEventListener('keyup', event => {
      console.log('#$&%*#$(&*&*(#$)) === ', event);
    });
  }

  prepKeywordSearchBar(): void {
    const searchbar = document.getElementById('keyword-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

  prepLibrarySearchBar(): void {
    const searchbar = document.getElementById('library-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

  prepAnySearchBar(): void {
    const searchbar = document.getElementById('any-search-input');
    searchbar?.addEventListener('input', event => {
      console.log('event: ', event);
    });
  }

// FILTERING DATA --------------------------------

  async searchQueryEntered(event: Event, filterBy: string): Promise<any> {
    if ((event.target as HTMLInputElement).value != null) {
      switch (filterBy) {
        case 'name':
          console.log('filter by NAME: ', (event.target as HTMLInputElement).value);
          this.regexQuery.concat((event.target as HTMLInputElement).value);
          break;
        case 'keyword':
          console.log('filter by KEYWORD: ', (event.target as HTMLInputElement).value);
          this.regexQuery.concat((event.target as HTMLInputElement).value);
          break;
        case 'library':
          console.log('filter by LIBRARY: ', (event.target as HTMLInputElement).value);
          this.regexQuery.concat((event.target as HTMLInputElement).value);
          break;
        case 'any':
          console.log('filter by ANY: ', (event.target as HTMLInputElement).value);
          this.regexQuery.concat((event.target as HTMLInputElement).value);
          break;
        default:
          break;
      }
    }
    const dataEntered = (event.target as HTMLInputElement).value;
    this.regexQuery.concat(dataEntered);
    console.log(this.regexQuery);
  }

  filterResults(filter: 'name' | 'keyword' | 'library' | 'any', searchCharacter: any): any {
    console.log('searchCharacter: ', searchCharacter);
    console.log('filter: ', filter);
    this.soundList.filter(sound => {
      // console.log('sound FILTER: ', sound);
    });
  }

// ------------------------------------------------

  searchByName(): void {
    const form = this.searchByNameForm.getRawValue();
    // console.log('attempting to search with: ', form + ' with \'name\' filter.');
    return this.search(form, 'name');
  }

  searchByKeyword(): void {
    const form = this.searchByKeywordForm.getRawValue();
    return this.search(form, 'keyword');
  }

  searchByLibrary(): void {
    const form = this.searchByLibraryForm.getRawValue();
    return this.search(form, 'library');
  }

  searchByAny(): void {
    const form = this.searchByAnyForm.getRawValue();
    return this.search(form, 'any');
  }

  search(query: string, filter: string): void {
    // console.log('searching using query: ', query + ' with filter: ', filter);
    this.soundService.fetchSounds(query, filter);
  }

  // USING PROMISE

  async compileSoundList(searchQuery: string): Promise<any> {
    const soundsReturned = await this.soundService.fetchSounds(searchQuery, '');
    this.soundList = Object.values(soundsReturned);
    this.soundsWereFound = true;
    return soundsReturned;
  }
}

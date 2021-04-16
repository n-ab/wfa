import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  newSoundList: Sound[] = [];
  soundsWereFound = false;
  searchByNameForm: FormGroup;
  searchByKeywordForm: FormGroup;
  searchByLibraryForm: FormGroup;
  searchByAnyForm: FormGroup;
  regexQuery = '';
  showFullSoundList = true;
  showFilteredSoundList = false;

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
      console.log('this.regexQuery.length = ', this.regexQuery.length);
      // tslint:disable-next-line:max-line-length
      if (event.key !== 'Shift' && event.key !== 'Alt' && event.key !== 'Meta' && event.key !== 'Control' && event.key !== 'Escape' && event.key !== 'Enter') {
        if (event.key === 'Backspace') {
          this.regexQuery = this.regexQuery.slice(0, -1);
          this.filterResults('name');
        }
        if (event.key !== 'Backspace') {
          this.regexQuery += event.key;
          this.filterResults('name');
        }
      }
    });
  }

// FILTERING DATA --------------------------------

filterResults(filter: 'name' | 'keyword' | 'library' | 'any'): any {
  console.log('searching for :', this.regexQuery);
  console.log('showFilteredSounds: ', this.showFilteredSoundList);
  console.log('showFullSoundList: ', this.showFullSoundList);
  console.log('this.soundList BEFORE', this.soundList);
  this.soundList.map(sound => {
    const regex = new RegExp(`${this.regexQuery}`, 'i');
    if (regex.test(sound.title)) {
      this.showFullSoundList = false;
      if (!this.newSoundList.includes(sound)) {
        this.newSoundList.push(sound);
        console.log('this.soundList AFTER', this.soundList);
        console.log('*** this.newSoundList:', this.newSoundList);
      }
      this.showFilteredSoundList = true;
    }
  });
}

  async searchQueryEntered(event: Event, filterBy: string): Promise<any> {
    // if ((event.target as HTMLInputElement).value != null) {
    //   switch (filterBy) {
    //     case 'name':
    //       console.log('filter by NAME: ', (event.target as HTMLInputElement).value);
    //       this.regexQuery.concat((event.target as HTMLInputElement).value);
    //       break;
    //     case 'keyword':
    //       console.log('filter by KEYWORD: ', (event.target as HTMLInputElement).value);
    //       this.regexQuery.concat((event.target as HTMLInputElement).value);
    //       break;
    //     case 'library':
    //       console.log('filter by LIBRARY: ', (event.target as HTMLInputElement).value);
    //       this.regexQuery.concat((event.target as HTMLInputElement).value);
    //       break;
    //     case 'any':
    //       console.log('filter by ANY: ', (event.target as HTMLInputElement).value);
    //       this.regexQuery.concat((event.target as HTMLInputElement).value);
    //       break;
    //   }
    // }
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

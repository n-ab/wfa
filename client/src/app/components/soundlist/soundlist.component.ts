import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PassThrough } from 'node:stream';
import { Sound } from 'src/app/models';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-soundlist',
  templateUrl: './soundlist.component.html',
  styleUrls: ['./soundlist.component.scss']
})
export class SoundlistComponent implements OnInit, AfterViewInit {

  searchByNameForm: FormGroup;
  searchByKeywordForm: FormGroup;
  searchByLibraryForm: FormGroup;
  searchByAnyForm: FormGroup;
  validSearchEntries: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];

  soundsWereFound = false;

  soundList: Sound[] = [];          // whole sound list
  soundListQueue: Sound[] = [];     // what your search results yielded
  newSoundList: Sound[] = [];       // filtered sound list
  searchQueryArray: string[] = [];  // user input

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
      this.prepNameSearchBarr();
    }, 100);
  }

// FILTERING DATA --------------------------------

prepNameSearchBarr(): void {
  const searchBar = document.getElementById('name-search-input');
  searchBar?.addEventListener('keydown', event => {
    if (event.key === 'Backspace' || event.code === 'Backspace') {  this.handleBackspace(); } // user hit backspace
    if (this.validSearchEntries.includes(event.key)) {              this.handleValidEntry(event.key); }// user made valid entry
  });
}

handleValidEntry(eventKey: string): void {
  console.log('++ HANDLING INPUT ...');
  if (this.searchQueryArray.length === 0) {
    // user started searching for something
    this.searchQueryArray.push(eventKey);
    this.mapSounds();
  } else {
    // user added to search query
    this.searchQueryArray[0] += eventKey;
    this.mapSounds();
  }
}

mapSounds(): void {
  this.soundList.map((sound, index) => {
    if (this.testRegex(sound)) { this.putSoundInQueue(sound); }
  });
  console.log('sound queue ', this.soundListQueue);
  this.newSoundList.length = 0;
  this.newSoundList.push(...this.soundListQueue);
  this.soundListQueue.length = 0;
  console.log('new sound list', this.newSoundList);
  this.showFullSoundList = false;
  this.showFilteredSoundList = true;
}

testRegex(sound: Sound): boolean {
  if (RegExp(`${this.searchQueryArray}`, 'i').test(sound.title)) { return true; }
  return false;
}

putSoundInQueue(sound: Sound): void {
  this.soundListQueue.push(sound);
}

replaceSoundListWithQueue(): void {
  this.newSoundList.length = 0;
  this.newSoundList = this.soundListQueue;
  this.showFullSoundList = false;
  this.showFilteredSoundList = true;
}

handleBackspace(): void {
  console.log('-- HANDLING BACKSPACE ...');
  console.log('searchQueryArray = ', this.searchQueryArray);
  const placeToTakeCharacterOff = this.searchQueryArray[this.searchQueryArray.length - 1];
  this.searchQueryArray[0] = '';
  this.newSoundList = [];
  this.soundListQueue = [];
  this.showFilteredSoundList = false;
  this.showFullSoundList = true;
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

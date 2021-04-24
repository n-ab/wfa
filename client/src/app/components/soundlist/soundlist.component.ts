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

  admin = false;

  searchByNameForm: FormGroup;
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
  if (this.searchQueryArray.length === 0) {
    this.searchQueryArray.push(eventKey);
    this.mapSounds();
  } else {
    this.searchQueryArray[0] += eventKey;
    this.mapSounds();
  }
}

mapSounds(): void {
  this.soundList.map((sound, index) => { if (this.testRegex(sound)) { this.putSoundInQueue(sound); } });
  this.newSoundList.length = 0;
  this.newSoundList.push(...this.soundListQueue);
  this.soundListQueue.length = 0;
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
  console.log('this.searchQueryArray = ', this.searchQueryArray);
  this.searchQueryArray[0] = this.searchQueryArray[0].substr(0, this.searchQueryArray[0].length - 1);
  console.log('this.searchQueryArray = ', this.searchQueryArray);
  this.mapSounds();
}

// ------------------------------------------------

  searchByName(): void {
    const form = this.searchByNameForm.getRawValue();
    // console.log('attempting to search with: ', form + ' with \'name\' filter.');
    return this.search(form, 'name');
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

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  searchByNameForm: FormGroup;
  searchByKeywordForm: FormGroup;
  searchByLibraryForm: FormGroup;
  searchByAnyForm: FormGroup;

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
  }

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
    const soundList = await this.soundService.fetchSounds(searchQuery, '');
    this.soundShit = Object.values(soundList);
    return soundList;
  }
}

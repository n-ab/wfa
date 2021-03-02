import { Component, OnInit } from '@angular/core';
import { Sound } from 'src/app/models';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-soundlist',
  templateUrl: './soundlist.component.html',
  styleUrls: ['./soundlist.component.scss']
})
export class SoundlistComponent implements OnInit {

  soundList: Sound[] = [];

  constructor(private soundService: SoundService) { }

  ngOnInit(): void {
    this.compileSoundList('');
  }

  search(query: string): void {
    this.compileSoundList(query);
  }

  async compileSoundList(searchQuery: string): Promise<Sound[]> {
    const soundList = await this.soundService.fetchSounds('');
    this.soundList = soundList;
    return soundList;
  }
}

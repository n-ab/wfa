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
    this.soundService.fetchSounds('')
      .then(soundList => soundList);
  }

  search(query: string): Sound[] {
    this.soundService.fetchSounds(query);
    return [];
  }

}

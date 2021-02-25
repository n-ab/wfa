import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-soundadd',
  templateUrl: './soundadd.component.html',
  styleUrls: ['./soundadd.component.scss']
})
export class SoundaddComponent implements OnInit {

  addSoundForm: FormGroup;
  audioPreview = '';
  audioFile: File;

  constructor(private router: Router, ) {
    this.addSoundForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      keywords: new FormControl(null),
      price: new FormControl(null),
      library: new FormControl(null),
      misc: new FormControl(null),
    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-soundadd',
  templateUrl: './soundadd.component.html',
  styleUrls: ['./soundadd.component.scss']
})
export class SoundaddComponent implements OnInit {

  addSoundForm: FormGroup;
  audioPreview = '';

  constructor(private router: Router, private fileService: FileService, public audioContext: AudioContext) {
    this.addSoundForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      keywords: new FormControl(null),
      price: new FormControl(null),
      library: new FormControl(null),
      misc: new FormControl(null),
      audioFile: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  soundSelected(event: Event): void {
    // tslint:disable-next-line:no-non-null-assertion
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const file = (event.target as HTMLInputElement).files![0];
      this.addSoundForm.patchValue({audioFile: file});
      console.log('file = ', file);
      // tslint:disable-next-line:no-non-null-assertion
      this.addSoundForm.get('audioFile')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        // tslint:disable-next-line:no-non-null-assertion
        this.audioPreview = reader.result!.toString();
      };
      if (file) {
        reader.readAsDataURL(file);
        const source = this.audioContext.createBufferSource().context;
        console.log('this.audioContext.createBufferSource().context: ', source);
      }
    }
  }

  uploadSound(): void {
    this.fileService.uploadFile(this.addSoundForm.getRawValue());
  }

}

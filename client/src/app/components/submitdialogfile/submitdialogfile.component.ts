import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-submitdialogfile',
  templateUrl: './submitdialogfile.component.html',
  styleUrls: ['./submitdialogfile.component.scss']
})
export class SubmitdialogfileComponent implements OnInit {

  addAudioFile: FormGroup;
  audioPreview = '';

  constructor(private router: Router, private fileService: FileService, public audioContext: AudioContext) {
    this.addAudioFile = new FormGroup({
      title: new FormControl('', Validators.required),
      projectNumber: new FormControl('', Validators.required),
      audioFile: new FormControl(null),
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  submitDialog(): void {
    this.fileService.dialogUpload(this.addAudioFile.getRawValue());
  }

  soundSelected(event: Event): void {
    // tslint:disable-next-line:no-non-null-assertion
    const reee = document.getElementById('lil-container');
    reee?.classList.add()
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const file = (event.target as HTMLInputElement).files![0];
      this.addAudioFile.patchValue({audioFile: file});
      console.log('file = ', file);
      // tslint:disable-next-line:no-non-null-assertion
      this.addAudioFile.get('audioFile')!.updateValueAndValidity();
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

}

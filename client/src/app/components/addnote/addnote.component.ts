import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {

  @Input() projectId = '';

  addNoteForm: FormGroup;

  constructor(private projectService: ProjectService) {
    this.addNoteForm = new FormGroup({
      header: new FormControl(null),
      content: new FormControl(null),
      postedBy: new FormControl(null),
      to: new FormControl(null),
      ofDiscussion: new FormControl(null),
      ofProject: new FormControl(null),
      dateOfCreation: new FormControl(null),
      starred: new FormControl(null),
      
    })
  }

  ngOnInit(): void {
    console.log('this.projectId = ', this.projectId);
  }

  submitNote(): void {
    this.addNoteForm.patchValue({ ofProject: `${this.projectId}` });
    this.projectService.addProjectNote(this.addNoteForm.getRawValue());
    return;
  }

}

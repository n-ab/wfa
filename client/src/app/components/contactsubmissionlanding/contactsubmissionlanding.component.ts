import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models';
import { Note } from '../../models';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contactsubmissionlanding',
  templateUrl: './contactsubmissionlanding.component.html',
  styleUrls: ['./contactsubmissionlanding.component.scss']
})
export class ContactsubmissionlandingComponent implements OnInit {
  
  projectData: string[] = [];
  query = '';
  email = '';
  project!: Project;
  turnaroundDate = '';
  notes!: Note[];
  showingNoteForm = false;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    const params = Object.values(this.route.snapshot.queryParams);
    let isEmail: boolean;
    if(params.indexOf('@') === -1) { 
      console.log('using PROJECTID to fetch project.');
      isEmail = false;
    } else {
      console.log('using EMAIL to fetch project.');
      isEmail = true;
    }
    console.log('isEmail = ', isEmail);
    for(let i = 0; i< params.length; i++) { this.email += params[i]; }
    console.log('using email: ', this.email);
    this.projectService.fetchProject(this.email)
      .then(project => {
        this.project = project;
        this.query = project.contactEmail1;
        const turnaround = this.project.turnaroundGoal;
        this.turnaroundDate = moment(this.project.turnaroundGoal).format('LLLL');
        console.log('this.project.notes = ', this.project.notes);
        const notesArray: any = this.project.notes;
        this.notes = notesArray;
      })
      .catch(err => {
        console.log('error fetching project via service: ', err);
        return err;
      });
  }

  fetchNotes(notes: any) {
    this.projectService.fetchProjectNotes(this.project._id)
    .then(notes => {
      console.log('notes from project service = ', notes);
      this.setNotes(notes);
    });
  }

  setNotes(project: any): void {
    console.log('project.notes = ', project.notes);
    this.notes = project.notes;
    console.log('this.notes = ', this.notes);
  }

  // addNewNote(): void {
  //   console.log('reeee add new note');
  //   this.router.navigate(['/add-note'], {queryParams: this.project._id});
  // }

  showNoteForm(): void {
    this.showingNoteForm = true;
  }

  hideNoteForm(): void {
    this.showingNoteForm = false;
  }

}

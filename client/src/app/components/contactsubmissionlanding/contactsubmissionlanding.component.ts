import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models';

@Component({
  selector: 'app-contactsubmissionlanding',
  templateUrl: './contactsubmissionlanding.component.html',
  styleUrls: ['./contactsubmissionlanding.component.scss']
})
export class ContactsubmissionlandingComponent implements OnInit {
  
  projectData: string[] = [];
  email = '';
  project!: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    const params = Object.values(this.route.snapshot.queryParams);
    console.log('params in contactSubmissionLanding: ', params);
    for(let i = 0; i< params.length; i++) {
      this.email += params[i];
    }
    this.projectService.fetchProject(this.email)
      .then(project => {
        console.log('project.contactEmail: ', project.contactEmail1);
        this.project = project;
        console.log('this.project SET AS = ', this.project);
      })
      .catch(err => {
        console.log('error fetching project via service: ', err);
        return err;
      })
  }

  setProject(project: any): void {
    this.project = project;
  }

}

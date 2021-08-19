import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contactsubmissionlanding',
  templateUrl: './contactsubmissionlanding.component.html',
  styleUrls: ['./contactsubmissionlanding.component.scss']
})
export class ContactsubmissionlandingComponent implements OnInit {
  
  projectData: string[] = [];
  queryParams!: {project: any, response: any};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('snapshot queryParams = ', this.route.snapshot.queryParams);
    this.queryParams.project = this.route.snapshot.queryParams['project'];
    this.queryParams.response = this.route.snapshot.queryParams['response'];
    console.log('this.queryParams = ', this.queryParams);
    
  }

}

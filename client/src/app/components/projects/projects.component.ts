import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  iframeSrc!: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    const id = '';
    const url = '';
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
  }

}

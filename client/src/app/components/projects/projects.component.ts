import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  iframeSrc!: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    const id = '';
    const url = '';
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.showScroll();
    }, 1000);
  }

  ngAfterViewInit(): void {
    const hr1 = document.getElementById('hr1');
    const hr2 = document.getElementById('hr2');
    const hr3 = document.getElementById('hr3');
    console.log('window width: ', window.innerWidth);
    // small screens
    if (window.innerWidth < 614) {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 2242) {
          hr1?.classList.add('hr-effect');
        }
        if (window.scrollY >= 3088) {
          hr2?.classList.add('hr-effect');
        }
        if (window.scrollY >= 3937) {
          hr3?.classList.add('hr-effect');
        }
      })
    }
    // medium screens
    if (window.innerWidth >= 615 && window.innerWidth < 899) {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 1945) {
          hr1?.classList.add('hr-effect');
        }
        if (window.scrollY >= 2675) {
          hr2?.classList.add('hr-effect');
        }
        if (window.scrollY >= 3400) {
          hr3?.classList.add('hr-effect');
        }
      })
    }
    // large screens
    if (window.innerWidth > 900) {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 2341) {
          hr1?.classList.add('hr-effect');
        }
        if (window.scrollY >= 3174) {
          hr2?.classList.add('hr-effect');
        }
        if (window.scrollY >= 4050) {
          hr3?.classList.add('hr-effect');
        }
      })
    }
  }

  showScroll(): void {
    console.log('current height: ', window.scrollY);
  }

}

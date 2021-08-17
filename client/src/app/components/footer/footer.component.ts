import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  searchQuery: FormGroup;

  constructor(private router: Router) {
    this.searchQuery = new FormGroup({
      query: new FormControl(null)
    })
  }

  ngOnInit(): void {
  }

  search(): void {
    console.log('attempting to search with query: ', this.searchQuery.controls['query'].value);
    const searchQuery = this.searchQuery.controls['query'].value;
    this.router.navigateByUrl('soundlist', searchQuery);
  }

}

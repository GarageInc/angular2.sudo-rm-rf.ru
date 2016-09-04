import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';


@Component({
  selector: 'my-main',
  templateUrl: 'app/views/about/about.component.html',
  styleUrls: ['app/assets/css/about.component.css']
})


export class AboutComponent implements OnInit {


  constructor(
    protected _router: Router
  ) {
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Graph } from './models/graphs/graph';
import { GraphService } from './services/graph.service';
import {UserService} from "./services/user.service";

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/views/dashboard.component.html',
  styleUrls: ['app/assets/css/dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  graphs: Graph[] = [];

  constructor(
    protected _router: Router,
    protected _graphService: GraphService,
    protected _userService: UserService) {
  }

  ngOnInit() {
    this._graphService.getGraphs()
      .then(graphs => this.graphs = graphs);
  }

  goToDetail(graph: Graph) {
    let link = ['GraphDetail', { id: graph.id }];
    this._router.navigate( link);
  }
}

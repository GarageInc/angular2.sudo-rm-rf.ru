import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Graph } from './models/graph';
import { GraphService } from './services/graph.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/views/dashboard.component.html',
  styleUrls: ['app/assets/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  graphs: Graph[] = [];

  constructor(
    private _router: Router,
    private _graphService: GraphService) {
  }

  ngOnInit() {
    this._graphService.getGraphs()
      .then(graphs => this.graphs = graphs.slice(1,5));
  }

  gotoDetail(graph: Graph) {
    let link = ['HeroDetail', { id: graph.id }];
    this._router.navigate(link);
  }
}

import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Graph } from './../../models/graph';
import { GraphService } from './../../services/graph.service';

@Component({
  selector: 'my-graph-detail',
  templateUrl: 'app/components/graphs/views/graphs/graph-detail.component.html',
  styleUrls: ['app/assets/css/graph-detail.component.css']
})

export class GraphDetailComponent implements OnInit {

  @Input() graph: Graph;

  constructor(
    private _graphService: GraphService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._graphService.getGraph(id)
      .then(graph => this.graph = graph);
  }

  goBack() {
    window.history.back();
  }
}

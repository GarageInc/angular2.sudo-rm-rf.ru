import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Graph } from './../../models/graph';
import { GraphService } from './../../services/graph.service';

@Component({
  selector: 'my-graphs',
  templateUrl: 'app/views/graphs/graphs.component.html',
  styleUrls:  ['app/assets/css/graphs.component.css']
})

export class GraphsComponent implements OnInit {
  graphs: Graph[];
  selectedGraph: Graph;

  constructor(
    private _router: Router,
    private _graphService: GraphService
  ) { }

  getHeroes() {
    this._graphService.getGraphs().then(graphs => this.graphs = graphs);
    console.log(this.graphs)
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(graph: Graph) { this.selectedGraph = graph; }

}

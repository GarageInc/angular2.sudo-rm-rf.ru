import { Component, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';

import { Graph } from '../../models/graphs/graph';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'my-graphs',
  templateUrl: 'app/views/graphs/mygraphs.component.html',
  styleUrls:  ['app/assets/css/graphs.component.css'],
  directives: [
      RouterLink
  ]
})

export class MyGraphsComponent implements OnInit {
  graphs: Graph[];
  selectedGraph: Graph;

  constructor(
    protected _router: Router,
    protected _graphService: GraphService
  ) { }

  getGraphs() {
    this._graphService.getMyGraphs()
        .then(graphs => this.graphs = graphs, error => this._router.navigate(['Login']));
  }

  ngOnInit() {
    this.getGraphs();
  }

  onSelect(graph: Graph) { this.selectedGraph = graph; }


  goToDetail(graph: Graph) {
    let link = ['GraphDetail', { id: this.selectedGraph.id }];
    this._router.navigate( link);
  }
}

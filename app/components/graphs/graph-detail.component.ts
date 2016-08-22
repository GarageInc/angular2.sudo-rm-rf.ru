import {Component, Input, OnInit, ElementRef} from 'angular2/core';
import { RouteParams } from 'angular2/router';

// import * as D3 from 'd3/index';

import { Graph } from './../../models/graph';
import { GraphService } from './../../services/graph.service';

import * as Moment from 'moment';
import {BarGraph} from "./../../directives/BarGraph";

@Component({
  selector: 'my-graph-detail',
  templateUrl: 'app/views/graphs/graph-detail.component.html',
  styleUrls: ['app/assets/css/graph-detail.component.css'],
  directives: [BarGraph],
})

export class GraphDetailComponent implements OnInit {

  protected graphData: Array<Number>;  // bar graph data (bound to from template)

  @Input() graph: Graph;
  //
  // protected host:any;
  // protected svg:any;
  // protected margin:any;
  // protected width:any;
  // protected height:any;
  // protected xScale:any;
  // protected yScale:any;
  // protected xAxis:any;
  // protected yAxis:any;
  // protected htmlElement: HTMLElement;
  //
  constructor(
    protected _graphService: GraphService,
    protected _routeParams: RouteParams,
    protected element: ElementRef) {

    this.graphData = [10, 20, 30, 40, 60];
    // this.htmlElement = this.element.nativeElement;
    // this.host = D3.select(this.element.nativeElement);
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');

    this._graphService.getGraphInfo(id)
      .then(graph => this.graph = graph);
  }

  ngOnChanges(){
    // this.host.html('');
    // this.svg = this.host.append('svg')
  }

  goBack() {
    window.history.back();
  }
}

import {Component, Input, OnInit, ElementRef} from 'angular2/core';
import { RouteParams } from 'angular2/router';


import { Graph } from '../../models/graphs/graph';
import { GraphService } from './../../services/graph.service';

import * as Moment from 'moment';
import {BarGraph} from "../bar-graph.component";

@Component({
  selector: 'my-graph-detail',
  templateUrl: 'app/views/graphs/graph-detail.component.html',
  styleUrls: ['app/assets/css/graph-detail.component.css'],
  directives: [BarGraph],
})

export class GraphDetailComponent implements OnInit {

  @Input() graph: Graph = new Graph();

  constructor(
    protected _graphService: GraphService,
    protected _routeParams: RouteParams,
    protected element: ElementRef) {
  }

  ngOnInit() {

    this.graph.id = this._routeParams.get('id')
    this.loadGraphStructure()
  }

  loadGraphStructure(){

    this._graphService.getGraphSctructure(this.graph.id)
        .then(graph => this.graph = graph);
  }

  onSave(){
    this._graphService.save( this.graph)
        .then( this.saveSucces, this.saveError);
  }

  saveSucces(){
    alert("Успешно!");
  }

  saveError(){
    alert("Ошибка!");
  }

  goBack() {
    window.history.back();
  }
}

import { Component, Input, OnInit } from 'angular2/core';
import {RouteParams, Route, Router} from 'angular2/router';

import { Graph } from '../../models/graphs/graph';
import { GraphService } from './../../services/graph.service';

@Component({
  selector: 'my-graph-create',
  templateUrl: 'app/views/graphs/graph-create.component.html',
  styleUrls: ['app/assets/css/graph-create.component.css']
})

export class GraphCreateComponent{

  @Input() name: string;

  constructor(
      protected _graphService: GraphService,
      protected _routeParams: RouteParams,
      protected  _router:Router) {
  }


  onCreate(){
    this._graphService.create( this.name).subscribe( (result) => {

      console.log("Result: " + result)

      if (result) {
        this._router.navigate(['Dashboard']);
      } else {
        alert("Не удалось создать!")
      }
    });
  }
}

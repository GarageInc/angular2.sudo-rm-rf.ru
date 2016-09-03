import { Component, OnInit } from '../../node_modules/angular2/core.d';
import { Router } from '../../node_modules/angular2/router.d';
import {DataTab} from "../models/tabs/DataTab";


@Component({
  selector: 'my-test',
  templateUrl: 'app/views/test.component.html',
  styleUrls: ['app/assets/css/test.component.css']
})


export class TestComponent implements OnInit {

  private range:Array<DataTab> = []

  constructor(
    protected _router: Router
  ){

    for(let i=0; i < 5; i++){

      let tab = new DataTab();

      tab.title = "model #" + i.toString();
      tab.id = i;
      tab.title = "title #" + i.toString();

      range.push(tab);
    }
  }

  ngOnInit() {
  }

}

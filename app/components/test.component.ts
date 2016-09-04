import { Component, OnInit } from 'angular2/core';
import {DataTab} from "../models/tabs/DataTab";
import {Tabs} from "./tabs/tabs.component";


@Component({
  selector: 'my-test',
  templateUrl: 'app/views/test.component.html',
  styleUrls: ['app/assets/css/test.component.css'],
  directives: [Tabs]
})

export class TestComponent implements OnInit {

  protected range:Array<DataTab> = []

  constructor(
  ){
  }

  ngOnInit() {

    for(let i=0; i < 5; i++){

      let tab = new DataTab();

      tab.id = i;
      tab.title = "title #" + i.toString();
      tab.model = "model #" + i.toString();

      this.range.push(tab);
    }
  }

  onUpdate(value:any) {
    console.log(value)
  }
}

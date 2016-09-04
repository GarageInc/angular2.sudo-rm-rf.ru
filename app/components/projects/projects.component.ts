import { Component, OnInit } from 'angular2/core';
import {DataTab} from "../../models/tabs/DataTab";
import {Tabs} from "../tabs/tabs.component";


@Component({
    selector: 'my-projects',
    templateUrl: 'app/views/projects/projects.component.html',
    styleUrls: ['app/assets/css/projects.component.css'],
    directives: [Tabs]
})

export class ProjectsComponent implements OnInit {


    constructor(
    ){
    }


    ngOnInit() {
    }

}

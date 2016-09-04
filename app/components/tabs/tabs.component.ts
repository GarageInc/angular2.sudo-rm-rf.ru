
import {Directive, Input, Output, ElementRef, Attribute, SimpleChange, Component, ViewEncapsulation} from 'angular2/core';
import {DataTab} from "../../models/tabs/DataTab";
import {EventEmitter} from "angular2/src/facade/async";

@Component({
    selector: 'tabs',
    templateUrl: 'app/views/tabs/tabs.component.html'
})

export class Tabs {

    @Output() updateTab:EventEmitter<DataTab> = new EventEmitter<DataTab>();

    @Input() tabs: Array<DataTab>;

    protected selected_tab:DataTab = new DataTab();

    setSelected( value:DataTab ) {

        this.selected_tab = value;

        this.updateTab.next(value);
    }

}
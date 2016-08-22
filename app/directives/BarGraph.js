/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
System.register(['angular2/core', 'd3/index.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, d3;
    var BarGraph;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }],
        execute: function() {
            BarGraph = (function () {
                /**
                 * Construct a new BarGraph
                 *
                 * @param elementRef: ElementRef (Injected) Reference to the DOM element associated with this Directive (see selector)
                 *
                 * @param width: string Width attribute from the containing template
                 *
                 * @param height: string Height attribute from the containing template
                 *
                 * @return Nothing
                 */
                function BarGraph(elementRef, width, height) {
                    var el = elementRef.nativeElement; // reference to <bar-graph> element from the main template
                    var graph = d3.select(el); // D3 chart container
                    // setup the graph
                    this.divs = graph
                        .append('div')
                        .attr({
                        'class': 'chart'
                    })
                        .style({
                        'width': width + 'px',
                        'height': height + 'px',
                    })
                        .selectAll('div');
                }
                // Render the D3 Bar Chart
                BarGraph.prototype.__render = function (newValue) {
                    if (!newValue)
                        return;
                    // join the data and chain styles and bar text ... all the usual suspects
                    this.divs.data(newValue).enter().append('div')
                        .transition().ease('elastic')
                        .style('width', function (d) { return d + '%'; })
                        .text(function (d) { return d + '%'; });
                };
                // update render on change
                BarGraph.prototype.ngOnChanges = function (changes) {
                    this.__render(this.data);
                };
                BarGraph = __decorate([
                    core_1.Directive({
                        selector: 'bar-graph',
                        properties: ['data']
                    }),
                    __param(1, core_1.Attribute('width')),
                    __param(2, core_1.Attribute('height')), 
                    __metadata('design:paramtypes', [core_1.ElementRef, String, String])
                ], BarGraph);
                return BarGraph;
            }());
            exports_1("BarGraph", BarGraph);
        }
    }
});
//# sourceMappingURL=BarGraph.js.map
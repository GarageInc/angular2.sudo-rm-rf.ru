import {Synchronizable} from "../base/Synchronizable";

export class Edge extends Synchronizable {
    id: string;
    node_first_id: string;
    node_second_id: string;
    weight: number;
}

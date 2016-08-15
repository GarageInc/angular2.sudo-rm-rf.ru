import {Synchronizable} from "./base/Synchronizable";

export class User extends Synchronizable {
    id: number;
    token: string;
}


import {User} from "../user";
export class UserState{

    public static activeUser:User = new User();

    public static reset() {
        this.activeUser = new User();
    };
}
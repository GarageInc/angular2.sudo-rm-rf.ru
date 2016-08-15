
export class Synchronizable{

    fillFromJSON(jsonObj: JSON) {
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}

export class Synchronizable{

    fillFromJSON(jsonObj: JSON) {

        for (var propName in jsonObj) {

            if( typeof this[propName] !== 'object'){

                this[propName] = jsonObj[propName]
            }
        }
    }
}
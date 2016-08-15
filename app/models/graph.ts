export class Graph {
  id: number;
  name: string;

  fillFromJSON(jsonObj: JSON) {
    for (var propName in jsonObj) {
      this[propName] = jsonObj[propName]
    }
  }
}

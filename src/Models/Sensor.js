
export const version = () => "1.0.0";
export class Sensor {
    constructor(id, name, data, type) {
      this._id = id;
      this._name = name;
      this._data = data;
      this._type = type;
    }
  
    get id() {
      return this._id || "";
    }
    get name() {
      return this._name || "";
    }
    get data() {
      return this._data || {};
    }
    get type() {
      return this._type || "";
    }
  
    set id(id) {
      this._id = id;
    }
  
    set name(name) {
      this._name = name;
    }
    set data(data) {
      this._data = data;
    }
    set type(type) {
      this._type = type;
    }
  
    unityOfSensor = () => {
      HashMapUnity["TEMPERATURE"] = " °C ";
      HashMapUnity["PERCENT"] = " % ";
      HashMapUnity["OPEN_CLOSE"] = "";
  
      var values = [];
      if (HashMapUnity.hasOwnProperty(this.type))
        values.push(HashMapUnity[this.type]);
      return values.join("");
    };
  }
  
  const HashMapUnity = {};
  
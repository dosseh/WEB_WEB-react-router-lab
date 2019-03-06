export const version = () => "1.0.0";

export class Data {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value || [];
  }

  set value(value) {
    this._value = value;
  }

  getAverage() {
    for (var i = 0; i < this.value.length; i++) {
      if (!Number(this.value[i])) {
        return "Pas de valeur moyenne pour ce capteur !";
      }
    }
    var sum = 0;
    for (i = 0; i < this.value.length; i++) {
      sum += parseFloat(this.value[i]);
    }
    return sum / this.value.length;
  }
  getlastValues() {
    return " " + this.value[this.value.length - 1] + "";
  }

  getDate() {
    return new Date().toLocaleString();
  }
}


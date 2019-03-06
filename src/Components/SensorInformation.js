import React, { Component } from "react";

import "../Cascading_Style_Sheets/App.css";

class SensorInformation extends Component {
  render() {
    let id, name, value, type, averageValue, date, unity;

    if (typeof this.props.sensorInformation !== "undefined") {
      let this_selected_sensor = this.props.sensorInformation;

      id = this_selected_sensor.id.substring(6);
      name = this_selected_sensor.name;

      value = Number(this_selected_sensor.data.getlastValues())
        ? parseFloat(this_selected_sensor.data.getlastValues()).toFixed(2)
        : this_selected_sensor.data.getlastValues();

      type = this_selected_sensor.type;

      unity = this_selected_sensor.unityOfSensor();

      averageValue = Number(this_selected_sensor.data.getAverage())
        ? parseFloat(this_selected_sensor.data.getAverage()).toFixed(2)
        : this_selected_sensor.data.getAverage();

      date = this_selected_sensor.data.getDate();
    }

    return (
      <div>
        <b>ID : {id} </b>
        <br />
        <br />
        <b>NOM : {name}</b>
        <br />
        <br />
        <b>
          VALEUR : {value} {unity}
        </b>
        <br />
        <br />
        <b>TYPE : {type}</b>
        <br />
        <br />
        <b>
          VALEUR MOYENNE : {averageValue} {unity}
        </b>
        <br />
        <br />
        <b> DATE : {date}</b>
        <br />
        <br />
      </div>
    );
  }
}

export default SensorInformation;

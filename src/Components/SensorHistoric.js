import React, { Component } from "react";
import "../Cascading_Style_Sheets/App.css";

class SensorHistoric extends Component {
  render() {
    let  listValue;
    if (typeof this.props.sensorHistoric !== "undefined") {
      
      let this_selected_sensor = this.props.sensorHistoric.data.value;
      //console.log(this_selected_sensor);
       listValue = this_selected_sensor.slice(Math.max(this_selected_sensor.length - 5, 1)).map(function(thisList) {
       if(Number(thisList)) thisList = parseFloat(thisList).toFixed(2);
        return (
          <tr>
            <th scope="row">{thisList}</th>
          </tr>
          
        );
      });
    }
    return(<tbody>{listValue}</tbody>);
  }
}

export default SensorHistoric;
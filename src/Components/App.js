import React, { Component } from "react";
import styles from "../Cascading_Style_Sheets/App.css";
import { Sensor } from "../Models/Sensor";
import { Data } from "../Models/Data";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SensorList from "./SensorList";
import SensorInformation from "./SensorInformation.js";
import SensorHistoric from "./SensorHistoric.js";
import BrokerUrl from "./BrokerUrl.js";
import autoBind from 'react-autobind';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], brockerUrlValue: new WebSocket("ws://" + window.location.host + "/socket").url };
    autoBind(this);
    this.dataOperation();
  }



  // It will return a sensor wich name is passing in paramettes from state's list if that one's name exist in the state's list

  selectedSensor(nameFromOnclick) {
    for (let i = 0; i < this.state.list.length; i++) {
      if (this.state.list[i].name === nameFromOnclick) {
        return this.state.list[i];
      }
    }
  }

  onUpdateBrockerInput(event) {
    this.setState({ brockerUrlValue: event.target.brockerUrlValue });
  }

  onSubmitBrockerForm(event) {
    return <Redirect to={this.state.brockerUrlValue} />;
  }


  // It will get json data and do an operation about it. Then it will set the state of state's list

  dataOperation() {

    let object = this;
    let sensorList = [];


    let mqtt = require("mqtt");
    let client = mqtt.connect(this.state.brockerUrlValue);

    client.on("connect", function () {
      client.subscribe("#", function (err) { });
    });

    // It will return true of the sensor name already exist in sensorList array
    function checkSensor(id, sensorList) {
      for (let i = 0; i < sensorList.length; i++) {
        if (sensorList[i].id === id) {
          return true;
        }
      }
    }
    // It will return a sensor wich name is passing in paramettes from sensorList if that one's name exist in the sensorList

    function curentSensor(id, sensorList) {
      for (let i = 0; i < sensorList.length; i++) {
        if (sensorList[i].id === id) {
          return sensorList[i];
        }
      }
    }

    client.on("message", function (topic, message) {
      let jsonData = JSON.parse(message.toString());

      let name = jsonData["name"];
      let value = jsonData["value"];
      let type = jsonData["type"];

      let data = new Data([value]);

      if (!checkSensor(topic, sensorList)) {
        let sensor = new Sensor(topic, name, data, type);
        sensorList.push(sensor);
      } else {
        let thisSensor = curentSensor(topic, sensorList);
        sensorList.push.apply(thisSensor.data.value, [value]);
      }
      object.setState({ list: sensorList });

    });
  }


  render() {

    return (
      <Router>
        <div className={styles.App}>
          <article>
            <header>BIENVENUE SUR LA PAGE D'ACCUEIL</header>
            <div className="content">
              <nav>
                <p contenteditable>LISTE DES CAPTEURS</p>

                <SensorList sensorList={this.state.list} />
              </nav>
              <main>
                <BrokerUrl
                  brokerUrl={this.state.brockerUrlValue}
                  onSubmit={this.onSubmitBrockerForm}
                  onUpdate={this.onUpdateBrockerInput}

                />
                <br />

                <div className="content">
                  <div className="contenerInfoSensor">
                    <strong contenteditable>INFORMATIONS DES CAPTEURS</strong>
                    <br />
                    <br />
                    <Route
                      path="/:urlToRecuva"
                      exact
                      strict
                      render={props => {
                        return (
                          <SensorInformation
                            sensorInformation={this.selectedSensor(
                              props.match.params.urlToRecuva.replace(
                                /\_+/g,
                                " "
                              )
                            )}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="contenerHistoricTable">
                    <table class="table w-100 p-3">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">HISTORIQUE</th>
                        </tr>
                      </thead>
                      <Route
                        path="/:urlToRecuva"
                        exact
                        strict
                        render={props => {
                          return (
                            <SensorHistoric
                              sensorHistoric={this.selectedSensor(
                                props.match.params.urlToRecuva.replace(
                                  /\_+/g,
                                  " "
                                )
                              )}
                            />
                          );
                        }}
                      />
                    </table>
                  </div>
                </div>
              </main>
            </div>
            <footer>
              All rights reversed.
              <br />
              <small>@ Dosseh KOUTO 2019</small>
            </footer>
          </article>
        </div>
      </Router>
    );
  }
}

export default App;

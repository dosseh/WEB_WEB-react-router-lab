import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import '../Cascading_Style_Sheets/App.css';


class SensorList extends Component {
    render() {

        const listSensor = this.props.sensorList.map(function (thisList) {
            return <p>
                <Link to={`/${thisList.name.replace(/\s+/g, '_')}`}>
                    <button className="btn btn-outline-success btn-lg btn-block">
                        {thisList.name}
                    </button>
                </Link>

            </p>
        });
        return (
            <ul>{listSensor}</ul>
        );
    }
}

export default SensorList;

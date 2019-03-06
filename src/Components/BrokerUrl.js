import React, { Component } from "react";
import "../Cascading_Style_Sheets/App.css";

class BrokerUrl extends Component {


    render() {

        let brokerUrl = this.props.brokerUrl;
        let onSubmit = this.props.onSubmit;
        let onUpdate = this.props.onUpdate;
        console.log(brokerUrl)

        return (
            <form class="form-inline" action={brokerUrl}>
                <div class="form-group mx-sm-3 mb-2">

                    <input value={brokerUrl} onChange={onUpdate}
                        type="text"
                        class="form-control"
                        placeholder=" Saisir l'URL du Brocker"
                    />

                </div>

                <button
                    onClick={onSubmit}
                    type="submit" class="btn btn-primary mb-2"

                >
                    VALIDER
        </button>
            </form>


        )
    }

}

export default BrokerUrl;

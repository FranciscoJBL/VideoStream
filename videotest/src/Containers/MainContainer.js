import React, { Component } from 'react';
import {find, message} from '../Api';

class App extends Component {
    constructor(props) {
        super(props);
        this.requestState = this.requestState.bind(this);
        this.state = {
            clientData: null,
            messageContent : null,
            response: null
        };
    }

    requestState(){
        this.setState({clientData : this.state.messageContent},
            function () {
                console.log(this.state.clientData);
                find(
                    this.state.clientData, 
                    (roomId) => this.setState({response : roomId})
                )
            }
        );
    }

    updateMessageContent(evt) {
        this.setState({
            messageContent: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <label>{this.state.response}</label>
                <label for={message}>ingrese su mensaje</label>
                <input value={this.state.messageContent} onChange={evt => this.updateMessageContent(evt)}/>
                <button onClick={this.requestState}>enviar</button>
           </div>
        );
    }
}

export default App;
import React, { Component } from 'react';
import {find, sendMessage} from '../Api';

class App extends Component {
    constructor(props) {
        super(props);
        this.requestRoom = this.requestRoom.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            roomId : null,
            messageContent : '',
            response: null
        };
    }

    requestRoom(){
        find(
            this.state, 
            (room) => this.setState({roomId : room})
        );
    }

    updateMessageContent(evt) {
        this.setState({
            messageContent: evt.target.value
        })
    }

    sendMessage() {
        
        if (this.state.roomId === null) {
            this.requestRoom();
        }
        
        sendMessage(
            this.state, 
            (response) => this.setState({response : response})
        );
        console.log(this.state.response)
    }

    render() {
        return (
            <div className="container">
                <label>{this.state.roomId}</label><br></br>
                <label>{this.state.response}</label><br></br>
                <label>ingrese su mensaje</label><br></br>
                <input value={this.state.messageContent} onChange={evt => this.updateMessageContent(evt)}/>
                <button onClick={this.sendMessage}>enviar</button>
           </div>
        );
    }
}

export default App;
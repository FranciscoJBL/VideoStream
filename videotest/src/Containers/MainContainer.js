import React, { Component } from 'react';
import {find, sendMessage, updateMessage} from '../Api';
import MessageLog from './MessageLog';
import UserInput from './UserInput';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.requestRoom = this.requestRoom.bind(this);
        this.getOrigin = this.getOrigin.bind(this);
        this.update = this.update.bind(this);
        this.send = this.send.bind(this);
        this.state = {
            roomId : null,
            clientId : null,
            messages: []
        };
    }

    requestRoom(){
        if (this.state.roomId === null) {
            find(
                this.state, 
                (data) => this.setState({
                    roomId : data.room,
                    clientId : data.clientId
                })
            );

            updateMessage((message) => this.update(message));
        }
        
    }

    send(message) {
        if (this.state.clientId === null) {
            return
        }

        var data = {
            'id' : this.state.messages.length + 1,
            'roomId' : this.state.roomId,
            'senderId': this.state.clientId,
            'messageContent' : message.messageContent
        };
        
        this.update(data);
        sendMessage(data);
    }

    update(message) {
        console.log(message);
        var stepMessages = this.state.messages;
        stepMessages.push(message);

        this.setState({
            messages : stepMessages
        })
    }

    getOrigin(senderId) {
        if (this.state.clientId === null) {
            return 'local'
        }

        if (senderId === this.state.clientId) {
            return 'local'
        } else {
            return 'remote'
        }
    }

    render() {
        return (
            <div className="container">
                <MessageLog 
                    messages = {this.state.messages}
                    getOrigin = {this.getOrigin}
                />
                <UserInput 
                    send = {this.send}
                    origin = {this.state.clientId}
                />
                <button onClick = {this.requestRoom}>Start</button> 
           </div>
        );
    }
}

export default MainContainer;
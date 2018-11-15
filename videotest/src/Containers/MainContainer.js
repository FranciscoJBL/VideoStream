import React, { Component } from 'react';
import {find, sendMessage, updateMessage} from '../Api';
import MessageLog from './MessageLog';
import UserInput from './UserInput';
import Header from './Header';

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
            userMedia: null,
            messages: []
        };
    }

    /*
    onComponentWillMount() {
        this.setState({
            userMedia: navigator.mediaDevices.getUserMedia({
                audio: true, video: true
            }).catch(e => 
                alert('getUserMedia() error: ' + e.name)
            )
        });
    }
    */
    requestRoom() {
        if (this.state.roomId === null) {
            find(
                this.state, 
                (data) => this.setState({
                    roomId : data.room,
                    clientId : data.clientId,
                    userMedia: navigator.mediaDevices.getUserMedia({
                        audio: true, video: true
                    }).catch(e => 
                        alert('getUserMedia() error: ' + e.name)
                    )
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
            <div>
                <Header/>
                <div className="container">
                    <div>
                        <MessageLog
                            messages = {this.state.messages}
                            getOrigin = {this.getOrigin}
                        />
                        <UserInput 
                            send = {this.send}
                            origin = {this.state.clientId}
                        /> 
                    </div>
                    <button onClick = {this.requestRoom}>Start</button>
                </div>
                <div>
                </div>
           </div>
        );
    }
}

export default MainContainer;
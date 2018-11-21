import React, { Component } from 'react';
import {find, sendMessage, updateMessage} from '../Api';
import MessageLog from './MessageLog';
import UserInput from './UserInput';
import Header from './Header';
import peer from 'peerjs';
import MediaContainer from './MediaContainer';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.requestRoom = this.requestRoom.bind(this);
        this.getOrigin = this.getOrigin.bind(this);
        this.update = this.update.bind(this);
        this.send = this.send.bind(this);
        this.stablishPeerMediaStream = this.stablishPeerMediaStream.bind(this);
        this.callMediaStream = this.callMediaStream.bind(this);
        this.state = {
            roomId : null,
            clientId : null,
            userMedia: null,
            remoteVideo: null,
            localVideo: null,
            socket : null,
            messages: []
        };
    }

    requestRoom() {
        if (this.state.roomId === null) {
            find(
                this.state,
                (data) => this.setState({
                    roomId : data.room,
                    clientId : data.clientId,
                    userMedia: navigator.mediaDevices.getUserMedia
                },
                this.stablishPeerMediaStream()
                )
            );

            updateMessage((message) => this.update(message));
        }

    }

    stablishPeerMediaStream() {
        var peerConnection = new peer(
            this.state.clientId, {
                host: 'localhost',
                port: 3001,
                path: '/'
            }
        );
        this.setState({
            socket : peerConnection
        }, this.callMediaStream());
    }

    callMediaStream() {
        this.state.userMedia({video: true, audio: true}, function(stream) {
            var call = peer.call('another-peers-id', stream);
            this.setState({
                'localVideo' : stream
            })
            call.on('stream', function(remoteStream) {
                this.setState({
                    'remoteVideo' : remoteStream
                })
            });
        }).catch(e =>
            alert('getUserMedia() error: ' + e.name)
        )
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
                <div className = "container">
                    <div className = "row">
                        <div className="col-md-4 col-sm-4 col-4">
                            <MediaContainer
                                remoteMedia = {this.state.remoteVideo}
                                localVideo = {this.state.localVideo}
                            />
                        </div>
                        <div className="col-md-8 col-sm-8 col-8">
                            <MessageLog
                                messages = {this.state.messages}
                                getOrigin = {this.getOrigin}
                            />
                            <UserInput
                                send = {this.send}
                                origin = {this.state.clientId}
                            />
                        </div>
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
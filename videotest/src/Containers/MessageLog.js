import React, { Component } from 'react';

class MessageLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    render() {
        return (
            <div className="message-container">
                <ul className="message-log">
                {this.props.messages.map(message => {
                    return (
                        <li
                            key = {message.id} 
                            className = {"message "+ this.props.getOrigin(message.senderId)}
                        >
                            {message.messageContent}
                        </li>
                    )
                })}
                </ul>
           </div>
        );
    }
}
export default MessageLog;
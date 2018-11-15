import React, { Component } from 'react';

class MessageLog extends Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.state = {
            messages: []
        };
    }

    scrollToBottom = () => {
        if (this.messagesEnd !== undefined) {
            this.messagesEnd.scrollTo(
                0 , this.messagesEnd.scrollHeight
            );
        }
        
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="message-container">
                <ul className="message-log scrollbar scrollbar-night-fade"
                ref={(el) => { this.messagesEnd = el; }}
                >
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
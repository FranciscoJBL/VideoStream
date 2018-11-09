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
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <ul className="message-log scrollbar scrollbar-night-fade">
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
                <div style={{ float:"left", clear: "both"}}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>            
        );
    }
}
export default MessageLog;
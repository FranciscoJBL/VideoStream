import React, { Component } from 'react';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.updateMessageContent = this.updateMessageContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            messageContent : '',
            origin: props.userId
        };
    }

    updateMessageContent(evt) {
        this.setState({
            messageContent: evt.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.messageContent === '') {
            return;
        }
        
        this.props.send(this.state);
        this.setState({
            messageContent: ''
        })
    }
    render() {
        return (
            <form
                className="send-message-form"
                onSubmit={this.handleSubmit}
            >
                <input
                    onChange={this.updateMessageContent}
                    value={this.state.messageContent}
                    placeholder="Type your message and hit ENTER"
                    type="text"
                />
            </form>
        );
    }
}
  
export default UserInput;
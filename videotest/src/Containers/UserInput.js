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
            <div> 
                <form
                    className="form-inline send-message-form"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        className="send-message-input"
                        onChange={this.updateMessageContent}
                        value={this.state.messageContent}
                        placeholder="Send a message"
                        type="text"
                    />
                </form>
            </div>
        );
    }
}
  
export default UserInput;
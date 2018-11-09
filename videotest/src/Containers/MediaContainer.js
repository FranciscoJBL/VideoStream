import React, { Component } from 'react';


class MediaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bridge: '',
          user: ''
        }
    }
    render(){
        return (
          <div className="media-bridge">
            <video width="320" height="240" className="remote-video" autoPlay></video>
            <video width="320" height="240" className="local-video" autoPlay muted></video>
          </div>
        );
      }
}

export default MediaContainer;
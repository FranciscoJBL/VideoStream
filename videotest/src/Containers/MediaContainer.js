import React, { Component } from 'react';

class MediaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remoteMedia : null,
            localMedia : null
        };
    }

    render(){
        return (
            <div className = "media-bridge">
                <video
                    className = "remote-video"
                    ref = {(ref) => this.remoteMedia = ref}
                    autoPlay
                />
                <video
                    className = "local-video"
                    autoPlay
                    muted
                />
            </div>
        );
    }
}
export default MediaContainer;
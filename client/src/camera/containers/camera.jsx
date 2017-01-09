import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import * as cameraActionCreators from '../actions/actions';
import Main from '../../main';
import FriendsList from '../../shared-components/friends-list';
import CameraButton from '../../shared-components/camera-button';

// let initialComponents = {
//   mediaBox: <p>BLANK MEDIA PAGE</p>,
//   cameraLabel: 'start camera',
//   buttonFunc: (() => (console.log('camera start func'))),
// };

let mediaBox = <p>BLANK MEDIA PAGE</p>;
let cameraLabel = 'start camera';
let buttonFunc = (() => (console.log('camera start func')));

class Camera extends Component {
  constructor(props) {
    super(props);
    this.getScreenshot = this.getScreenshot.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
  }

  componentWillMount() {
    this.props.startCamera();
  }

  getScreenshot() {
    const canvas = this.getCanvas();
    // console.log(canvas.toDataURL(this.props.imageFormat));
    this.props.capturePhoto(canvas.toDataURL(this.props.imageFormat));
  }

  getCanvas() {
    const video = findDOMNode(this.refs.webcam);
    // console.log(findDOMNode(this.refs.webcam), 'VIDEOO');
    if (!this.ctx) {
      const canvas = document.createElement('canvas');
      const aspectRatio = video.videoWidth / video.videoHeight;

      canvas.width = video.clientWidth;
      canvas.height = video.clientWidth / aspectRatio;

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    const { ctx, canvas } = this;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  render() {
    if (this.props.cameraOn && !this.props.pictureCaptured) {
      mediaBox = <Webcam ref="webcam" />;
      cameraLabel = 'take picture';
      buttonFunc = this.getScreenshot;
    } else if (!this.props.cameraOn && this.props.pictureCaptured) {
      mediaBox = <img src={this.props.capturedPicture} />;
      cameraLabel = 'send to friends';
      buttonFunc = this.props.sendPhoto;
    } else if (!this.props.cameraOn && !this.props.pictureCaptured) {
      mediaBox = <p>BLANK MEDIA PAGE</p>;
      cameraLabel = 'start camera';
      buttonFunc = this.props.startCamera;
    }

    return (
      <Main
        // left={<FriendsList />}
                left={
                  <button
                    onClick={() => console.log({
                      cameraOn: this.props.cameraOn,
                      pictureTaken: this.props.pictureCaptured,
                      capturedPicture: this.props.capturedPicture,
                      anyFriendsSelected: this.props.anyFriendsSelected,
                      webcamDefault: Webcam.defaultProps,
                    })}
                  >STATE CHECKER DELETE ME LATER</button>
                }

        right={
          <div >
            {mediaBox}
            <CameraButton
              label={cameraLabel}
              onClick={() => buttonFunc()}
              startCamera={() => this.props.startCamera}
            />

          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => (
  {
    cameraOn: state.camera.cameraOn,
    pictureCaptured: state.camera.pictureCaptured,
    capturedPicture: state.camera.capturedPicture,
    anyFriendsSelected: true,
    capturePhoto: state.camera.capturePhoto,
    imageFormat: state.camera.imageFormat,
  }
);

Camera.propTypes = {
  cameraOn: React.PropTypes.bool.isRequired,
  pictureCaptured: React.PropTypes.bool.isRequired,
  capturedPicture: React.PropTypes.string.isRequired,
  startCamera: React.PropTypes.func.isRequired,
  capturePhoto: React.PropTypes.func.isRequired,
  sendPhoto: React.PropTypes.func.isRequired,
  anyFriendsSelected: React.PropTypes.bool.isRequired,
  imageFormat: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, cameraActionCreators)(Camera);

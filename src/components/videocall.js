import React, { useRef, useEffect, useState } from 'react';
import SimplePeer from 'simple-peer';

const VideoCall = ({ roomId }) => {
  const [stream, setStream] = useState(null);
  const myVideo = useRef();
  const peerVideo = useRef();
  const peer = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    peer.current = new SimplePeer({
      initiator: window.location.hash === `#${roomId}`,
      trickle: false,
      stream
    });

    peer.current.on('signal', (data) => {
      // Use signaling server or link to connect peers
    });

    peer.current.on('stream', (peerStream) => {
      peerVideo.current.srcObject = peerStream;
    });

  }, [roomId]);

  return (
    <div>
      <video ref={myVideo} autoPlay muted style={{ width: '300px' }} />
      <video ref={peerVideo} autoPlay style={{ width: '300px' }} />
    </div>
  );
};

export default VideoCall;

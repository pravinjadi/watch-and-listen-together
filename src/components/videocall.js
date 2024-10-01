import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoCall = ({ roomId }) => {
  const [peers, setPeers] = useState({});
  const localStreamRef = useRef(null);
  const videoGridRef = useRef(null);
  const socketRef = useRef(null);
  
  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io.connect('/');
    
    // Join the room
    socketRef.current.emit('join-room', roomId);
    
    // Get user media (video/audio)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localStreamRef.current.srcObject = stream;
      
      // Notify other participants about the new user
      socketRef.current.emit('broadcast-my-stream', stream);
      
      socketRef.current.on('user-connected', userId => {
        // Create a peer connection for the new user
        const peerConnection = createPeerConnection(userId);
        setPeers(prev => ({ ...prev, [userId]: peerConnection }));
      });
      
      socketRef.current.on('receive-stream', ({ stream, userId }) => {
        // Add the received stream to the video grid
        addStreamToVideoGrid(stream, userId);
      });

      // Handle disconnection
      socketRef.current.on('user-disconnected', userId => {
        if (peers[userId]) {
          peers[userId].close();
          delete peers[userId];
        }
      });
    });
    
    return () => {
      // Clean up
      Object.values(peers).forEach(peer => peer.close());
    };
  }, [roomId, peers]);
  
  const createPeerConnection = (userId) => {
    const peerConnection = new RTCPeerConnection();
    
    peerConnection.ontrack = event => {
      const [stream] = event.streams;
      addStreamToVideoGrid(stream, userId);
    };
    
    localStreamRef.current.srcObject.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStreamRef.current.srcObject);
    });
    
    return peerConnection;
  };
  
  const addStreamToVideoGrid = (stream, userId) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.id = userId;
    video.play();
    videoGridRef.current.appendChild(video);
  };
  
  return (
    <div>
      <div ref={videoGridRef}></div>
      <video ref={localStreamRef} muted autoPlay playsInline></video>
    </div>
  );
};

export default VideoCall;

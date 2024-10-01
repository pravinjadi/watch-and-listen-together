import React from 'react';
import VideoCall from './videocall';
import Chat from './chat';
import YouTubeTogether from './youtubetogether';

const Room = ({ roomId }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Room: {roomId}</h2>
      <div style={{ display: 'flex', width: '100%' }}>
        <VideoCall roomId={roomId} />
        <Chat roomId={roomId} />
      </div>
      <YouTubeTogether roomId={roomId} />
    </div>
  );
};

export default Room;

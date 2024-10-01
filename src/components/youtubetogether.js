import React, { useState } from 'react';
import YouTube from 'react-youtube';

const YouTubeTogether = ({ roomId }) => {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ');

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div>
      <h3>Watch YouTube Together</h3>
      <input 
        placeholder="Enter YouTube Video ID" 
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <YouTube videoId={videoId} onReady={onReady} />
    </div>
  );
};

export default YouTubeTogether;

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Room from './components/room';

function App() {
  const [roomId, setRoomId] = useState('');
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>
        {!roomId ? (
          <div>
            <h1>Welcome to GMeet Clone</h1>
            <button onClick={() => setRoomId(`room-${Math.random().toString(36).substr(2, 5)}`)}>Create Room</button>
            <input 
              placeholder="Enter Room ID" 
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)} 
            />
            <button onClick={() => setRoomId(roomId)}>Join Room</button>
          </div>
        ) : (
          <Room roomId={roomId} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

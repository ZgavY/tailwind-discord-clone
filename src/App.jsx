import React, { useState } from 'react';
import EMoneyPlatform from './components/EMoneyPlatform.jsx';

function App() {
  const [channelName] = useState('general');

  return (
    <div>
      <EMoneyPlatform></EMoneyPlatform>
    </div>
  );
}

export default App;

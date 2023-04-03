import React from 'react';
import { useAppSelector } from './hook';

import Menu from './components/Menu/Menu';
import Tasks from './components/Tasks/Tasks';

function App() {
  const folders = useAppSelector((state) => state.folders.list);

  return (
    <div className="App">
      <Menu />
      <Tasks empty={folders.length === 0} />
    </div>
  );
}

export default App;

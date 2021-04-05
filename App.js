import React, { useState, useEffect } from 'react';
import Table from './Table';
import Player from './Player';

const App: () => React$Node = () => {

  return (
    <>
      <Table />
      <Player />
    </>
  );
};

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useMemo, createContext } from 'react';
import Main from './main'
import {ContextGlobal} from './contexts'

function App() {
  //for the global context
  const [token, setToken] = useState();
  
  const value = useMemo(
    () => ({token, setToken}),
    [token]
  );

  return (
    <>
      <ContextGlobal.Provider value={value}>
        <Main />
      </ContextGlobal.Provider>
    </>
  );
}

export default App;

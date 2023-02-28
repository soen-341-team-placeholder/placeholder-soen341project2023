import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='main-div'>
     <p> hello world</p>
      <div>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;

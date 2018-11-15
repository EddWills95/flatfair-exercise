import React, { Component } from 'react';
import './App.css';

import Wrapper from './containers/wrapper/Wrapper';
import Form from './components/form/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <Form />
        </Wrapper>
      </div>
    );
  }
}

export default App;

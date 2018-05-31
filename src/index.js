import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import Async from './Async';

// this file should stay unchanged
class App extends Component {
  renderPeople(data) {
    return data.results.map(person => (
      <div key={person.name}>{person.name}</div>
    ));
  }

  renderError() {
    return <u>Some error occured</u>;
  }

  renderLoading() {
    return <i>Loading...</i>;
  }

  render() {
    const validPromise = fetch('https://swapi.co/api/people').then(response =>
      response.json(),
    );
    const invalidPromise = fetch('https://swapi.co/api/asdaslkladjadslkj').then(
      // currently error is here because invalid URL doesn't return JSON
      // it should be caught in Async component
      response => response.json(),
    );

    return (
      <Fragment>
        <h3>Successful</h3>
        <Async
          promise={validPromise}
          onResolve={this.renderPeople}
          onReject={this.renderError}
          onLoading={this.renderLoading}
        />
        <hr />
        <h3>Unsuccessful</h3>
        <Async
          promise={invalidPromise}
          onResolve={this.renderPeople}
          onReject={this.renderError}
          onLoading={this.renderLoading}
        />
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));

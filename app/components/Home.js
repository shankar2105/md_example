// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div data-tid="container">
          <h2>MD Example</h2>
          <button onClick={e => this.props.authorise()}>Send Auth Request</button>
          <button onClick={e => this.props.getConnected()}>Connect</button>
          <button onClick={e => this.props.createMD()}>Create MD</button>
          <button onClick={e => this.props.getMD()}>Get MD entries</button>
          <button onClick={e => this.props.deleteKey()}>Delete top key</button>
        </div>
        <p>{this.props.message}</p>
        <p>{this.props.error}</p>
      </div>
    );
  }
}

import * as React from 'react';
import './assets/sass/App.sass';
import { Dashboard } from './components/Dashboard/Dashboard';
import { IotControlPad } from './components/IotControlPad/IotControlPad';

export class App extends React.Component<{}, undefined> {
  public render() {
    return (
      <div className="app">
        <Dashboard />
        <IotControlPad />
      </div>
    );
  }
}

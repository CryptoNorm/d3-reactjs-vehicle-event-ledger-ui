import * as React from 'react';

import { IotSendEvents } from '../IotSendEvents/IotSendEvents';

export class IotControlPad extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public componentDidMount() {
  }

  public componentWillUnmount() {
  }

  public render() {   
    return (
        <div className="iot-control-pad">
          <div className="iot-control-pad-body">
              <div className="container">
                <IotSendEvents />
              </div>
          </div>
        </div>             
    );
  }
}
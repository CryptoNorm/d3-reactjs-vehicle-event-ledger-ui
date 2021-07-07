import * as React from 'react';
import VehicleEventDataService  from "../../services/vehicleEvent.service";

export class LedgerReader extends React.Component<{}, { vehicleEvents: [], interval: NodeJS.Timeout }> {
  constructor(props) {
    super(props);

    this.state = {
      vehicleEvents: [],
      interval: null
    };
  }

  public componentDidMount() {
    this.setState({interval: setInterval(() => this.retrieveVehicleEvents(), 5000)});
  }

  public componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  retrieveVehicleEvents() {
    VehicleEventDataService.getAll()
      .then(response => {
        this.setState({
          vehicleEvents: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  public render() {
    const { vehicleEvents } = this.state;
    return (
        <div className="info-ledger">
          <ul>
            {vehicleEvents &&
              vehicleEvents.map((vehicleEvent,index) => (
                <li key={index}>
                  {vehicleEvent['created_at']} - {vehicleEvent['eventtype']} - {vehicleEvent['eventdetails']}
                </li>
              ))
            }           
          </ul>
      </div>
    )
  }
}

import * as React from 'react';
import { fromEvent, interval, Subscription } from 'rxjs';
import { filter, timeInterval } from 'rxjs/operators';

import { InfoBottom } from '../InfoBottom/InfoBottom';
import { LedgerReader } from '../LedgerReader/LedgerReader';
import { InfoTop } from '../InfoTop/InfoTop';
import { RpmGauge } from '../RpmGauge/RpmGauge';
import { SpeedGauge } from '../SpeedGauge/SpeedGauge';
import VehicleEventDataService  from "../../services/vehicleEvent.service";

interface IDashboardState {
  acc: boolean;
  rpm: number;
  speed: number;
  vin: string;
  eventcategory: string;
  eventtype: string;
  eventdetails: string;
  sent: boolean;
}

export class Dashboard extends React.Component<{}, IDashboardState> {
  private subs: Subscription;

  constructor(props: {}) {
    super(props);

    this.state = {
      acc: false,
      rpm: 0,
      speed: 0,
      vin: "1GNCS18Z3M0115561",
      eventcategory: "",
      eventtype: "",
      eventdetails: ""  ,
      sent: false  
    };
  }

  onClickAlertDangerous() {
    var category = 'Alert'
    var type = 'Dangerous Driving'
    var details = 'Speed exceeded 100mph'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details
    });
    this.saveVehicleEvent(category, type, details);
  }  

  saveVehicleEvent(category, type, details) {
    var data = {
      vin: this.state.vin,
      eventcategory: category,
      eventtype: type,
      eventdetails: details
    };
    console.log(data);
    VehicleEventDataService.create(data)
      .then(response => {
        this.setState({
          vin: response.data.vin,
          eventcategory: response.data.eventcategory,
          eventtype: response.data.eventtype, 
          eventdetails: response.data.eventdetails
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  peelAudio = new Audio("/images/peelout.mp3")

  public componentDidMount() {
    this.subs = new Subscription();

    this.peelAudio.load()

    const keyDown = fromEvent(document, 'keydown')
      .pipe(filter((e: KeyboardEvent) => e.which === 38))
      .subscribe(() => {
        this.setState({ acc: true })
        this.playAudio(this.peelAudio)
        if (this.state.speed > 100 && !this.state.sent) {
          this.setState({ sent: true });
          console.log('speed:' + this.state.speed + ' - sent')
          this.onClickAlertDangerous()
        }  
      });
      
    const keyUp = fromEvent(document, 'keyup')
      .pipe(filter((e: KeyboardEvent) => e.which === 38))
      .subscribe(() => {
        this.setState({ acc: false, sent: false });
      });

    const keyInterval = interval(20)
      .pipe(timeInterval())
      .subscribe(() => {
        if (this.state.acc) {
          if (this.state.speed < 300) {
            this.setState({ speed: this.state.speed + 1 });
          }
          if (this.state.rpm < 6000) {
            this.setState({ rpm: this.state.rpm + 50 });
          }
        } else {
          if (this.state.speed > 0) {
            this.setState({ speed: this.state.speed - 1 });
          }
          if (this.state.rpm > 0) {
            this.setState({ rpm: this.state.rpm - 50 });
          }
        }
      });

    this.subs.add(keyDown).add(keyUp).add(keyInterval);
  }

  playAudio(sound) {
    const audioPromise = sound.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err)
        })
    }
  }



  public componentWillUnmount() {
    this.subs.unsubscribe();
  }

  public render() {
    return (
      <div className="dashboard">
        <div className="dashboard-body">
          <div className="container">
            <InfoTop />
            <LedgerReader />
            <InfoBottom />
            <RpmGauge value={this.state.rpm} />
            <SpeedGauge value={this.state.speed} />
          </div>
        </div>
      </div>
    );
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.which === 38) {
      this.setState({ acc: true });
    }  
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (e.which === 38) {
      this.setState({ acc: false });
    }
  }
}

import * as React from 'react';
import VehicleEventDataService  from "../../services/vehicleEvent.service";

interface IEventState {
  vin: string,
  eventcategory: string,
  eventtype: string,
  eventdetails: string,
  isCrackShown: boolean,
  isAirbagShown: boolean,
  isFlareShown: boolean,
  isBatteryShown: boolean,
  isTiresShown: boolean,
  is100kShown: boolean,
  isCameraShown: boolean,
  isTollPaidShown: boolean
}

export class IotSendEvents extends React.Component <{}, IEventState>{
  constructor(props: {}) {
    super(props);
    
    this.saveVehicleEvent = this.saveVehicleEvent.bind(this);
    this.onClickAlertCheckBattery = this.onClickAlertCheckBattery.bind(this);
    this.onClickEventTires = this.onClickEventTires.bind(this);
    this.onClickAlertAirbagDeployed = this.onClickAlertAirbagDeployed.bind(this);
    this.onClickAlertDistressCall = this.onClickAlertDistressCall.bind(this);
    this.onClickUsage100k = this.onClickUsage100k.bind(this);
    this.onClickAlertVandalism = this.onClickAlertVandalism.bind(this);
    this.onClickAlertTollPayment = this.onClickAlertTollPayment.bind(this);
    this.onClickAlertCamera = this.onClickAlertCamera.bind(this);

    this.state = {
      vin: "1GNCS18Z3M0115561",
      eventcategory: "",
      eventtype: "",
      eventdetails: "",
      isCrackShown: false,
      isAirbagShown: false,
      isFlareShown: false,
      isBatteryShown: false,
      isTiresShown: false,
      is100kShown: false,
      isCameraShown: false,
      isTollPaidShown: false
    };
  }

  onClickAlertCheckBattery() {
    var category = 'Alert'
    var type = 'Check Battery'
    var details = 'Battery overheating.'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isBatteryShown: true
    });
    this.playAudio(this.batteryAudio)
    this.saveVehicleEvent(category, type, details);  
  }

  onClickEventTires() {
    var category = 'Service Event'
    var type = 'GY5000 Airless Tires Installed'
    var details = 'Hesla Dealer Service Center #132'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isTiresShown: true
    });
    this.playAudio(this.whistleAudio)
    this.saveVehicleEvent(category, type, details);    
  } 

  onClickUsage100k() {
    var category = 'Usage'
    var type = '100k SD miles recorded'
    var details = 'Self driving is 94% of total miles'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      is100kShown: true
    });
    this.saveVehicleEvent(category, type, details);    
  }   

  onClickAlertAirbagDeployed() {
    var category = 'Alert'
    var type = 'Airbag Deployed'
    var details = 'Front airbag deployed. 490,914 N / 13mph.'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isAirbagShown: true
    });
    this.playAudio(this.screamingAudio)
    this.saveVehicleEvent(category, type, details);
  } 

  onClickAlertCamera() {
    var category = 'Alert'
    var type = 'Camera Failure'
    var details = 'Self driving mode disabled'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isCameraShown: true
    });
    this.playAudio(this.staticAudio)
    this.saveVehicleEvent(category, type, details);
  } 

  onClickAlertDistressCall() {
    var category = 'Alert'
    var type = 'Distress Call'
    var details = 'Roadside assistance requested. Power depleted.'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isFlareShown: true
    });
    this.playAudio(this.flareAudio)
    this.saveVehicleEvent(category, type, details);
  } 
 
  onClickAlertVandalism() {

    var category = 'Alert'
    var type = 'Vandalism'
    var details = 'Broken LP window. Anti-theft video uploaded.'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isCrackShown: true,
    });
    
    this.playAudio(this.glassAudio)
    this.saveVehicleEvent(category, type, details);
  }  

  onClickAlertTollPayment() {
    var category = 'Alert'
    var type = 'Toll Payment'
    var details = '1 USDC - GA Toll Authority | i575 Express Road'

    this.setState({
      eventcategory: category,
      eventtype: type,
      eventdetails: details,
      isTollPaidShown: true
    });
    this.playAudio(this.paymentAudio)
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

  glassAudio = new Audio("/images/cracked-glass.mp3")
  screamingAudio = new Audio("/images/man-scream.mp3")
  flareAudio = new Audio("/images/flare.mp3")
  whistleAudio = new Audio("/images/whistle.wav")
  batteryAudio = new Audio("/images/battery.mp3")
  staticAudio = new Audio("/images/battery.mp3")
  paymentAudio = new Audio("/images/cha-ching.mp3")

  

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

  public componentDidMount() {
      this.glassAudio.load(this.glassAudio)
      this.screamingAudio.load(this.screamingAudio)
      this.flareAudio.load(this.flareAudio)
      this.whistleAudio.load(this.whistleAudio)
      this.batteryAudio.load(this.batteryAudio)
      this.staticAudio.load(this.staticAudio)
      this.paymentAudio.load(this.paymentAudio)
  }

  public render() {
    return (
      <div className="iot-send-alerts">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g>
            <image onMouseLeave={() => this.setState({is100kShown: false})}
                   className="iot-button" href="/images/iot-send-usage-100k.svg" x="200" y="30" width="275px" height="50px" onClick={this.onClickUsage100k}></image>
            <image onMouseLeave={() => this.setState({isTiresShown: false})}
                   className="iot-button"
                   href="/images/iot-send-service-tires.svg" x="475" y="30" width="275px" height="50px" onClick={this.onClickEventTires}></image>
            <image onMouseLeave={() => this.setState({isAirbagShown: false})}
                   className="iot-button"
                   href="/images/iot-send-alert-air-bag-deployed.svg" x="750" y="30" width="275px" height="50px" onClick={this.onClickAlertAirbagDeployed}></image>
            <image onMouseLeave={() => this.setState({isFlareShown: false})}
                   className="iot-button"
                   href="/images/iot-send-alert-distress-call.svg" x="1025" y="30" width="275px" height="50px" onClick={this.onClickAlertDistressCall}></image>
            <image onMouseLeave={() => this.setState({isBatteryShown: false})}
                   className="iot-button"
                   href="/images/iot-send-alert-battery.svg" x="200" y="100" width="275px" height="50px" onClick={this.onClickAlertCheckBattery}></image>            
            <image onMouseLeave={() => this.setState({isCrackShown: false})} 
                   className="iot-button"
                   href="/images/iot-send-alert-vandalism.svg" x="475" y="100" width="275px" height="50px" onClick={this.onClickAlertVandalism}></image>
            <image onMouseLeave={() => this.setState({isTollPaidShown: false})}
                   className="iot-button"
                   href="/images/iot-send-payment-toll-paid.svg" x="750" y="100" width="275px" height="50px" onClick={this.onClickAlertTollPayment}></image>
            <image onMouseLeave={() => this.setState({isCameraShown: false})}
                   className="iot-button"
                   href="/images/iot-send-alert-camera.svg" x="1025" y="100" width="275px" height="50px" onClick={this.onClickAlertCamera}></image>            
          </g>
        </svg>
        {this.state.isCrackShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/cracked-glass.png"></img>
          </div>
        )}
        {this.state.isAirbagShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/airbag.gif"></img>
          </div>
        )}
        {this.state.isFlareShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/flare.gif"></img>
          </div>
        )}     
        {this.state.isBatteryShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/battery.png"></img>
          </div>
        )}   
        {this.state.isTiresShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/tires.gif"></img>
          </div>
        )}     
        {this.state.is100kShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/100k.gif"></img>
          </div>
        )}    
        {this.state.isCameraShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/camera.gif"></img>
          </div>
        )}
        {this.state.isTollPaidShown && (
          <div className="cropper">
            {this.state.vin} | {this.state.eventtype} | {this.state.eventdetails}
            <img className="overlay" src="/images/toll.gif"></img>
          </div>
        )}                       
      </div>
    )
  }
}

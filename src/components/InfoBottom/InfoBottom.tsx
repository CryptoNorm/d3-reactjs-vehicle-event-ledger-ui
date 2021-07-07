import * as React from 'react';

export class InfoBottom extends React.Component<{}, { curTime: string}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      curTime: "1GNCS18Z3M0115561",
    };
  }
  public componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime : new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
      })
    }, 1000)
  }

  public render() {
    return (
      <div className="info-bottom">
        <svg width="100%" height="100%">
          <g>
            <text xmlns="http://www.w3.org/2000/svg" x="90px" y="40px" fontSize="18" textAnchor="middle" fill="#FFFFFF">Trip: 478.0mi</text>
            <image href="/images/red-line.svg" x="160px" y="22px" width="25px" height="25px"></image>
            <text xmlns="http://www.w3.org/2000/svg" x="230px" y="40px" fontSize="18" textAnchor="middle" fill="#FFFFFF">{this.state.curTime}</text>
            <image href="/images/red-line.svg" x="280px" y="22px" width="25px" height="25px"></image>
            <text xmlns="http://www.w3.org/2000/svg" x="370px" y="40px" fontSize="18" textAnchor="middle" fill="#FFFFFF">100000mi</text>
            <image href="/images/white-line.svg" x="65px" y="70px" width="320px" height="10px"></image>
            <text xmlns="http://www.w3.org/2000/svg" x="115px" y="100px" fontSize="16" textAnchor="middle" fill="#FFFFFF">iPhone</text>
            <image href="/images/musical-note.svg" x="150px" y="80px" width="25px" height="25px"></image>
            <text xmlns="http://www.w3.org/2000/svg" x="275px" y="100px" fontSize="12" textAnchor="middle" fill="#FFFFFF">Frank Sinatra - Hbar To The Moon</text>
          </g>
        </svg>
      </div>
    )
  }
}

import { select } from 'd3-selection';
import * as React from 'react';

export class InfoMap extends React.Component<{}, undefined> {
  public componentDidMount() {
    this.generate();
  }

  public render() {
    return <div className="info-map"></div>;
  }

  private generate() {
    const el = select('.info-map');
    const svg = el.append('svg').attr('width', '100%').attr('height', '100%');
    const g = svg.append('g');

  }
}

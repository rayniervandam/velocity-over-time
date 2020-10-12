import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @State() locations = [{
    coords: {
      longitude: 0,
      latitude: 0,
      speed: 0
    }
  }];
  graphElement;

  componentDidLoad() {
    if (navigator.geolocation) {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(location => {
          console.log('New location', location);
          this.locations = [...this.locations, location];

          // @ts-ignore
          google.charts.load('current', { 'packages': ['corechart'] });
          // @ts-ignore
          google.charts.setOnLoadCallback(() => {

            // @ts-ignore
            var data = google.visualization.arrayToDataTable([
              ['Time', 'Velocity'],
              ...this.locations.map((location, index) => [index/2, location.coords.speed])
            ]);

            var options = {
              title: 'Velocity over time',
              legend: { position: 'bottom' }
            };

            // @ts-ignore
            var chart = new google.visualization.LineChart(this.graphElement);

            chart.draw(data, options);
          });
        });
      }, 500);
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }

  }

  render() {
    return (
      <div class="app-home">
        <div>Current location: lat({this.locations[this.locations.length - 1].coords.latitude}), long({this.locations[this.locations.length - 1].coords.longitude})</div>
        <div>Current speed: {(this.locations[this.locations.length - 1].coords.speed * 3.6).toFixed(2)}km/h</div>
        <div ref={el => this.graphElement = el}></div>
      </div>
    );
  }
}

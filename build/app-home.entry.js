import { r as registerInstance, h } from './index-95f76a9b.js';

const appHomeCss = ".app-home{padding:10px}button{background:#5851ff;color:white;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;box-shadow:0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);outline:0;letter-spacing:0.04em;transition:all 0.15s ease;cursor:pointer}button:hover{box-shadow:0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);transform:translateY(1px)}";

const AppHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.locations = [{
        coords: {
          longitude: 0,
          latitude: 0,
          speed: 0
        }
      }];
  }
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
              ...this.locations.map((location, index) => [index / 2, location.coords.speed])
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
    }
    else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }
  render() {
    return (h("div", { class: "app-home" }, h("div", null, "Current location: lat(", this.locations[this.locations.length - 1].coords.latitude, "), long(", this.locations[this.locations.length - 1].coords.longitude, ")"), h("div", null, "Current speed: ", (this.locations[this.locations.length - 1].coords.speed * 3.6).toFixed(2), "km/h"), h("div", { ref: el => this.graphElement = el })));
  }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };

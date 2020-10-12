import { r as registerInstance, h } from './index-95f76a9b.js';

const appHomeCss = ".app-home{padding:10px}.data{margin-bottom:1em}.key{font-size:24pt}.value{font-size:24pt;font-weight:bold}.flex{display:flex}.flex>div{flex-grow:1;flex-basis:0}.key,.value{text-align:center}";

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
    this.isFullScreen = false;
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
    return (h("div", { class: "app-home", onClick: () => this.isFullScreen ? document.exitFullscreen() && (this.isFullScreen = false) : document.body.requestFullscreen() && (this.isFullScreen = true) }, h("div", { class: "flex" }, h("div", { class: "data" }, h("div", { class: "key" }, "Location:"), h("div", { class: "value" }, "lat(", this.locations[this.locations.length - 1].coords.latitude.toFixed(2), "), long(", this.locations[this.locations.length - 1].coords.longitude.toFixed(2), ")")), h("div", { class: "data" }, h("div", { class: "key" }, "Velocity:"), h("div", { class: "value" }, (this.locations[this.locations.length - 1].coords.speed * 3.6).toFixed(2), "km/h"))), h("div", { ref: el => this.graphElement = el })));
  }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };

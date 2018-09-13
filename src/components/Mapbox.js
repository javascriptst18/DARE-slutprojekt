import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl, GeoJSONLayer, Layer, Feature } from 'react-mapbox-gl';
import User from '../icons/user.svg'
import { connect } from 'react-redux';

//accessToken: 'pk.eyJ1Ijoic2x1dHByb2pla3QiLCJhIjoiY2psdW05eXhoMGtwcDN2czRlNDc3eWJrYyJ9.dgur5_88vWOGbk8oHhj9OQ'

const accessToken = 'pk.eyJ1Ijoic2x1dHByb2pla3QiLCJhIjoiY2psdW05eXhoMGtwcDN2czRlNDc3eWJrYyJ9.dgur5_88vWOGbk8oHhj9OQ';
const style = 'mapbox://styles/mapbox/streets-v9';


const Map = ReactMapboxGl({
  accessToken,
});

const mapStyle = {
  height: '50vh',
  width: '50vw',
};

const image = new Image(15, 15);
image.src = User;
const images = ["user", image];

const mapZoom = [12];
const checkInRadius = 200; //  In meters

class Mapbox extends Component {
  //  Takes coordinates "reversed" (long // lat). Uses WGS84 DD coordinate system
  state = {
    activityLongitude: 18.00597,
    activityLatitude: 59.36888,
    userLongitude: 0,
    userLatitude: 0,
    userPositionAvailable: false,
    distanceToActivity: 0,
    userCanCheckIn: false,
  }

  componentDidMount() {
    if (navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(this.setLocationInfo);
      navigator.geolocation.watchPosition(this.setLocationInfo);
    } else {
      // Geolocation not available, do something

    }
  }

  setLocationInfo = (position) => {
    this.setState({ userLongitude: position.coords.longitude, userLatitude: position.coords.latitude })
    this.setState({ userPositionAvailable: true })
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/-73.989%2C40.733%3B-74%2C40.733.json?access_token=pk.eyJ1Ijoic2x1dHByb2pla3QiLCJhIjoiY2psdW05eXhoMGtwcDN2czRlNDc3eWJrYyJ9.dgur5_88vWOGbk8oHhj9OQ`)
  }

  getDistance(longitude1, latitude1, longitude2, latitude2) {
    //  radians instead of degrees
    let rlatitude1 = Math.PI * latitude1 / 180
    let rlatitude2 = Math.PI * latitude2 / 180
    let rlongitude1 = Math.PI * longitude1 / 180
    let rlongitude2 = Math.PI * longitude2 / 180
    let theta = longitude1 - longitude2
    let rtheta = Math.PI * theta / 180
    let dist = Math.sin(rlatitude1) * Math.sin(rlatitude2) + Math.cos(rlatitude1) * Math.cos(rlatitude2) * Math.cos(rtheta);
    dist = Math.acos(dist) * (180 / Math.PI * (60 * 1.1515))
    dist = dist * 1.609344 //  In kilometers
    dist = dist.toFixed(2);
    return dist
  }

  render() {
    if (this.state.userPositionAvailable) {
      let distance = this.getDistance(this.state.userLongitude, this.state.userLatitude, this.state.activityLongitude, this.state.activityLatitude)
      console.log(distance);
      this.state.distanceToActivity = distance;
      if (distance <= (checkInRadius / 1000)) {
        //  If distance from checkinradius is less then set limit
        this.state.UserCanCheckIn = true;
      }
      else {
        this.state.UserCanCheckIn = false;
      }
      console.log('userCanCheckIn: ', this.state.UserCanCheckIn)
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {this.state.userPositionAvailable ?
          <div>
            Avstånd till mål: {this.state.distanceToActivity} km <br />
            Avstånd till incheck: {(this.state.distanceToActivity-(checkInRadius/1000)).toFixed(2)}
          </div>
          :
          null
        }
        <Map
          style={style}
          containerStyle={mapStyle}
          /* incase fixed zoom and centering should be used */
          //center={[this.state.activityLongitude, this.state.activityLatitude]}
          //zoom={mapZoom}
          fitBounds={[[this.state.activityLongitude, this.state.activityLatitude], [this.state.userLongitude, this.state.userLatitude]]}
          fitBoundsOptions={{ padding: 50, linear: true }}
        >
          <Layer
            type="circle"
            paint={{
              "circle-radius": 4,
              'circle-color': '#FF0000',
              'circle-opacity': 1,
              'circle-stroke-width': {
                stops: [
                  [0, 0],
                  [20, checkInRadius / 0.075 / Math.cos(this.state.activityLatitude * Math.PI / 180)]
                  //  interpolation, from 0 zoom level to 20 zoom level and converts meters to pixels
                ],
                base: 2
              },
              'circle-stroke-color': '#1E90FF',
              'circle-stroke-opacity': 0.5,
            }}
          >
            <Feature coordinates={[this.state.activityLongitude, this.state.activityLatitude]} />
          </Layer>
          {this.state.userPositionAvailable ?
            <div>
              <Layer
                type="symbol"
                layout={{
                  'icon-image': 'user',
                  'icon-allow-overlap': true,
                  'icon-size': 1,
                }}
                images={images}
              >
                <Feature coordinates={[this.state.userLongitude, this.state.userLatitude]} />
              </Layer>
            </div>
            :
            null}
            <ZoomControl/>
        </Map>
      </div >
    );
  }
}

export default connect(state => state)(Mapbox);

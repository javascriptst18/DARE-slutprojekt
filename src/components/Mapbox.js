import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl, GeoJSONLayer, Layer, Feature } from 'react-mapbox-gl';
import User from '../icons/user.svg'
import { connect } from 'react-redux';
import db from '../firebase';

//accessToken: 'pk.eyJ1Ijoic2x1dHByb2pla3QiLCJhIjoiY2psdW05eXhoMGtwcDN2czRlNDc3eWJrYyJ9.dgur5_88vWOGbk8oHhj9OQ'

const accessToken = 'pk.eyJ1Ijoic2x1dHByb2pla3QiLCJhIjoiY2psdW05eXhoMGtwcDN2czRlNDc3eWJrYyJ9.dgur5_88vWOGbk8oHhj9OQ';
const style = 'mapbox://styles/mapbox/streets-v9';


const Map = ReactMapboxGl({
  accessToken,
});

const mapStyle = {
  height: '50vh',
  width: '100vw',
};

const image = new Image(15, 15);
image.src = User;
const images = ["user", image];

const mapZoom = [12];
const checkInRadius = 200; //  In meters
const watchID = null;

class Mapbox extends Component {
  //  Takes coordinates "reversed" (long // lat). Uses WGS84 DD coordinate system
  state = {
    activityLongitude: 0,
    activityLatitude: 0,
    userLongitude: 0,
    userLatitude: 0,
    userPositionAvailable: false,
    distanceToActivity: 0,
    userInCheckInDistance: false,
  }

  componentDidMount() {
    this.state.activityLongitude;
    this.state.activityLatitude;
    this.getUserLocation();
    this.getActivityLocation();
  }

  componentWillUnmount() {
     //navigator.geolocation.clearWatch(watchID);
  }

  getUserLocation = () => {
    navigator.geolocation.watchPosition(function () { }, function () { }, {});
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        userLatitude: position.coords.latitude,
        userLongitude: position.coords.longitude,
        userPositionAvailable: true,
      })
    }, function (e) {
      let errors = {
        1: 'Tillstånd för GPS nekades av användare',
        2: 'Position ej tillgänglig',
        3: 'Timeout på GPS \r\nLadda om sidan'
      };
      alert("Fel: " + errors[e.code]);
    }, {
        timeout: 10000,
        maximumAge: 0,
      });
  }

  getActivityLocation = () => {
    return db.collection('activity').doc(this.props.dareStatus.activityMatch.activityId).get()
      .then((response) => {
        let send = response.data();
        this.props.dispatch({ type: 'SET_ACTIVTY', send })
        this.setState({
          activityLongitude: response.data().position.longitude,
          activityLatitude: response.data().position.latitude,
        })
      })
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
      this.state.distanceToActivity = distance;
      if (distance <= (checkInRadius / 1000) && !this.state.userInCheckInDistance) {
        this.props.dispatch({ type: 'USER_CAN_CHECK_IN' })
        this.setState({ userInCheckInDistance: true })
      }
      if (distance > (checkInRadius / 1000) && this.state.userInCheckInDistance) {
        this.props.dispatch({ type: 'USER_CAN_NOT_CHECK_IN' })
        this.setState({ userInCheckInDistance: false })
      }
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }} >
        {
          this.state.userPositionAvailable ?
            <div>
              Avstånd till mål: {this.state.distanceToActivity} km <br />
              Avstånd till incheck: {(this.state.distanceToActivity - (checkInRadius / 1000)).toFixed(2)} km
            </div>
            :
            null
        }
        < Map
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
          <ZoomControl />
        </Map >
      </div >
    );
  }
}

export default connect(state => state)(Mapbox);

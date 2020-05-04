import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -1,
            lng: -1,
            mLat: -1,
            mLng: -1,
            showMarker: false
        };

    }
    componentDidMount() {
        this.handlePermission();
    }
    handlePermission = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
    }
    MyMapComponent = compose(
        withProps({
            googleMapURL:
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlMHMsN_lc1NDamUBcsyBvd2mh_UEoDfo&v=3.0exp&libraries=geometry,drawing,places',
            loadingElement: <div style={{ height: '100%' }} />,
            containerElement: <div style={{ height: `${this.props.height}` }} />,
            mapElement: <div style={{ height: '100%' }} />
        }),
        withGoogleMap
    )(props => (
        <GoogleMap defaultZoom={props.defaultZoom} center={props.center} defaultCenter={props.defaultCenter} onClick={props.onClick}  >
            {props.children}
        </GoogleMap>
    ));

    render() {
        return (
            <this.MyMapComponent defaultZoom={12} center={{ lat: this.state.lat, lng: this.state.lng }} /* defaultCenter={{ lat: 24.892755, lng: 67.072342 }} */>
                {this.props.showMarker && (
                    <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
                )}
            </this.MyMapComponent>
        );
    }
}
export default Map;

import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -1,
            lng: -1,
            mLat: -1,
            mLng: -1,
            showMarker: false
        }

    }
    componentDidMount() {
        this.handlePermission();
    }
    handlePermission = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude })
        });
    }
    // addMarker = (e) => {
    //     let lat = e.latLng.lat();
    //     let lng = e.latLng.lng();
    //     this.setState({ showMarker: true, mLat: lat, mLng: lng })
    //     this.props.getLocation(lat, lng)
    // }
    // setMarker = (lat, lng) => {
    //     this.setState({ showMarker: true, mLat: lat, mLng: lng })
    // }
    MyMapComponent = compose(
        withProps({
            /**
             * Note: create and replace your own key in the Google console.
             * https://console.developers.google.com/apis/dashboard
             * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
             */
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDlMHMsN_lc1NDamUBcsyBvd2mh_UEoDfo&v=3.0exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `${this.props.height}` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )(props => (
        <GoogleMap defaultZoom={props.defaultZoom} defaultCenter={props.defaultCenter} onClick={props.onClick}  >
            {props.children}
        </GoogleMap>
    ));

    render() {

        // if (this.state.lat > 0)
        //     return (
        //         <this.MyMapComponent defaultZoom={12} defaultCenter={{ lat: this.state.lat, lng: this.state.lng }} onClick={this.addMarker}>
        //             {this.state.showMarker && (
        //                 <Marker position={{ lat: this.state.mLat, lng: this.state.mLng }} />
        //             )}
        //         </this.MyMapComponent>
        //     )
        // else
            return (
                <this.MyMapComponent defaultZoom={12} defaultCenter={{ lat: 24.892755, lng: 67.072342 }} onClick={this.addMarker}>
                    {/* {this.state.showMarker && (
                        <Marker position={{ lat: this.state.mLat, lng: this.state.mLng }} />
                    )} */}
                </this.MyMapComponent>
            )
    }
}
export default Map;

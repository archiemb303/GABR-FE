import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React from "react";

const BasicMap = (props) => {
  const containerStyle = { width: "100%", height: "200px" };

  const center = { lat: props.lat, lng: props.lng };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBb6wjKD210p0ORAaFyC1EBxF1yJrpLuzk">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
    </LoadScript>
  );
};

export default React.memo(BasicMap);

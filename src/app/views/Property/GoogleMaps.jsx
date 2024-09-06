import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_KEY = "AIzaSyDI_DJD_O3GmkNrAq5rbkevcAqDcAya9uU";

const GoogleMaps = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 12.7681, lng: 77.1234 },
      zoom: 8,
    });

    const locations = [
      { name: "Location 1 Testing Ikbal", lat: 12.7681, lng: 77.1234 },
      { name: "Location 2 Testing Ikbal", lat: 37.7793, lng: -122.4193 },
      { name: "Location 3 Testing Ikbal", lat: 37.7758, lng: -122.4135 },
      { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    ];

    const markers = locations.map((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<h3>${location.name}</h3><p>Lat: ${location.lat}, Lng: ${location.lng}</p><a href='https://www.google.com/maps/dir/?api=1&destination=19.0760,72.8777&travelmode=driving' target='_blank'>Get Directions to Mumbai</a>`,
      });

      marker.addListener("mouseover", () => {
        infoWindow.open(map, marker);
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });

      marker.addListener("click", () => {
        window.open(`/location/${location.name}`);
      });

      return marker;
    });

    setMap(map);
    setMarkers(markers);
  };

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default GoogleMaps;

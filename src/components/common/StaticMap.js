import React from "react";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";
const StaticMap = ({ latitude, longitude }) => {
  return (
    <>
      <div>
        <a
          href={`https://maps.google.com/?q=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticGoogleMap
            size="300x150"
            className="img-fluid"
            apiKey="GOOGLE_API_KEY_REDACTED"
          >
            <Marker
              location={{ lat: latitude, lng: longitude }}
              color="blue"
              label="P"
            />
          </StaticGoogleMap>
        </a>
      </div>
    </>
  );
};

export default StaticMap;

const { Client } = require("@googlemaps/google-maps-services-js");
require('dotenv').config();

const client = new Client({});

async function searchPlaceByQuery(placeQuery, location = null) {
  try {
    let params = {
      key: process.env.GOOGLE_PLACES_API_KEY,
      type: 'establishment',
      region: 'us',
    };

    if (placeQuery) {
      params.query = placeQuery + " restroom";
    } else if (location) {
      params.location = location;
      params.radius = 5000; // 5 km radius for nearby search
    } else {
      throw new Error("Either placeQuery or location must be provided");
    }

    const response = await client.textSearch({
      params: params,
      timeout: 1000, // milliseconds
    });

    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error("Error making Places API call:", error);
    throw error;
  }
}

async function searchNearbyPlaces(lat, lon) {
  try {
    const response = await client.placesNearby({
      params: {
        location: { lat, lng: lon },
        radius: 5000, // 5 km radius
        type: 'establishment',
        key: process.env.GOOGLE_PLACES_API_KEY,
      },
      timeout: 1000, // milliseconds
    });

    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error("Error making Places API call:", error);
    throw error;
  }
}

module.exports = { searchPlaceByQuery, searchNearbyPlaces };

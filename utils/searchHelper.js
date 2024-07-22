const { Client } = require("@googlemaps/google-maps-services-js");
require('dotenv').config();

const client = new Client({});

async function searchPlaceByQuery(placeQuery) {
  try {
    const response = await client.textSearch({
      params: {
        query: placeQuery + " restroom",
        key: process.env.GOOGLE_PLACES_API_KEY,
        type: 'establishment',
        region: 'us',
      },
      timeout: 1000, // milliseconds
    });

    // Extract map URL
    const placeData = response.data.results.map(place => ({
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.formatted_address,
      photos: place.photos,
      icon: place.icon,
      types: place.types,
      map: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`
    }));

    return placeData.slice(0, 10);

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
        radius: 5000, // Radius in meters
        type: 'establishment',
        key: process.env.GOOGLE_PLACES_API_KEY,
      },
      timeout: 1000, // milliseconds
    });

    // Extract map URL
    const placeData = response.data.results.map(place => ({
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.vicinity,
      photos: place.photos,
      icon: place.icon,
      types: place.types,
      map: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`
    }));

    return placeData.slice(0, 10);

  } catch (error) {
    console.error("Error making Nearby Places API call:", error);
    throw error;
  }
}

module.exports = { searchPlaceByQuery, searchNearbyPlaces };

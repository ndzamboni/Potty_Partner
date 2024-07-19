const { Client } = require("@googlemaps/google-maps-services-js");
const { Restroom } = require('../models'); // Correct import
require('dotenv').config();

const client = new Client({});

async function getOrCreateRestroom(placeId) {
  let restroom = await Restroom.findOne({ where: { place_id: placeId } });

  if (!restroom) {
    try {
      const response = await client.placeDetails({
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
        timeout: 1000, // milliseconds
      });

      const placeData = response.data.result;

      restroom = await Restroom.create({
        place_id: placeData.place_id,
        name: placeData.name,
        address: placeData.formatted_address,
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
      throw error;
    }
  }

  return restroom;
}

module.exports = { getOrCreateRestroom };
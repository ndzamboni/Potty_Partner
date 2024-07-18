const { Client } = require("@googlemaps/google-maps-services-js");
require('dotenv').config();

const client = new Client({});

async function searchPlaceByQuery(placeQuery) {
  let results = [];
  let nextPageToken = null;

  do {
    try {
      const response = await client.textSearch({
        params: {
          query: placeQuery + " restroom",
          key: process.env.GOOGLE_PLACES_API_KEY,
          pagetoken: nextPageToken,
        },
        timeout: 1000, // milliseconds
      });

      results = results.concat(response.data.results);
      nextPageToken = response.data.next_page_token;

      // Wait for a short period before making the next request
      if (nextPageToken) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error("Error making Places API call:", error);
      throw error;
    }
  } while (nextPageToken);

  return results;
}

module.exports = { searchPlaceByQuery };
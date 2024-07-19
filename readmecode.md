      return response.data.results.slice(0, 1);


async function getPlaceDetails(placeId) {
  console.log(`Fetching details for place: ${placeId}`);
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: [
          'name',
          'formatted_address',
          'place_id',
          'current_opening_hours',
          'business_status',
          'url', // Google Maps URL
          'icon_background_color',
          'icon_mask_base_uri',
          'icon',,
          'photos',
          'id',
          'types',
          
        ],
        key: process.env.GOOGLE_PLACES_API_KEY,
      },
      timeout: 1000, // milliseconds
    });
    console.log("Response from getPlaceDetails:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error making Places API call:", error.response?.data?.error_message || error.message);
    throw error;
  }
}

module.exports = { searchPlaceByQuery, getPlaceDetails };
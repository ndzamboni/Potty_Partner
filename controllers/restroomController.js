const { searchPlaceByQuery } = require('../utils/searchHelper');
const dotenv = require('dotenv');

dotenv.config();

exports.getPlace = async (req, res) => {
  const placeQuery = req.query.q; // Assuming 'q' is passed as a query parameter
  try {
    const placeData = await searchPlaceByQuery(placeQuery);
    console.log(placeData);
    res.render('searchResults', { searchResults: placeData }); // Render the Handlebars template with search results
  } catch (error) {
    console.error("Error searching for place:", error);
    res.status(500).json({ error: 'An error occurred while searching for the place.' });
  }
};

exports.getNearby = async (req, res) => {
  const { lat, lon } = req.query; // Assuming 'lat' and 'lon' are passed as query parameters
  try {
    const nearbyPlaces = await searchNearbyPlaces(lat, lon);
    res.json(nearbyPlaces); // Return nearby places as JSON response
  } catch (error) {
    console.error("Error searching for nearby places:", error);
    res.status(500).json({ error: 'An error occurred while searching for nearby places.' });
  }
};
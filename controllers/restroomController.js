const { searchPlaceByQuery } = require('../utils/searchHelper');
const dotenv = require('dotenv');
const { Restroom } = require('../models');
// const { icon } = require('leaflet');
const { types } = require('pg');
dotenv.config();

exports.getPlace = async (req, res) => {
  const placeQuery = req.query.q; // Assuming 'q' is passed as a query parameter
  try {
    console.log(`Searching for place: ${placeQuery}`);
    const placeData = await searchPlaceByQuery(placeQuery);
    console.log('Place data received:', placeData);

    // Save data to Restrooms table
    for (const place of placeData) {
      console.log('inserting info',  place.photos, place.icon, place.types); //place.open_now);
      try {
        await Restroom.findOrCreate({
          where: { place_id: place.place_id },
          defaults: {
            name: place.name,
            address: place.formatted_address,
            // open: place.opening_hours,
            photos: place.photos,
            icon: place.icon,
            types: place.types,
          }
        });
        console.log(`Inserted/Found place: ${place.name}`);
      } catch (dbError) {
        console.error('Error inserting place into database:', dbError);
      }
    }

    // Fetch updated search results from the database
    const searchResults = await Restroom.findAll({
      where: { place_id: placeData.map(place => place.place_id) },
      attributes: ['id', 'name', 'address', 'photos', 'icon', 'types'] // Ensure 'id' is included
    });

    console.log(`Search results from DB: ${JSON.stringify(searchResults)}`);
    res.render('searchResults', { searchResults, user: req.user });
  } catch (error) {
    console.error('Error searching for place:', error);
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
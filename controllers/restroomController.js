const { searchPlaceByQuery, searchNearbyPlaces } = require('../utils/searchHelper');
const dotenv = require('dotenv');
const { Restroom } = require('../models');
dotenv.config();

exports.getPlace = async (req, res) => {
  const placeQuery = req.query.q; // Assuming 'q' is passed as a query parameter
  const userLocation = req.query.location; // Assuming 'location' is passed as a query parameter
  
  try {
    let placeData;

    if (placeQuery) {
      console.log(`Searching for place: ${placeQuery}`);
      placeData = await searchPlaceByQuery(placeQuery);
    } else if (userLocation) {
      const [lat, lon] = userLocation.split(',');
      console.log(`Searching for nearby places at: ${lat}, ${lon}`);
      placeData = await searchNearbyPlaces(parseFloat(lat), parseFloat(lon));
    } else {
      console.log("No search query or location provided.");
      return res.status(400).json({ error: 'No search query or location provided. Please provide a search location.' });
    }

    console.log('Place data received:', placeData);

    // Save data to Restrooms table
    for (const place of placeData) {
      console.log('inserting info', place.photos, place.icon, place.types);
      try {
        await Restroom.findOrCreate({
          where: { place_id: place.place_id },
          defaults: {
            name: place.name,
            address: place.formatted_address,
            photos: place.photos,
            icon: place.icon,
            types: place.types,
            map: place.place_id // Use place_id for the map field
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
      attributes: ['id', 'name', 'address', 'photos', 'icon', 'types', 'map'] // Ensure 'id' is included
    });

    console.log(`Search results from DB: ${JSON.stringify(searchResults)}`);
    res.render('home', { user: req.user, searchResults }); // Pass API key to the template
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

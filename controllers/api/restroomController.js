// restroomController.js

const axios = require('axios');
const { User } = require('../../models/User');
const dotenv = require('dotenv');

dotenv.config();

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Get restrooms near a location
exports.getRestroomsNearby = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${latitude},${longitude}`,
                radius: 5000, // Adjust the radius as needed
                type: 'restaurant', // or any other place type
                keyword: 'restroom',
                key: GOOGLE_PLACES_API_KEY
            }
        });

        const restrooms = response.data.results;

        return res.json({ restrooms });
    } catch (error) {
        console.error('Error fetching restrooms:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
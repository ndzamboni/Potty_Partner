const passport = require('passport');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

// Register a new user
exports.register = async (req, res) => {
    try {
      const { username, firstName, lastName, password } = req.body;
      console.log('Creating new user:', username);
  
      // Check if user already exists
      const existingUser = await Users.findOne({ where: { username } });
      if (existingUser) {
        console.log('User already exists:', username);
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user
      const newUser = await Users.create({ username, firstName, lastName, password});
      console.log('New user created:', newUser.username);
      return res.status(201).render('user/profile', { user: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };

// Log in a user
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error: ', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed: ', info.message);
            return res.status(400).json({ message: 'Incorrect username or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error: ', err);
                return next(err);
            }
            console.log('User logged in:', user.username);
            return res.redirect('/profile');
        });        
    })(req, res, next);
};

// Log out a user
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
};

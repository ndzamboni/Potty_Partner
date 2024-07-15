const passport = require('passport');
const bcrypt = require('bcryptjs');
const { User } = require('../models');


// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;
        console.log('Registering user:', username, firstName, lastName, password);
        
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = await User.create({ username, firstName, lastName, password: hashedPassword });
        
        res.status(201).render('user/profile');
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Log in a user
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Logged in successfully', user });
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
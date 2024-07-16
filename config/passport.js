const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await Users.findOne({ where: { username } });
            console.log('user: ', user);
            console.log('username: ', username);
            console.log('password: ', password); 
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;

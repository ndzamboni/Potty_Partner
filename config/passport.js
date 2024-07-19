const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await Users.findOne({ where: { username } });
            if (!user) {
                console.log('User not found: ', username);
                return done(null, false, { message: 'Incorrect username.' });
            }

            const isMatch = await bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                console.log('Password incorrect for: ', username);
                return done(null, false, { message: 'Incorrect password.' });
            }

            console.log('Login successful for: ', username);
            return done(null, user);
        } catch (err) {
            console.log('Error during authentication: ', err);
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

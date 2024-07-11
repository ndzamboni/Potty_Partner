const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const { potty_potty_db } = require('./config/connection');
const authRoutes = require('./routes/authRoutes');
const restroomRoutes = require('./routes/restroomRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/restrooms', restroomRoutes);
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Potty Partner!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const PORT = process.env.PORT || 3001;

potty_potty_db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
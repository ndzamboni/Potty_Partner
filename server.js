const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const { potty_partner_db } = require('./config/connection');
const authRoutes = require('./routes/authRoutes');
const restroomRoutes = require('./routes/restroomRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const path = require('path');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/restrooms', restroomRoutes);
app.use('/reviews', reviewRoutes);

// Set up Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;

potty_partner_db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

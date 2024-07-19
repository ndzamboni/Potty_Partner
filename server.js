const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const { sequelize } = require('./config/connection');
const authRoutes = require('./routes/authRoutes');
const restroomRoutes = require('./routes/restroomRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const homeRoutes = require('./routes/homeRoutes'); 
const path = require('path');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
const { registerHelpers } = require('./utils/handlebarsHelpers');

dotenv.config();

const app = express();

// Logging middleware
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up Handlebars
registerHelpers();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
console.log('Setting up routes');
app.use('/auth', authRoutes);
app.use('/restrooms', restroomRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/', homeRoutes);

// Home route
app.get('/', (req, res) => {
    console.log('Rendering homepage for user:', req.user);
    res.render('home', { user: req.user });
});

const PORT = process.env.PORT || 3001;

// Database synchronization and server start
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

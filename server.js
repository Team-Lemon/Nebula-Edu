const express = require('express');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

// To use Handlebars template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session Constant for Cookie Creation upon logging in/visiting
const sess = {
    secret: 'Super Duper Secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use images
app.use(express.static('images'));

// To turn on routes
app.use(routes);

// To turn on connection to db and Server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
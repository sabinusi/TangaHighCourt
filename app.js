/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({
  dest: path.join(__dirname, 'uploads'), filename: (req, file, next) => {
    console.log(file);
  }
});

const multerConfig = {
  storage: multer.diskStorage({
    destination: (reg, file, next) => {
      next(null, './public/uploads/judges');
    },

    filename: (req, file, next) => {
      const ext = file.mimetype.split('/')[1]
      next(null, file.fieldname + "-" + Date.now() + '.' + ext)
    }

  })

}
const multerConfigRecordManagementAssistance = {
  storage: multer.diskStorage({
    destination: (reg, file, next) => {
      next(null, './public/uploads/record management assistant');
    },

    filename: (req, file, next) => {
      const ext = file.mimetype.split('/')[1]
      next(null, file.fieldname + "-" + Date.now() + '.' + ext)
    }

  })

}
const multerConfigResidentMigistrate = {
  storage: multer.diskStorage({
    destination: (reg, file, next) => {
      next(null, './public/uploads/resident migstrate');
    },

    filename: (req, file, next) => {
      const ext = file.mimetype.split('/')[1]
      next(null, file.fieldname + "-" + Date.now() + '.' + ext)
    }

  })

}


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');
const judgeController = require('./controllers/judges');
const recordManagementAssistantController = require('./controllers/record management assistant');
const residentMigstrateController = require('./controllers/resident migstrate');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();
var http = require('http').Server(app);




http.listen(3000, function () {
  console.log('listening on *:3000');
});
const io = require('socket.io')(http);
//socket.io

loginUsers = []
io.on('connection', function (socket) {
  console.log("user connect");
  socket.emit('users', { users: loginUsers[0] })
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('login user', function (userEmail) {
    console.log('email user: ' + userEmail);
  });
  // socket.on('home', function (home) {
  //   loginUsers.push(home)
  //   io.emit(`users ${loginUsers}`)
  // });
  socket.on('loginUser', function (user) {

    console.log('emited user is' + user)
    io.sockets.emit('users', { user: user })
  });
});

//socket.io

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  switch (req.path) {
    case '/api/upload':
      next();
      break;

    case '/judge/upload':
      next();
      break;
    case '/residentMigstrate/upload':
      next();
      break;
    case '/updateRecordManagementAssistant':
      next();
      break;
    case '/updateJudge':
      next();
      break;

    case '/residentMigstrate/put':
      next();
      break;
    case '/recordManagementAssistant/upload':
      next();
      break;
    default:
      lusca.csrf()(req, res, next);
      break;
  }

});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user &&
    (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/js/sweetalert', express.static(path.join(__dirname, 'node_modules/sweetalert/dist/sweetalert.min.js'), { maxAge: 31557600000 }));
// importing datatables
app.use('/js/datatables', express.static(path.join(__dirname, 'node_modules/datatables.net/js'), { maxAge: 31557600000 }));
app.use('/js/datatables/buttons', express.static(path.join(__dirname, 'node_modules/datatables.net-buttons/js'), { maxAge: 31557600000 }));
app.use('/js/datatables/resposive', express.static(path.join(__dirname, 'node_modules/datatables.net-responsive-dt/js'), { maxAge: 31557600000 }));
app.use('/js/datatables/resposive/css', express.static(path.join(__dirname, 'node_modules/datatables.net-responsive-dt/css'), { maxAge: 31557600000 }));
// app.use('/js/datatables', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
//importing datatables
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
// app.get('/', homeController.index);
app.get('/', userController.getLogin);
// app.get('/login', userController.getLogin);

// setup routes
const dashboardRoutes = require('./routes/dashboard')
const reportRoutes = require('./routes/report')
const casesRoutes = require('./routes/cases')
const roomsRoutes = require('./routes/rooms')
const caseHearing = require('./routes/hearing')

app.use('/', roomsRoutes)
app.use('/', caseHearing)
app.use('/', casesRoutes)
app.use('/', dashboardRoutes)
app.use('/', reportRoutes)

//judges
app.get('/judge', judgeController.getJudes);
app.post('/judge/upload', multer(multerConfig).single('profilepicture'), judgeController.postJudge);
app.post('/judge/:id', judgeController.deleteJudge);
app.get('/alljudges', judgeController.getAllJudes);
app.get('/judge/edit/:id', judgeController.editJudge);
app.post('/updateJudge', multer(multerConfig).single('profilepicture'), judgeController.putJudge);

// judges


// record management assistant
app.get('/recordManagementAssistant', recordManagementAssistantController.getRecordManagementAssistant);
app.post('/recordManagementAssistant/upload', multer(multerConfigRecordManagementAssistance).single('profilepicture'), recordManagementAssistantController.postrecordManagementAssistant);
app.get('/rma', recordManagementAssistantController.getAllRecordManagementAssistant);
app.get('/recordManagementAssistant/edit/:id', recordManagementAssistantController.editrecordManagementAssistant);
app.post('/recordManagementAssistant/delete/:id', recordManagementAssistantController.deleterecordManagementAssistant);
app.post('/updateRecordManagementAssistant', multer(multerConfigRecordManagementAssistance).single('profilepicture'), recordManagementAssistantController.putrecordManagementAssistant);

// record management assistant

// resident migistrate
app.get('/residentMigstrate', residentMigstrateController.getResidentMigstrate);
app.get('/allrm', residentMigstrateController.getAllResidentMigstrate);

app.post('/residentMigstrate/upload', multer(multerConfigResidentMigistrate).single('profilepicture'), residentMigstrateController.postResidentMigstrate);
app.post('/residentMigstrate/put', multer(multerConfigResidentMigistrate).single('profilepicture'), residentMigstrateController.putResidentMigstrate);
app.post('/residentMigstrate/delete/:id', residentMigstrateController.deleteResidentMigstrate);
app.get('/residentMigstrate/edit/:id', residentMigstrateController.editResidentMigstrate);

// resident migistrate


app.post('/', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/lastfm', apiController.getLastfm);
app.get('/api/nyt', apiController.getNewYorkTimes);
app.get('/api/aviary', apiController.getAviary);
app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
app.get('/api/stripe', apiController.getStripe);
app.post('/api/stripe', apiController.postStripe);
app.get('/api/scraping', apiController.getScraping);
app.get('/api/twilio', apiController.getTwilio);
app.post('/api/twilio', apiController.postTwilio);
app.get('/api/clockwork', apiController.getClockwork);
app.post('/api/clockwork', apiController.postClockwork);
app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
app.get('/api/paypal', apiController.getPayPal);
app.get('/api/paypal/success', apiController.getPayPalSuccess);
app.get('/api/paypal/cancel', apiController.getPayPalCancel);
app.get('/api/lob', apiController.getLob);
app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
app.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
app.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);
app.get('/api/google-maps', apiController.getGoogleMaps);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

/**
 * OAuth authorization routes. (API examples)
 */
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/foursquare');
});
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/tumblr');
});
app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/api' }), (req, res) => {
  res.redirect(req.session.returnTo);
});
app.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
app.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/api/pinterest');
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
module.exports.io = io;
module.exports = app;

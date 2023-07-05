const express = require('express');
const expressSession = require('express-session');
const app = express();
const model = require('./models');
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const passport = require('./lib/strategies/passport-jwt1');
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


app.use(expressSession({
    secret: "ewfewf",
    // resave: false,
    // saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use((err, req, res, next) => {
//   res.locals.error = err;
//   const status = err.status || 500;
//   res.status(status);
//   res.render('error');
// });

require("./controller")(app);

model.sequelize.authenticate()
    .then(() => {
    app.listen(3030, () => {
      console.log("running at localhost:3030");
    })
    }).catch((err) => {
    console.log(err);
    });

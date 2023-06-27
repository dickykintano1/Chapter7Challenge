const express = require('express');
const expressSession = require("express-session");
const app = express();
const model = require("./models");
const jwt = require("jsonwebtoken");
const passport = require("./lib/strategies/passport-jwt");
const checkRole = require("./lib/middleware/check_role");


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());


// app.use(
//     expressSession({
//       secret: "ewfewf",
//     })
//   );
  
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
  
});

require("./controller")(app);

model.sequelize.authenticate()
    .then(() => {
    app.listen(3030, () => {
      console.log("running at localhost:3030");
    })
    }).catch((err) => {
    console.log(err);
    });

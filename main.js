const express = require('express');
const expressSession = require("express-session");
const app = express();
const model = require("./models");

app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(
    expressSession({
      secret: "ewfewf",
    })
  );
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
    //dont forget to turn on postgres in terminal by typing psql
    //node filename to run
    //port db 5432

    //todo
    //make login page
    //join databases
    //make table pages that show databases
    //make form pages for crud
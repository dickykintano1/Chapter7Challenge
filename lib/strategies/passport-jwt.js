const passport = require("passport");
const PassortJWT = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const models = require('../../models');

// const users = require("../../data/user.json");
const users = models.user_game.findAll({})

passport.use(
  new PassortJWT(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: "bebasapapun",
    },
    (payload, done) => {
      const userFound = users.find((user) => {
        return user.id == payload.id;
      });

      if (userFound) {
        done(null, userFound);
      } else {
        done({ message: "user not found" }, false);
      }
    }
  )
);

module.exports = passport;

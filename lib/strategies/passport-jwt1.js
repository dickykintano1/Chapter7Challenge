const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const opts = {}
const models = require('../../models');
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'ini rahasia';

passport.serializeUser(function(user, done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    models.user_game.find({where: {id: user.id}}).success(function(user){
        done(null, user);
    })
})

passport.use(new JwtStrategy(opts, async (payload, done) => {
    console.log(jwtFromRequest)
    models.user_game.findOne({where: {id: payload.id}}).success(function (req, res, err, user){
        if (!user) {
            return done(null, false, {message: 'invalid credentials'})
            // throw Error ('user not found by passport')
        } else {
            return done(null, user);
        }
    })
    
}));

module.exports= passport;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const models = require('../../models');
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'ini rahasia';


passport.use(new JwtStrategy(opts, async function(payload, done) {
    const user = await models.user_game.findOne({where: {id: payload.id}})
    if (!user) {
        throw Error ('user not found by passport')
    }
    if (user) {
        console.log('user found')
        return done(null, user);
    } else {
        // return done(null, false);
        return 
        // or you could create a new account
    }

    // models.user_game.findOne({where: {id: payload.id}}, function (err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));
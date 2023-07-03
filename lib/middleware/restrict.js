const models = require('../../models');
const passport = require('passport')

module.exports = (role) => (req, res, next) => {
    //check token
    passport.authenticate('jwt', {session: false}), (req, res)=>{
        //check role
        if (role == 'superuser') {
            return next()
        }else if (role == 'user'){
            return next()
        }else{
            return res.status(405).json({
                message: "not allowed",
            });
        }
    }

    // if (req.session.accessToken){
    //     //check role
    //     if (role == 'superuser') {
    //         return next()
    //     }else if (role == 'user'){
    //         return next()
    //     }else{
    //         return res.status(405).json({
    //             message: "not allowed",
    //         });
    //     }
    // } else {
    //     res.redirect('/login')
    // }
}

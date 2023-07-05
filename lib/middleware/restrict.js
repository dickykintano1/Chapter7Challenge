const jwt = require("jsonwebtoken")


module.exports = (role) => (req, res, next) => {
    console.log('restriction on')
    try {
        const token = req.session.accessToken
        const rahasia = 'ini rahasia'
        payload = jwt.verify(token, rahasia)
        if(payload.username = req.session.User.username){
            if (role == 'superuser') {
                return next()
            }else if (role == 'user'){
                return next()
            }else{
                return res.status(405).json({
                    message: "not allowed",
                });
            }
        } else {
            console.log('redirected by restrict.js, jwt unmatched')
			return res.redirect('/login')
        }
            
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
            console.log('redirected by restrict.js')
			return res.redirect('/login')
		}
		// otherwise, return a bad request error
		return res.status(400).end()
	}
}

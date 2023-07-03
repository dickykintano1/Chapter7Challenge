const passport = require("passport");
const PassortJWT = require("passport-jwt").Strategy;
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt' )
const models = require('../../models');

// const users = require("../../data/user.json");
const users = models.user_game.findAll({})

/* Passport JWT Options */
const options = {
  // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
  Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
  secretOrKey: 'ini rahasia',
}

/* Fungsi untuk authentication */
//not used yet
async function authenticate(username, password, done) {
  try {
      // Memanggil method kita yang tadi
      // const user = await models.user_game.authenticate({ username, password })
      /*
      done adalah callback, parameter pertamanya adalah error,
      jika tidak ada error, maka kita beri null saja.
      Parameter keduanya adalah data yang nantinya dapat
      kita akses di dalam req.user */
      const user = await models.user_game.authenticate({ username, password }).then(user => {
				// res.json(
				// 	format(user)
				// )
				user.generateToken(req)
				console.log(req.session.accessToken)
				res.render('main_menu')
			}).catch(err=>{
				console.log(err)
				res.json({
					message: err.message
				})
			})
      return done(null, user)
  }
  catch(err) {
      /* Parameter ketiga akan dilempar ke dalam flash */
      return done(null, false, { message: err.message })
  }
}

// passport.use(
//   new PassortJWT(
//     {
//       jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//       secretOrKey: "bebasapapun",
//     },
//     (payload, done) => {
//       const userFound = users.find((user) => {
//         return user.id == payload.id;
//       });

//       if (userFound) {
//         done(null, userFound);
//       } else {
//         done({ message: "user not found" }, false);
//       }
//     }
//   )
// );

passport.use(new JwtStrategy (options, async (payload, done) => {
  // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
  models.findByPk (payload.id)
      .then(user => done(null, user))
      .catch(err => done(err, false))
}))
/* Serialize dan Deserialize
Cara untuk membuat sesi dan menghapus sesi
*/
passport.serializeUser(
  (user, done) => done(null, user.id)
)
passport.deserializeUser(
  async (id, done) => done(null, await models.findByPk(id))
)

module.exports = passport;

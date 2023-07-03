const User = require('./user_game_controller');
const UserGameHistory = require('./user_game_history_controller');
const UserGameBiodata = require('./user_game_biodata_controller');
const restrict = require('../lib/middleware/restrict');
const passport = require('passport');

const userRoute = () => {
    const router = require("express").Router();
    const controller = new User();
    const biodataController = new UserGameBiodata();
    const auth = require('./authController')
    require('../lib/strategies/passport-jwt1')

    router.get("/", controller.mainMenu);
    router.get("/signup", controller.signUpPage);
    router.post("/signup", auth.signup);

    router.get("/login", controller.loginPage);
    router.post("/login", auth.login);

    router.get("/user", restrict('user'), controller.userPage);
    router.get("/user", restrict('superuser'), controller.userPage);
    router.get("/game", restrict('user'), controller.gamePage);
    router.get("/passport", passport.authenticate('jwt', {session: false}), (req, res)=>{
        console.log(req.user)
        return res.status(200).send({
            success: true,
            user: {
                id: req.user.id,
                username: req.user.username
            }
        })
    });

    
    // const authenticated = router.use(checkLoginSession);
    // authenticated.get("/user", restrict, controller.userPage);
    // authenticated.get("/user", controller.userPage);
    // authenticated.get("/game", controller.gamePage);
    // authenticated.get("/bio-edit/:id", biodataController.edit);
    // authenticated.post("/bio-update/:id", biodataController.update);

    // router.get("/user", checkRole("user"), controller.userPage);
    // router.get("/game", checkRole("user"), controller.gamePage);
    // router.get("/bio-edit/:id", checkRole("user"), biodataController.edit);
    // router.get("/bio-update/:id", checkRole("user"), biodataController.update);

    // authenticated.get("/admin/user-data/:id", controller.showOneUser);
    // authenticated.get("/admin/update-user/:id", controller.update);
    // authenticated.get("/admin/delete-user/:id", controller.delete);

    // router.get("/admin/user-data/:id", checkRole("superuser"), controller.showOneUser);
    // router.get("/admin/update-user/:id", checkRole("superuser"), controller.update);
    // router.get("/admin/delete-user/:id", checkRole("superuser"), controller.delete);

    

    
    

    router.get("/logout", controller.logout);

    return router;
};

module.exports = (app) => {
    app.use("/", userRoute());
};

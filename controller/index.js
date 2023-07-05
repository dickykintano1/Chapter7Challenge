const User = require('./user_game_controller');
const UserGameHistory = require('./user_game_history_controller');
const UserGameBiodata = require('./user_game_biodata_controller');
const restrict = require('../lib/middleware/restrict');
const restrictLoginRegister = require('../lib/middleware/restrictLoginRegister')

const userRoute = () => {
    const router = require("express").Router();
    const controller = new User();
    const biodataController = new UserGameBiodata();
    const auth = require('./authController')
    require('../lib/strategies/passport-jwt1')

    router.get("/", restrictLoginRegister, controller.mainMenu);
    router.get("/signup", controller.signUpPage);
    router.post("/signup", auth.signup);

    router.get("/login", controller.loginPage);
    router.post("/login", auth.login);

    router.get("/user", restrict('user'), controller.userPage);
    router.get("/game", restrict('user'), controller.gamePage);

    router.get("/bio-edit/:id", restrict('user'), biodataController.edit);
    router.post("/bio-update/:id", restrict('user'), biodataController.update);

    // router.get("/user", checkRole("user"), controller.userPage);
    // router.get("/game", checkRole("user"), controller.gamePage);
    // router.get("/bio-edit/:id", checkRole("user"), biodataController.edit);
    // router.get("/bio-update/:id", checkRole("user"), biodataController.update);

    router.get("/admin/user-data/:id", restrict('superuser'), controller.showOneUser);
    router.get("/admin/update-user/:id", restrict('superuser'), controller.update);
    router.get("/admin/delete-user/:id", restrict('superuser'), controller.delete);

    // router.get("/admin/user-data/:id", checkRole("superuser"), controller.showOneUser);
    // router.get("/admin/update-user/:id", checkRole("superuser"), controller.update);
    // router.get("/admin/delete-user/:id", checkRole("superuser"), controller.delete);

    router.get("/logout", controller.logout);

    return router;
};

module.exports = (app) => {
    app.use("/", userRoute());
};

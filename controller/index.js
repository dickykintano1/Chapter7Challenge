const User = require('./user_game_controller');
const UserGameHistory = require('./user_game_history_controller');
const UserGameBiodata = require('./user_game_biodata_controller');

const userRoute = () => {
    const router = require("express").Router();
    const checkAuthenticationMiddleware = require("../middlewares/check_authentication");
    const controller = new User();
    const biodataController = new UserGameBiodata();

    router.get("/", controller.mainMenu);
    router.get("/signup", controller.signUpPage);
    router.post("/signup", controller.signUp);

    router.get("/login", controller.loginPage);
    router.post("/login", controller.doLogin);


    // router.get("/users", controller.allUsers);

    router.get("/tests", controller.tests);

    
    const authenticated = router.use(checkAuthenticationMiddleware);
    authenticated.get("/user", controller.userPage);
    authenticated.get("/game", controller.gamePage);

    authenticated.get("/admin/user-data/:id", controller.showOneUser);
    authenticated.get("/admin/update-user/:id", controller.update);
    authenticated.get("/admin/delete-user/:id", controller.delete);

    authenticated.get("/bio-edit/:id", biodataController.edit);
    authenticated.post("/bio-update/:id", biodataController.update);

    
    

    router.get("/logout", controller.logout);

    return router;
};

module.exports = (app) => {
    app.use("/", userRoute());
};

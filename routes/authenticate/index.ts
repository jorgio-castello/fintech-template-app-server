import express = require('express');
const authRouter = express.Router();

import AuthControllerType from '../../controllers/AuthController'; 
const AuthController = require('../../controllers/AuthController');
import AuthenticationFetch from '../../fetchHandlers/AuthenticationFetch';
const authenticationFetch = new AuthenticationFetch();

// Create database connection
let authController: AuthControllerType = new AuthController(authenticationFetch);
require('../../models/index').databaseInit((sequelize: any, AuthenticationModel: any) => {
    authController.setAuthenticationModel(AuthenticationModel);
    authRouter.route('/')
        .post(authController.authenticatePlaid);
    authRouter.route('/setPlaidToken')
        .post(authController.setPlaidToken);
});

module.exports.authRouter = authRouter;
module.exports.authController = authController;
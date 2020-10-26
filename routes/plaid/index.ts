import express = require('express');
const plaidRouter = express.Router();

const { authController } = require('../authenticate');

import PlaidControllerType from '../../controllers/PlaidController';
const PlaidController = require('../../controllers/PlaidController');
import PlaidFetch from '../../fetchHandlers/PlaidFetch';
const plaidFetch = new PlaidFetch();

const plaidController:PlaidControllerType = new PlaidController(authController, plaidFetch);

plaidRouter.route('/getAccounts')
    .post(plaidController.getAccounts);
plaidRouter.route('/getTransactions')
    .post(plaidController.getTransactions);

module.exports.plaidRouter = plaidRouter;
import express = require('express');
const { authRouter } = require('./authenticate');
const { plaidRouter } = require('./plaid'); 

module.exports = (app: express.Application) => {
    app.use('/authenticate', authRouter);
    app.use('/plaid', plaidRouter);
}
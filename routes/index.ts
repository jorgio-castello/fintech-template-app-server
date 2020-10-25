import express = require('express');
const { authRouter, authController } = require('./authenticate'); 

module.exports = (app: express.Application) => {
    app.use('/authenticate', authRouter);
}
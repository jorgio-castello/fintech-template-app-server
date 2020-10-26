import express = require('express');
import PlaidFetch from '../fetchHandlers/PlaidFetch';
import AuthController from './AuthController';

export default class PlaidController {
    private auth: AuthController;
    private fetch: PlaidFetch;
    
    constructor(authController: AuthController, plaidFetch: PlaidFetch) {
        this.auth = authController;
        this.fetch = plaidFetch;

        this.getAccounts = this.getAccounts.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
    }

    getAccounts(req: express.Request, res: express.Response): void {
        this.auth.getPlaidToken(req)
            .then(this.fetch.getPlaidAccounts)
            .then((accounts: any) => res.json(accounts))
            .catch((err: any) => { throw new Error(err); });
    }

    getTransactions(req: express.Request, res: express.Response): void {
        const { startDate, endDate } = req.body;
        
        this.auth.getPlaidToken(req)
            .then((accessToken: string) => this.fetch.getPlaidTransactions(accessToken, startDate, endDate))
            .then((transactions: any) => res.json(transactions))
            .catch((err: any) => { throw new Error(err); });
    }
}

module.exports = PlaidController;
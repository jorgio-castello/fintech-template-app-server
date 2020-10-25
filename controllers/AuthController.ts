import express = require('express');
import AuthenticationFetch from '../fetchHandlers/AuthenticationFetch';

export default class AuthController {
    authenticationModel: any;
    fetch: AuthenticationFetch;
    constructor(authenticationFetch: AuthenticationFetch) {
        this.fetch = authenticationFetch;
        
        this.authenticatePlaid = this.authenticatePlaid.bind(this);
        this.setPlaidToken = this.setPlaidToken.bind(this);
        this.getPlaidToken = this.getPlaidToken.bind(this);
    }

    setAuthenticationModel(AuthenticationModel: any): void {
        this.authenticationModel = AuthenticationModel.Authentication;
    }

    // Returns Plaid public access token<string | null>
    // If Plaid public access token exists, we're ready to go
    // If Plaid public access token does not exist, we need user to sign in with Plaid to integrate
    async authenticatePlaid(req: express.Request, res: express.Response): Promise<void> {
        const { sub } = req.body;
    
        const [user] = await this.authenticationModel.findOrCreate({ where: { auth0Token: sub } });

        res.json({ plaidPublicToken: user.plaidPublicToken })
    }

    // Updates user auth table to include Plaid Public, Access Tokens
    async setPlaidToken(req: express.Request, res: express.Response): Promise<void> {
        const { auth0Token, plaidPublicToken, metaData } = req.body;
        try {
            const { accessToken } = await this.fetch.exchangePlaidToken(plaidPublicToken);
            
            const authModel = await this.authenticationModel.findOne({ where: { auth0Token: auth0Token } });
            authModel.plaidPublicToken = plaidPublicToken;
            authModel.plaidAccessToken = accessToken;
            await authModel.save();

            res.json({ success: true });
        } catch (err: any) { 
            res.json({ success: false, messages: err });
            throw new Error(err);  
        }
    }

    async getPlaidToken(req: express.Request, res: express.Response): Promise<void> {

    }
}

module.exports = AuthController;
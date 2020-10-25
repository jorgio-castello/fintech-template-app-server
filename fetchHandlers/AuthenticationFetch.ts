import fetch from 'node-fetch';
import { PlaidTokenResponse } from '../interfaces/PlaidResponse';

export default class AuthenticationFetch {
    private plaidHost: string = process.env.PLAID_HOST || '';
    constructor() {}

    exchangePlaidToken(plaidPublicToken: string): Promise<PlaidTokenResponse> {
        return fetch(`${this.plaidHost}/api/exchangePublicToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicToken: plaidPublicToken }),
        })
        .then(res => res.json())
        .catch((err) => { throw new Error(err) });       
    }
}

module.exports = AuthenticationFetch;
import fetch from 'node-fetch';

export default class PlaidFetch {
    private plaidHost: string = process.env.PLAID_HOST || '';
    constructor() {

        this.getPlaidAccounts = this.getPlaidAccounts.bind(this);
        this.getPlaidTransactions = this.getPlaidTransactions.bind(this);
    }

    getPlaidAccounts(accessToken: string): Promise<any> { // need to work on Plaid Response types
        return fetch(`${this.plaidHost}/api/getAccounts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
        })
            .then(res => res.json())
            .catch((err: any) => { throw new Error(err) });
    }

    getPlaidTransactions(accessToken: string, startDate: string, endDate: string): Promise<any> {
        return fetch(`${this.plaidHost}/api/getTransactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, startDate, endDate }),
        })
            .then(res => res.json())
            .catch((err: any) => { throw new Error(err) });
    }
}

module.exports = PlaidFetch;
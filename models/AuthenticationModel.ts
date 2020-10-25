import { Sequelize, DataTypes, Model } from 'sequelize';

const AuthenticationModel = (sequelize:Sequelize, DataTypes:any) => {
    const authenticationModel = sequelize.define('auth', {
        auth0Token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        plaidPublicToken: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        plaidAccessToken: {
            type: DataTypes.STRING,
            unique: true,
        },
    });
    return authenticationModel; 
}

module.exports = AuthenticationModel;

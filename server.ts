require('dotenv').config();
import express = require('express');
import cors = require('cors');
const { databaseInit } = require('./models');

const app: express.Application = express();
app.use(express.json());
app.use(cors());

require('./routes')(app);

const port: string = process.env.PORT || '3001';
databaseInit((sequelize: any) => {
    sequelize.sync().then(() => {
        app.listen(port, () => console.log(`Application server running on Port ${port}...`));
    });
});
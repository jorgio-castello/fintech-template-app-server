require('dotenv').config();
import express = require('express');
import cors = require('cors');

const app: express.Application = express();
app.use(express.json());
app.use(cors());

const port: string = process.env.PORT || '3001';
app.listen(port, () => console.log(`Application server running on Port ${port}...`));
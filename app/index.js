require('dotenv').config();
const router = require('./routes/routes');
const express = require('express'),
  app = express();
const sequelize = require('./dBs/sequelize');
const displayRoutes = require('express-routemap');
const port = process.env.NODEJS_LOCAL_PORT || 3000;

const User = require('./models/sequelize/user.model');
sequelize.sync(User, { force: true });

app.use(express.json());
app.use(router);

app.listen(port, '0.0.0.0', () => {
  displayRoutes(app);
  console.log(`on port ${port}`);
});

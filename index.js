const express = require('express');
const { config } = require('./config/index');
const coworkingApi = require('./routes/coworkingApi');
const authApi = require('./routes/auth');

const app = express();
app.use(express.json());
authApi(app);
coworkingApi(app);

app.listen(config.port, () => {
  const debug = require('debug')('app:server');
  debug(`Listening http://localhost:${config.port}`)
});
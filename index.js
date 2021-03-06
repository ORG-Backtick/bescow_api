const express = require('express');
const cors = require('cors');
const { config } = require('./config/index');
const coworkingApi = require('./routes/coworkingApi');
const authApi = require('./routes/auth');
const emailApi = require('./routes/emailApi');

const app = express();
app.use(cors('*'));
app.use(express.json());
authApi(app);
coworkingApi(app);
emailApi(app);

app.listen(config.port, () => {
  const debug = require('debug')('app:server');
  debug(`Listening http://localhost:${config.port}`)
});

require('dotenv').config();

import { connect_db } from './lib/connect_db';
import User from './model/User';
import { app } from './server';
import { z_user_schema } from './z_schemas/User_Schema';

const PORT = process.env.PORT || 4000;

connect_db()
  .then(() => {
    app.listen(PORT, async () => {
      console.log('Hi on: ', 4000);
    });
  })
  .catch((err) => {
    console.log(`err while connecting to mongo db:\n ${err}`);
    process.exit();
  });

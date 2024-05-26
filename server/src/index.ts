require('dotenv').config();

import { connect_db } from './lib/connect_db';
import { app } from './server';

const PORT = process.env.PORT || 4000;

connect_db()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Hi on', 4000);
    });
  })
  .catch((err) => {
    console.log(`err while connecting to mongo db:\n ${err}`);
    process.exit();
  });

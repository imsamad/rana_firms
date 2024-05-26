import express from 'express';

import auth_rtr from './auth_rtr';

const routers = express();

routers.use('/auth', auth_rtr);

export default routers;

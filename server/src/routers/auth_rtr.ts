import express from 'express';
import { register_ctrl } from '../controllers/auth_ctrls';

const auth_rtr = express.Router();

auth_rtr.post('/register', register_ctrl);

export default auth_rtr;

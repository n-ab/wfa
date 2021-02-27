import * as express from 'express';

import { app as soundRouter }   from '../routers/soundRouter';

export const router = express.Router();

router.use('/sound',    soundRouter);
router.use('/file', soundRouter);

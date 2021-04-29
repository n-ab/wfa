import * as express from 'express';

import { app as soundRouter }   from '../routers/soundRouter';
import { app as userRouter }    from '../routers/userRouter';

export const router = express.Router();

router.use('/sound',    soundRouter);
router.use('/file',     soundRouter);
router.use('/user',     userRouter);

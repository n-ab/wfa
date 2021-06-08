import * as express from 'express';

import { app as soundRouter }   from '../routers/soundRouter';
import { app as userRouter }    from '../routers/userRouter';
import { app as cartRouter }    from '../routers/cartRouter';

export const router = express.Router();

router.use('/sound',    soundRouter);
router.use('/file',     soundRouter);
router.use('/user',     userRouter);
router.use('/cart',     cartRouter);

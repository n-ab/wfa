import * as express from 'express';

import { app as soundRouter }   from '../routers/soundRouter';
import { app as userRouter }    from '../routers/userRouter';
import { app as cartRouter }    from '../routers/cartRouter';
import { app as contactRouter } from '../routers/contactRouter';
import { app as adminRouter } from '../routers/adminRouter';
import { app as projectRouter } from '../routers/projectRouter';

export const router = express.Router();

router.use('/sound',    soundRouter);
router.use('/file',     soundRouter);
router.use('/user',     userRouter);
router.use('/cart',     cartRouter);
router.use('/contact',  contactRouter);
router.use('/admin',    adminRouter);
router.use('/project',  projectRouter);
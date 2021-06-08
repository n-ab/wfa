import * as express from 'express';
import * as cartController from '../controllers/cartcontroller';

export const app = express.Router();

app.get('/create', (req: any, res) => {
    if (req.user) {
        console.log(`creating USER cart for ${req.user}`);
        cartController.newUserCart(req.user._id);
    } else {
        console.log('creating GUEST cart');
    }
    
})
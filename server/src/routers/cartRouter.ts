import * as express from 'express';
import * as cartController from '../controllers/cartcontroller';
import * as soundController from '../controllers/soundController';

export const app = express.Router();

app.get('/create', (req: any, res) => {
    if (req.user) {
        console.log(`creating USER cart for ${req.user}`);
        cartController.newUserCart(req.user._id);
    } else {
        console.log('creating GUEST cart');
    }
    
})

app.post('/add', (req: any, res) => {
    if (req.user.cart) {
        console.log('USER HAS A CART');
        console.log('ADDING SOUND TO CART.');
        cartController.addSoundToCart(req.user._id, req.user.cart, req.body['params']['id']);
    }
})

app.post('/remove', (req: any, res) => {
    if (req.user.cart) {
        const updatedCart = cartController.removeSoundFromCart(req.user._id, req.user.cart, req.body['params']['id']);
        return updatedCart;
    }
})

app.get('/getCart', async (req: any, res) => {
    const cartSounds = await cartController.getCartFromUserId(req.user._id);
    console.log('/getCart - cartSounds = ', cartSounds);
    if (cartSounds) return res.status(200).json(cartSounds);
    return res.json('REEEE');
})

app.get('/populateCartSounds', async (req: any, res) => {
    const cartSounds = await cartController.populateCartSounds(req.user._id);
    if (cartSounds) return res.status(200).json(cartSounds);
    return res.json('REEEE');
})

app.get('/getCartSounds', async (req: any, res) => {
    console.log('^^^^^', req.body['params']);
    const cartSounds = await soundController.fetchTheseSounds(req.body['params']);
})
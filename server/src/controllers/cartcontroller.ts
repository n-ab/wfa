import { CartModel } from '../models/cart';
import { UserModel } from '../models/user';

export function newUserCart(userId) {
    console.log('userId: ', userId);
}

export function newGuestCart() {
    console.log('creating new guest cart...');
}

export async function addSoundToCart(userId, cartId, soundId) {
    const cart = await CartModel.findById(cartId);
    console.log('cart = ', cart);
    cart.sounds.push(soundId);
    cart.save();
    return cart;
}

export async function removeSoundFromCart(userId, cartId, soundId) {
    const cart = await CartModel.findById(cartId);
    console.log('cart found = ', cart);
    const index = cart.sounds.indexOf(soundId);
    cart.sounds.splice(index, 1);
    cart.save();
    return cart;
}

export async function getCartFromCartId(cartId: string) {
    const cart = await CartModel.findById(cartId);
    return cart;
}

export async function getCartFromUserId(userId: string) {
    return UserModel.findById(userId).then(async user => {
        const cart = await getCartFromCartId(user.cart);
        console.log('getCartFromUserId() - cart = ', cart);
        return cart;
    })
};

export async function populateCartSounds(userId: string) {
    const cart = await UserModel.findById(userId).then(user => user.cart);
    const cartSounds = await CartModel.findById(cart).populate('sounds').exec((err, sound) => {
        if (err) {console.log('err = ', err); return;}
        console.log('sound populated ===', sound);
    });
    const cartSoundsREE = CartModel.findById(cart).populate('sounds').then(sound => sound);
    return cartSoundsREE;
}
import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly key = "cart";
  private event = new EventEmitter<Cart>();

  constructor() { }

  private getCart(): Cart {
    const serializedCart = localStorage.getItem(this.key);
    return serializedCart ? JSON.parse(serializedCart) : { products: [] };
  }

  private saveCart(cart: Cart) {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(this.key, serializedCart);
    this.emitCart(cart);
  }

  private emitCart(cart = this.getCart()) {
    console.log(cart);
    this.event.emit(cart);
  }

  addItem(productId: number, quantity: number) {
    const cart = this.getCart();
    const index = cart.products.findIndex((p) => p.id === productId);

    if (index > -1) {
      cart.products[index].qty += quantity;
    } else {
      cart.products.push({ id: productId, qty: quantity });
    }

    this.saveCart(cart);
  }

  modifyItem(productId: number, quantity: number) {
    const cart = this.getCart();
    const index = cart.products.findIndex((p) => p.id = productId);

    if (index < 0) {
      throw `Cannot modify cart: no product with ID ${productId} present.`;
    }

    cart.products[index].qty = quantity;
    this.saveCart(cart);
  }

  removeItem(productId: number) {
    const cart = this.getCart();
    const index = cart.products.findIndex((p) => p.id = productId);

    if (index < 0) {
      throw `Cannot delete entry for product ID ${productId} from cart: entry not found.`;
    }

    cart.products.splice(index, 1);
    this.saveCart(cart);
  }

  subscribe(eventListener: (cart: Cart) => any): Subscription {
    const subscription = this.event.subscribe(eventListener);
    this.emitCart();
    return subscription;
  }
}

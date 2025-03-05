import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly key = "cart";
  private event = new EventEmitter<{ size: number, [id: number]: number }>();

  constructor() { }

  private getCart(): { [id: number]: number } {
    const serializedCart = localStorage.getItem(this.key);
    return serializedCart ? JSON.parse(serializedCart) : {};
  }

  private saveCart(cart: { [id: number]: number }) {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(this.key, serializedCart);
    this.emitCart(cart);
  }

  addItem(productId: number, quantity: number) {
    const cart = this.getCart();
    cart[productId] = (cart[productId] ?? 0) + quantity;
    this.saveCart(cart);
  }

  modifyItem(productId: number, quantity: number) {
    const cart = this.getCart();

    if (cart[productId] === undefined) {
      throw `Cannot modify cart: no product with ID ${productId} present.`;
    }

    cart[productId] = quantity;
    this.saveCart(cart);
  }

  removeItem(productId: number) {
    const cart = this.getCart();

    if (cart[productId] === undefined) {
      throw `Cannot delete entry for product ID ${productId} from cart: entry not found.`;
    }

    delete cart[productId];
    this.saveCart(cart);
  }

  emitCart(cart = this.getCart()) {
    this.event.emit({ size: Object.keys(cart).length, ...cart });
  }

  subscribe(eventListener: (cart: { size: number, [id: number]: number }) => any): Subscription {
    const subscription = this.event.subscribe(eventListener);
    this.emitCart();
    return subscription;
  }
}

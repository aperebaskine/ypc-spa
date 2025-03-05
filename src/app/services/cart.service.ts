import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly key = "cart";

  constructor() { }

  getCart(): { [id: number]: number } {
    const serializedCart = localStorage.getItem(this.key);
    return serializedCart ? JSON.parse(serializedCart) : {};
  }

  private saveCart(cart: { [id: number]: number }) {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(this.key, serializedCart);
  }

  addItem(productId: number, quantity: number) {
    const cart = this.getCart();
    cart[productId] = quantity;
    this.saveCart(cart);
    return cart;
  }

  modifyItem(productId: number, quantity: number) {
    const cart = this.getCart();

    if (cart[productId] === undefined) {
      throw `Cannot modify cart: no product with ID ${productId} present.`;
    }

    cart[productId] = quantity;
    this.saveCart(cart);
    return cart;
  }

  removeItem(productId: number) {
    const cart = this.getCart();

    if (cart[productId] === undefined) {
      throw `Cannot delete entry for product ID ${productId} from cart: entry not found.`;
    }

    delete cart[productId];
    this.saveCart(cart);
    return cart;
  }
}

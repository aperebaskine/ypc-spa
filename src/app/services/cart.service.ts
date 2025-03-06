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
    this.event.emit(cart);
  }

  addItem(productId: number, quantity: number, salePrice: number) {
    const cart = this.getCart();
    const index = cart.products.findIndex((p) => p.id === productId);

    if (index > -1) {
      if (cart.products[index].qty + quantity < 1) {
        this.removeItem(productId);
        return;
      }

      cart.products[index].qty += quantity;
    } else {
      cart.products.push({ id: productId, qty: quantity, salePrice: salePrice });
    }

    this.saveCart(cart);
  }

  modifyItem(productId: number, quantity: number, salePrice?: number) {

    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }

    const cart = this.getCart();
    const index = cart.products.findIndex((p) => p.id === productId);

    if (index < 0) {
      throw `Cannot modify cart: no product with ID ${productId} present.`;
    }

    cart.products[index].qty = quantity;

    if (salePrice !== null && salePrice !== undefined) {
      cart.products[index].qty = salePrice;
    }

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

  subscribe(eventListener: (cart: Cart) => any, emit: boolean = true): Subscription {
    const subscription = this.event.subscribe(eventListener);
    if (emit) {
      this.emitCart();
    }
    return subscription;
  }
}

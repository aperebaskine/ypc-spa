import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { Cart } from '../model/cart';
import { CartItem } from '../model/cartItem';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly key = "cart";

  private readonly cartSubject!: BehaviorSubject<Cart>;
  public readonly cart!: Observable<Cart>;

  private readonly addedItemSubject!: Subject<CartItem>;
  public readonly addedItem!: Observable<CartItem>;

  constructor(private authService: AuthenticationService) {
    this.cartSubject = new BehaviorSubject<Cart>(this.getCart());
    this.cart = this.cartSubject.asObservable();

    this.addedItemSubject = new Subject<CartItem>();
    this.addedItem = this.addedItemSubject.asObservable();

    this.authService.isAuthenticated.subscribe((auth) => {
      if (!auth) {
        this.clear();
      }
    })
  }

  private getCart(): Cart {
    const serializedCart = localStorage.getItem(this.key);
    return serializedCart ? JSON.parse(serializedCart) : { products: [] };
  }

  private saveCart(cart: Cart) {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(this.key, serializedCart);
    this.cartSubject.next(cart);
  }

  addItem(item: CartItem) {
    const cart = this.getCart();
    const index = cart.products.findIndex((p) => p.id === item.id);

    if (index > -1) {
      if (cart.products[index].qty + item.qty < 1) {
        this.removeItem(item.id);
        return;
      }

      cart.products[index].qty += item.qty;
    } else {
      cart.products.push({ id: item.id, name: item.name, qty: item.qty, salePrice: item.salePrice });
    }

    this.addedItemSubject.next(item);
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

  clear() {
    const cart = this.getCart();
    cart.products = [];
    this.saveCart(cart);
  }

}

import { Component } from '@angular/core';

interface CartItem {
  id: number;
  image_url: string;
  name: string;
  rate: number;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      image_url: '',
      name: 'Product 1',
      rate: 4.5,
      price: 10.99,
      quantity: 1
    },
    {
      id: 2,
      image_url: '',
      name: 'Product 2',
      rate: 3.8,
      price: 8.99,
      quantity: 3
    },
    {
      id: 3,
      image_url: 'https://example.com/product3.jpg',
      name: 'Product 3',
      rate: 4.2,
      price: 5.99,
      quantity: 2
    }
  ];

  displayedColumns: string[] = ['image', 'name', 'rate', 'price', 'quantity', 'remove'];

  updateQuantity(item: CartItem): void {
    // Perform any necessary logic when the quantity is updated
    console.log(`Quantity updated for ${item.name} (ID: ${item.id}): ${item.quantity}`);
  }

  removeItem(item: CartItem): void {
    // Remove the item from the cartItems array
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }
}

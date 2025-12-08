"use client";

import { useState } from "react";
import type { Product, CartItem } from "@/types/product";
import { ProductList } from "@/components/products/ProductList";
import { Cart } from "@/components/cart/Cart";
import { Checkout } from "@/components/checkout/Checkout";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

type Page = "shop" | "checkout" | "order-confirmation";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<Page>("shop");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleGoToCheckout = () => setCurrentPage("checkout");

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentPage("order-confirmation");
    setIsCartOpen(false);
  };

  return (
    <>
      {currentPage === "shop" && (
        <ProductList  />
      )}

      {currentPage === "checkout" && (
        <Checkout
          cartItems={cartItems}
          onBackToShop={() => setCurrentPage("shop")}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {currentPage === "order-confirmation" && (
        <OrderConfirmation onBackToShop={() => setCurrentPage("shop")} />
      )}

      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleGoToCheckout}
      />
    </>
  );
}

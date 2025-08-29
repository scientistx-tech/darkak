'use client';
import React, { useState } from 'react';
import BillingSection from './components/BillingSection';
import ProductSection from './components/ProductSection';

export default function Page() {
  const [cart, setCart] = useState<
    {
      productId: number;
      title: string;
      stock: number;
      totalPrice: number;
      quantity: number;
      ae_sku_attr?: string;
      options: {
        optionId: number;
        itemId: number;
      }[];
    }[]
  >([]);

  // Add item to cart
  const addToCart = (
    product: {
      productId: number;
      title: string;
      stock: number;
      totalPrice: number;
      ae_sku_attr?: string;
      options?: { optionId: number; itemId: number }[];
    },
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.productId &&
          JSON.stringify(item.options) === JSON.stringify(product.options || [])
      );

      if (existingIndex !== -1) {
        // Update quantity
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, product.stock);
        updated[existingIndex].quantity = newQty;
        updated[existingIndex].totalPrice = newQty * product.totalPrice;
        return updated;
      }

      // Add new item
      return [
        ...prev,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
          options: product.options || [],
          totalPrice: product.totalPrice * quantity,
        },
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number, options?: { optionId: number; itemId: number }[]) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.productId !== productId ||
          JSON.stringify(item.options) !== JSON.stringify(options || [])
      )
    );
  };

  // Reset cart
  const resetCart = () => setCart([]);

  return (
    <div className="flex gap-5 overflow-hidden">
      <div className="w-3/5">
        <p className="text-primary">Product Section</p>
        <ProductSection cart={cart} addToCart={addToCart} />
      </div>

      <div className="w-2/5">
        <p className="text-primary">Billing Section</p>
        <BillingSection
          cart={cart}
          setCart={setCart}
          removeFromCart={removeFromCart}
          resetCart={resetCart}
        />
      </div>
    </div>
  );
}

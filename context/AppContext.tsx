
import React, { createContext, useContext, ReactNode } from 'react';
import { Product, CartItem, Transaction } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { PRELOADED_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => Transaction;
  getProductByBarcode: (barcode: string) => Product | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', PRELOADED_PRODUCTS);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const addProductToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeProductFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  
  const updateCartItemQuantity = (productId: string, quantity: number) => {
     setCart((prevCart) => {
        if (quantity <= 0) {
            return prevCart.filter((item) => item.id !== productId);
        }
        return prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        );
     });
  };

  const clearCart = () => {
    setCart([]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `trx-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    
    // Decrease stock
    setProducts(prevProducts => {
        const newProducts = [...prevProducts];
        newTransaction.items.forEach(item => {
            const productIndex = newProducts.findIndex(p => p.id === item.id);
            if (productIndex !== -1) {
                newProducts[productIndex].stock -= item.quantity;
            }
        });
        return newProducts;
    });

    clearCart();
    return newTransaction;
  };

  const getProductByBarcode = (barcode: string): Product | undefined => {
    return products.find(p => p.barcode === barcode);
  }

  return (
    <AppContext.Provider value={{
      products,
      setProducts,
      transactions,
      setTransactions,
      cart,
      setCart,
      addProductToCart,
      removeProductFromCart,
      updateCartItemQuantity,
      clearCart,
      addTransaction,
      getProductByBarcode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

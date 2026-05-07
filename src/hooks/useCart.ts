import { useState, useCallback } from 'react';
import { fetchShopify } from '../lib/shopify';

const CART_ID_KEY = 'alexboots_cart_id';

const CART_CREATE = `
  mutation CartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface CartCreateData {
  cartCreate: {
    cart: { id: string; checkoutUrl: string };
    userErrors: Array<{ field: string; message: string }>;
  };
}

interface CartLinesAddData {
  cartLinesAdd: {
    cart: { id: string; checkoutUrl: string };
    userErrors: Array<{ field: string; message: string }>;
  };
}

async function createCart(): Promise<{ id: string; checkoutUrl: string }> {
  const data = await fetchShopify<CartCreateData>(CART_CREATE);
  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length) throw new Error(userErrors[0].message);
  return cart;
}

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(
    () => localStorage.getItem(CART_ID_KEY)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrCreateCart = useCallback(async (): Promise<string> => {
    if (cartId) return cartId;
    const cart = await createCart();
    localStorage.setItem(CART_ID_KEY, cart.id);
    setCartId(cart.id);
    return cart.id;
  }, [cartId]);

  // Returns the checkoutUrl after adding the item
  const addToCart = useCallback(
    async (variantId: string, quantity = 1): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        let id = await getOrCreateCart();

        const data = await fetchShopify<CartLinesAddData>(CART_LINES_ADD, {
          cartId: id,
          lines: [{ merchandiseId: variantId, quantity }],
        }).catch(async () => {
          // Stored cart may have expired — create a fresh one and retry
          localStorage.removeItem(CART_ID_KEY);
          const fresh = await createCart();
          localStorage.setItem(CART_ID_KEY, fresh.id);
          setCartId(fresh.id);
          id = fresh.id;
          return fetchShopify<CartLinesAddData>(CART_LINES_ADD, {
            cartId: id,
            lines: [{ merchandiseId: variantId, quantity }],
          });
        });

        const { cart, userErrors } = data.cartLinesAdd;
        if (userErrors.length) throw new Error(userErrors[0].message);
        return cart.checkoutUrl;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Cart error';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getOrCreateCart]
  );

  return { cartId, loading, error, addToCart };
}

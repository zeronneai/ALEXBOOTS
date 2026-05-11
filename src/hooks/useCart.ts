import { useState, useCallback, useEffect } from 'react';
import { fetchShopify } from '../lib/shopify';

const CART_ID_KEY = 'alexboots_cart_id';

export interface CartLine {
  id: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
  productTitle: string;
  imageUrl: string | null;
  price: { amount: string; currencyCode: string };
}

interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      title: string;
      images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    };
  };
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: { edges: Array<{ node: ShopifyCartLine }> };
  cost: { totalAmount: { amount: string; currencyCode: string } };
}

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
  cost { totalAmount { amount currencyCode } }
`;

const CART_CREATE      = `mutation { cartCreate { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const CART_LINES_ADD   = `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const CART_LINES_REMOVE = `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const GET_CART         = `query GetCart($cartId: ID!) { cart(id: $cartId) { ${CART_FIELDS} } }`;

type CartMutationResult<K extends string> = Record<K, { cart: ShopifyCart; userErrors: { field: string; message: string }[] }>;

function toLines(cart: ShopifyCart): CartLine[] {
  return cart.lines.edges.map(({ node: l }) => ({
    id: l.id,
    quantity: l.quantity,
    variantId: l.merchandise.id,
    variantTitle: l.merchandise.title,
    productTitle: l.merchandise.product.title,
    imageUrl: l.merchandise.product.images.edges[0]?.node.url ?? null,
    price: l.merchandise.price,
  }));
}

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(() => localStorage.getItem(CART_ID_KEY));
  const [lines, setLines] = useState<CartLine[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [total, setTotal] = useState<{ amount: string; currencyCode: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const applyCart = (cart: ShopifyCart) => {
    setLines(toLines(cart));
    setCheckoutUrl(cart.checkoutUrl);
    setTotal(cart.cost.totalAmount);
  };

  // Restore cart on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_ID_KEY);
    if (!stored) return;
    fetchShopify<{ cart: ShopifyCart | null }>(GET_CART, { cartId: stored })
      .then(data => { if (data.cart) applyCart(data.cart); })
      .catch(() => { localStorage.removeItem(CART_ID_KEY); setCartId(null); });
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cartId) return cartId;
    const data = await fetchShopify<CartMutationResult<'cartCreate'>>('mutation { cartCreate { cart { ' + CART_FIELDS + ' } userErrors { field message } } }');
    const { cart, userErrors } = data.cartCreate;
    if (userErrors.length) throw new Error(userErrors[0].message);
    applyCart(cart);
    localStorage.setItem(CART_ID_KEY, cart.id);
    setCartId(cart.id);
    return cart.id;
  }, [cartId]);

  const addToCart = useCallback(async (variantId: string, quantity = 1): Promise<void> => {
    setLoading(true);
    try {
      const id = await ensureCart();
      const data = await fetchShopify<CartMutationResult<'cartLinesAdd'>>(CART_LINES_ADD, {
        cartId: id,
        lines: [{ merchandiseId: variantId, quantity }],
      });
      const { cart, userErrors } = data.cartLinesAdd;
      if (userErrors.length) throw new Error(userErrors[0].message);
      applyCart(cart);
    } finally {
      setLoading(false);
    }
  }, [ensureCart]);

  const removeFromCart = useCallback(async (lineId: string): Promise<void> => {
    if (!cartId) return;
    setLoading(true);
    try {
      const data = await fetchShopify<CartMutationResult<'cartLinesRemove'>>(CART_LINES_REMOVE, {
        cartId,
        lineIds: [lineId],
      });
      const { cart, userErrors } = data.cartLinesRemove;
      if (userErrors.length) throw new Error(userErrors[0].message);
      applyCart(cart);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return { lines, itemCount, total, checkoutUrl, loading, addToCart, removeFromCart };
}

import type { ShopifyProduct } from './useProducts';

export type GenderFilter = 'all' | 'men' | 'women';

// Words that identify each gender — covers EN + ES tags/types
const MEN_WORDS   = /\b(men|male|hombre|caballero|cowboy|masculin)/i;
const WOMEN_WORDS = /\b(women|woman|female|mujer|dama|cowgirl|femenin)/i;

export function getProductGender(p: ShopifyProduct): 'men' | 'women' | 'untagged' {
  const corpus = [p.title, p.productType, ...p.tags].join(' ');
  if (WOMEN_WORDS.test(corpus)) return 'women';
  if (MEN_WORDS.test(corpus))   return 'men';
  return 'untagged';
}

export function filterByGender(products: ShopifyProduct[], filter: GenderFilter): ShopifyProduct[] {
  if (filter === 'all') return products;
  return products.filter(p => getProductGender(p) === filter);
}

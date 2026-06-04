import React from 'react';
import type { ShopifyProduct } from '../src/hooks/useProducts';
import HeroSection       from './home/HeroSection';
import BestSellersSection from './home/BestSellersSection';
import HeritageSection   from './home/HeritageSection';
import VideoSection      from './home/VideoSection';
import CategoriesSection from './home/CategoriesSection';
import FooterSection     from './home/FooterSection';

interface Props {
  products: ShopifyProduct[];
  productsLoading: boolean;
  onSelectProduct: (p: ShopifyProduct) => void;
  onShopClick: () => void;
  isReady: boolean;
}

const HomePage: React.FC<Props> = ({
  products, productsLoading, onSelectProduct, onShopClick, isReady,
}) => (
  <div className="w-full">
    <HeroSection        onShopClick={onShopClick} isReady={isReady} />
    <BestSellersSection products={products} loading={productsLoading} onSelectProduct={onSelectProduct} />
    <HeritageSection />
    <VideoSection />
    <CategoriesSection  onShopClick={onShopClick} />
    <FooterSection />
  </div>
);

export default HomePage;

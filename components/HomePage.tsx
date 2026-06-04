import React, { useState } from 'react';
import type { ShopifyProduct } from '../src/hooks/useProducts';
import type { GenderFilter } from '../src/hooks/useGenderFilter';
import HeroSection        from './home/HeroSection';
import CategoriesSection  from './home/CategoriesSection';
import HeritageSection    from './home/HeritageSection';
import ProcessSection     from './home/ProcessSection';
import VideoSection       from './home/VideoSection';
import BestSellersSection from './home/BestSellersSection';
import GallerySection     from './home/GallerySection';
import StoreSection       from './home/StoreSection';
import FooterSection      from './home/FooterSection';

interface Props {
  products: ShopifyProduct[];
  productsLoading: boolean;
  onSelectProduct: (p: ShopifyProduct) => void;
  onShopClick: () => void;
  isReady: boolean;
  onShopAll?: () => void;
}

const HomePage: React.FC<Props> = ({
  products, productsLoading, onSelectProduct, onShopClick, isReady, onShopAll,
}) => {
  const [activeFilter, setActiveFilter] = useState<GenderFilter>('all');

  const handleCategoryClick = (filter: GenderFilter) => {
    setActiveFilter(filter);
    setTimeout(() => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="w-full">
      <HeroSection        onShopClick={onShopClick} isReady={isReady} />
      <CategoriesSection  onCategoryClick={handleCategoryClick} />
      <HeritageSection />
      <ProcessSection />
      <VideoSection />
      <BestSellersSection
        products={products}
        loading={productsLoading}
        onSelectProduct={onSelectProduct}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onShopAll={onShopAll ?? onShopClick}
      />
      <GallerySection />
      <StoreSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;

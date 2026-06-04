import React, { useState } from 'react';
import type { ShopifyProduct } from '../src/hooks/useProducts';
import type { GenderFilter } from '../src/hooks/useGenderFilter';
import HeroSection        from './home/HeroSection';
import CategoriesSection  from './home/CategoriesSection';
import HeritageSection    from './home/HeritageSection';
import VideoSection       from './home/VideoSection';
import BestSellersSection from './home/BestSellersSection';
import FooterSection      from './home/FooterSection';

interface Props {
  products: ShopifyProduct[];
  productsLoading: boolean;
  onSelectProduct: (p: ShopifyProduct) => void;
  onShopClick: () => void;
  isReady: boolean;
}

const HomePage: React.FC<Props> = ({
  products, productsLoading, onSelectProduct, onShopClick, isReady,
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
      <VideoSection />
      <BestSellersSection
        products={products}
        loading={productsLoading}
        onSelectProduct={onSelectProduct}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <FooterSection />
    </div>
  );
};

export default HomePage;

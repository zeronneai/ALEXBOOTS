import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../constants';

interface CategoryModalProps {
  isOpen: boolean;
  category: string | null;
  onClose: () => void;
}

// Data Models
interface CatalogItem {
  title: string;
  img: string;
  actionTarget?: string; // The view ID to navigate to
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, category, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  // Navigation History Stack. Last item is current view.
  const [viewStack, setViewStack] = useState<string[]>([]);

  // --- DATA CONFIGURATION ---

  // 1. ROOT VIEW (Main Departments)
  const rootItems: CatalogItem[] = [
    { title: "MEN'S COLLECTION", img: ASSETS.MEN_BG, actionTarget: "MEN" },
    { title: "WOMEN'S COLLECTION", img: ASSETS.WOMEN_BG, actionTarget: "WOMEN" },
    { title: "KIDS COLLECTION", img: ASSETS.KIDS_BG, actionTarget: "KIDS" },
    { title: "WORK & UNIFORM", img: ASSETS.UNIFORM_BG, actionTarget: "UNIFORM" }
  ];

  // 2. MEN'S VIEW
  const menItems: CatalogItem[] = [
    { 
      title: "EXOTICS", 
      img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770667642/A_photorealistic_cinematic_4k_202602091404_cqpgr5.jpg", 
      actionTarget: "MEN_EXOTICS" 
    },
    { 
      title: "WESTERN RANCH", 
      img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770667644/A_rugged_cinematic_4k_202602091403_gzpj2c.jpg",
      actionTarget: "MEN_WESTERN_RANCH"
    },
    { 
      title: "EXOTIC PRINT", 
      img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770667644/A_luxurious_cinematic_4k_202602091403_xscfsi.jpg",
      actionTarget: "MEN_EXOTIC_PRINT"
    }
  ];

  // 2.a MEN'S EXOTICS (Drill down)
  const menExoticsItems: CatalogItem[] = [
    { title: "PIRARUCU", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2912&auto=format&fit=crop" },
    { title: "PYTHON", img: "https://images.unsplash.com/photo-1532328014524-7669d2d6c075?q=80&w=2835&auto=format&fit=crop" },
    { title: "OSTRICH", img: "https://images.unsplash.com/photo-1559563458-52c6952d7907?q=80&w=2860&auto=format&fit=crop" },
    { title: "WILD GATOR", img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2940&auto=format&fit=crop" }
  ];

  // 2.b MEN'S WESTERN RANCH (Drill down)
  const menWesternRanchItems: CatalogItem[] = [
    { title: "ROUGH OUT", img: "https://images.unsplash.com/photo-1520639888713-78db11c0dd5a?q=80&w=2780&auto=format&fit=crop" }, // Textured/Suede look
    { title: "WESTERN", img: "https://images.unsplash.com/photo-1533633355057-0b639912c337?q=80&w=1974&auto=format&fit=crop" }, // Classic
    { title: "TEJIDA", img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2787&auto=format&fit=crop" }, // Woven detail look
    { title: "COWHIDE", img: "https://images.unsplash.com/photo-1589163829023-e18751543fc0?q=80&w=2787&auto=format&fit=crop" } // Hide
  ];

  // 2.c MEN'S EXOTIC PRINT (Drill down)
  const menExoticPrintItems: CatalogItem[] = [
    { title: "PIRARUCU", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2912&auto=format&fit=crop" },
    { title: "PYTHON", img: "https://images.unsplash.com/photo-1532328014524-7669d2d6c075?q=80&w=2835&auto=format&fit=crop" },
    { title: "STINGRAY", img: "https://images.unsplash.com/photo-1550948537-130a1ce83314?q=80&w=2944&auto=format&fit=crop" }, // Speckled texture look
    { title: "CAIMAN TOP", img: "https://images.unsplash.com/photo-1551655510-555dc3be8633?q=80&w=2787&auto=format&fit=crop" }, // Croc texture look
    { title: "OSTRICH", img: "https://images.unsplash.com/photo-1559563458-52c6952d7907?q=80&w=2860&auto=format&fit=crop" },
    { title: "LIZARD", img: "https://images.unsplash.com/photo-1548126032-079a0fb00992?q=80&w=2787&auto=format&fit=crop" } // Scaly texture
  ];

  // 3. WOMEN'S VIEW (Requested Categories)
  const womenItems: CatalogItem[] = [
    { title: "ROUGH OUT", img: "https://images.unsplash.com/photo-1628203022248-e87e1488c594?q=80&w=2940&auto=format&fit=crop" },
    { title: "WESTERN", img: "https://images.unsplash.com/photo-1589163829023-e18751543fc0?q=80&w=2787&auto=format&fit=crop" },
    { title: "TEJIDA", img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=2940&auto=format&fit=crop" },
    { title: "COWHIDE", img: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=2864&auto=format&fit=crop" }
  ];

  // 4. KIDS VIEW (Requested Categories)
  const kidsItems: CatalogItem[] = [
    { title: "PRINT", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770668085/A_cool_cinematic_4k_202602091407_xi7gsx.jpg" },
    { title: "WESTERN", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770668107/A_cute_photorealistic_4k_202602091408_dxzseq.jpg" }
  ];

  // 5. UNIFORM VIEW
  const uniformItems: CatalogItem[] = [
    { title: "TACTICAL", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2787&auto=format&fit=crop" },
    { title: "WORK", img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2787&auto=format&fit=crop" }
  ];


  // --- INITIALIZATION LOGIC ---
  useEffect(() => {
    if (isOpen && category) {
      document.body.style.overflow = 'hidden';
      
      // Determine initial view based on the category string passed from App.tsx
      const upperCat = category.toUpperCase();
      let initialView = "ROOT"; // Default to root (Legacy & Leather / Explore Collection)

      if (upperCat.includes("MEN") && !upperCat.includes("WO")) {
        initialView = "MEN";
      } else if (upperCat.includes("WOMEN")) {
        initialView = "WOMEN";
      } else if (upperCat.includes("KID") || upperCat.includes("LITTLE")) {
        initialView = "KIDS";
      } else if (upperCat.includes("UNIFORM") || upperCat.includes("WORK")) {
        initialView = "UNIFORM";
      }
      
      setViewStack([initialView]);

      const tl = gsap.timeline();
      tl.to(modalRef.current, { y: "0%", duration: 0.8, ease: "expo.inOut" })
        .to(contentRef.current, { opacity: 1, duration: 0.5 }, "-=0.3");

    } else if (!isOpen) {
      document.body.style.overflow = '';
      const tl = gsap.timeline();
      tl.to(contentRef.current, { opacity: 0, duration: 0.3 })
        .to(modalRef.current, { y: "100%", duration: 0.8, ease: "expo.inOut" }, "-=0.1");
    }
  }, [isOpen, category]);


  // --- NAVIGATION LOGIC ---
  
  const handleItemClick = (item: CatalogItem) => {
    if (item.actionTarget) {
      animateTransition(() => {
        setViewStack(prev => [...prev, item.actionTarget!]);
      });
    }
  };

  const handleBack = () => {
    if (viewStack.length > 1) {
      animateTransition(() => {
        setViewStack(prev => prev.slice(0, -1));
      });
    } else {
      onClose();
    }
  };

  const animateTransition = (callback: () => void) => {
    if (itemsContainerRef.current) {
      gsap.to(itemsContainerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          callback();
          gsap.set(itemsContainerRef.current, { y: -20 });
          gsap.to(itemsContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1
          });
        }
      });
    } else {
      callback();
    }
  };


  // --- RENDER HELPERS ---

  const getCurrentViewData = () => {
    const currentView = viewStack[viewStack.length - 1];
    
    switch (currentView) {
      case "ROOT":
        return { title: "SELECT DEPARTMENT", items: rootItems };
      case "MEN":
        return { title: "MEN'S COLLECTION", items: menItems };
      case "MEN_EXOTICS":
        return { title: "MEN'S EXOTICS", items: menExoticsItems };
      case "MEN_WESTERN_RANCH":
        return { title: "WESTERN RANCH", items: menWesternRanchItems };
      case "MEN_EXOTIC_PRINT":
        return { title: "EXOTIC PRINT", items: menExoticPrintItems };
      case "WOMEN":
        return { title: "WOMEN'S COLLECTION", items: womenItems };
      case "KIDS":
        return { title: "LITTLE RANCHERS", items: kidsItems };
      case "UNIFORM":
        return { title: "WORK & UNIFORM", items: uniformItems };
      default:
        return { title: "CATALOG", items: [] };
    }
  };

  const { title: displayTitle, items: currentItems } = getCurrentViewData();
  const canGoBack = viewStack.length > 1;

  return (
    <div 
      ref={modalRef} 
      className="fixed top-0 left-0 w-full h-full bg-card-bg z-[2000] translate-y-full flex flex-col pointer-events-auto overflow-hidden"
      style={{ pointerEvents: isOpen ? 'all' : 'none' }}
    >
      {/* Navigation Controls */}
      <div className="absolute top-8 w-full px-12 z-50 flex justify-between items-center text-white font-main text-sm tracking-[2px]">
        {canGoBack ? (
           <div 
             className="cursor-pointer interactable hover:text-accent-gold transition-colors duration-300 flex items-center gap-2"
             onClick={handleBack}
           >
             <span>[ &lt; ]</span> BACK
           </div>
        ) : (
          <div className="text-white/30">MAIN MENU</div> 
        )}

        <div 
          className="cursor-pointer interactable hover:text-accent-gold transition-colors duration-300" 
          onClick={onClose}
        >
          CLOSE [ X ]
        </div>
      </div>

      <div ref={contentRef} className="w-full h-full flex flex-col justify-center items-center opacity-0 px-4 md:px-10 py-10">
        <h2 className="font-western text-3xl md:text-5xl text-accent-gold mb-8 uppercase tracking-[0.1em] whitespace-pre-line text-center">
          {displayTitle}
        </h2>

        {currentItems.length > 0 ? (
          <div ref={itemsContainerRef} className="flex w-full h-[60vh] gap-2 md:gap-4 max-w-[1600px] overflow-x-auto">
            {currentItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => handleItemClick(item)}
                className={`
                  relative flex-1 min-w-[200px] md:min-w-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                  group overflow-hidden border border-white/5 hover:border-gold/50 rounded-sm
                  ${item.actionTarget ? 'cursor-pointer hover:flex-[2.5]' : 'hover:flex-[2]'}
                `}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5] grayscale-[30%] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-center">
                  <h3 className="font-western text-xl md:text-2xl text-gold tracking-widest text-center transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-lg">
                    {item.title}
                  </h3>
                  {item.actionTarget && (
                     <span className="font-main text-[10px] text-white/70 tracking-[2px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase">
                       Explore
                     </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-white/10 p-20 w-full max-w-4xl h-[50vh] bg-white/5">
            <p className="font-main text-[#666] text-xl tracking-widest uppercase">
              Coming Soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
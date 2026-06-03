
// Cloudinary auto-format + auto-quality + sized delivery (WebP/AVIF, ~80% lighter than raw 4K)
const CLD = (id: string, w = 1920) =>
  `https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto,w_${w}/${id}`;

export const ASSETS = {
  LOGO_ICON: CLD("v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png", 320),
  HERO_BG: CLD("v1770662473/Generate_an_image_4k_202602091232_rhvqcj.jpg"),
  MEN_BG: CLD("v1770663886/Image_202602091253_qbxi2p.jpg"),
  WOMEN_BG: CLD("v1770663880/A_cinematic_fashion_4k_202602091301_xongup.jpg"),
  LOGO: CLD("v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png", 320),
};

export const SOCIALS = [
  { name: "Instagram", url: "https://instagram.com" },
  { name: "Facebook", url: "https://facebook.com" },
  { name: "Twitter", url: "https://twitter.com" }
];

export const SECTIONS_DATA = [
  {
    id: 0,
    title: "LEGACY & LEATHER",
    subtitle: "Since 1985. El Paso, Texas. The tradition of handcrafted work meets the luxury of modern design.",
    img: ASSETS.HERO_BG,
    button: "EXPLORE COLLECTION",
    align: "center",
    isHero: true
  },
  {
    id: 1,
    title: "MEN'S\nCOLLECTION",
    subtitle: "Exotics, Ropers, and Classics. Designed to command respect with every step. Crafted from the finest leathers.",
    img: ASSETS.MEN_BG,
    button: "VIEW CATALOG",
    align: "left"
  },
  {
    id: 2,
    title: "WOMEN'S\nELEGANCE",
    subtitle: "Style that transcends. From the rodeo to the city. Boots with refined details and bold silhouettes.",
    img: ASSETS.WOMEN_BG,
    button: "VIEW CATALOG",
    align: "right"
  },
  {
    id: 3,
    title: "CONTACT\nUS",
    subtitle: "Have questions or custom orders? We're ready to help.",
    img: "https://images.unsplash.com/photo-1447968954315-3f0c44f7313c?q=70&w=1600&auto=format&fit=crop",
    button: "",
    align: "center",
    isContact: true
  },
  {
    id: 4,
    title: "FREQUENT\nQUESTIONS",
    subtitle: "Everything you need to know before your next purchase.",
    img: "https://images.unsplash.com/photo-1612459954497-6a107386d9a1?q=70&w=1600&auto=format&fit=crop",
    button: "",
    align: "left",
    isFaq: true,
    faqItems: [
      {
        question: "Do you ship across Mexico and the USA?",
        answer: "Yes, we ship across the continent with shipping insurance included on every pair to guarantee they arrive in perfect condition."
      },
      {
        question: "What if they don't fit?",
        answer: "Your satisfaction comes first. You have 15 days for size exchanges at no extra cost. We want them to fit like a glove."
      },
      {
        question: "Are the exotic leathers genuine?",
        answer: "Absolutely. All of our products include a CITES certificate of authenticity, guaranteeing legal and sustainable sourcing."
      }
    ]
  }
];

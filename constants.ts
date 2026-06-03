
export const ASSETS = {
  LOGO_ICON: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png",
  HERO_BG: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770662473/Generate_an_image_4k_202602091232_rhvqcj.jpg",
  MEN_BG: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770663886/Image_202602091253_qbxi2p.jpg",
  WOMEN_BG: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770663880/A_cinematic_fashion_4k_202602091301_xongup.jpg",
  KIDS_BG: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770663880/Cute_little_kid_4k_202602091255_z7wnqp.jpg",
  UNIFORM_BG: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770663892/Heavy_duty_work_4k_202602091255_mmfe4i.jpg",
  VIDEO_BG: "https://assets.mixkit.co/videos/preview/mixkit-western-landscape-view-4009-large.mp4",
  LOGO: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png",
  CAT_MEN: "https://images.unsplash.com/photo-1533633355057-0b639912c337?q=80&w=1974&auto=format&fit=crop",
  CAT_WOMEN: "https://images.unsplash.com/photo-1549637642-90187f64f420?q=80&w=2948&auto=format&fit=crop",
  CAT_KIDS: "https://images.unsplash.com/photo-1603145733190-59811e523c72?q=80&w=2940&auto=format&fit=crop",
  CAT_UNIFORM: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2787&auto=format&fit=crop",
  SHOWCASE_IMG: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2787&auto=format&fit=crop"
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
    img: "https://images.unsplash.com/photo-1447968954315-3f0c44f7313c?q=80&w=2787&auto=format&fit=crop",
    button: "",
    align: "center",
    isContact: true
  },
  {
    id: 4,
    title: "FREQUENT\nQUESTIONS",
    subtitle: "Everything you need to know before your next purchase.",
    img: "https://images.unsplash.com/photo-1612459954497-6a107386d9a1?q=80&w=2787&auto=format&fit=crop",
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

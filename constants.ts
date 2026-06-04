// Cloudinary: auto-format (WebP/AVIF) + auto-quality + resize
const CLD = (id: string, w = 1920) =>
  `https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto,w_${w}/${id}`;

export const ASSETS = {
  LOGO_ICON: CLD('v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png', 320),
  HERO_BG:   CLD('v1770662473/Generate_an_image_4k_202602091232_rhvqcj.jpg'),
  MEN_BG:    CLD('v1770663886/Image_202602091253_qbxi2p.jpg'),
  WOMEN_BG:  CLD('v1770663880/A_cinematic_fashion_4k_202602091301_xongup.jpg'),
};

export const CONTACT = {
  email:     'Ranchersbootco@gmail.com',
  phone:     '(915) 872-9526',
  whatsapp:  'https://wa.me/19158729526',
  instagram: 'https://instagram.com/ranchersbootco',
  facebook:  'https://www.facebook.com/ranchersbootco',
  address:   '2100 Stemmons Freeway, 10963-WTC\nDallas, TX 75207',
};

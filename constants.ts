// Cloudinary: auto-format (WebP/AVIF) + auto-quality + resize
const CLD = (id: string, w = 1920) =>
  `https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto,w_${w}/${id}`;

export const ASSETS = {
  LOGO_ICON:    CLD('v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png', 320),
  LOGO_HERO:    CLD('v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png', 900),
  HERO_BG:      CLD('v1780613436/GENERA_ESA_MISMA_IMAGEN_EN_202606041648_qmtxts.jpg'),
  MEN_BG:       CLD('v1770663886/Image_202602091253_qbxi2p.jpg'),
  WOMEN_BG:     CLD('v1770663880/A_cinematic_fashion_4k_202602091301_xongup.jpg'),
  HERITAGE_BG:  CLD('v1780673106/Generate_an_image_using_the_202606050848_ye8dlx.jpg'),
  PROCESS_BG:   CLD('v1770668085/A_cool_cinematic_4k_202602091407_xi7gsx.jpg'),
  GALLERY: [
    CLD('v1780673105/GENERA_ESA_IMAGEN_EN_FORMA_202606050859_bq8pni.jpg'),
    CLD('v1780673105/GENERA_ESA_IMAGEN_EN_FORMA_202606050908_xciczo.jpg'),
    CLD('v1780673105/Generate_an_image_using_the_202606050912_ztgzto.jpg'),
    CLD('v1780673104/Generate_an_image_using_the_202606050911_fb34nr.jpg'),
    CLD('v1780673104/Generate_an_image_using_the_202606050914_x8c9qw.jpg'),
    CLD('v1780673103/Generate_an_image_using_the_202606050920_hcp0lp.jpg'),
    CLD('v1780673103/GENERA_ESA_IMAGEN_EN_FORMA_202606050922_g3eza8.jpg'),
    CLD('v1780673103/GENERA_ESA_IMAGEN_EN_FORMA_202606050924_j9mfrc.jpg'),
  ],
};

export const CONTACT = {
  email:     'Ranchersbootco@gmail.com',
  phone:     '(915) 872-9526',
  whatsapp:  'https://wa.me/19158729526',
  instagram: 'https://instagram.com/ranchersbootco',
  facebook:  'https://www.facebook.com/ranchersbootco',
  address:   '2100 Stemmons Freeway, 10963-WTC\nDallas, TX 75207',
};

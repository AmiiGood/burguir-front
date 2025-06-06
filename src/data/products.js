//Imagenes
import cyberpunkImage from "../assets/images/principalImages/cyberpunk.avif";
import tlou2Image from "../assets/images/principalImages/thelastofusp2.jpg";
import gtaVImage from "../assets/images/principalImages/gtaV.webp";
import eldenringImage from "../assets/images/principalImages/eldenring.avif";
import rdr2Image from "../assets/images/principalImages/rdr2.jpg";
import horizonImage from "../assets/images/principalImages/horizon.webp";
import godOfWarImage from "../assets/images/principalImages/gow.jpg";
import witcher4Image from "../assets/images/principalImages/the_witcher_4.jpeg";
import ghostOfTsushimaImage from "../assets/images/principalImages/ghostoftsushima.jpg";
import spidermanImage from "../assets/images/principalImages/spiderman2.jpg";
import hogwartsLegacyImage from "../assets/images/principalImages/hogwartslegacy.avif";
import sekiroImage from "../assets/images/principalImages/sekiro.webp";
import hollowKnightImage from "../assets/images/principalImages/hollowknight.avif";
import hadesImage from "../assets/images/principalImages/hades.avif";
import stardewValleyImage from "../assets/images/principalImages/stardewvalley.jpg";
import minecraftImage from "../assets/images/principalImages/minecraft.avif";
import strayImage from "../assets/images/principalImages/stray.avif";
import assassinsCreedImage from "../assets/images/principalImages/acshadows.avif";
import doomEternalImage from "../assets/images/principalImages/doom.avif";
import finalFantasyImage from "../assets/images/principalImages/finalfantasy.jpg";
import controlImage from "../assets/images/principalImages/control.jpg";
import celeste from "../assets/images/principalImages/celeste.avif";
import baldursImage from "../assets/images/principalImages/baldurs.avif";
import falloutImage from "../assets/images/principalImages/fallout.webp";
import unchartedImage from "../assets/images/principalImages/uncharted4.avif";
import deathstrandingImage from "../assets/images/principalImages/deathstranding.jpg";
import elysiumImage from "../assets/images/principalImages/discoelysium.avif";
import persona5Image from "../assets/images/principalImages/persona5.webp";

//Previews
import tlou2Preview from "../assets/previews/tlou2.gif";
import gtaVPreview from "../assets/previews/gtaV.gif";
import cyberpunkPreview from "../assets/previews/cyberpunk.gif";
import eldenringPreview from "../assets/previews/eldenring.gif";
import rdr2Preview from "../assets/previews/rdr2.gif";
import horizonPreview from "../assets/previews/horizon.gif";
import gowRagnarokPreview from "../assets/previews/gowragnarok.gif";
import thewitcher4Preview from "../assets/previews/thewitcher4.gif";
import ghostOfTsushimaPreview from "../assets/previews/ghostoftsushima.gif";
import spidermanPreview from "../assets/previews/spiderman2.gif";
import hogwartsLegacyPreview from "../assets/previews/hogwartsLegacy.gif";
import sekiroPreview from "../assets/previews/sekiro.gif";
import hollowKnightPreview from "../assets/previews/hollowknight.gif";
import hadesPreview from "../assets/previews/hades.gif";
import stardewValleyPreview from "../assets/previews/stardewvalley.gif";
import minecraftPreview from "../assets/previews/minecraft.gif";
import strayPreview from "../assets/previews/stray.gif";
import assassinsCreedImagePreview from "../assets/previews/acshadows.gif";
import doomEternalImagePreview from "../assets/previews/doom.gif";
import finalFantasyImagePreview from "../assets/previews/finalfantasyVII.gif";
import controlImagePreview from "../assets/previews/control.gif";
import celestePreview from "../assets/previews/celeste.gif";
import baldursImagePreview from "../assets/previews/baldurs.gif";
import falloutImagePreview from "../assets/previews/fallout4.gif";
import unchartedImagePreview from "../assets/previews/uncharted4.gif";
import persona5ImagePreview from "../assets/previews/persona5.gif";
import elysiumImagePreview from "../assets/previews/discoelysium.gif";
import deathstrandingImagePreview from "../assets/previews/deathStranding.gif";

//Gallery Images
import galleryImageTlou2_1 from "../assets/images/galleryImages/tlou2_1.webp";
import galleryImageTlou2_2 from "../assets/images/galleryImages/tlou2_2.webp";
import galleryImageTlou2_3 from "../assets/images/galleryImages/tlou2_3.webp";
import galleryImageGTAV_1 from "../assets/images/galleryImages/gtaV_1.jpg";
import galleryImageGTAV_2 from "../assets/images/galleryImages/gtaV_2.jpg";
import galleryImageGTAV_3 from "../assets/images/galleryImages/gtaV_3.jpg";
import galleryImageCyberpunk_1 from "../assets/images/galleryImages/cyberpunk_1.jpg";
import galleryImageCyberpunk_2 from "../assets/images/galleryImages/cyberpunk_2.jpg";
import galleryImageCyberpunk_3 from "../assets/images/galleryImages/cyberpunk_3.jpg";
import galleryImageEldenring_1 from "../assets/images/galleryImages/eldenring_1.jpg";
import galleryImageEldenring_2 from "../assets/images/galleryImages/eldenring_2.jpg";
import galleryImageEldenring_3 from "../assets/images/galleryImages/eldenring_3.jpg";
import galleryImageRDR2_1 from "../assets/images/galleryImages/rdr2_1.jpg";
import galleryImageRDR2_2 from "../assets/images/galleryImages/rdr2_2.jpg";
import galleryImageRDR2_3 from "../assets/images/galleryImages/rdr2_3.jpg";
import galleryImageHorizon_1 from "../assets/images/galleryImages/horizon_1.jpg";
import galleryImageHorizon_2 from "../assets/images/galleryImages/horizon_2.jpg";
import galleryImageHorizon_3 from "../assets/images/galleryImages/horizon_3.jpg";

export const products = [
  {
    id: 1,
    title: "The Last of Us Part II",
    accountLevel: 78,
    hoursPlayed: 1240,
    items: 156,
    achievements: 87,
    price: 49.99,
    discount: 40,
    image: tlou2Image,
    youtubeVideoId: "O6MdexNSy3o",
    hoverPreview: tlou2Preview,
    galleryImages: [
      tlou2Image,
      galleryImageTlou2_1,
      galleryImageTlou2_2,
      galleryImageTlou2_3,
    ],
    type: "AAA",
  },
  {
    id: 2,
    title: "GTA V",
    accountLevel: 120,
    hoursPlayed: 890,
    items: 235,
    achievements: 76,
    price: 59.99,
    discount: 0,
    image: gtaVImage,
    youtubeVideoId: "VNbONMSObfs",
    hoverPreview: gtaVPreview,
    galleryImages: [
      gtaVImage,
      galleryImageGTAV_1,
      galleryImageGTAV_2,
      galleryImageGTAV_3,
    ],
    type: "AAA",
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    accountLevel: 45,
    hoursPlayed: 560,
    items: 87,
    achievements: 45,
    price: 39.99,
    discount: 25,
    image: cyberpunkImage,
    youtubeVideoId: "1gvGn8NtIpE",
    hoverPreview: cyberpunkPreview,
    galleryImages: [
      cyberpunkImage,
      galleryImageCyberpunk_1,
      galleryImageCyberpunk_2,
      galleryImageCyberpunk_3,
    ],
    type: "AAA",
  },
  {
    id: 4,
    title: "Elden Ring",
    accountLevel: 67,
    hoursPlayed: 320,
    items: 96,
    achievements: 38,
    price: 69.99,
    discount: 10,
    image: eldenringImage,
    youtubeVideoId: "E3Huy2cdih0",
    hoverPreview: eldenringPreview,
    galleryImages: [
      eldenringImage,
      galleryImageEldenring_1,
      galleryImageEldenring_2,
      galleryImageEldenring_3,
    ],
    type: "AAA",
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    accountLevel: 92,
    hoursPlayed: 1120,
    items: 198,
    achievements: 91,
    price: 54.99,
    discount: 20,
    image: rdr2Image,
    youtubeVideoId: "SXvQ1nK4oxk",
    hoverPreview: rdr2Preview,
    galleryImages: [
      rdr2Image,
      galleryImageRDR2_1,
      galleryImageRDR2_2,
      galleryImageRDR2_3,
    ],
    type: "AAA",
  },
  {
    id: 6,
    title: "Horizon Forbidden West",
    accountLevel: 65,
    hoursPlayed: 480,
    items: 124,
    achievements: 52,
    price: 59.99,
    discount: 15,
    image: horizonImage,
    youtubeVideoId: "rvDu47W8qT0",
    hoverPreview: horizonPreview,
    galleryImages:[
      horizonImage,
      galleryImageHorizon_1,
      galleryImageHorizon_2,
      galleryImageHorizon_3,
    ],
    type: "AAA",
  },
  {
    id: 7,
    title: "God of War Ragnarök",
    accountLevel: 75,
    hoursPlayed: 650,
    items: 145,
    achievements: 64,
    price: 64.99,
    discount: 5,
    image: godOfWarImage,
    youtubeVideoId: "nBwxyqq1ON4",
    hoverPreview: gowRagnarokPreview,
    type: "AAA",
  },
  {
    id: 8,
    title: "The Witcher 4: Polaris",
    accountLevel: 88,
    hoursPlayed: 980,
    items: 215,
    achievements: 83,
    price: 39.99,
    discount: 30,
    image: witcher4Image,
    youtubeVideoId: "lOAiB3GZOQo",
    hoverPreview: thewitcher4Preview,
    type: "AAA",
  },
  {
    id: 9,
    title: "Ghost of Tsushima",
    accountLevel: 72,
    hoursPlayed: 580,
    items: 132,
    achievements: 59,
    price: 49.99,
    discount: 10,
    image: ghostOfTsushimaImage,
    youtubeVideoId: "BWktKH0eW5I",
    hoverPreview: ghostOfTsushimaPreview,
    type: "AAA",
  },
  {
    id: 10,
    title: "Spider-Man 2",
    accountLevel: 63,
    hoursPlayed: 420,
    items: 107,
    achievements: 48,
    price: 44.99,
    discount: 15,
    image: spidermanImage,
    hoverPreview: spidermanPreview,
    type: "AAA",
  },
  {
    id: 11,
    title: "Hogwarts Legacy",
    accountLevel: 70,
    hoursPlayed: 510,
    items: 128,
    achievements: 55,
    price: 69.99,
    discount: 0,
    image: hogwartsLegacyImage,
    hoverPreview: hogwartsLegacyPreview,
    type: "AA",
  },
  {
    id: 12,
    title: "Sekiro: Shadows Die Twice",
    accountLevel: 81,
    hoursPlayed: 470,
    items: 93,
    achievements: 72,
    price: 49.99,
    discount: 20,
    image: sekiroImage,
    youtubeVideoId: "rXMX4YJ7Lks",
    hoverPreview: sekiroPreview,
    type: "AAA",
  },
  {
    id: 13,
    title: "Hollow Knight",
    accountLevel: 55,
    hoursPlayed: 320,
    items: 65,
    achievements: 43,
    price: 14.99,
    discount: 35,
    image: hollowKnightImage,
    hoverPreview: hollowKnightPreview,
    type: "A",
  },
  {
    id: 14,
    title: "Hades",
    accountLevel: 62,
    hoursPlayed: 280,
    items: 78,
    achievements: 51,
    price: 24.99,
    discount: 20,
    image: hadesImage,
    hoverPreview: hadesPreview,
    type: "AA",
  },
  {
    id: 15,
    title: "Stardew Valley",
    accountLevel: 70,
    hoursPlayed: 410,
    items: 90,
    achievements: 38,
    price: 14.99,
    discount: 0,
    image: stardewValleyImage,
    hoverPreview: stardewValleyPreview,
    type: "A",
  },
  {
    id: 16,
    title: "Minecraft",
    accountLevel: 85,
    hoursPlayed: 1500,
    items: 250,
    achievements: 68,
    price: 29.99,
    discount: 0,
    image: minecraftImage,
    hoverPreview: minecraftPreview,
    type: "AA",
  },
  {
    id: 17,
    title: "Stray",
    accountLevel: 110,
    hoursPlayed: 950,
    items: 320,
    achievements: 65,
    price: 39.99,
    discount: 25,
    image: strayImage,
    hoverPreview: strayPreview,
    type: "AA",
  },
  {
    id: 18,
    title: "Assassin's Creed Shadows",
    accountLevel: 73,
    hoursPlayed: 680,
    items: 175,
    achievements: 62,
    price: 59.99,
    discount: 35,
    image: assassinsCreedImage,
    youtubeVideoId: "Xs2w3qSEBCs",
    hoverPreview: assassinsCreedImagePreview,
    type: "AAA",
  },
  {
    id: 19,
    title: "DOOM: The Dark Ages",
    accountLevel: 79,
    hoursPlayed: 340,
    items: 89,
    achievements: 74,
    price: 39.99,
    discount: 50,
    image: doomEternalImage,
    youtubeVideoId: "P4wvc_zDHpA",
    hoverPreview: doomEternalImagePreview,
    type: "AAA",
  },
  {
    id: 20,
    title: "Final Fantasy VII Remake",
    accountLevel: 86,
    hoursPlayed: 720,
    items: 156,
    achievements: 80,
    price: 59.99,
    discount: 20,
    image: finalFantasyImage,
    hoverPreview: finalFantasyImagePreview,
    type: "AAA",
  },
  {
    id: 21,
    title: "Control Ultimate Edition",
    accountLevel: 68,
    hoursPlayed: 380,
    items: 95,
    achievements: 58,
    price: 39.99,
    discount: 30,
    image: controlImage,
    hoverPreview: controlImagePreview,
    type: "AA",
  },
  {
    id: 22,
    title: "Celeste",
    accountLevel: 60,
    hoursPlayed: 240,
    items: 45,
    achievements: 53,
    price: 19.99,
    discount: 40,
    image: celeste,
    hoverPreview: celestePreview,
    type: "A",
  },
  {
    id: 23,
    title: "Baldur's Gate 3",
    accountLevel: 50,
    hoursPlayed: 320,
    items: 35,
    achievements: 22,
    price: 4.99,
    discount: 0,
    image: baldursImage,
    hoverPreview: baldursImagePreview,
    type: "AAA",
  },
  {
    id: 24,
    title: "Fallout 4",
    accountLevel: 83,
    hoursPlayed: 760,
    items: 195,
    achievements: 70,
    price: 29.99,
    discount: 60,
    image: falloutImage,
    hoverPreview: falloutImagePreview,
    type: "AA",
  },
  {
    id: 25,
    title: "Uncharted 4",
    accountLevel: 50,
    hoursPlayed: 434,
    items: 143,
    achievements: 10,
    price: 10,
    discount: 0,
    image: unchartedImage,
    hoverPreview: unchartedImagePreview,
    type: "AAA",
  },
  {
    id: 26,
    title: "Persona 5 Royal",
    accountLevel: 43,
    hoursPlayed: 232,
    items: 22,
    achievements: 103,
    price: 5,
    discount: 10,
    image: persona5Image,
    hoverPreview: persona5ImagePreview,
    type: "AA",
  },
  {
    id: 27,
    title: "Disco Elysium",
    accountLevel: 521,
    hoursPlayed: 121,
    items: 212,
    achievements: 22,
    price: 5,
    discount: 40,
    image: elysiumImage,
    hoverPreview: elysiumImagePreview,
    type: "A",
  },
  {
    id: 28,
    title: "Death Stranding",
    accountLevel: 21,
    hoursPlayed: 21,
    items: 12,
    achievements: 2,
    price: 10,
    discount: 20,
    image: deathstrandingImage,
    hoverPreview: deathstrandingImagePreview,
    type: "AAA",
  },
];

export const offers = [
  {
    id: 1,
    name: "Paquete Soulsborne",
    products: [4, 12, 13],
    originalPrice: 134.97,
    discountPercentage: 30,
    discountedPrice: 94.48,
    type: "bundle",
  },
  {
    id: 2,
    name: "Mundo en Caos",
    products: [3, 24, 19],
    originalPrice: 109.97,
    discountPercentage: 40,
    discountedPrice: 65.98,
    type: "bundle",
  },
  {
    id: 3,
    name: "Historias Inolvidables",
    products: [1, 7, 5],
    originalPrice: 169.97,
    discountPercentage: 25,
    discountedPrice: 127.48,
    type: "bundle",
  },
  {
    id: 4,
    name: "Pack Fantasía y Magia",
    products: [8, 11, 20],
    originalPrice: 169.97,
    discountPercentage: 30,
    discountedPrice: 118.98,
    type: "bundle",
  },
  {
    id: 5,
    name: "Indie Brillante",
    products: [22, 27, 14],
    originalPrice: 49.97,
    discountPercentage: 35,
    discountedPrice: 32.48,
    type: "bundle",
  },
];

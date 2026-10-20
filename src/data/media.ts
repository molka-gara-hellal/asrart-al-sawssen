import type { LocalizedText } from "@/types";

/**
 * Homepage imagery. To use your model photographs, drop them in public/assets/editorial/
 * and change the `src` values below (keep a meaningful alt text).
 * Currently these are the brand visuals received: logo plate, medallion on fabric and atelier mockup.
 */
export interface MediaImage {
  src: string;
  alt: LocalizedText;
}

export const media = {
  hero: {
    src: "/assets/brand/logo-plate.jpg",
    alt: { fr: "Emblème Asr'Art Al Sawssen sur un médaillon rose gold", ar: "شعار أسرار السوسن على ميدالية بلون الذهب الوردي" },
  } satisfies MediaImage,
  heroSecondary: {
    src: "/assets/editorial/medallion-fabric.jpg",
    alt: { fr: "Médaillon Asr'Art Al Sawssen posé sur du tissu rose", ar: "ميدالية أسرار السوسن على قماش وردي" },
  } satisfies MediaImage,
  story: {
    src: "/assets/editorial/atelier.jpg",
    alt: { fr: "Composition de l'emblème Asr'Art Al Sawssen sur plaque métallique", ar: "تركيب شعار أسرار السوسن على لوح معدني" },
  } satisfies MediaImage,
  gallery: [
    {
      src: "/assets/editorial/atelier.jpg",
      alt: { fr: "Emblème en cuivre rosé et acrylique blanc", ar: "الشعار بالنحاس الوردي والأكريليك الأبيض" },
    },
    {
      src: "/assets/editorial/medallion-fabric.jpg",
      alt: { fr: "Médaillon sur tissu rose et écru", ar: "ميدالية على قماش وردي وخامي" },
    },
    {
      src: "/assets/brand/logo-plate.jpg",
      alt: { fr: "Emblème Asr'Art Al Sawssen en relief", ar: "شعار أسرار السوسن بارزا" },
    },
  ] satisfies MediaImage[],
};

import type { Category, Product, ProductColor } from "@/types";

/**
 * PRODUCT CATALOGUE — the only file you edit to manage products.
 * See README.md → "Managing products" for step-by-step instructions.
 *
 * ⚠️ The entries below are SAMPLE DATA (isSample: true) so the site is testable.
 *    Replace them with your real pieces, then delete the `isSample: true` lines.
 */

export const categories: Category[] = [
  { id: "robes", label: { fr: "Robes", ar: "فساتين" } },
  { id: "ensembles", label: { fr: "Ensembles", ar: "أطقم" } },
  { id: "accessoires", label: { fr: "Accessoires", ar: "إكسسوارات" } },
];

const colors: Record<string, ProductColor> = {
  rose: { id: "rose", name: { fr: "Rose poudré", ar: "وردي" }, hex: "#E3B5A8" },
  terracotta: { id: "terracotta", name: { fr: "Terracotta", ar: "تراكوتا" }, hex: "#C47E72" },
  ivoire: { id: "ivoire", name: { fr: "Ivoire", ar: "عاجي" }, hex: "#F4EDE4" },
  noir: { id: "noir", name: { fr: "Noir", ar: "أسود" }, hex: "#2A2426" },
};



export const products: Product[] = [
  {
    id: "veste-officer-chic", // Recommandation : utilisez un identifiant en minuscules sans espaces (slug)
    name: { 
      fr: "Veste Officer Chic", 
      ar: "سترة أنيقة بنمط عسكري" 
    },
    description: {
      fr: `Cette pièce est une veste style officier (ou hussard) confectionnée en denim bleu foncé. Elle combine l'élégance d'une coupe militaire structurée avec la décontraction moderne du jean.

Détails clés du design :
• Coupe et col : Coupe cintrée ajustée avec un col officier (col montant court).
• Fermeture & Boutonnage : Une double rangée de boutons métalliques dômes style uniforme, reliés par des brides horizontales effet effiloché/déchiré.
• Épaulettes : Présence de pattes d'épaule ornées d'un bouton métallique de chaque côté.
• Finition & Texture : Le tissu présente un effet usé/déstructuré avec de petites griffures horizontales et des bordures légèrement effilochées sur les brides et les poignets.

C'est une veste originale et tendance, idéale pour ajouter une touche chic et affirmée à une tenue décontractée ou habillée.`,
      ar: `سترة أنيقة بنمط عسكري مصنوعة من جينز الدنيم الأزرق الداكن، تجمع بين أناقة القصة العسكرية والعصرية.`
    },
    price: 60,
    category: "vestes",
    images: ["/assets/products/Veste Officer Chic.png"], // Ajout de l'extension .png
    sizes: ["40", "42", "44", "46"],
    colors: [colors.bleu], // Ajusté selon la couleur réelle du modèle
    status: "available",
    featured: true,
    isNew: true,
    isSample: true,
  },
  {
    id: "set-safari-chic",
    name: { 
      fr: "Set Safari Chic – Veste Ceinturée & Pantalon Large", 
      ar: "طقم سَفاري أنيق – سترة بحزام وبنطال واسع" 
    },
    description: {
      fr: `Cet ensemble deux pièces style saharienne combine confort et élégance urbaine.

Détails clés du design :
• Veste ceinturée : Col chemise, boutonnière frontale apparente, 4 poches à rabat boutonnées et ceinture à nouer à la taille.
• Manches modulables : Possibilité de relever les manches grâce aux pattes de boutonnage aux poignets.
• Pantalon : Coupe ample et fluide assurant un confort optimal et une allure élancée.
• Style & Occasions : Parfait pour un look décontracté chic au quotidien ou une tenue de travail tendance.`,
      ar: `طقم مريح وأنيق مكون من قطعتين باللون البيج، يتميز بسترة سَفاري مع حزام على الخصر وبنطال واسع مريح.`
    },
    price: 100, // À ajuster selon votre prix
    category: "ensembles",
    images: [
      "/assets/products/Set Safari Chic – Veste Ceinturée & Pantalon Large 1.png",
      "/assets/products/Set Safari Chic – Veste Ceinturée & Pantalon Large 2.png",
      "/assets/products/Set Safari Chic – Veste Ceinturée & Pantalon Large 3.png",
      "/assets/products/Set Safari Chic – Veste Ceinturée & Pantalon Large 4.png",
      "/assets/products/Set Safari Chic – Veste Ceinturée & Pantalon Large 5.png"
    ],
    sizes: [ "40", "42", "44", "46"],
    colors: [colors.ivoire], // Ou colors.beige selon votre fichier de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "robe-jean-sans-manches",
    name: { 
      fr: "Robe Jean Sans Manches – Coupe Évasée & Ceinturée", 
      ar: "fستان جينز بدون أكمام – قصّة واسعة مع حزام" 
    },
    description: {
      fr: `Une superbe robe longue en denim bleu foncé qui allie structure et féminité.

Détails clés du design :
• Coupe & Silhouette : Buste ajusté avec col chemise, s'évasant vers le bas en une jupe ample très fluide.
• Boutonnage & Finitions : Boutonnière complète à boutons dorés et surpiqûres apparentes élégantes.
• Ceinture assortie : Livrée avec sa ceinture en tissu dotée d'une boucle métallique dorée originale pour sublimer la taille.
• Polyvalence : Design sans manches idéal à porter seul ou superposé sur un sous-pull/chemisier selon la saison.
• Poches pratiques : Poches latérales intégrées pour un confort au quotidien.`,
      ar: `فستان جينز طويل باللون الأزرق الداكن بدون أكمام، يتميز بقصة واسعة أنيقة وحزام يدعم الخصر مع أزرار ذهبية لافتة.`
    },
    price: 100, // À ajuster selon votre tarif
    category: "robes",
    images: [
      "/assets/products/Robe Jean Sans Manches – Coupe Évasée & Ceinturée 1.png",
      "/assets/products/Robe Jean Sans Manches – Coupe Évasée & Ceinturée 2.png",
      "/assets/products/Robe Jean Sans Manches – Coupe Évasée & Ceinturée 3.png",
      "/assets/products/Robe Jean Sans Manches – Coupe Évasée & Ceinturée 4.png"
    ],
    sizes: ["44"],
    colors: [colors.bleu], // Ajuster selon votre structure de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "robe-blazer-noir-dentelle",
    name: { 
      fr: "Robe Blazer Noir – Manches en Dentelle & Boutons Dorés", 
      ar: "فستان بليزر أسود – أكمام دانتيل وأزرار ذهبية" 
    },
    description: {
      fr: `Une robe blazer noire d'une élégance absolue, mêlant sophistication et charme romantique.

Détails clés du design :
• Coupe & Encolure : Coupe cintrée structurée avec col à revers et fermeture croisée style costume.
• Manches en dentelle : Manches longues ajourées en dentelle travaillée apportant une délicate transparence.
• Finitions dorées : Double boutonnage métallisé doré à effet anneau pour une finition haute couture.
• Polyvalence : Idéale pour les soirées, événements formels ou tenues habillées.`,
      ar: `فستان بليزر أسود أنيق يتميز بأكمام دانتيل مفرغة وأزرار ذهبية مزδوجة، مثالي للمناسبات والسهرات.`
    },
    price: 120, // À ajuster selon votre tarif
    category: "robes",
    images: [
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 1.png",
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 2.png",
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 3.png",
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 4.png",
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 5.png",
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 6.png",
      "/assets/products/Robe Blazer Noir – Manches en Dentelle & Boutons Dorés 7.png"
    ],
    sizes: ["42", "44"],
    colors: [colors.noir], // Ajuster selon votre objet de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-sultana-leopard",
    name: { 
      fr: "L’Ensemble Sultana Léopard", 
      ar: "طقم السلطانة بنقشة النمر" 
    },
    description: {
      fr: `Un ensemble deux pièces fluide et élégant à l'imprimé léopard captivant.

Détails clés du design :
• Tunique asymétrique : Col chemise, boutonnière frontale et coupe plus longue à l'arrière pour une allure majestueuse.
• Broderie dorée : Détail floral doré haute couture appliqué sur la poitrine qui rehausse l'ensemble.
• Pantalon Palazzo : Coupe très large et fluide assurant confort et liberté de mouvement.
• Style & Occasions : Idéal pour les sorties habillées, les réceptions ou un look chic au quotidien.`,
      ar: `طقم أنيق وراقي مكون من قطعتين بنقشة الفهد (النمر)، يتكون من قميص طويل بقصة غير متماثلة ومطرز بتطريز ذهبي على الصدر مع بنطال واسع مريح.`
    },
    price: 120, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/L’Ensemble Sultana Léopard 1.png",
      "/assets/products/L’Ensemble Sultana Léopard 2.png",
      "/assets/products/L’Ensemble Sultana Léopard 3.png",
      "/assets/products/L’Ensemble Sultana Léopard 4.png"
    ],
    sizes: ["42", "44", "46"],
    colors: [colors.imprime], // Ajuster selon vos constantes de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-dolce-vita",
    name: { 
      fr: "L’Ensemble Dolce Vita", 
      ar: "طقم دولتشي فيتا الصيفي" 
    },
    description: {
      fr: `Un magnifique ensemble deux pièces léger et fluide au motif floral estival.

Détails clés du design :
• Haut : Chemise à manches courtes avec revers, col classique, boutonnière frontale et ceinture à nouer marquant la taille.
• Pantalon : Coupe ample et fluide assurant un confort maximal tout au long de la journée.
• Imprimé : Motif botanique élégant aux teintes vieux rose sur fond écru.
• Esprit : Idéal pour vos vacances, promenades ensoleillées ou sorties estivales décontractées.`,
      ar: `طقم صيفي أنيق ومريح مكون من قطعتين (قميص بأكمام قصيرة وبنطال واسع) بنقشة زهور باللون الوردي القديم على خلفية عاجية.`
    },
    price: 90, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/L’Ensemble Dolce Vita 1.png",
      "/assets/products/L’Ensemble Dolce Vita 2.jpg"
    ],
    sizes: ["38", "40", "42", "44", "46"],
    colors: [colors.rose, colors.ivoire], // À ajuster selon vos objets de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-tailleur-ivoire-croise",
    name: { 
      fr: "Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté", 
      ar: "طقم بدلة عاجي – قصة متقاطعة وحزام جانبي" 
    },
    description: {
      fr: `Un ensemble tailleur moderne et épuré d'une élégance intemporelle.

Détails clés du design :
• Veste croisée : Col à revers élégant, fermeture portefeuille maintenue par un nœud délicat sur le côté.
• Pantalon large : Coupe fluide et ample pour un confort maximal et une allure élancée.
• Nuance raffinée : Teinte ivoire/crème lumineuse et facile à associer.
• Style : Parfait aussi bien pour le bureau que pour des occasions formelles ou un look casual chic.`,
      ar: `طقم بدلة عاجي أنيق مكون من قطعتين (سترة ملفوفة بحزام جانبي وبنطال واسع مريح) بأسلوب عصري وراقي.`
    },
    price: 100, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté 1.png",
      "/assets/products/Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté 2.png",
      "/assets/products/Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté 3.png",
      "/assets/products/Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté 4.png",
      "/assets/products/Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté 5.png",
      "/assets/products/Ensemble Tailleur Ivoire – Coupe Croisée & Ceinture Sur Côté 6.png"
    ],
    sizes: [ "40", "42", "44", "46"],
    colors: [colors.ivoire], // À ajuster selon vos objets de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-sport-chic-cotele",
    name: { 
      fr: "Ensemble Sport-Chic Côtelé – Veste Zippée & Jupe Longue", 
      ar: "طقم سبور شيك محبوك – سترة بسحاب وتورة طويلة" 
    },
    description: {
      fr: `Un ensemble deux pièces en maille côtelée douce et confortable, parfait pour un style sport-chic au quotidien.

Détails clés du design :
• Veste zippée : Col montant, fermeture éclair contrastante et fausses poches poitrine rehaussées de boutons dorés.
• Jupe longue : Coupe évasée très fluide apportant confort et élégance.
• Matière : Tissu côtelé extensible de qualité offrant douceur et tombé impeccable.
• Style : Une tenue moderne et cosy idéale pour vos sorties décontractées ou vos journées actives.`,
      ar: `طقم مريح وأنيق مكون من قطعتين (سترة رياضية بسحاب وتنانير طويلة واسعة) مصنوع من قماش محبوك ناعم ومريح باللون العاجي.`
    },
    price: 100, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/Ensemble Sport-Chic Côtelé – Veste Zippée & Jupe Longue.png"
    ],
    sizes: ["40", "42", "44", "46"],
    colors: [colors.ivoire], // À ajuster selon vos objets de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-perle-et-dentelle",
    name: { 
      fr: "Ensemble Perle & Dentelle – Style Chic & Intemporel", 
      ar: "طقم اللؤلؤ والدانتيل – أسلوب أنيق ورائع" 
    },
    description: {
      fr: `Un magnifique ensemble deux pièces romantique et chic d'une délicatesse absolue.

Détails clés du design :
• Haut raffiné : Col et poignets agrémentés d'un volant en dentelle fine.
• Boutons bijoux : Fermeture frontale ornée de magnifiques boutons perles nacrées aux détails dorés.
• Jupe longue : Coupe évasée très fluide apportant une allure élancée et gracieuse.
• Occasions : Idéal pour vos fêtes, cérémonies ou événements spéciaux exigeant une tenue chic et modeste.`,
      ar: `طقم راقي أنيق باللون الأبيض العاجي مكون من قطعتين (قميص بياقة دانتيل وأزرار لؤلؤية مع تنورة طويلة واسعة)، مثالي للمناسبات والأعياد.`
    },
    price: 100, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/Ensemble Perle & Dentelle – Style Chic & Intemporel.png"
    ],
    sizes: [ "42", "44", "46"],
    colors: [colors.ivoire], // À ajuster selon vos objets de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-leopard-fluide",
    name: { 
      fr: "Ensemble Léopard Fluide – Chemisier Boutonné & Ceinture", 
      ar: "طقم انسيابي بنقشة الفهد – قميص بأزرار وحزام" 
    },
    description: {
      fr: `Un ensemble deux pièces léger et fluide au motif léopard tendance.

Détails clés du design :
• Haut : Chemisier à manches longues, col lavallière/chemise boutonné et fine ceinture marron incluse pour sublimer la taille.
• Bas : Pantalon fluide à coupe large pour un confort optimal et une démarche élancée.
• Imprimé : Motif léopard intemporel aux tons chauds.
• Style : Une tenue polyvalente et raffinée, idéale en toutes occasions.`,
      ar: `طقم مريح وأنيق مكون من قطعتين بنقشة الفهد الانسيابية، يتكون من قميص بأزرار وحزام رفيع على الخصر مع بنطال واسع.`
    },
    price: 120, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/Ensemble Léopard Fluide – Chemisier Boutonné & Ceinture 1.png",
      "/assets/products/Ensemble Léopard Fluide – Chemisier Boutonné & Ceinture 2.png",
      "/assets/products/Ensemble Léopard Fluide – Chemisier Boutonné & Ceinture 3.png",
      "/assets/products/Ensemble Léopard Fluide – Chemisier Boutonné & Ceinture 4.png"
    ],
    sizes: [ "42", "44", "46"],
    colors: [colors.imprime], // À ajuster selon votre objet de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "tunique-longue-graphique-noir-blanc",
    name: { 
      fr: "Tunique Longue Graphique Noir & Blanc", 
      ar: "تونيك طويل بنقشة هندسية أسود وأبيض" 
    },
    description: {
      fr: `Une tunique longue fluide aux motifs graphiques raffinés en noir et blanc.

Détails clés du design :
• Coupe : Coupe longue ample et fluide avec col chemise et fermeture boutonnée.
• Imprimé : Motifs géométriques élégants rehaussés d'une large bordure orientale/florale au bas.
• Manches : Manches ajustables avec finitions contrastantes aux poignets.
• Polyvalence : Idéale à porter ouverte comme un kimono léger ou fermée comme un chemisier long.`,
      ar: `تونيك طويل أنيق ومريح باللونين الأسود والأبيض، يتميز بنقوش هندسية مزخرفة مع أزرار أمامية وفتحات جانبية انسيابية.`
    },
    price: 60, // À ajuster selon votre tarif
    category: "tuniques", // Ou "chemisiers" / "vestes" selon vos catégories
    images: [
      "/assets/products/Ensemble Graphique Noir & Blanc 1.png",
      "/assets/products/Ensemble Graphique Noir & Blanc 2.png",
      "/assets/products/Ensemble Graphique Noir & Blanc 3.png",
      "/assets/products/Ensemble Graphique Noir & Blanc 4.png"
    ],
    sizes: ["48"],
    colors: [colors.noir, colors.ivoire], // À ajuster selon votre objet de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "ensemble-dune-chemise-broderie",
    name: { 
      fr: "Ensemble Dune – Chemise Broderie & Pantalon Fluide", 
      ar: "طقم الكثبان – قميص مطرز وبنطال واسع" 
    },
    description: {
      fr: `Un magnifique ensemble deux pièces léger, décoré de broderies organiques raffinées.

Détails clés du design :
• Chemise : Boutonnière frontale, coupe confortable et détails brodés délicats.
• Pantalon : Coupe ample et fluide palazzo avec rappels de broderies au bas des jambes.
• Accessoire : Livré avec sa ceinture tressée naturelle pour cintrer la taille.
• Matière : Tissu gaufré léger, fluide et agréable à porter.
• Couleurs disponibles : Beige Sable et Taupe.`,
      ar: `طقم صيفي أنيق مريح مكون من قطعتين (قميص بأزرار وبنطال واسع) مطرز بتطريزات ناعمة، متوفر باللونين البيج الرملي والتوب (الرمادي الداكن).`
    },
    price: 100, // À ajuster selon votre tarif
    category: "ensembles",
    images: [
      "/assets/products/Ensemble Dune – Chemise Broderie & Pantalon Fluide 1.png",
      "/assets/products/Ensemble Dune – Chemise Broderie & Pantalon Fluide 2.png"
    ],
    sizes: [ "42", "44","54"],
    colors: [colors.sable, colors.taupe], // Disponibilité en 2 couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "chemise-satin-blanche-lavalliere",
    name: { 
      fr: "Chemise Satin Blanche – Col Lavallière & Boutons Nacrés", 
      ar: "قميص ساتان أبيض بياقة فيونكة وأزرار لؤلؤية" 
    },
    description: {
      fr: `Une élégante chemise en satin blanc, idéale pour apporter une touche chic et sophistiquée à toutes vos tenues.

Détails clés du design :
• Col lavallière : Noeud délicat au col apportant une touche féminine et raffinée.
• Boutons nacrés : Boutonnière frontale ornée de boutons effet perle nacrée au liseré doré.
• Matière noble : Tissu satiné doux, fluide et très agréable à porter.
• Polyvalence : Parfaite sous une veste de costume, avec une jupe ou un pantalon habillé.`,
      ar: `قميص ساتان أبيض راقي وناعم، يتميز بياقة ربطة (فيونكة) أنيقة وأزرار لؤلؤية بلمسة ذهبية.`
    },
    price: 50, // À ajuster selon votre tarif
    category: "chemisiers", // Ou "chemises" / "tops" selon vos catégories
    images: [
      "/assets/products/Chemise Satin Blanche – Col Lavallière & Boutons Nacrés 1.png",
      "/assets/products/Chemise Satin Blanche – Col Lavallière & Boutons Nacrés 2.png",
      "/assets/products/Chemise Satin Blanche – Col Lavallière & Boutons Nacrés 3.jpg"
    ],
    sizes: ["42", "44", "46"],
    colors: [colors.ivoire], // Ou colors.blanc selon vos constantes de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
  {
    id: "chemise-boyish-chic-cravate",
    name: { 
      fr: "Chemise Boyish Chic – Détail Cravate Imprimée", 
      ar: "قميص صبياني أنيق – بتفاصيل ربطة عنق مطبوعة" 
    },
    description: {
      fr: `Une chemise blanche originale au style masculin-féminin très tendance.

Détails clés du design :
• Accessoire original : Cravate/foulard assorti marron à motif paisley/bandana noué sous le col.
• Coupe : Coupe fluide et moderne avec épaules légèrement tombantes.
• Polyvalence : Idéale pour rehausser une tenue de bureau ou apporter une touche androgyne chic à un look casual.`,
      ar: `قميص أبيض أنيق وعصري بأسلوب رجالي أنثوي، يتميز بربطة عنق ناعمة باللون البني ومطبوعة بنقوش راقية.`
    },
    price: 125, // À ajuster selon votre tarif
    category: "chemisiers", // Ou "chemises" selon vos catégories
    images: [
      "/assets/products/Chemise Boyish Chic – Détail Cravate Imprimée.png"
    ],
    sizes: [ "42", "44", "46"],
    colors: [colors.ivoire], // Ou colors.blanc selon vos constantes de couleurs
    status: "available",
    featured: true,
    isNew: true,
    isSample: false,
  },
];

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

export const isSizeAvailable = (p: Product, size: string): boolean =>
  p.sizes.includes(size) && !(p.unavailableSizes ?? []).includes(size);

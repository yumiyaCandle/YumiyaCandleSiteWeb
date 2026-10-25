/* ═══════════════════════════════════════════════
   YUMIYA CANDLE — traductions (FR → DE / EN)
   Chaque entrée : 'texte français': ['Deutsch', 'English'].
   Le français est la langue de base : un texte absent du dictionnaire reste en français.
   ═══════════════════════════════════════════════ */
const LANGS = ['fr', 'de', 'en'];
const LANG = (() => {
  try { const q = new URLSearchParams(location.search).get('lang'); if (LANGS.includes(q)) { localStorage.setItem('yumiya_lang', q); return q; } } catch (_) {}
  try { const s = localStorage.getItem('yumiya_lang'); if (LANGS.includes(s)) return s; } catch (_) {}
  const n = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  return n === 'de' ? 'de' : n === 'en' ? 'en' : 'fr';
})();
document.documentElement.lang = { fr: 'fr-CH', de: 'de-CH', en: 'en' }[LANG];

const I18N = {};
Object.assign(I18N, {
 "Yumiya Candle – Bougies gourmandes coulées à la main à La Neuveville": [
  "Yumiya Candle – Gourmet-Kerzen, von Hand gegossen in La Neuveville",
  "Yumiya Candle – Hand-poured gourmet candles from La Neuveville"
 ],
 "Yumiya Candle, maison de bougies gourmandes et florales coulées à la main à La Neuveville, en Suisse. Cire de soja 100 % végétale, mèche en coton, créations sur mesure. Livraison 5 CHF partout en Suisse.": [
  "Yumiya Candle, Manufaktur für Gourmet- und Blumenkerzen, von Hand gegossen in La Neuveville, Schweiz. 100 % pflanzliches Sojawachs, Baumwolldocht, Kreationen nach Mass. Lieferung für 5 CHF in die ganze Schweiz.",
  "Yumiya Candle, a house of gourmet and floral candles hand-poured in La Neuveville, Switzerland. 100% plant-based soy wax, cotton wick, made-to-order creations. Delivery anywhere in Switzerland for CHF 5."
 ],
 "Yumiya Candle – Maison de bougies artisanales": [
  "Yumiya Candle – Kerzenmanufaktur",
  "Yumiya Candle – Artisan candle house"
 ],
 "Bougies gourmandes coulées à la main en Suisse. Cire de soja végétale, mèche en coton, créations sur mesure.": [
  "Gourmet-Kerzen, von Hand gegossen in der Schweiz. Pflanzliches Sojawachs, Baumwolldocht, Kreationen nach Mass.",
  "Gourmet candles hand-poured in Switzerland. Plant-based soy wax, cotton wick, made-to-order creations."
 ],
 "Aller au contenu": [
  "Zum Inhalt",
  "Skip to content"
 ],
 "Yumiya Candle — accueil": [
  "Yumiya Candle — Startseite",
  "Yumiya Candle — home"
 ],
 "Navigation principale": [
  "Hauptnavigation",
  "Main navigation"
 ],
 "Langue": [
  "Sprache",
  "Language"
 ],
 "Boutique": [
  "Shop",
  "Shop"
 ],
 "L'atelier": [
  "Das Atelier",
  "The workshop"
 ],
 "Sur mesure": [
  "Nach Mass",
  "Made to order"
 ],
 "La Maison": [
  "Das Haus",
  "Our story"
 ],
 "Contact": [
  "Kontakt",
  "Contact"
 ],
 "Ouvrir le panier": [
  "Warenkorb öffnen",
  "Open cart"
 ],
 "Menu": [
  "Menü",
  "Menu"
 ],
 "Fermer": [
  "Schliessen",
  "Close"
 ],
 "Coulées à la main à La Neuveville ·": [
  "Von Hand gegossen in La Neuveville ·",
  "Hand-poured in La Neuveville ·"
 ],
 "La Neuveville · Suisse": [
  "La Neuveville · Schweiz",
  "La Neuveville · Switzerland"
 ],
 "Coulées à la main à La Neuveville": [
  "Von Hand gegossen in La Neuveville",
  "Hand-poured in La Neuveville"
 ],
 "Des bougies qui ont l'air d'un": [
  "Kerzen, die aussehen wie ein",
  "Candles that look like a"
 ],
 "dessert.": [
  "Dessert.",
  "dessert."
 ],
 "Une cire de soja végétale, une mèche en coton, et des décors pâtissiers qui se regardent autant qu'ils se respirent. Coulées une à une, dans notre atelier en Suisse.": [
  "Pflanzliches Sojawachs, ein Baumwolldocht und Dekorationen wie aus der Konditorei, die man ebenso gern betrachtet wie riecht. Eine nach der anderen gegossen, in unserem Atelier in der Schweiz.",
  "Plant-based soy wax, a cotton wick and patisserie-style decorations as lovely to look at as they are to breathe in. Poured one by one in our Swiss workshop."
 ],
 "Découvrir la collection": [
  "Kollektion entdecken",
  "Discover the collection"
 ],
 "dès 6.30 CHF": [
  "ab 6.30 CHF",
  "from CHF 6.30"
 ],
 "Créer la vôtre": [
  "Ihre eigene gestalten",
  "Create your own"
 ],
 "cire de soja": [
  "Sojawachs",
  "plant-based"
 ],
 "livraison en Suisse": [
  "Lieferung in der Schweiz",
  "delivery in Switzerland"
 ],
 "ou carte": [
  "oder Karte",
  "or card"
 ],
 "coulée à la main · cire de soja · La Neuveville · Suisse ·": [
  "von Hand gegossen · Sojawachs · La Neuveville · Schweiz ·",
  "hand-poured · soy wax · La Neuveville · Switzerland ·"
 ],
 "Bougie gourmande Marshmallow Framboise : chantilly de cire, cœurs rouges et couche framboise dans un verre": [
  "Gourmet-Kerze Marshmallow-Himbeere: Wachs-Chantilly, rote Herzen und Himbeerschicht im Glas",
  "Marshmallow Raspberry gourmet candle: wax whipped cream, red hearts and a raspberry layer in a glass"
 ],
 "Notre signature": [
  "Unsere Signatur",
  "Our signature"
 ],
 "Petite 8.90 CHF · Grande 10.90 CHF": [
  "Klein 8.90 CHF · Gross 10.90 CHF",
  "Small CHF 8.90 · Large CHF 10.90"
 ],
 "Défiler": [
  "Scrollen",
  "Scroll"
 ],
 "Cire de soja 100% végétale": [
  "100 % pflanzliches Sojawachs",
  "100% plant-based soy wax"
 ],
 "Mèche en coton": [
  "Baumwolldocht",
  "Cotton wick"
 ],
 "Zéro paraffine": [
  "Null Paraffin",
  "Zero paraffin"
 ],
 "Coulée à La Neuveville": [
  "Gegossen in La Neuveville",
  "Poured in La Neuveville"
 ],
 "Créations sur mesure": [
  "Kreationen nach Mass",
  "Made-to-order creations"
 ],
 "Livraison partout en Suisse": [
  "Lieferung in die ganze Schweiz",
  "Delivery across Switzerland"
 ],
 "Le rituel": [
  "Das Ritual",
  "The ritual"
 ],
 "Le soir tombe.": [
  "Der Abend bricht an.",
  "Evening falls."
 ],
 "Une allumette,": [
  "Ein Streichholz,",
  "A match,"
 ],
 "une flamme.": [
  "eine Flamme.",
  "a flame."
 ],
 "Et la douceur se diffuse,": [
  "Und der Duft verbreitet sich,",
  "And the sweetness drifts out,"
 ],
 "lentement.": [
  "ganz langsam.",
  "slowly."
 ],
 "de combustion": [
  "Brenndauer",
  "burn time"
 ],
 "pour la grande": [
  "für die grosse",
  "for the large"
 ],
 "créations": [
  "Kreationen",
  "creations"
 ],
 "à la carte": [
  "zur Auswahl",
  "to choose from"
 ],
 "chaque bougie": [
  "jede Kerze",
  "every candle"
 ],
 "est unique": [
  "ist ein Unikat",
  "is one of a kind"
 ],
 "La collection": [
  "Die Kollektion",
  "The collection"
 ],
 "La boutique": [
  "Der Shop",
  "The shop"
 ],
 "Gourmandes, florales": [
  "Gourmet, floral",
  "Gourmet, floral"
 ],
 "& à offrir.": [
  "& zum Verschenken.",
  "& made to give."
 ],
 "Bougies gourmandes, tulipes et coffrets, coulés à la main dans notre atelier en petites séries.": [
  "Gourmet-Kerzen, Tulpen und Geschenksets, von Hand in kleinen Serien in unserem Atelier gegossen.",
  "Gourmet candles, tulips and gift sets, hand-poured in small batches in our workshop."
 ],
 "Filtrer la boutique": [
  "Shop filtern",
  "Filter the shop"
 ],
 "Toutes": [
  "Alle",
  "All"
 ],
 "Gourmandes": [
  "Gourmet",
  "Gourmet"
 ],
 "Tulipes": [
  "Tulpen",
  "Tulips"
 ],
 "Coffret": [
  "Geschenkset",
  "Gift set"
 ],
 "Livraison 5.00 CHF partout en Suisse": [
  "Lieferung 5.00 CHF in die ganze Schweiz",
  "CHF 5.00 delivery anywhere in Switzerland"
 ],
 "Paiement TWINT ou carte": [
  "Zahlung mit TWINT oder Karte",
  "Pay by TWINT or card"
 ],
 "Retour sous 30 jours": [
  "Rückgabe innert 30 Tagen",
  "30-day returns"
 ],
 "Découvrir": [
  "Entdecken",
  "Discover"
 ],
 "dès": [
  "ab",
  "from"
 ],
 "Voir": [
  "Ansehen",
  "View"
 ],
 "Épuisé": [
  "Ausverkauft",
  "Sold out"
 ],
 "Ajouter au panier": [
  "In den Warenkorb",
  "Add to cart"
 ],
 "Bougie gourmande": [
  "Gourmet-Kerze",
  "Gourmet candle"
 ],
 "Bougie florale": [
  "Blumenkerze",
  "Floral candle"
 ],
 "Coffret cadeau": [
  "Geschenkset",
  "Gift set"
 ],
 "Marshmallow Framboise": [
  "Marshmallow-Himbeere",
  "Marshmallow Raspberry"
 ],
 "Framboise": [
  "Himbeere",
  "Raspberry"
 ],
 "Lavande": [
  "Lavendel",
  "Lavender"
 ],
 "Automne": [
  "Herbst",
  "Autumn"
 ],
 "Tulipe": [
  "Tulpe",
  "Tulip"
 ],
 "Coffret Yumiya": [
  "Yumiya Geschenkset",
  "Yumiya Gift Set"
 ],
 "Marshmallow · Framboise": [
  "Marshmallow · Himbeere",
  "Marshmallow · Raspberry"
 ],
 "Lavande · Crème": [
  "Lavendel · Crème",
  "Lavender · Cream"
 ],
 "Pomme · Crème": [
  "Apfel · Crème",
  "Apple · Cream"
 ],
 "Vanille · Fraise": [
  "Vanille · Erdbeere",
  "Vanilla · Strawberry"
 ],
 "Gourmande + Tulipe": [
  "Gourmet + Tulpe",
  "Gourmet + Tulip"
 ],
 "Signature": [
  "Signatur",
  "Signature"
 ],
 "Édition d'automne": [
  "Herbst-Edition",
  "Autumn edition"
 ],
 "Prêt à offrir": [
  "Bereit zum Verschenken",
  "Ready to give"
 ],
 "Douce & fruitée": [
  "Süss & fruchtig",
  "Sweet & fruity"
 ],
 "Florale & apaisante": [
  "Blumig & beruhigend",
  "Floral & soothing"
 ],
 "Chaleureuse & gourmande": [
  "Warm & genussvoll",
  "Warm & indulgent"
 ],
 "Florale & délicate": [
  "Blumig & zart",
  "Floral & delicate"
 ],
 "Le duo prêt à offrir": [
  "Das Duo zum Verschenken",
  "The ready-to-give duo"
 ],
 "Une douceur sucrée et fruitée : notes de marshmallow et de framboise, chantilly blanche travaillée à la main et petits cœurs. Coulée dans un verre transparent, en cire de soja 100 % végétale.": [
  "Süss und fruchtig: Noten von Marshmallow und Himbeere, von Hand gearbeitete weisse Chantilly und kleine Herzen. Gegossen in ein transparentes Glas, aus 100 % pflanzlichem Sojawachs.",
  "Sweet and fruity: notes of marshmallow and raspberry, hand-piped white whipped cream and little hearts. Poured into a clear glass in 100% plant-based soy wax."
 ],
 "La douceur apaisante de la lavande. Nuances de violet et de crème, chantilly blanche travaillée à la main, petits cœurs et tablette de chocolat violette.": [
  "Die beruhigende Sanftheit von Lavendel. Nuancen von Violett und Crème, von Hand gearbeitete weisse Chantilly, kleine Herzen und ein violettes Schokoladentäfelchen.",
  "The soothing softness of lavender. Shades of violet and cream, hand-piped white whipped cream, little hearts and a violet chocolate square."
 ],
 "L'atmosphère chaleureuse de l'automne, portée par de douces notes de pomme. Couches de cire orange et crème, chantilly et décorations gourmandes faites à la main.": [
  "Die warme Stimmung des Herbstes, getragen von sanften Apfelnoten. Schichten aus orangem und crèmefarbenem Wachs, Chantilly und handgemachte Gourmet-Dekorationen.",
  "The cosy mood of autumn, carried by soft apple notes. Layers of orange and cream wax, whipped cream and handmade gourmet decorations."
 ],
 "Un bouquet de tulipes en cire posé sur un socle vert mousse, dans son verre. Une note vanille-fraise, délicate et printanière, pour fleurir la maison toute l'année.": [
  "Ein Strauss Wachstulpen auf moosgrünem Sockel, in seinem Glas. Ein zarter, frühlingshafter Vanille-Erdbeer-Duft, der Ihr Zuhause das ganze Jahr erblühen lässt.",
  "A bouquet of wax tulips on a moss-green base, in its glass. A delicate, springlike vanilla-strawberry note to bring flowers into your home all year round."
 ],
 "Un duo prêt à offrir : une bougie gourmande marshmallow-framboise et une bougie tulipe vanille-fraise, réunies dans une boîte cadeau aux tons pastel. Plus avantageux que les deux bougies achetées séparément.": [
  "Ein Duo zum Verschenken: eine Gourmet-Kerze Marshmallow-Himbeere und eine Tulpenkerze Vanille-Erdbeere, vereint in einer Geschenkbox in Pastelltönen. Günstiger als die beiden Kerzen einzeln.",
  "A ready-to-give duo: a marshmallow-raspberry gourmet candle and a vanilla-strawberry tulip candle in a pastel gift box. Better value than buying the two candles separately."
 ],
 "Petite": [
  "Klein",
  "Small"
 ],
 "Grande": [
  "Gross",
  "Large"
 ],
 "Rose": [
  "Rose",
  "Rose"
 ],
 "Rose (coloris)": [
  "Rosa",
  "Pink"
 ],
 "Orange clair": [
  "Hellorange",
  "Light orange"
 ],
 "Rouge & bleu clair": [
  "Rot & Hellblau",
  "Red & light blue"
 ],
 "Violet": [
  "Violett",
  "Purple"
 ],
 "Senteur": [
  "Duft",
  "Scent"
 ],
 "Formats": [
  "Formate",
  "Sizes"
 ],
 "Contenant": [
  "Behälter",
  "Container"
 ],
 "Verre transparent": [
  "Transparentes Glas",
  "Clear glass"
 ],
 "Marshmallow, framboise": [
  "Marshmallow, Himbeere",
  "Marshmallow, raspberry"
 ],
 "Décor": [
  "Dekor",
  "Decoration"
 ],
 "Chantilly, cœurs et chocolat violet": [
  "Chantilly, Herzen und violette Schokolade",
  "Whipped cream, hearts and violet chocolate"
 ],
 "Pomme": [
  "Apfel",
  "Apple"
 ],
 "Chantilly et décorations gourmandes": [
  "Chantilly und Gourmet-Dekorationen",
  "Whipped cream and gourmet decorations"
 ],
 "Vanille, fraise": [
  "Vanille, Erdbeere",
  "Vanilla, strawberry"
 ],
 "Tulipes en cire, socle vert mousse": [
  "Wachstulpen, moosgrüner Sockel",
  "Wax tulips, moss-green base"
 ],
 "Contenu": [
  "Inhalt",
  "Contents"
 ],
 "1 Marshmallow Framboise, 1 Tulipe": [
  "1 Marshmallow-Himbeere, 1 Tulpe",
  "1 Marshmallow Raspberry, 1 Tulip"
 ],
 "Écrin": [
  "Verpackung",
  "Packaging"
 ],
 "Boîte cadeau nouée d'un ruban": [
  "Geschenkbox mit Schleife",
  "Gift box tied with a ribbon"
 ],
 "Cire": [
  "Wachs",
  "Wax"
 ],
 "Soja 100 % végétale": [
  "Soja, 100 % pflanzlich",
  "Soy, 100% plant-based"
 ],
 "Mèche": [
  "Docht",
  "Wick"
 ],
 "Coton": [
  "Baumwolle",
  "Cotton"
 ],
 "Fabrication": [
  "Herstellung",
  "Made"
 ],
 "À la main, à La Neuveville": [
  "Von Hand, in La Neuveville",
  "By hand, in La Neuveville"
 ],
 "Livraison": [
  "Lieferung",
  "Delivery"
 ],
 "Suisse · 5.00 CHF": [
  "Schweiz · 5.00 CHF",
  "Switzerland · CHF 5.00"
 ],
 "Affichage": [
  "Ansicht",
  "View"
 ],
 "Photos": [
  "Fotos",
  "Photos"
 ],
 "Photo": [
  "Foto",
  "Photo"
 ],
 "Format": [
  "Format",
  "Size"
 ],
 "Coloris": [
  "Farbe",
  "Colour"
 ],
 "à choisir": [
  "bitte wählen",
  "please choose"
 ],
 "Choisissez d'abord un coloris": [
  "Bitte wählen Sie zuerst eine Farbe",
  "Please choose a colour first"
 ],
 "Moins": [
  "Weniger",
  "Less"
 ],
 "Plus": [
  "Mehr",
  "More"
 ],
 "Livraison estimée": [
  "Voraussichtliche Lieferung",
  "Estimated delivery"
 ],
 "Partout en Suisse · 5.00 CHF": [
  "In die ganze Schweiz · 5.00 CHF",
  "Anywhere in Switzerland · CHF 5.00"
 ],
 "Glissez pour tourner": [
  "Zum Drehen ziehen",
  "Drag to rotate"
 ],
 "Coloris présenté en 3D : Rose.": [
  "In 3D gezeigte Farbe: Rosa.",
  "Colour shown in 3D: pink."
 ],
 "Reproduction 3D — chaque bougie étant faite main, la vôtre sera unique.": [
  "3D-Darstellung — jede Kerze ist handgemacht, Ihre wird ein Unikat sein.",
  "3D rendering — every candle is handmade, so yours will be one of a kind."
 ],
 "vue 3D, utilisez les flèches pour tourner": [
  "3D-Ansicht, mit den Pfeiltasten drehen",
  "3D view, use the arrow keys to rotate"
 ],
 "Studio 360°": [
  "Studio 360°",
  "360° Studio"
 ],
 "Faites-la": [
  "Lassen Sie sie",
  "Give it"
 ],
 "tourner.": [
  "drehen.",
  "a spin."
 ],
 "Chaque création, modélisée en 3D sous tous ses angles. Glissez pour la faire pivoter, et découvrez le moindre détail avant de commander.": [
  "Jede Kreation, in 3D aus allen Blickwinkeln. Ziehen Sie, um sie zu drehen, und entdecken Sie jedes Detail vor der Bestellung.",
  "Every creation, modelled in 3D from every angle. Drag to turn it and discover every detail before you order."
 ],
 "Choisir une bougie": [
  "Kerze wählen",
  "Choose a candle"
 ],
 "Voir la bougie": [
  "Kerze ansehen",
  "View the candle"
 ],
 "Vous hésitez ?": [
  "Unentschlossen?",
  "Not sure?"
 ],
 "Trouvez": [
  "Finden Sie",
  "Find"
 ],
 "votre bougie.": [
  "Ihre Kerze.",
  "your candle."
 ],
 "Trois questions pour découvrir la création Yumiya qui vous ressemble.": [
  "Drei Fragen, um die Yumiya-Kreation zu finden, die zu Ihnen passt.",
  "Three questions to find the Yumiya creation that suits you."
 ],
 "Question": [
  "Frage",
  "Question"
 ],
 "Question précédente": [
  "Vorherige Frage",
  "Previous question"
 ],
 "Pour qui est cette bougie ?": [
  "Für wen ist diese Kerze?",
  "Who is this candle for?"
 ],
 "Pour moi": [
  "Für mich",
  "For me"
 ],
 "Pour offrir": [
  "Zum Verschenken",
  "As a gift"
 ],
 "Pour un événement": [
  "Für einen Anlass",
  "For an event"
 ],
 "Quelle ambiance vous fait envie ?": [
  "Welche Stimmung wünschen Sie sich?",
  "What mood are you after?"
 ],
 "Douceur gourmande": [
  "Süsser Genuss",
  "Sweet indulgence"
 ],
 "Bouquet floral": [
  "Blumenstrauss",
  "Floral bouquet"
 ],
 "Cocon chaleureux": [
  "Warme Geborgenheit",
  "Cosy cocoon"
 ],
 "Calme & détente": [
  "Ruhe & Entspannung",
  "Calm & relaxation"
 ],
 "À quel moment l'allumerez-vous ?": [
  "Wann werden Sie sie anzünden?",
  "When will you light it?"
 ],
 "Une soirée cosy": [
  "An einem gemütlichen Abend",
  "A cosy evening"
 ],
 "Un matin lumineux": [
  "An einem hellen Morgen",
  "A bright morning"
 ],
 "Un moment pour soi": [
  "Für einen Moment für mich",
  "A moment for myself"
 ],
 "Pour décorer": [
  "Zur Dekoration",
  "As decoration"
 ],
 "Notre recommandation": [
  "Unsere Empfehlung",
  "Our recommendation"
 ],
 "Une création sur mesure": [
  "Eine Kreation nach Mass",
  "A made-to-order creation"
 ],
 "Pour un événement, rien ne vaut une bougie imaginée pour l'occasion : senteur, couleurs, décor et message à votre image.": [
  "Für einen Anlass gibt es nichts Schöneres als eine eigens dafür gestaltete Kerze: Duft, Farben, Dekor und Botschaft ganz nach Ihrem Wunsch.",
  "For an event, nothing beats a candle designed for the occasion: scent, colours, decoration and message, all your own."
 ],
 "Imaginer ma bougie": [
  "Meine Kerze gestalten",
  "Design my candle"
 ],
 "Recommencer": [
  "Neu starten",
  "Start again"
 ],
 "Votre bougie idéale": [
  "Ihre ideale Kerze",
  "Your ideal candle"
 ],
 "Vous aimerez aussi": [
  "Das gefällt Ihnen bestimmt auch",
  "You may also like"
 ],
 "Recommencer le quiz": [
  "Quiz neu starten",
  "Retake the quiz"
 ],
 "Couche par": [
  "Schicht für",
  "Layer by"
 ],
 "couche.": [
  "Schicht.",
  "layer."
 ],
 "Pour une flamme douce, calme et régulière.": [
  "Für eine sanfte, ruhige und gleichmässige Flamme.",
  "For a soft, calm and steady flame."
 ],
 "Cire de soja": [
  "Sojawachs",
  "Soy wax"
 ],
 "100 % végétale, sans paraffine, fondue doucement à l'atelier.": [
  "100 % pflanzlich, ohne Paraffin, sanft im Atelier geschmolzen.",
  "100% plant-based, paraffin-free, gently melted in the workshop."
 ],
 "Couche framboise": [
  "Himbeerschicht",
  "Raspberry layer"
 ],
 "Chaque teinte attend que la précédente ait pris.": [
  "Jede Farbe wartet, bis die vorherige fest ist.",
  "Each shade waits until the one before has set."
 ],
 "Chantilly de cire": [
  "Wachs-Chantilly",
  "Wax whipped cream"
 ],
 "Posée à la poche, comme en pâtisserie.": [
  "Mit dem Spritzbeutel aufgetragen, wie in der Konditorei.",
  "Piped on by hand, just like in a patisserie."
 ],
 "Le décor": [
  "Das Dekor",
  "The decoration"
 ],
 "Cœurs, fleurs, tablettes — placés un par un.": [
  "Herzen, Blumen, Täfelchen — eins nach dem anderen gesetzt.",
  "Hearts, flowers, little bars — placed one by one."
 ],
 "Pour voir chaque étage — et le réutiliser ensuite.": [
  "Um jede Schicht zu sehen — und es danach wiederzuverwenden.",
  "To see every layer — and to reuse afterwards."
 ],
 "Les couches de la bougie Marshmallow Framboise": [
  "Die Schichten der Kerze Marshmallow-Himbeere",
  "The layers of the Marshmallow Raspberry candle"
 ],
 "Végétale": [
  "Pflanzlich",
  "Plant-based"
 ],
 "Cire de soja biodégradable, sans paraffine, et mèche en coton.": [
  "Biologisch abbaubares Sojawachs ohne Paraffin und ein Baumwolldocht.",
  "Biodegradable, paraffin-free soy wax and a cotton wick."
 ],
 "Faite main": [
  "Handgemacht",
  "Handmade"
 ],
 "Chaque pièce est unique, coulée et décorée à la main.": [
  "Jedes Stück ist ein Unikat, von Hand gegossen und dekoriert.",
  "Every piece is unique, poured and decorated by hand."
 ],
 "Locale": [
  "Lokal",
  "Local"
 ],
 "Fabriquée à La Neuveville, livrée avec soin partout en Suisse.": [
  "Hergestellt in La Neuveville, sorgfältig in die ganze Schweiz geliefert.",
  "Made in La Neuveville, carefully delivered across Switzerland."
 ],
 "Une création imaginée exactement comme vous la rêvez.": [
  "Eine Kreation, genau so, wie Sie sie sich erträumen.",
  "A creation designed exactly as you dream it."
 ],
 "Le coffret": [
  "Das Geschenkset",
  "The gift set"
 ],
 "Yumiya.": [
  "Yumiya.",
  "Yumiya."
 ],
 "Une bougie gourmande Marshmallow Framboise et une bougie Tulipe, réunies dans un écrin pastel noué d'un ruban. Le cadeau prêt à offrir, pour un anniversaire, un merci, ou simplement parce que.": [
  "Eine Gourmet-Kerze Marshmallow-Himbeere und eine Tulpenkerze, vereint in einer pastellfarbenen Box mit Schleife. Das Geschenk, bereit zum Überreichen — zum Geburtstag, als Dankeschön oder einfach so.",
  "A Marshmallow Raspberry gourmet candle and a Tulip candle in a pastel box tied with a ribbon. The ready-to-give present for a birthday, a thank-you, or just because."
 ],
 "Plus avantageux que les deux bougies séparément": [
  "Günstiger als die beiden Kerzen einzeln",
  "Better value than the two candles separately"
 ],
 "Voir le coffret": [
  "Geschenkset ansehen",
  "View the gift set"
 ],
 "Une idée": [
  "Eine Idee",
  "An idea"
 ],
 "en tête ?": [
  "im Kopf?",
  "in mind?"
 ],
 "Un mariage, une naissance, un anniversaire ou un cadeau d'entreprise : décrivez-nous votre idée, nous la façonnons à la main. Senteur, couleurs, décor et message.": [
  "Eine Hochzeit, eine Geburt, ein Geburtstag oder ein Firmengeschenk: Beschreiben Sie uns Ihre Idee, wir formen sie von Hand. Duft, Farben, Dekor und Botschaft.",
  "A wedding, a birth, a birthday or a corporate gift: tell us your idea and we'll shape it by hand. Scent, colours, decoration and message."
 ],
 "Vous racontez": [
  "Sie erzählen",
  "You tell us"
 ],
 "L'occasion, les couleurs, la senteur et le message souhaités.": [
  "Den Anlass, die Farben, den Duft und die gewünschte Botschaft.",
  "The occasion, colours, scent and message you'd like."
 ],
 "Nous proposons": [
  "Wir schlagen vor",
  "We propose"
 ],
 "Sous 48 heures, une proposition et un devis.": [
  "Innert 48 Stunden ein Vorschlag und eine Offerte.",
  "Within 48 hours, a proposal and a quote."
 ],
 "Nous créons": [
  "Wir gestalten",
  "We create"
 ],
 "Coulée et décorée à la main, à l'atelier de La Neuveville.": [
  "Von Hand gegossen und dekoriert, im Atelier in La Neuveville.",
  "Poured and decorated by hand in our La Neuveville workshop."
 ],
 "Vous recevez": [
  "Sie erhalten",
  "You receive"
 ],
 "Livrée avec soin partout en Suisse, prête à être offerte.": [
  "Sorgfältig in die ganze Schweiz geliefert, bereit zum Verschenken.",
  "Carefully delivered across Switzerland, ready to give."
 ],
 "Décrivez votre bougie idéale": [
  "Beschreiben Sie Ihre ideale Kerze",
  "Describe your ideal candle"
 ],
 "Sans engagement · Réponse personnalisée sous 48 heures.": [
  "Unverbindlich · Persönliche Antwort innert 48 Stunden.",
  "No obligation · Personal reply within 48 hours."
 ],
 "Pour quelle occasion ? *": [
  "Für welchen Anlass? *",
  "What's the occasion? *"
 ],
 "Mariage": [
  "Hochzeit",
  "Wedding"
 ],
 "Anniversaire": [
  "Geburtstag",
  "Birthday"
 ],
 "Naissance": [
  "Geburt",
  "Birth"
 ],
 "Entreprise": [
  "Firma",
  "Company"
 ],
 "Autre": [
  "Anderes",
  "Other"
 ],
 "Nom *": [
  "Name *",
  "Name *"
 ],
 "Email *": [
  "E-Mail *",
  "Email *"
 ],
 "— Au choix —": [
  "— Nach Wahl —",
  "— Any —"
 ],
 "Violette": [
  "Veilchen",
  "Violet"
 ],
 "Vanille": [
  "Vanille",
  "Vanilla"
 ],
 "Fraise": [
  "Erdbeere",
  "Strawberry"
 ],
 "Je ne sais pas encore": [
  "Ich weiss es noch nicht",
  "I'm not sure yet"
 ],
 "Quantité": [
  "Menge",
  "Quantity"
 ],
 "— Choisir —": [
  "— Wählen —",
  "— Choose —"
 ],
 "1 bougie": [
  "1 Kerze",
  "1 candle"
 ],
 "2 à 5": [
  "2 bis 5",
  "2 to 5"
 ],
 "6 à 20": [
  "6 bis 20",
  "6 to 20"
 ],
 "Plus de 20": [
  "Mehr als 20",
  "More than 20"
 ],
 "Couleurs / ambiance": [
  "Farben / Stimmung",
  "Colours / mood"
 ],
 "Tons pastel, bordeaux et doré…": [
  "Pastelltöne, Bordeaux und Gold …",
  "Pastel tones, burgundy and gold…"
 ],
 "Votre idée *": [
  "Ihre Idee *",
  "Your idea *"
 ],
 "Racontez-nous l'ambiance souhaitée, un message à inclure, une date…": [
  "Erzählen Sie uns von der gewünschten Stimmung, einer Botschaft, einem Datum …",
  "Tell us about the mood you'd like, a message to include, a date…"
 ],
 "Envoyer ma demande": [
  "Anfrage senden",
  "Send my request"
 ],
 "Merci !": [
  "Danke!",
  "Thank you!"
 ],
 "Nous revenons vers vous sous 48 heures pour imaginer ensemble votre bougie.": [
  "Wir melden uns innert 48 Stunden, um Ihre Kerze gemeinsam zu gestalten.",
  "We'll get back to you within 48 hours to design your candle together."
 ],
 "Bougies tulipes Yumiya Candle dans leurs écrins": [
  "Tulpenkerzen von Yumiya Candle in ihren Boxen",
  "Yumiya Candle tulip candles in their boxes"
 ],
 "La Maison Yumiya": [
  "Das Haus Yumiya",
  "The House of Yumiya"
 ],
 "Une passion": [
  "Eine Leidenschaft,",
  "A passion"
 ],
 "qui brûle.": [
  "die brennt.",
  "that burns."
 ],
 "Yumiya Candle est née d'une envie : créer, de nos mains, un objet beau et concret. Nous sommes cinq élèves de l'École Supérieure de Commerce de La Neuveville, et nous consacrons huit leçons par semaine à faire vivre cette maison dans le cadre de notre formation.": [
  "Yumiya Candle entstand aus einem Wunsch: mit unseren Händen etwas Schönes und Greifbares zu schaffen. Wir sind fünf Lernende der École Supérieure de Commerce in La Neuveville und widmen diesem Haus im Rahmen unserer Ausbildung acht Lektionen pro Woche.",
  "Yumiya Candle was born from a wish: to create something beautiful and tangible with our own hands. We are five students at the École Supérieure de Commerce in La Neuveville, and we devote eight lessons a week to running this house as part of our training."
 ],
 "Du développement des senteurs à la vente, en passant par la fabrication, la communication et la gestion, tout est pensé et réalisé par nous, avec exigence. Chaque bougie que vous recevez est le reflet de ce travail : artisanale, coulée à la main, et fabriquée en Suisse.": [
  "Von der Duftentwicklung bis zum Verkauf, über Herstellung, Kommunikation und Verwaltung: Alles wird von uns mit hohem Anspruch geplant und umgesetzt. Jede Kerze, die Sie erhalten, spiegelt diese Arbeit wider: handwerklich, von Hand gegossen und in der Schweiz hergestellt.",
  "From developing the scents to selling them, through production, communication and management, everything is planned and carried out by us, with care. Every candle you receive reflects that work: artisanal, hand-poured and made in Switzerland."
 ],
 "élèves de l'ESC": [
  "Lernende der ESC",
  "students at the ESC"
 ],
 "leçons par semaine": [
  "Lektionen pro Woche",
  "lessons a week"
 ],
 "à l'atelier": [
  "im Atelier",
  "in the workshop"
 ],
 "végétale": [
  "pflanzlich",
  "soy wax"
 ],
 "Le journal de l'atelier": [
  "Das Journal des Ateliers",
  "The workshop journal"
 ],
 "d'allumage.": [
  "des Anzündens.",
  "of lighting."
 ],
 "La première combustion dessine la « mémoire » de la cire. Quelques gestes simples, et votre bougie brûlera longtemps, régulièrement.": [
  "Das erste Abbrennen prägt das «Gedächtnis» des Wachses. Mit ein paar einfachen Handgriffen brennt Ihre Kerze lange und gleichmässig.",
  "The first burn shapes the wax's \"memory\". A few simple habits, and your candle will burn long and evenly."
 ],
 "Toute la surface": [
  "Die ganze Oberfläche",
  "The whole surface"
 ],
 "La première fois, laissez-la allumée jusqu'à ce que la surface soit liquide d'un bord à l'autre du verre. Comptez une à deux heures.": [
  "Lassen Sie sie beim ersten Mal brennen, bis die Oberfläche von Rand zu Rand flüssig ist. Rechnen Sie mit ein bis zwei Stunden.",
  "The first time, let it burn until the surface is liquid from one edge of the glass to the other. Allow one to two hours."
 ],
 "Mèche à 5 mm": [
  "Docht auf 5 mm",
  "Wick at 5 mm"
 ],
 "Avant chaque allumage, raccourcissez la mèche à environ 5 mm. La flamme reste calme et le verre propre.": [
  "Kürzen Sie den Docht vor jedem Anzünden auf etwa 5 mm. So bleibt die Flamme ruhig und das Glas sauber.",
  "Before each lighting, trim the wick to about 5 mm. The flame stays calm and the glass stays clean."
 ],
 "3 à 4 heures max.": [
  "Max. 3 bis 4 Stunden",
  "3 to 4 hours max."
 ],
 "Au-delà, la mèche s'alourdit. Éteignez, laissez refroidir, puis rallumez plus tard. Évitez les courants d'air.": [
  "Danach wird der Docht schwer. Löschen, abkühlen lassen und später wieder anzünden. Vermeiden Sie Durchzug.",
  "Beyond that, the wick gets heavy. Put it out, let it cool, then light it again later. Avoid draughts."
 ],
 "Sous surveillance": [
  "Unter Aufsicht",
  "Never unattended"
 ],
 "Ne laissez jamais une bougie allumée sans surveillance, et tenez-la hors de portée des enfants et des animaux.": [
  "Lassen Sie eine brennende Kerze nie unbeaufsichtigt und halten Sie sie von Kindern und Tieren fern.",
  "Never leave a lit candle unattended, and keep it out of reach of children and pets."
 ],
 "Questions fréquentes": [
  "Häufige Fragen",
  "Frequently asked questions"
 ],
 "Simple et": [
  "Einfach und",
  "Simple and"
 ],
 "sans complication.": [
  "unkompliziert.",
  "hassle-free."
 ],
 "Une autre question ? Écrivez-nous à": [
  "Noch eine Frage? Schreiben Sie uns an",
  "Another question? Write to us at"
 ],
 "De quoi sont faites vos bougies ?": [
  "Woraus bestehen Ihre Kerzen?",
  "What are your candles made of?"
 ],
 "D'une cire de soja 100 % végétale, biodégradable et sans paraffine, et d'une mèche en coton. Chaque bougie est coulée et décorée à la main. En cas d'allergie, écrivez-nous avant de commander : nous vous conseillerons.": [
  "Aus 100 % pflanzlichem, biologisch abbaubarem Sojawachs ohne Paraffin und einem Baumwolldocht. Jede Kerze wird von Hand gegossen und dekoriert. Bei Allergien schreiben Sie uns vor der Bestellung: Wir beraten Sie gerne.",
  "100% plant-based, biodegradable, paraffin-free soy wax and a cotton wick. Every candle is poured and decorated by hand. If you have allergies, write to us before ordering and we'll advise you."
 ],
 "Combien de temps brûle une bougie ?": [
  "Wie lange brennt eine Kerze?",
  "How long does a candle burn?"
 ],
 "Environ": [
  "Etwa",
  "About"
 ],
 "12 heures": [
  "12 Stunden",
  "12 hours"
 ],
 "pour la petite bougie gourmande (90 g) et environ": [
  "für die kleine Gourmet-Kerze (90 g) und etwa",
  "for the small gourmet candle (90 g) and about"
 ],
 "18 heures": [
  "18 Stunden",
  "18 hours"
 ],
 "pour la grande (180 g).": [
  "für die grosse (180 g).",
  "for the large one (180 g)."
 ],
 "Quels sont les frais et délais de livraison ?": [
  "Wie hoch sind Versandkosten und Lieferzeit?",
  "What are the delivery costs and times?"
 ],
 "La livraison coûte": [
  "Die Lieferung kostet",
  "Delivery costs"
 ],
 "partout en Suisse. Comptez": [
  "in die ganze Schweiz. Rechnen Sie mit",
  "anywhere in Switzerland. Allow"
 ],
 "5 à 10 jours ouvrables": [
  "5 bis 10 Werktagen",
  "5 to 10 working days"
 ],
 "après la confirmation de votre paiement.": [
  "nach Bestätigung Ihrer Zahlung.",
  "after your payment is confirmed."
 ],
 "Quels moyens de paiement acceptez-vous ?": [
  "Welche Zahlungsmittel akzeptieren Sie?",
  "Which payment methods do you accept?"
 ],
 "Le paiement se fait en ligne, en toute sécurité, par": [
  "Die Zahlung erfolgt online und sicher, mit",
  "Payment is made online, securely, by"
 ],
 "ou par carte bancaire (Visa, Mastercard, via SumUp).": [
  "oder per Kreditkarte (Visa, Mastercard, über SumUp).",
  "or by bank card (Visa, Mastercard, via SumUp)."
 ],
 "Puis-je retourner ma commande ?": [
  "Kann ich meine Bestellung zurücksenden?",
  "Can I return my order?"
 ],
 "Oui, dans les 30 jours. Les frais de retour s'élèvent à 5.00 CHF. Écrivez-nous d'abord par email : nous trouverons une solution. Tous les détails figurent dans nos": [
  "Ja, innerhalb von 30 Tagen. Die Rücksendekosten betragen 5.00 CHF. Schreiben Sie uns zuerst per E-Mail: Wir finden eine Lösung. Alle Details finden Sie in unseren",
  "Yes, within 30 days. Return costs are CHF 5.00. Please email us first and we'll find a solution. Full details are in our"
 ],
 "conditions de vente": [
  "Verkaufsbedingungen",
  "terms of sale"
 ],
 "Comment fonctionne le sur mesure ?": [
  "Wie funktioniert die Anfertigung nach Mass?",
  "How do made-to-order candles work?"
 ],
 "Décrivez votre idée dans le formulaire": [
  "Beschreiben Sie Ihre Idee im Formular",
  "Describe your idea in the"
 ],
 ": nous revenons vers vous sous 48 heures avec une proposition et un devis. Prix et délai sont convenus avec vous avant la fabrication.": [
  ": Wir melden uns innert 48 Stunden mit einem Vorschlag und einer Offerte. Preis und Frist werden vor der Herstellung mit Ihnen vereinbart.",
  "form: we'll get back to you within 48 hours with a proposal and a quote. Price and timing are agreed with you before production."
 ],
 "Écrivez-": [
  "Schreiben Sie ",
  "Write to "
 ],
 "nous.": [
  "uns.",
  "us."
 ],
 "Une question sur une bougie, une commande ou un projet ? Nous vous répondons avec plaisir.": [
  "Eine Frage zu einer Kerze, einer Bestellung oder einem Projekt? Wir antworten Ihnen gerne.",
  "A question about a candle, an order or a project? We'll be happy to help."
 ],
 "Email": [
  "E-Mail",
  "Email"
 ],
 "Votre message": [
  "Ihre Nachricht",
  "Your message"
 ],
 "Pour une création personnalisée, utilisez plutôt le": [
  "Für eine persönliche Kreation nutzen Sie besser das",
  "For a personalised creation, please use the"
 ],
 "formulaire sur mesure": [
  "Formular für Anfertigungen nach Mass",
  "made-to-order form"
 ],
 "Sujet": [
  "Betreff",
  "Subject"
 ],
 "Question sur une bougie": [
  "Frage zu einer Kerze",
  "Question about a candle"
 ],
 "Ma commande": [
  "Meine Bestellung",
  "My order"
 ],
 "Collaboration / entreprise": [
  "Zusammenarbeit / Firma",
  "Collaboration / business"
 ],
 "Message *": [
  "Nachricht *",
  "Message *"
 ],
 "Envoyer": [
  "Senden",
  "Send"
 ],
 "Nous vous répondons très vite.": [
  "Wir antworten Ihnen sehr bald.",
  "We'll reply very soon."
 ],
 "Allumez": [
  "Zünden Sie",
  "Light up"
 ],
 "le moment.": [
  "den Moment an.",
  "the moment."
 ],
 "La lettre de l'atelier": [
  "Der Atelier-Newsletter",
  "The workshop letter"
 ],
 "Nouvelles collections, éditions limitées et coulisses de l'atelier.": [
  "Neue Kollektionen, limitierte Editionen und Einblicke ins Atelier.",
  "New collections, limited editions and behind the scenes at the workshop."
 ],
 "Votre email": [
  "Ihre E-Mail",
  "Your email"
 ],
 "S'inscrire": [
  "Anmelden",
  "Subscribe"
 ],
 "Merci, votre inscription est confirmée.": [
  "Danke, Ihre Anmeldung ist bestätigt.",
  "Thank you, you're subscribed."
 ],
 "Maison de bougies gourmandes et florales, coulées à la main à La Neuveville. Cire de soja végétale, mèche en coton, créations sur mesure.": [
  "Manufaktur für Gourmet- und Blumenkerzen, von Hand gegossen in La Neuveville. Pflanzliches Sojawachs, Baumwolldocht, Kreationen nach Mass.",
  "A house of gourmet and floral candles, hand-poured in La Neuveville. Plant-based soy wax, cotton wick, made-to-order creations."
 ],
 "Entreprise d'élèves de l'École Supérieure de Commerce de La Neuveville": [
  "Schülerunternehmen der École Supérieure de Commerce de La Neuveville",
  "A student company of the École Supérieure de Commerce de La Neuveville"
 ],
 "Notre histoire": [
  "Unsere Geschichte",
  "Our story"
 ],
 "Conseils": [
  "Tipps",
  "Care tips"
 ],
 "Yumiya Candle · Fait main en Suisse": [
  "Yumiya Candle · Handgemacht in der Schweiz",
  "Yumiya Candle · Handmade in Switzerland"
 ],
 "© 2026 Yumiya Candle · Fait main en Suisse": [
  "© 2026 Yumiya Candle · Handgemacht in der Schweiz",
  "© 2026 Yumiya Candle · Handmade in Switzerland"
 ],
 "Mentions légales": [
  "Impressum",
  "Legal notice"
 ],
 "Conditions de vente": [
  "Verkaufsbedingungen",
  "Terms of sale"
 ],
 "Confidentialité": [
  "Datenschutz",
  "Privacy"
 ],
 "Panier": [
  "Warenkorb",
  "Cart"
 ],
 "Votre panier": [
  "Ihr Warenkorb",
  "Your cart"
 ],
 "Votre panier est vide": [
  "Ihr Warenkorb ist leer",
  "Your cart is empty"
 ],
 "Laissez-vous tenter par nos créations.": [
  "Lassen Sie sich von unseren Kreationen verführen.",
  "Let our creations tempt you."
 ],
 "Voir la boutique": [
  "Zum Shop",
  "Visit the shop"
 ],
 "Retirer": [
  "Entfernen",
  "Remove"
 ],
 "Sous-total": [
  "Zwischensumme",
  "Subtotal"
 ],
 "Livraison (Suisse)": [
  "Lieferung (Schweiz)",
  "Delivery (Switzerland)"
 ],
 "Total": [
  "Total",
  "Total"
 ],
 "Commander": [
  "Bestellen",
  "Checkout"
 ],
 "Paiement sécurisé par TWINT ou carte · Livraison sous 5 à 10 jours ouvrables": [
  "Sichere Zahlung mit TWINT oder Karte · Lieferung innert 5 bis 10 Werktagen",
  "Secure payment by TWINT or card · Delivery within 5 to 10 working days"
 ],
 "Complétez votre commande": [
  "Ergänzen Sie Ihre Bestellung",
  "Complete your order"
 ],
 "Ajouté": [
  "Hinzugefügt",
  "Added"
 ],
 "Voir le panier": [
  "Warenkorb ansehen",
  "View cart"
 ],
 "Votre commande": [
  "Ihre Bestellung",
  "Your order"
 ],
 "01 Livraison": [
  "01 Lieferung",
  "01 Delivery"
 ],
 "02 Paiement": [
  "02 Zahlung",
  "02 Payment"
 ],
 "03 Confirmation": [
  "03 Bestätigung",
  "03 Confirmation"
 ],
 "Adresse de livraison": [
  "Lieferadresse",
  "Delivery address"
 ],
 "Prénom *": [
  "Vorname *",
  "First name *"
 ],
 "Adresse *": [
  "Adresse *",
  "Address *"
 ],
 "Rue et numéro": [
  "Strasse und Nummer",
  "Street and number"
 ],
 "NPA *": [
  "PLZ *",
  "Postcode *"
 ],
 "Localité *": [
  "Ort *",
  "Town *"
 ],
 "Téléphone *": [
  "Telefon *",
  "Phone *"
 ],
 "Message cadeau (facultatif)": [
  "Geschenknachricht (optional)",
  "Gift message (optional)"
 ],
 "Quelques mots à glisser dans le colis": [
  "Ein paar Worte für das Paket",
  "A few words to slip into the parcel"
 ],
 "Continuer vers le paiement": [
  "Weiter zur Zahlung",
  "Continue to payment"
 ],
 "Paiement": [
  "Zahlung",
  "Payment"
 ],
 "Commande": [
  "Bestellung",
  "Order"
 ],
 "· Total": [
  "· Total",
  "· Total"
 ],
 "Recommandé": [
  "Empfohlen",
  "Recommended"
 ],
 "Le montant et la référence de commande sont déjà remplis : il suffit de confirmer dans l'app.": [
  "Betrag und Bestellreferenz sind bereits ausgefüllt: Sie müssen nur noch in der App bestätigen.",
  "The amount and order reference are already filled in: just confirm in the app."
 ],
 "Payer avec TWINT": [
  "Mit TWINT bezahlen",
  "Pay with TWINT"
 ],
 "Carte bancaire": [
  "Kreditkarte",
  "Bank card"
 ],
 "Paiement sécurisé via SumUp. Indiquez": [
  "Sichere Zahlung über SumUp. Geben Sie",
  "Secure payment via SumUp. Enter"
 ],
 "CHF sur la page de paiement — le montant est copié pour vous au clic.": [
  "CHF auf der Zahlungsseite ein — der Betrag wird beim Klick für Sie kopiert.",
  "CHF on the payment page — the amount is copied for you when you click."
 ],
 "Payer par carte": [
  "Mit Karte bezahlen",
  "Pay by card"
 ],
 "Payer {x} avec TWINT": [
  "{x} mit TWINT bezahlen",
  "Pay {x} with TWINT"
 ],
 "Payer {x} par carte": [
  "{x} mit Karte bezahlen",
  "Pay {x} by card"
 ],
 "Une fois le paiement effectué, revenez ici :": [
  "Sobald die Zahlung erfolgt ist, kehren Sie hierher zurück:",
  "Once you've paid, come back here:"
 ],
 "J'ai réglé ma commande": [
  "Ich habe meine Bestellung bezahlt",
  "I've paid for my order"
 ],
 "← Modifier l'adresse": [
  "← Adresse ändern",
  "← Change address"
 ],
 "Merci pour votre commande": [
  "Vielen Dank für Ihre Bestellung",
  "Thank you for your order"
 ],
 "est enregistrée. Dès réception de votre paiement, nous la préparons avec soin et l'expédions sous 5 à 10 jours ouvrables.": [
  "ist registriert. Sobald Ihre Zahlung eingegangen ist, bereiten wir sie sorgfältig vor und versenden sie innert 5 bis 10 Werktagen.",
  "has been received. As soon as your payment arrives, we'll prepare it with care and ship it within 5 to 10 working days."
 ],
 "Retour au site": [
  "Zurück zur Website",
  "Back to the site"
 ],
 "Récapitulatif": [
  "Zusammenfassung",
  "Summary"
 ],
 "Montant copié": [
  "Betrag kopiert",
  "Amount copied"
 ],
 "Montant à régler": [
  "Zu zahlender Betrag",
  "Amount to pay"
 ],
 "Envoi automatique impossible": [
  "Automatischer Versand nicht möglich",
  "Automatic sending failed"
 ],
 "Envoyer par email": [
  "Per E-Mail senden",
  "Send by email"
 ],
 "Envoi…": [
  "Wird gesendet …",
  "Sending…"
 ],
 "Votre commande n'a pas pu nous être transmise automatiquement. Envoyez-nous le récapitulatif (déjà rédigé) en un clic, puis réglez votre commande ci-dessous.": [
  "Ihre Bestellung konnte nicht automatisch übermittelt werden. Senden Sie uns die (bereits verfasste) Zusammenfassung mit einem Klick und bezahlen Sie dann unten.",
  "Your order couldn't be sent to us automatically. Send us the summary (already written) in one click, then pay for your order below."
 ],
 "Votre message n'a pas pu être envoyé automatiquement. Envoyez-le-nous par email : il est déjà rédigé.": [
  "Ihre Nachricht konnte nicht automatisch gesendet werden. Senden Sie sie uns per E-Mail: Sie ist bereits verfasst.",
  "Your message couldn't be sent automatically. Send it to us by email: it's already written."
 ],
 "Mentions légales & conditions – Yumiya Candle": [
  "Impressum & Bedingungen – Yumiya Candle",
  "Legal notice & terms – Yumiya Candle"
 ],
 "Mentions légales, conditions générales de vente et protection des données de Yumiya Candle, La Neuveville.": [
  "Impressum, Allgemeine Verkaufsbedingungen und Datenschutz von Yumiya Candle, La Neuveville.",
  "Legal notice, general terms of sale and privacy policy of Yumiya Candle, La Neuveville."
 ],
 "← Retour au site": [
  "← Zurück zur Website",
  "← Back to the site"
 ],
 "Informations": [
  "Informationen",
  "Information"
 ],
 "& conditions.": [
  "& Bedingungen.",
  "& terms."
 ],
 "Dernière mise à jour : octobre 2026": [
  "Letzte Aktualisierung: Oktober 2026",
  "Last updated: October 2026"
 ],
 "Sommaire": [
  "Inhalt",
  "Contents"
 ],
 "Protection des données": [
  "Datenschutz",
  "Privacy policy"
 ],
 "Sécurité": [
  "Sicherheit",
  "Safety"
 ],
 "Éditeur": [
  "Herausgeber",
  "Publisher"
 ],
 "Contact :": [
  "Kontakt:",
  "Contact:"
 ],
 "Activité": [
  "Tätigkeit",
  "Business"
 ],
 "Fabrication artisanale et vente en ligne de bougies, en Suisse. Yumiya Candle est une entreprise d'élèves de l'École Supérieure de Commerce de La Neuveville.": [
  "Handwerkliche Herstellung und Online-Verkauf von Kerzen in der Schweiz. Yumiya Candle ist ein Schülerunternehmen der École Supérieure de Commerce de La Neuveville.",
  "Artisan production and online sale of candles in Switzerland. Yumiya Candle is a student company of the École Supérieure de Commerce de La Neuveville."
 ],
 "Propriété intellectuelle": [
  "Geistiges Eigentum",
  "Intellectual property"
 ],
 "Les textes, photographies, logo et éléments graphiques de ce site sont la propriété de Yumiya Candle. Toute reproduction sans autorisation écrite préalable est interdite.": [
  "Texte, Fotos, Logo und grafische Elemente dieser Website sind Eigentum von Yumiya Candle. Jede Vervielfältigung ohne vorherige schriftliche Genehmigung ist untersagt.",
  "The texts, photographs, logo and graphic elements of this site are the property of Yumiya Candle. Any reproduction without prior written permission is prohibited."
 ],
 "Responsabilité": [
  "Haftung",
  "Liability"
 ],
 "Nous apportons le plus grand soin aux informations publiées sur ce site, sans pouvoir garantir qu'elles soient exemptes d'erreurs. Les couleurs des produits peuvent légèrement varier selon l'écran.": [
  "Wir veröffentlichen die Informationen auf dieser Website mit grösster Sorgfalt, können jedoch nicht garantieren, dass sie fehlerfrei sind. Die Farben der Produkte können je nach Bildschirm leicht abweichen.",
  "We take great care with the information published on this site but cannot guarantee it is free of errors. Product colours may vary slightly depending on your screen."
 ],
 "Conditions générales de vente": [
  "Allgemeine Verkaufsbedingungen",
  "General terms of sale"
 ],
 "1. Vendeur": [
  "1. Verkäufer",
  "1. Seller"
 ],
 "Yumiya Candle, Route de Neuchâtel 7, 2520 La Neuveville, Suisse. Contact :": [
  "Yumiya Candle, Route de Neuchâtel 7, 2520 La Neuveville, Schweiz. Kontakt:",
  "Yumiya Candle, Route de Neuchâtel 7, 2520 La Neuveville, Switzerland. Contact:"
 ],
 "Yumiya Candle · Route de Neuchâtel 7, 2520 La Neuveville, Suisse.": [
  "Yumiya Candle · Route de Neuchâtel 7, 2520 La Neuveville, Schweiz.",
  "Yumiya Candle · Route de Neuchâtel 7, 2520 La Neuveville, Switzerland."
 ],
 "2. Produits et prix": [
  "2. Produkte und Preise",
  "2. Products and prices"
 ],
 "Les prix sont indiqués en francs suisses (CHF). Nos bougies étant fabriquées à la main, de légères différences d'aspect entre deux pièces sont normales.": [
  "Die Preise verstehen sich in Schweizer Franken (CHF). Da unsere Kerzen von Hand gefertigt werden, sind leichte Unterschiede im Aussehen normal.",
  "Prices are shown in Swiss francs (CHF). As our candles are handmade, slight differences in appearance between two pieces are normal."
 ],
 "3. Commande et paiement": [
  "3. Bestellung und Zahlung",
  "3. Ordering and payment"
 ],
 "La commande se fait en ligne. Le paiement s'effectue par carte bancaire (via SumUp) ou par TWINT. La commande est confirmée dès réception du paiement.": [
  "Die Bestellung erfolgt online. Bezahlt wird per Kreditkarte (über SumUp) oder mit TWINT. Die Bestellung ist mit Zahlungseingang bestätigt.",
  "Orders are placed online. Payment is made by bank card (via SumUp) or by TWINT. The order is confirmed once payment is received."
 ],
 "4. Livraison": [
  "4. Lieferung",
  "4. Delivery"
 ],
 "Nous livrons en Suisse. Les frais de livraison s'élèvent à 5.00 CHF. Le délai de livraison est de 5 à 10 jours ouvrables après confirmation du paiement.": [
  "Wir liefern in die Schweiz. Die Versandkosten betragen 5.00 CHF. Die Lieferzeit beträgt 5 bis 10 Werktage nach Zahlungsbestätigung.",
  "We deliver within Switzerland. Delivery costs CHF 5.00. Delivery takes 5 to 10 working days after payment is confirmed."
 ],
 "5. Retours": [
  "5. Rücksendungen",
  "5. Returns"
 ],
 "Vous pouvez retourner votre commande dans les 30 jours. Les frais de retour s'élèvent à 5.00 CHF. Pour effectuer un retour, contactez-nous d'abord par email.": [
  "Sie können Ihre Bestellung innerhalb von 30 Tagen zurücksenden. Die Rücksendekosten betragen 5.00 CHF. Kontaktieren Sie uns für eine Rücksendung bitte zuerst per E-Mail.",
  "You may return your order within 30 days. Return costs are CHF 5.00. To make a return, please email us first."
 ],
 "6. Créations sur mesure": [
  "6. Kreationen nach Mass",
  "6. Made-to-order creations"
 ],
 "Les bougies personnalisées sont réalisées d'après votre demande. Leurs conditions (prix, délai) sont convenues avec vous avant la fabrication.": [
  "Personalisierte Kerzen werden nach Ihrer Anfrage gefertigt. Die Bedingungen (Preis, Frist) werden vor der Herstellung mit Ihnen vereinbart.",
  "Personalised candles are made to your request. Their terms (price, timing) are agreed with you before production."
 ],
 "Les informations transmises via nos formulaires (nom, adresse, email, téléphone) servent uniquement au traitement de votre commande ou de votre demande. Elles ne sont jamais revendues. Vous pouvez demander leur suppression à tout moment par email.": [
  "Die über unsere Formulare übermittelten Angaben (Name, Adresse, E-Mail, Telefon) dienen ausschliesslich der Bearbeitung Ihrer Bestellung oder Anfrage. Sie werden nie weiterverkauft. Sie können jederzeit per E-Mail ihre Löschung verlangen.",
  "The information you send through our forms (name, address, email, phone) is used solely to process your order or request. It is never sold. You can ask for it to be deleted at any time by email."
 ],
 "Les formulaires sont transmis par le service Formspree, et les paiements sont traités par TWINT et SumUp : nous ne voyons ni ne conservons vos données bancaires. Votre panier est enregistré uniquement dans votre navigateur.": [
  "Die Formulare werden über den Dienst Formspree übermittelt, die Zahlungen von TWINT und SumUp abgewickelt: Wir sehen und speichern Ihre Bankdaten nicht. Ihr Warenkorb wird nur in Ihrem Browser gespeichert.",
  "Forms are sent through the Formspree service, and payments are processed by TWINT and SumUp: we never see or store your bank details. Your cart is saved only in your browser."
 ],
 "Ne laissez jamais une bougie allumée sans surveillance, tenez-la hors de portée des enfants et des animaux, et posez-la sur une surface stable et résistante à la chaleur.": [
  "Lassen Sie eine brennende Kerze nie unbeaufsichtigt, halten Sie sie von Kindern und Tieren fern und stellen Sie sie auf eine stabile, hitzebeständige Unterlage.",
  "Never leave a lit candle unattended, keep it out of reach of children and pets, and place it on a stable, heat-resistant surface."
 ],
 "Accueil": [
  "Startseite",
  "Home"
 ]
});


const norm = s => String(s).replace(/\s+/g, ' ').trim();
function t(s) {
  if (LANG === 'fr' || s == null) return s;
  const e = I18N[norm(s)];
  return e ? e[LANG === 'de' ? 0 : 1] : s;
}
function setLang(l) {
  try { localStorage.setItem('yumiya_lang', l); } catch (_) {}
  const u = new URL(location.href); u.searchParams.delete('lang');
  location.replace(u.pathname + u.search + u.hash);
  setTimeout(() => location.reload(), 50);
}
/* Traduit les textes et attributs d'une page (avant les animations) */
function translateDOM(root) {
  if (LANG === 'fr') return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: n => (n.parentNode.closest('script,style,[data-no-i18n]') || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => {
    const raw = n.nodeValue, key = norm(raw), tr = I18N[key];
    if (!tr) return;
    const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    n.nodeValue = lead + tr[LANG === 'de' ? 0 : 1] + trail;
  });
  root.querySelectorAll('[placeholder],[aria-label],[alt],[title],meta[name="description"],meta[property^="og:"]').forEach(el => {
    ['placeholder', 'aria-label', 'alt', 'title', 'content'].forEach(a => {
      const v = el.getAttribute(a);
      if (v && I18N[norm(v)]) el.setAttribute(a, t(v));
    });
  });
  if (root === document) document.title = t(document.title);
}

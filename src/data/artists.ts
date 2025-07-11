import { Artist } from '../types/gallery';

// Import artwork images
import whispersOfDawn from '@/assets/whispers-of-dawn.jpg';
import midnightReverie from '@/assets/midnight-reverie.jpg';
import urbanFusion from '@/assets/urban-fusion.jpg';
import memoryVessel from '@/assets/memory-vessel.jpg';
import elenaMorrison from '@/assets/elena-morrison.jpg';
import davidChen from '@/assets/david-chen.jpg';
import sarahGoldberg from '@/assets/sarah-goldberg.jpg';

export const artistsData: Artist[] = [
  {
    id: 'elena-morrison',
    name: {
      en: 'Elena Morrison',
      he: 'אלנה מוריסון'
    },
    bio: {
      en: 'Elena Morrison is a contemporary abstract painter whose work explores the intersection of color, emotion, and memory. Based in New York, her paintings have been exhibited in galleries across the United States and Europe.',
      he: 'אלנה מוריסון היא צייר אבסטרקטי עכשווי שעבודתה חוקרת את הצומת בין צבע, רגש וזיכרון. הציורים שלה מוצגים בגלריות ברחבי ארצות הברית ואירופה.'
    },
    statement: {
      en: 'My work is an exploration of the ephemeral nature of human emotion, captured through bold strokes and vibrant color palettes.',
      he: 'העבודה שלי היא חקירה של הטבע החולף של הרגש האנושי, הנתפס דרך משיכות נועזות ופלטות צבעים תוססות.'
    },
    featuredImage: elenaMorrison,
    artworks: [
      {
        id: 'whispers-of-dawn',
        title: {
          en: 'Whispers of Dawn',
          he: 'לחישות השחר'
        },
        description: {
          en: 'An abstract exploration of morning light breaking through darkness, painted with acrylic and gold leaf on canvas.',
          he: 'חקירה אבסטרקטית של אור הבוקר שפורץ דרך החושך, צוירה באקריליק ועלה זהב על קנבס.'
        },
        imageUrl: whispersOfDawn,
        year: 2023,
        medium: {
          en: 'Acrylic and gold leaf on canvas',
          he: 'אקריליק ועלה זהב על קנבס'
        },
        dimensions: '120 x 90 cm',
        price: '$3,200',
        isAvailable: true
      },
      {
        id: 'midnight-reverie',
        title: {
          en: 'Midnight Reverie',
          he: 'הזיה של חצות'
        },
        description: {
          en: 'A contemplative piece exploring the depths of nocturnal consciousness through layered brushstrokes.',
          he: 'יצירה מהורהרת החוקרת את עומקי התודעה הלילית דרך משיכות מכחול מרובדות.'
        },
        imageUrl: midnightReverie,
        year: 2023,
        medium: {
          en: 'Oil on canvas',
          he: 'שמן על קנבס'
        },
        dimensions: '100 x 80 cm',
        price: '$2,800',
        isAvailable: true
      }
    ]
  },
  {
    id: 'david-chen',
    name: {
      en: 'David Chen',
      he: 'דוד צ\'ן'
    },
    bio: {
      en: 'David Chen is a mixed-media artist who combines traditional techniques with modern digital elements. His work reflects themes of cultural identity and urban transformation.',
      he: 'דוד צ\'ן הוא אמן מדיה מעורבת המשלב טכניקות מסורתיות עם אלמנטים דיגיטליים מודרניים. עבודתו משקפת נושאים של זהות תרבותית ושינוי עירוני.'
    },
    statement: {
      en: 'I seek to bridge the gap between ancient wisdom and contemporary expression through my art.',
      he: 'אני מבקש לגשר על הפער בין חוכמה עתיקה והבעה עכשווית דרך האמנות שלי.'
    },
    featuredImage: davidChen,
    artworks: [
      {
        id: 'urban-fusion',
        title: {
          en: 'Urban Fusion',
          he: 'מיזוג עירוני'
        },
        description: {
          en: 'A mixed-media piece combining photography, painting, and digital manipulation to capture the essence of modern city life.',
          he: 'יצירת מדיה מעורבת המשלבת צילום, ציור ומניפולציה דיגיטלית כדי ללכוד את מהות החיים העירוניים המודרניים.'
        },
        imageUrl: urbanFusion,
        year: 2023,
        medium: {
          en: 'Mixed media on wood panel',
          he: 'מדיה מעורבת על פאנל עץ'
        },
        dimensions: '150 x 100 cm',
        price: '$4,500',
        isAvailable: false
      }
    ]
  },
  {
    id: 'sarah-goldberg',
    name: {
      en: 'Sarah Goldberg',
      he: 'שרה גולדברג'
    },
    bio: {
      en: 'Sarah Goldberg creates intimate sculptures that explore themes of memory, loss, and renewal. Working primarily in bronze and ceramic, her pieces invite contemplation and introspection.',
      he: 'שרה גולדברג יוצרת פסלים אינטימיים החוקרים נושאים של זיכרון, אובדן והתחדשות. עובדת בעיקר בברונזה וקרמיקה, יצירותיה מזמינות הרהור והתבוננות פנימה.'
    },
    statement: {
      en: 'Through sculpture, I give form to the formless emotions that shape our human experience.',
      he: 'דרך הפיסול, אני נותנת צורה לרגשות חסרי הצורה המעצבים את החוויה האנושית שלנו.'
    },
    featuredImage: sarahGoldberg,
    artworks: [
      {
        id: 'memory-vessel',
        title: {
          en: 'Memory Vessel',
          he: 'כלי הזיכרון'
        },
        description: {
          en: 'A ceramic sculpture that embodies the fragility and strength of human memory.',
          he: 'פסל קרמיקה המגלם את השבריריות והכוח של הזיכרון האנושי.'
        },
        imageUrl: memoryVessel,
        year: 2023,
        medium: {
          en: 'Ceramic and bronze',
          he: 'קרמיקה וברונזה'
        },
        dimensions: '45 x 30 x 30 cm',
        price: '$1,800',
        isAvailable: true
      }
    ]
  }
];
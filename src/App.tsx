import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── Interfaces ──────────────────────────────────────────────
interface MenuItem {
  id: string
  name: string
  description?: string
  price: number | string
  badge?: 'best-seller'
  emoji?: string
  image?: string
}

interface MenuSubsection {
  subtitle: string
  items: MenuItem[]
}

interface MenuSection {
  id: string
  title: string
  emoji: string
  subsections?: MenuSubsection[]
  items?: MenuItem[]
}

interface UpgradeRow {
  label: string
  oneScoop: string
  twoScoop: string
}

interface ToppingItem {
  name: string
  price: string
}

// ─── Data ────────────────────────────────────────────────────
// Replace these placeholder URLs with your own photos
const RECOMMENDED: MenuItem[] = [
  {
    id: 'rec1',
    name: 'กรีก 1 สกู๊ป + ผลไม้ 3 อย่าง',
    description: 'กล้วย · สตรอว์เบอร์รี่ · อะโวคาโด้',
    price: 89,
    badge: 'best-seller',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
  },
  {
    id: 'rec2',
    name: 'กรีก 1 สกู๊ป + อัลมอนด์ + เมล็ดฟักทอง',
    description: 'พร้อมเนยถั่วแท้',
    price: 99,
    badge: 'best-seller',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80',
  },
  {
    id: 'rec3',
    name: 'กรีกโอรีโอ้ 1 สกู๊ป + กล้วย',
    description: 'กรีกรสโอรีโอ้หอมๆ กับกล้วยสด',
    price: 79,
    badge: 'best-seller',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
  },
]

const IMG = {
  yogurtFruit:   'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
  yogurtNuts:    'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&q=80',
  yogurtOreo:    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
  strawberry:    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80',
  kiwi:          'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&q=80',
  mango:         'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
  banana:        'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80',
  blueberry:     'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80',
  granola:       'https://images.unsplash.com/photo-1517093728584-cc1cf4d3c1f8?w=400&q=80',
  yogurtPlain:   'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
  banoffee:      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
  chocolate:     'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80',
  avocado:       'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80',
  jar:           'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
}

const SECTIONS: MenuSection[] = [
  {
    id: 'fruit',
    title: 'ชุดผลไม้',
    emoji: '🍓',
    subsections: [
      {
        subtitle: 'ผลไม้ 3 อย่าง — 89 ฿',
        items: [
          { id: 'f3-1', name: 'สตรอว์เบอร์รี่ + บลูเบอร์รี่ + กีวี่', price: 89, image: IMG.strawberry },
          { id: 'f3-2', name: 'กีวี่ + สตรอว์เบอร์รี่ + อะโวคาโด้', price: 89, image: IMG.kiwi },
          { id: 'f3-3', name: 'กล้วย + สตรอว์เบอร์รี่ + อะโวคาโด้', price: 89, image: IMG.yogurtFruit },
          { id: 'f3-4', name: 'กล้วย + อะโวคาโด้ + มะม่วง', price: 89, image: IMG.mango },
          { id: 'f3-5', name: 'กล้วย + สตรอว์เบอร์รี่ + บลูเบอร์รี่', price: 89, image: IMG.blueberry },
          { id: 'f3-6', name: 'กล้วย + อะโวคาโด้ + มะม่วง', price: 89, image: IMG.banana },
          { id: 'f3-7', name: 'อ่อนชุน + ส้ม + สตรอว์เบอร์รี่', price: 89, image: IMG.strawberry },
        ],
      },
      {
        subtitle: 'ผลไม้ 2 อย่าง',
        items: [
          { id: 'f2-1', name: 'สตรอว์เบอร์รี่ + บลูเบอร์รี่', price: 89, image: IMG.blueberry },
          { id: 'f2-2', name: 'กล้วย + สตรอว์เบอร์รี่', price: 85, image: IMG.strawberry },
          { id: 'f2-3', name: 'กล้วย + มะม่วง', price: 79, image: IMG.mango },
        ],
      },
      {
        subtitle: 'ผลไม้ 1 อย่าง',
        items: [
          { id: 'f1-1', name: 'สตรอว์เบอร์รี่ล้วน', price: 89, image: IMG.strawberry },
          { id: 'f1-2', name: 'กีวี่ล้วน', price: 89, image: IMG.kiwi },
          { id: 'f1-3', name: 'มะม่วงล้วน', price: 79, image: IMG.mango },
          { id: 'f1-4', name: 'กล้วยล้วน', price: 69, image: IMG.banana },
        ],
      },
    ],
  },
  {
    id: 'plain',
    title: 'เมนูเปล่า',
    emoji: '🥣',
    subsections: [
      {
        subtitle: 'เมนูเปล่า',
        items: [
          { id: 'p1', name: 'กรีก 1 สกู๊ป (70g)', description: 'ฟรีกราโนล่า + น้ำผึ้ง', price: 59, image: IMG.yogurtPlain },
          { id: 'p2', name: 'กรีก 2 สกู๊ป (140g)', description: 'ฟรีกราโนล่า + น้ำผึ้ง', price: 95, image: IMG.granola },
          { id: 'p3', name: 'กรีกราโนล่า 1 สกู๊ป', price: 79, image: IMG.granola },
        ],
      },
      {
        subtitle: 'รสพิเศษ — 1 สกู๊ป (70g) ฟรีกราโนล่า + น้ำผึ้ง',
        items: [
          { id: 'sp1', name: 'กรีกโอรีโอ้', price: 69, image: IMG.yogurtOreo },
          { id: 'sp2', name: 'กรีกบิสคอฟ', price: 69, image: IMG.yogurtPlain },
          { id: 'sp3', name: 'กรีกอาชาอิ', price: 69, image: IMG.yogurtPlain },
          { id: 'sp4', name: 'กรีกสไปรูลิน่า', price: 69, image: IMG.yogurtPlain },
          { id: 'sp5', name: 'กรีกบิสคอฟ + บิสคอฟบด', price: 79, image: IMG.yogurtOreo },
        ],
      },
    ],
  },
  {
    id: 'banoffee',
    title: 'บานอฟฟี่ & พิเศษ',
    emoji: '🍌',
    items: [
      { id: 'b1', name: 'บานอฟฟี่กราโนล่า', price: 89, image: IMG.banoffee },
      { id: 'b2', name: 'บานอฟฟี่โอรีโอ้', price: 99, image: IMG.yogurtOreo },
      { id: 'b3', name: 'มินิบานอฟฟี่', price: 69, image: IMG.banoffee },
      { id: 'b4', name: 'ช็อกโกแลตไอเวอร์ไนท์โอ๊ต (M)', price: 119, image: IMG.chocolate },
      { id: 'b5', name: 'ช็อกโกแลตไอเวอร์ไนท์โอ๊ต (S)', price: 79, image: IMG.chocolate },
      { id: 'b6', name: 'สลัดอะโวคาโด้', price: 69, image: IMG.avocado },
    ],
  },
  {
    id: 'takeaway',
    title: 'ซื้อกลับบ้าน',
    emoji: '🛍',
    subsections: [
      {
        subtitle: 'กรีกล้วน',
        items: [
          { id: 't1', name: 'กรีกล้วน 250g', price: 189, image: IMG.jar },
          { id: 't2', name: 'กรีกล้วน 500g', price: 359, image: IMG.jar },
        ],
      },
      {
        subtitle: 'รสโอรีโอ้',
        items: [
          { id: 't3', name: 'กรีกโอรีโอ้ 250g', price: 209, image: IMG.yogurtOreo },
          { id: 't4', name: 'กรีกโอรีโอ้ 500g', price: 379, image: IMG.yogurtOreo },
        ],
      },
      {
        subtitle: 'รสพิเศษ (สไปรูลิน่า / อาชาอิ / บิสคอฟ)',
        items: [
          { id: 't5', name: '250g', price: 209, image: IMG.yogurtPlain },
          { id: 't6', name: '500g', price: 419, image: IMG.yogurtPlain },
        ],
      },
    ],
  },
]

const UPGRADE_ROWS: UpgradeRow[] = [
  { label: 'โอรีโอ้ / สไปรูลิน่า / อาชาอิ / บิสคอฟ', oneScoop: '+10 ฿', twoScoop: '+20 ฿' },
  { label: 'โอรีโอ้ + บิสคอฟ', oneScoop: '+15 ฿', twoScoop: '+30 ฿' },
]

const TOPPINGS: ToppingItem[] = [
  { name: 'น้ำผึ้ง 30ml', price: '+10' },
  { name: 'ซีเรียลรสน้ำผึ้ง 10g', price: '+10' },
  { name: 'คอนเฟลกรสน้ำผึ้ง 10g', price: '+10' },
  { name: 'โอรีโอ้บด', price: '+10' },
  { name: 'บิสคอฟ 1 ชิ้น', price: '+10' },
  { name: 'บิสคอฟบด', price: '+10' },
  { name: 'แยมสตรอว์เบอร์รี่ 10g', price: '+10' },
  { name: 'เมล็ดฟักทอง 10g', price: '+10' },
  { name: 'คาเคานิบส์ 5g', price: '+12' },
  { name: 'อัลมอนด์ 10g', price: '+15' },
  { name: 'กราโนล่า 20g', price: '+15' },
  { name: 'เนยถั่วแท้ 15g', price: '+15' },
  { name: 'เนยถั่วแท้ 20g', price: '+20' },
  { name: 'ช็อกโกแลตเฮเซลนัท 15g', price: '+20' },
  { name: 'เนยถั่วแท้ 25g', price: '+25' },
]

const TAB_LABELS: Record<string, string> = {
  recommended: '⭐ แนะนำ',
  fruit: '🍓 ชุดผลไม้',
  plain: '🥣 เมนูเปล่า',
  banoffee: '🍌 บานอฟฟี่',
  takeaway: '🛍 ซื้อกลับ',
  customize: '✨ ปรับแต่ง',
}

const ALL_SECTION_IDS = ['recommended', 'fruit', 'plain', 'banoffee', 'takeaway', 'customize']

// ─── Sub-components ──────────────────────────────────────────
function StickyHeader() {
  return (
    <header className="sticky-header">
      <div className="sticky-header__brand">🍶 Bowlance</div>
      <div className="sticky-header__tagline">กรีกโยเกิร์ตโฮมเมด · คุณภาพดี ทำสด</div>
    </header>
  )
}

interface NavTabsProps {
  activeTab: string
}

function NavTabs({ activeTab }: NavTabsProps) {
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    const el = tabRefs.current[activeTab]
    if (el) {
      el.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
    }
  }, [activeTab])

  return (
    <nav className="nav-tabs" aria-label="เมนูหมวดหมู่">
      <div className="nav-tabs__inner">
        {ALL_SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-tabs__item${activeTab === id ? ' active' : ''}`}
            ref={(el) => { tabRefs.current[id] = el }}
          >
            {TAB_LABELS[id]}
          </a>
        ))}
      </div>
    </nav>
  )
}

function YogurtBowl3D() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="yogurt-3d-svg"
      aria-label="กรีกโยเกิร์ตกับกราโนล่าและผลไม้"
      role="img"
    >
      <defs>
        <linearGradient id="bowlBodyGrad" x1="20%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2B882" />
          <stop offset="50%" stopColor="#C87840" />
          <stop offset="100%" stopColor="#7A3A10" />
        </linearGradient>
        <radialGradient id="rimGrad" cx="45%" cy="35%">
          <stop offset="0%" stopColor="#F8C898" />
          <stop offset="65%" stopColor="#D08848" />
          <stop offset="100%" stopColor="#A86020" />
        </radialGradient>
        <radialGradient id="yogurtGrad" cx="42%" cy="38%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F8F4EE" />
          <stop offset="100%" stopColor="#E4DDD0" />
        </radialGradient>
        <radialGradient id="blueberryGrad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#9B72F0" />
          <stop offset="100%" stopColor="#2D1060" />
        </radialGradient>
        <radialGradient id="strawberryGrad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#CC2020" />
        </radialGradient>
        <filter id="bowlShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="rgba(80,30,0,0.35)" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="100" cy="187" rx="58" ry="8" fill="rgba(0,0,0,0.18)" />

      {/* Bowl body */}
      <path
        d="M 27,83 C 24,130 46,176 100,178 C 154,176 176,130 173,83 Z"
        fill="url(#bowlBodyGrad)"
        filter="url(#bowlShadow)"
      />
      {/* Left wall highlight */}
      <path
        d="M 27,83 C 24,130 46,176 100,178 C 62,174 40,132 37,83 Z"
        fill="rgba(255,255,255,0.14)"
      />
      {/* Inner bowl depth shadow */}
      <path
        d="M 40,83 C 38,120 54,164 100,166 C 146,164 162,120 160,83 Z"
        fill="rgba(0,0,0,0.10)"
      />
      {/* Base foot highlight */}
      <ellipse cx="100" cy="174" rx="26" ry="5" fill="rgba(255,255,255,0.10)" />

      {/* Rim — back ring (darker) */}
      <ellipse cx="100" cy="83" rx="73" ry="24" fill="#8B4818" />
      {/* Rim — top face */}
      <ellipse cx="100" cy="83" rx="73" ry="24" fill="url(#rimGrad)" />
      {/* Rim front-edge inner shadow */}
      <ellipse cx="100" cy="87" rx="73" ry="17" fill="rgba(0,0,0,0.14)" />
      {/* Rim sheen */}
      <ellipse cx="76" cy="77" rx="19" ry="5.5" fill="rgba(255,255,255,0.28)" />

      {/* Yogurt surface */}
      <ellipse cx="100" cy="83" rx="61" ry="17" fill="url(#yogurtGrad)" />
      {/* Yogurt specular highlight */}
      <ellipse cx="87" cy="78" rx="22" ry="6.5" fill="rgba(255,255,255,0.60)" />

      {/* ── Granola clusters ── */}
      <ellipse cx="84" cy="81" rx="6" ry="3.2" fill="#C8A055" transform="rotate(-25,84,81)" />
      <ellipse cx="80" cy="88" rx="4.5" ry="2.5" fill="#B89040" transform="rotate(12,80,88)" />
      <ellipse cx="94" cy="75" rx="5" ry="2.8" fill="#D4B060" transform="rotate(22,94,75)" />
      <ellipse cx="104" cy="89" rx="5.5" ry="2.8" fill="#C8A055" transform="rotate(-12,104,89)" />
      <ellipse cx="113" cy="81" rx="5.5" ry="3" fill="#B89040" transform="rotate(32,113,81)" />
      <ellipse cx="116" cy="88" rx="3.8" ry="2.2" fill="#D4B060" transform="rotate(-8,116,88)" />
      <ellipse cx="97" cy="91" rx="4.5" ry="2.2" fill="#C09050" transform="rotate(6,97,91)" />
      {/* granola crumbs */}
      <circle cx="108" cy="74" r="2.2" fill="#C8A055" />
      <circle cx="86" cy="91" r="2" fill="#B89040" />
      <circle cx="101" cy="76" r="1.8" fill="#D4AA60" />

      {/* ── Honey drizzle ── */}
      <path
        d="M 87,78 Q 96,71 104,77 Q 112,83 120,76"
        stroke="#F4A820" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.92"
      />
      <path
        d="M 91,87 Q 101,81 111,87"
        stroke="#F4A820" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.80"
      />
      {/* honey pool */}
      <ellipse cx="117" cy="76" rx="3" ry="2" fill="#F4A820" opacity="0.6" />

      {/* ── Strawberry slice ── */}
      <g transform="rotate(-18, 71, 81)">
        <ellipse cx="71" cy="81" rx="8.5" ry="6.5" fill="url(#strawberryGrad)" />
        {/* stem */}
        <path d="M 69,74.5 L 71,71 L 73,74.5" fill="#55BB50" />
        {/* seeds */}
        <ellipse cx="69.5" cy="80" rx="1" ry="1.2" fill="#FFD0C0" />
        <ellipse cx="72.5" cy="78" rx="1" ry="1.2" fill="#FFD0C0" />
        <ellipse cx="75"   cy="81" rx="1" ry="1.2" fill="#FFD0C0" />
        <ellipse cx="70.5" cy="83.5" rx="1" ry="1.1" fill="#FFD0C0" />
        {/* highlight */}
        <ellipse cx="68.5" cy="78" rx="3" ry="2" fill="rgba(255,255,255,0.25)" />
      </g>

      {/* ── Blueberry ── */}
      <circle cx="125" cy="77" r="6" fill="url(#blueberryGrad)" />
      {/* blossom end */}
      <path d="M 122,72 L 125,75 L 128,72" stroke="rgba(60,20,100,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* specular */}
      <circle cx="123" cy="75" r="2" fill="rgba(255,255,255,0.42)" />

      {/* ── Kiwi slice ── */}
      <circle cx="127" cy="88" r="7" fill="#4D8B31" />
      <circle cx="127" cy="88" r="5.5" fill="#88C057" />
      <circle cx="127" cy="88" r="3.5" fill="#C8E08A" />
      <circle cx="127" cy="88" r="1.5" fill="#FFFBE0" />
      {/* kiwi seeds */}
      {[0,51,103,154,206,257,309].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x = 127 + 4.2 * Math.cos(rad)
        const y = 88 + 4.2 * Math.sin(rad)
        return (
          <ellipse
            key={i}
            cx={x} cy={y}
            rx="1" ry="1.6"
            fill="#3A2010"
            transform={`rotate(${deg}, ${x}, ${y})`}
          />
        )
      })}
    </svg>
  )
}

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero__brand">Bowlance</div>
      <div className="hero__sub">กรีกโยเกิร์ตโฮมเมด · คุณภาพดี ทำสดทุกวัน</div>
      <YogurtBowl3D />
      <div className="hero__hours">🕙 เปิดทำการ 10:30 – 22:00 น.</div>
      <div className="hero__chips">
        <span className="contact-chip">📘 Facebook: Bowlance</span>
        <span className="contact-chip">💬 Line: @216zyftg</span>
        <span className="contact-chip">✉️ Messenger: Bowlance</span>
      </div>
    </div>
  )
}

interface BestSellerCardProps {
  item: MenuItem
}

function BestSellerCard({ item }: BestSellerCardProps) {
  return (
    <div className="bestseller-card">
      {item.image && (
        <div className="bestseller-card__img-wrap">
          <img src={item.image} alt={item.name} className="bestseller-card__img" loading="lazy" />
          <span className="bestseller-card__badge">🏆 Best Seller</span>
        </div>
      )}
      {!item.image && <span className="bestseller-card__badge bestseller-card__badge--top">🏆 Best Seller</span>}
      <div className="bestseller-card__body">
        <div className="bestseller-card__name">{item.name}</div>
        {item.description && (
          <div className="bestseller-card__desc">{item.description}</div>
        )}
        <div className="bestseller-card__price">{item.price} ฿</div>
      </div>
    </div>
  )
}

interface MenuCardProps {
  item: MenuItem
}

function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="menu-card">
      {item.image && (
        <img src={item.image} alt={item.name} className="menu-card__thumb" loading="lazy" />
      )}
      <div className="menu-card__left">
        <div className="menu-card__name">{item.name}</div>
        {item.description && (
          <div className="menu-card__desc">{item.description}</div>
        )}
      </div>
      <div className="menu-card__price">{item.price} ฿</div>
    </div>
  )
}

interface SectionBlockProps {
  section: MenuSection
}

function SectionBlock({ section }: SectionBlockProps) {
  return (
    <section id={section.id} className="section-block">
      <h2 className="section-block__title">
        {section.emoji} {section.title}
      </h2>
      {section.items?.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
      {section.subsections?.map((sub) => (
        <div key={sub.subtitle}>
          <div className="subsection-title">{sub.subtitle}</div>
          {sub.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ))}
    </section>
  )
}

function CustomizeSection() {
  return (
    <section id="customize" className="customize-section">
      <h2 className="customize-section__title">✨ ปรับแต่ง</h2>

      <div className="toppings-title">🔄 เปลี่ยนรสชาติ</div>
      <div className="upgrade-table-wrap">
        <table className="upgrade-table">
          <thead>
            <tr>
              <th>รส</th>
              <th>1 สกู๊ป</th>
              <th>2 สกู๊ป</th>
            </tr>
          </thead>
          <tbody>
            {UPGRADE_ROWS.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.oneScoop}</td>
                <td>{row.twoScoop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="toppings-title">➕ เพิ่มท็อปปิ้ง</div>
      <div className="toppings-grid">
        {TOPPINGS.map((t) => (
          <span key={t.name} className="topping-chip">
            {t.name} <span className="topping-chip__price">{t.price} ฿</span>
          </span>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">🍶 Bowlance</div>
      <div className="footer__contacts">
        <span className="footer__chip">📘 Facebook: Bowlance</span>
        <span className="footer__chip">💬 Line: @216zyftg</span>
        <span className="footer__chip">✉️ Messenger: Bowlance</span>
      </div>
      <div className="footer__hours">🕙 เปิดทำการ 10:30 – 22:00 น. ทุกวัน</div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('recommended')

  useEffect(() => {
    const sectionEls = document.querySelectorAll<HTMLElement>('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
            break
          }
        }
      },
      { threshold: 0.3 }
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-wrapper">
      <StickyHeader />
      <NavTabs activeTab={activeTab} />
      <main>
        <HeroSection />

        <section id="recommended" className="section-block">
          <h2 className="section-block__title">⭐ เมนูแนะนำ</h2>
          {RECOMMENDED.map((item) => (
            <BestSellerCard key={item.id} item={item} />
          ))}
        </section>

        <div className="section-divider" />

        {SECTIONS.map((section, i) => (
          <div key={section.id}>
            <SectionBlock section={section} />
            {i < SECTIONS.length - 1 && <div className="section-divider" />}
          </div>
        ))}

        <div className="section-divider" />
        <CustomizeSection />
      </main>
      <Footer />
    </div>
  )
}

export default App

import { useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Quote,
  Star,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
]

const featuredDishes = [
  {
    title: 'Royal Green Curry',
    price: '$24',
    image: '/images/dish-curry.jpg',
    tag: 'Signature',
    description: 'Silky coconut curry with Thai basil, charred aubergine, and jasmine rice.',
  },
  {
    title: 'Midnight Pad Thai',
    price: '$22',
    image: '/images/dish-noodles.jpg',
    tag: 'Popular',
    description: 'Wok-fired rice noodles, tamarind glaze, tiger prawn, and crushed peanuts.',
  },
  {
    title: 'Golden Mango Cloud',
    price: '$16',
    image: '/images/dish-dessert.jpg',
    tag: 'Dessert',
    description: 'Refined mango sticky rice with pandan cream and toasted sesame crumble.',
  },
]

const menuCategories = {
  Starters: [
    { name: 'Lemongrass Satay', detail: 'Chicken, peanut glaze, cucumber relish', price: '$14' },
    { name: 'Lotus Crisp Rolls', detail: 'Vegetable spring rolls, tamarind dip', price: '$12' },
    { name: 'Tom Yum Essence', detail: 'Hot and sour broth, prawns, herbs', price: '$15' },
  ],
  Mains: [
    { name: 'Panang Reserve', detail: 'Slow-braised beef cheek, kaffir lime', price: '$29' },
    { name: 'Bangkok Sea Bass', detail: 'Crisp fillet, green mango salad', price: '$31' },
    { name: 'Jungle Fire Rice', detail: 'Charred vegetables, holy basil, chili', price: '$21' },
  ],
  Desserts: [
    { name: 'Coconut Silk', detail: 'Young coconut mousse, palm sugar caramel', price: '$13' },
    { name: 'Thai Tea Opera', detail: 'Layered sponge, condensed milk cream', price: '$14' },
    { name: 'Pandan Mist', detail: 'Pandan custard, tropical fruit pearls', price: '$12' },
  ],
} as const

const slides = [
  {
    title: 'Chef\'s Tasting Journey',
    subtitle: 'Seven curated courses inspired by Bangkok night markets and royal Thai kitchens.',
    image: '/images/dish-curry.jpg',
  },
  {
    title: 'Wok-Fired Craft',
    subtitle: 'Balanced heat, fragrant herbs, and elevated plating in every signature plate.',
    image: '/images/dish-noodles.jpg',
  },
  {
    title: 'Dessert with Ceremony',
    subtitle: 'A graceful finish with tropical sweetness, texture, and golden detail.',
    image: '/images/dish-dessert.jpg',
  },
]

const galleryImages = [
  '/images/hero-thai.jpg',
  '/images/interior.jpg',
  '/images/dish-curry.jpg',
  '/images/dish-noodles.jpg',
  '/images/dish-dessert.jpg',
]

const testimonials = [
  {
    name: 'Amelia Chen',
    role: 'Food Editor',
    quote: 'An exquisite balance of restraint and richness. Every course feels ceremonial and deeply considered.',
  },
  {
    name: 'Daniel Mercer',
    role: 'Hotel Concierge',
    quote: 'Our most requested dining recommendation for guests seeking elevated Thai cuisine in a luxurious setting.',
  },
  {
    name: 'Sofia Alvarez',
    role: 'Private Events Client',
    quote: 'From the welcome tea to dessert, the service and atmosphere were polished, warm, and unforgettable.',
  },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<keyof typeof menuCategories>('Mains')
  const [slideIndex, setSlideIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.18 },
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const activeMenu = useMemo(() => menuCategories[activeCategory], [activeCategory])

  const scrollToId = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--brown-900)]">
      <div className="pointer-events-none fixed inset-0 opacity-50">
        <div className="thai-pattern h-full w-full" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[rgba(107,78,52,0.12)] bg-[rgba(248,244,236,0.88)] shadow-[0_18px_50px_rgba(58,42,28,0.08)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <button
            onClick={() => scrollToId('#home')}
            className="group flex items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(201,153,85,0.45)] bg-[rgba(201,153,85,0.12)] text-[var(--gold)] shadow-[0_8px_24px_rgba(201,153,85,0.18)] transition-transform duration-300 group-hover:scale-105">
              ✦
            </div>
            <div>
              <p className="font-serif text-xl tracking-[0.2em] text-[var(--brown-900)]">Saffron Thai</p>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--sage-700)]">Bangkok inspired dining</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToId(item.href)}
                className="text-sm font-medium tracking-[0.18em] text-[var(--brown-800)] transition duration-300 hover:text-[var(--orange)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollToId('#reservation')}
              className="rounded-full bg-[var(--brown-900)] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--cream)] shadow-[0_16px_35px_rgba(58,42,28,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--orange)]"
            >
              Reserve Table
            </button>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(107,78,52,0.15)] bg-white/75 text-[var(--brown-900)] shadow-[0_10px_24px_rgba(58,42,28,0.08)] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[rgba(107,78,52,0.12)] bg-[rgba(248,244,236,0.96)] px-5 py-5 shadow-[0_20px_40px_rgba(58,42,28,0.08)] backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToId(item.href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium tracking-[0.16em] text-[var(--brown-800)] transition hover:bg-white"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToId('#reservation')}
                className="mt-2 rounded-full bg-[var(--brown-900)] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--cream)]"
              >
                Reserve Table
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative">
        <section id="home" className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-32 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pt-36">
          <div className="reveal space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,153,85,0.35)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--gold)] shadow-[0_10px_30px_rgba(201,153,85,0.12)] backdrop-blur">
              <Star size={14} className="fill-current" />
              Thai fine dining reimagined
            </div>
            <div className="space-y-5">
              <h1 className="font-serif text-5xl leading-[1.02] text-[var(--brown-900)] md:text-6xl xl:text-7xl">
                A refined taste of Thailand in a quietly luxurious setting.
              </h1>
              <p className="max-w-xl text-base leading-8 text-[var(--brown-700)] md:text-lg">
                Inspired by royal Thai recipes, modern Bangkok plating, and warm ceremonial hospitality,
                Saffron Thai offers a richly layered dining experience with subtle elegance in every detail.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollToId('#reservation')}
                className="rounded-full bg-[var(--orange)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_35px_rgba(183,104,52,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--brown-900)]"
              >
                Book your evening
              </button>
              <button
                onClick={() => scrollToId('#menu')}
                className="rounded-full border border-[rgba(107,78,52,0.18)] bg-white/80 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brown-900)] shadow-[0_12px_26px_rgba(58,42,28,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[var(--gold)] hover:text-[var(--orange)]"
              >
                Explore menu
              </button>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-4 pt-3">
              {[
                ['12+', 'Signature dishes'],
                ['4.9', 'Guest rating'],
                ['7 days', 'Open weekly'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_35px_rgba(58,42,28,0.06)] backdrop-blur">
                  <p className="font-serif text-3xl text-[var(--brown-900)]">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--brown-700)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-[rgba(140,162,141,0.18)] blur-3xl md:block" />
            <div className="absolute -right-4 bottom-10 hidden h-36 w-36 rounded-full bg-[rgba(201,153,85,0.18)] blur-3xl md:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-3 shadow-[0_30px_80px_rgba(58,42,28,0.12)] backdrop-blur-xl">
              <img
                src="/images/hero-thai.jpg"
                alt="Luxury Thai cuisine"
                className="h-[560px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute inset-x-8 bottom-8 rounded-[1.75rem] border border-white/60 bg-[rgba(58,42,28,0.74)] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-light)]">Tonight\'s spotlight</p>
                    <p className="mt-2 font-serif text-2xl">Chef\'s Heritage Tasting</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-4 py-2 text-sm tracking-[0.18em] text-[var(--gold-light)]">
                    7 Courses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <div className="reveal mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Featured dishes</p>
              <h2 className="section-title">Signature plates crafted with balance, fragrance, and fire.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--brown-700)] md:text-base">
              A concise collection of guest favorites designed with premium ingredients, elegant restraint,
              and contemporary Thai presentation.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredDishes.map((dish, index) => (
              <article
                key={dish.title}
                className="reveal group overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_20px_45px_rgba(58,42,28,0.07)] backdrop-blur"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[rgba(140,162,141,0.16)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sage-700)]">
                      {dish.tag}
                    </span>
                    <span className="font-serif text-2xl text-[var(--orange)]">{dish.price}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[var(--brown-900)]">{dish.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--brown-700)]">{dish.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="menu" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="reveal rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(245,237,224,0.9))] p-7 shadow-[0_20px_50px_rgba(58,42,28,0.08)]">
            <p className="section-kicker">Interactive menu</p>
            <h2 className="section-title max-w-md">A curated menu guided by seasonality and Thai tradition.</h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {(Object.keys(menuCategories) as Array<keyof typeof menuCategories>).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                    activeCategory === category
                      ? 'bg-[var(--brown-900)] text-[var(--cream)] shadow-[0_12px_28px_rgba(58,42,28,0.16)]'
                      : 'bg-white text-[var(--brown-800)] hover:bg-[rgba(140,162,141,0.15)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {activeMenu.map((item) => (
                <div
                  key={item.name}
                  className="rounded-[1.5rem] border border-[rgba(107,78,52,0.08)] bg-white/85 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(58,42,28,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-[var(--brown-900)]">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--brown-700)]">{item.detail}</p>
                    </div>
                    <span className="font-serif text-xl text-[var(--orange)]">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_20px_50px_rgba(58,42,28,0.08)] backdrop-blur">
            <div className="relative h-full min-h-[560px] overflow-hidden rounded-[1.6rem] bg-[var(--brown-900)] text-white">
              {slides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`absolute inset-0 grid h-full transition-all duration-700 md:grid-cols-[1.05fr_0.95fr] ${
                    index === slideIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                >
                  <div className="flex flex-col justify-between p-8 md:p-10">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-light)]">Menu spotlight</p>
                      <h3 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">{slide.title}</h3>
                      <p className="mt-5 max-w-md text-sm leading-8 text-white/78 md:text-base">{slide.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
                        aria-label="Next slide"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="reveal overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_20px_50px_rgba(58,42,28,0.08)]">
            <img src="/images/interior.jpg" alt="Restaurant interior" className="h-full min-h-[520px] w-full rounded-[1.5rem] object-cover" />
          </div>
          <div className="reveal flex flex-col justify-center rounded-[2rem] border border-white/70 bg-[rgba(255,255,255,0.74)] p-8 shadow-[0_20px_50px_rgba(58,42,28,0.08)] backdrop-blur">
            <p className="section-kicker">About the restaurant</p>
            <h2 className="section-title">Ceremonial hospitality, contemporary design, and deeply rooted Thai flavor.</h2>
            <p className="mt-6 text-sm leading-8 text-[var(--brown-700)] md:text-base">
              Our dining room pairs soft sage tones, gold detailing, and handcrafted textures with a menu that
              honors the complexity of Thai cuisine. Each plate is composed with precision, but served with the
              warmth of a family table.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: <Flame size={18} />, title: 'Open-fire technique', text: 'Layered wok aromatics and charcoal finishing.' },
                { icon: <Clock3 size={18} />, title: 'Evening tasting', text: 'Refined multi-course dining from 5:30 PM nightly.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] bg-[rgba(140,162,141,0.12)] p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--orange)] shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl text-[var(--brown-900)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--brown-700)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <div className="reveal grid gap-8 rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(58,42,28,0.96),rgba(96,69,47,0.92))] p-6 text-white shadow-[0_24px_60px_rgba(58,42,28,0.16)] md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10">
              <img src="/images/chef.jpg" alt="Chef portrait" className="h-full min-h-[420px] w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="section-kicker !text-[var(--gold-light)]">Chef recommendation</p>
              <h2 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">A tasting menu designed as a modern Thai story.</h2>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                Executive Chef Anon Rattanakosin layers northern herbs, central Thai sauces, and refined plating
                techniques into a seasonal tasting experience that feels both transportive and intimate.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm uppercase tracking-[0.18em] text-[var(--gold-light)]">
                  15 years experience
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm uppercase tracking-[0.18em] text-[var(--gold-light)]">
                  Seasonal chef\'s table
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reservation" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10">
          <div className="reveal rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_20px_50px_rgba(58,42,28,0.08)] backdrop-blur">
            <p className="section-kicker">Reservation</p>
            <h2 className="section-title max-w-lg">Reserve a table for an intimate dinner, celebration, or tasting menu.</h2>
            <form className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                { label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { label: 'Email', type: 'email', placeholder: 'name@example.com' },
                { label: 'Date', type: 'date', placeholder: '' },
                { label: 'Guests', type: 'number', placeholder: '2' },
              ].map((field) => (
                <label key={field.label} className="flex flex-col gap-2 text-sm font-medium text-[var(--brown-800)]">
                  {field.label}
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="rounded-2xl border border-[rgba(107,78,52,0.12)] bg-[rgba(255,255,255,0.95)] px-4 py-3.5 text-[var(--brown-900)] outline-none transition placeholder:text-[var(--brown-500)] focus:border-[var(--gold)] focus:shadow-[0_0_0_4px_rgba(201,153,85,0.14)]"
                  />
                </label>
              ))}
              <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-[var(--brown-800)]">
                Special Request
                <textarea
                  rows={5}
                  placeholder="Anniversary seating, tasting menu, dietary notes..."
                  className="rounded-2xl border border-[rgba(107,78,52,0.12)] bg-[rgba(255,255,255,0.95)] px-4 py-3.5 text-[var(--brown-900)] outline-none transition placeholder:text-[var(--brown-500)] focus:border-[var(--gold)] focus:shadow-[0_0_0_4px_rgba(201,153,85,0.14)]"
                />
              </label>
              <div className="md:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-7 text-[var(--brown-700)]">Private dining and group reservations available upon request.</p>
                <button
                  type="button"
                  className="rounded-full bg-[var(--brown-900)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cream)] shadow-[0_18px_35px_rgba(58,42,28,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--orange)]"
                >
                  Confirm booking
                </button>
              </div>
            </form>
          </div>

          <div id="gallery" className="reveal rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(245,237,224,0.92))] p-5 shadow-[0_20px_50px_rgba(58,42,28,0.08)]">
            <div className="flex items-center justify-between gap-4 px-2 pb-4">
              <div>
                <p className="section-kicker">Gallery slider</p>
                <h2 className="font-serif text-3xl text-[var(--brown-900)]">Atmosphere & plating</h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(107,78,52,0.12)] bg-white text-[var(--brown-900)] transition hover:bg-[rgba(140,162,141,0.15)]"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(107,78,52,0.12)] bg-white text-[var(--brown-900)] transition hover:bg-[rgba(140,162,141,0.15)]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
                src={galleryImages[galleryIndex]}
                alt="Restaurant gallery"
                className="h-[520px] w-full object-cover transition duration-700"
              />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setGalleryIndex(index)}
                  className={`h-2.5 rounded-full transition ${index === galleryIndex ? 'w-10 bg-[var(--orange)]' : 'w-2.5 bg-[rgba(107,78,52,0.2)]'}`}
                  aria-label={`Go to gallery image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <div className="reveal mb-8 text-center">
            <p className="section-kicker justify-center">Testimonials</p>
            <h2 className="section-title mx-auto max-w-3xl text-center">Loved for its atmosphere, detail, and unforgettable depth of flavor.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="reveal rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-[0_20px_45px_rgba(58,42,28,0.07)] backdrop-blur"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <Quote className="text-[var(--gold)]" size={28} />
                <p className="mt-5 text-sm leading-8 text-[var(--brown-700)] md:text-base">{testimonial.quote}</p>
                <div className="mt-6 border-t border-[rgba(107,78,52,0.08)] pt-5">
                  <h3 className="font-serif text-2xl text-[var(--brown-900)]">{testimonial.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[var(--sage-700)]">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="reveal rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(140,162,141,0.18),rgba(255,255,255,0.9))] p-8 shadow-[0_20px_50px_rgba(58,42,28,0.08)]">
            <p className="section-kicker">Location & contact</p>
            <h2 className="section-title">Visit us for candlelit dinners, special occasions, and curated tasting nights.</h2>
            <div className="mt-8 space-y-5 text-sm leading-7 text-[var(--brown-700)] md:text-base">
              <div className="flex gap-4">
                <MapPin className="mt-1 text-[var(--orange)]" size={18} />
                <p>18 Saffron Court, Riverside Quarter, Bangkok District, London W2 4TH</p>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 text-[var(--orange)]" size={18} />
                <p>+44 (0)20 5555 0188</p>
              </div>
              <div className="flex gap-4">
                <Clock3 className="mt-1 text-[var(--orange)]" size={18} />
                <p>Mon–Sun · 5:30 PM – 11:00 PM</p>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="https://instagram.com" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--brown-900)] shadow-sm transition hover:-translate-y-0.5 hover:text-[var(--orange)]">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          <div className="reveal overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_20px_50px_rgba(58,42,28,0.08)]">
            <div className="grid h-full min-h-[420px] place-items-center bg-[radial-gradient(circle_at_top,rgba(201,153,85,0.18),transparent_40%),linear-gradient(135deg,rgba(58,42,28,0.96),rgba(96,69,47,0.92))] p-8 text-center text-white">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold-light)]">Private dining & events</p>
                <h3 className="mt-4 font-serif text-4xl leading-tight">Host elegant celebrations with Thai warmth and contemporary luxury.</h3>
                <p className="mt-5 text-sm leading-8 text-white/78 md:text-base">
                  From intimate anniversaries to stylish corporate dinners, our team curates bespoke menus and polished service for memorable evenings.
                </p>
                <button
                  onClick={() => scrollToId('#reservation')}
                  className="mt-8 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brown-900)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--gold-light)]"
                >
                  Plan an event
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mt-10 border-t border-[rgba(107,78,52,0.08)] bg-[rgba(58,42,28,0.98)] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-[1fr_auto_auto] lg:px-10">
          <div>
            <p className="font-serif text-3xl">Saffron Thai</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
              Luxury Thai dining shaped by heritage recipes, refined interiors, and contemporary hospitality.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-light)]">Navigate</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => scrollToId(item.href)} className="text-left transition hover:text-white">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold-light)]">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <p>reservations@saffronthai.com</p>
              <p>+44 (0)20 5555 0188</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

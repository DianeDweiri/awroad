'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { key: 'home',      href: '/' },
  { key: 'about',     href: '/about' },
  { key: 'network',   href: '/roads-network' },
  { key: 'news',      href: '/news' },
  { key: 'insights',  href: '/insights' },
  { key: 'contact',   href: '/contact' },
];

const navLabels: Record<string, { en: string; ar: string }> = {
  home:      { en: 'Home',          ar: 'الرئيسية'    },
  about:     { en: 'About',         ar: 'عن المكتب'   },
  network:   { en: 'ROADs Network', ar: 'شبكة الرواد' },
  news:      { en: 'News',          ar: 'الأخبار'     },
  insights:  { en: 'Insights',      ar: 'مقالات'      },
  contact:   { en: 'Contact',       ar: 'اتصل بنا'    },
};

export default function Header() {
  const pathname  = usePathname();
  const locale    = pathname.startsWith('/ar') ? 'ar' : 'en';
  const isRtl     = locale === 'ar';
  const other     = isRtl ? 'en' : 'ar';
  const [open,     setOpen]     = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const localePath = (href: string) => `/${locale}${href}`;
  const switchPath = () => {
    const segs = pathname.split('/');
    segs[1] = other;
    return segs.join('/') || `/${other}`;
  };
  const isActive = (href: string) => {
    const full = localePath(href);
    return href === '/' ? pathname === full : pathname.startsWith(full);
  };

  return (
    <>
      <header
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: 'all 0.35s ease',
          background: scrolled ? 'rgba(6,8,15,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(79,126,255,0.25)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 32px rgba(6,8,15,0.6), 0 1px 0 rgba(79,126,255,0.1)'
            : 'none',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 28px',
          height: 82,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo + Title ── */}
          <Link href={localePath('/')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>

            {/* White glowing pill with both logos */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.97)',
              borderRadius: 14,
              padding: '7px 14px',
              boxShadow: '0 0 28px rgba(79,126,255,0.45), 0 0 60px rgba(79,126,255,0.15)',
            }}>
              <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
                <Image src="/ROAD.png.png" alt="AW-ROAD Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ width: 1, height: 38, background: 'rgba(0,0,0,0.12)' }} />
              <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
                <Image src="/IAU_logo.svg" alt="IAU Logo" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>

            {/* Titles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: '0.08em',
                background: 'linear-gradient(135deg, #ffffff 0%, #A78BFA 60%, #4F7EFF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 12px rgba(167,139,250,0.6))',
              }}>AW-ROAD</span>
              <span style={{
                fontSize: 10.5,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.02em',
                background: 'linear-gradient(90deg, #C8A84B, #EEE0A0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 6px rgba(200,168,75,0.5))',
              }}>Arab World Regional Office of Astronomy for Development</span>
              <span style={{
                fontSize: 10.5,
                fontFamily: 'Cairo, sans-serif',
                background: 'linear-gradient(90deg, #C8A84B, #EEE0A0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 6px rgba(200,168,75,0.5))',
              }}>المكتب الإقليمي للعالم العربي للفلك من أجل التنمية</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(({ key, href }) => {
              const active   = isActive(href);
              const hovering = hovered === key;
              return key === 'home' ? (
                  <div key={key}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => { setHovered(key); setHomeOpen(true); }}
                    onMouseLeave={() => { setHovered(null); setHomeOpen(false); }}
                  >
                    <Link
                      href={localePath(href)}
                      style={{
                        position: 'relative',
                        display: 'block',
                        padding: '7px 14px',
                        borderRadius: 8,
                        fontSize: 13.5,
                        fontWeight: active ? 600 : 400,
                        textDecoration: 'none',
                        color: active ? '#A78BFA' : homeOpen ? '#ffffff' : '#6B7A9F',
                        background: active ? 'rgba(79,126,255,0.12)' : homeOpen ? 'rgba(79,126,255,0.09)' : 'transparent',
                        boxShadow: homeOpen ? '0 0 20px rgba(79,126,255,0.25)' : 'none',
                        textShadow: homeOpen ? '0 0 12px rgba(167,139,250,0.8)' : 'none',
                        transition: 'all 0.2s ease',
                        fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                        cursor: 'pointer',
                      }}
                    >
                      {navLabels[key][locale]}
                      {active && <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #4F7EFF, #A78BFA)', boxShadow: '0 0 12px rgba(79,126,255,0.9)' }} />}
                    </Link>
                    {homeOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        minWidth: 210,
                        background: 'rgba(6,8,15,0.97)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(79,126,255,0.18)',
                        borderRadius: 12,
                        padding: '8px',
                        paddingTop: 16,

                        boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(79,126,255,0.1)',
                        zIndex: 200,
                      }}>
                        {[
                          { id: 'opening-speech',   en: 'Opening Speech',   ar: 'كلمة الافتتاح'   },
                          { id: 'opening-ceremony', en: 'Opening Ceremony', ar: 'حفل الافتتاح'     },
                          { id: 'awroad-role',      en: 'AW-ROAD Role',     ar: 'دور المكتب'       },
                        ].map(item => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={e => {
                              e.preventDefault();
                              setHomeOpen(false);
                              if (pathname === localePath('/') || pathname === `/${locale}`) {
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                window.location.href = `${localePath('/')}#${item.id}`;
                              }
                            }}
                            style={{
                              display: 'block',
                              padding: '9px 14px',
                              borderRadius: 8,
                              fontSize: 13,
                              textDecoration: 'none',
                              color: '#9CA3AF',
                              fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.color = '#A78BFA';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(79,126,255,0.08)';
                              (e.currentTarget as HTMLElement).style.textShadow = '0 0 10px rgba(167,139,250,0.6)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.color = '#9CA3AF';
                              (e.currentTarget as HTMLElement).style.background = 'transparent';
                              (e.currentTarget as HTMLElement).style.textShadow = 'none';
                            }}
                          >
                            {isRtl ? item.ar : item.en}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                <Link
                  key={key}
                  href={localePath(href)}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: 'relative',
                    padding: '7px 14px',
                    borderRadius: 8,
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 400,
                    textDecoration: 'none',
                    color: active ? '#A78BFA' : hovering ? '#ffffff' : '#6B7A9F',
                    background: active ? 'rgba(79,126,255,0.12)' : hovering ? 'rgba(79,126,255,0.09)' : 'transparent',
                    boxShadow: hovering ? '0 0 20px rgba(79,126,255,0.25), inset 0 0 12px rgba(79,126,255,0.08)' : 'none',
                    textShadow: hovering ? '0 0 12px rgba(167,139,250,0.8)' : 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  }}
                >
                  {navLabels[key][locale]}
                  {active && <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #4F7EFF, #A78BFA)', boxShadow: '0 0 12px rgba(79,126,255,0.9)' }} />}
                  {hovering && !active && <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 14, height: 2, borderRadius: 2, background: 'rgba(167,139,250,0.6)', boxShadow: '0 0 8px rgba(167,139,250,0.5)' }} />}
                </Link>
                )
            })}

            {/* Lang toggle */}
            <Link
              href={switchPath()}
              onMouseEnter={() => setHovered('lang')}
              onMouseLeave={() => setHovered(null)}
              style={{
                marginInlineStart: 16,
                padding: '7px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(200,168,75,0.5)',
                color: '#C8A84B',
                background: hovered === 'lang' ? 'rgba(200,168,75,0.18)' : 'rgba(200,168,75,0.07)',
                boxShadow: hovered === 'lang' ? '0 0 22px rgba(200,168,75,0.4)' : 'none',
                textShadow: hovered === 'lang' ? '0 0 10px rgba(200,168,75,0.7)' : 'none',
                transition: 'all 0.2s ease',
                fontFamily: other === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              {other === 'ar' ? 'العربية' : 'English'}
            </Link>
          </nav>

          {/* ── Mobile burger ── */}
          <button
            className="burger"
            onClick={() => setOpen(!open)}
            style={{
              background: 'none', border: 'none',
              color: '#EEF0F8', cursor: 'pointer',
              display: 'none', padding: 4,
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {open && (
          <div style={{
            background: 'rgba(6,8,15,0.97)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(79,126,255,0.12)',
            padding: '16px 28px 28px',
          }}>
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive(href) ? '#A78BFA' : '#6B7A9F',
                  borderBottom: '1px solid rgba(79,126,255,0.08)',
                  fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
              >
                {navLabels[key][locale]}
              </Link>
            ))}
            <Link
              href={switchPath()}
              onClick={() => setOpen(false)}
              style={{
                display: 'inline-block',
                marginTop: 16,
                padding: '7px 20px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(200,168,75,0.45)',
                color: '#C8A84B',
                background: 'rgba(200,168,75,0.07)',
              }}
            >
              {other === 'ar' ? 'العربية' : 'English'}
            </Link>
          </div>
        )}
      </header>

      <div style={{ height: 82 }} />

      <style>{`
        @media (max-width: 900px) {
          .desk-nav { display: none !important; }
          .burger   { display: block !important; }
        }
      `}</style>
    </>
  );
}

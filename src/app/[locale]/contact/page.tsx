'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/icons/SocialIcons';

const t = {
  en: { eyebrow: '— Get in Touch —', title: 'Contact Us' },
  ar: { eyebrow: '— تواصل معنا —', title: 'اتصل بنا' },
};

const contacts = [
  { icon: InstagramIcon, label_en: 'Instagram', label_ar: 'إنستغرام', href: 'https://www.instagram.com/awroad1234/', sub: '@awroad1234' },
  { icon: FacebookIcon, label_en: 'Facebook', label_ar: 'فيسبوك', href: 'https://web.facebook.com/profile.php?id=100075897734879', sub: 'AW-ROAD' },
  { icon: YoutubeIcon, label_en: 'YouTube', label_ar: 'يوتيوب', href: 'https://www.youtube.com/channel/UCqGY_Z4k6yK5OO7wAfPG8Qw', sub: 'AW-ROAD Channel' },
  { icon: Phone, label_en: 'Telephone / Fax', label_ar: 'هاتف / فاكس', href: 'tel:+96265534826', sub: '+962 6 553 4826' },
  { icon: Mail, label_en: 'Email', label_ar: 'البريد الإلكتروني', href: 'mailto:info@awroad.auass.com', sub: 'info@awroad.auass.com' },
  { icon: MapPin, label_en: 'Location', label_ar: 'الموقع', href: 'https://maps.app.goo.gl/Jt2oD5bLdykTRqAT7', sub: 'Amman, Jordan' },
];

export default function ContactPage() {
  const { locale } = useParams<{ locale: 'en' | 'ar' }>();
  const isRtl = locale === 'ar';
  const tx = t[locale] ?? t.en;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const STARS = Array.from({ length: 320 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2, alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      STARS.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${s.alpha.toFixed(2)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#070A14', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <section style={{ position: 'relative', zIndex: 1, padding: '160px 0 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }} dir={isRtl ? 'rtl' : 'ltr'}>
          <div style={{ marginBottom: 56, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.eyebrow}
            </span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.title}
            </h1>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {contacts.map(({ icon: Icon, label_en, label_ar, href, sub }) => (
              
                <a
                key={label_en}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  textDecoration: 'none',
                  background: 'rgba(13,17,32,0.6)',
                  border: '1px solid rgba(79,126,255,0.1)',
                  borderRadius: 16,
                  padding: '20px 22px',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 30px rgba(79,126,255,0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(79,126,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(79,126,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(79,126,255,0.1)';
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(79,126,255,0.18), rgba(167,139,250,0.18))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(167,139,250,0.2)',
                  }}
                >
                  <Icon size={20} color="#A78BFA" />
                </div>
                <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#EEF0F8', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                    {isRtl ? label_ar : label_en}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#6B7A9F', marginTop: 2, direction: 'ltr', fontFamily: 'Inter, sans-serif' }}>
                    {sub}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

type GalleryItem = {
  id: string;
  image_url: string;
  caption_en: string | null;
  caption_ar: string | null;
  category: string;
};

const categories = [
  { key: 'all',         en: 'All',         ar: 'الكل'        },
  { key: 'before-2026', en: 'Before 2026',  ar: 'قبل 2026'   },
  { key: '2026',        en: '2026',         ar: '2026'        },
  { key: '2027',        en: '2027',         ar: '2027'        },
];

const t = {
  en: { eyebrow: '— Gallery —', title: 'Photo Gallery', empty: 'No photos in this category yet.' },
  ar: { eyebrow: '— معرض الصور —', title: 'معرض الصور', empty: 'لا توجد صور في هذه الفئة بعد.' },
};

export default function GalleryPage() {
  const { locale } = useParams<{ locale: 'en' | 'ar' }>();
  const isRtl = locale === 'ar';
  const tx = t[locale] ?? t.en;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setItems(data as GalleryItem[]);
      setLoading(false);
    };
    fetch();
  }, []);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = active === 'all' ? items : items.filter(i => i.category === active);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#070A14', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, cursor: 'zoom-out',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
            <img
              src={lightbox.image_url}
              alt={isRtl ? lightbox.caption_ar ?? '' : lightbox.caption_en ?? ''}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12, display: 'block' }}
            />
            {(lightbox.caption_en || lightbox.caption_ar) && (
              <p style={{ marginTop: 14, color: '#9CA3AF', fontSize: 13.5, fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                {isRtl ? lightbox.caption_ar : lightbox.caption_en}
              </p>
            )}
            <button
              onClick={() => setLightbox(null)}
              style={{ marginTop: 16, background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}

      <section style={{ position: 'relative', zIndex: 1, padding: '160px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }} dir={isRtl ? 'rtl' : 'ltr'}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.eyebrow}
            </span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.title}
            </h1>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                style={{
                  padding: '9px 22px',
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                  border: active === cat.key ? '1px solid #A78BFA' : '1px solid rgba(79,126,255,0.2)',
                  background: active === cat.key ? 'rgba(167,139,250,0.15)' : 'rgba(13,17,32,0.6)',
                  color: active === cat.key ? '#A78BFA' : '#6B7A9F',
                  transition: 'all 0.2s ease',
                }}
              >
                {isRtl ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', color: '#6B7A9F', padding: '60px 0' }}>···</div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: '#6B7A9F', fontSize: 14, padding: '60px 0', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.empty}
            </div>
          )}

          {/* Image grid */}
          <div style={{ columns: '3 280px', gap: 16 }}>
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: 16,
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                  border: '1px solid rgba(79,126,255,0.1)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(79,126,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <img
                  src={item.image_url}
                  alt={isRtl ? item.caption_ar ?? '' : item.caption_en ?? ''}
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
                {(item.caption_en || item.caption_ar) && (
                  <div style={{ padding: '10px 14px', background: 'rgba(13,17,32,0.8)', fontSize: 12.5, color: '#9CA3AF', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', textAlign: isRtl ? 'right' : 'left' }}>
                    {isRtl ? item.caption_ar : item.caption_en}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

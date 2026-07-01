'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

type NewsItem = {
  id: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  image_url: string | null;
  published_at: string;
};

const t = {
  en: {
    eyebrow: '— News —',
    title: 'Latest News',
    emptyTitle: 'No headlines yet',
    emptyBody: "We're getting ready to share news from across the network. Check back soon.",
  },
  ar: {
    eyebrow: '— الأخبار —',
    title: 'آخر الأخبار',
    emptyTitle: 'لا توجد أخبار بعد',
    emptyBody: 'نستعد لمشاركة الأخبار من شبكتنا. تابعونا قريباً.',
  },
};

export default function NewsPage() {
  const { locale } = useParams<{ locale: 'en' | 'ar' }>();
  const isRtl = locale === 'ar';
  const tx = t[locale] ?? t.en;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('awroad_news')
        .select('*')
        .order('published_at', { ascending: false });
      if (!error && data) setNews(data as NewsItem[]);
      setLoading(false);
    };
    fetchNews();
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

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#070A14', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <section style={{ position: 'relative', zIndex: 1, padding: '160px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }} dir={isRtl ? 'rtl' : 'ltr'}>
          <div style={{ marginBottom: 56, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.eyebrow}
            </span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.title}
            </h1>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', color: '#6B7A9F', fontSize: 14, padding: '60px 0' }}>···</div>
          )}

          {!loading && news.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                maxWidth: 460,
                margin: '0 auto',
                padding: '64px 32px',
                background: 'rgba(13,17,32,0.5)',
                border: '1px solid rgba(79,126,255,0.1)',
                borderRadius: 20,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  margin: '0 auto 24px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(167,139,250,0.25), rgba(79,126,255,0.05))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  boxShadow: '0 0 24px rgba(167,139,250,0.25)',
                }}
              >
                ✦
              </div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#EEF0F8',
                  marginBottom: 10,
                  fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
              >
                {tx.emptyTitle}
              </h2>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.8,
                  color: '#6B7A9F',
                  fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                }}
              >
                {tx.emptyBody}
              </p>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
            }}
          >
            {news.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(13,17,32,0.6)',
                  border: '1px solid rgba(79,126,255,0.1)',
                  borderRadius: 18,
                  overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 30px rgba(79,126,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(79,126,255,0.18)';
                  e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(79,126,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(79,126,255,0.1)';
                }}
              >
                {item.image_url && (
                  <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <img
                      src={item.image_url}
                      alt={isRtl ? item.title_ar : item.title_en}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}
                <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#EEF0F8',
                      marginBottom: 8,
                      fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                      textAlign: isRtl ? 'right' : 'left',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {isRtl ? item.title_ar : item.title_en}
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: '#9CA3AF',
                      fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                      textAlign: isRtl ? 'right' : 'left',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {isRtl ? item.body_ar : item.body_en}
                  </p>
                  <a
                  
                    href={`/${locale}/news/${item.id}`}
                    style={{
                      marginTop: 14,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: '#A78BFA',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                    }}
                  >
                    {isRtl ? '← اقرأ المزيد' : 'Read More →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

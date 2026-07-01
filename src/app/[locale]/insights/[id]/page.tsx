'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Insight = {
  id: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  image_url: string | null;
  published_at: string;
};

export default function InsightDetailPage() {
  const { locale, id } = useParams<{ locale: 'en' | 'ar'; id: string }>();
  const isRtl = locale === 'ar';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [item, setItem] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('insights').select('*').eq('id', id).single();
      if (data) setItem(data as Insight);
      setLoading(false);
    };
    fetch();
  }, [id]);

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
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px' }} dir={isRtl ? 'rtl' : 'ltr'}>
          <Link href={`/${locale}/insights`} style={{ fontSize: 13, color: '#A78BFA', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 32, fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
            {isRtl ? 'المقالات ←' : '← Back to Insights'}
          </Link>

          {loading && <div style={{ color: '#6B7A9F', textAlign: 'center', padding: '60px 0' }}>···</div>}

          {!loading && item && (
            <>
              {item.image_url && (
                <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 36, border: '1px solid rgba(79,126,255,0.15)' }}>
                  <img src={item.image_url} alt={isRtl ? item.title_ar : item.title_en} style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'cover' }} />
                </div>
              )}
              <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 800, color: '#EEF0F8', marginBottom: 24, fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', textAlign: isRtl ? 'right' : 'left' }}>
                {isRtl ? item.title_ar : item.title_en}
              </h1>
              <div style={{ background: 'rgba(13,17,32,0.6)', border: '1px solid rgba(79,126,255,0.1)', borderRadius: 16, padding: '32px 36px', backdropFilter: 'blur(12px)' }}>
                <p style={{ fontSize: 15, lineHeight: 2, color: '#9CA3AF', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', textAlign: isRtl ? 'right' : 'left', margin: 0 }}>
                  {isRtl ? item.body_ar : item.body_en}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

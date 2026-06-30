'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Office = { en: string; ar: string; country_en: string; country_ar: string };

const offices: Office[] = [
  { en: 'Arab World and Arabic Language Regional Office', ar: 'المكتب الإقليمي للعالم العربي واللغة العربية', country_en: 'Jordan', country_ar: 'الأردن' },
  { en: 'Southern African Regional Office of Astronomy for Development', ar: 'المكتب الإقليمي للجنوب الأفريقي لعلم الفلك للتنمية', country_en: 'Zambia', country_ar: 'زامبيا' },
  { en: 'The West African Regional Office', ar: 'المكتب الإقليمي لغرب إفريقيا', country_en: 'Nigeria', country_ar: 'نيجيريا' },
  { en: 'East African Regional Office of Astronomy for Development', ar: 'المكتب الإقليمي لشرق إفريقيا لعلم الفلك من أجل التنمية', country_en: 'Ethiopia', country_ar: 'إثيوبيا' },
  { en: 'The South East Asia Regional Node', ar: 'المكتب الإقليمي لجنوب شرق آسيا', country_en: 'Thailand', country_ar: 'تايلاند' },
  { en: 'The East Asia Regional Node and Chinese Language Expertise Centre', ar: 'مركز شرق آسيا الإقليمي وخبراء اللغة الصينية', country_en: 'China', country_ar: 'الصين' },
  { en: 'The Andean Regional Office', ar: 'مكتب الأنديز الإقليمي', country_en: 'Argentina', country_ar: 'الأرجنتين' },
  { en: 'Europe Regional Node', ar: 'المكتب الإقليمي لأوروبا', country_en: 'Netherlands', country_ar: 'هولندا' },
  { en: 'North America Regional Node', ar: 'المكتب الإقليمي لأمريكا الشمالية', country_en: 'United States', country_ar: 'الولايات المتحدة' },
  { en: 'Portuguese Language Centre', ar: 'مركز اللغة البرتغالية', country_en: 'Portugal', country_ar: 'البرتغال' },
  { en: 'South West and Central Asia Regional Node', ar: 'المكتب الإقليمي لجنوب غرب ووسط آسيا', country_en: 'Armenia', country_ar: 'أرمينيا' },
];

const t = {
  en: { eyebrow: '— Our Network —', title: 'ROADs Network', th1: 'Regional Office / Node', th2: 'Host Country' },
  ar: { eyebrow: '— شبكتنا —', title: 'شبكة الرواد', th1: 'المكتب / المركز الإقليمي', th2: 'البلد المضيف' },
};

export default function RoadsNetworkPage() {
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
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.eyebrow}
            </span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.title}
            </h1>
          </div>

          <div style={{ background: 'rgba(13,17,32,0.6)', border: '1px solid rgba(79,126,255,0.1)', borderRadius: 16, overflow: 'hidden', backdropFilter: 'blur(12px)', boxShadow: '0 0 40px rgba(79,126,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(79,126,255,0.15)' }}>
                  <th style={{ textAlign: isRtl ? 'right' : 'left', padding: '16px 24px', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A78BFA' }}>{tx.th1}</th>
                  <th style={{ textAlign: isRtl ? 'right' : 'left', padding: '16px 24px', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A78BFA' }}>{tx.th2}</th>
                </tr>
              </thead>
              <tbody>
                {offices.map((o, i) => (
                  <tr key={i} style={{ borderBottom: i < offices.length - 1 ? '1px solid rgba(79,126,255,0.06)' : 'none' }}>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#EEF0F8' }}>{isRtl ? o.ar : o.en}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#9CA3AF' }}>{isRtl ? o.country_ar : o.country_en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

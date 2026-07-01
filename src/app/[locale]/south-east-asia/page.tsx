'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
const t = {
  en: { eyebrow: '— Regional Office —', title: 'South East Asia Regional Node', country: 'Thailand', body: 'The South East Asia Regional Node is hosted in Thailand. It coordinates astronomy for development activities across South East Asia, fostering scientific education, research collaboration, and public outreach in the region as part of the global IAU Office of Astronomy for Development network.' },
  ar: { eyebrow: '— مكتب إقليمي —', title: 'المكتب الإقليمي لجنوب شرق آسيا', country: 'تايلاند', body: 'يستضاف المكتب الإقليمي لجنوب شرق آسيا في تايلاند. يقوم بتنسيق أنشطة علم الفلك من أجل التنمية في منطقة جنوب شرق آسيا، وتعزيز التعليم العلمي والتعاون البحثي والتوعية العامة في المنطقة ضمن شبكة مكتب الاتحاد الفلكي الدولي لعلم الفلك من أجل التنمية.' },
};
export default function SouthEastAsiaPage() {
  const { locale } = useParams<{ locale: 'en' | 'ar' }>();
  const isRtl = locale === 'ar';
  const tx = t[locale] ?? t.en;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = (canvas.width = window.innerWidth), h = (canvas.height = window.innerHeight);
    const STARS = Array.from({ length: 320 }, () => ({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.4+0.2, alpha: Math.random(), speed: Math.random()*0.004+0.001 }));
    let raf: number;
    const draw = () => { ctx.clearRect(0,0,w,h); STARS.forEach(s => { s.alpha+=s.speed; if(s.alpha>1||s.alpha<0) s.speed*=-1; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(180,200,255,${s.alpha.toFixed(2)})`; ctx.fill(); }); raf=requestAnimationFrame(draw); };
    draw();
    const onResize = () => { w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#070A14', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <section style={{ position: 'relative', zIndex: 1, padding: '160px 0 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }} dir={isRtl ? 'rtl' : 'ltr'}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>{tx.eyebrow}</span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>{tx.title}</h1>
            <div style={{ marginTop: 10, fontSize: 13, color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>{tx.country}</div>
          </div>
          <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 36, border: '1px solid rgba(79,126,255,0.15)' }}>
            <img src="/ROADS/south-east-asia.webp" alt={tx.title} style={{ width: '100%', display: 'block', maxHeight: 400, objectFit: 'cover' }} />
          </div>
          <div style={{ background: 'rgba(13,17,32,0.6)', border: '1px solid rgba(79,126,255,0.1)', borderRadius: 16, padding: '32px 36px', backdropFilter: 'blur(12px)' }}>
            <p style={{ fontSize: 15, lineHeight: 2, color: '#9CA3AF', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', textAlign: isRtl ? 'right' : 'left', margin: 0 }}>{tx.body}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

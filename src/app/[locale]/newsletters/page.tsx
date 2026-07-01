'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';

const newsletters = [
  { num: 27, period_en: 'October to December 2020', period_ar: 'أكتوبر – ديسمبر 2020', url: 'https://cloudcape.saao.ac.za/index.php/s/jbMozGhNknwS8Vv' },
  { num: 26, period_en: 'January to April 2020', period_ar: 'يناير – أبريل 2020', url: 'http://www.astro4dev.org/wp-content/uploads/2020/05/Newsletter-Jan-Apr-2020.pdf' },
  { num: 25, period_en: 'July to September 2019', period_ar: 'يوليو – سبتمبر 2019', url: 'http://cloudcape.saao.ac.za/index.php/s/CGnlMYXpr7B2cKI' },
  { num: 24, period_en: 'January to March 2019', period_ar: 'يناير – مارس 2019', url: 'http://www.astro4dev.org/wp-content/uploads/2019/05/OAD-Newsletter-24-Jan-Mar-2019-1.pdf' },
  { num: 23, period_en: 'October to December 2018', period_ar: 'أكتوبر – ديسمبر 2018', url: 'http://www.astro4dev.org/wp-content/uploads/2019/01/OAD-Newsletter-23-Oct-Dec-2018.pdf' },
  { num: 22, period_en: 'July to September 2018', period_ar: 'يوليو – سبتمبر 2018', url: 'https://cloudcape.saao.ac.za/index.php/s/7JTNrVDoLcCoECL' },
  { num: 21, period_en: 'April to August 2018', period_ar: 'أبريل – أغسطس 2018', url: 'https://cloudcape.saao.ac.za/index.php/s/ZJJdbSX57z2aRTi' },
  { num: 20, period_en: 'January to March 2018', period_ar: 'يناير – مارس 2018', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-20-Jan-Mar-2018-.pdf' },
  { num: 19, period_en: 'October to December 2017', period_ar: 'أكتوبر – ديسمبر 2017', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-newsletter-19-Oct-Dec-2017.pdf' },
  { num: 18, period_en: 'July to September 2017', period_ar: 'يوليو – سبتمبر 2017', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-Jul-Sep-2017.pdf' },
  { num: 17, period_en: 'April to June 2017', period_ar: 'أبريل – يونيو 2017', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-Apr-Jun-2017.pdf' },
  { num: 16, period_en: 'January to March 2017', period_ar: 'يناير – مارس 2017', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-Jan-Mar-2017.pdf' },
  { num: 15, period_en: 'October to December 2016', period_ar: 'أكتوبر – ديسمبر 2016', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-15-Oct-Dec-2016.pdf' },
  { num: 14, period_en: 'July to September 2016', period_ar: 'يوليو – سبتمبر 2016', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-14-Jul-Sep-20161.pdf' },
  { num: 13, period_en: 'April to June 2016', period_ar: 'أبريل – يونيو 2016', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-Apr-Jun-2016.pdf' },
  { num: 12, period_en: 'January to March 2016', period_ar: 'يناير – مارس 2016', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-Jan-Mar-2016.pdf' },
  { num: 11, period_en: 'October to December 2015', period_ar: 'أكتوبر – ديسمبر 2015', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/IAU-OAD-Newsletter-Oct-Dec-20151.pdf' },
  { num: 10, period_en: 'August to October 2015', period_ar: 'أغسطس – أكتوبر 2015', url: 'http://www.astro4dev.org/wp-content/uploads/2015/11/IAU-OAD-Newsletter-Aug-Oct-2015.pdf' },
  { num: 9,  period_en: 'May to July 2015', period_ar: 'مايو – يوليو 2015', url: 'http://www.astro4dev.org/wp-content/uploads/2015/08/IAU-OAD-Newsletter-July-2015.pdf' },
  { num: 8,  period_en: 'February to April 2015', period_ar: 'فبراير – أبريل 2015', url: 'http://www.astro4dev.org/wp-content/uploads/2015/05/IAU-OAD-Newsletter-May-2015.pdf' },
  { num: 7,  period_en: 'July to September 2014', period_ar: 'يوليو – سبتمبر 2014', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/OAD-Newsletter-7.pdf' },
  { num: 6,  period_en: 'April to June 2014', period_ar: 'أبريل – يونيو 2014', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/OAD-Newsletter-6.pdf' },
  { num: 5,  period_en: 'January to March 2014', period_ar: 'يناير – مارس 2014', url: 'http://www.astro4dev.org/wp-content/uploads/2014/04/OAD-Newsletter-5.pdf' },
  { num: 4,  period_en: 'October to December 2013', period_ar: 'أكتوبر – ديسمبر 2013', url: 'http://www.astro4dev.org/wp-content/uploads/2014/02/OAD-Newsletter-4.pdf' },
  { num: 3,  period_en: 'July to September 2013', period_ar: 'يوليو – سبتمبر 2013', url: 'http://www.astro4dev.org/wp-content/uploads/2013/11/OAD-Newsletter-3.pdf' },
  { num: 2,  period_en: 'April to June 2013', period_ar: 'أبريل – يونيو 2013', url: 'http://www.astro4dev.org/wp-content/uploads/2013/07/OAD-Newsletter-2.pdf' },
  { num: 1,  period_en: 'January to March 2013', period_ar: 'يناير – مارس 2013', url: 'http://www.astro4dev.org/wp-content/uploads/2013/04/OAD-Newsletter-1.pdf' },
];

const t = {
  en: {
    eyebrow: '— Publications —',
    title: 'OAD Newsletters',
    desc: 'The OAD newsletter is issued quarterly and reports on current activities of the OAD and Regional Offices. Comments or suggestions: media@astro4dev.org',
    annual: 'OAD Annual Report (April 2018 – March 2019)',
    annualUrl: 'http://cloudcape.saao.ac.za/index.php/s/984lU7QGNWru8Mc',
    issue: 'Issue',
    open: 'Open PDF',
  },
  ar: {
    eyebrow: '— المنشورات —',
    title: 'نشرات OAD',
    desc: 'تصدر نشرة OAD بشكل ربع سنوي وتتضمن تقارير عن الأنشطة الحالية لمكتب OAD والمكاتب الإقليمية. للتعليقات والاقتراحات: media@astro4dev.org',
    annual: 'التقرير السنوي لـ OAD (أبريل 2018 – مارس 2019)',
    annualUrl: 'http://cloudcape.saao.ac.za/index.php/s/984lU7QGNWru8Mc',
    issue: 'العدد',
    open: 'فتح PDF',
  },
};

export default function NewslettersPage() {
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
            <p style={{ marginTop: 14, fontSize: 13.5, color: '#6B7A9F', maxWidth: 600, margin: '14px auto 0', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', lineHeight: 1.8 }}>
              {tx.desc}
            </p>
          </div>

          {/* Annual report special card */}
          <a
          
            href={tx.annualUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'linear-gradient(135deg, rgba(79,126,255,0.12), rgba(167,139,250,0.12))',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: 14, padding: '18px 24px', marginBottom: 32,
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(167,139,250,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <FileText size={22} color="#A78BFA" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#A78BFA', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.annual}
            </span>
          </a>

          {/* Newsletter list */}
          <div style={{ display: 'grid', gap: 10 }}>
            {newsletters.map((n) => (
              <a
              
                key={n.num}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(13,17,32,0.6)',
                  border: '1px solid rgba(79,126,255,0.1)',
                  borderRadius: 12, padding: '14px 20px',
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)'; e.currentTarget.style.background = 'rgba(79,126,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,126,255,0.1)'; e.currentTarget.style.background = 'rgba(13,17,32,0.6)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <FileText size={16} color="#6B7A9F" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#EEF0F8', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                      {tx.issue} #{n.num}
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7A9F', marginTop: 2, fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                      {isRtl ? n.period_ar : n.period_en}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#A78BFA', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                  {tx.open} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

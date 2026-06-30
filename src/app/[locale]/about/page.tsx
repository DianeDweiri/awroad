'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const t = {
  en: {
    eyebrow: '— About Us —',
    title: 'The International Astronomical Union',
    p1: "The International Astronomical Union (IAU) was founded on July 28, 1919. It is an international union of professional astronomers, at the PhD level and beyond, active in professional research and education in astronomy. The Union has a total of 12,664 individual members who are professional astronomers from 96 countries around the world (as of February 1, 2017).",
    p2: "Astronomy, astrophysics, and space science (AASS) play an active role in science, technology, and community development. Unfortunately, only a small portion of this knowledge is actually used in teaching at schools, universities, and other academic institutions in Arab countries. The challenge lies in providing effective professional development for astronomy and space science teachers and researchers at all levels, from elementary school to university. There is also a pressing need for better communication channels between Arab astronomers and space scientists today. The best option, therefore, is to reconnect with the vast cultural heritage of the Arab world, particularly in astronomy. Building modern, high-quality observatories, planetariums, and research centers in the region — in partnership with Arab astronomers and space scientists — is essential, and would be an excellent step toward advancing the development of astronomy and space sciences.",
    p3: "The Arab Union for Astronomy and Space Sciences (AUASS) was active in proposing projects and submitting a proposal to host a regional office in the Arab world. The International Astronomical Union found the AUASS proposal to be strong and well justified, as it represented all Arab states. During the 11th Arab Conference on Astronomy and Space Sciences, held in Sharjah (United Arab Emirates) from December 5–8, 2014, under the patronage of Sheikh Sultan bin Muhammad Al-Qasimi, Ruler of Sharjah, the AUASS discussed this matter with Mr. Kevin Govender of the IAU Office of Astronomy for Development (OAD), in the presence of members of the AUASS Supreme Council. As a result, it was decided to select the Hashemite Kingdom of Jordan to host the IAU Office of Astronomy for Development for the Arab region, and an agreement to this effect was signed at the IAU General Assembly in Honolulu in August 2015.",
  },
  ar: {
    eyebrow: '— من نحن —',
    title: 'الاتحاد الفلكي الدولي',
    p1: 'تأسس الاتحاد الفلكي الدولي (IAU) في 28 تموز/ يوليو 1919. وهو اتحاد دولي لعلماء الفلك المحترفين، على مستوى الدكتوراه وما بعدها، وينشط في البحث المهني والتعليم في علم الفلك. يضم الاتحاد ما مجموعه 12664 عضواً فردياً من علماء الفلك المحترفين من 96 دولة حول العالم (كما في 1 شباط فبراير 2017).',
    p2: 'يلعب علم الفلك والفيزياء الفلكية وعلوم الفضاء (AASS) دوراً فعالاً في العلوم والتكنولوجيا وتنمية المجتمع. لسوء الحظ، يتم استخدام نسبة صغيرة من هذه المعرفة بالفعل في التدريس في المدارس والجامعات والمؤسسات الأكاديمية الأخرى في البلدان العربية. ويتمثل التحدي في توفير التطوير المهني الفعال لمعلمي وباحثي علوم الفلك والفضاء على جميع المستويات، من المدرسة الابتدائية إلى الجامعة. وهناك حاجة ماسة لقنوات اتصال أفضل بين علماء الفلك والفضاء العرب في الوقت الحاضر. لذا، فإن الخيار الأفضل هو التعرف على التراث الثقافي الواسع للوطن العربي، ولا سيما في علم الفلك. حيث يعد بناء مراصد حديثة وجيدة وقباب فلكية ومراكز أبحاث في المنطقة بالاشتراك مع علماء الفلك وعلماء الفضاء العرب أمراً ضرورياً وسيكون خطوة ممتازة نحو تطوير علوم الفلك والفضاء.',
    p3: 'كان الاتحاد العربي لعلوم الفضاء والفلك (AUASS) نشيطاً في اقتراح مشاريع وتقديم مقترح لاستضافة مكتب إقليمي في العالم العربي. وقد وجد الاتحاد الفلكي الدولي أن اقتراح الاتحاد العربي لعلوم الفضاء والفلك قوي ومبرر إلى حد ما لأنه يمثل جميع الدول العربية. فخلال المؤتمر العربي الحادي عشر لعلم الفلك وعلوم الفضاء، الذي عقد في الشارقة (الإمارات العربية المتحدة) في الفترة ما بين 5 و8 كانون1/ ديسمبر 2014 وتحت رعاية الشيخ سلطان بن محمد القاسمي، حاكم الشارقة، ناقش الاتحاد العربي لعلوم الفضاء والفلك هذه القضية مع السيد كيفن جوفندر من (OAD) بحضور أعضاء المجلس الأعلى للاتحاد العربي لعلوم الفضاء والفلك. وفي المحصلة اتخذوا قراراً باختيار المملكة الأردنية الهاشمية لاستضافة مكتب IAU لعلم الفلك من أجل التنمية في المنطقة العربية، حيث تم توقيع اتفاقية بهذا الصدد في الجمعية العامة للاتحاد الفلكي الدولي في هونولولو في آب أغسطس 2015.',
  },
};

export default function AboutPage() {
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
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random(),
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

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#070A14', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      <section style={{ position: 'relative', zIndex: 1, padding: '160px 0 100px' }}>
        <div
          style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C8A84B',
                fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              {tx.eyebrow}
            </span>
            <h1
              style={{
                marginTop: 14,
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
              }}
            >
              {tx.title}
            </h1>
          </div>

          <div
            style={{
              background: 'rgba(13,17,32,0.6)',
              border: '1px solid rgba(79,126,255,0.1)',
              borderRadius: 16,
              padding: '36px 40px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 40px rgba(79,126,255,0.08)',
            }}
          >
            <div
              style={{
                fontSize: 14.5,
                lineHeight: 2,
                color: '#9CA3AF',
                fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                textAlign: isRtl ? 'right' : 'left',
              }}
            >
              <p style={{ marginBottom: 22 }}>{tx.p1}</p>
              <p style={{ marginBottom: 22 }}>{tx.p2}</p>
              <p style={{ marginBottom: 0 }}>{tx.p3}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

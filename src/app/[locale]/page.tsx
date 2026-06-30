'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const t = {
  en: {
    eyebrow: 'IAU · Office of Astronomy for Development',
    title1: 'Arab World',
    title2: 'Regional Office',
    sub: 'Advancing astronomy across the Arab world — uniting science, education, and culture under one sky.',
    cta1: 'Explore',
    cta2: 'Latest News',
  },
  ar: {
    eyebrow: 'الاتحاد الفلكي الدولي · مكتب الفلك للتنمية',
    title1: 'المكتب الإقليمي',
    title2: 'للعالم العربي',
    sub: 'تعزيز علم الفلك في العالم العربي — توحيد العلم والتعليم والثقافة تحت سماء واحدة.',
    cta1: 'اكتشف',
    cta2: 'آخر الأخبار',
  },
};

export default function HomePage() {
  const { locale } = useParams<{ locale: Locale }>();
  const isRtl = locale === 'ar';
  const tx = t[locale] ?? t.en;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── scroll to hash on load ────────
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  // ── starfield ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;

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
      STARS.forEach(s => {
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
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <main style={{ background: '#06080F', color: '#EEF0F8', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }} dir={isRtl ? 'rtl' : 'ltr'}>

        {/* starfield */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* deep radial glow behind text */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79,126,255,0.13) 0%, transparent 70%)',
        }} />

        {/* content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 780 }}>

          {/* eyebrow */}
          <div style={{
            display: 'inline-block',
            marginBottom: 28,
            padding: '6px 18px',
            borderRadius: 999,
            border: '1px solid rgba(200,168,75,0.35)',
            background: 'rgba(200,168,75,0.07)',
            fontSize: 12.5,
            letterSpacing: '0.1em',
            color: '#C8A84B',
            textTransform: 'uppercase',
          }}>{tx.eyebrow}</div>

          {/* main title */}
          <h1 style={{ margin: '0 0 24px', lineHeight: 1.1 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(42px, 7vw, 82px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #A78BFA 55%, #4F7EFF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.4))',
            }}>{tx.title1}</span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(42px, 7vw, 82px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #4F7EFF 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(79,126,255,0.4))',
            }}>{tx.title2}</span>
          </h1>

          {/* subtitle */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#8892B0',
            lineHeight: 1.75,
            marginBottom: 40,
            maxWidth: 600,
            margin: '0 auto 40px',
          }}>{tx.sub}</p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`/${locale}/about`} style={{
              padding: '13px 32px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14.5,
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #4F7EFF, #A78BFA)',
              color: '#fff',
              boxShadow: '0 0 28px rgba(79,126,255,0.45)',
              transition: 'all 0.2s ease',
            }}>{tx.cta1}</a>
            <a href={`/${locale}/news`} style={{
              padding: '13px 32px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14.5,
              textDecoration: 'none',
              border: '1px solid rgba(79,126,255,0.4)',
              color: '#A78BFA',
              background: 'rgba(79,126,255,0.07)',
              transition: 'all 0.2s ease',
            }}>{tx.cta2}</a>
          </div>
        </div>

        {/* bottom fade into next section */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, zIndex: 2,
          background: 'linear-gradient(to bottom, transparent, #06080F)',
        }} />

        {/* scroll hint */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, color: '#6B7A9F', fontSize: 12, letterSpacing: '0.15em',
          animation: 'bounce 2s infinite',
        }}>↓</div>
      </section>


      {/* ══ FLAGS STRIP ══════════════════════════════════ */}
      <section style={{ padding: '48px 0', overflow: 'hidden', position: 'relative', borderTop: '1px solid rgba(79,126,255,0.08)', borderBottom: '1px solid rgba(79,126,255,0.08)' }}>

        {/* left + right fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(to right, #06080F, transparent)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(to left, #06080F, transparent)' }} />

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B' }}>
            {isRtl ? '— الدول الأعضاء —' : '— Member Countries —'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 0 }}>
          <div className="flags-scroll" style={{ display: 'flex', gap: 32, paddingInline: 32 }}>
            {[
              { code: 'jo', en: 'Jordan',       ar: 'الأردن'      },
              { code: 'sa', en: 'Saudi Arabia', ar: 'السعودية'    },
              { code: 'ae', en: 'UAE',           ar: 'الإمارات'   },
              { code: 'eg', en: 'Egypt',         ar: 'مصر'        },
              { code: 'ma', en: 'Morocco',       ar: 'المغرب'     },
              { code: 'tn', en: 'Tunisia',       ar: 'تونس'       },
              { code: 'dz', en: 'Algeria',       ar: 'الجزائر'    },
              { code: 'lb', en: 'Lebanon',       ar: 'لبنان'      },
              { code: 'sd', en: 'Sudan',         ar: 'السودان'    },
              { code: 'iq', en: 'Iraq',          ar: 'العراق'     },
              { code: 'ye', en: 'Yemen',         ar: 'اليمن'      },
              { code: 'ly', en: 'Libya',         ar: 'ليبيا'      },
              { code: 'sy', en: 'Syria',         ar: 'سوريا'      },
              { code: 'om', en: 'Oman',          ar: 'عُمان'      },
              { code: 'kw', en: 'Kuwait',        ar: 'الكويت'     },
              { code: 'bh', en: 'Bahrain',       ar: 'البحرين'    },
              { code: 'qa', en: 'Qatar',         ar: 'قطر'        },
              { code: 'mr', en: 'Mauritania',    ar: 'موريتانيا'  },
              // duplicate for seamless loop
              { code: 'jo', en: 'Jordan',       ar: 'الأردن'      },
              { code: 'sa', en: 'Saudi Arabia', ar: 'السعودية'    },
              { code: 'ae', en: 'UAE',           ar: 'الإمارات'   },
              { code: 'eg', en: 'Egypt',         ar: 'مصر'        },
              { code: 'ma', en: 'Morocco',       ar: 'المغرب'     },
              { code: 'tn', en: 'Tunisia',       ar: 'تونس'       },
              { code: 'dz', en: 'Algeria',       ar: 'الجزائر'    },
              { code: 'lb', en: 'Lebanon',       ar: 'لبنان'      },
              { code: 'sd', en: 'Sudan',         ar: 'السودان'    },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                minWidth: 72, cursor: 'default',
              }}>
                <div style={{
                  width: 80, height: 54,
                  borderRadius: 10,
                  border: '1px solid rgba(79,126,255,0.18)',
                  boxShadow: '0 0 16px rgba(79,126,255,0.15)',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden',
                }}>
                  <img
                    src={`https://flagcdn.com/w160/${c.code}.png`}
                    alt={c.en}
                    style={{ width: 80, height: 54, objectFit: 'cover' }}
                  />
                </div>
                <span style={{ fontSize: 11, color: '#6B7A9F', whiteSpace: 'nowrap', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
                  {isRtl ? c.ar : c.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ OPENING SPEECH ══════════════════════════════ */}
      <section id="opening-speech" style={{ padding: '100px 0', borderTop: '1px solid rgba(79,126,255,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }} dir={isRtl ? 'rtl' : 'ltr'}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B' }}>
              {isRtl ? '— كلمة الافتتاح —' : '— Opening Speech —'}
            </span>
            <h2 style={{ marginTop: 14, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {isRtl ? 'كلمة المدير التنفيذي' : "Executive Director's Message"}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Dr photo */}
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(79,126,255,0.3)', boxShadow: '0 0 32px rgba(79,126,255,0.25)', margin: '0 auto 12px' }}>
                <img src="/awni-Kh.jpg" alt="Dr. Awni Al-Khasawneh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#EEF0F8' }}>{isRtl ? 'د. عوني محمد الخصاونة' : 'Dr. Awni Mohammad Al-Khasawneh'}</div>
              <div style={{ fontSize: 11, color: '#6B7A9F', marginTop: 4, lineHeight: 1.5, maxWidth: 140 }}>{isRtl ? 'المدير التنفيذي، Arab-ROAD و Arab-LOAD' : 'Executive Director, AW-ROAD & Arab-LOAD'}</div>
            </div>

            {/* Speech text */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ background: 'rgba(13,17,32,0.6)', border: '1px solid rgba(79,126,255,0.1)', borderRadius: 16, padding: '32px 36px', backdropFilter: 'blur(12px)' }}>
                <div style={{ fontSize: 14, lineHeight: 2, color: '#9CA3AF', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', textAlign: isRtl ? 'right' : 'left' }}>
                  {isRtl ? (
                    <>
                      <p style={{ marginBottom: 16 }}>بسم الله الرحمن الرحيم.</p>
                      <p style={{ marginBottom: 16 }}>يسرنا أن نرحب بكم في الموقع الرسمي للمكتب الإقليمي للعالم العربي لعلم الفلك من أجل التنمية — Arab-ROAD، ومركز اللغة العربية المتخصص — Arab-LOAD، وكلاهما جزء من شبكة مكتب الاتحاد الفلكي الدولي لعلم الفلك من أجل التنمية — IAU-OAD.</p>
                      <p style={{ marginBottom: 16 }}>من عمّان، عاصمة المملكة الأردنية الهاشمية، بدأت رحلتنا الرسمية في 2–3 كانون الأول/ديسمبر 2015، إيذاناً بانضمام المكتب الإقليمي ومركز اللغة العربية المتخصص إلى شبكة عالمية تؤمن بأن علم الفلك ليس فقط حقلاً علمياً للمعرفة، بل أداة حضارية للتعليم والتنمية وبناء القدرات والحوار بين الشعوب.</p>
                      <p style={{ marginBottom: 16 }}>يفخر المكتب بدوره كمظلة عربية جامعة تضم 18 دولة عربية، تعمل معاً على النهوض بعلم الفلك وعلوم الفضاء، وتعزيز الثقافة العلمية، وتمكين الشباب والطلبة والباحثين وهواة الفلك، وربط المجتمع العربي بالمبادرات الدولية الرائدة في علم الفلك من أجل التنمية.</p>
                      <p style={{ marginBottom: 16 }}>سعى المكتب منذ تأسيسه إلى أن يكون جسراً فاعلاً بين المؤسسات العلمية العربية ونظيراتها حول العالم — من خلال دعم البرامج التعليمية، وتنظيم المحاضرات وورش العمل، وتشجيع الرصد الفلكي، وتطوير المحتوى العلمي باللغة العربية، وتعزيز مشاركة الشباب والمرأة، وترسيخ الوعي بالسماء المظلمة والسياحة الفلكية والتواصل العلمي الشامل.</p>
                      <p style={{ marginBottom: 16 }}>كما يعمل مركز اللغة العربية المتخصص على تقريب المعرفة الفلكية من القارئ الناطق بالعربية من خلال دعم التعريب، وتطوير المصطلحات العلمية، وتيسير الوصول إلى الموارد التعليمية للطلبة والمعلمين والمهتمين.</p>
                      <p style={{ marginBottom: 16 }}>تمتد رسالتنا لتشمل التعاون مع المكاتب الإقليمية ومراكز خبرة اللغة المماثلة ضمن شبكة OAD العالمية، من خلال تبادل الخبرات، وتطوير المبادرات المشتركة، وتوسيع أثر علم الفلك على التنمية المستدامة.</p>
                      <p style={{ marginBottom: 16 }}>نؤمن بأن السماء، بشساعتها وجمالها، لغة مشتركة للإنسانية، وأن علم الفلك يملك القدرة على إلهام الأجيال وفتح آفاق جديدة للعلم والمعرفة والابتكار.</p>
                      <p style={{ marginBottom: 0 }}>نرحب بكم جميعاً وندعوكم لتكونوا شركاء في هذه الرحلة. والله ولي التوفيق.</p>
                    </>
                  ) : (
                    <>
                      <p style={{ marginBottom: 16 }}>In the name of Allah, the Most Gracious, the Most Merciful.</p>
                      <p style={{ marginBottom: 16 }}>It is our pleasure to welcome you to the official website of the Arab Regional Office of Astronomy for Development — Arab-ROAD, and the Arabic Language Expertise Center — Arab-LOAD, both of which are part of the network of the IAU Office of Astronomy for Development — IAU-OAD.</p>
                      <p style={{ marginBottom: 16 }}>From Amman, the capital of the Hashemite Kingdom of Jordan, our official journey began on 2–3 December 2015, marking the joining of the Arab Regional Office and the Arabic Language Expertise Center to a global network that believes astronomy is not only a scientific field of knowledge, but also a civilizational tool for education, development, capacity building, and dialogue among peoples.</p>
                      <p style={{ marginBottom: 16 }}>The Office takes pride in serving as an inclusive Arab umbrella that brings together 18 Arab countries, working collectively to advance astronomy and space sciences, promote scientific culture, empower youth, students, researchers, and amateur astronomers, and connect the Arab community with leading international initiatives in astronomy for development.</p>
                      <p style={{ marginBottom: 16 }}>Since its establishment, the Office has sought to serve as an active bridge between Arab scientific institutions and their counterparts around the world — through supporting educational programs, organizing lectures and workshops, encouraging astronomical observation, developing scientific content in Arabic, promoting the participation of youth and women, and strengthening awareness of dark skies, astrotourism, and inclusive science communication.</p>
                      <p style={{ marginBottom: 16 }}>The Arabic Language Expertise Center also works to bring astronomical knowledge closer to the Arabic-speaking reader by supporting Arabization, developing scientific terminology, and facilitating access to educational resources for students, teachers, and interested communities.</p>
                      <p style={{ marginBottom: 16 }}>Our mission extends to cooperation with similar regional offices and language expertise centers within the global OAD network, through the exchange of expertise, the development of joint initiatives, and the expansion of astronomy's impact on sustainable development.</p>
                      <p style={{ marginBottom: 16 }}>We believe that the sky, in its vastness and beauty, is a shared language of humanity, and that astronomy has the power to inspire generations and open new horizons for science, knowledge, and innovation.</p>
                      <p style={{ marginBottom: 0 }}>We warmly welcome you all and invite you to be partners in this journey. May Allah grant us success.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OPENING CEREMONY ═════════════════════════════ */}
      <section id="opening-ceremony" style={{ padding: '100px 0', borderTop: '1px solid rgba(79,126,255,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }} dir="rtl">
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B' }}>— حفل الافتتاح —</span>
            <h2 style={{ marginTop: 14, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: 'Cairo, sans-serif' }}>
              افتتاح المكتب الإقليمي
            </h2>
          </div>

          {/* ceremony images */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
            {['/IAU-pic.png', '/IAU2-img.png'].map((src, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(79,126,255,0.15)', boxShadow: '0 0 24px rgba(79,126,255,0.1)' }}>
                <img src={src} alt={`Opening Ceremony ${i + 1}`} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* ceremony text */}
          <div style={{ background: 'rgba(13,17,32,0.6)', border: '1px solid rgba(79,126,255,0.1)', borderRadius: 16, padding: '32px 36px', backdropFilter: 'blur(12px)' }}>
            <div style={{ fontSize: 14.5, lineHeight: 2.2, color: '#9CA3AF', fontFamily: 'Cairo, sans-serif' }}>
              <p style={{ marginBottom: 16 }}>انضم المكتب الإقليمي لتنمية الفلك في المنطقة العربية (Arab-ROAD) رسمياً إلى شبكة مكاتب الفلك من أجل التنمية التابع للاتحاد الفلكي الدولي IAU-Office of Astronomy for Development (OAD)، حيث تم افتتاح المكتب في عمّان، الأردن، في الثاني من كانون أول/ ديسمبر 2015.</p>
              <p style={{ marginBottom: 16 }}>حضر الافتتاح الأمين العام للاتحاد الفلكي الدولي البروفيسور بييرو بنفينوتي ومدير مكتب الفلك من أجل التنمية (OAD) السيد كيفن جوفندر وممثلين عن المؤسسة المضيفة والعديد من الدول العربية في المنطقة. وقد ألقى الدكتور المهندس عوني محمد الخصاونة، الأمين العام للاتحاد العربي لعلوم الفضاء والفلك، كلمة ترحيب.</p>
              <p style={{ marginBottom: 16 }}>كما ألقى البروفيسور حميد النعيمي، رئيس الاتحاد العربي لعلوم الفضاء والفلك ومستشار جامعة الشارقة، كلمة الاتحاد، وألقى البروفيسور ضياء الدين عرفة، رئيس جامعة آل البيت، كلمة الافتتاح.</p>
              <p style={{ marginBottom: 0 }}>ويستضيف الاتحاد العربي لعلوم الفضاء والفلك المكتب الإقليمي لتنمية الفلك في المنطقة العربية ومركز خبراء اللغة العربية الذي يقع حالياً في عمان، الأردن. ويقع مقره الآن في المركز الإقليمي لتدريس علوم وتكنولوجيا الفضاء التابع لمكتب الأمم المتحدة لشؤون الفضاء الخارجي (UNOOSA).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ AW-ROAD ROLE ════════════════════════════════ */}
      <section id="awroad-role" style={{ padding: '100px 0', borderTop: '1px solid rgba(79,126,255,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }} dir="rtl">
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B' }}>— دور المكتب —</span>
            <h2 style={{ marginTop: 14, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: 'Cairo, sans-serif' }}>
              دور المكتب الإقليمي لتنمية الفلك في المنطقة العربية
            </h2>
            <p style={{ marginTop: 16, fontSize: 14.5, color: '#6B7A9F', lineHeight: 2, fontFamily: 'Cairo, sans-serif', maxWidth: 700, margin: '16px auto 0' }}>
              يشبه دور المكتب الإقليمي لتنمية الفلك في المنطقة العربية (Arab-ROAD) إلى حد كبير دور OAD، لذا فإن دور المكتب في الأساس هو التنسيق الاستراتيجي.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20 }}>
            {[
              { icon: '📋', title: 'المساعدة في تنفيذ الخطة الإستراتيجية للاتحاد الفلكي الدولي', body: 'تم إنشاء AW-ROAD للمساعدة في تنفيذ الخطة الإستراتيجية للاتحاد الفلكي الدولي، وهي وثيقة حية توفر إرشادات واسعة من حيث تحقيق الفوائد التنموية من علم الفلك.' },
              { icon: '🧭', title: 'المشورة الاستراتيجية', body: 'يقدم AW-ROAD، مسترشداً بالخطة الإستراتيجية IAU ونظرة عالمية لأنشطة التنمية، المشورة الاستراتيجية عند الحاجة إلى الأفراد والمنظمات في المنطقة العربية المنخرطين في أنشطة مماثلة.' },
              { icon: '🤝', title: 'التنسيق والتيسير', body: 'ينسق AW-ROAD ويسهل الأنشطة الإقليمية بما يتماشى مع مهمته. إن مثل هذه الجهود لا تعني القيام بأنشطة على أرض الواقع، بل هي تحديد مصادر للشركاء أو المتطوعين وتزويدهم بالاتصالات والمساعدة والتوجيهات اللازمة لتنفيذ المشروع.' },
              { icon: '💰', title: 'التمويل والبنية التحتية', body: 'يسعى AW-ROAD إلى الحصول على الأموال و/أو البنية التحتية أو المساعدة في الحصول عليها كما هو مطلوب من قبل نفسه وشركائه.' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(13,17,32,0.6)',
                border: '1px solid rgba(79,126,255,0.12)',
                borderRadius: 16,
                padding: '28px 28px',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(79,126,255,0.35)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(79,126,255,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(79,126,255,0.12)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#A78BFA', marginBottom: 10, fontFamily: 'Cairo, sans-serif', lineHeight: 1.6 }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, color: '#6B7A9F', lineHeight: 2, fontFamily: 'Cairo, sans-serif' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes flagsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .flags-scroll {
          animation: flagsScroll 35s linear infinite;
          will-change: transform;
        }
        .flags-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </main>
  );
}

type Locale = 'en' | 'ar';

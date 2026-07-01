'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

type Locale = 'en' | 'ar';

const members = [
  {
    img: '/Founders/Hamid-AL-Naimiy.jpg',
    en: {
      name: 'Prof. Hamid M.K. Al-Naimiy',
      role: 'President of the University of Sharjah, UAE',
      bio: 'Professor of Astrophysics, University of Sharjah. Founder and President of the Arab Union for Astronomy and Space Sciences.',
      phone: '+971 50 7076111 / +971 6 505303',
      email: 'alnaimiy1@gmail.com',
    },
    ar: {
      name: 'أ.د. حميد محمد خليفة النعيمي',
      role: 'رئيس جامعة الشارقة، الإمارات العربية المتحدة',
      bio: 'أستاذ الفيزياء الفلكية في جامعة الشارقة. مؤسس ورئيس الاتحاد العربي لعلوم الفضاء والفلك.',
      phone: '+971 50 7076111 / +971 6 505303',
      email: 'alnaimiy1@gmail.com',
    },
  },
  {
    img: '/awni-Kh.jpg',
    en: {
      name: 'Dr. Awni Mohammad Al-Khasawneh',
      role: 'Executive Director, AW-ROAD & Arab-LOAD',
      bio: 'General Director of the Regional Center for Space Science and Technology Education for Western Asia / United Nations.',
      phone: '+962 7 9507 0941',
      email: 'kawni@yahoo.com',
    },
    ar: {
      name: 'د. عوني محمد الخصاونة',
      role: 'المدير التنفيذي، AW-ROAD و Arab-LOAD',
      bio: 'المدير العام للمركز الإقليمي لتعليم علوم وتكنولوجيا الفضاء لغرب آسيا / الأمم المتحدة.',
      phone: '+962 7 9507 0941',
      email: 'kawni@yahoo.com',
    },
  },
  {
    img: '/Founders/Kevin-Govender.jpg',
    en: {
      name: 'Mr. Kevin Govender',
      role: 'Director, IAU Office of Astronomy for Development',
      bio: 'Kevin began work at the OAD on 1st March 2011 as its first Director. He has extensive experience using astronomy for development during his previous position as the Manager of the SALT Collateral Benefits Programme at the South African Astronomical Observatory.',
      phone: '+27 (0) 21 460 9350',
      email: 'kg@astro4dev.org',
    },
    ar: {
      name: 'السيد كيفن جوفندر',
      role: 'مدير مكتب الفلك من أجل التنمية، الاتحاد الفلكي الدولي',
      bio: 'بدأ كيفن العمل في مكتب OAD في الأول من مارس 2011 بوصفه مديره الأول. يمتلك خبرة واسعة في توظيف الفلك لخدمة التنمية من خلال عمله السابق في مرصد جنوب أفريقيا الفلكي.',
      phone: '+27 (0) 21 460 9350',
      email: 'kg@astro4dev.org',
    },
  },
  {
    img: '/Founders/Haik-Harkuty.jpg',
    en: {
      name: 'Dr. Haik Harutyunyan',
      role: 'Director, Byurakan Astrophysical Observatory',
      bio: 'Founding member (1999) and Co-President (2002) of ArAS. Leading research associate and Director of Byurakan Astrophysical Observatory (BAO) since 2003. Deputy Director of BAO on science (1986–2000).',
      phone: '+374-10-26-37-97',
      email: '',
    },
    ar: {
      name: 'د. هايك هاروتيونيان',
      role: 'مدير مرصد بيوراكان الفيزيائي الفلكي',
      bio: 'عضو مؤسس (1999) ورئيس مشارك (2002) لـ ArAS. باحث رئيسي ومدير مرصد بيوراكان الفيزيائي الفلكي منذ عام 2003.',
      phone: '+374-10-26-37-97',
      email: '',
    },
  },
  {
    img: '/Founders/Jamal-Mimouni.jpg',
    en: {
      name: 'Prof. Jamal Mimouni',
      role: 'AUASS Vice President',
      bio: 'President of Al-Sheara Astronomical Society. Director of Graduate Study Program in Astrophysics at Constantine University, Algeria.',
      phone: '',
      email: 'jamalmimouni@yahoo.com',
    },
    ar: {
      name: 'أ.د. جمال ميموني',
      role: 'نائب رئيس الاتحاد العربي لعلوم الفضاء والفلك',
      bio: 'رئيس جمعية الشعرى الفلكية. مدير برنامج الدراسات العليا في الفيزياء الفلكية بجامعة قسنطينة، الجزائر.',
      phone: '',
      email: 'jamalmimouni@yahoo.com',
    },
  },
  {
    img: '/Founders/Shawqi Al-Dallal.jpg',
    en: {
      name: 'Prof. Shawqi Al-Dallal',
      role: 'AUASS Vice President',
      bio: 'Professor of Physics and President of the Bahrain Astronomical Society. Dean of Scientific Research at Al-Ahlia University of Bahrain.',
      phone: '',
      email: 'shaldallal@gmail.com',
    },
    ar: {
      name: 'أ.د. شوقي الدلال',
      role: 'نائب رئيس الاتحاد العربي لعلوم الفضاء والفلك',
      bio: 'أستاذ الفيزياء ورئيس الجمعية الفلكية البحرينية. عميد البحث العلمي في جامعة الأهلية بالبحرين.',
      phone: '',
      email: 'shaldallal@gmail.com',
    },
  },
  {
    img: '/Founders/MickaelianAreg.jpg',
    en: {
      name: 'Prof. Areg Mickaelian',
      role: 'Director, IAU South West Asia Regional Office',
      bio: 'Director of the IAU South West Asia Regional Office of Astronomy for Development. Researcher at the Byurakan Astrophysical Observatory.',
      phone: '',
      email: '',
    },
    ar: {
      name: 'أ.د. أريج ميكاليان',
      role: 'مدير المكتب الإقليمي للاتحاد الفلكي الدولي لجنوب غرب آسيا',
      bio: 'مدير المكتب الإقليمي للاتحاد الفلكي الدولي لجنوب غرب آسيا. باحث في مرصد بيوراكان الفيزيائي الفلكي.',
      phone: '',
      email: '',
    },
  },
  {
    img: '/Founders/Hajjar-Roger.jpg',
    en: {
      name: 'Dr. Roger Hajjar',
      role: 'Steering Committee Member',
      bio: 'Member of the AW-ROAD Steering Committee representing the Lebanese astronomical community.',
      phone: '',
      email: '',
    },
    ar: {
      name: 'د. روجر حجار',
      role: 'عضو اللجنة التوجيهية',
      bio: 'عضو في اللجنة التوجيهية لـ AW-ROAD يمثل المجتمع الفلكي اللبناني.',
      phone: '',
      email: '',
    },
  },
  {
    img: '/Founders/Suleiman-Baraka.jpg',
    en: {
      name: 'Dr. Suleiman Baraka',
      role: 'Steering Committee Member',
      bio: 'Member of the AW-ROAD Steering Committee contributing to the advancement of astronomy in the Arab region.',
      phone: '',
      email: '',
    },
    ar: {
      name: 'د. سليمان بركة',
      role: 'عضو اللجنة التوجيهية',
      bio: 'عضو في اللجنة التوجيهية لـ AW-ROAD يساهم في تطوير علم الفلك في المنطقة العربية.',
      phone: '',
      email: '',
    },
  },
  {
    img: '/Founders/al-shidhani.jpg',
    en: {
      name: 'Dr. Saleh Al-Shidhani',
      role: 'Steering Committee Member',
      bio: 'Member of the AW-ROAD Steering Committee representing Oman and the Gulf astronomical community.',
      phone: '',
      email: '',
    },
    ar: {
      name: 'د. صالح الشيذاني',
      role: 'عضو اللجنة التوجيهية',
      bio: 'عضو في اللجنة التوجيهية لـ AW-ROAD يمثل عُمان والمجتمع الفلكي الخليجي.',
      phone: '',
      email: '',
    },
  },
];

export default function SteeringCommitteePage() {
  const { locale } = useParams<{ locale: Locale }>();
  const isRtl = locale === 'ar';
  const ff = isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif';

  return (
    <main style={{ background: '#06080F', minHeight: '100vh', color: '#EEF0F8', fontFamily: ff }} dir={isRtl ? 'rtl' : 'ltr'}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '110px 28px 70px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(79,126,255,0.13) 0%, transparent 70%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B' }}>
            {isRtl ? '— اللجنة التوجيهية —' : '— Steering Committee —'}
          </span>
          <h1 style={{
            marginTop: 16,
            fontSize: 'clamp(28px, 5vw, 50px)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #fff 0%, #A78BFA 60%, #4F7EFF 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            filter: 'drop-shadow(0 0 24px rgba(167,139,250,0.35))',
            fontFamily: ff,
          }}>
            {isRtl ? 'اللجنة التوجيهية' : 'Steering Committee'}
          </h1>
          <p style={{ marginTop: 16, fontSize: 15, color: '#6B7A9F', lineHeight: 1.8, fontFamily: ff }}>
            {isRtl
              ? 'تضم اللجنة التوجيهية لـ AW-ROAD نخبة من علماء الفلك والمتخصصين من مختلف أنحاء العالم العربي والمجتمع الفلكي الدولي.'
              : 'The AW-ROAD Steering Committee brings together distinguished astronomers and specialists from across the Arab world and the international astronomical community.'}
          </p>
        </div>
      </section>

      {/* ── Members Grid ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {members.map((m, i) => {
            const data = isRtl ? m.ar : m.en;
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(13,17,32,0.7)',
                  border: '1px solid rgba(79,126,255,0.12)',
                  borderRadius: 18,
                  padding: '28px 24px',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = '1px solid rgba(79,126,255,0.35)';
                  el.style.boxShadow = '0 0 36px rgba(79,126,255,0.12)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = '1px solid rgba(79,126,255,0.12)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Photo + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
                    overflow: 'hidden',
                    border: '2px solid rgba(79,126,255,0.3)',
                    boxShadow: '0 0 20px rgba(79,126,255,0.2)',
                  }}>
                    <Image src={m.img} alt={data.name} width={72} height={72} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: '#EEF0F8', lineHeight: 1.4, fontFamily: ff }}>{data.name}</div>
                    <div style={{ fontSize: 12, color: '#A78BFA', marginTop: 4, lineHeight: 1.4, fontFamily: ff }}>{data.role}</div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ fontSize: 13, color: '#6B7A9F', lineHeight: 1.9, margin: 0, fontFamily: ff }}>{data.bio}</p>

                {/* Contact */}
                {(data.phone || data.email) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid rgba(79,126,255,0.08)', paddingTop: 14 }}>
                    {data.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6B7A9F', fontFamily: ff }}>
                        <span>📞</span> {data.phone}
                      </div>
                    )}
                    {data.email && (
                      <a href={`mailto:${data.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#4F7EFF', textDecoration: 'none', fontFamily: ff }}>
                        <span>✉️</span> {data.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Institutions ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 120px' }}>
        <div style={{
          background: 'rgba(13,17,32,0.7)',
          border: '1px solid rgba(79,126,255,0.12)',
          borderRadius: 20,
          padding: '48px 48px',
          backdropFilter: 'blur(16px)',
        }}>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B' }}>
              {isRtl ? '— المؤسسات المشاركة —' : '— Institutions Involved —'}
            </span>
            <h2 style={{
              marginTop: 14,
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              fontFamily: ff,
            }}>
              {isRtl ? 'المؤسسات المشاركة' : 'Institutions Involved'}
            </h2>
            <p style={{ marginTop: 12, fontSize: 14, color: '#6B7A9F', lineHeight: 1.8, fontFamily: ff }}>
              {isRtl
                ? 'تشارك المؤسسات الأردنية التالية في إدارة وتشغيل AW-ROAD:'
                : 'The following Jordanian institutions are involved in the administration and operation of the AW-ROAD:'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700, margin: '0 auto' }}>
            {[
              {
                num: '01',
                en: 'The Arab Union for Astronomy and Space Sciences (AUASS)',
                ar: 'الاتحاد العربي لعلوم الفضاء والفلك (AUASS)',
              },
              {
                num: '02',
                en: 'The Regional Centre for Space Science and Technology Education for Western Asia (RCSSTE-WE)',
                ar: 'المركز الإقليمي لتعليم علوم وتكنولوجيا الفضاء لغرب آسيا (RCSSTE-WE)',
              },
              {
                num: '03',
                en: 'The Jordanian Astronomical Society (JAS)',
                ar: 'الجمعية الفلكية الأردنية (JAS)',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '20px 24px',
                  borderRadius: 14,
                  border: '1px solid rgba(79,126,255,0.1)',
                  background: 'rgba(79,126,255,0.04)',
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = '1px solid rgba(79,126,255,0.3)';
                  el.style.background = 'rgba(79,126,255,0.08)';
                  el.style.boxShadow = '0 0 24px rgba(79,126,255,0.1)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = '1px solid rgba(79,126,255,0.1)';
                  el.style.background = 'rgba(79,126,255,0.04)';
                  el.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  fontSize: 22,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #4F7EFF, #A78BFA)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  flexShrink: 0,
                  filter: 'drop-shadow(0 0 8px rgba(79,126,255,0.5))',
                  fontFamily: 'Inter, sans-serif',
                }}>{item.num}</span>
                <span style={{ fontSize: 14.5, color: '#C8D0E8', lineHeight: 1.6, fontFamily: ff }}>
                  {isRtl ? item.ar : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

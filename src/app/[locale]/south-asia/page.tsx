'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const t = {
  en: {
    eyebrow: '— Regional Office —',
    title: 'South West Asia Regional Office',
    p: [
      "The International Astronomical Union's (IAU) Office of Astronomy for Development (OAD) has established new coordinating offices in Armenia, Colombia, Jordan, Nigeria and Portugal. Supporting the use of astronomy as a tool for development in specific regions and languages, the new partnerships form part of the IAU's decadal strategic plan — which aims to realise the societal benefits of astronomy.",
      "The agreements were signed at the Hawai'i Convention Centre in Honolulu, Hawai'i, during the IAU's triennial General Assembly. The final signatures were received during a media event on Thursday 13 August 2015.",
      "The five new offices will perform two important functions. Regional offices will coordinate astronomy for development activities in nearby countries, whilst language expertise centres will deal with language and/or cultural aspects. Each of the offices will be hosted by a local institution or consortium of institutes and supported in their efforts by regional partners.",
    ],
    listTitle: 'The new coordinating offices of astronomy for development are as follows:',
    list: [
      'The South West Asian Regional Office, hosted at the Byurakan Astrophysical Observatory (BAO) in Armenia.',
      'The Andean Regional Office, hosted at three collaborating institutions: Universidad de Los Andes (Colombia), Parque Explora-Planetario de Medellín (Colombia), and Sociedad Chilena de Astronomía (Chile).',
      'The Arab Regional Office and Arabic Language Expertise Centre, hosted by the Arab Union for Astronomy and Space Sciences and located at the United Nations Regional Centre for Space Science and Technology Education in Jordan.',
      'The West African Regional Office, hosted at the Centre for Basic Space Science (CBSS), National Space Research and Development Agency (NASRDA) in Nigeria.',
      'The Portuguese Language Expertise Centre, hosted at Núcleo Interactivo de Astronomia (NUCLIO), in collaboration with the Institute of Astrophysics and Space Sciences in Portugal.',
    ],
    p2: [
      "Together with existing offices around the world — the East Asian Regional Office and Chinese Language Expertise Centre in China; the East African Regional Office in Ethiopia; the South East Asian Regional Office in Thailand; and the Southern African Regional Office in Zambia — the OAD now comprises a network of eight regional offices and three language expertise centres.",
      "The newly signed agreements follow the IAU's Announcement of Opportunity, which remains open to proposals for new regional offices and language expertise centres. For more information on OAD offices and activities, including the Call for Proposals for projects relating to the OAD's three main focus areas (universities & research, children & schools, and the public), please visit www.astro4dev.org.",
    ],
    moreInfo: 'More Information',
    info: [
      "The IAU is the international astronomical organisation that brings together more than 10,000 professional astronomers from almost 100 countries. Its mission is to promote and safeguard the science of astronomy in all its aspects through international cooperation. The IAU also serves as the internationally recognised authority for assigning designations to celestial bodies and the surface features on them. Founded in 1919, the IAU is the world's largest professional body for astronomers.",
      "The IAU established the Office of Astronomy for Development (OAD) in partnership with the South African National Research Foundation (NRF). The OAD is tasked with the implementation of the IAU Strategic Plan, including the establishment of regional offices and three astronomy for development task forces. The OAD coordinates an annual open Call for Proposals seeking innovative projects for each of the task forces: Universities and Research (TF1); Children and Schools (TF2); and Public Outreach (TF3).",
    ],
    contactsTitle: 'Contacts',
    contacts: [
      { name: 'Kevin Govender', role: 'Director, IAU Office of Astronomy for Development (OAD)', loc: 'Cape Town, South Africa', email: 'kg@astro4dev.org' },
      { name: 'Piero Benvenuti', role: 'Assistant General Secretary, International Astronomical Union', loc: 'Paris, France', email: 'piero.benvenuti@unipd.it' },
      { name: 'Professor Hamid M.K. AL-Naimiy', role: 'President of Arab Union for Astronomy and Space Sciences', loc: '', email: 'alnaimiy1@gmail.com' },
      { name: 'Dr. Awni Al-Khasawneh', role: 'AUASS General Secretary & General Director of Royal Jordanian Geographical Center', loc: '', email: 'kawni@yahoo.com' },
      { name: 'Rosa Doran', role: 'President of Executive Council: NUCLIO', loc: '', email: 'rosa.doran@gmail.com' },
      { name: 'Areg Mickaelian', role: 'Director, IAU South West Asia Regional Office of Astronomy for Development, Byurakan Astrophysical Observatory', loc: '', email: 'aregmick@yahoo.com' },
      { name: 'Bonaventure Okere', role: 'The NASRDA-Centre for Basic Space Science', loc: 'Nsukka, Nigeria', email: 'ibokere2001@yahoo.com' },
      { name: 'Jaime E. Forero-Romero', role: 'Universidad de Los Andes', loc: 'Colombia', email: 'je.forero@uniandes.edu.co' },
      { name: 'Lars Lindberg Christensen', role: 'IAU Press Officer', loc: 'Garching bei München, Germany', email: 'lars@eso.org' },
    ],
  },
  ar: {
    eyebrow: '— مكتب إقليمي —',
    title: 'المكتب الإقليمي لجنوب غرب آسيا',
    p: [
      'أنشأ مكتب الاتحاد الفلكي الدولي لعلم الفلك من أجل التنمية (OAD) مكاتب تنسيقية جديدة في أرمينيا وكولومبيا والأردن ونيجيريا والبرتغال. ودعماً لاستخدام علم الفلك كأداة للتنمية في مناطق ولغات محددة، تأتي هذه الشراكات الجديدة ضمن الخطة الاستراتيجية العشرية للاتحاد الفلكي الدولي، التي تهدف إلى تحقيق الفوائد المجتمعية لعلم الفلك.',
      'تم توقيع الاتفاقيات في مركز هاواي للمؤتمرات في هونولولو، هاواي، خلال الجمعية العامة الثلاثية للاتحاد الفلكي الدولي. وتم استلام التوقيعات النهائية خلال فعالية إعلامية يوم الخميس 13 آب/أغسطس 2015.',
      'ستؤدي المكاتب الخمسة الجديدة وظيفتين رئيسيتين. ستنسق المكاتب الإقليمية أنشطة علم الفلك من أجل التنمية في الدول المجاورة، بينما ستتعامل مراكز خبرة اللغة مع الجوانب اللغوية و/أو الثقافية. وستستضيف كل مكتب مؤسسة محلية أو اتحاد من المؤسسات، وسيتم دعمها في جهودها من قبل شركاء إقليميين.',
    ],
    listTitle: 'المكاتب التنسيقية الجديدة لعلم الفلك من أجل التنمية هي كالتالي:',
    list: [
      'المكتب الإقليمي لجنوب غرب آسيا، ويستضيفه مرصد بيوراكان للفيزياء الفلكية (BAO) في أرمينيا.',
      'مكتب الأنديز الإقليمي، وتستضيفه ثلاث مؤسسات متعاونة: جامعة لوس أنديس (كولومبيا)، ومتنزه إكسبلورا - بلانيتاريو دي ميديلين (كولومبيا)، والجمعية الفلكية التشيلية (تشيلي).',
      'المكتب الإقليمي للعالم العربي ومركز خبرة اللغة العربية، ويستضيفه الاتحاد العربي لعلوم الفضاء والفلك ويقع في المركز الإقليمي للأمم المتحدة لتعليم علوم وتكنولوجيا الفضاء في الأردن.',
      'المكتب الإقليمي لغرب إفريقيا، ويستضيفه مركز علوم الفضاء الأساسية (CBSS) التابع للوكالة الوطنية لبحوث وتطوير الفضاء (NASRDA) في نيجيريا.',
      'مركز خبرة اللغة البرتغالية، ويستضيفه مركز نوكليو التفاعلي لعلم الفلك (NUCLIO)، بالتعاون مع معهد الفيزياء الفلكية وعلوم الفضاء في البرتغال.',
    ],
    p2: [
      'إلى جانب المكاتب القائمة حول العالم — المكتب الإقليمي لشرق آسيا ومركز خبرة اللغة الصينية في الصين؛ والمكتب الإقليمي لشرق إفريقيا في إثيوبيا؛ والمكتب الإقليمي لجنوب شرق آسيا في تايلاند؛ والمكتب الإقليمي للجنوب الأفريقي في زامبيا — أصبحت شبكة مكتب OAD تضم الآن ثمانية مكاتب إقليمية وثلاثة مراكز خبرة لغوية.',
      'تأتي الاتفاقيات الموقعة حديثاً عقب إعلان الفرصة الصادر عن الاتحاد الفلكي الدولي، والذي لا يزال مفتوحاً لتلقي مقترحات لمكاتب إقليمية ومراكز خبرة لغوية جديدة. لمزيد من المعلومات حول مكاتب وأنشطة OAD، بما في ذلك دعوة تقديم المقترحات للمشاريع المتعلقة بمجالات تركيز OAD الثلاثة الرئيسية (الجامعات والبحث العلمي، الأطفال والمدارس، والجمهور)، يرجى زيارة www.astro4dev.org.',
    ],
    moreInfo: 'مزيد من المعلومات',
    info: [
      'الاتحاد الفلكي الدولي هو المنظمة الفلكية الدولية التي تجمع أكثر من 10,000 عالم فلك محترف من نحو 100 دولة. تتمثل مهمته في تعزيز وحماية علم الفلك بجميع جوانبه من خلال التعاون الدولي. كما يُعد الاتحاد الفلكي الدولي الجهة المعترف بها دولياً لتسمية الأجرام السماوية وملامح سطحها. تأسس عام 1919، وهو أكبر هيئة مهنية لعلماء الفلك في العالم.',
      'أسس الاتحاد الفلكي الدولي مكتب الفلك من أجل التنمية (OAD) بالشراكة مع المؤسسة الوطنية للبحوث في جنوب أفريقيا (NRF). ويُكلَّف المكتب بتنفيذ الخطة الاستراتيجية للاتحاد، بما في ذلك إنشاء المكاتب الإقليمية وثلاث فرق عمل لعلم الفلك من أجل التنمية. وينسق المكتب دعوة سنوية مفتوحة لتقديم المقترحات للمشاريع المبتكرة لكل من فرق العمل: الجامعات والبحث العلمي (TF1)؛ الأطفال والمدارس (TF2)؛ والتوعية العامة (TF3).',
    ],
    contactsTitle: 'جهات الاتصال',
    contacts: [
      { name: 'كيفن جوفندر', role: 'مدير مكتب الاتحاد الفلكي الدولي لعلم الفلك من أجل التنمية (OAD)', loc: 'كيب تاون، جنوب أفريقيا', email: 'kg@astro4dev.org' },
      { name: 'بييرو بنفينوتي', role: 'الأمين العام المساعد، الاتحاد الفلكي الدولي', loc: 'باريس، فرنسا', email: 'piero.benvenuti@unipd.it' },
      { name: 'البروفيسور حميد م. ك. النعيمي', role: 'رئيس الاتحاد العربي لعلوم الفضاء والفلك', loc: '', email: 'alnaimiy1@gmail.com' },
      { name: 'د. عوني الخصاونة', role: 'الأمين العام للاتحاد العربي لعلوم الفضاء والفلك والمدير العام للمركز الجغرافي الملكي الأردني', loc: '', email: 'kawni@yahoo.com' },
      { name: 'روزا دوران', role: 'رئيسة المجلس التنفيذي: NUCLIO', loc: '', email: 'rosa.doran@gmail.com' },
      { name: 'أريغ ميكائيليان', role: 'مدير المكتب الإقليمي لجنوب غرب آسيا لعلم الفلك من أجل التنمية، مرصد بيوراكان للفيزياء الفلكية', loc: '', email: 'aregmick@yahoo.com' },
      { name: 'بونافنتشر أوكيري', role: 'مركز علوم الفضاء الأساسية - NASRDA', loc: 'نسوكا، نيجيريا', email: 'ibokere2001@yahoo.com' },
      { name: 'خايمي إي. فوريرو روميرو', role: 'جامعة لوس أنديس', loc: 'كولومبيا', email: 'je.forero@uniandes.edu.co' },
      { name: 'لارس ليندبرغ كريستنسن', role: 'المسؤول الإعلامي للاتحاد الفلكي الدولي', loc: 'غارشينغ بي مونيخ، ألمانيا', email: 'lars@eso.org' },
    ],
  },
};

export default function SouthAsiaPage() {
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
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8A84B', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.eyebrow}
            </span>
            <h1 style={{ marginTop: 14, fontSize: 'clamp(26px, 4.2vw, 40px)', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
              {tx.title}
            </h1>
          </div>

          <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 36, border: '1px solid rgba(79,126,255,0.15)', boxShadow: '0 0 40px rgba(79,126,255,0.1)' }}>
            <img src="/south_Asia.webp" alt={tx.title} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 360 }} />
          </div>

          <div style={{ background: 'rgba(13,17,32,0.6)', border: '1px solid rgba(79,126,255,0.1)', borderRadius: 16, padding: '32px 36px', backdropFilter: 'blur(12px)' }}>
            <div style={{ fontSize: 14, lineHeight: 2, color: '#9CA3AF', fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif', textAlign: isRtl ? 'right' : 'left' }}>
              {tx.p.map((para, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{para}</p>
              ))}

              <p style={{ marginBottom: 12, fontWeight: 700, color: '#EEF0F8' }}>{tx.listTitle}</p>
              <ul style={{ marginBottom: 16, paddingInlineStart: 22 }}>
                {tx.list.map((item, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>{item}</li>
                ))}
              </ul>

              {tx.p2.map((para, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{para}</p>
              ))}

              <p style={{ marginTop: 28, marginBottom: 12, fontWeight: 700, color: '#A78BFA', fontSize: 15 }}>{tx.moreInfo}</p>
              {tx.info.map((para, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{para}</p>
              ))}

              <p style={{ marginTop: 28, marginBottom: 14, fontWeight: 700, color: '#A78BFA', fontSize: 15 }}>{tx.contactsTitle}</p>
              <div style={{ display: 'grid', gap: 14 }}>
                {tx.contacts.map((c, i) => (
                  <div key={i} style={{ padding: '12px 16px', background: 'rgba(79,126,255,0.04)', borderRadius: 10, border: '1px solid rgba(79,126,255,0.08)' }}>
                    <div style={{ fontWeight: 700, color: '#EEF0F8', fontSize: 13.5 }}>{c.name}</div>
                    <div style={{ fontSize: 12.5, color: '#9CA3AF', marginTop: 3 }}>{c.role}</div>
                    {c.loc && <div style={{ fontSize: 12, color: '#6B7A9F', marginTop: 2 }}>{c.loc}</div>}
                    <div style={{ fontSize: 12, color: '#A78BFA', marginTop: 4, direction: 'ltr', textAlign: isRtl ? 'right' : 'left' }}>{c.email}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

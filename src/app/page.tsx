// 정형외과 "Axis" 홈 — 설계도면 다크 히어로(55/45 분할)와 인체 부위맵이 곧
// 내비게이션이다: 타일 그리드 없음. 아래로 4개 대형 수치 데이터 스트립,
// 좌측 고정(sticky) 인덱스 + 우측 정의 패널, 최신 글은 카드가 아니라 리더보드
// 테이블, 마지막은 정사각 오렌지 버튼의 다크 CTA 밴드.
import Link from 'next/link';
import { SITE } from '@/lib/site.config';
import { getLatestArticles } from '@/lib/articles';
import { generateAllKeywords } from '@/lib/keywords';
import { SpecialtyIcon } from '@/app/components/icons';
import { BlueprintGrid } from '@/app/components/decor/BlueprintGrid';
import { BodyMap, BODY_POINTS } from '@/app/components/decor/BodyMap';

export const revalidate = 21600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE.domain}`;

// 분석 대상 지역 수 — 키워드 생성기에서 실제 값을 계산한다.
let REGION_COUNT = 470;
try {
  REGION_COUNT = new Set(generateAllKeywords().map(k => k.regionSlug)).size;
} catch { /* keep fallback */ }

const SPECIALTY_COUNT = SITE.specialties.filter(s => s.slug).length;

const STATS = [
  { value: String(REGION_COUNT), en: 'REGIONS', ko: '분석 대상 지역' },
  { value: '3', en: 'REVIEW PLATFORMS', ko: '네이버·카카오·구글 교차검증' },
  { value: String(SPECIALTY_COUNT), en: 'CONDITIONS', ko: '부위·치료별 진료 항목' },
  { value: '4', en: 'DATA SOURCES', ko: '리뷰 3곳 + 심평원 공식 정보' },
];

// 부위가 아닌 치료 프로그램 — 히어로 좌측의 인덱스 리스트로 노출한다.
const PROGRAMS = ['manual-therapy', 'eswt', 'car-accident'];

const PIPELINE = [
  { no: '01', title: '수집', body: '네이버 플레이스 방문자 리뷰, 카카오맵·구글맵 평점을 지역 단위로 수집합니다.' },
  { no: '02', title: '교차 검증', body: '같은 병원을 세 플랫폼에서 찾아 평점과 리뷰 수를 나란히 비교합니다.' },
  { no: '03', title: '공식 정보 확인', body: '건강보험심사평가원에 등록된 정형외과 전문의 수와 진료과목을 확인합니다.' },
  { no: '04', title: '작성 원칙', body: '수집한 데이터만으로 씁니다. 데이터에 없는 경력·수상·효과는 쓰지 않습니다.' },
];

export default async function HomePage() {
  let latest: Awaited<ReturnType<typeof getLatestArticles>> = [];
  try { latest = await getLatestArticles(8); } catch { /* not seeded yet */ }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.siteName,
      url: baseUrl,
      description: SITE.siteDescription,
      inLanguage: 'ko',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.siteName,
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo-512.png` },
    },
  ];

  return (
    <div>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── 다크 히어로: 좌 텍스트 55 / 우 인체 부위맵 45 ── */}
      <section className="relative overflow-hidden bg-surface-inverse text-ink-onDark">
        <BlueprintGrid />

        <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-16 lg:pt-20 lg:pb-20 grid gap-14 lg:gap-10 lg:grid-cols-[11fr_9fr]">
          {/* 좌: 카피 + CTA + 치료 프로그램 인덱스 */}
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2.5 border border-line-inverse rounded-none px-3.5 py-1.5 text-label font-mono uppercase text-ink-onDark/80">
              <span className="w-1.5 h-1.5 bg-accent-500" aria-hidden />
              {SITE.trustBadge}
            </p>

            <h1 className="mt-8 text-display-2 sm:text-display-1 font-black text-white">
              아픈 부위에서 시작하는
              <br />
              <span className="text-brand-300">정형외과 데이터</span>
            </h1>

            <p className="mt-6 text-ink-onDark/70 leading-relaxed">
              {SITE.siteDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/s/general"
                className="inline-flex items-center gap-2 rounded-none bg-accent-500 px-7 py-3.5 font-bold text-white transition-colors hover:bg-accent-600"
              >
                지역별 정형외과 보기
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-none border border-ink-onDark/30 px-7 py-3.5 font-semibold text-ink-onDark transition-colors hover:border-accent-400 hover:text-accent-300"
              >
                치료 비용 데이터
              </Link>
            </div>

            {/* 치료 프로그램 인덱스 — 부위맵이 못 담는 치료 단위 항목 */}
            <div className="mt-12 border-t border-line-inverse">
              <p className="pt-4 text-label font-mono uppercase text-accent-400">Treatment Index — 치료 프로그램</p>
              <ul className="mt-2">
                {PROGRAMS.map((slug, i) => {
                  const s = SITE.specialties.find(d => d.slug === slug);
                  if (!s) return null;
                  return (
                    <li key={slug} className="border-b border-line-inverse">
                      <Link href={`/s/${slug}`} className="group flex items-center gap-4 py-3">
                        <span className="font-mono text-sm tabular-nums text-ink-onDark/50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <SpecialtyIcon slug={slug} className="w-5 h-5 text-brand-300" />
                        <span className="font-bold text-white group-hover:text-accent-300 transition-colors">{s.name}</span>
                        <span className="hidden sm:block text-xs text-ink-onDark/50 truncate">{s.blurb}</span>
                        <span className="ml-auto text-ink-onDark/40 group-hover:text-accent-400 transition-colors" aria-hidden>→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* 우: 인체 부위맵 = 1차 내비게이션 */}
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-onDark/40">
              FIG.01 — Human Frame / Front View
            </p>
            <div className="relative mx-auto mt-3 h-[480px] sm:h-[560px] aspect-[3/7]">
              <BodyMap className="absolute inset-0 w-full h-full text-brand-300" />

              {BODY_POINTS.map(p => {
                const spec = SITE.specialties.find(s => s.slug === p.slug);
                const pos =
                  p.side === 'right'
                    ? { left: `${p.x}%`, top: `${p.y}%` }
                    : { right: `${100 - p.x}%`, top: `${p.y}%` };
                const marker = (
                  <span className="flex-none border border-accent-500/40 p-[3px]" aria-hidden>
                    <span className="block w-2 h-2 bg-accent-500" />
                  </span>
                );
                const leader = <span className="w-4 h-px bg-ink-onDark/30" aria-hidden />;
                const text = (
                  <span className="bg-surface-inverse/90 px-1.5 py-0.5 leading-tight">
                    <span className="block whitespace-nowrap text-[13px] font-bold text-white transition-colors group-hover:text-accent-300">
                      {p.label}
                    </span>
                    <span className="block whitespace-nowrap text-[10px] text-ink-onDark/60">
                      {spec?.name ?? ''}
                    </span>
                  </span>
                );
                return (
                  <Link
                    key={p.slug}
                    href={`/s/${p.slug}`}
                    className="group absolute flex -translate-y-1/2 items-center gap-1.5"
                    style={pos}
                  >
                    {p.side === 'right' ? (
                      <>{marker}{leader}{text}</>
                    ) : (
                      <>{text}{leader}{marker}</>
                    )}
                  </Link>
                );
              })}

              {/* 도면 타이틀 블록 자리의 교통사고 배지 */}
              <Link
                href="/s/car-accident"
                className="group absolute bottom-0 -right-2 sm:-right-10 border border-accent-500 bg-surface-inverse/95 px-4 py-3"
              >
                <span className="block text-label font-mono uppercase text-accent-400">Car Accident</span>
                <span className="mt-1 block text-sm font-bold text-white group-hover:text-accent-300 transition-colors">
                  교통사고 치료 · 자동차보험
                </span>
                <span className="mt-0.5 block text-[11px] text-ink-onDark/60">본인부담 0원 — 접수번호로 시작</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 데이터 스트립: 대형 tabular 수치 4개 ── */}
        <div className="relative border-t border-line-inverse">
          <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.en}
                className={`px-5 py-7 sm:px-7 sm:py-9 border-line-inverse ${i > 0 ? 'border-l' : ''} ${i === 2 ? 'max-lg:border-l-0' : ''} ${i >= 2 ? 'max-lg:border-t' : ''}`}
              >
                <dd className="text-5xl sm:text-6xl font-black tabular-nums text-white leading-none">
                  {s.value}
                </dd>
                <dt className="mt-3">
                  <span className="block text-label font-mono uppercase text-accent-400">{s.en}</span>
                  <span className="mt-1.5 block text-sm text-ink-onDark/60">{s.ko}</span>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 부위별 질환: 좌측 sticky 인덱스 + 우측 정의 패널 ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <p className="text-label font-mono uppercase text-accent-600">Body Index</p>
        <h2 className="mt-3 text-display-2 font-black text-ink">부위별 질환·치료 정의</h2>
        <p className="mt-3 text-ink-soft max-w-2xl">
          각 항목 페이지에서 지역별 병원 리뷰·전문의 데이터를 확인할 수 있습니다.
        </p>

        <div className="mt-10 sm:grid sm:grid-cols-[220px_1fr] sm:gap-12">
          {/* 좌: sticky 인덱스 */}
          <nav className="hidden sm:block sm:sticky sm:top-20 self-start border-t border-line-strong" aria-label="부위별 질환 인덱스">
            <ul className="text-sm">
              {SITE.specialties.map((s, i) => {
                const slug = s.slug || 'general';
                return (
                  <li key={slug} className="border-b border-line">
                    <a
                      href={`#def-${slug}`}
                      className="group flex items-baseline gap-3 py-2.5 text-ink-muted hover:text-brand-700 transition-colors"
                    >
                      <span className="font-mono text-xs tabular-nums text-ink-soft group-hover:text-accent-600 transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-semibold">{s.label || s.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 우: 정의 패널 */}
          <div>
            {SITE.specialties.map((s, i) => {
              const slug = s.slug || 'general';
              return (
                <article
                  key={slug}
                  id={`def-${slug}`}
                  className="scroll-mt-24 border-t border-line-strong py-8 grid grid-cols-[3.25rem_1fr] gap-x-4"
                >
                  <span className="font-mono text-lg tabular-nums text-brand-400 leading-none pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <SpecialtyIcon slug={slug} className="w-6 h-6 text-brand-600 flex-none" />
                      <h3 className="text-lg font-extrabold text-ink">{s.label || s.name}</h3>
                    </div>
                    {s.blurb ? (
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.blurb}</p>
                    ) : null}
                    <Link
                      href={`/s/${slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-accent-600 transition-colors"
                    >
                      지역별 병원 데이터
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 데이터 파이프라인: 스펙 시트형 4단계 ── */}
      <section className="bg-surface-card border-y border-line">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <p className="text-label font-mono uppercase text-accent-600">Pipeline</p>
          <h2 className="mt-3 text-display-2 font-black text-ink">이렇게 분석합니다</h2>

          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {PIPELINE.map(step => (
              <li key={step.no} className="border-t-2 border-ink pt-4">
                <span className="font-mono text-sm tabular-nums text-accent-600">{step.no}</span>
                <h3 className="mt-2 font-extrabold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-l-4 border-brand-600 pl-4 text-sm text-ink-muted leading-relaxed max-w-2xl">
            본 사이트는 공개 데이터를 정리한 참고 자료이며, 특정 병원과 광고 계약을 맺지 않습니다.
            진단과 치료 판단은 반드시 정형외과 전문의와 상담하세요.
          </p>
        </div>
      </section>

      {/* ── 최신 분석: 리더보드 테이블 ── */}
      {latest.length > 0 ? (
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-label font-mono uppercase text-accent-600">Latest Reports</p>
              <h2 className="mt-3 text-display-2 font-black text-ink">최신 분석 리포트</h2>
            </div>
            <Link href="/s/general" className="text-sm font-bold text-brand-700 hover:text-accent-600 whitespace-nowrap transition-colors">
              전체 보기 →
            </Link>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm border-t-2 border-ink">
              <thead>
                <tr className="border-b border-line-strong">
                  <th className="py-3 pr-4 text-left text-label font-mono uppercase text-ink-soft w-12">No</th>
                  <th className="py-3 pr-4 text-left text-label font-mono uppercase text-ink-soft w-28">지역</th>
                  <th className="py-3 pr-4 text-left text-label font-mono uppercase text-ink-soft w-32">진료항목</th>
                  <th className="py-3 pr-4 text-left text-label font-mono uppercase text-ink-soft">제목</th>
                  <th className="py-3 text-right text-label font-mono uppercase text-ink-soft w-28">발행일</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((a, i) => (
                  <tr key={a.slug} className="border-b border-line hover:bg-brand-50 transition-colors">
                    <td className="py-3.5 pr-4 font-mono tabular-nums text-brand-600 font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 pr-4 font-semibold text-ink whitespace-nowrap">{a.region}</td>
                    <td className="py-3.5 pr-4 text-ink-muted whitespace-nowrap">{a.specialty}</td>
                    <td className="py-3.5 pr-4">
                      <Link href={`/${a.slug}`} className="font-bold text-ink hover:text-brand-700 transition-colors line-clamp-1">
                        {a.title}
                      </Link>
                    </td>
                    <td className="py-3.5 text-right font-mono tabular-nums text-xs text-ink-soft whitespace-nowrap">
                      <time dateTime={a.publishedAt}>
                        {new Date(a.publishedAt).toLocaleDateString('ko')}
                      </time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* ── 다크 CTA 밴드 ── */}
      <section className="relative overflow-hidden bg-surface-inverse text-ink-onDark">
        <BlueprintGrid />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <p className="text-label font-mono uppercase text-accent-400">Start Here</p>
          <h2 className="mt-4 text-display-2 font-black text-white">
            우리 동네 정형외과, 데이터로 비교하세요
          </h2>
          <p className="mt-4 text-ink-onDark/70 max-w-xl mx-auto leading-relaxed">
            리뷰 3개 플랫폼과 심평원 전문의 정보를 한 화면에서 봅니다.
          </p>
          <Link
            href="/s/general"
            className="mt-9 inline-flex items-center gap-2 rounded-none bg-accent-500 px-9 py-4 font-bold text-white transition-colors hover:bg-accent-600"
          >
            지역별 정형외과 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

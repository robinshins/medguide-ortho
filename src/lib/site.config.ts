import type { SiteConfig } from './site.types';

// 정형외과 — "Axis". Blueprint + sports lab: hard edges, hairlines, tabular numerals.
export const SITE: SiteConfig = {
  key: 'ortho',

  categoryKo: '정형외과',
  siteName: '본앤조인트',
  siteTagline: '부위별로 찾는 정형외과·통증 치료',
  siteDescription:
    '전국 정형외과를 네이버·카카오·구글 리뷰와 건강보험심사평가원 전문의 정보로 교차 분석했습니다. 도수치료, 체외충격파, 허리디스크, 무릎관절, 교통사고 치료까지 지역별로 정리했습니다.',
  trustBadge: '리뷰 3개 플랫폼 교차검증',
  domain: 'boneandjoint.co.kr',
  contactEmail: 'nosun3946@gmail.com',
  // 5개 사이트가 같은 키를 쓴다. IndexNow는 키 공유를 허용하며, 각 도메인 루트에
  // <키>.txt만 있으면 된다(public 오버레이로 배치). 다만 제출은 도메인별로 따로
  // 해야 한다 — 요청의 host는 하나이고 urlList가 전부 그 host여야 하기 때문이다.
  indexNowKey: '9153a4ab80a3c5357ff7aeffea4749af',

  specialties: [
    { name: '', slug: '', label: '정형외과 전체', blurb: '지역 정형외과를 리뷰·전문의 기준으로 한눈에' },
    { name: '도수치료', slug: 'manual-therapy', blurb: '손으로 관절·근막을 교정하는 비수술 치료' },
    { name: '체외충격파', slug: 'eswt', blurb: '충격파로 만성 건염·석회를 분해하는 비침습 치료' },
    { name: '허리디스크', slug: 'lumbar-disc', blurb: '요추 추간판 탈출증의 비수술·수술 치료' },
    { name: '목디스크', slug: 'neck-disc', blurb: '경추 추간판 탈출증과 거북목 관련 통증' },
    { name: '척추관협착증', slug: 'spinal-stenosis', blurb: '신경 통로가 좁아져 생기는 보행 시 다리 저림' },
    { name: '무릎관절', slug: 'knee', blurb: '연골연화증·반월상연골 파열·퇴행성 관절염' },
    { name: '어깨회전근개', slug: 'rotator-cuff', blurb: '오십견과 구분이 필요한 어깨 힘줄 손상' },
    { name: '족저근막염', slug: 'plantar-fasciitis', blurb: '아침 첫 발을 디딜 때 아픈 발바닥 통증' },
    { name: '손목터널증후군', slug: 'carpal-tunnel', blurb: '손저림과 야간 통증을 유발하는 정중신경 압박' },
    { name: '교통사고', slug: 'car-accident', blurb: '자동차보험으로 받는 도수치료·물리치료' },
    { name: '인공관절', slug: 'joint-replacement', blurb: '말기 관절염에서 시행하는 슬관절·고관절 치환' },
  ],

  // 정형외과 검색에는 재활의학과·신경외과·통증의학과가 섞여 들어온다.
  // 전부 실제로 같은 증상을 보는 과라 hint에 포함하되, 스크래퍼가 카테고리
  // 라인으로 한 번 거른다.
  categoryHints: ['정형외과', '재활의학과', '신경외과', '통증의학과', '마취통증'],
  clinicNameSuffixes: ['정형외과', '재활의학과', '신경외과', '병원', '의원'],

  credentialLabel: '정형외과 전문의 수',

  priceContext: {
    'manual-therapy':
      '도수치료: 실손보험 가입자는 회당 본인부담 1~3만원 수준이나, 2세대 이후 실손은 연간 횟수·한도 제한이 있습니다. 비보험 기준 회당 8~15만원. 2024년 이후 실손 심사가 강화되어 진단명과 치료 계획서가 필요한 경우가 늘었습니다.',
    eswt:
      '체외충격파: 회당 5~15만원, 보통 3~5회 시행. 건강보험은 족저근막염·석회성건염 등 일부 상병에만 급여가 적용되고 나머지는 비급여입니다.',
    'car-accident':
      '교통사고 치료: 자동차보험 적용 시 본인부담금이 없습니다. 사고 접수 번호만 있으면 도수치료·물리치료·입원까지 가능하며, 한방 병행 진료도 자동차보험 대상입니다. 합의 전에 치료를 마치는 것이 중요합니다.',
    'lumbar-disc':
      '허리디스크: 신경차단술 회당 5~15만원(급여 적용 시 본인부담 경감), 경막외 신경성형술 150~300만원, 내시경 디스크 제거술 300~600만원. 수술 전 최소 6주 이상의 보존적 치료가 권고됩니다.',
    'joint-replacement':
      '인공관절 치환술: 건강보험 급여 대상으로 한쪽 무릎 기준 본인부담 약 200~400만원(상급병실·비급여 재료 제외). 65세 이상 중증 관절염에서 시행되며 인공관절 수명은 15~20년으로 봅니다.',
  },
};

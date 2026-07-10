import { ImageResponse } from 'next/og';
import { resumeData, type ProjectItem, type WorkItem } from '@/lib/resume-data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Michael E. Marin — ML Engineer — project case study card';

// Approximations of the site's dark-theme HSL tokens (satori needs literal colors).
const BG = '#090b12'; // hsl(228 32% 5%)
const FG = '#f2f5fa'; // hsl(210 30% 96%)
const MUTED = '#99a1b3'; // hsl(220 14% 62%)
const CYAN = '#1fd9f9'; // hsl(189 95% 55%)
const VIOLET = '#8c4bf6'; // hsl(265 89% 66%)

/** Tech chips for items without a case study (all values appear in resume-data). */
const FALLBACK_TECH: Record<string, string[]> = {
  'mr-cooper-internship': ['Agentic AI', 'Azure DevOps', 'Google Cloud'],
};

export function generateStaticParams() {
  return [...resumeData.workExperience, ...resumeData.projects].map((item) => ({
    id: item.id,
  }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allItems: (WorkItem | ProjectItem)[] = [
    ...resumeData.workExperience,
    ...resumeData.projects,
  ];
  const item = allItems.find((i) => i.id === id);

  const title = item?.title ?? 'Michael E. Marin — Portfolio';
  const company = item?.company ?? '';
  const date = item?.date ?? '';
  const eyebrow = item?.caseStudy
    ? 'CASE STUDY'
    : item?.type === 'work'
      ? 'EXPERIENCE'
      : 'PORTFOLIO';
  const tech = (item?.caseStudy?.techStack ?? FALLBACK_TECH[id] ?? []).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BG,
          backgroundImage:
            'radial-gradient(760px 420px at 12% 0%, rgba(31,217,249,0.14), transparent 60%), radial-gradient(700px 420px at 92% 24%, rgba(140,75,246,0.13), transparent 60%)',
        }}
      >
        {/* Cyan → violet accent bar */}
        <div
          style={{
            display: 'flex',
            height: 10,
            width: '100%',
            backgroundImage: `linear-gradient(90deg, ${CYAN}, ${VIOLET})`,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            padding: '64px 72px 56px',
          }}
        >
          {/* Eyebrow + title + company */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 20,
                letterSpacing: 5,
                color: CYAN,
                fontWeight: 600,
              }}
            >
              <span>{eyebrow}</span>
              {date && (
                <span style={{ color: MUTED, letterSpacing: 1 }}>{date}</span>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 24,
                fontSize: title.length > 42 ? 52 : 64,
                fontWeight: 700,
                lineHeight: 1.12,
                color: FG,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            {company && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 18,
                  fontSize: 26,
                  color: MUTED,
                  maxWidth: 980,
                }}
              >
                {company}
              </div>
            )}
          </div>

          {/* Footer: identity + tech badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  backgroundImage: `linear-gradient(135deg, ${CYAN}, ${VIOLET})`,
                }}
              />
              <div style={{ display: 'flex', fontSize: 26, color: FG, fontWeight: 600 }}>
                Michael E. Marin
              </div>
              <div style={{ display: 'flex', fontSize: 26, color: MUTED }}>
                — ML Engineer
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              {tech.map((t: string) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    padding: '10px 22px',
                    borderRadius: 999,
                    border: '1px solid rgba(148,163,184,0.35)',
                    backgroundColor: 'rgba(148,163,184,0.08)',
                    color: '#c9d2e2',
                    fontSize: 21,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Michael E. Marin — ML Engineer building production AI systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const stats = [
  { value: '81%', label: 'Recall@10' },
  { value: 'NASA PACE', label: 'Kennedy Center exhibit' },
  { value: '350+', label: 'test assertions' },
  { value: "M.S. AI '27", label: 'UNT, in progress' },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #07090f 0%, #0b0e1a 55%, #101426 100%)',
          color: '#f3f5fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 8,
            background: 'linear-gradient(90deg, #22d3ee, #8b5cf6)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, color: '#22d3ee', letterSpacing: 4, textTransform: 'uppercase' }}>
            ML Engineer · Dallas, TX
          </div>
          <div style={{ fontSize: 74, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>
            Michael E. Marin
          </div>
          <div style={{ fontSize: 34, color: '#9aa3b8', marginTop: 18, maxWidth: 940 }}>
            Production AI systems — RAG pipelines, evaluation frameworks, real-time ML visualization
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 28px',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 700, color: '#22d3ee' }}>{s.value}</div>
              <div style={{ fontSize: 19, color: '#9aa3b8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

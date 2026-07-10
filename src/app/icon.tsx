import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
          borderRadius: 14,
          color: '#07090f',
          fontSize: 40,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}

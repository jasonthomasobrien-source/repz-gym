import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Repz Gym';
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
            color: '#f26522',
            letterSpacing: '0.1em',
          }}
        >
          REPZ GYM
        </div>
        <div
          style={{
            fontSize: 48,
            color: '#a8a8a8',
            marginBottom: 40,
          }}
        >
          No Glamour. Just a Great Workout.
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#6f6f6f',
          }}
        >
          Plainwell, Michigan • Since 1998
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

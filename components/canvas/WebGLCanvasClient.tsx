'use client';

import dynamic from 'next/dynamic';

const WebGLCanvas = dynamic(() => import('@/components/canvas/WebGLCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function WebGLCanvasClient() {
  return <WebGLCanvas />;
}

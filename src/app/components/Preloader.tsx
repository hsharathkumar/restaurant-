import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const config = {
  particleCount: 68,
  trailSpan: 0.34,
  durationMs: 6000,
  rotationDurationMs: 36000,
  pulseDurationMs: 5400,
  strokeWidth: 4.7,
  lissajousAmp: 24,
  lissajousAmpBoost: 6,
  lissajousAX: 3,
  lissajousBY: 4,
  lissajousPhase: 1.57,
  lissajousYScale: 0.92,
  point(progress: number, detailScale: number) {
    const t = progress * Math.PI * 2;
    const amp = config.lissajousAmp + detailScale * config.lissajousAmpBoost;
    return {
      x: 50 + Math.sin(Math.round(config.lissajousAX) * t + config.lissajousPhase) * amp,
      y: 50 + Math.sin(Math.round(config.lissajousBY) * t) * (amp * config.lissajousYScale),
    };
  },
};

function normalizeProgress(progress: number) {
  return ((progress % 1) + 1) % 1;
}

function getDetailScale(time: number) {
  const pulseProgress = (time % config.pulseDurationMs) / config.pulseDurationMs;
  const pulseAngle = pulseProgress * Math.PI * 2;
  return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
}

function getRotation(time: number) {
  return -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360;
}

function buildPath(detailScale: number, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = config.point(index / steps, detailScale);
    return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(' ');
}

function getParticle(index: number, progress: number, detailScale: number) {
  const tailOffset = index / (config.particleCount - 1);
  const point = config.point(normalizeProgress(progress - tailOffset * config.trailSpan), detailScale);
  const fade = Math.pow(1 - tailOffset, 0.56);
  return {
    x: point.x,
    y: point.y,
    radius: 0.9 + fade * 2.7,
    opacity: 0.04 + fade * 0.96,
  };
}

export function Preloader() {
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particlesRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const startedAt = performance.now();
    let animationFrameId: number;

    const render = (now: number) => {
      const time = now - startedAt;
      const progress = (time % config.durationMs) / config.durationMs;
      const detailScale = getDetailScale(time);

      if (groupRef.current) {
        groupRef.current.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`);
      }
      if (pathRef.current) {
        pathRef.current.setAttribute('d', buildPath(detailScale));
      }

      particlesRef.current.forEach((node, index) => {
        if (!node) return;
        const particle = getParticle(index, progress, detailScale);
        node.setAttribute('cx', particle.x.toFixed(2));
        node.setAttribute('cy', particle.y.toFixed(2));
        node.setAttribute('r', String(particle.radius.toFixed(2)));
        node.setAttribute('opacity', String(particle.opacity.toFixed(3)));
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-[#f5f5f5]"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ width: 'min(12vmin, 56px)', aspectRatio: '1', display: 'grid', placeItems: 'center' }}>
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <g ref={groupRef}>
            <path
              ref={pathRef}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={config.strokeWidth}
              opacity="0.1"
            />
            {Array.from({ length: config.particleCount }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => {
                  if (el) particlesRef.current[i] = el;
                }}
                fill="currentColor"
              />
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

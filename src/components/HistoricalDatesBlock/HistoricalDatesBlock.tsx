import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import styles from "./styles.module.scss";

import { LABEL_FADE, RADIUS, ROT_DUR } from "./constants";
import { HistoricalDatesBlockProps } from "./types";

import CircleSvg from "./components/CircleSvg";
import DatesDisplay from "./components/DatesDisplay";
import EventsSlider from "./components/EventsSlider";
import Nav from "./components/Nav";

import useYearsAnimation from "./hooks/useYearsAnimation";
import { fadeLabels } from "./utils/fade";

const HistoricalDatesBlock: React.FC<HistoricalDatesBlockProps> = ({
  slices,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotDeg, setRotDeg] = useState(0);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [lockedIdx, setLockedIdx] = useState<number | null>(null);

  const { yearAnim, animateYears } = useYearsAnimation(
    slices[0].yearStart,
    slices[0].yearEnd
  );

  const groupRef = useRef<SVGGElement>(null);
  const angleRef = useRef(0);
  const isAnimating = useRef(false);

  const labelRefs = useRef<Array<SVGGElement | null>>([]);
  const activePointRef = useRef<SVGCircleElement | null>(null);
  const hoverMarkerRef = useRef<SVGCircleElement | null>(null);

  const slicesCount = slices.length;

  useEffect(() => {
    return () => {
      gsap.killTweensOf([
        groupRef.current,
        activePointRef.current,
        hoverMarkerRef.current,
      ]);
    };
  }, []);

  // Функция для переключения интервала
  const handleSwitch = (dir: number) => {
    if (isAnimating.current) return;

    const nextIdx = (activeIdx + dir + slicesCount) % slicesCount;
    const angle = (-360 / slicesCount) * dir;
    const dur = ROT_DUR;

    setHoveredIdx(nextIdx);
    setLockedIdx(nextIdx);

    angleRef.current += angle;

    fadeLabels(labelRefs, activeIdx, nextIdx, { fadeInNext: true });

    const toStart = slices[nextIdx].yearStart;
    const toEnd = slices[nextIdx].yearEnd;

    animateYears(toStart, toEnd, dur);

    if (activePointRef.current) {
      gsap.killTweensOf(activePointRef.current);
      gsap.to(activePointRef.current, {
        scale: 0.5,
        opacity: 0.35,
        duration: dur,
        ease: "power2.out",
        transformOrigin: "50% 50%",
      });
    }

    // Ждем один кадр, чтобы hoverMarker успел смонтироваться после setHoveredIdx
    requestAnimationFrame(() => {
      if (hoverMarkerRef.current) {
        gsap.killTweensOf(hoverMarkerRef.current);
        gsap.set(hoverMarkerRef.current, {
          opacity: 0.15,
          scale: 0,
          transformOrigin: "50% 50%",
        });
        gsap.to(hoverMarkerRef.current, {
          opacity: 1,
          scale: 1,
          duration: dur,
          ease: "power3.out",
        });
      }
    });

    isAnimating.current = true;

    gsap.to(groupRef.current, {
      rotation: angleRef.current,
      svgOrigin: `${RADIUS} ${RADIUS}`,
      duration: ROT_DUR,
      ease: "power2.out",
      onUpdate: () => {
        const r = gsap.getProperty(groupRef.current!, "rotation") as number;
        setRotDeg(r);
      },
      onComplete: () => {
        setActiveIdx(nextIdx);
        isAnimating.current = false;

        requestAnimationFrame(() => {
          if (activePointRef.current) {
            gsap.set(activePointRef.current, { scale: 1, opacity: 1 });
          }
          if (hoverMarkerRef.current) {
            gsap.set(hoverMarkerRef.current, { scale: 0, opacity: 0 });
          }
          setLockedIdx(null);
          setHoveredIdx(null);
        });
      },
    });
  };

  const handleGoTo = (targetIdx: number) => {
    if (isAnimating.current || targetIdx === activeIdx) return;

    setHoveredIdx(targetIdx);
    setLockedIdx(targetIdx);

    const total = slicesCount;
    const forward = (targetIdx - activeIdx + total) % total;
    const backward = forward - total;
    const steps = Math.abs(backward) < Math.abs(forward) ? backward : forward;
    const angle = (-360 / total) * steps;
    const dur = ROT_DUR * Math.abs(steps);

    angleRef.current += angle;

    fadeLabels(labelRefs, activeIdx, targetIdx, { fadeInNext: false });

    // активное кольцо исчезает на время плавно через scale/opacity
    if (activePointRef.current) {
      gsap.killTweensOf(activePointRef.current);
      gsap.to(activePointRef.current, {
        scale: 0.5,
        opacity: 0.35,
        duration: dur,
        ease: "power2.out",
        transformOrigin: "50% 50%",
      });
    }

    requestAnimationFrame(() => {
      if (hoverMarkerRef.current) {
        gsap.killTweensOf(hoverMarkerRef.current);
        gsap.set(hoverMarkerRef.current, {
          opacity: 0.15,
          scale: 0,
          transformOrigin: "50% 50%",
        });
        gsap.to(hoverMarkerRef.current, {
          opacity: 1,
          scale: 1,
          duration: dur,
          ease: "power3.out",
        });
      }
    });

    const toStart = slices[targetIdx].yearStart;
    const toEnd = slices[targetIdx].yearEnd;

    animateYears(toStart, toEnd, dur);

    isAnimating.current = true;

    gsap.to(groupRef.current, {
      rotation: angleRef.current,
      svgOrigin: `${RADIUS} ${RADIUS}`,
      duration: dur,
      ease: "power2.out",
      onUpdate: () => {
        const r = gsap.getProperty(groupRef.current!, "rotation") as number;
        setRotDeg(r);
      },
      onComplete: () => {
        setActiveIdx(targetIdx);
        isAnimating.current = false;

        // показать подпись новой активной в конце
        const toEl = labelRefs.current[targetIdx];
        if (toEl) {
          gsap.to(toEl, {
            opacity: 1,
            duration: LABEL_FADE,
            ease: "power2.out",
          });
        }

        // вернуть активное кольцо
        if (activePointRef.current) {
          gsap.set(activePointRef.current, { scale: 1, opacity: 1 });
        }

        // скрыть hover-маркер и снять фиксацию
        if (hoverMarkerRef.current) {
          gsap.set(hoverMarkerRef.current, { scale: 0, opacity: 0 });
        }
        setLockedIdx(null);
        setHoveredIdx(null);
      },
    });
  };

  // Инициализация поворота при монтировании/смене индекса
  useEffect(() => {
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === activeIdx ? 1 : 0 });
    });
  }, []);

  const handlePointEnter = (idx: number) => {
    if (isAnimating.current) return;
    setHoveredIdx(idx);

    requestAnimationFrame(() => {
      if (hoverMarkerRef.current) {
        gsap.set(hoverMarkerRef.current, {
          scale: 1,
          opacity: 1,
          transformOrigin: "50% 50%",
        });
      }
    });
  };

  const handlePointLeave = (idx: number) => {
    if (lockedIdx === idx) return; // во время клика не скрываем
    setHoveredIdx(null);
  };

  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Исторические даты</h2>
      <div className={styles.circleWrap}>
        {/* SVG круг + линии + точки */}
        <CircleSvg
          slices={slices}
          activeIdx={activeIdx}
          hoverIdx={lockedIdx ?? hoveredIdx}
          rotDeg={rotDeg}
          slicesCount={slicesCount}
          groupRef={groupRef}
          labelRefs={labelRefs}
          activePointRef={activePointRef}
          hoverMarkerRef={hoverMarkerRef}
          onPointEnter={handlePointEnter}
          onPointLeave={handlePointLeave}
          onPointClick={handleGoTo}
        />

        {/* Даты */}
        <DatesDisplay start={yearAnim.start} end={yearAnim.end} />
      </div>

      {/* Навигация */}
      <Nav
        current={activeIdx}
        total={slicesCount}
        onPrev={() => handleSwitch(-1)}
        onNext={() => handleSwitch(1)}
      />

      {/* События текущего временного отрезка */}
      <EventsSlider events={slices[activeIdx].events} slidesPerView={3} />
    </div>
  );
};

export default HistoricalDatesBlock;

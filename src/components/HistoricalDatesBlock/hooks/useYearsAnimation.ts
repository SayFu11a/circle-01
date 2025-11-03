import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Years = { start: number; end: number };

const OFFSET = 0.08; // сдвиг старта второй анимаци

const useYearsAnimation = (initialStart: number, initialEnd: number) => {
  const [yearAnim, setYearAnim] = useState<Years>({
    start: initialStart,
    end: initialEnd,
  });

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const currentRef = useRef<Years>({ start: initialStart, end: initialEnd });

  useEffect(() => {
    currentRef.current = yearAnim;
  }, [yearAnim]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const animateYears = (toStart: number, toEnd: number, duration: number) => {
    tlRef.current?.kill();

    const vals = {
      start: currentRef.current.start,
      end: currentRef.current.end,
    };

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(
      vals,
      {
        start: toStart,
        duration,
        onUpdate: () => {
          setYearAnim({
            start: Math.round(vals.start),
            end: Math.round(vals.end),
          });
        },
      },
      0
    );

    tl.to(
      vals,
      {
        end: toEnd,
        duration: Math.max(0, duration - OFFSET),
      },
      OFFSET
    );

    tlRef.current = tl;
  };

  return { yearAnim, animateYears };
};

export default useYearsAnimation;

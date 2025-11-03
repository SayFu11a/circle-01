import { MutableRefObject } from "react";
import { gsap } from "gsap";
import { LABEL_FADE } from "../constants";

type Opts = { fadeInNext: boolean };

export const fadeLabels = (
  labelRefs: MutableRefObject<Array<SVGGElement | null>>,
  fromIdx: number,
  toIdx: number,
  opts: Opts
) => {
  const fromEl = labelRefs.current[fromIdx];
  const toEl = labelRefs.current[toIdx];

  if (fromEl) {
    gsap.to(fromEl, { opacity: 0, duration: LABEL_FADE, ease: "power2.out" });
  }

  if (opts.fadeInNext && toEl) {
    gsap.set(toEl, { opacity: 0 });
    gsap.to(toEl, {
      opacity: 1,
      duration: LABEL_FADE,
      ease: "power2.out",
      delay: 0.08,
    });
  }
};

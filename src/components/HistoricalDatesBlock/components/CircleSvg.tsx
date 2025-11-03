import React, { MutableRefObject, RefObject } from "react";
import styles from "../styles.module.scss";
import { ACTIVE_R, HOVER_R, POINT_R, RADIUS, RIGHT_GAP } from "../constants";
import { calcPoints, getRotatedPoint } from "../utils/geometry";
import type { TimeSlice } from "../types";

type CircleSvgProps = {
  slices: TimeSlice[];
  activeIdx: number;
  hoverIdx: number | null;
  rotDeg: number;
  slicesCount: number;
  groupRef: RefObject<SVGGElement>;
  labelRefs: MutableRefObject<Array<SVGGElement | null>>;
  activePointRef: RefObject<SVGCircleElement>;
  hoverMarkerRef: RefObject<SVGCircleElement>;
  onPointEnter: (idx: number) => void;
  onPointLeave: (idx: number) => void;
  onPointClick: (idx: number) => void;
};

const CircleSvg: React.FC<CircleSvgProps> = ({
  slices,
  activeIdx,
  hoverIdx,
  rotDeg,
  slicesCount,
  groupRef,
  labelRefs,
  activePointRef,
  hoverMarkerRef,
  onPointEnter,
  onPointLeave,
  onPointClick,
}) => {
  const points = calcPoints(slicesCount, RADIUS);

  return (
    <svg className={styles.svgCircle} width={RADIUS * 2} height={RADIUS * 2}>
      {/* Круг */}
      <circle cx={RADIUS} cy={RADIUS} r={RADIUS} className={styles.circle} />

      <g ref={groupRef}>
        {/* Точки */}
        {points.map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.x}
            cy={pt.y}
            r={POINT_R}
            className={styles.point}
            style={{
              opacity: activeIdx === idx ? 1 : 0.3,
              cursor: "pointer",
            }}
            onMouseEnter={() => onPointEnter(idx)}
            onMouseLeave={() => onPointLeave(idx)}
            onClick={() => onPointClick(idx)}
          />
        ))}

        {/* Активная точка (маркер) */}
        <circle
          ref={activePointRef}
          cx={points[activeIdx]?.x}
          cy={points[activeIdx]?.y}
          r={ACTIVE_R}
          className={styles.activePoint}
          style={{ pointerEvents: "none" }}
        />

        {hoverIdx !== null && hoverIdx !== activeIdx && (
          <circle
            ref={hoverMarkerRef}
            cx={points[hoverIdx].x}
            cy={points[hoverIdx].y}
            r={HOVER_R}
            className={styles.activePoint}
            style={{ pointerEvents: "none" }}
          />
        )}
      </g>

      <g pointerEvents="none">
        {slices.map((slice, i) => {
          if (i !== activeIdx && i !== hoverIdx) return null;
          const p = getRotatedPoint(i, rotDeg, slicesCount, RADIUS);
          return (
            <g key={i} ref={(el) => (labelRefs.current[i] = el)}>
              {/* ЦИФРА в центре точки */}
              <text
                x={p.x}
                y={p.y}
                className={styles.labelNum}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ opacity: 1 }}
              >
                {i + 1}
              </text>
              {i !== activeIdx ? null : (
                <text
                  x={p.x + RIGHT_GAP}
                  y={p.y}
                  className={styles.labelText}
                  textAnchor="start"
                  dominantBaseline="central"
                  style={{ opacity: 1 }}
                >
                  {slice.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default CircleSvg;

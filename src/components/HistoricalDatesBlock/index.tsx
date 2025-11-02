import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import styles from "./styles.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Моки
const timeSlices = [
  {
    yearStart: 1980,
    yearEnd: 1986,
    label: "Музыка",
    events: [
      {
        year: 1980,
        title: "Убийство Джона Леннона",
        descr:
          "Конец эпохи The Beatles. Марк Чепмен застрелил Леннона у входа в дом «Дакота» в Нью-Йорке.",
      },
      {
        year: 1982,
        title: "Альбом «Thriller» Майкла Джексона",
        descr:
          "Самый продаваемый альбом всех времён. Лунная походка стала культовым танцевальным движением.",
      },
      {
        year: 1984,
        title: "Формирование группы «Кино»",
        descr:
          "Виктор Цой создал легендарную советскую рок-группу, ставшую символом перемен.",
      },
      {
        year: 1985,
        title: "Концерт Live Aid",
        descr:
          "16 часов рок-музыки ради спасения Африки. Queen украл шоу с Bohemian Rhapsody.",
      },
      {
        year: 1986,
        title: "Альбом «Ночь» группы «Кино»",
        descr:
          "«Видели ночь, гуляли всю ночь до утра» — саундтрек целого поколения.",
      },
    ],
  },
  {
    yearStart: 1987,
    yearEnd: 1991,
    label: "Кино",
    events: [
      {
        year: 1987,
        title: "«Хищник»",
        descr:
          "Арнольд против невидимого охотника. «Get to the choppa!» стало мемом на десятилетия.",
      },
      {
        year: 1988,
        title: "«Кто подставил кролика Роджера»",
        descr:
          "Революция в анимации — мультяшки и люди в одном кадре. Джессика Рэббит взорвала воображение.",
      },
      {
        year: 1989,
        title: "«Назад в будущее 2»",
        descr:
          "Ховерборды, самозашнуровывающиеся кроссовки и точные предсказания про 2015 год.",
      },
      {
        year: 1990,
        title: "«Крепкий орешек 2»",
        descr:
          "Джон Макклейн снова спасает Рождество. «Yippee-ki-yay» в аэропорту.",
      },
      {
        year: 1991,
        title: "«Семейка Аддамс»",
        descr:
          "Готическая семейка покорила мир. Кристина Риччи стала иконой мрачного юмора.",
      },
    ],
  },
  {
    yearStart: 1992,
    yearEnd: 1997,
    label: "Литература",
    events: [
      {
        year: 1992,
        title: "Нобель — Дерек Уолкотт",
        descr:
          "За блестящий образец карибского эпоса в 64 разделах. Поэзия с ромом и регги.",
      },
      {
        year: 1994,
        title: "«Бессонница» Стивена Кинга",
        descr:
          "Старики не спят и видят ауры. Кинг доказал, что может напугать даже бессонницей.",
      },
      {
        year: 1995,
        title: "Нобель — Шеймас Хини",
        descr:
          "Ирландский поэт получил премию за «лирическую красоту и этическую глубину».",
      },
      {
        year: 1997,
        title: "«Гарри Поттер и философский камень»",
        descr:
          "Роулинг написала первую книгу в кафе. Начало магической империи стоимостью в миллиарды.",
      },
    ],
  },
  {
    yearStart: 1999,
    yearEnd: 2004,
    label: "Театр",
    events: [
      {
        year: 1999,
        title: "Балет «Золушка» Жан-Кристофа Майо",
        descr:
          "Современная Золушка в постановке с элементами цирка. Тыква превратилась в Lamborghini.",
      },
      {
        year: 2000,
        title: "Возобновление журнала «Театр»",
        descr:
          "Легендарное издание вернулось после 90-х. Театралы могли снова спорить о постановках.",
      },
      {
        year: 2002,
        title: "«Берег Утопии» Тома Стоппарда",
        descr:
          "9-часовая трилогия о русских революционерах. Зрители приносили подушки и термосы.",
      },
      {
        year: 2003,
        title: "Пожар в театре Ла Фениче",
        descr:
          "Венецианский театр горел уже третий раз. Феникс оправдал своё название — снова восстал.",
      },
    ],
  },
  {
    yearStart: 2005,
    yearEnd: 2014,
    label: "Технологии",
    events: [
      {
        year: 2005,
        title: "Создание YouTube",
        descr:
          "Три парня создали платформу для видео с котиками. Теперь там учатся, работают и прокрастинируют.",
      },
      {
        year: 2007,
        title: "Презентация первого iPhone",
        descr:
          "Стив Джобс показал «революционный телефон». Nokia и Blackberry нервно закурили.",
      },
      {
        year: 2010,
        title: "Запуск Instagram",
        descr:
          "Квадратные фото с фильтрами захватили мир. Все стали фуд-фотографами.",
      },
      {
        year: 2012,
        title: "Curiosity на Марсе",
        descr:
          "Марсоход размером с автомобиль сел на Красную планету. Начал искать марсиан и делать селфи.",
      },
      {
        year: 2014,
        title: "Facebook купил WhatsApp",
        descr:
          "$19 млрд за мессенджер. Самая дорогая покупка смайликов в истории.",
      },
    ],
  },
  {
    yearStart: 2015,
    yearEnd: 2022,
    label: "Наука",
    events: [
      {
        year: 2015,
        title: "Частное солнечное затмение",
        descr:
          "Видно в Южной Африке и Антарктиде. Пингвины были в восторге, учёные — тоже.",
      },
      {
        year: 2016,
        title: "Хаббл нашёл галактику GN-z11",
        descr:
          "Самая далёкая галактика в 13,4 млрд световых лет. Свет шёл дольше, чем существует Земля.",
      },
      {
        year: 2017,
        title: "Tesla представила электрогрузовик",
        descr:
          "Илон Маск показал Semi. Дальнобойщики получили автопилот и возможность играть в игры за рулём.",
      },
      {
        year: 2018,
        title: "Запуск Solar Probe Plus",
        descr:
          "Зонд полетел «потрогать» Солнце. Самый горячий научный проект в истории.",
      },
      {
        year: 2019,
        title: "Google создал квантовый компьютер",
        descr:
          "Достигнуто квантовое превосходство. Обычные компьютеры обиделись и ушли в прошлое.",
      },
      {
        year: 2022,
        title: "Телескоп Джеймса Уэбба начал работу",
        descr:
          "Показал Вселенную в инфракрасном диапазоне. Астрономы плакали от счастья и красоты снимков.",
      },
    ],
  },
];

const RADIUS = 220;
const RIGHT_GAP = 30;
const ROT_DUR = 0.6;

const POINT_R = 8;
const ACTIVE_R = 16;

const HOVER_R = ACTIVE_R;
const LABEL_FADE = 0.25;

export default function HistoricalDatesBlock() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotDeg, setRotDeg] = useState(0);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [lockedIdx, setLockedIdx] = useState<number | null>(null);

  const [yearAnim, setYearAnim] = useState({
    start: timeSlices[0].yearStart,
    end: timeSlices[0].yearEnd,
  });

  const groupRef = useRef<SVGGElement>(null);
  const angleRef = useRef(0);
  const isAnimating = useRef(false);
  const numbersTLRef = useRef<gsap.core.Timeline | null>(null);
  const labelRefs = useRef<Array<SVGGElement | null>>([]);
  const activePointRef = useRef<SVGCircleElement | null>(null);
  const hoverMarkerRef = useRef<SVGCircleElement | null>(null);
  const hoverTextRef = useRef<SVGTextElement | null>(null);

  const slicesCount = timeSlices.length;

  const fadeLabels = (
    fromIdx: number,
    toIdx: number,
    opts: { fadeInNext: boolean }
  ) => {
    const fromEl = labelRefs.current[fromIdx];
    const toEl = labelRefs.current[toIdx];
    if (fromEl)
      gsap.to(fromEl, { opacity: 0, duration: LABEL_FADE, ease: "power2.out" });
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

  // Функция для переключения интервала
  const handleSwitch = (dir: number) => {
    if (isAnimating.current) return;

    const nextIdx = (activeIdx + dir + slicesCount) % slicesCount;
    const angle = (-360 / slicesCount) * dir;
    const dur = ROT_DUR;

    setHoveredIdx(nextIdx);
    setLockedIdx(nextIdx);

    angleRef.current += angle;

    fadeLabels(activeIdx, nextIdx, { fadeInNext: true });

    const toStart = timeSlices[nextIdx].yearStart;
    const toEnd = timeSlices[nextIdx].yearEnd;
    const vals = { start: yearAnim.start, end: yearAnim.end };

    numbersTLRef.current?.kill();
    const tlNums = gsap.timeline({ defaults: { ease: "power3.out" } });

    tlNums.to(
      vals,
      {
        start: toStart,
        duration: ROT_DUR,
        onUpdate: () => {
          setYearAnim({
            start: Math.round(vals.start),
            end: Math.round(vals.end),
          });
        },
      },
      0
    );

    tlNums.to(
      vals,
      {
        end: toEnd,
        duration: Math.max(0, dur - 0.08),
      },
      0.08
    );

    numbersTLRef.current = tlNums;

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
      if (hoverTextRef.current) {
        gsap.set(hoverTextRef.current, {
          opacity: 0,
          scale: 0.8,
          transformOrigin: "50% 50%",
        });
        gsap.to(hoverTextRef.current, {
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
        setYearAnim({ start: toStart, end: toEnd });

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

    fadeLabels(activeIdx, targetIdx, { fadeInNext: false });

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
      if (hoverTextRef.current) {
        gsap.set(hoverTextRef.current, {
          opacity: 0,
          scale: 0.8,
          transformOrigin: "50% 50%",
        });
        gsap.to(hoverTextRef.current, {
          opacity: 1,
          scale: 1,
          duration: dur,
          ease: "power3.out",
        });
      }
    });

    const toStart = timeSlices[targetIdx].yearStart;
    const toEnd = timeSlices[targetIdx].yearEnd;
    const vals = { start: yearAnim.start, end: yearAnim.end };

    numbersTLRef.current?.kill();
    const tlNums = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlNums.to(
      vals,
      {
        start: toStart,
        duration: dur,
        onUpdate: () => {
          setYearAnim({
            start: Math.round(vals.start),
            end: Math.round(vals.end),
          });
        },
      },
      0
    );
    tlNums.to(
      vals,
      {
        end: toEnd,
        duration: Math.max(0, dur - 0.08),
      },
      0.08
    );
    numbersTLRef.current = tlNums;

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
        setYearAnim({ start: toStart, end: toEnd });

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

  // Вычисление координат точек на окружности
  const points = Array.from({ length: slicesCount }, (_, i) => {
    const angle = (2 * Math.PI * i) / slicesCount - Math.PI / 2;
    return {
      x: Math.cos(angle) * RADIUS + RADIUS,
      y: Math.sin(angle) * RADIUS + RADIUS,
      angle,
    };
  });

  const getRotatedPoint = (i: number, deg: number) => {
    const base = (2 * Math.PI * i) / slicesCount - Math.PI / 2;
    const a = base + (deg * Math.PI) / 180;
    return {
      x: Math.cos(a) * RADIUS + RADIUS,
      y: Math.sin(a) * RADIUS + RADIUS,
      a,
    };
  };

  const hoverIdx = lockedIdx ?? hoveredIdx;
  const hoverP = hoverIdx !== null ? getRotatedPoint(hoverIdx, rotDeg) : null; // удалить

  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Исторические даты</h2>
      <div className={styles.circleWrap}>
        {/* SVG круг + линии + точки */}
        <svg
          className={styles.svgCircle}
          width={RADIUS * 2}
          height={RADIUS * 2}
        >
          {/* Круг */}
          <circle
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS}
            className={styles.circle}
          />
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
                onMouseEnter={(e) => {
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
                    if (hoverTextRef.current) {
                      gsap.set(hoverTextRef.current, { opacity: 1 });
                    }
                  });
                }}
                onMouseLeave={() => {
                  if (lockedIdx === idx) return; // во время клика не скрываем
                  setHoveredIdx(null);
                }}
                onClick={() => handleGoTo(idx)}
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
            {timeSlices.map((slice, i) => {
              if (i !== activeIdx && i !== hoverIdx) return null;
              const p = getRotatedPoint(i, rotDeg);
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

        {/* Даты */}
        <div className={styles.dates}>
          <span className={styles.yearStart}>{yearAnim.start}</span>
          <span className={styles.yearEnd}>{yearAnim.end}</span>
        </div>
      </div>

      {/* Навигация */}
      <div className={styles.nav}>
        <span>
          {String(activeIdx + 1).padStart(2, "0")}/
          {String(slicesCount).padStart(2, "0")}
        </span>
        <button onClick={() => handleSwitch(-1)}>&lt;</button>
        <button onClick={() => handleSwitch(1)}>&gt;</button>
      </div>

      {/* События текущего временного отрезка */}
      <Swiper slidesPerView={3}>
        {timeSlices[activeIdx].events.map((ev) => (
          <SwiperSlide key={ev.year}>
            <div className={styles.event}>
              <div className={styles.eventYear}>{ev.year}</div>
              <div className={styles.eventTitle}>{ev.title}</div>
              <div className={styles.eventDescr}>{ev.descr}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

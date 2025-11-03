import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "../styles.module.scss";
import type { EventItem } from "../types";

type EventsSliderProps = {
  events: EventItem[];
  slidesPerView?: number;
};

const EventsSlider: React.FC<EventsSliderProps> = ({
  events,
  slidesPerView = 3,
}) => {
  return (
    <Swiper slidesPerView={slidesPerView}>
      {events.map((ev) => (
        <SwiperSlide key={ev.year}>
          <div className={styles.event}>
            <div className={styles.eventYear}>{ev.year}</div>
            <div className={styles.eventTitle}>{ev.title}</div>
            <div className={styles.eventDescr}>{ev.descr}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventsSlider;

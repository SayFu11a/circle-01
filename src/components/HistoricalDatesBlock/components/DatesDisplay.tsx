import React from "react";
import styles from "../styles.module.scss";

type DatesDisplayProps = {
  start: number;
  end: number;
};

const DatesDisplay: React.FC<DatesDisplayProps> = ({ start, end }) => {
  return (
    <div className={styles.dates}>
      <span className={styles.yearStart}>{start}</span>
      <span className={styles.yearEnd}>{end}</span>
    </div>
  );
};

export default DatesDisplay;

import React from "react";
import styles from "../styles.module.scss";

type NavProps = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

const Nav: React.FC<NavProps> = ({ current, total, onPrev, onNext }) => {
  return (
    <div className={styles.nav}>
      <span>
        {String(current + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
      <button onClick={onPrev} aria-label="Previous interval">
        &lt;
      </button>
      <button onClick={onNext} aria-label="Next interval">
        &gt;
      </button>
    </div>
  );
};

export default Nav;

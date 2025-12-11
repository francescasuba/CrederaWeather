import React from "react";
import styles from "./TempToggle.module.css";

export type TempUnit = "C" | "F";

export function TempToggle({ unit, onChange }: { unit: TempUnit; onChange: (u: TempUnit) => void }) {
  const checked = unit === "F"; // ON = Fahrenheit
  return (
    <div className={styles.switch}>
      <button
        role="switch"
        aria-checked={checked}
        className={`${styles.switchButton} ${checked ? styles.on : styles.off}`}
        aria-label={checked ? "Fahrenheit" : "Celsius"}
        onClick={() => onChange(checked ? "C" : "F")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(checked ? "C" : "F");
          }
        }}
      >
        <span className={styles.track} aria-hidden="true">
          <span className={`${styles.knob} ${checked ? styles.knobOn : styles.knobOff}`} />
        </span>
        <span className={styles.visuallyHidden}>Toggle temperature unit</span>
      </button>
    </div>
  );
}

export default TempToggle;

"use client";

import { Store, Moon, Sun } from "lucide-react";
import styles from "./Navbar.module.css";

type NavbarProps = {
  dark: boolean;
  onToggleTheme: () => void;
};

export default function Navbar({ dark, onToggleTheme }: NavbarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <span className={styles.brandMark}><Store size={21} strokeWidth={1.7} /></span>
            <span>Consign<span className={styles.brandLight}>Desk</span></span>
          </div>
          <nav className={styles.navigation} aria-label="Main navigation">
            {["Dashboard", "Sales Runs", "Ongoing", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                aria-current={item === "Ongoing" ? "page" : undefined}
                className={item === "Ongoing" ? styles.activeLink : styles.navLink}
              >
                {item === "Ongoing" && <span className={styles.liveDot} />}
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className={styles.account}>
          <button
            type="button"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={dark}
            onClick={onToggleTheme}
            className={styles.themeButton}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className={styles.identity}>
            <p>Alex Chen</p>
            <span>Host</span>
          </div>
          <div className={styles.avatar} aria-label="Alex Chen">AC</div>
        </div>
      </div>
    </header>
  );
}

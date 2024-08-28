import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { links } from "../LinksList/links"

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      {links.map((item, i) => (
        <Link href={item.link} key={i} className={styles.navLink}>
          {item.linkText}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;

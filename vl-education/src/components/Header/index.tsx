"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import LogoIcon from "@/shared/ui/icons/LogoIcon";
import Navigation from "./Navigation";
import Link from "next/link";
import MobileBtnIcon from "./icons/mobileBtnIcon";
import MobileMenu from "./MobileMenu";
import clsx from "clsx";

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  const [topScroll, setTopScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setTopScroll(true);
      } else {
        setTopScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={clsx(styles.headerWrap, topScroll ? styles.headerWrap_bg : undefined)}>
        <div className="container">
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <Link className={styles.logoLink} href={"/"}>
                <LogoIcon className={styles.logo} />
              </Link>
              <Navigation />
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className={styles.mobileMenuBtn}
              >
                <MobileBtnIcon />
              </button>
            </div>
            <MobileMenu showMenu={showMenu} closeMenuHandler={closeMenuHandler} />
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
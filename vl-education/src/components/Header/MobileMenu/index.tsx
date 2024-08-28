import React from "react";
import styles from "./styles.module.css";
import LogoIcon from "@/shared/ui/icons/LogoIcon";
import CloseIcon from "./icons/closeIcon";
import LinksList from "../LinksList";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  closeMenuHandler: () => void;
  showMenu: boolean;
}

const MobileMenu = ({ closeMenuHandler, showMenu }: Props) => {
  return (
    <div
      className={clsx(styles.mobileMenu, {
        [styles.showMenu]: showMenu,
        [styles.hideMenu]: !showMenu,
      })}
    >
      <div className={styles.header}>
        <Link className={styles.logoLink} href={"/"}>
          <LogoIcon />
        </Link>
        <button onClick={closeMenuHandler} className={styles.closeBtn}>
          <CloseIcon />
        </button>
      </div>
      <LinksList closeMenuHandler={closeMenuHandler} />

    </div>
  );
};

export default MobileMenu;

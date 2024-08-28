import React from "react";
import styles from "./styles.module.css";
import LinkItem from "./LinkItem";
import { links } from "./links";

interface Props {
  closeMenuHandler: () => void;
}

const LinksList = ({ closeMenuHandler }: Props) => {
  return (
    <div className={styles.linksList}>
      {links.map((item, key) => {
        return (
          <LinkItem
            closeMenuHandler={closeMenuHandler}
            linkData={item}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default LinksList;

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css"
import { InViewStyle } from "@/shared/ui/InViewStyle";
import clsx from "clsx";


const classroomIncludeData = [
    "Учебные стенды: разработка и поставка.",
    "Оснащение учебных классов информативными плакатами.",
    "Разработка лабораторных работ для отработки практических навыков.",
    "Комплексная поставка учебного оборудования, методических пособий.",
    "Выезд представителя для введения оборудования в эксплуатацию.",
    "Подготовка мастеров обучения на предприятии Заказчика.",
];

const ClassroomInclude = () => {
    return (
        <section className={styles.section} id="class-equipment">
            <div className="container">
                <div className={styles.body}>
                    <div className={clsx(styles.item, styles.item1)}>
                        <InViewStyle
                            initialClass="bottomToTop"
                            animationClass="visible"
                            triggerOnce
                        >
                            <Image
                                width={450}
                                height={250}
                                src={'/classroomInclude.png'}
                                alt="оборудование" 
                                className={styles.img}
                                />
                        </InViewStyle>
                        <InViewStyle
                            initialClass="bottomToTop"
                            animationClass="visible"
                            triggerOnce
                        >
                            <h2 className={styles.h2}>
                                Оснащение классов
                            </h2>
                        </InViewStyle>
                        <InViewStyle
                            initialClass="bottomToTop"
                            animationClass="visible"
                            triggerOnce
                        >
                            <p className={styles.h2Subtitle}>
                                Комплексное <span className={styles.accentColor}>оснащение</span> учебных центров ВУЗов, промышленных предприятий, специальных учебных заведений.
                            </p>
                        </InViewStyle>
                    </div>
                    <div className={clsx(styles.item, styles.item2)}>
                        <ul className={styles.ul}>
                            {classroomIncludeData.map((item, index) => (
                                <li
                                    key={index}
                                >
                                    <InViewStyle
                                        initialClass="bottomToTop"
                                        animationClass="visible"
                                        triggerOnce
                                        className={clsx(styles.ulItem, styles[`ulItem${index + 1}`])}
                                    >
                                        <span className={styles.ulNum}>
                                            {`${index + 1}`}
                                        </span>
                                        <span className={styles.ulTxt}>{item}</span>
                                    </InViewStyle>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClassroomInclude
import React from "react";
import classNames from "classnames";
import { getRanks } from '@/lib/fetchData/getRanks';
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
    totalAmount: number;
}


const ProgressBar: React.FC<ProgressBarProps> = async ({ totalAmount }) => {
    const ranks: any = await getRanks();
    // Определяем, в каком промежутке sum находится totalAmount
    let progressWidth = 0;
    for (let i = 0; i < ranks.length; i++) {
        const currentRank = ranks[i];
        const nextRank = ranks[i + 1];

        if (totalAmount <= currentRank.attributes.sum) {
            // Если totalAmount меньше или равно текущей сумме rank
            progressWidth = (totalAmount / currentRank.attributes.sum) * 100 + 10;
            break;
        }

        if (nextRank && totalAmount > currentRank.attributes.sum && totalAmount <= nextRank.attributes.sum) {
            // Если totalAmount находится между текущей и следующей суммами rank
            const range = nextRank.attributes.sum - currentRank.attributes.sum;
            const offset = totalAmount - currentRank.attributes.sum;
            progressWidth = ((i + offset / range) / ranks.length) * 100 + 10;
            break;
        }

        if (!nextRank && totalAmount > currentRank.attributes.sum) {
            // Если totalAmount больше всех сумм rank
            progressWidth = 100;
            break;
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.ranks}>
                <div className={styles.track} style={{ width: `${(progressWidth ? progressWidth : 0)}%` }}></div>
                {ranks.map((rank: any, index: number) => (
                    <div key={index} className={classNames(styles.item, styles[`item_${index + 1}`])}>
                        <div className={classNames(styles.sum, styles[`sum_${index + 1}`])}>
                            {rank.attributes.sum}₽
                        </div>
                        <div className={classNames(styles.num, styles[`num_${index + 1}`])}>
                            {index + 1}
                        </div>
                        <div className={classNames(styles.name, styles[`name_${index + 1}`])}>
                            {rank.attributes.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProgressBar;
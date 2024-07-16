import React from 'react';
import Ava from './Ava';
import Ref from './Ref';
import History from './History';
import Info from './Info';
import Head from './Head';
import Rank from './Rank';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.dashboardAvatar}>
                <Ava />
            </div>
            <div className={styles.dashboardRef}>
                <Ref />
            </div>
            <div className={styles.dashboardHistory}>
                <History />
            </div>
            <div className={styles.dashboardInfo}>
                <Info />
            </div>
            <div className={styles.dashboardHead}>
                <Head />
            </div>
            <div className={styles.dashboardRank}>
                <Rank />
            </div>
        </div>
    );
};

export default Dashboard;

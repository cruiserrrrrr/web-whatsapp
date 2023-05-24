import React from "react";
import styles from './index.module.scss';

const Main = () => {
    return (
        <div className={styles.main_wrapper}>
            <div className={styles.main_container}>
                <div className={styles.main_content}>
                    <h2 className={styles.content_title}>Нет активного чата.</h2>
                    <p className={styles.content_subtitle}>Вы можете выбрать или создать новый чат.</p>
                </div>
            </div>
        </div>
    )
}

export default Main;
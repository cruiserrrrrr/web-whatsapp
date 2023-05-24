import React from 'react';
import Icon from '../Icon';
import styles from './index.module.scss';

interface ICustomButton {
    text?: string;
    icon?: JSX.Element | JSX.Element[];
    style: string;
    onClick?: (e?) => void;
    additionalStyle?: string
}

const CustomButton = (props: ICustomButton) => {
    const { text = '', icon, style = '', onClick = () => { }, additionalStyle = '' } = props;

    return (
        <button className={`${styles.button_wrapper} ${styles[style]} ${additionalStyle}`} onClick={onClick}>
            <div className={styles.button_container}>
                <span className={styles.button_icon}>
                    {icon}
                </span>
                {text}
            </div>
        </button>
    )
}

export default CustomButton;
import React, { useState } from "react";
import styles from './index.module.scss';
import CustomButton from '../CustomButton'
import Icon from "../Icon";
import CustomInput from "../CustomInput";

interface IModal {
    active: boolean,
    children: JSX.Element | JSX.Element[]
}

const Modal = (props: IModal) => {
    const { active, children } = props;

    return (
        <div className={active ? styles.modal__active : styles.modal__hidden}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
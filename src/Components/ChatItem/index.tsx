import React from "react";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import styles from './index.module.scss';
import { NavLink } from "react-router-dom";

interface IChatItem {
    phoneNumber: number;
    deleteButton?: () => void;
    to?: string,
    state?: Object,
}

const ChatItem = (props: IChatItem) => {

    const { phoneNumber, deleteButton = () => { }, to, state,} = props;

    return (
        <li className={styles.chat_item__wrapper}>
            <NavLink end className={({ isActive }) => isActive ? styles.active_link : styles.link} to={to} state={state}>
                <div className={styles.chat_item__icon}>
                    <Icon name="icperson" />
                </div>
                <div className={styles.chat_item__container}>
                    <div className={styles.chat_item__header}>
                        <p>{phoneNumber}</p>
                    </div>
                    <div className={styles.last_mess}>
                        <p>last mess</p>
                    </div>
                </div>
                <div className={styles.chat_item__delete_button}>
                    <CustomButton
                        style="style_icon"
                        icon={<Icon name="cross" />}
                        onClick={deleteButton}
                    />
                </div>
            </NavLink>
        </li>
    )
}

export default ChatItem;

import React from "react";
import Icon from "../Icon";
import styles from './index.module.scss';

interface IMessageItem {
    messageText?: string,
    messageType?: string,
    dispatchTime?: any
}

const MessageItem = (props: IMessageItem) => {
    const { messageText, messageType, dispatchTime } = props;

    return (
        <div className={`${styles.message_wrapper} ${styles[messageType]}`}>
            <div className={styles.message_container}>
                <span className={styles.message_icon__wrapper}>
                    <Icon name={messageType == 'incoming' ? "incomingMessageIcon" : "outgoingIconMessage"} />
                </span>
                <p className={styles.message_text}>{messageText}</p>
                <span>
                    <span>
                        {dispatchTime}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default MessageItem;
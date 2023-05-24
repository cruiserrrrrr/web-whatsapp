import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userSlice } from '../../store/reducers/UserSlice';
import { useAppSelector } from '../../hooks/redux';
import CustomButton from '../CustomButton';
import Icon from '../Icon';
import styles from './index.module.scss';

interface IChatHeader {
    phoneNumber: string;
}

const ChatHeader = (props: IChatHeader) => {

    const { chats } = useAppSelector(state => state.userReducer)
    const { phoneNumber } = props;
    const [activeDropDown, setActiveDropDowm] = useState(false);
    // const [chatsList, setChatsList] = useState(chats);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addChatState, deleteChatState } = userSlice.actions;
    const location = useLocation();

    const deleteChat = () => {
        // const chatsList = chats.filter(item => item.id != location.state.chatId)
        // dispatch(addChatState(chats.filter(item => item.id != location.state.chatId)));
        dispatch(deleteChatState(Number(location.state.chatId)));
        navigate("/");
    }
    const isActiveDropDown = () => setActiveDropDowm(!activeDropDown);
    return (
        <header className={styles.chat_header}>
            <div className={styles.header_container}>
                <div className={styles.chat_info}>
                    <p>+{phoneNumber}</p>
                </div>
                <div className={styles.buttons_container}>
                    <CustomButton
                        style='style_icon'
                        icon={<Icon name='search' />}
                    />
                    <div className={styles.drop_down__wrapper}>
                        <CustomButton
                            style='style_icon'
                            icon={<Icon name='dots' />}
                            onClick={isActiveDropDown}
                        />
                        <div className={activeDropDown ? styles.drow_down_active : styles.drow_down_hidden}>
                            <CustomButton
                                style='style_text__secondary'
                                text='Удалить чат'
                                onClick={deleteChat}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ChatHeader;
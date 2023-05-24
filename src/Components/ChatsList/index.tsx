import React, { useEffect, useState } from 'react';
import ChatItem from '../ChatItem';
import styles from './index.module.scss';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import Icon from '../Icon';
import { useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';


const ChatList = () => {

    const { chats } = useAppSelector(state => state.userReducer)
    const [chatPhoneNumber, setChatPhoneNumber] = useState(0);
    const [modalProfile, setModalProfile] = useState(false);
    const [chatsList, setChatsList] = useState(chats);
    const [instanceId, setInstanceId] = useState();
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [modalChat, setModalChat] = useState(false)
    const navigate = useNavigate();

    const { changeidInstanceUser, changeapiTokenInstanceUser, addChatState, deleteChatState } = userSlice.actions;
    const dispatch = useDispatch();

    const acceptChanges = (e) => {
        e.preventDefault();
        dispatch(changeidInstanceUser(instanceId));
        dispatch(changeapiTokenInstanceUser(apiTokenInstance));
        setModalProfile(!modalProfile);
    }
    const addChat = (e) => {
        e.preventDefault();
        setChatsList(current => [...current, {
            chatPhone: chatPhoneNumber,
            id: Math.floor(Math.random() * 10000) + chatPhoneNumber,
            chatMessageList: []
        }])

        setModalChat(!modalChat)
        dispatch(addChatState({
            chatPhone: chatPhoneNumber,
            id: Math.floor(Math.random() * 10000),
            chatMessageList: []
        }))
        setChatPhoneNumber(0)
    };
    const deleteChat = (id) => {
        dispatch(deleteChatState(Number(id)))
        navigate("/")
    };
    const isProfileAcive = (e) => {
        e.preventDefault();
        setModalProfile(!modalProfile);
    };
    const isChatActive = (e) => {
        e.preventDefault();
        setModalChat(!modalChat);
    };
    useEffect(() => {
        setChatsList
    }, [chats])

    return (
        <div className={styles.chat_list__wrapper}>
            <div className={styles.chat_list__header}>
                <div className={styles.header_left}>
                    <CustomButton
                        style='style_icon'
                        icon={<Icon name='icperson' className={styles.header__person_icon} />}
                        onClick={isProfileAcive}
                    />
                </div>
                <div className={styles.header_right}>
                    <CustomButton
                        style='style_icon'
                        icon={<Icon name='chat' />}
                        onClick={isChatActive}
                    />
                    <CustomButton
                        style='style_icon'
                        icon={<Icon name='dots' />}
                        onClick={isProfileAcive}
                    />
                </div>
            </div>
            <div className={styles.chats_container}>
                {chats.map((item, index) => (
                    <ChatItem
                        key={item.id}
                        phoneNumber={item.chatPhone}
                        to={`/chat/${item.id}`}
                        state={{
                            chatPhone: item.chatPhone,
                            chatId: item.id
                        }}
                        deleteButton={() => deleteChat(item.id)}
                    />
                ))}
            </div>
            <Modal active={modalProfile}>
                <div className={styles.modal_header}>
                    <CustomButton
                        style="style_icon"
                        icon={<Icon name="arrowLeft" />}
                        onClick={isProfileAcive}
                    />
                    <h1>Профиль</h1>
                </div>
                <div className={styles.modal_content} onSubmit={acceptChanges}>
                    <form >
                        <CustomInput
                            type='string'
                            value={instanceId}
                            onChange={(e) => setInstanceId(e.target.value)}
                            placeholder='Id Instance'
                        />
                        <CustomInput
                            type='string'
                            value={apiTokenInstance}
                            onChange={(e) => setApiTokenInstance(e.target.value)}
                            placeholder='Api Token Instance'
                        />
                        <CustomButton
                            text='Сохранить'
                            style='style_text'
                            onClick={(e) => acceptChanges(e)}
                        />
                    </form>
                </div>
            </Modal>
            <Modal active={modalChat}>
                <div className={styles.modal_header}>
                    <CustomButton
                        style="style_icon"
                        icon={<Icon name="arrowLeft" />}
                        onClick={isChatActive}
                    />
                    <h1>Добавить новый чат.</h1>
                </div>
                <div className={styles.modal_content} onSubmit={addChat}>
                    <form >
                        <CustomInput
                            type='number'
                            value={chatPhoneNumber}
                            onChange={(e) => setChatPhoneNumber(e.target.value)}
                            placeholder='Введите номер телефона'
                        />
                        <CustomButton
                            text='Добавить чат'
                            style='style_text'
                            onClick={(e) => addChat(e)}
                        />
                    </form>
                </div>
            </Modal>
        </div>
    );
};


export default ChatList;
import React, { useEffect, useState } from 'react';
import ChatHeader from '../../Components/ChatHeader';
import CustomButton from '../../Components/CustomButton';
import Icon from '../../Components/Icon';
import styles from './index.module.scss';
import axios from 'axios';
import CustomInput from '../../Components/CustomInput';
import whatsAppClient from '@green-api/whatsapp-api-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import MessageItem from '../../Components/MessageItem';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/reducers/UserSlice';



const ChatComponent = () => {

    const [textMessage, setTextMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const { chats, idInstance, apiTokenInstance } = useAppSelector(state => state.userReducer)
    const location = useLocation();
    const navigate = useNavigate();
    const { addMessage } = userSlice.actions;
    const dispatch = useDispatch();


    const sendMessage = async (e) => {
        e.preventDefault();
        const outgoingData = {
            chatId: `${location.state.chatPhone}@c.us`,
            message: textMessage
        };
        if (!!textMessage) {
            await axios.post(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, outgoingData);
            const sendedMessage = {
                message: textMessage,
                id: Math.floor(Math.random() * 10000),
                typeMessage: 'outgoing'
            };
            dispatch(addMessage({ id: location.state.chatId, message: sendedMessage }))
            setMessagesList(current => [...current, sendedMessage]);
            setTextMessage('');
        }

    }
    useEffect(() => {
        chats.filter((item) => {
            if (item.id === location.state.chatId) {
                setMessagesList(item.chatMessageList)
            }
        })
    }, [location.state.chatId])
    useEffect(() => {
        const longPolling = async () => {
            let restAPI = whatsAppClient.restAPI(({
                idInstance,
                apiTokenInstance
            }))
            try {
                console.log("Waiting incoming notifications...")
                let response = await restAPI.webhookService.receiveNotification();
                if (response !== null) {
                    let webhookBody = response.body;
                    if (webhookBody.typeWebhook === 'incomingMessageReceived') {
                        if (webhookBody.senderData.sender === `${location.state.chatPhone}@c.us`) {
                            let messageId = webhookBody.idMessage;
                            let receivedMessage = {
                                message: webhookBody.messageData.textMessageData.textMessage,
                                id: messageId,
                                typeMessage: 'incoming'
                            };
                            setMessagesList(current => {
                                const filteredList = current.filter(item => item.id !== messageId);
                                return [...filteredList, receivedMessage];
                            });
                            dispatch(addMessage({ id: location.state.chatId, message: receivedMessage }))
                            await restAPI.webhookService.deleteNotification(response.receiptId);
                        }
                    }
                    let idmessage;
                    await axios.get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
                        .then(res => { res.data.receiptId !== null ? idmessage = res.data.receiptId : '' });
                    if (idmessage !== null) {
                        await axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${idmessage}`)
                    }
                }
            } catch (ex) {
                // console.error(ex);
            };
        }

        const getInterval = setInterval(() => {
            longPolling();
        }, 3000)
        return () => {
            clearInterval(getInterval)
        };
    }, [location.state.chatId])
    useEffect(() => {
        if (chats.length <= 0) {
            navigate("/")
        }
    }, [])

    return (
        <div className={styles.chat_wrapper}>
            <div className={styles.chat_container}>
                <ChatHeader phoneNumber={location.state.chatPhone} />
                <div className={styles.messagesContainer}>
                    {
                        messagesList.map((item) => (
                            <MessageItem
                                key={item.id}
                                messageText={item.message}
                                messageType={item.typeMessage}
                            />
                        ))
                    }
                </div>
                <form className={styles.chat_view__footer} onSubmit={sendMessage}>
                    <CustomInput
                        placeholder='message'
                        value={textMessage}
                        onChange={(e) => setTextMessage(e.target.value)}
                    />
                    <CustomButton
                        style='style_icon'
                        onClick={(e) => sendMessage(e)}
                        icon={<Icon name='sendIcon' />}
                    />
                </form>
            </div>
        </div>
    )
}

export default ChatComponent;

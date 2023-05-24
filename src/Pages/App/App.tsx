import React, { useState } from 'react';
import styles from './index.module.scss'
import ChatComponent from '../ChatComponent';
import ChatsList from '../../Components/ChatsList';
// import ChatsList from '../Components/ChatsList';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main';


const App = () => {

    const [messegeValue, setMessegeValue] = useState('');

    return (
        <div className={styles.app}>
            <div className={styles.content_wrapper}>
                <ChatsList />
                <Routes>
                    <Route index path='/' element={<Main />} />
                    <Route path='/chat/:id' element={<ChatComponent />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/interfaceRedux';

interface UserState {
    users: IUser[],
    idInstance: string,
    apiTokenInstance: string,
    chats: any[],
}
const initialState: UserState = {
    users: [],
    idInstance: '',
    apiTokenInstance: '',
    chats: [],
}

export const userSlice = createSlice({
    name: 'name',
    initialState: initialState as UserState,
    reducers: {
        changeidInstanceUser(state, action: PayloadAction<string>) {
            state.idInstance = action.payload
        },
        changeapiTokenInstanceUser(state, action: PayloadAction<string>) {
            state.apiTokenInstance = action.payload
        },
        addChatState(state, action: PayloadAction<{}>) {
            state.chats.push(action.payload)
        },
        deleteChatState(state, action: PayloadAction<number>) {
            state.chats = state.chats.filter(item => item.id != action.payload)
        },
        addMessage(state, action: PayloadAction<{ id: number; message: {} }>) {
            const { id, message } = action.payload;
            state.chats.find(item => {
                if (item.id === id) {
                    item.chatMessageList.push(message);
                }
            });
        }
    }
})
export const { addMessage } = userSlice.actions;
export default userSlice.reducer;
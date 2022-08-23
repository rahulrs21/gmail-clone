import { createSlice } from '@reduxjs/toolkit';


export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    selectedMail: null,  //  This is for when u open the particular email in EmailList, then it shows on other page, to render this we need to create 
    sendMessageIsOpen: false,
  },
 
  reducers: {
    selectingMail: (state, action) => {
      state.selectedMail = action.payload
    },
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    }
  },
  

});

export const { selectingMail, openSendMessage, closeSendMessage } = mailSlice.actions;

export const selectOpenMail = (state) => state.mail.selectedMail
export const selectMail = (state) => state.mail.sendMessageIsOpen;

export default mailSlice.reducer;

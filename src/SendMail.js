import React from 'react'
import './SendMail.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import { useDispatch } from 'react-redux/es/exports';  // u need to manually type this. Autocomplete won't come

//npm install react-hooks 
import { useForm } from "react-hook-form";
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';

// we r importing 'timestamp' for firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


function SendMail() {
   
  const {register, handleSubmit, formState: { errors }} = useForm();   // https://react-hook-form.com/advanced-usage 

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection('emails').add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()    // defined the timestamp
    });
    // emails - creating database collection with name of 'emails'

    dispatch(closeSendMessage());
    // to close the form
  }

  return (
    <div className='sendMail'>
        <div className="sendMail__header">
            <h3>New Message</h3>
            <CloseIcon onClick={() => dispatch(closeSendMessage())} className='sendMail__close' />  
            {/* closeSendMessage() is defined from 'useSlice.js' with the help of useDispatch. useDispatch is took help from useSelector() which is defined in main 'app.js' */}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder='To' {...register('to', { required: true })} name='to'  /> 
            {errors.to && <p className='sendMail__error'><strong>To</strong> is required!!</p>}

            <input type="text" placeholder='Subject' {...register('subject', { required: true })} name='subject'  />
            {errors.subject && <p className='sendMail__error'><strong>Subject</strong> is required!!</p>}

            <input type="text" placeholder='Message...' className='sendMail__message' {...register('message', { required: true })} name='message'  />
            {errors.message && <p className='sendMail__error'><strong>Message</strong> is required!!</p>}


            {/* NOTE: IN Version 7 or greater 7(currently I'm using 7)
                Use this --> <input {...register('test', { required: true })} /> Updated
                https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react
            */}

            <div className="sendMail__options">
                <Button className='sendMail__send' variant='contained' color='primary' type='submit'>Send</Button>
            </div>
        </form>
      
    </div>
  )
}

export default SendMail


// npm install react-hooks

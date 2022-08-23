import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';

// React Router Dom
// import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { selectMail } from './features/mailSlice';
import { login, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';


function App() {

  const sendMessageIsOpen = useSelector(selectMail)    // selectMail is defined in mailSlice.js

  const user = useSelector(selectUser)      // selectUser from userSlice.js

  // once after login, if u refresh the page it'll logout and go back again to login page, so to make login even if u refresh the page
  const dispatch = useDispatch();
  useEffect(() => {
    // onAuthStateChanged -> Its going to listen the authentication state
    auth.onAuthStateChanged( (user) => {
      if(user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      } 
    });
  }, []);

  return (

    <Router>
      {/* If there is no user then render login page otherwise rest of the page */}
      {!user ? (

        <Login />

      ) : (

        <div className="app">

          <Header />

          <div className="app__body">
            <Sidebar /> 
            <Routes>  
              <Route path="/mail" element={<Mail />} />
              <Route path="/" element={<EmailList />} />
            </Routes>
          </div>

          { sendMessageIsOpen &&  <SendMail />}

        </div>
      )}

    </Router>
  );
}

export default App;

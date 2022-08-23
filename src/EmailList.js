import React, { useEffect, useState } from 'react'
import './EmailList.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Checkbox, IconButton } from '@mui/material';  // Checkbox - same as IconButton built in component

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';

import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import { db } from './firebase';

function EmailList() {
    const [emails, setEmails] = useState([]);

    //   useEffect using to map the array of useState([])
    useEffect(() => {
        db.collection('emails').orderBy('timestamp', 'desc').onSnapshot(snapshot => setEmails(snapshot.docs.map(doc => ({
            id: doc.id,         // id of particular data
            data: doc.data(),   // data means rest of data -> message, subject, timestamp, to...

        }) )))
        // onSnapshot() is a realtime listener, so anytime/anything changes over on the firestore database and anything if we delete/add/change any of these fields on firestore database, this going to update.
        // so it will give snapshot of the database. https://console.firebase.google.com/u/0/project/email-clone-yt-254c8/firestore/data/~2Femails~2F6Dt1q9RSN8BxHAe8FMko  [5:33:00]
        // setEmails(snapshot.docs.map())  --> firebase datas are usually in the form of 'docs', hence we define 'snapshot.docs'.. so after, we are updating changes and set to setEmail.
    }, [])

  return (
    <div className='emailList'>
        <div className="emailList__Settings">
            <div className="emailList__settingLeft">
                <Checkbox />
                <IconButton><ArrowDropDownIcon /></IconButton>
                <IconButton><RedoIcon /></IconButton>
                <IconButton><MoreVertIcon /></IconButton>
            </div>

            <div className="emailList__settingRight">
                <IconButton><ChevronLeftIcon /></IconButton>
                <IconButton><ChevronRightIcon /></IconButton>
                <IconButton><KeyboardHideIcon /></IconButton>
                <IconButton><SettingsIcon /></IconButton>
            </div>

        </div>

        <div className="emailList__sections">
            <Section Icon={InboxIcon} title='Primary' color='red' selected />
            <Section Icon={PeopleIcon} title='Social' color='#1A73E8'  />
            <Section Icon={LocalOfferIcon} title='Promotions' color='green'  />
        </div>

        <div className="emailList__list">
            {/* for every single email, return the following */}
            {emails.map ( ({ id, data : { to, subject, message, timestamp } }) => (

                <EmailRow 
                    id={id} 
                    key={id} // while using mapping, u need to use the 'key' and it should contain unique value. That is id.
                    title={to} 
                    subject={subject} 
                    description={message} 
                    timestamp={new Date(timestamp?.seconds * 1000).toUTCString()}      // write new code to get the timestamp
                />

            ) )}

            {/* Hardcoded */}
            <EmailRow 
                title = "Twitch"
                subject = "Hey fellow streamer"
                description = "This is a test"
                timestamp= "10pm"
            />  

            <EmailRow 
                title = "Twitch 2"
                subject = "Hey there, fellow streamer"
                description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem quae ipsam maiores in cumque dolore!"
                timestamp= "10pm"
            />  

        </div>
    </div>
  )
}

export default EmailList

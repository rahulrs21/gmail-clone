import React from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function Header() {
  // fetch the user picture from login
  const user = useSelector(selectUser);

  const dispatch = useDispatch()

  const signOut = () => {
    auth.signOut().then(() => {     //  auth.signOut -->  used to logout from firebase
       dispatch(logout())
    })                      
  }

  return (
    <div className='header'>
        <div className="header__left">
            <IconButton> <MenuIcon /> </IconButton>
            <img src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Emblem.png" alt="gmail_logo" />
        </div>

        <div className="header__middle">
            <SearchIcon />
            <input type="text" placeholder='Search mail' />
            <ArrowDropDownIcon className='header__inputCaret' />
        </div>

        <div className="header__right">
            <IconButton> <AppsIcon /> </IconButton>
            <IconButton> <NotificationsIcon /> </IconButton>
            <Avatar className='avatar__header' onClick={signOut} src={user?.photoUrl} >{user.email[0]}</Avatar>
            {/* '?' is used to protect against our undefined errors */}
        </div>
    </div>
  )
}

export default Header

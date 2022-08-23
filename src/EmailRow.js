import React from 'react'
import './EmailRow.css'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { Checkbox, IconButton } from '@mui/material';

// In react-router-dom version 6 
// useHistory() is replaced by useNavigate() ;
import {useNavigate} from 'react-router-dom';   //  we replaced actual page with 'openMail' function

import {useDispatch} from 'react-redux'
import { selectingMail } from './features/mailSlice';

function EmailRow({id, title, subject, description, timestamp}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(
      selectingMail({
        id,
        title,
        subject,
        description,
        timestamp
      })
    );

    navigate("/mail");

  }

  return (
    <div className='emailRow'>
        <div className="emailRow__options">
            <Checkbox />
            <IconButton><StarBorderOutlinedIcon /></IconButton>
            <IconButton><LabelImportantOutlinedIcon /></IconButton>
        </div>

        <h3 onClick={openMail}  className="emailRow__title">{title} </h3>

        <div onClick={openMail}  className="emailRow__message">
            <h4>
                {subject}
                <span className='emailRow__description'> - {description} </span>
            </h4>
        </div>

        <p onClick={openMail}  className="emailRow__time"> {timestamp} </p>
    </div>
  )
}

export default EmailRow

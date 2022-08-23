import React from 'react'
import './SidebarOption.css'

function SidebarOption({Icon, title, number, selected}) {
  return (
    //  className={`sidebarOption ${selected && 'sidebarOption--active'}`} -->  if the classname is 'selected', then active the particular sidebar. sidebar--active is a custom classname
    <div className={`sidebarOption ${selected && 'sidebarOption--active'}`}>
      <Icon />
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  )
}

export default SidebarOption

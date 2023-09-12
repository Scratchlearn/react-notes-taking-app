import React from 'react';
import './Group.css';

const Group = ({ name, color,onClick }) => {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div className="group" onClick={onClick}>
      <div className="circle" style={{ backgroundColor: color, width:"30px",height:"30px",borderRadius:"50%",textAlign:"center",marginBottom:"10px" }}>
        {initials}
      </div>
      &nbsp;&nbsp;&nbsp;
      <span className="group-name">{name}</span>
    </div>
  );
};

export default Group;

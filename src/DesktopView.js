
import React, { useEffect, useState} from 'react';
import Popup from './Popup';
import Group from './Group';
import NoteInput from './NoteInput';
import myImage from './image.png';
import './NoteInput.css'





function DesktopView({ onAddGroup }) {

  const [showpopup, setshowPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(true);




  
   








  useEffect(() => {
    // Load groups from local storage when the component mounts
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);

    const storedSelectedGroup = JSON.parse(localStorage.getItem('selectedGroup'));
    setSelectedGroup(storedSelectedGroup);



  }, []);




  const togglePopup = () => {
    setshowPopup(!showpopup);
  };


  const saveGroupsToLocalStorage = (newGroups) => {
    // Save the updated groups to local storage
    localStorage.setItem('groups', JSON.stringify(newGroups));
  };




  const saveNotesToLocalStorage = (newNotes) => {
    // Save the updated notes to local storage
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };





  const handleCreateGroup = () => {
    if (groupName.trim() === '' || selectedColor === '') return;

    const newGroup = {
      name: groupName,
      color: selectedColor,
    };

    const newGroups = [...groups, newGroup];
    setGroups(newGroups);
    saveGroupsToLocalStorage(newGroups);

    // Reset input fields and close the popup
    setGroupName('');
    setSelectedColor('');
    setshowPopup(false);
  };
















  const handleAddNote = (noteText) => {
    if (selectedGroup) {
      const newNote = {
        text: noteText,
        group: selectedGroup,
        date: new Date().toLocaleString(),
      };

      const newNotes = [...notes, newNote];
      setNotes(newNotes);
      saveNotesToLocalStorage(newNotes);
    }
  };




  const handleGroupClick = (group) => {
    if (selectedGroup === group) {
      // If the same group is clicked again, clear the selection


      setSelectedGroup(group);
      setShow(false);

    } else {
      setShow(true);
      setSelectedGroup(group);
      

    }

    // Save the selected group to local storage
    localStorage.setItem('selectedGroup', JSON.stringify(group));
  };

 




   // const initials = selectedGroup.name.substring(0, 2).toUpperCase();



    return (


      <div className='container'>
        <div className='container-left'>
          <h3>Pocket Notes</h3>
          <div className='cont-btn'>
            <button className='select-btn' onClick={togglePopup} >
              + Create Notes Group
            </button>
            <Popup show={showpopup} handleClose={togglePopup} />
            {groups.map((group, index) => (
              <Group key={index} name={group.name} color={group.color}
                onClick={() => handleGroupClick(group)}
              />
            ))}

          </div>

          {showpopup && <Popup
            show={showpopup}
            handleClose={togglePopup}
            onCreateGroup={handleCreateGroup}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            groupName={groupName}
            setGroupName={setGroupName}
            
          />}
        </div>

        <div className='container-right'>
          {show ? (
            <div>
              <div className='image-cont'>
                <img src={myImage} alt="logo-png" />
              </div>
              <div className='pocket-notes'>
                <h1>Pocket Notes</h1>
              </div>
              <div className='desc'>
                <p>Send and recieve messages without keeping your phone online.<br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                </p>
              </div>
            </div>

          ) : (
            <div className="right-section">
              <div className='header'>
              <div className="circle" style={{ backgroundColor: selectedGroup.color, width:"30px",height:"30px",borderRadius:"50%",textAlign:"center" }}>
                  { selectedGroup.name.substring(0, 2).toUpperCase()}
                </div>
                &nbsp; &nbsp;
                <h2 className='header-top'>{selectedGroup.name}</h2>
              </div>
              {selectedGroup ? (
                <div className="notes-container">

                  <div className="notes-list">
                    {notes
                      .filter((note) => note.group === selectedGroup.name)
                      .map((note, index) => (
                        <div key={index} >
                          <div className="note-info">
                            <span className="note-date">{note.date}</span>
                          </div>
                          <p className="note-text">{note.text}</p>
                        </div>
                      ))}
                  </div>

                  <NoteInput onAddNote={handleAddNote} />
                </div>
              ) : (
                <div className="placeholder">Select a group to view notes.</div>
              )}
            </div>
          )}

        </div>
      </div>

    )
  }

  export default DesktopView;

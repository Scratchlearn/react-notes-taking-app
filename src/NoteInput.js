import React, { useState } from 'react';
import './NoteInput.css';
import sendImage from './send-message.png'

const NoteInput = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (noteText.trim() === '') return;

    onAddNote(noteText);
    setNoteText('');
  };
 



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default behavior of Enter (submitting the form)
      e.preventDefault();

      if (noteText.trim() !== '') {
        // Add the note and clear the input field
        onAddNote(noteText);
        setNoteText('');
      }
    }
  };

 

  return (
    <div className="note-input">
      <textarea
        placeholder="Enter your note here..."
        value={noteText}
        onKeyDown={handleKeyPress}
        onChange={(e) => setNoteText(e.target.value)}
        rows={10}
      />
       <button className="send-button" onClick={handleAddNote}>
        {/* Use an image as a button */}
        <img src={sendImage} alt="Send" />
      </button>
    </div>
  );
};

export default NoteInput;

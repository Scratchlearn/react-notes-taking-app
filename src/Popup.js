import React  , {useState,useEffect} from 'react';
import './Popup.css'; // Import your CSS file for styling

const Popup = ({ handleClose,
  show,
  togglePopup,
  onCreateGroup,
  selectedColor,
  setSelectedColor,
  groupName,
  setGroupName,}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  

  const colorOptions = ['#ff5733', '#ffbf33', '#33ff57', '#33aaff', '#f533ff', '#999999'];

  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
    togglePopup();
  };

  const handleOutsideClick = ((e) => {
    if (showPopup && e.target.closest('.modal')) {
      // If the click is outside the popup, close it
      closePopup();
    }
  }, [showPopup, closePopup]);

  // Add a click event listener to the document when the popup is open
  useEffect(() => {
    if (showPopup) {
      document.addEventListener('click', handleOutsideClick);
    }

    // Clean up the event listener when the component unmounts or when the popup is closed
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showPopup,handleOutsideClick]);


  
 

  const handleCreateGroup = () => {
    onCreateGroup();
  }


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {/* Your pop-up content */}
        <h2 className='top-head'>Create New Notes group</h2>
        <div className='name-area'>
          Group Name   &nbsp;&nbsp;
            <input
             type="text"
             placeholder='Enter your group name...'
             value={groupName}
             onChange={(e) => setGroupName(e.target.value)}
             rows={2}
              />
         
        </div>
        <div className='color-sel'>
          <div className='choose'>Choose colour</div>
          <div className='color-options'>&nbsp;&nbsp;
          {colorOptions.map((color, index) => (
            <div
              key={index}
              className={`color-circle ${selectedColor === color ? 'selected' : ''}`}  
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
          </div>
          </div>
        <button onClick={handleCreateGroup} className='btn'>Create</button>
      </section> 
    </div>
  );
};

export default Popup;

import React from "react";

/* importing the font icon component */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


/* defining the functional component */
const ContactItem = props => {
  
  const contact = props.contact;
  const editMode = contact.edit;
  const itemToEdit = props.itemToEdit;

  let uiControls;

  if (editMode) {
    /* if editMode is true show cancel and save buttons */
    uiControls = <div>
      <button
        className="cancelButton"
        onClick={() => {
          props.cancelEdit(contact.id);
        }}>
        Cancel
        </button>
      <button
        className="saveButton"
        onClick={(e) => {
          props.saveItem(contact.id);
        }}
      >
        Save
        </button>
    </div>

  } else {
    uiControls = <div>
      <FontAwesomeIcon
        className="faicons"
        onClick={() => {
          props.editItem(contact.id);
        }}
        icon="pencil-alt"
      />

      <FontAwesomeIcon
        className="faicons"
        onClick={() => { 
          if (window.confirm('Are you sure you wish to delete this item?')) props.deleteItem(contact.id) 
        }}
        icon="trash"
      />
    </div>
  }

  return (
    <tr>
      <td>
        <input
          name="fullName"
          type="text"
          value={editMode ? itemToEdit.fullName : contact.fullName}
          onChange={e => {
            props.handleEditInput(e);
          }}
          disabled={!editMode}
        />
      </td>
      <td>
        <input
          name="emailAddress"
          type="text"
          value={editMode ? itemToEdit.emailAddress : contact.emailAddress}
          onChange={e => {
            props.handleEditInput(e);
          }}
          disabled={!editMode}
        />
      </td>
      <td>
        <input
          name="phoneNumber"
          type="text"
          value={editMode ? itemToEdit.phoneNumber : contact.phoneNumber}
          onChange={e => {
            props.handleEditInput(e);
          }}
          disabled={!editMode}
        />
      </td>
        <td>{uiControls}</td>
    </tr>
  );
};

export default ContactItem;

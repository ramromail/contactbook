import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListItems(props) {

  const items = props.items;
  const itemToEdit = props.itemToEdit;

  const listItems = items.map(item => {
    
    const editMode = item.edit;
    let uiControls;

    if (editMode) {
      uiControls = <div>
        <button
          className="cancelButton"
          onClick={() => {
            props.cancelEdit(item.id);
          }}>
          Cancel
          </button>
        <button
          className="saveButton"
          onClick={(e) => {
            props.saveItem(item.id);
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
            props.editItem(item.id);
          }}
          icon="pencil-alt"
        />

        <FontAwesomeIcon
          className="faicons"
          onClick={() => { 
            if (window.confirm('Are you sure you wish to delete this item?')) props.deleteItem(item.id) 
          }}
          icon="trash"
        />
      </div>
    }

    return (
      <tr key={item.id} data-id={item.id}>
        <td>
          <input
            name="fullName"
            type="text"
            value={item.edit ? itemToEdit.fullName : item.fullName}
            onChange={e => {
              props.handleEditInput(e);
            }}
            disabled={!item.edit}
          />
        </td>
        <td>
          <input
            name="emailAddress"
            type="text"
            value={item.edit ? itemToEdit.emailAddress : item.emailAddress}
            onChange={e => {
              props.handleEditInput(e);
            }}
            disabled={!item.edit}
          />
        </td>
        <td>
          <input
            name="phoneNumber"
            type="text"
            value={item.edit ? itemToEdit.phoneNumber : item.phoneNumber}
            onChange={e => {
              props.handleEditInput(e);
            }}
            disabled={!item.edit}
          />
        </td>
        <td>
          {uiControls}
        </td>
      </tr>
    );
  });

  return (
    <table className="contactsList">
      <thead>
        <tr>
          <td><span onClick={e => props.sortTable('name')}>Name</span></td>
          <td><span onClick={e => props.sortTable('email')}>E-mail address</span></td>
          <td><span onClick={e => props.sortTable('phone')}>Phone number</span></td>
          <td></td>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );
}

export default ListItems;

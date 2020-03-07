import React from "react";

const AddNewItem = props => {

  const currentItem = props.currentItem;

  return (
    <form id="to-do-form" onSubmit={props.addItem}>
      <table className="addcontacts">
        <thead>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Full name"
                name="fullName"
                value={currentItem.fullName}
                onChange={props.handleAddInput}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="E-mail address"
                name="emailAddress"
                value={currentItem.emailAddress}
                onChange={props.handleAddInput}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="Phone number"
                name="phoneNumber"
                value={currentItem.phoneNumber}
                onChange={props.handleAddInput}
              ></input>
            </td>
            <td>
              <button type="submit">Add new</button>
            </td>
          </tr>
        </thead>
      </table>
    </form>
  );
};

export default AddNewItem;

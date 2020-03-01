import React from "react";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map(item => {
    // console.log(item);
    return (
      <tr key={item.id} data-id={item.id}>
        <td>
          <input
            name="fullName"
            type="text"
            value={item.fullName}
            onChange={e => {
              props.setUpdate(e.target.name, e.target.value, item.id);
            }}
          />
        </td>
        <td>
          <input
            name="emailAddress"
            type="text"
            value={item.emailAddress}
            onChange={e => {
              props.setUpdate(e.target.name, e.target.value, item.id);
            }}
          />
        </td>
        <td>
          <input
            name="phoneNumber"
            type="text"
            value={item.phoneNumber}
            onChange={e => {
              props.setUpdate(e.target.name, e.target.value, item.id);
            }}
          />
        </td>
        <td>
          <button
            onClick={() => {
              props.deleteItem(item.id);
            }}
          >
            Del
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="contactsList">
      <thead>
        <tr>
          <td>Name</td>
          <td>E-mail address</td>
          <td>Phone number</td>
          <td></td>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );
}

export default ListItems;

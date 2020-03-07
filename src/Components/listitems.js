import React from "react";

/* imporing contact item component */
import ContactItem from "./contactItem";

/* defining a functional component */
const ListItems = props => {
  const items = props.items;
  const sort = props.sort;
  
  /* iterating over the prop items and makeing individual contact as components */
  const contacts = items.map(item => {
    return (
      <ContactItem
        /* props for the component */
        key={item.id}
        contact={item}
        itemToEdit={props.itemToEdit}
        cancelEdit={props.cancelEdit}
        editItem={props.editItem}
        saveItem={props.saveItem}
        deleteItem={props.deleteItem}
        handleEditInput={props.handleEditInput}
      />
    )

  });

  return (
    <table className="contactsList">
      <thead>
        <tr>
          <td>
            <div className={sort.name} onClick={e => props.sortTable("name")}>
              Name
            </div>
          </td>
          <td>
            <div className={sort.email} onClick={e => props.sortTable("email")}>
              E-mail address
            </div>
          </td>
          <td>
            <div className={sort.phone} onClick={e => props.sortTable("phone")}>
              Phone number
            </div>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {contacts}
      </tbody>
    </table>
  );
};

export default ListItems;

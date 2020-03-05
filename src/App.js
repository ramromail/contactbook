import React from "react";
import "./App.css";

import Header from "./Components/header";
import ListItems from "./Components/listitems";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
library.add(faPencilAlt)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        id: ""
      },
      itemToEdit: {
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        id: ""
      },
      sort: {
        name: "default",
        email: "default",
        phone: "default",
      }
    };

    this.addItem = this.addItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.sortTable = this.sortTable.bind(this);
  }

  componentDidMount() {
    fetch("contacts.json")
      .then(response => response.json())
      .then(
        // handle the result
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },

        // Handle error
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    const errorString = this.validateInputs(newItem);
    
    if (true !== errorString) {
      alert('Please fix these issues:\n' + errorString);
      return false;
    }
    else {
      const items = [newItem, ...this.state.items];

      this.setState({
        items: items,
        currentItem: {
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          id: ""
        }
      });
    }
  }
  handleAddInput(e) {
    const name = e.target.name;
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        [name]: e.target.value,
        id: Date.now()
      }
    });
  }
  handleEditInput(e) {
    const name = e.target.name;
    this.setState({
      itemToEdit: {
        ...this.state.itemToEdit,
        [name]: e.target.value,
      }
    });
  }
  saveItem(id) {
    const items = this.state.items;
    const itemToEdit = this.state.itemToEdit;
    const errorString = this.validateInputs(itemToEdit);
    
    if (true !== errorString) {
      alert('Please fix these issues:\n' + errorString);
      return false;
    }
    else {

      items.forEach(item => {
        if (item.id === id) {
          item.fullName = itemToEdit.fullName;
          item.emailAddress = itemToEdit.emailAddress;
          item.phoneNumber = itemToEdit.phoneNumber;
        }
      });

      this.setState({
        items: items,
        itemToEdit: {
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          id: ""
        }
      });

      this.cancelEdit(id);
    }
  }

  editItem(key) {
    const items = this.state.items;

    let fname = '',
      email = '',
      phone = '';

    items.forEach(item => {
      if (item.id === key) {
        item.edit = true;

        fname = item.fullName;
        email = item.emailAddress;
        phone = item.phoneNumber;

      }
      else {
        item.edit = false;
      }
    });

    this.setState({
      itemToEdit: {
        fullName: fname,
        emailAddress: email,
        phoneNumber: phone,
        id: key
      }
    });

    this.setState({
      items: items
    });

  }
  cancelEdit(key) {
    const items = this.state.items;
    items.forEach(item => {
      item.edit = false;
    });

    this.setState({
      items: items
    });

  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.id !== key);
    this.setState({
      items: filteredItems
    });
  }

  sortTable(colName) {
    
    let items = this.state.items, sortOrder = '';

    if(this.state.sort[colName] === 'default' || this.state.sort[colName] === 'desc') {
      sortOrder = 'asc';
    }
    else {
      sortOrder = 'desc';
    }

    if(colName === 'name') {
      if(sortOrder === 'asc') {
        items.sort((a, b) => a.fullName.localeCompare(b.fullName));
      }
      else {
        items.sort((a, b) => b.fullName.localeCompare(a.fullName));
      }
    }
    else if(colName === 'email') {
      if(sortOrder === 'asc') {
        items.sort((a, b) => a.emailAddress.localeCompare(b.emailAddress));
      }
      else {
        items.sort((a, b) => b.emailAddress.localeCompare(a.emailAddress));
      }
    }
    else if(colName === 'phone') {
      if(sortOrder === 'asc') {
        items.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
      }
      else {
        items.sort((a, b) => b.phoneNumber.localeCompare(a.phoneNumber));
      }
    }

    this.setState({
      items,
      sort: {
        [colName]: sortOrder
      }
    });

  }

  validateInputs(item) {
    const name = item.fullName.toString();
    const email = item.emailAddress.toString();
    const phone = item.phoneNumber.toString();

    const fullNamePattern = /^[a-zA-Z0-9.\s]{5,30}$/;
    const emailAddPattern = /^[a-zA-Z0-9.-]{3,15}@[a-zA-Z0-9-]{3,10}.[a-zA-Z]{2,5}$/;
    const phoneNumPattern = /^\d{10}$/;

    let errorString = '';

    if (name === '') {
      errorString += '\t- Name cannot be empty\n';
    }
    else if (fullNamePattern.test(name) === false) {
      errorString += '\t- Name can only contain letters, numbers and space and must be 5-20 characters.\n';
    }

    if (email === "") {
      errorString += '\t- Email address cannot be empty\n';
    }
    else if (emailAddPattern.test(email) === false) {
      errorString += '\t- Please enter a valid email address\n';
    }

    if (phone === "") {
      errorString += '\t- Phone number cannot be empty\n';
    }
    else if (phoneNumPattern.test(phone) === false) {
      errorString += '\t- Phone number can only contain numbers and must have 10 digits\n';
    }

    if (errorString === '') {
      return true;
    }

    return errorString;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <h1 className="listHeader">List of participants</h1>
        <form id="to-do-form" onSubmit={this.addItem}>
          <table className="addcontacts">
            <thead>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Full name"
                    name="fullName"
                    value={this.state.currentItem.fullName}
                    onChange={this.handleAddInput}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="E-mail address"
                    name="emailAddress"
                    value={this.state.currentItem.emailAddress}
                    onChange={this.handleAddInput}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={this.state.currentItem.phoneNumber}
                    onChange={this.handleAddInput}
                  ></input>
                </td>
                <td>
                  <button type="submit">Add new</button>
                </td>
              </tr>
            </thead>
          </table>
        </form>

        <ListItems
          items={this.state.items}
          itemToEdit={this.state.itemToEdit}
          cancelEdit={this.cancelEdit}
          editItem={this.editItem}
          saveItem={this.saveItem}
          deleteItem={this.deleteItem}
          handleEditInput={this.handleEditInput}
          sortTable={this.sortTable}
        />
      </div>
    );
  }
}

export default App;

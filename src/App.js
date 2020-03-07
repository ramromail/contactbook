import React from "react";
import "./App.css";

/* importing components */
import Header from "./Components/header";
import AddNewItem from "./Components/addNewItem";
import ListItems from "./Components/listitems";

/* impoting fonts icons */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

/* add icons to library for use later */
library.add(faTrash);
library.add(faPencilAlt);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      /* state array to hold contacts */
      items: [], 

      /* state object to hold new contact being added */
      currentItem: {
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        id: ""
      },

      /* state object to hold contact being editied */
      itemToEdit: {
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        id: ""
      },

      /* object to hold state of columns for sorting  */
      sort: {
        name: "default",
        email: "default",
        phone: "default"
      }
    };

    /* binding of states and methods */
    this.addItem = this.addItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.sortTable = this.sortTable.bind(this);
  }

  /* react hook, when app component is ready make a ajax request to fetch contacts */
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

  /* function to save new contact */
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    const errorString = this.validateInputs(newItem);

    if (true !== errorString) {
      alert("Please fix these issues:\n" + errorString);
      return false;
    } else {
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

  /* handles inputs for new contact adding form */
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

  /* handles inputs in the input fields for editing exisiting contact */
  handleEditInput(e) {
    const name = e.target.name;
    this.setState({
      itemToEdit: {
        ...this.state.itemToEdit,
        [name]: e.target.value
      }
    });
  }

  /* function to handle save edited contact */
  saveItem(id) {
    const items = this.state.items;
    const itemToEdit = this.state.itemToEdit;
    const errorString = this.validateInputs(itemToEdit);

    if (true !== errorString) {
      alert("Please fix these issues:\n" + errorString);
      return false;
    } else {
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

  /* function to handle editing of contacts */
  editItem(key) {
    const items = this.state.items;

    let fname = "",
      email = "",
      phone = "";

    items.forEach(item => {
      if (item.id === key) {
        item.edit = true;

        fname = item.fullName;
        email = item.emailAddress;
        phone = item.phoneNumber;
      } else {
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

  /* function to cancel editing  */
  cancelEdit(key) {
    const items = this.state.items;
    items.forEach(item => {
      item.edit = false;
    });

    this.setState({
      items: items
    });
  }

  /* function to delete contact */
  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.id !== key);
    this.setState({
      items: filteredItems
    });
  }

  /* function to handle sorting of columns  */
  sortTable(colName) {
    let items = this.state.items,
      sortOrder = "";

    if (
      this.state.sort[colName] === "default" ||
      this.state.sort[colName] === "desc"
    ) {
      sortOrder = "asc";
    } else {
      sortOrder = "desc";
    }

    if (colName === "name") {
      if (sortOrder === "asc") {
        items.sort((a, b) => a.fullName.localeCompare(b.fullName));
      } else {
        items.sort((a, b) => b.fullName.localeCompare(a.fullName));
      }
    } else if (colName === "email") {
      if (sortOrder === "asc") {
        items.sort((a, b) => a.emailAddress.localeCompare(b.emailAddress));
      } else {
        items.sort((a, b) => b.emailAddress.localeCompare(a.emailAddress));
      }
    } else if (colName === "phone") {
      if (sortOrder === "asc") {
        items.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
      } else {
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

  /* validate user input for adding new contact or editing contact */
  validateInputs(item) {
    const name = item.fullName.toString();
    const email = item.emailAddress.toString();
    const phone = item.phoneNumber.toString();

    /* regular expression to test for name, name can only contain letters, numbers
      spaces and period
    */
    const fullNamePattern = /^[a-zA-Z0-9.\s]{5,30}$/;
    
    /* email address test pattern, email must be in the format <3 to 15 characters, numbers, . or ->@<3 to 10 characters, . or ->.<2 to 5 characters> */
    const emailAddPattern = /^[a-zA-Z0-9.-]{3,15}@[a-zA-Z0-9-]{3,10}.[a-zA-Z]{2,5}$/;

    /* phone number test pattern, phone number must be 10 digits only, no more no less*/
    const phoneNumPattern = /^\d{10}$/;

    let errorString = "";

    /* check if name field is empty or if it meets the criterias for name */
    if (name === "") {
      errorString += "\t- Name cannot be empty\n";
    } else if (fullNamePattern.test(name) === false) {
      errorString +=
        "\t- Name can only contain letters, numbers and space and must be 5-20 characters.\n";
    }

    /* check if email address is empty or is not proper format */
    if (email === "") {
      errorString += "\t- Email address cannot be empty\n";
    } else if (emailAddPattern.test(email) === false) {
      errorString += "\t- Please enter a valid email address\n";
    }

    /* check if phone number is empty or if it is not a string of 10 digits */
    if (phone === "") {
      errorString += "\t- Phone number cannot be empty\n";
    } else if (phoneNumPattern.test(phone) === false) {
      errorString +=
        "\t- Phone number can only contain numbers and must have 10 digits\n";
    }

    if (errorString === "") {
      return true;
    }

    return errorString;
  }

  render() {
    return (
      <div className="App">

        {/* render the header/navigation bar */}
        <Header />
        
        <h1 className="listHeader">List of participants</h1>
        
        {/* add the form to add new elements */}
        <AddNewItem
          /* props sent to component */
          currentItem={this.state.currentItem}
          addItem={this.addItem}
          handleAddInput={this.handleAddInput}
        />

        {/* add the list here */}
        <ListItems
          /* props sent to component */
          items={this.state.items}
          sort={this.state.sort}
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

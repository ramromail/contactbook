import React from "react";
// import logo from "./logo.svg";
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
      }
    };
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
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
    if (newItem.fullName === "") {
      alert('Please provide a name.');
      return false;
    }
    else if (newItem.emailAddress === "") {
      alert('Please provide a valid e-mail address.');
      return false;
    }
    else if (newItem.phoneNumber === "") {
      alert('Please provide a valid phone number.');
      return false;
    }
    else {
      const items = [...this.state.items, newItem];
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
  handleInput(e) {
    const name = e.target.name;
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        [name]: e.target.value,
        id: Date.now()
      }
    });
  }
  deleteItem(key) {
    console.log("delete: " + key);
    const filteredItems = this.state.items.filter(item => item.id !== key);
    this.setState({
      items: filteredItems
    });
  }
  setUpdate(name, text, key) {
    console.log(name, text, key);
    // console.log("items:" + this.state.items);
    const items = this.state.items;
    items.forEach(item => {
      if (item.id === key) {
        console.log(item.key + "    " + key);
        item[name] = text;
      }
    });
    this.setState({
      items: items
    });
  }
  render() {
    return (
      <div className="App">
        <Header />
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
                    onChange={this.handleInput}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="E-mail address"
                    name="emailAddress"
                    value={this.state.currentItem.emailAddress}
                    onChange={this.handleInput}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={this.state.currentItem.phoneNumber}
                    onChange={this.handleInput}
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
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}

export default App;

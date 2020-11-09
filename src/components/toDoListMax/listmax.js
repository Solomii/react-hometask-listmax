import React from "react";
import { v4 as uuidv4 } from "uuid";
import { RiChatDeleteLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import "./listmax.css";

class Listmax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      list: [
        { id: 0, title: "Wake up", done: false },
        { id: 1, title: "Eat breakfast", done: false },
        { id: 2, title: "Go to work", done: false },
      ],
      editing: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleList = this.handleList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleListItem = this.handleListItem.bind(this);
    this.addItemToTheList = this.addItemToTheList.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDelete = (id) => {
    console.log(id);
    this.setState((state, props) => ({
      list: state.list.filter((t) => t.id !== id),
    }));
  };

  handleMarkDone = (id, isDone) => {
    this.setState((state, props) => ({
      list: this.state.list.map((t) =>
        t.id === id ? { ...t, list: isDone } : t
      ),
    }));
  };

  handleEdit = (item) => {
    this.setState((state) => ({
      list: state.list.map((t) => (t.id === item.id ? { ...t, ...item } : t)),
      editing: state.editing.filter((id) => item.id !== id),
    }));
  };

  // handleList() {
  //   return this.state.list.map(function  (item) {
  //     return (
  //       <li className="listmax-li" key={item.id}>
  //         {item.title}
  //         <button>
  //           <MdDone />
  //         </button>
  //         <button onClick={console.log(item)}>
  //           <RiChatDeleteLine />
  //         </button>
  //       </li>
  //     );
  //   });
  // }
  handleList() {
    return this.state.list.map(this.handleListItem);
  }

  handleListItem(item) {
    return (
      <li className="listmax-li" key={item.id}>
        {item.title}
        <button onClick={() => this.handleEdit(item.id)}>
          <MdDone />
        </button>
        <button onClick={() => this.handleDelete(item.id)}>
          <RiChatDeleteLine />
        </button>
      </li>
    );
  }

  addItemToTheList() {
    this.setState((state) => {
      let newItem = { id: 5, title: state.name, done: false };
      const list = [...state.list, newItem];

      return {
        list,
        name: "",
      };
    });
  }

  render() {
    return (
      <div className="listmax">
        <div className="listmax-wrapper">
          <h2 className="listmax-title">To do:</h2>
          <div>
            <ul className="listmax-ul">{this.handleList()}</ul>
          </div>
          <div className="listmax-title-text">
            <h5>Task</h5>
            <input
              className="listmax-input"
              type="text"
              placeholder="What do you need to do?"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="listmax-btn-b">
            <button className="listmax-btn" onClick={this.addItemToTheList}>
              Save item
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Listmax;

import React, { Component } from "react"
import "./index.css";

class ToDoItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.entries,
        }
    }
    componentWillReceiveProps = (nextprops) => {
        this.setState({ items: nextprops.entries })
    }
    // this function is responsible for listing of todo items.
    createTasks = (item, key) => {
        if (item.editing) {
            return <div className="edit_part">
                {/* INput Form Begins */}
                <form onSubmit={(e) => this.updateItem(e, item, key)}>
                    <input className="update_input" type="text" defaultValue={item.text} ref={(b) => this._itemValue = b}></input>
                </form>
                {/* INput Form Begings Ends */}

            </div>
        }
        else {
            return <div className="list_mainn">

                <li className="items_list"
                    key={item.key}
                    onDoubleClick={() => this.edit(item, key)}>
                        <input id={item.key} type="checkbox" onClick= {() => this.completed(key)}></input>
                        <label htmlFor = {item.key} className="check-box"></label>  {/* this label is used to make checkbox custom */}
                        <label className={`${item.finished ? 'label-class' : 'input-lable'}`}>{item.text}</label>
                        <button onClick={() => this.delete(item.key)} className="delete">✖</button>
                </li>

            </div>
        }
    }
    //this function execute update operation
    updateItem = (e, item, key) => {
        let { items } = this.state
        e.preventDefault();
        let updateText = {
            text: this._itemValue.value,
            key: item.key,
        }
        items[key] = updateText
        this.setState({ items })
    };
    //this function will execute when item to be delete
    delete = (key) => {
        this.props.delete(key);
    }
    //this function run then checkbox is clicked to shoe item is completed
    completed = (key) => {
        let { items } = this.state    
        items[key].finished = !items[key].finished;  //this statement is responsible for toggling in checkbox
        this.setState({ items })
    };
    //this function will execute when edit to be perform.
    edit = (item, key) => {
        let { items } = this.state;
        items[key].editing = true;  //this statement is used for making item editable
        this.setState({ items })
    };
    render() {
        const { items } = this.state;
        var listItems = items.map(this.createTasks);

        return (
            <ul className="todo_list">

                {/* List of Items start */}
                {listItems}
                {/* List of Items start ends */}

            </ul>
        );
    }
}

export default ToDoItems;
import React, { Component } from "react";
import ToDoItems from "./ToDoItems"
import "./index.css";

class ToDoList extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: [],
            edit: false,
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        
    }
    //this item is responsiple for adding new items in the list
    addItem(e){
        e.preventDefault();
        if(this._itemElement.value !== ""){
            var newItem = {
                text: this._itemElement.value,
                key: Date.now(),
                
            };

            const { items } = this.state;
            items.unshift(newItem)
            this.setState({ items});
        }
        this._itemElement.value = "";
    }
    //this function is for deleting the item for the list
    //this item is send as prop 
    deleteItem(key){
        let filteredItems = this.state.items.filter(function(item)  //this statement is used for deleting
        {  
            return (item.key !==key)
        });
        this.setState({
            items: filteredItems
        });
    }

    render(){
        return(
            <div className="top">
                <header>todos</header>
            <div className="ToDomain">
                
                <div className="header">
                    
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._itemElement = a}
                        placeholder="Add item" className="main_input"></input>
                    </form>
                </div>
                <ToDoItems entries = {this.state.items}
                            delete = {this.deleteItem}
                            edit = {this.editItem}/> 
            </div>
            </div>
        );
    }
}

export default ToDoList;